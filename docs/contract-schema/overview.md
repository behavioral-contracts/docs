---
sidebar_position: 1
---

# Understanding the Contract Schema

## What It Is

A **behavioral contract** is a **machine-readable specification** of runtime behavior that TypeScript can't express. Think of it as "documentation that enforces itself."

### The Core Problem It Solves

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

---

## The Schema Structure

### 1. **Metadata** (Top-Level)

```yaml
package: axios                    # Which npm package
semver: ">=1.0.0 <2.0.0"         # Which versions this applies to
contract_version: "1.0.0"         # Version of THIS contract file
maintainer: "corpus-team"         # Who maintains this contract
last_verified: "2026-02-27"       # When it was last checked
status: production                # production | draft | in-development | deprecated
```

**Purpose:** Track which packages/versions are covered and who's responsible.

### 2. **Functions** (The Meat)

Each function has:
- **name**: `get`, `post`, `create`, etc.
- **import_path**: How it's imported (`axios`, `prisma.user`, etc.)
- **description**: What it does

### 3. **Preconditions** (Setup Requirements)

"What must be true BEFORE calling this function"

```yaml
preconditions:
  - id: absolute-url-node
    description: "URL must be absolute when running in Node.js"
    source: "https://axios-http.com/docs/req_config"
    severity: warning
```

**Analogy:** "Check your oil before starting the car"

### 4. **Postconditions** (Runtime Behavior)

"What happens AFTER calling this function"

```yaml
postconditions:
  - id: network-failure
    condition: "network error or timeout"
    throws: "AxiosError with error.response === undefined"
    required_handling: >
      Caller MUST check if error.response exists before accessing it.
      Network errors have error.request but NO error.response property.
    source: "https://axios-http.com/docs/handling_errors"
    severity: error
```

**Fields:**
- **condition**: When does this happen?
- **throws**: What error type? (if applicable)
- **returns**: What value? (if applicable)
- **required_handling**: What MUST the caller do?
- **source**: Authoritative URL proving this claim
- **severity**: `error` | `warning` | `info`

**Analogy:** "If the engine overheats, you MUST pull over and add coolant"

### 5. **Edge Cases** (Gotchas & Sharp Edges)

"Known quirks and foot-guns"

```yaml
edge_cases:
  - id: timeout-default-zero
    description: "Default timeout is 0 (no timeout). Production should set explicit timeout."
    source: "https://axios-http.com/docs/req_config"
    severity: info
```

**Analogy:** "The parking brake is manual—automatic transmission won't save you on a hill"

---

## Key Design Principles

### 1. **Source-Backed Claims**

Every claim requires a URL:
```yaml
source: "https://axios-http.com/docs/handling_errors"
```

**Why:** No opinions, only facts. If it's not documented, it's not in the contract.

### 2. **Severity Levels**

- **error**: Must fix (crashes, data loss, security issues)
- **warning**: Should fix (edge cases, performance issues)
- **info**: Nice to know (best practices, gotchas)

### 3. **Required Handling for Errors**

If `severity: error`, you MUST specify `required_handling`:

```yaml
required_handling: >
  Caller MUST either:
  1. Implement exponential backoff retry logic, OR
  2. Handle 429 as a terminal error, OR
  3. Use a request queue that respects rate limits.
```

**This is prescriptive.** We tell developers exactly what to do, not just "handle errors lol".

### 4. **Semver Ranges**

Contracts apply to version ranges:
```yaml
semver: ">=1.0.0 <2.0.0"
```

**Why:** Behavior can change across major versions. Each breaking change needs a new contract.

---

## Real-World Example: Axios Error Handling

### Without Contract (Typical Code)

```typescript
async function getUser(id: string) {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
}
```

**Problems:**
- No error handling
- Doesn't check `error.response` exists (crashes on network failures)
- Doesn't handle 429 rate limits
- Doesn't handle 500 server errors

### With Contract (Enforced)

```typescript
async function getUser(id: string) {
  try {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // ✅ Check error.response exists (handles network failures)
      if (error.response) {
        if (error.response.status === 429) {
          // ✅ Handle 429 rate limits with backoff
          await exponentialBackoff();
          return getUser(id); // Retry
        }
        // ✅ Handle 4xx/5xx errors
        throw new UserNotFoundError(id);
      } else {
        // ✅ Handle network failures
        throw new NetworkError('Failed to reach API');
      }
    }
    throw error;
  }
}
```

