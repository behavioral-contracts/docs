#!/usr/bin/env ts-node

/**
 * Generate package documentation from contract YAML files
 *
 * This script:
 * 1. Finds all contract.yaml files in corpus/packages/
 * 2. Generates individual package pages (e.g., axios.md, prisma.md)
 * 3. Generates overview.md with a list of all supported packages
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import * as yaml from 'js-yaml';

const CORPUS_PATH = path.join(__dirname, '../../corpus/packages');
const DOCS_DIR = path.join(__dirname, '../docs/supported-packages');

interface Precondition {
  id: string;
  description: string;
  source: string;
  severity: string;
}

interface Postcondition {
  id: string;
  condition: string;
  returns?: string;
  throws?: string;
  required_handling?: string;
  source: string;
  severity: string;
}

interface EdgeCase {
  id: string;
  description: string;
  source: string;
  severity: string;
}

interface Function {
  name: string;
  import_path: string;
  description: string;
  preconditions?: Precondition[];
  postconditions?: Postcondition[];
  edge_cases?: EdgeCase[];
}

interface Contract {
  package: string;
  semver: string;
  contract_version: string;
  maintainer: string;
  last_verified: string;
  status: string;
  functions: Function[];
}

function ensureDocsDir() {
  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }
}

function findContractFiles(): string[] {
  const pattern = path.join(CORPUS_PATH, '**/contract.yaml');
  return glob.sync(pattern);
}

function loadContract(filePath: string): Contract {
  const content = fs.readFileSync(filePath, 'utf-8');
  return yaml.load(content) as Contract;
}

function getSeverityBadge(severity: string): string {
  const badges: Record<string, string> = {
    error: '🔴 ERROR',
    warning: '⚠️ WARNING',
    info: 'ℹ️ INFO',
  };
  return badges[severity] || severity.toUpperCase();
}

/**
 * Escape MDX special characters to prevent parsing errors
 * For text with code snippets, wraps in HTML <code> tag
 */
function escapeMDX(text: string): string {
  // If text contains curly braces or angle brackets, wrap in HTML code tag
  if (/[{}<>]/.test(text)) {
    return `<span>${text.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`;
  }
  return text;
}

