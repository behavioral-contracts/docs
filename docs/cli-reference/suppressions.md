---
sidebar_position: 4
---

# Suppression System

Manage false positives and track analyzer improvements with the suppression system.

## Overview

The suppression system allows you to mark violations as false positives while tracking metadata to detect when the analyzer improves and suppressions become obsolete.

**Key Features:**
- ✅ Inline comment suppression for visibility
- ✅ Config file suppression for global rules
- ✅ Auto-generated manifest tracking metadata
- ✅ Dead suppression detection
- ✅ AI-friendly programmatic API

---

## Quick Start

### Suppress a Single Violation

Add a comment before the line:

```typescript
// @behavioral-contract-ignore axios/network-failure: Global error handler
await axios.get('/api/users');
```

### Suppress All Test Files

Create `.behavioralcontractsrc.json`:

```json
{
  "ignore": [
    {
      "file": "src/test/**",
      "reason": "Test files intentionally trigger errors"
    }
  ]
}
```

### Check for Dead Suppressions

```bash
verify-cli --tsconfig ./tsconfig.json --check-dead-suppressions
```

---

## Inline Comment Syntax

### Format

```typescript
// @behavioral-contract-ignore <package>/<postcondition-id>: <reason>
```

### Examples

**Specific suppression:**
```typescript
// @behavioral-contract-ignore axios/network-failure: Global error handler
await axios.get('/api/users');
```

**Package wildcard:**
```typescript
// @behavioral-contract-ignore */timeout-not-set: Timeout set globally in config
await axios.post('/api/users', data);
```

**Postcondition wildcard:**
```typescript
// @behavioral-contract-ignore prisma/*: NestJS exception filter handles all errors
await prisma.user.create({ data });
```

**Suppress everything (not recommended):**
```typescript
// @behavioral-contract-ignore */*: Legacy code with global error handler
legacyCode();
```

---

## Config File Suppression

### Location

Create `.behavioralcontractsrc.json` in your project root.

### Schema

```json
{
  "ignore": [
    {
      "file": "<glob-pattern>",
      "package": "<package-name>",
      "postconditionId": "<postcondition-id>",
      "reason": "<explanation>"
    }
  ]
}
```

### Examples

**Suppress all test files:**
```json
{
  "ignore": [
    {
      "file": "src/test/**",
      "reason": "Test files intentionally trigger errors"
    },
    {
      "file": "**/*.test.ts",
      "reason": "Test files"
    },
    {
      "file": "**/*.spec.ts",
      "reason": "Test files"
    }
  ]
}
```

**Suppress specific package in specific file:**
```json
{
  "ignore": [
    {
      "file": "src/api/legacy.ts",
      "package": "axios",
      "postconditionId": "network-failure",
      "reason": "Legacy code with global error handler"
    }
  ]
}
```

**Suppress all Prisma errors in API directory:**
```json
{
  "ignore": [
    {
      "file": "src/api/**",
      "package": "@prisma/client",
      "reason": "NestJS exception filter handles all database errors"
    }
  ]
}
```

---

## Suppression Manifest

### Location

Auto-generated at `.verify-cli/suppressions.json`

### What It Tracks

- When suppression was created
- Who/what created it (inline-comment, config-file, ai-agent, cli)
- Last checked timestamp
- Whether it still violates
- Analyzer version when suppressed

### Example

```json
{
  "version": "1.0.0",
  "projectRoot": "/path/to/project",
  "lastUpdated": "2026-02-27T10:30:00Z",
  "suppressions": [
    {
      "id": "suppress-src-api-ts-42-a1b2c3d4",
      "file": "src/api.ts",
      "line": 42,
      "package": "axios",
      "postconditionId": "network-failure",
      "reason": "Global error handler",
      "suppressedAt": "2026-02-27T10:30:00Z",
      "suppressedBy": "inline-comment",
      "lastChecked": "2026-02-27T10:30:00Z",
      "stillViolates": true,
      "analyzerVersion": "1.1.0"
    }
  ]
}
```

### Should I Commit It?

**Recommended: Yes**
- Team-wide tracking
- Shared suppressions
- Audit trail

**Optional: Gitignore**
- Local suppressions only
- Per-developer exceptions

Add to `.gitignore` if needed:
```gitignore
.verify-cli/suppressions.json
```

---

## Dead Suppression Detection

### What Are Dead Suppressions?

Suppressions that are no longer needed because the analyzer has improved and no longer flags the pattern.

### How It Works

On every run, the analyzer:
1. Checks if each suppression location still violates
2. If not, marks `stillViolates: false`
3. Reports dead suppressions to user

### Check for Dead Suppressions

```bash
verify-cli --tsconfig ./tsconfig.json --check-dead-suppressions
```

**Output:**
```
🎉 Found 2 dead suppressions (analyzer improved!):

├─ src/auth.ts:123
│  Package: axios
│  Postcondition: timeout-not-set
│  Suppressed: 2026-01-15 (42 days ago)
│  Analyzer: v1.0.0 → v1.1.0
│
│  Why improved: Analyzer now detects timeout in axios config
│  Action: Remove @behavioral-contract-ignore comment at line 123
```

### Clean Up Dead Suppressions

```bash
# List dead suppressions
verify-cli suppressions list --dead

# Remove from manifest (automatic)
verify-cli suppressions clean --auto

# Note: Inline comments must be removed manually
```

---

## CLI Commands

### Main Command Flags

