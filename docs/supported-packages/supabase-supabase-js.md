---
title: @supabase/supabase-js
---

# @supabase/supabase-js

| Property | Value |
|----------|-------|
| **Package** | `@supabase/supabase-js` |
| **Versions Covered** | `>=2.0.0 <3.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-24 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install @supabase/supabase-js
```

## Covered Functions

This contract covers 8 function(s):

### `signUp()`

Creates a new user account

**Import:**
```typescript
import { signUp } from '@supabase/supabase-js';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - weak-password**

**Condition:** Password does not meet strength requirements

**Throws:** `AuthApiError with error.message about password strength`

**Required Handling:**

Caller MUST validate password strength before signup. Display user-friendly error with password requirements. DO NOT retry without user changing password.


📖 [Source](https://supabase.com/docs/guides/auth/debugging/error-codes)

**🔴 ERROR - user-already-exists**

**Condition:** Email already registered

**Throws:** `AuthApiError with error related to duplicate user`

**Required Handling:**

Caller MUST handle duplicate user gracefully. Provide clear error message to user. Consider redirecting to login page.


📖 [Source](https://supabase.com/docs/guides/auth/debugging/error-codes)

**🔴 ERROR - rate-limit-exceeded**

**Condition:** Too many signup attempts (429)

**Throws:** `AuthApiError with status 429`

**Required Handling:**

Caller MUST handle rate limit errors gracefully. Implement exponential backoff. Show user-friendly message about trying again later. DO NOT automatically retry - may indicate abuse.


📖 [Source](https://supabase.com/docs/guides/auth/troubleshooting)

**🔴 ERROR - server-error**

**Condition:** Auth server degraded (500)

**Throws:** `AuthApiError with status 500`

**Required Handling:**

500 errors typically indicate issues with database or SMTP provider. Retry with exponential backoff. Check logs for database triggers or SMTP issues. Alert operations if persistent.


📖 [Source](https://supabase.com/docs/guides/troubleshooting/resolving-500-status-authentication-errors-7bU5U8)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - email-confirmation**

By default, users must confirm email before login. Handle unconfirmed state gracefully.

📖 [Source](https://supabase.com/docs/guides/auth/troubleshooting)

---

### `signInWithPassword()`

Signs in a user with email and password

**Import:**
```typescript
import { signInWithPassword } from '@supabase/supabase-js';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - invalid-credentials**

**Condition:** Email or password incorrect

**Throws:** `AuthApiError with error about invalid credentials`

**Required Handling:**

Caller MUST handle invalid credentials gracefully. DO NOT specify whether email or password was wrong (security). Implement rate limiting to prevent brute force attacks. Consider account lockout after multiple failures.