function generatePackagePage(contract: Contract) {
  const packageSlug = contract.package.replace('@', '').replace('/', '-');

  let markdown = `---
title: "${contract.package}"
---

# ${contract.package}

`;

  // Metadata
  markdown += `| Property | Value |\n`;
  markdown += `|----------|-------|\n`;
  markdown += `| **Package** | \`${contract.package}\` |\n`;
  markdown += `| **Versions Covered** | \`${contract.semver}\` |\n`;
  markdown += `| **Contract Version** | \`${contract.contract_version}\` |\n`;
  markdown += `| **Status** | \`${contract.status}\` |\n`;
  markdown += `| **Last Verified** | ${contract.last_verified} |\n`;
  markdown += `| **Maintainer** | ${contract.maintainer} |\n\n`;

  // Installation
  markdown += `## Installation\n\n`;
  markdown += `\`\`\`bash\n`;
  markdown += `npm install ${contract.package}\n`;
  markdown += `\`\`\`\n\n`;

  // Check if functions array exists
  if (!contract.functions || contract.functions.length === 0) {
    markdown += `## Covered Functions\n\n`;
    markdown += `:::info\nThis contract is still being developed and does not yet define specific functions.\n:::\n\n`;

    const outputPath = path.join(DOCS_DIR, `${packageSlug}.md`);
    fs.writeFileSync(outputPath, markdown);
    console.log(`✅ Generated: ${packageSlug}.md (no functions yet)`);
    return;
  }

  // Functions
  markdown += `## Covered Functions\n\n`;
  markdown += `This contract covers ${contract.functions.length} function(s):\n\n`;

  for (const func of contract.functions) {
    markdown += `### \`${func.name}()\`\n\n`;
    markdown += `${func.description.replace(/[{}<>]/g, '')}\n\n`;

    // Import path
    markdown += `**Import:**\n`;
    markdown += `\`\`\`typescript\n`;
    if (func.import_path.includes('.')) {
      // Property access like "axios.get"
      const parts = func.import_path.split('.');
      markdown += `import ${parts[0]} from '${parts[0]}';\n`;
      markdown += `${parts.slice(0, -1).join('.')}.${func.name}(...);\n`;
    } else {
      markdown += `import { ${func.name} } from '${func.import_path}';\n`;
    }
    markdown += `\`\`\`\n\n`;

    // Preconditions
    if (func.preconditions && func.preconditions.length > 0) {
      markdown += `#### Preconditions\n\n`;
      markdown += `What must be true **before** calling this function:\n\n`;
      for (const pre of func.preconditions) {
        markdown += `**${getSeverityBadge(pre.severity)} - ${pre.id}**\n\n`;
        markdown += `${pre.description.replace(/[{}<>]/g, '')}\n\n`;
        markdown += `📖 [Source](${pre.source})\n\n`;
      }
    }

    // Postconditions
    if (func.postconditions && func.postconditions.length > 0) {
      markdown += `#### Postconditions\n\n`;
      markdown += `What happens **after** calling this function:\n\n`;
      for (const post of func.postconditions) {
        markdown += `**${getSeverityBadge(post.severity)} - ${post.id}**\n\n`;
        markdown += `**Condition:** ${post.condition.replace(/[{}<>]/g, '')}\n\n`;
        if (post.returns) {
          markdown += `**Returns:**\n\n${post.returns.replace(/[{}<>]/g, '')}\n\n`;
        }
        if (post.throws) {
          markdown += `**Throws:** ${post.throws.replace(/[{}<>]/g, '')}\n\n`;
        }
        if (post.required_handling) {
          markdown += `**Required Handling:**\n\n`;
          markdown += `${post.required_handling.replace(/[{}<>]/g, '')}\n\n`;
        }
        markdown += `📖 [Source](${post.source})\n\n`;
      }
    }

    // Edge cases
    if (func.edge_cases && func.edge_cases.length > 0) {
      markdown += `#### Edge Cases\n\n`;
      markdown += `Known gotchas and sharp edges:\n\n`;
      for (const edge of func.edge_cases) {
        markdown += `**${getSeverityBadge(edge.severity)} - ${edge.id}**\n\n`;
        markdown += `${edge.description.replace(/[{}<>]/g, '')}\n\n`;
        markdown += `📖 [Source](${edge.source})\n\n`;
      }
    }

    markdown += `---\n\n`;
  }

  // Usage example
  markdown += `## Example: Proper Error Handling\n\n`;
  const firstFunc = contract.functions[0];
  const hasErrorPostcondition = firstFunc.postconditions?.some(p => p.severity === 'error');

  if (hasErrorPostcondition) {
    markdown += `\`\`\`typescript\n`;
    markdown += `import ${contract.package.split('/').pop()} from '${contract.package}';\n\n`;
    markdown += `async function example() {\n`;
    markdown += `  try {\n`;
    markdown += `    const result = await ${firstFunc.name}(/* args */);\n`;
    markdown += `    // Handle success\n`;
    markdown += `    return result;\n`;
    markdown += `  } catch (error) {\n`;
    markdown += `    // Handle error according to contract postconditions\n`;
    markdown += `    console.error('Error:', error);\n`;
    markdown += `    throw error;\n`;
    markdown += `  }\n`;
    markdown += `}\n`;
    markdown += `\`\`\`\n\n`;
  }

  // See also
  markdown += `## See Also\n\n`;
  markdown += `- [Contract Schema Reference](../contract-schema/schema-reference)\n`;
  markdown += `- [All Supported Packages](./overview)\n`;
  markdown += `- [How to Use verify-cli](../cli-reference/overview)\n`;

  const outputPath = path.join(DOCS_DIR, `${packageSlug}.md`);
  fs.writeFileSync(outputPath, markdown);
  console.log(`✅ Generated: ${packageSlug}.md`);
}