```bash
# Show suppressed violations in output
verify-cli --tsconfig ./tsconfig.json --show-suppressions

# Check for dead suppressions
verify-cli --tsconfig ./tsconfig.json --check-dead-suppressions

# Fail if dead suppressions found (CI)
verify-cli --tsconfig ./tsconfig.json --fail-on-dead-suppressions
```

### Suppressions Subcommand

```bash
# List all suppressions
verify-cli suppressions list

# List only active suppressions
verify-cli suppressions list --active

# List only dead suppressions
verify-cli suppressions list --dead

# Show specific suppression
verify-cli suppressions show src/api.ts:42

# Show suppression statistics
verify-cli suppressions stats

# Clean up dead suppressions
verify-cli suppressions clean --auto
```

---

## AI Integration

### Workflow

When AI reviews violations and identifies false positives:

```typescript
// 1. AI reads violations
const violations = JSON.parse(await readFile('violations.json'));

// 2. AI identifies false positives
const falsePositives = aiAgent.identifyFalsePositives(violations);

// 3. AI adds inline comments
for (const fp of falsePositives) {
  const fileContent = await readFile(fp.file);
  const lines = fileContent.split('\n');

  lines.splice(fp.line - 1, 0,
    `// @behavioral-contract-ignore ${fp.package}/${fp.postconditionId}: ${fp.reason}`
  );

  await writeFile(fp.file, lines.join('\n'));
}

// 4. Re-run analyzer (manifest auto-updates)
await exec('verify-cli --tsconfig ./tsconfig.json');
```

### Benefits

- ✅ AI can add suppressions programmatically
- ✅ Manifest auto-updates on next run
- ✅ No manual manifest editing needed
- ✅ Full audit trail maintained

---

## Best Practices

### 1. Always Provide Meaningful Reasons

**Bad:**
```typescript
// @behavioral-contract-ignore axios/network-failure: false positive
```

**Good:**
```typescript
// @behavioral-contract-ignore axios/network-failure: Global error handler in src/middleware/errors.ts handles all network failures
```

### 2. Prefer Inline Comments for Specific Cases

Use inline comments when:
- Specific line needs suppression
- Reason is context-dependent
- Developers should see it when reading code

### 3. Prefer Config File for Global Rules

Use config file when:
- Suppressing entire directories (tests, legacy)
- Suppressing all instances of a pattern
- Centralized management needed

### 4. Regularly Clean Dead Suppressions

Set up a monthly task:
```bash
verify-cli --check-dead-suppressions
verify-cli suppressions clean --auto
```

### 5. Use in CI to Prevent Regressions

```yaml
# .github/workflows/verify.yml
- name: Check behavioral contracts
  run: |
    verify-cli --tsconfig ./tsconfig.json --fail-on-dead-suppressions
```

---

## Common Use Cases

### Use Case 1: Framework Handles Errors

**Scenario:** NestJS exception filter handles all database errors

```typescript
// @behavioral-contract-ignore @prisma/client/p2002: NestJS filter handles unique constraint
@Post()
async create(@Body() data: CreateUserDto) {
  return this.prisma.user.create({ data });
}
```

### Use Case 2: Global Error Handler

**Scenario:** Express error middleware catches all errors

```typescript
// @behavioral-contract-ignore axios/*: Global error middleware in app.ts handles all API errors
async function fetchData() {
  const response = await axios.get('/api/data');
  return response.data;
}
```

### Use Case 3: Test Files

**Scenario:** Tests intentionally trigger errors

`.behavioralcontractsrc.json`:
```json
{
  "ignore": [
    {
      "file": "**/*.test.ts",
      "reason": "Test files intentionally trigger errors"
    }
  ]
}
```

### Use Case 4: Legacy Code

**Scenario:** Legacy code with technical debt

```typescript
// @behavioral-contract-ignore */*: Legacy code - refactor in Q3 2026 (JIRA-1234)
// TODO: Add proper error handling
function legacyOperation() {
  // ... old code
}
```

---

## Troubleshooting

### Suppression Not Working

**Check:**
1. Is the format correct? `@behavioral-contract-ignore package/postcondition: reason`
2. Is the comment on the line BEFORE the violation?
3. Is the reason at least 10 characters?
4. Run `verify-cli --show-suppressions` to see if it's detected

### Manifest Not Updating

**Check:**
1. Does `.verify-cli/` directory have write permissions?
2. Is the project root correctly detected?
3. Check for errors in terminal output

### Dead Suppressions Not Detected

**This is expected:**
- Dead suppressions are only detected if `stillViolates` is set to `false`
- Run the analyzer after upgrading to update `stillViolates` status
- The first run after upgrade will mark suppressions as active/dead

---

## FAQ

### Can I suppress all violations in a file?

Use a config rule:
```json
{
  "ignore": [{ "file": "src/problematic.ts", "reason": "Explanation" }]
}
```

### Can I use wildcards in package names?

Yes: `*/postcondition-id` suppresses for all packages.

### What happens if I remove an inline comment?

The suppression is automatically removed from the manifest on the next run.

### Can I manually edit the manifest?

Not recommended. The manifest is auto-generated. Use inline comments or config file instead.

---

## See Also

- [Understanding Output](../getting-started/understanding-output) - How to read violations
- [Fixing Violations](../getting-started/fixing-violations) - Best practices for resolving issues
- [AI Integration](../ai-integration/using-with-claude) - Automate with AI agents