📖 [Source](https://supabase.com/docs/guides/auth/debugging/error-codes)

**🔴 ERROR - rate-limit-exceeded**

**Condition:** Too many login attempts (429)

**Throws:** `AuthApiError with status 429`

**Required Handling:**

Handle rate limit errors with user-friendly message. This often indicates potential abuse. Consider CAPTCHA or additional verification.


📖 [Source](https://supabase.com/docs/guides/auth/debugging/error-codes)

**🔴 ERROR - user-not-confirmed**

**Condition:** User hasn't confirmed email

**Throws:** `AuthApiError indicating email not confirmed`

**Required Handling:**

Redirect user to email confirmation flow. Provide option to resend confirmation email.


📖 [Source](https://supabase.com/docs/guides/auth/troubleshooting)

**🔴 ERROR - server-error**

**Condition:** Auth server error (500)

**Throws:** `AuthApiError with status 500`

**Required Handling:**

Retry with exponential backoff. Check database and SMTP provider health.

📖 [Source](https://supabase.com/docs/guides/troubleshooting/resolving-500-status-authentication-errors-7bU5U8)

---

### `from()`

Initiates query builder for a table (builder entry point)

**Import:**
```typescript
import { from } from '@supabase/supabase-js';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - table-not-found**

**Condition:** Table does not exist

**Throws:** `Error indicating table not found`

**Required Handling:**

Verify table name is correct. Ensure migrations have been applied.


📖 [Source](https://supabase.com/docs/guides/database/tables)

---

### `select()`

Queries data from a table (can be chained after from())

**Import:**
```typescript
import { select } from '@supabase/supabase-js';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - rls-policy-violation**

**Condition:** Row Level Security policy denies access (42501)

**Throws:** `Error with code '42501' or status 403`

**Required Handling:**

Caller MUST handle RLS policy violations gracefully. This indicates user doesn't have permission to access data. CRITICAL: Ensure RLS policies are configured for all tables. Using anon or authenticated role without RLS is a MAJOR security risk. Return empty result or access denied message to user.


📖 [Source](https://supabase.com/docs/guides/troubleshooting/database-api-42501-errors)

**🔴 ERROR - column-access-denied**

**Condition:** Column-level RLS denies access to specific columns

**Throws:** `Error with code '42501' when using select *`

**Required Handling:**

Avoid using select * if column-level RLS is configured. Explicitly select only columns user should access. Handle 42501 errors by selecting subset of columns.


📖 [Source](https://supabase.com/docs/guides/troubleshooting/database-api-42501-errors)

**🔴 ERROR - connection-error**

**Condition:** Database connection failed

**Throws:** `Network or connection error`

**Required Handling:**

Implement retry with exponential backoff. Check database health status. Alert operations if persistent.


📖 [Source](https://supabase.com/docs/reference/javascript/v1)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - service-role-bypasses-rls**

Client initialized with service_role key ALWAYS bypasses RLS. NEVER use service_role in client-side code.

📖 [Source](https://supabase.com/docs/guides/troubleshooting/why-is-my-service-role-key-client-getting-rls-errors-or-not-returning-data-7_1K9z)

**⚠️ WARNING - rls-not-enabled-by-default**

RLS is NOT enabled by default on new tables. Always enable RLS and create policies.

📖 [Source](https://supabase.com/docs/guides/database/postgres/row-level-security)

---

### `insert()`

Inserts data into a table

**Import:**
```typescript
import { insert } from '@supabase/supabase-js';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - rls-policy-violation**

**Condition:** RLS policy denies insert permission (42501)

**Throws:** `Error with code '42501'`

**Required Handling:**

Ensure RLS policies allow INSERT for user's role. Check if user is authenticated if policy requires it. Return clear error about insufficient permissions.


📖 [Source](https://supabase.com/docs/guides/troubleshooting/database-api-42501-errors)

**🔴 ERROR - unique-constraint-violation**

**Condition:** Unique constraint violated (23505)

**Throws:** `Error with code '23505'`

**Required Handling:**

Handle duplicate key violations gracefully. Check if record already exists before inserting. Return user-friendly error message.


📖 [Source](https://supabase.com/docs/reference/javascript/v1)

**🔴 ERROR - foreign-key-violation**

**Condition:** Foreign key constraint violated (23503)

**Throws:** `Error with code '23503'`

**Required Handling:**

Verify referenced records exist before insert. DO NOT retry without fixing data integrity issue.


📖 [Source](https://supabase.com/docs/reference/javascript/v1)

**🔴 ERROR - connection-error**

**Condition:** Database connection failed

**Throws:** `Network error`

**Required Handling:**

Retry with exponential backoff

📖 [Source](https://supabase.com/docs/reference/javascript/v1)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - returning-minimal-for-rls**

If RLS blocks select after insert, set returning: 'minimal' to avoid error

📖 [Source](https://supabase.com/docs/guides/troubleshooting/why-is-my-service-role-key-client-getting-rls-errors-or-not-returning-data-7_1K9z)

---

### `update()`

Updates data in a table

**Import:**
```typescript
import { update } from '@supabase/supabase-js';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - rls-policy-violation**

**Condition:** RLS policy denies update permission (42501)

**Throws:** `Error with code '42501'`

**Required Handling:**

Ensure RLS policies allow UPDATE for user. Verify user owns the record if policy checks ownership. Return insufficient permissions error.


📖 [Source](https://supabase.com/docs/guides/troubleshooting/database-api-42501-errors)

**⚠️ WARNING - record-not-found**

**Condition:** No records match the update criteria

**Returns:** Empty data array

**Required Handling:**

Check if returned data array is empty. This may indicate record doesn't exist or RLS filters it out. Distinguish between "not found" and "no permission".


📖 [Source](https://supabase.com/docs/reference/javascript/v1)

**🔴 ERROR - unique-constraint-violation**

**Condition:** Update would violate unique constraint (23505)

**Throws:** `Error with code '23505'`

**Required Handling:**

Check for conflicts before updating. DO NOT retry.

📖 [Source](https://supabase.com/docs/reference/javascript/v1)

---

### `delete()`

Deletes data from a table

**Import:**
```typescript
import { delete } from '@supabase/supabase-js';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - rls-policy-violation**

**Condition:** RLS policy denies delete permission (42501)

**Throws:** `Error with code '42501'`

**Required Handling:**

Ensure RLS policies allow DELETE for user. Verify user owns the record if policy checks ownership.


📖 [Source](https://supabase.com/docs/guides/troubleshooting/database-api-42501-errors)

**🔴 ERROR - foreign-key-violation**

**Condition:** Cannot delete due to dependent records (23503)

**Throws:** `Error with code '23503'`

**Required Handling:**

Delete dependent records first or use CASCADE. Return error about dependent records to user.


📖 [Source](https://supabase.com/docs/reference/javascript/v1)

---

### `rpc()`

Calls a PostgreSQL function (RPC)

**Import:**
```typescript
import { rpc } from '@supabase/supabase-js';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - function-not-found**

**Condition:** PostgreSQL function does not exist (42883)

**Throws:** `Error with code '42883'`

**Required Handling:**

Verify function name is correct. Ensure function is created in database. DO NOT retry without fixing function name.


📖 [Source](https://supabase.com/docs/reference/javascript/v1)

**🔴 ERROR - permission-denied**

**Condition:** User doesn't have permission to execute function (42501)

**Throws:** `Error with code '42501'`

**Required Handling:**

Grant EXECUTE permission on function to appropriate role. Check if user is authenticated if required.


📖 [Source](https://supabase.com/docs/guides/troubleshooting/database-api-42501-errors)

**🔴 ERROR - rpc-error**

**Condition:** Function execution error

**Throws:** `Error from function execution`

**Required Handling:**

Check function logs for specific error. Handle business logic errors from function. May include constraint violations, custom errors, etc.


📖 [Source](https://supabase.com/docs/reference/javascript/v1)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - security-definer**

Functions with SECURITY DEFINER run with creator's permissions, bypassing RLS. Use cautiously.

📖 [Source](https://supabase.com/docs/guides/database/postgres/row-level-security)

---

## Example: Proper Error Handling

```typescript
import supabase-js from '@supabase/supabase-js';

async function example() {
  try {
    const result = await signUp(/* args */);
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
