---
title: node-fetch
---

# node-fetch

| Property | Value |
|----------|-------|
| **Package** | `node-fetch` |
| **Versions Covered** | `>=2.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install node-fetch
```

## Covered Functions

This contract covers 1 function(s):

### `fetch()`

Makes HTTP request and returns Promise that resolves to Response object

**Import:**
```typescript
import { fetch } from 'node-fetch';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - fetch-rejects-on-network-error**

**Condition:** network failure (DNS resolution failure, connection refused, timeout, etc.)

**Throws:** `Promise rejection with FetchError (error.type='system', error.code like ENOTFOUND, ECONNREFUSED, ETIMEDOUT)`

**Required Handling:**

Caller MUST use try-catch to handle Promise rejections from fetch(). Network-level failures (DNS errors, connection refused, timeouts) reject the Promise. CRITICAL: fetch() does NOT reject on HTTP 4xx/5xx status codes - those are successful responses that must be checked with response.ok. Recommended pattern: try { const res = await fetch(url); if (!res.ok) throw new Error(`HTTP ${res.status}`); } catch (error) { /* handle network errors */ }


📖 [Source](https://github.com/node-fetch/node-fetch/blob/main/docs/ERROR-HANDLING.md)

---

## Example: Proper Error Handling

```typescript
import node-fetch from 'node-fetch';

async function example() {
  try {
    const result = await fetch(/* args */);
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
