---
sidebar_position: 2
---

# Your First Scan

Let's run behavioral contract verification on a sample project.

## Prerequisites

- Node.js 18+ installed
- A TypeScript project (or use our sample)
- verify-cli installed ([see installation](./installation.md))

## Quick Test with Sample Code

Create a test file to see behavioral contracts in action:

### Step 1: Create a test project

```bash
mkdir behavioral-contracts-demo
cd behavioral-contracts-demo
npm init -y
npm install typescript axios @types/node
npx tsc --init
```

### Step 2: Create a file with violations

Create `src/api.ts`:

```typescript
import axios from 'axios';

// ❌ This has multiple violations
async function fetchUser(id: string) {
  const response = await axios.get(`https://api.example.com/users/${id}`);
  return response.data;
}

// ❌ This also has violations
async function createUser(data: any) {
  const response = await axios.post('https://api.example.com/users', data);
  return response.data;
}
```

### Step 3: Run the scan

```bash
npx @behavioral-contracts/verify-cli --tsconfig ./tsconfig.json
```

### Step 4: Review the output

You should see output like:

```
🔍 Analyzing TypeScript project...

📦 Loading behavioral contracts for:
  - axios@1.6.0

❌ Found 4 violations:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ ERROR: Missing error handling for axios.get()

  Location: src/api.ts:5:18
  Function: axios.get()
  Postcondition: network-failure

  The function axios.get() can throw AxiosError when network errors
  occur, but no try-catch block was found.

  Required Handling:
  Caller MUST check if error.response exists before accessing it.
  Network errors have error.request but NO error.response property.

  Source: https://axios-http.com/docs/handling_errors

  Fix:
  try {
    const response = await axios.get(...);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle HTTP errors (4xx, 5xx)
      } else {
        // Handle network errors
      }
    }
  }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[... more violations ...]

Summary:
  Total Violations: 4
  Errors: 4
  Warnings: 0
```

---

## Understanding What Happened

The analyzer:
1. ✅ Read your `tsconfig.json` to find all TypeScript files
2. ✅ Downloaded behavioral contracts for `axios` (and any other packages)
3. ✅ Analyzed your code for function calls that match contracts
4. ✅ Found calls without proper error handling
5. ✅ Reported violations with fix suggestions

---

## Scanning Your Real Project

### Step 1: Navigate to your project

```bash
cd /path/to/your/project
```

### Step 2: Run the scan

```bash
npx @behavioral-contracts/verify-cli --tsconfig ./tsconfig.json
```

### Step 3: Save results to file

```bash
npx @behavioral-contracts/verify-cli \
  --tsconfig ./tsconfig.json \
  --output violations.json
```

This creates `violations.json` with structured violation data.

---

## What to Do Next

Depending on your results:

### ✅ No Violations Found

```
✅ No violations found! Your code follows all behavioral contracts.
```

Great! Your error handling is solid for the packages we cover.

**Next steps:**
- Add to your CI/CD pipeline (see [CI/CD Integration](../cli-reference/ci-cd-integration.md))
- Write contracts for your internal packages (see [Writing Contracts](../contract-schema/writing-contracts.md))

### ❌ Violations Found

See the next guide: [Understanding Output](./understanding-output.md) to learn how to:
- Read violation reports
- Prioritize which to fix first
- Use the fix suggestions
- Suppress false positives

---

## Common Issues

### "Cannot find module 'axios'"

The analyzer needs your dependencies installed:

```bash
npm install
# or
yarn install
```

### "Could not find tsconfig.json"

Make sure you're in the project root or specify the path:

```bash
verify-cli --tsconfig ./path/to/tsconfig.json
```

### "No contracts found for package X"

We might not have a contract for that package yet. You can:
- Check [Supported Packages](../supported-packages/overview.md) for the full list
- Request a contract via [GitHub Issues](https://github.com/behavioral-contracts/corpus/issues)
- Write your own contract (see [Contributing](../contributing/writing-contracts.md))

---

## Performance Tips

### Large Codebases

For projects with 1000+ files, scanning can take time. Speed it up by:

**1. Scan specific directories:**

Edit your `tsconfig.json` to include only relevant files:

```json
{
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

**2. Use incremental mode:**

```bash
verify-cli --tsconfig ./tsconfig.json --incremental
```

This caches results and only re-analyzes changed files.

**3. Parallelize in CI:**

Split analysis across multiple jobs:

```bash
# Job 1
verify-cli --tsconfig ./tsconfig.json --include "src/api/**"

# Job 2
verify-cli --tsconfig ./tsconfig.json --include "src/services/**"
```

---

## Next Steps

- [Understanding Output](./understanding-output.md) - Learn to read violation reports
- [Fixing Violations](./fixing-violations.md) - Best practices for fixing issues
- [AI Integration](../ai-integration/using-with-claude.md) - Automate fixes with AI
