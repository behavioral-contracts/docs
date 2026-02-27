---
title: undici
---

# undici

| Property | Value |
|----------|-------|
| **Package** | `undici` |
| **Versions Covered** | `>=5.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install undici
```

## Covered Functions

This contract covers 2 function(s):

### `request()`

Makes HTTP request using undici's low-level API

**Import:**
```typescript
import { request } from 'undici';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - network-error-handling**

**Condition:** network failure, DNS error, timeout, connection refused

**Throws:** `Promise rejection with Error`

**Required Handling:**

Use try-catch (async/await) or .catch() (promises)

📖 [Source](https://www.npmjs.com/package/undici)

---

### `fetch()`

Makes HTTP request using Fetch API (similar to browser fetch)

**Import:**
```typescript
import { fetch } from 'undici';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - network-error-handling**

**Condition:** network failure, DNS error, timeout, connection refused, certificate errors

**Throws:** `TypeError with 'fetch failed' message and cause property containing underlying error (UND_ERR_SOCKET, etc.)`

**Required Handling:**

Use try-catch (async/await) or .catch() (promises)

📖 [Source](https://undici.nodejs.org/)

---

## Example: Proper Error Handling

```typescript
import undici from 'undici';

async function example() {
  try {
    const result = await request(/* args */);
    // Handle success
    return result;
  } catch (error) {
    // Handle error according to contract postconditions
    console.error('Error:', error);
    throw error;
  }
}
```

## See Also

- [Contract Schema Reference](../contract-schema/schema-reference.md)
- [All Supported Packages](./overview.md)
- [How to Use verify-cli](../cli-reference/overview.md)
