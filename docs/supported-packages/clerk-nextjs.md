---
title: "@clerk/nextjs"
---

# @clerk/nextjs

| Property | Value |
|----------|-------|
| **Package** | `@clerk/nextjs` |
| **Versions Covered** | `>=5.0.0 <7.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-24 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install @clerk/nextjs
```

## Covered Functions

This contract covers 11 function(s):

### `auth()`

Retrieves current authentication state and session information in Next.js App Router

**Import:**
```typescript
import { auth } from '@clerk/nextjs/server';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - missing-clerk-middleware**

**Condition:** auth() called without clerkMiddleware() configured in src/middleware.ts

**Throws:** Error: Clerk: auth() was called but Clerk can't detect usage of clerkMiddleware()

**Required Handling:**

MUST have clerkMiddleware() exported from src/middleware.ts with proper matcher configuration. Middleware must run for all routes where auth() is called.


📖 [Source](https://clerk.com/docs/reference/nextjs/clerk-middleware)

**🔴 ERROR - auth-null-not-checked**

**Condition:** auth() result used without checking if userId exists

**Throws:** Runtime error when accessing properties of null/undefined user

**Required Handling:**

MUST check auth().userId or auth().isAuthenticated before using authentication data. Pattern: `const  userId  = await auth(); if (!userId) return unauthorized();`


📖 [Source](https://clerk.com/docs/reference/nextjs/app-router/auth#usage)

---

### `currentUser()`

Fetches complete user object from Clerk API (backend only)

**Import:**
```typescript
import { currentUser } from '@clerk/nextjs/server';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - current-user-not-cached**

**Condition:** currentUser() called multiple times in same request (Next.js 15+)

**Throws:** Rate limit exceeded: HTTP 422 (100 req/10s per IP)

**Required Handling:**

SHOULD wrap currentUser() with React cache() to avoid multiple API calls per request. Pattern: `const getCachedUser = cache(async () = await currentUser());`


