---
title: fastify
---

# fastify

| Property | Value |
|----------|-------|
| **Package** | `fastify` |
| **Versions Covered** | `>=5.0.0 <6.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-25 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install fastify
```

## Covered Functions

This contract covers 1 function(s):

### `get()`

Registers GET route handler

**Import:**
```typescript
import { get } from 'fastify';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - route-handler-async-error**

**Condition:** async route handler throws error or promise rejects (database error, validation error)

**Throws:** `Error causing 500 Internal Server Error if no error handler is configured`

**Required Handling:**

Route handlers MUST handle async errors with try-catch or configure setErrorHandler. Unhandled async errors crash server unless error handler is configured. Use try-catch and reply.code(statusCode).send(error) for controlled error responses.

📖 [Source](https://fastify.dev/docs/latest/Reference/Routes/)

---

## Example: Proper Error Handling

```typescript
import fastify from 'fastify';

async function example() {
  try {
    const result = await get(/* args */);
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
