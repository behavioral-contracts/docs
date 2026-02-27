---
sidebar_position: 1
---

# Using with Claude

Automate fixing behavioral contract violations using Claude (or other AI agents).

## Overview

The verify-cli produces structured JSON output specifically designed for AI agents. You can:

1. **Export violations** to JSON
2. **Feed to Claude** with context
3. **Get automated fixes** with explanations
4. **Review and apply** fixes to your codebase

---

## Quick Workflow

### Step 1: Run verification and export JSON

```bash
cd /path/to/your/project

verify-cli --tsconfig ./tsconfig.json --output violations.json
```

This creates `violations.json` with structured violation data.

### Step 2: Craft your prompt

```
I'm using behavioral contracts to check my TypeScript code for missing error handling.
Here are the violations found:

[paste contents of violations.json]

Please fix each violation following the "requiredHandling" instructions in each violation.
For each fix:
1. Show the file path and line number
2. Show the original code
3. Show the fixed code with proper error handling
4. Explain what changed and why

Use the "source" URLs for additional context if needed.
```

### Step 3: Review AI-generated fixes

Claude will respond with something like:

```
I'll fix each violation systematically:

## src/api/users.ts:42

**Violation:** Missing error handling for axios.get() - network-failure postcondition

**Original code:**
```typescript
async function fetchUser(id: string) {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
}
```

**Fixed code:**
```typescript
async function fetchUser(id: string) {
  try {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // HTTP error (4xx, 5xx)
        throw new UserFetchError(
          `Failed to fetch user ${id}: HTTP ${error.response.status}`,
          error.response.status
        );
      } else {
        // Network error - no response received
        throw new NetworkError(
          'Failed to reach API server. Check network connection.'
        );
      }
    }
    throw error;
  }
}
```

**What changed:**
- Added try-catch to handle AxiosError
- Used axios.isAxiosError() type guard
- Check error.response exists before accessing (prevents crash on network errors)
- Separated HTTP errors from network errors with specific error types

[... continues for each violation ...]
```

### Step 4: Apply fixes

Review each fix and apply to your codebase. Then re-run verification:

```bash
verify-cli --tsconfig ./tsconfig.json --output after-fixes.json
```

---

## Advanced Workflows

### Workflow 1: Batch Fix by Package

Fix all violations for one package at a time:

```bash
# Extract axios violations only
jq '.violations[] | select(.package == "axios")' violations.json > axios-violations.json
```

**Prompt:**
```
Fix all axios violations in this file:

[paste axios-violations.json]

Create a comprehensive error handling wrapper for axios that:
1. Handles network failures
2. Handles HTTP errors (4xx, 5xx)
3. Handles rate limits (429) with exponential backoff
4. Provides clear error messages

Then show how to refactor each violation to use this wrapper.
```

### Workflow 2: Generate Error Handling Utilities

**Prompt:**
```
Based on these violations:

[paste violations.json]

Generate reusable error handling utilities for each package:
- axios: apiGet(), apiPost() wrappers with built-in error handling
- prisma: safe CRUD wrappers that handle P2002 (unique constraint)
- stripe: API wrapper with rate limit handling

Then show how to refactor violations to use these utilities.
```

Claude will generate utilities like:

```typescript
// utils/api.ts
export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new RateLimitError('Rate limit exceeded. Try again later.');
      }
      if (error.response) {
        throw new ApiError(`HTTP ${error.response.status}`, error.response.status);
      }
      throw new NetworkError('Network request failed');
    }
    throw error;
  }
}
```

### Workflow 3: Generate Tests for Fixes

**Prompt:**
```
I fixed these violations:

[paste fixed code]

Generate unit tests using vitest that verify:
1. Network error handling works correctly
2. HTTP error handling works correctly
3. Rate limit handling works correctly
4. Mock axios to return different error types
```

Claude will generate comprehensive tests:

```typescript
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchUser } from './api';

describe('fetchUser error handling', () => {
  it('handles network errors gracefully', async () => {
    vi.spyOn(axios, 'get').mockRejectedValue({
      isAxiosError: true,
      request: {},
      response: undefined,
    });

    await expect(fetchUser('123')).rejects.toThrow(NetworkError);
  });

  it('handles HTTP 404 errors', async () => {
    vi.spyOn(axios, 'get').mockRejectedValue({
      isAxiosError: true,
      response: { status: 404 },
    });

    await expect(fetchUser('123')).rejects.toThrow(UserNotFoundError);
  });
});
```

