---
title: "passport-local"
---

# passport-local

| Property | Value |
|----------|-------|
| **Package** | `passport-local` |
| **Versions Covered** | `>=1.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `draft` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install passport-local
```

## Covered Functions

This contract covers 2 function(s):

### `Strategy()`

Local authentication strategy using username and password

**Import:**
```typescript
import { Strategy } from 'passport-local';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - async-verify-error-handling**

**Condition:** verify callback is async or returns Promise

**Throws:** UnhandledPromiseRejection if async operations not wrapped in try-catch

**Required Handling:**

When the verify callback is async or returns a Promise, all async operations (database queries, bcrypt.compare) MUST be wrapped in try-catch. Unhandled promise rejections in the verify callback will crash the Node.js application. Async errors MUST be caught and passed to done(err).


📖 [Source](https://github.com/jaredhanson/passport/issues/536)

**🔴 ERROR - verify-callback-done**

**Condition:** verify callback invoked

**Throws:** Request timeout if done() not called

**Required Handling:**

The verify callback MUST call the done() callback in all code paths. Patterns: done(err) for server errors, done(null, user) for success, done(null, false) for authentication failures. Not calling done() leaves the request hanging, causing timeouts and resource exhaustion.


📖 [Source](https://www.passportjs.org/concepts/authentication/strategies/)

**🔴 ERROR - database-error-propagation**

**Condition:** database query fails in verify callback

**Throws:** Database error

**Required Handling:**

Errors from database queries (User.findOne, etc.) MUST be checked and propagated to Passport via done(err). Ignoring database errors causes silent failures and incorrect authentication behavior.


📖 [Source](https://moldstud.com/articles/p-best-practices-for-effective-error-handling-in-passportjs)

**⚠️ WARNING - timing-attack-password-comparison**

**Condition:** password comparison in verify callback

**Returns:**

boolean indicating password match

**Required Handling:**

Password comparison SHOULD use constant-time functions like bcrypt.compare() instead of direct string comparison (=== or !==). Direct comparison creates timing side-channel vulnerabilities where attackers can exploit timing differences to guess passwords. CWE-208: Observable Timing Discrepancy.


📖 [Source](https://www.onlinehashcrack.com/guides/password-recovery/timing-attacks-on-password-checks-mitigation-tips.php)

**⚠️ WARNING - user-enumeration-messages**

**Condition:** authentication failure in verify callback

**Returns:**

done(null, false,  message )

**Required Handling:**

Different error messages for "user not found" vs "wrong password" enable user enumeration attacks. Use the same generic message (e.g., "Invalid credentials") for all authentication failures. CWE-204: Observable Response Discrepancy.


📖 [Source](https://www.onelogin.com/blog/user-enumeration-attacks-what-you-need-to-know)

**⚠️ WARNING - authentication-failure-error-type**

**Condition:** authentication failure (invalid credentials)

**Returns:**

done(null, false)

**Required Handling:**

Authentication failures MUST return done(null, false), not done(new Error()). Using done(err) for invalid credentials causes HTTP 500 responses instead of proper authentication failure handling (401 or redirect). Reserve done(err) for actual server errors like database connection failures.


📖 [Source](https://github.com/jaredhanson/passport-local/issues/4)

---

### `serializeUser()`

Serializes user to session

**Import:**
```typescript
import { serializeUser } from 'passport';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - session-serialization-required**

**Condition:** using passport-local with sessions

**Throws:** Session not persisted

**Required Handling:**

Using passport-local without implementing passport.serializeUser() and passport.deserializeUser() breaks session persistence. Users must re-authenticate on every request. This postcondition does not apply if session support is intentionally disabled (session: false option).


📖 [Source](https://www.geeksforgeeks.org/node-js/login-authentication-using-express-js-passport-js-and-bcrypt/)

---

## Example: Proper Error Handling

```typescript
import passport-local from 'passport-local';

async function example() {
  try {
    const result = await Strategy(/* args */);
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

- [Contract Schema Reference](../contract-schema/schema-reference)
- [All Supported Packages](./overview)
- [How to Use verify-cli](../cli-reference/overview)
