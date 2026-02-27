---
title: "express"
---

# express

| Property | Value |
|----------|-------|
| **Package** | `express` |
| **Versions Covered** | `>=4.0.0 <6.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-24 |
| **Maintainer** | behavioral-contracts |

## Installation

```bash
npm install express
```

## Covered Functions

This contract covers 4 function(s):

### `app.METHOD()`

Route handler methods (get, post, put, delete, patch, etc.) that accept
async callback functions. In Express 4.x, unhandled promise rejections
in async route handlers will not be caught automatically.


**Import:**
```typescript
import { app.METHOD } from 'express';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - async-route-handler-unhandled-rejection**

**Condition:** When an async function is used as a route handler (callback to app.get,
app.post, etc.) and contains await expressions without try-catch blocks


**Throws:** UnhandledPromiseRejection

**Required Handling:**

Must wrap async operations in try-catch blocks and call next(err) with
the caught error to forward it to error-handling middleware. Alternatively,
use the express-async-errors package or upgrade to Express 5.x for automatic
promise rejection handling.

Example:
app.get('/path', async (req, res, next) = 
  try 
    const data = await asyncOperation();
    res.json(data);
   catch (err) 
    next(err); // Forward to error handler
  
);


📖 [Source](https://expressjs.com/en/guide/error-handling.html)

---

### `app.use()`

Middleware registration function. When async functions are used as middleware,
they must handle errors properly.


**Import:**
```typescript
import { app.use } from 'express';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - async-middleware-unhandled-rejection**

**Condition:** When an async function is used as middleware and contains await expressions
without try-catch blocks


**Throws:** UnhandledPromiseRejection

**Required Handling:**

Must wrap async operations in try-catch blocks and call next(err) to forward
errors to error-handling middleware. Alternatively, use express-async-errors.

Example:
app.use(async (req, res, next) = 
  try 
    await authenticateUser(req);
    next(); // Continue to next middleware
   catch (err) 
    next(err); // Forward to error handler
  
);


📖 [Source](https://expressjs.com/en/guide/error-handling.html)

**⚠️ WARNING - error-middleware-signature**

**Condition:** When defining error-handling middleware


**Throws:** N/A

**Required Handling:**

Error-handling middleware must be defined with exactly 4 parameters
(err, req, res, next) to be recognized by Express. Error-handling
middleware must be defined AFTER all other middleware and routes.

Example:
app.use((err, req, res, next) = 
  console.error(err.stack);
  res.status(500).send('Something broke!');
);


📖 [Source](https://expressjs.com/en/guide/error-handling.html)

---

### `router.METHOD()`

Router methods (get, post, put, delete, patch, etc.) created via express.Router().
Same async error handling requirements as app.METHOD.


**Import:**
```typescript
import { router.METHOD } from 'express';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - async-router-handler-unhandled-rejection**

**Condition:** When an async function is used as a router handler and contains await
expressions without try-catch blocks


**Throws:** UnhandledPromiseRejection

**Required Handling:**

Must wrap async operations in try-catch blocks and call next(err).
Same requirements as app.METHOD route handlers.

Example:
const router = express.Router();
router.get('/users', async (req, res, next) = 
  try 
    const users = await User.findAll();
    res.json(users);
   catch (err) 
    next(err);
  
);


📖 [Source](https://expressjs.com/en/guide/error-handling.html)

---

### `router.use()`

Router middleware registration. Same async error handling requirements as app.use.


**Import:**
```typescript
import { router.use } from 'express';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - async-router-middleware-unhandled-rejection**

**Condition:** When an async function is used as router middleware and contains await
expressions without try-catch blocks


**Throws:** UnhandledPromiseRejection

**Required Handling:**

Must wrap async operations in try-catch blocks and call next(err).
Same requirements as app.use middleware.


📖 [Source](https://expressjs.com/en/guide/error-handling.html)

---

## Example: Proper Error Handling

```typescript
import express from 'express';

async function example() {
  try {
    const result = await app.METHOD(/* args */);
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
