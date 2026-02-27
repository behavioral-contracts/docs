---
sidebar_position: 3
---

# Understanding Output

Learn how to read and interpret behavioral contract violations.

## Output Formats

verify-cli supports two output modes:

### 1. Human-Readable (Terminal)

Default output with colors and formatting:

```bash
verify-cli --tsconfig ./tsconfig.json
```

**Best for:** Interactive development, quick scans

### 2. Machine-Readable (JSON)

Structured output for tooling and AI:

```bash
verify-cli --tsconfig ./tsconfig.json --output violations.json
```

**Best for:** CI/CD, AI integration, custom tooling

---

## Anatomy of a Violation

Each violation includes:

```
❌ ERROR: Missing error handling for axios.get()
   │
   ├─ Location: src/api/users.ts:42:15
   │  The exact file, line, and column where the issue was found
   │
   ├─ Function: axios.get()
   │  Which function call triggered the violation
   │
   ├─ Contract: axios@1.6.0 → get → network-failure
   │  Package version → function → specific postcondition
   │
   ├─ Severity: ERROR
   │  How critical this issue is (ERROR | WARNING | INFO)
   │
   ├─ Required Handling:
   │  What you MUST do to fix this
   │
   │  Caller MUST check if error.response exists before accessing it.
   │  Network errors have error.request but NO error.response property.
   │
   ├─ Source: https://axios-http.com/docs/handling_errors
   │  Official documentation backing this claim
   │
   └─ Fix:
      Suggested code to resolve the violation

      try {
        const response = await axios.get('/api/users');
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // Handle HTTP errors
        } else {
          // Handle network errors
        }
      }
```

---

## Severity Levels

### 🔴 ERROR - Must Fix

**Impact:** Crashes, data loss, security issues, unhandled exceptions

**Examples:**
- Missing try-catch around network calls
- Not checking `error.response` exists (causes `Cannot read property 'status' of undefined`)
- Ignoring 429 rate limits without retry logic

**Action:** Fix immediately. These cause production incidents.

---

### ⚠️ WARNING - Should Fix

**Impact:** Edge cases, performance issues, subtle bugs

**Examples:**
- Using relative URLs in Node.js (works in browser, fails in Node)
- Not setting explicit timeouts (defaults to infinite)
- Retrying POST requests without idempotency keys

**Action:** Fix when convenient. These can bite you in specific scenarios.

---

### ℹ️ INFO - Nice to Know

**Impact:** Best practices, gotchas, educational notes

**Examples:**
- "Request cancellation throws with error.code === 'ERR_CANCELED'"
- "Default timeout is 0. Consider setting explicit timeout in production."

**Action:** Awareness. Consider implementing if it fits your use case.

---

## JSON Output Structure

When using `--output violations.json`, the structure is:

```json
{
  "summary": {
    "totalViolations": 5,
    "errorCount": 3,
    "warningCount": 2,
    "infoCount": 0,
    "filesAnalyzed": 42,
    "packagesChecked": ["axios@1.6.0", "@prisma/client@5.0.0"]
  },
  "violations": [
    {
      "severity": "error",
      "package": "axios",
      "packageVersion": "1.6.0",
      "function": "get",
      "postconditionId": "network-failure",
      "file": "src/api/users.ts",
      "line": 42,
      "column": 15,
      "message": "Missing error handling for axios.get()",
      "requiredHandling": "Caller MUST check if error.response exists...",
      "source": "https://axios-http.com/docs/handling_errors",
      "codeSnippet": "  const response = await axios.get('/api/users');",
      "suggestedFix": "try { ... } catch (error) { ... }"
    },
    // ... more violations
  ]
}
```

### Fields Explained

