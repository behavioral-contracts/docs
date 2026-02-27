#!/usr/bin/env ts-node

/**
 * Generate schema reference documentation from contract.schema.json
 *
 * This script:
 * 1. Reads corpus/schema/contract.schema.json
 * 2. Generates docs/contract-schema/schema-reference.md with formatted tables
 * 3. Documents all fields, types, and validation rules
 */

import * as fs from 'fs';
import * as path from 'path';

const SCHEMA_PATH = path.join(__dirname, '../../corpus/schema/contract.schema.json');
const DOCS_DIR = path.join(__dirname, '../docs/contract-schema');

interface SchemaProperty {
  type?: string;
  description?: string;
  pattern?: string;
  enum?: string[];
  minLength?: number;
  items?: any;
  $ref?: string;
  required?: string[];
  properties?: Record<string, SchemaProperty>;
  default?: any;
}

interface Schema {
  properties: Record<string, SchemaProperty>;
  required: string[];
  definitions: Record<string, any>;
}

function ensureDocsDir() {
  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }
}

function loadSchema(): Schema {
  const schemaContent = fs.readFileSync(SCHEMA_PATH, 'utf-8');
  return JSON.parse(schemaContent);
}

function formatType(prop: SchemaProperty): string {
  if (prop.enum) {
    return prop.enum.map(v => `\`"${v}"\``).join(' \\| ');
  }
  if (prop.type === 'array' && prop.items) {
    if (prop.items.$ref) {
      const refName = prop.items.$ref.split('/').pop();
      return `Array<[${refName}](#${refName?.toLowerCase()})>`;
    }
    return `Array<${prop.items.type || 'any'}>`;
  }
  return `\`${prop.type || 'any'}\``;
}

