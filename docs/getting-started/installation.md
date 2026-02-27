---
sidebar_position: 1
---

# Installation

Get started with behavioral contract verification in seconds.

## Recommended: Use npx (No Installation Required)

The fastest way to get started is with npx:

```bash
npx @behavioral-contracts/verify-cli --tsconfig ./tsconfig.json
```

This automatically downloads the latest version and all behavioral contracts.

## Alternative: Global Install

For repeated use, install globally:

```bash
npm install -g @behavioral-contracts/verify-cli
```

Then run with either command:

```bash
behavioral-contracts --tsconfig ./tsconfig.json
# or
verify-cli --tsconfig ./tsconfig.json
```

## Alternative: Project Dependency

Add to your project for CI/CD integration:

```bash
npm install --save-dev @behavioral-contracts/verify-cli
```

Add to `package.json` scripts:

```json
{
  "scripts": {
    "verify": "behavioral-contracts --tsconfig ./tsconfig.json"
  }
}
```

Run with:

```bash
npm run verify
```

## Verify Installation

Check that it's working:

```bash
npx @behavioral-contracts/verify-cli --version
```

You should see version `1.0.0` or higher.

## What Gets Installed

When you install `@behavioral-contracts/verify-cli`, you automatically get:

- ✅ The verification CLI tool
- ✅ The complete corpus of behavioral contracts (66+ packages)
- ✅ Schema validation
- ✅ Both command aliases: `behavioral-contracts` and `verify-cli`

Total size: ~2 MB

## Requirements

- Node.js 18 or higher
- A TypeScript project with `tsconfig.json`

## Next Steps

- [Run your first scan](./your-first-scan)
- [Understand the output](./understanding-output)
