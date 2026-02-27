---
sidebar_position: 2
---

# Command Reference

## verify-cli

The main command for running behavioral contract verification.

### Required Options

#### `--tsconfig <path>`

Path to your TypeScript configuration file.

**Example:**
```bash
verify-cli --tsconfig ./tsconfig.json
```

The analyzer uses this to:
- Determine which files to analyze
- Resolve module imports
- Apply TypeScript compiler options

### Optional Options

#### `--corpus <path>`

Path to the corpus directory containing behavioral contracts.

**Default:** Downloads from npm package `@behavioral-contracts/corpus`

**Example:**
```bash
verify-cli --tsconfig ./tsconfig.json --corpus ./local-corpus
```

Use this when:
- Testing local contract changes
- Using custom/private contracts
- Working offline

---

#### `--output <path>`

Path to write JSON output file.

**Default:** Prints to stdout only

**Example:**
```bash
verify-cli --tsconfig ./tsconfig.json --output violations.json
```

Output format:
```json
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
```

---

#### `--fail-on-error`

Exit with non-zero code if any ERROR-level violations are found.

**Default:** Always exits with code 0

**Example:**
```bash
verify-cli --tsconfig ./tsconfig.json --fail-on-error
```

Use in CI/CD to fail builds when critical issues are found.

---

#### `--severity <level>`

Minimum severity level to report.

**Options:** `error`, `warning`, `info`

**Default:** `info` (reports all)

**Example:**
```bash
# Only show errors and warnings
verify-cli --tsconfig ./tsconfig.json --severity warning
```

---

#### `--help`

Show help message and exit.

---

#### `--version`

Show version number and exit.

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success (or violations found but `--fail-on-error` not set) |
| 1 | Error-level violations found (with `--fail-on-error`) |
| 2 | Invalid arguments or configuration |
| 3 | Runtime error (file not found, parse error, etc.) |

## Environment Variables

### `CORPUS_PATH`

Override default corpus location.

```bash
export CORPUS_PATH=/path/to/corpus
verify-cli --tsconfig ./tsconfig.json
```

### `VERIFY_CLI_DEBUG`

Enable debug logging.

```bash
VERIFY_CLI_DEBUG=1 verify-cli --tsconfig ./tsconfig.json
```
