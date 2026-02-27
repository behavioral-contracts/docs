---
sidebar_position: 1
---

# What Are Behavioral Contracts?

:::info Work In Progress
This documentation is being built. Phase 2 will include the full Q&A content explaining the behavioral contract schema.
:::

## Quick Overview

**Behavioral contracts** are machine-readable specifications of runtime behavior that TypeScript can't express.

### The Problem

```typescript
// TypeScript says this is fine ✅
async function getUser(id: string): Promise<User> {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
}

// But at runtime... 💥
// - Network fails → Unhandled AxiosError
// - 429 rate limit → Ignored, retries spam the API
// - 500 server error → App crashes
```

**TypeScript only checks types, not behavior.** Behavioral contracts fill this gap.

### The Solution

Behavioral contracts document:
1. **Preconditions** - What must be true before calling
2. **Postconditions** - What errors can be thrown and how to handle them
3. **Edge cases** - Known gotchas from GitHub issues

Every claim is backed by official documentation URLs.

### Example Contract

```yaml
package: axios
functions:
  - name: get
    postconditions:
      - id: network-failure
        condition: "network error or timeout"
        throws: "AxiosError with error.response === undefined"
        required_handling: >
          Caller MUST check if error.response exists before accessing it.
        source: "https://axios-http.com/docs/handling_errors"
        severity: error
```

### How It Works

1. **Write code** (or use existing code)
2. **Run verify-cli** - Static analyzer reads contracts and scans your code
3. **Get violations** - Detailed errors with fix suggestions
4. **Fix issues** - Follow required_handling guidance
5. **Repeat** - Until all violations are resolved

## Coming Soon

Full documentation including:
- Detailed schema explanation
- Comparison to other tools
- How to write contracts
- AI integration guides
- And more...

## Get Started

Install the CLI:

```bash
npm install -g @behavioral-contracts/verify-cli
```

Run your first scan:

```bash
verify-cli --tsconfig ./tsconfig.json
```
