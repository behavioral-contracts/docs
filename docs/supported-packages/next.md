---
title: next
---

# next

| Property | Value |
|----------|-------|
| **Package** | `next` |
| **Versions Covered** | `^16.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-25 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install next
```

## Covered Functions

This contract covers 1 function(s):

### `GET()`

API route handler

**Import:**
```typescript
import { GET } from 'next/server';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - route-handler-no-error-handling**

**Condition:** async operation in route handler throws

**Throws:** `Unhandled error returns 500 with stack trace exposed`

**Required Handling:**

Wrap async operations in try-catch and return appropriate error responses

📖 [Source](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## Example: Proper Error Handling

```typescript
import next from 'next';

async function example() {
  try {
    const result = await GET(/* args */);
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