function escapeMarkdown(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function generateSchemaReference(schema: Schema) {
  let markdown = `---
sidebar_position: 2
---

# Schema Reference

This page documents the complete behavioral contract YAML schema.

:::info Auto-Generated
This page is automatically generated from \`corpus/schema/contract.schema.json\`.
Do not edit manually. Run \`npm run docs:generate-schema\` to regenerate.
:::

## Top-Level Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
`;

  // Top-level properties
  for (const [key, prop] of Object.entries(schema.properties)) {
    const isRequired = schema.required.includes(key) ? '✅' : '';
    const description = escapeMarkdown(prop.description || '');
    const type = formatType(prop);

    markdown += `| \`${key}\` | ${type} | ${isRequired} | ${description} |\n`;
  }

  markdown += `\n## Contract Metadata\n\n`;
  markdown += `### package\n\n`;
  markdown += `The npm package name this contract applies to.\n\n`;
  markdown += `**Type:** \`string\`\n\n`;
  markdown += `**Pattern:** Follows npm package naming conventions (supports scoped packages).\n\n`;
  markdown += `**Examples:**\n`;
  markdown += `- \`"axios"\`\n`;
  markdown += `- \`"@prisma/client"\`\n`;
  markdown += `- \`"stripe"\`\n\n`;

  markdown += `### semver\n\n`;
  markdown += `Semantic version range this contract applies to.\n\n`;
  markdown += `**Type:** \`string\`\n\n`;
  markdown += `**Examples:**\n`;
  markdown += `- \`">=1.0.0 <2.0.0"\` - All 1.x versions\n`;
  markdown += `- \`"^5.0.0"\` - 5.x compatible versions\n`;
  markdown += `- \`"*"\` - All versions (use sparingly)\n\n`;

  markdown += `### contract_version\n\n`;
  markdown += `Version of this contract file itself (not the package version).\n\n`;
  markdown += `**Type:** \`string\`\n\n`;
  markdown += `**Format:** \`major.minor.patch\` (semver)\n\n`;
  markdown += `Increment when:\n`;
  markdown += `- **Major:** Breaking changes to contract structure\n`;
  markdown += `- **Minor:** New functions, postconditions, or edge cases added\n`;
  markdown += `- **Patch:** Fixes to descriptions or sources\n\n`;

  markdown += `### status\n\n`;
  markdown += `Quality and validation status of this contract.\n\n`;
  markdown += `**Type:** \`enum\`\n\n`;
  markdown += `**Values:**\n`;
  markdown += `- \`"production"\` - Fully verified and ready for use\n`;
  markdown += `- \`"draft"\` - Initial version, not yet verified\n`;
  markdown += `- \`"in-development"\` - Work in progress\n`;
  markdown += `- \`"deprecated"\` - No longer maintained\n\n`;

  // Definitions (function, precondition, postcondition, edge_case)
  markdown += `\n## Function Definition\n\n`;
  markdown += `Each contract contains an array of functions with their behavioral specifications.\n\n`;

  const functionDef = schema.definitions.function;
  markdown += `### Required Fields\n\n`;
  markdown += `| Field | Type | Description |\n`;
  markdown += `|-------|------|-------------|\n`;
  for (const field of functionDef.required || []) {
    const prop = functionDef.properties[field];
    markdown += `| \`${field}\` | ${formatType(prop)} | ${escapeMarkdown(prop.description || '')} |\n`;
  }

  markdown += `\n### Optional Fields\n\n`;
  markdown += `| Field | Type | Description |\n`;
  markdown += `|-------|------|-------------|\n`;
  for (const [field, prop] of Object.entries(functionDef.properties)) {
    if (!functionDef.required.includes(field)) {
      markdown += `| \`${field}\` | ${formatType(prop as SchemaProperty)} | ${escapeMarkdown((prop as SchemaProperty).description || '')} |\n`;
    }
  }

  // Precondition
  markdown += `\n## Precondition Definition\n\n`;
  markdown += `Conditions that must be true **before** calling a function.\n\n`;

  const preconditionDef = schema.definitions.precondition;
  markdown += `| Field | Type | Required | Description |\n`;
  markdown += `|-------|------|----------|-------------|\n`;
  for (const [field, prop] of Object.entries(preconditionDef.properties)) {
    const isRequired = preconditionDef.required.includes(field) ? '✅' : '';
    markdown += `| \`${field}\` | ${formatType(prop as SchemaProperty)} | ${isRequired} | ${escapeMarkdown((prop as SchemaProperty).description || '')} |\n`;
  }

  markdown += `\n**Example:**\n\n`;
  markdown += `\`\`\`yaml\npreconditions:\n`;
  markdown += `  - id: absolute-url-node\n`;
  markdown += `    description: "URL must be absolute when running in Node.js"\n`;
  markdown += `    source: "https://axios-http.com/docs/req_config"\n`;
  markdown += `    severity: warning\n`;
  markdown += `\`\`\`\n\n`;

  // Postcondition
  markdown += `\n## Postcondition Definition\n\n`;
  markdown += `Outcomes that occur **after** calling a function (returns/throws).\n\n`;

  const postconditionDef = schema.definitions.postcondition;
  markdown += `| Field | Type | Required | Description |\n`;
  markdown += `|-------|------|----------|-------------|\n`;
  for (const [field, prop] of Object.entries(postconditionDef.properties)) {
    const isRequired = postconditionDef.required.includes(field) ? '✅' : '';
    markdown += `| \`${field}\` | ${formatType(prop as SchemaProperty)} | ${isRequired} | ${escapeMarkdown((prop as SchemaProperty).description || '')} |\n`;
  }

  markdown += `\n**Important:** If \`severity: error\`, then \`required_handling\` is mandatory.\n\n`;

  markdown += `\n**Example:**\n\n`;
  markdown += `\`\`\`yaml\npostconditions:\n`;
  markdown += `  - id: network-failure\n`;
  markdown += `    condition: "network error or timeout"\n`;
  markdown += `    throws: "AxiosError with error.response === undefined"\n`;
  markdown += `    required_handling: >\n`;
  markdown += `      Caller MUST check if error.response exists before accessing it.\n`;
  markdown += `    source: "https://axios-http.com/docs/handling_errors"\n`;
  markdown += `    severity: error\n`;
  markdown += `\`\`\`\n\n`;

  // Edge case
  markdown += `\n## Edge Case Definition\n\n`;
  markdown += `Known gotchas, sharp edges, and non-obvious behavior.\n\n`;

  const edgeCaseDef = schema.definitions.edge_case;
  markdown += `| Field | Type | Required | Description |\n`;
  markdown += `|-------|------|----------|-------------|\n`;
  for (const [field, prop] of Object.entries(edgeCaseDef.properties)) {
    const isRequired = edgeCaseDef.required.includes(field) ? '✅' : '';
    markdown += `| \`${field}\` | ${formatType(prop as SchemaProperty)} | ${isRequired} | ${escapeMarkdown((prop as SchemaProperty).description || '')} |\n`;
  }

  markdown += `\n**Note:** Edge cases can only have \`warning\` or \`info\` severity (not \`error\`).\n\n`;

  markdown += `\n**Example:**\n\n`;
  markdown += `\`\`\`yaml\nedge_cases:\n`;
  markdown += `  - id: timeout-default-zero\n`;
  markdown += `    description: "Default timeout is 0 (no timeout). Production should set explicit timeout."\n`;
  markdown += `    source: "https://axios-http.com/docs/req_config"\n`;
  markdown += `    severity: info\n`;
  markdown += `\`\`\`\n\n`;

  // Severity levels
  markdown += `\n## Severity Levels\n\n`;
  markdown += `| Level | Meaning | When to Use |\n`;
  markdown += `|-------|---------|-------------|\n`;
  markdown += `| \`error\` | Must fix - causes crashes, data loss, security issues | Unhandled exceptions, missing required checks |\n`;
  markdown += `| \`warning\` | Should fix - edge cases, performance issues | Non-critical but important issues |\n`;
  markdown += `| \`info\` | Nice to know - best practices, gotchas | Educational notes, best practices |\n\n`;

  // Complete example
  markdown += `\n## Complete Example\n\n`;
  markdown += `\`\`\`yaml\npackage: axios\n`;
  markdown += `semver: ">=1.0.0 <2.0.0"\n`;
  markdown += `contract_version: "1.0.0"\n`;
  markdown += `maintainer: "corpus-team"\n`;
  markdown += `last_verified: "2026-02-27"\n`;
  markdown += `status: production\n\n`;
  markdown += `functions:\n`;
  markdown += `  - name: get\n`;
  markdown += `    import_path: "axios"\n`;
  markdown += `    description: "Makes an HTTP GET request"\n\n`;
  markdown += `    preconditions:\n`;
  markdown += `      - id: absolute-url-node\n`;
  markdown += `        description: "URL must be absolute in Node.js"\n`;
  markdown += `        source: "https://axios-http.com/docs/req_config"\n`;
  markdown += `        severity: warning\n\n`;
  markdown += `    postconditions:\n`;
  markdown += `      - id: network-failure\n`;
  markdown += `        condition: "network error or timeout"\n`;
  markdown += `        throws: "AxiosError"\n`;
  markdown += `        required_handling: "Check error.response exists"\n`;
  markdown += `        source: "https://axios-http.com/docs/handling_errors"\n`;
  markdown += `        severity: error\n\n`;
  markdown += `    edge_cases:\n`;
  markdown += `      - id: timeout-default-zero\n`;
  markdown += `        description: "Default timeout is 0"\n`;
  markdown += `        source: "https://axios-http.com/docs/req_config"\n`;
  markdown += `        severity: info\n`;
  markdown += `\`\`\`\n\n`;

  markdown += `\n## See Also\n\n`;
  markdown += `- [Understanding the Contract Schema](./overview.md) - Conceptual explanation\n`;
  markdown += `- [Writing Contracts](./writing-contracts.md) - How to create contracts\n`;
  markdown += `- [Examples](./examples.md) - Real-world contract examples\n`;

  const outputPath = path.join(DOCS_DIR, 'schema-reference.md');
  fs.writeFileSync(outputPath, markdown);
  console.log(`✅ Generated: ${outputPath}`);
}

function main() {
  console.log('🔧 Generating schema documentation...\n');

  ensureDocsDir();

  const schema = loadSchema();
  generateSchemaReference(schema);

  console.log('\n✅ Schema documentation generated successfully!');
}

if (require.main === module) {
  main();
}
