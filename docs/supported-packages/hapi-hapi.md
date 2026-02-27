---
title: "@hapi/hapi"
---

# @hapi/hapi

| Property | Value |
|----------|-------|
| **Package** | `@hapi/hapi` |
| **Versions Covered** | `>=21.0.0 <22.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install @hapi/hapi
```

## Covered Functions

This contract covers 2 function(s):

### `route()`

Registers route handler

**Import:**
```typescript
import { route } from '@hapi/hapi';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - route-handler-error**

**Condition:** route handler throws error or promise rejects (database error, validation error)

**Throws:** Error causing 500 Internal Server Error response if not handled

**Required Handling:**

Route handlers MUST handle errors with try-catch or return error via h.response().code() to prevent server crash and provide proper error responses. Use h.response(error).code(statusCode) for controlled error responses.

📖 [Source](https://hapi.dev/api/?v=21.4.6#-serverrouteroute)

---

### `start()`

Starts the server

**Import:**
```typescript
import { start } from '@hapi/hapi';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - start-error**

**Condition:** server fails to start (port in use, invalid configuration, plugin error)

**Throws:** Error with startup failure details

**Required Handling:**

Caller MUST wrap server.start() in try-catch to handle startup errors. Port conflicts, plugin failures, and configuration errors crash application if unhandled.

📖 [Source](https://hapi.dev/api/?v=21.4.6#-async-serverstartoptionsoptions)

---

## Example: Proper Error Handling

```typescript
import hapi from '@hapi/hapi';

async function example() {
  try {
    const result = await route(/* args */);
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