function generateOverviewPage(contracts: Contract[]) {
  // Sort by status and then by package name
  const sortedContracts = contracts.sort((a, b) => {
    const statusOrder = { production: 0, 'in-development': 1, draft: 2, deprecated: 3 };
    const statusA = statusOrder[a.status as keyof typeof statusOrder] ?? 99;
    const statusB = statusOrder[b.status as keyof typeof statusOrder] ?? 99;
    if (statusA !== statusB) return statusA - statusB;
    return a.package.localeCompare(b.package);
  });

  let markdown = `---
sidebar_position: 1
---

# Supported Packages

We currently have behavioral contracts for **${contracts.length} npm packages**.

:::info Auto-Generated
This page is automatically generated from contracts in \`corpus/packages/\`.
Run \`npm run docs:generate-packages\` to regenerate.
:::

## Package List

`;

  // Group by status
  const byStatus: Record<string, Contract[]> = {};
  for (const contract of sortedContracts) {
    if (!byStatus[contract.status]) {
      byStatus[contract.status] = [];
    }
    byStatus[contract.status].push(contract);
  }

  for (const [status, contractList] of Object.entries(byStatus)) {
    const statusLabel = status === 'production' ? '✅ Production Ready' :
                       status === 'in-development' ? '🚧 In Development' :
                       status === 'draft' ? '📝 Draft' :
                       '⚠️ Deprecated';

    markdown += `### ${statusLabel}\n\n`;
    markdown += `| Package | Semver | Functions | Last Verified |\n`;
    markdown += `|---------|--------|-----------|---------------|\n`;

    for (const contract of contractList) {
      const slug = contract.package.replace('@', '').replace('/', '-');
      const functionCount = contract.functions?.length || 0;
      markdown += `| [${contract.package}](./${slug}) | \`${contract.semver}\` | ${functionCount} | ${contract.last_verified} |\n`;
    }

    markdown += `\n`;
  }

  // Statistics
  markdown += `## Statistics\n\n`;
  const totalFunctions = contracts.reduce((sum, c) => sum + (c.functions?.length || 0), 0);
  const productionCount = contracts.filter(c => c.status === 'production').length;

  markdown += `- **Total Packages:** ${contracts.length}\n`;
  markdown += `- **Production Ready:** ${productionCount}\n`;
  markdown += `- **Total Functions Covered:** ${totalFunctions}\n`;
  markdown += `- **Average Functions per Package:** ${(totalFunctions / contracts.length).toFixed(1)}\n\n`;

  // Categories (if we add categories later)
  markdown += `## Package Categories\n\n`;
  markdown += `### HTTP Clients\n`;
  const httpClients = contracts.filter(c => ['axios', 'node-fetch', 'got'].includes(c.package));
  for (const contract of httpClients) {
    const slug = contract.package.replace('@', '').replace('/', '-');
    markdown += `- [${contract.package}](./${slug}.md)\n`;
  }

  markdown += `\n### Database & ORMs\n`;
  const dbPackages = contracts.filter(c => ['@prisma/client', 'pg', 'mongodb', 'sequelize'].some(p => c.package.includes(p)));
  for (const contract of dbPackages) {
    const slug = contract.package.replace('@', '').replace('/', '-');
    markdown += `- [${contract.package}](./${slug}.md)\n`;
  }

  markdown += `\n### All Other Packages\n`;
  const otherPackages = contracts.filter(c =>
    !httpClients.includes(c) && !dbPackages.includes(c)
  );
  for (const contract of otherPackages) {
    const slug = contract.package.replace('@', '').replace('/', '-');
    markdown += `- [${contract.package}](./${slug}.md)\n`;
  }

  markdown += `\n## Contributing\n\n`;
  markdown += `Want to add a contract for a package that's not listed?\n\n`;
  markdown += `See our [Contributing Guide](../contributing/writing-contracts.md) for instructions on:\n`;
  markdown += `- Researching package behavior\n`;
  markdown += `- Writing contracts\n`;
  markdown += `- Submitting for review\n`;

  const outputPath = path.join(DOCS_DIR, 'overview.md');
  fs.writeFileSync(outputPath, markdown);
  console.log(`✅ Generated: overview.md`);
}

function main() {
  console.log('🔧 Generating package documentation...\n');

  ensureDocsDir();

  const contractFiles = findContractFiles();
  console.log(`Found ${contractFiles.length} contract files\n`);

  const contracts: Contract[] = [];
  for (const filePath of contractFiles) {
    try {
      const contract = loadContract(filePath);
      contracts.push(contract);
      generatePackagePage(contract);
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
    }
  }

  generateOverviewPage(contracts);

  console.log(`\n✅ Package documentation generated successfully!`);
  console.log(`   Generated ${contracts.length} package pages + overview`);
}

if (require.main === module) {
  main();
}