**The contract ENFORCES all of these checks.**

---

## How to "Sell" This Concept

### Elevator Pitch (30 seconds)

> "Behavioral contracts are machine-readable specs of runtime behavior. TypeScript checks types, behavioral contracts check behavior—like 'this function throws a 429 rate limit error, and you MUST implement retry logic.' It catches bugs at build time instead of production."

### Technical Pitch (2 minutes)

> "Most production bugs aren't type errors—they're behavioral errors. Like forgetting to handle Axios network failures, or ignoring Prisma's `P2002` unique constraint violations.
>
> We created a YAML schema that documents:
> 1. **Preconditions** - What must be true before calling
> 2. **Postconditions** - What errors can be thrown and how to handle them
> 3. **Edge cases** - Known gotchas from GitHub issues
>
> Every claim is backed by official documentation URLs. Our static analyzer reads these contracts and flags violations:
>
> ```
> ❌ ERROR: axios.get() called without try-catch
>    Missing required handling for network-failure postcondition
>    See: https://axios-http.com/docs/handling_errors
> ```
>
> It's like a linter, but for runtime behavior instead of code style."

### Business Pitch (for customers/investors)

> "Most outages aren't from complex logic—they're from basic mistakes like unhandled API errors. We've created a library of behavioral contracts for the top 100 npm packages.
>
> Our analyzer checks your codebase against these contracts and finds bugs BEFORE they hit production. Think of it as 'spell check' for API error handling.
>
> **ROI Example:** One unhandled Stripe API error can cause thousands of failed transactions. Our tool catches these at build time for $0/month (open source)."

---

## Comparison to Other Standards

| Standard | What It Checks | Coverage |
|----------|---------------|----------|
| **TypeScript** | Types (compile-time) | Function signatures |
| **ESLint** | Code style, simple patterns | Syntax, formatting |
| **OpenAPI** | API contracts (HTTP) | REST endpoints |
| **JSON Schema** | Data structure | JSON/YAML documents |
| **Behavioral Contracts** | **Runtime behavior** | **Error handling, edge cases** |

**Behavioral contracts complement TypeScript, not replace it.**

---

## Is the Schema Stable?

### Core Schema: **Stable ✅**

The fundamental structure is solid:
- Package metadata
- Functions with preconditions/postconditions/edge_cases
- Source-backed claims
- Severity levels

### Recent Evolution: **Minor Additions**

We've added:
1. **`status` field** (production/draft/deprecated) - helps track quality
2. **`import_path`** refinement - supports property chains (`prisma.user.create`)
3. **`required_handling`** field - makes enforcement actionable

### Future Changes: **Additive Only**

Any future changes will be:
- **Additive** (new optional fields)
- **Backward compatible** (old contracts still work)
- **Versioned** (schema has its own version)

**Analogy:** Like TypeScript—new features added, but old code doesn't break.

---

## Common Questions

### Q: "Isn't this just documentation?"

**A:** No. Documentation can be ignored. Contracts are enforced by static analysis. It's like the difference between a comment and a type annotation.

### Q: "Can't developers just disable violations?"

**A:** Yes, but they have to explicitly acknowledge it:
```typescript
// @behavioral-contract-ignore axios/network-failure: Using a global error handler
await axios.get('/api/users');
```

This forces conscious decisions, not accidental omissions.

### Q: "How do you keep contracts up-to-date?"

**A:** Each contract has:
- `last_verified` date
- `source` URLs (we can scrape docs for changes)
- `semver` range (contracts version with packages)

We plan to build automated verification against package docs.

### Q: "What about custom packages?"

**A:** You can write contracts for your own packages:
```yaml
package: "@mycompany/api-client"
semver: ">=2.0.0"
functions:
  - name: fetchUser
    postconditions:
      - id: not-found
        condition: "user doesn't exist"
        throws: "UserNotFoundError"
        required_handling: "Caller MUST handle UserNotFoundError"
        source: "https://internal-docs.mycompany.com/api-client"
        severity: error
```

---

## Next Steps

- [Schema Reference](./schema-reference) - Complete field documentation
- [Writing Contracts](./writing-contracts) - How to create contracts
- [Examples](./examples) - Real-world contract examples
- [Get Started](../getting-started/installation) - Install and run your first scan