---

## Prompt Templates

### Template 1: Basic Fix Request

```
Fix behavioral contract violations:

Context:
- Project: [describe your project]
- Packages used: [list main dependencies]

Violations:
[paste violations.json]

Requirements:
1. Follow the requiredHandling guidance exactly
2. Use TypeScript best practices
3. Create custom error types if needed
4. Add comments explaining the error handling
5. Keep existing business logic intact

Please provide fixes for each violation.
```

### Template 2: Refactoring Request

```
Refactor code to fix violations with a consistent pattern:

Violations:
[paste violations.json]

Please:
1. Analyze the common patterns in these violations
2. Create reusable error handling utilities
3. Show how to refactor each violation to use the utilities
4. Generate TypeScript error classes as needed
5. Show the directory structure for where to put these utilities
```

### Template 3: Documentation Request

```
Document the error handling patterns:

Fixed code:
[paste your fixes]

Please create:
1. JSDoc comments for each error handling function
2. A markdown guide explaining the error handling strategy
3. Code examples showing correct usage
4. Common pitfalls to avoid
```

---

## Best Practices

### ✅ DO:

**Provide full context:**
```
My codebase uses NestJS with Prisma. We have a global exception filter that catches all errors.
Should I still add try-catch blocks for these Prisma violations?

[paste violations]
```

**Request explanations:**
```
Fix these violations and explain:
- Why each fix is necessary
- What happens if we don't fix it
- Any performance implications
```

**Ask for alternatives:**
```
Fix this violation, and show me 2 alternative approaches:
1. Wrapper function approach
2. Axios interceptor approach

Explain pros/cons of each.

[paste violation]
```

### ❌ DON'T:

**Blindly accept all fixes:**
- Always review for business logic correctness
- Check if AI understood your codebase patterns
- Verify the fix matches your error handling strategy

**Paste too much at once:**
- Start with 5-10 violations
- Learn the patterns
- Then scale up to batch processing

**Skip testing:**
- AI-generated code needs testing
- Use the "generate tests" workflow above
- Actually run the tests

---

## Integration with Claude Code

If you're using Claude Code (the CLI/IDE integration):

### In VS Code

1. Install Claude Code extension
2. Run verification: `verify-cli --output violations.json`
3. Open `violations.json` in VS Code
4. Select violations → Right-click → "Ask Claude"
5. Use prompt: "Fix these behavioral contract violations"

### In Terminal

```bash
# Generate violations
verify-cli --tsconfig ./tsconfig.json --output violations.json

# Feed to Claude Code
cat violations.json | claude-code "Fix these behavioral contract violations"
```

---

## Measuring Success

### Before AI Fixes

```bash
verify-cli --tsconfig ./tsconfig.json
```

```
Summary:
  Total Violations: 47
  Errors: 32
  Warnings: 15
```

### After AI Fixes

```bash
verify-cli --tsconfig ./tsconfig.json
```

```
Summary:
  Total Violations: 3
  Errors: 0
  Warnings: 3
```

### Track Improvement

```bash
echo "Before: 47 violations" > fix-progress.txt
echo "After: 3 violations" >> fix-progress.txt
echo "Fixed: 44 (93.6%)" >> fix-progress.txt
```

---

## Troubleshooting

### AI hallucinates package APIs

**Problem:** Claude suggests methods that don't exist

**Solution:** Provide package documentation in your prompt:

```
Fix these axios violations.

For context, here's the axios error handling docs:
[paste relevant axios docs]

Violations:
[paste violations.json]
```

### Fixes don't compile

**Problem:** AI-generated code has TypeScript errors

**Solution:** Iterate with compilation errors:

```
The code you suggested has this TypeScript error:

[paste error]

Please fix the code to compile correctly.
```

### Fixes break existing logic

**Problem:** AI changes business logic while fixing errors

**Solution:** Be explicit about what NOT to change:

```
Fix the error handling ONLY. Do not change:
- Function signatures
- Business logic
- Return values
- Existing variable names

[paste violations]
```

---

## Next Steps

- [Prompt Templates](./prompt-templates.md) - Ready-to-use prompts
- [Automating Fixes](./automating-fixes.md) - Scripts for batch processing
- [CI/CD Integration](../cli-reference/ci-cd-integration.md) - Prevent new violations