📖 [Source](https://github.com/clerk/javascript/issues/4894)

**🔴 ERROR - current-user-null-not-handled**

**Condition:** currentUser() result used without null check

**Throws:** Runtime error accessing properties of null

**Required Handling:**

MUST handle null case when currentUser() is called. Returns null if user not authenticated.


📖 [Source](https://clerk.com/docs/reference/nextjs/current-user)

---

### `clerkMiddleware()`

Initializes Clerk authentication context for requests

**Import:**
```typescript
import { clerkMiddleware } from '@clerk/nextjs/server';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - middleware-not-exported**

**Condition:** clerkMiddleware defined but not exported from middleware.ts

**Throws:** Middleware never runs, auth() calls fail

**Required Handling:**

MUST export clerkMiddleware() as default export from src/middleware.ts. Pattern: `export default clerkMiddleware();`


📖 [Source](https://clerk.com/docs/reference/nextjs/clerk-middleware)

**⚠️ WARNING - middleware-matcher-missing**

**Condition:** clerkMiddleware without matcher configuration

**Throws:** Middleware runs on static assets, causes 404 auth errors

**Required Handling:**

SHOULD configure matcher to exclude static files and API routes that don't need auth. Pattern: `export const config =  matcher: ['/((?!.*\\..*|_next).*)', '/'] ;`


📖 [Source](https://clerk.com/docs/guides/development/custom-flows/error-handling)

---

### `protect()`

Protects routes by throwing error if not authenticated

**Import:**
```typescript
import { protect } from '@clerk/nextjs/server';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - protect-not-in-try-catch**

**Condition:** auth.protect() called without try-catch in route handler

**Throws:** Uncaught error causes 500 instead of proper 401/404

**Required Handling:**

SHOULD wrap auth.protect() in try-catch to handle authentication errors gracefully. Returns 404 for unauthenticated requests with session token, 401 for machine tokens.


📖 [Source](https://clerk.com/docs/reference/nextjs/app-router/auth)

---

### `create()`

Creates a new sign-in attempt with credentials

**Import:**
```typescript
import { create } from '@clerk/nextjs';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - signin-create-no-error-handling**

**Condition:** signIn.create() called without try-catch

**Throws:** ClerkAPIError with error codes (user_locked, form_param_missing, etc.)

**Required Handling:**

MUST wrap signIn.create() in try-catch and handle ClerkAPIError. Check error.errors[0].code for: user_locked, password_required, form_param_missing. For user_locked, display lockout_expires_in_seconds from error.meta.


📖 [Source](https://clerk.com/docs/guides/development/custom-flows/error-handling)

**⚠️ WARNING - user-lockout-meta-not-displayed**

**Condition:** user_locked error caught but lockout_expires_in_seconds not shown to user

**Throws:** Poor UX - user doesn't know when to retry

**Required Handling:**

SHOULD extract and display lockout_expires_in_seconds from error.meta when code is user_locked. Helps users know when account will unlock.


📖 [Source](https://clerk.com/docs/guides/development/errors/frontend-api)

---

### `create()`

Creates a new sign-up attempt for user registration

**Import:**
```typescript
import { create } from '@clerk/nextjs';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - signup-create-no-error-handling**

**Condition:** signUp.create() called without try-catch

**Throws:** ClerkAPIError with error codes (form_password_length_too_short, already_signed_in, etc.)

**Required Handling:**

MUST wrap signUp.create() in try-catch and handle ClerkAPIError. Common errors: form_password_length_too_short, form_param_missing, requires_captcha.


📖 [Source](https://clerk.com/docs/guides/development/custom-flows/error-handling)

---

### `verify()`

Verifies webhook signature to prevent payload tampering

**Import:**
```typescript
import { verify } from 'svix';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - webhook-signature-not-verified**

**Condition:** Clerk webhook endpoint processes payload without signature verification

**Throws:** Security vulnerability - accepts forged webhook events

**Required Handling:**

MUST verify webhook signature using Webhook.verify() from svix library. Use CLERK_WEBHOOK_SECRET environment variable. Pattern: `const wh = new Webhook(secret); const event = wh.verify(payload, headers);`


📖 [Source](https://clerk.com/docs/guides/development/webhooks/overview)

**⚠️ WARNING - webhook-verify-not-in-try-catch**

**Condition:** Webhook.verify() called without try-catch

**Throws:** Unhandled error on invalid signature causes 500 instead of 400

**Required Handling:**

SHOULD wrap Webhook.verify() in try-catch to return proper 400 response on verification failure.


📖 [Source](https://clerk.com/docs/guides/development/webhooks/overview)

---

### `getToken()`

Retrieves session token with optional refresh

**Import:**
```typescript
import { getToken } from '@clerk/nextjs/server';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - get-token-null-not-handled**

**Condition:** getToken() result used without null check

**Throws:** Runtime error when user not authenticated (returns null)

**Required Handling:**

MUST handle null case when getToken() is called. Returns null if user not authenticated or token invalid.


📖 [Source](https://clerk.com/docs/reference/nextjs/get-token)

---

### `setActive()`

Activates a session after successful authentication

**Import:**
```typescript
import { setActive } from '@clerk/nextjs';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - set-active-no-error-handling**

**Condition:** setActive() called without try-catch

**Throws:** Error when session ID is invalid or session already active

**Required Handling:**

SHOULD wrap setActive() in try-catch to handle invalid session errors. Can fail if session is null, invalid, or race conditions occur.


📖 [Source](https://clerk.com/docs/reference/clerk-react/use-clerk)

---

### `useSignIn()`

React hook for client-side sign-in functionality

**Import:**
```typescript
import { useSignIn } from '@clerk/nextjs';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - use-signin-no-error-state**

**Condition:** useSignIn() used but errors not displayed to user

**Throws:** Silent failures - users don't know why sign-in failed

**Required Handling:**

SHOULD maintain error state and display ClerkAPIError messages to users. Use isClerkAPIResponseError() to type-check errors.


📖 [Source](https://clerk.com/docs/guides/development/custom-flows/error-handling)

---

### `useClerk()`

React hook for accessing Clerk context and methods

**Import:**
```typescript
import { useClerk } from '@clerk/nextjs';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - use-clerk-outside-provider**

**Condition:** useClerk() called outside ClerkProvider

**Throws:** Error: useClerk must be used within ClerkProvider

**Required Handling:**

MUST ensure component using useClerk() is wrapped in ClerkProvider. In Next.js App Router, ClerkProvider should wrap root layout.


📖 [Source](https://clerk.com/docs/reference/clerk-react/use-clerk)

---

## Example: Proper Error Handling

```typescript
import nextjs from '@clerk/nextjs';

async function example() {
  try {
    const result = await auth(/* args */);
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
