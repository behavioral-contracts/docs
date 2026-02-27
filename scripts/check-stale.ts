#!/usr/bin/env ts-node

/**
 * Check if auto-generated docs are stale (out of sync with source)
 *
 * Compares timestamps:
 * - corpus/schema/contract.schema.json vs docs/contract-schema/schema-reference.md
 * - corpus/packages/*\/contract.yaml vs docs/supported-packages/overview.md
 * - verify-cli/package.json vs docs/cli-reference/overview.md
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

const CORPUS_SCHEMA = path.join(__dirname, '../../corpus/schema/contract.schema.json');
const SCHEMA_DOCS = path.join(__dirname, '../docs/contract-schema/schema-reference.md');

const CORPUS_PACKAGES = path.join(__dirname, '../../corpus/packages');
const PACKAGES_DOCS = path.join(__dirname, '../docs/supported-packages/overview.md');

const VERIFY_CLI = path.join(__dirname, '../../verify-cli/package.json');
const CLI_DOCS = path.join(__dirname, '../docs/cli-reference/overview.md');

function getModifiedTime(filePath: string): number {
  if (!fs.existsSync(filePath)) return 0;
  return fs.statSync(filePath).mtimeMs;
}

function getLatestContractTime(): number {
  const contracts = glob.sync(path.join(CORPUS_PACKAGES, '**/contract.yaml'));
  return Math.max(...contracts.map(getModifiedTime), 0);
}

function main() {
  console.log('🔍 Checking if auto-generated docs are stale...\n');

  let isStale = false;

  // Check schema docs
  const schemaTime = getModifiedTime(CORPUS_SCHEMA);
  const schemaDocsTime = getModifiedTime(SCHEMA_DOCS);

  if (schemaTime > schemaDocsTime) {
    console.log('⚠️  Schema docs are STALE');
    console.log(`   Source: ${new Date(schemaTime).toISOString()}`);
    console.log(`   Docs:   ${new Date(schemaDocsTime).toISOString()}`);
    console.log(`   Run: npm run docs:generate-schema\n`);
    isStale = true;
  } else {
    console.log('✅ Schema docs are up to date\n');
  }

  // Check package docs
  const latestContractTime = getLatestContractTime();
  const packagesDocsTime = getModifiedTime(PACKAGES_DOCS);

  if (latestContractTime > packagesDocsTime) {
    console.log('⚠️  Package docs are STALE');
    console.log(`   Source: ${new Date(latestContractTime).toISOString()}`);
    console.log(`   Docs:   ${new Date(packagesDocsTime).toISOString()}`);
    console.log(`   Run: npm run docs:generate-packages\n`);
    isStale = true;
  } else {
    console.log('✅ Package docs are up to date\n');
  }

  // Check CLI docs
  const cliTime = getModifiedTime(VERIFY_CLI);
  const cliDocsTime = getModifiedTime(CLI_DOCS);

  if (cliTime > cliDocsTime) {
    console.log('⚠️  CLI docs are STALE');
    console.log(`   Source: ${new Date(cliTime).toISOString()}`);
    console.log(`   Docs:   ${new Date(cliDocsTime).toISOString()}`);
    console.log(`   Run: npm run docs:generate-cli\n`);
    isStale = true;
  } else {
    console.log('✅ CLI docs are up to date\n');
  }

  if (isStale) {
    console.log('💡 To regenerate all: npm run docs:generate');
    process.exit(1);
  } else {
    console.log('🎉 All auto-generated docs are up to date!');
  }
}

if (require.main === module) {
  main();
}
