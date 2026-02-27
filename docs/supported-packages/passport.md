---
title: passport
---

# passport

| Property | Value |
|----------|-------|
| **Package** | `passport` |
| **Versions Covered** | `>=0.7.0 <1.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install passport
```

## Covered Functions

This contract covers 1 function(s):

### `authenticate()`

Middleware for authenticating requests

**Import:**
```typescript
import { authenticate } from 'passport';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - authenticate-failure**

**Condition:** authentication fails (invalid credentials, missing user, strategy error)

**Returns:** middleware that may call callback with error or fail object

**Required Handling:**

Caller MUST handle authentication failures in callback or error middleware. Use custom callback (req, res, next) => passport.authenticate('strategy', (err, user, info) => {...}) to handle errors, missing users, and validation failures.

📖 [Source](https://www.passportjs.org/docs/authenticate/)

**🔴 ERROR - authenticate-strategy-error**

**Condition:** strategy encounters error (database down, network timeout, invalid configuration)

**Returns:** middleware that calls callback with error as first argument

**Required Handling:**

Caller MUST handle strategy errors in callback or Express error handler. Check if (err) in custom callback and forward to next(err) for centralized error handling.

📖 [Source](https://www.passportjs.org/docs/authenticate/)

---

## Example: Proper Error Handling

```typescript
import passport from 'passport';

async function example() {
  try {
    const result = await authenticate(/* args */);
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
