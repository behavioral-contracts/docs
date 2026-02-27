#!/usr/bin/env ts-node

/**
 * Generate CLI reference documentation from verify-cli --help output
 *
 * This script:
 * 1. Runs `verify-cli --help` to get current CLI documentation
 * 2. Generates docs/cli-reference/overview.md with formatted help text
 * 3. Generates docs/cli-reference/command-verify.md with detailed usage
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const DOCS_DIR = path.join(__dirname, '../docs/cli-reference');
const VERIFY_CLI_PATH = path.join(__dirname, '../../verify-cli');

function ensureDocsDir() {
  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }
}

function getCliHelp(): string {
  try {
    // Run verify-cli --help from the verify-cli directory
    const help = execSync('node dist/index.js --help', {
      cwd: VERIFY_CLI_PATH,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    return help;
  } catch (error: any) {
    console.warn('Warning: Could not run verify-cli --help. Using placeholder text.');
    console.warn('Make sure verify-cli is built (npm run build in verify-cli directory)');
    return `verify-cli - Behavioral Contracts Static Analyzer

Usage: verify-cli [options]

Options:
  --tsconfig <path>     Path to tsconfig.json
  --corpus <path>       Path to corpus directory
  --output <path>       Output JSON file path
  --help               Show this help message
  --version            Show version number
`;
  }
}

function generateOverviewPage(helpText: string) {
  const markdown = `---
sidebar_position: 1
---

# CLI Reference

The \`verify-cli\` is a static analyzer that checks your TypeScript code against behavioral contracts.

## Quick Start

\`\`\`bash
# Install globally
npm install -g @behavioral-contracts/verify-cli

# Or use with npx
npx @behavioral-contracts/verify-cli --tsconfig ./tsconfig.json
\`\`\`

## Help Output

\`\`\`
${helpText.trim()}
\`\`\`

## Common Usage Patterns

### Basic Scan

Scan your project using your existing tsconfig.json:

\`\`\`bash
verify-cli --tsconfig ./tsconfig.json
\`\`\`

### With Output File

Save results to a JSON file for later analysis or AI integration:

\`\`\`bash
verify-cli --tsconfig ./tsconfig.json --output violations.json
\`\`\`

### Custom Corpus Path

Use a local or custom corpus directory:

\`\`\`bash
verify-cli --tsconfig ./tsconfig.json --corpus ./my-contracts
\`\`\`

### CI/CD Integration

Exit with non-zero code if violations are found:

\`\`\`bash
verify-cli --tsconfig ./tsconfig.json --fail-on-error
\`\`\`

## See Also

- [Command Reference](./command-verify.md) - Detailed flag documentation
- [Output Formats](./output-formats.md) - Understanding the output
- [CI/CD Integration](./ci-cd-integration.md) - Using in pipelines
`;

  const outputPath = path.join(DOCS_DIR, 'overview.md');
  fs.writeFileSync(outputPath, markdown);
  console.log(`✅ Generated: ${outputPath}`);
}

function generateCommandPage() {
  const markdown = `---
sidebar_position: 2
---

# Command Reference

## verify-cli

The main command for running behavioral contract verification.

### Required Options

#### \`--tsconfig <path>\`

Path to your TypeScript configuration file.

**Example:**
\`\`\`bash
verify-cli --tsconfig ./tsconfig.json
\`\`\`

The analyzer uses this to:
- Determine which files to analyze
- Resolve module imports
- Apply TypeScript compiler options

### Optional Options

#### \`--corpus <path>\`

Path to the corpus directory containing behavioral contracts.

**Default:** Downloads from npm package \`@behavioral-contracts/corpus\`

**Example:**
\`\`\`bash
verify-cli --tsconfig ./tsconfig.json --corpus ./local-corpus
\`\`\`

Use this when:
- Testing local contract changes
- Using custom/private contracts
- Working offline

---

#### \`--output <path>\`

Path to write JSON output file.

**Default:** Prints to stdout only

**Example:**
\`\`\`bash
verify-cli --tsconfig ./tsconfig.json --output violations.json
\`\`\`

Output format:
\`\`\`json
{
  "summary": {
    "totalViolations": 5,
    "errorCount": 3,
    "warningCount": 2
  },
  "violations": [
    {
      "file": "src/api.ts",
      "line": 42,
      "column": 15,
      "severity": "error",
      "package": "axios",
      "function": "get",
      "postcondition": "network-failure",
      "message": "Missing required error handling",
      "requiredHandling": "Check error.response exists...",
      "source": "https://axios-http.com/docs/handling_errors"
    }
  ]
}
\`\`\`

---

#### \`--fail-on-error\`

Exit with non-zero code if any ERROR-level violations are found.

**Default:** Always exits with code 0

**Example:**
\`\`\`bash
verify-cli --tsconfig ./tsconfig.json --fail-on-error
\`\`\`

Use in CI/CD to fail builds when critical issues are found.

---

#### \`--severity <level>\`

Minimum severity level to report.

**Options:** \`error\`, \`warning\`, \`info\`

**Default:** \`info\` (reports all)

**Example:**
\`\`\`bash
# Only show errors and warnings
verify-cli --tsconfig ./tsconfig.json --severity warning
\`\`\`

---

#### \`--help\`

Show help message and exit.

---

#### \`--version\`

Show version number and exit.

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success (or violations found but \`--fail-on-error\` not set) |
| 1 | Error-level violations found (with \`--fail-on-error\`) |
| 2 | Invalid arguments or configuration |
| 3 | Runtime error (file not found, parse error, etc.) |

## Environment Variables

### \`CORPUS_PATH\`

Override default corpus location.

\`\`\`bash
export CORPUS_PATH=/path/to/corpus
verify-cli --tsconfig ./tsconfig.json
\`\`\`

### \`VERIFY_CLI_DEBUG\`

Enable debug logging.

\`\`\`bash
VERIFY_CLI_DEBUG=1 verify-cli --tsconfig ./tsconfig.json
\`\`\`
`;

  const outputPath = path.join(DOCS_DIR, 'command-verify.md');
  fs.writeFileSync(outputPath, markdown);
  console.log(`✅ Generated: ${outputPath}`);
}

function main() {
  console.log('🔧 Generating CLI documentation...\n');

  ensureDocsDir();

  const helpText = getCliHelp();
  generateOverviewPage(helpText);
  generateCommandPage();

  console.log('\n✅ CLI documentation generated successfully!');
}

if (require.main === module) {
  main();
}