| Field | Description |
|-------|-------------|
| `severity` | `"error"`, `"warning"`, or `"info"` |
| `package` | npm package name (e.g., `"axios"`) |
| `packageVersion` | Installed version (e.g., `"1.6.0"`) |
| `function` | Function name from contract (e.g., `"get"`) |
| `postconditionId` | Which postcondition was violated (e.g., `"network-failure"`) |
| `file` | Absolute or relative file path |
| `line` | Line number (1-indexed) |
| `column` | Column number (1-indexed) |
| `message` | Human-readable description |
| `requiredHandling` | What you must do to fix |
| `source` | URL to official documentation |
| `codeSnippet` | The problematic code line |
| `suggestedFix` | Example fix (may be incomplete) |

---

## Filtering Output

### By Severity

Show only errors:

```bash
verify-cli --tsconfig ./tsconfig.json --severity error
```

Show errors and warnings (hide info):

```bash
verify-cli --tsconfig ./tsconfig.json --severity warning
```

### By Package

Check only specific packages:

```bash
verify-cli --tsconfig ./tsconfig.json --packages axios,stripe
```

### By File Pattern

Analyze only specific directories:

```bash
verify-cli --tsconfig ./tsconfig.json --include "src/api/**"
```

---

## Interpreting Summary Statistics

```
Summary:
  Files Analyzed: 127
  Packages Checked: 8
  Total Violations: 23
  ├─ Errors: 15
  ├─ Warnings: 7
  └─ Info: 1
```

### What This Tells You

**Files Analyzed: 127**
Number of TypeScript files scanned

**Packages Checked: 8**
Number of packages with behavioral contracts found in your dependencies

**Violations Breakdown:**
- **Errors (15)**: Critical issues, fix ASAP
- **Warnings (7)**: Important but not urgent
- **Info (1)**: Educational notes

### Benchmarks

| Violations per 1000 LOC | Rating |
|------------------------|--------|
| 0-2 | 🟢 Excellent |
| 3-5 | 🟡 Good |
| 6-10 | 🟠 Needs improvement |
| 11+ | 🔴 Critical - prioritize fixes |

---

## Common Patterns

### Pattern 1: Missing Try-Catch

**Violation:**
```
❌ ERROR: axios.get() called without try-catch
```

**Cause:** Network call not wrapped in error handling

**Fix:** Add try-catch with proper error type checking

### Pattern 2: Unsafe Error Property Access

**Violation:**
```
❌ ERROR: Accessing error.response without null check
```

**Cause:** Assuming `error.response` always exists

**Fix:**
```typescript
if (axios.isAxiosError(error) && error.response) {
  // Safe to access error.response.status
}
```

### Pattern 3: Ignored Rate Limits

**Violation:**
```
❌ ERROR: 429 rate limit not handled
```

**Cause:** Catching errors but not implementing retry logic for 429

**Fix:** Implement exponential backoff or respect `Retry-After` header

---

## False Positives

### When to Suppress

You might want to suppress a violation if:

1. **You have a global error handler**
   ```typescript
   // @behavioral-contract-ignore axios/network-failure: Global error boundary handles this
   await axios.get('/api/users');
   ```

2. **Framework handles errors**
   ```typescript
   // @behavioral-contract-ignore prisma/p2002: NestJS exception filter handles this
   await prisma.user.create({ data });
   ```

3. **Testing/development code**
   ```typescript
   // Test file - errors are expected to throw
   ```

### How to Suppress

**Inline comment:**
```typescript
// @behavioral-contract-ignore <package>/<postcondition-id>: <reason>
```

**Config file (`.behavioralcontractsrc.json`):**
```json
{
  "ignore": [
    {
      "file": "src/test/**",
      "reason": "Test files intentionally trigger errors"
    },
    {
      "package": "axios",
      "postconditionId": "network-failure",
      "file": "src/api/legacy.ts",
      "reason": "Legacy code with global error handler"
    }
  ]
}
```

---

## Next Steps

- [Fixing Violations](./fixing-violations) - Best practices for resolving issues
- [AI Integration](../ai-integration/using-with-claude) - Automate fixes with Claude
- [CLI Reference](../cli-reference/overview) - All CLI options
