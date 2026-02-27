#!/usr/bin/env ts-node

/**
 * Validate code examples in documentation
 *
 * This script:
 * 1. Finds all markdown files in docs/
 * 2. Extracts TypeScript code blocks
 * 3. Validates that they compile
 * 4. If marked with expectsViolation or expectsClean, runs verify-cli
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import { execSync } from 'child_process';

const DOCS_DIR = path.join(__dirname, '../docs');
const TEMP_DIR = path.join(__dirname, '../.temp-validation');

interface CodeBlock {
  code: string;
  language: string;
  file: string;
  line: number;
  expectsViolation?: boolean;
  expectsClean?: boolean;
}

function ensureTempDir() {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }
}

function cleanTempDir() {
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
}

function findMarkdownFiles(): string[] {
  const pattern = path.join(DOCS_DIR, '**/*.md');
  return glob.sync(pattern);
}

function extractCodeBlocks(filePath: string): CodeBlock[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const blocks: CodeBlock[] = [];

  let inCodeBlock = false;
  let currentBlock: string[] = [];
  let currentLanguage = '';
  let currentLine = 0;
  let blockStartLine = 0;
  let expectsViolation = false;
  let expectsClean = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        blocks.push({
          code: currentBlock.join('\n'),
          language: currentLanguage,
          file: filePath,
          line: blockStartLine,
          expectsViolation,
          expectsClean,
        });
        inCodeBlock = false;
        currentBlock = [];
        expectsViolation = false;
        expectsClean = false;
      } else {
        // Start of code block
        const match = line.match(/^```(\w+)(\s+\w+)?/);
        if (match) {
          currentLanguage = match[1];
          const modifier = match[2]?.trim();
          expectsViolation = modifier === 'expectsViolation';
          expectsClean = modifier === 'expectsClean';
        }
        inCodeBlock = true;
        blockStartLine = i + 1;
      }
    } else if (inCodeBlock) {
      currentBlock.push(line);
    }
  }

  return blocks;
}

function validateTypeScript(block: CodeBlock): boolean {
  // Create temporary TypeScript file
  const fileName = `example-${Date.now()}.ts`;
  const filePath = path.join(TEMP_DIR, fileName);

  fs.writeFileSync(filePath, block.code);

  try {
    // Try to compile with tsc
    execSync(`npx tsc --noEmit --skipLibCheck ${filePath}`, {
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    return true;
  } catch (error: any) {
    console.error(`\n❌ TypeScript validation failed:`);
    console.error(`   File: ${block.file}:${block.line}`);
    console.error(`   Error: ${error.stdout || error.message}`);
    return false;
  } finally {
    // Clean up
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

function validateWithCli(block: CodeBlock): boolean {
  // Create temporary project
  const projectDir = path.join(TEMP_DIR, `project-${Date.now()}`);
  fs.mkdirSync(projectDir, { recursive: true });

  const tsconfig = {
    compilerOptions: {
      target: 'ES2020',
      module: 'commonjs',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
    },
    include: ['*.ts'],
  };

  fs.writeFileSync(
    path.join(projectDir, 'tsconfig.json'),
    JSON.stringify(tsconfig, null, 2)
  );

  fs.writeFileSync(path.join(projectDir, 'example.ts'), block.code);

  try {
    const output = execSync(
      `node ../../verify-cli/dist/index.js --tsconfig tsconfig.json --corpus ../../corpus`,
      {
        cwd: projectDir,
        encoding: 'utf-8',
        stdio: 'pipe',
      }
    );

    const hasViolations = output.includes('ERROR') || output.includes('WARNING');

    if (block.expectsViolation && !hasViolations) {
      console.error(`\n❌ Expected violations but found none:`);
      console.error(`   File: ${block.file}:${block.line}`);
      return false;
    }

    if (block.expectsClean && hasViolations) {
      console.error(`\n❌ Expected clean but found violations:`);
      console.error(`   File: ${block.file}:${block.line}`);
      console.error(`   Output: ${output}`);
      return false;
    }

    return true;
  } catch (error: any) {
    // verify-cli might exit with non-zero on violations
    const hasViolations = error.stdout?.includes('ERROR') || error.stdout?.includes('WARNING');

    if (block.expectsViolation && hasViolations) {
      return true; // Expected violations and got them
    }

    console.error(`\n❌ CLI validation failed:`);
    console.error(`   File: ${block.file}:${block.line}`);
    console.error(`   Error: ${error.stdout || error.message}`);
    return false;
  } finally {
    // Clean up
    fs.rmSync(projectDir, { recursive: true, force: true });
  }
}

function main() {
  console.log('🔧 Validating documentation examples...\n');

  ensureTempDir();

  const markdownFiles = findMarkdownFiles();
  console.log(`Found ${markdownFiles.length} markdown files\n`);

  let totalBlocks = 0;
  let validatedBlocks = 0;
  let failedBlocks = 0;

  for (const file of markdownFiles) {
    const blocks = extractCodeBlocks(file);
    const tsBlocks = blocks.filter(b => b.language === 'typescript' || b.language === 'ts');

    if (tsBlocks.length === 0) continue;

    console.log(`📄 ${path.relative(DOCS_DIR, file)}`);

    for (const block of tsBlocks) {
      totalBlocks++;

      // Always validate TypeScript compilation
      const compilesOk = validateTypeScript(block);
      if (!compilesOk) {
        failedBlocks++;
        continue;
      }

      // If marked for CLI validation, run verify-cli
      if (block.expectsViolation || block.expectsClean) {
        const cliOk = validateWithCli(block);
        if (!cliOk) {
          failedBlocks++;
          continue;
        }
      }

      validatedBlocks++;
      console.log(`   ✅ Line ${block.line}`);
    }
  }

  cleanTempDir();

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Total code blocks: ${totalBlocks}`);
  console.log(`✅ Validated: ${validatedBlocks}`);
  console.log(`❌ Failed: ${failedBlocks}`);

  if (failedBlocks > 0) {
    console.log(`\n❌ Validation failed! Fix the errors above and try again.`);
    process.exit(1);
  } else {
    console.log(`\n✅ All examples validated successfully!`);
  }
}

if (require.main === module) {
  main();
}
