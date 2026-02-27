---
title: "redis"
---

# redis

| Property | Value |
|----------|-------|
| **Package** | `redis` |
| **Versions Covered** | `>=5.0.0 <6.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install redis
```

## Covered Functions

This contract covers 5 function(s):

### `createClient()`

Creates a Redis client instance that requires error event listener

**Import:**
```typescript
import { createClient } from 'redis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - missing-error-listener**

**Condition:** createClient() called without .on('error', handler) registered

**Required Handling:**

MUST call client.on('error', handler) immediately after createClient(). Handler should log error details and optionally trigger reconnection logic or graceful shutdown.


📖 [Source](https://redis.io/docs/latest/develop/clients/nodejs/error-handling/)

---

### `connect()`

Establishes connection to Redis server

**Import:**
```typescript
import { connect } from 'redis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connect-no-error-handling**

**Condition:** client.connect() called without try-catch or .catch() handler

**Throws:** Connection errors (ECONNREFUSED, ETIMEDOUT, ECONNRESET, EAI_AGAIN)

**Required Handling:**

MUST wrap await client.connect() in try-catch block. Catch block should check error.code and implement retry logic with exponential backoff for recoverable errors. Non-recoverable errors should trigger graceful shutdown or fallback mode.


📖 [Source](https://redis.io/docs/latest/develop/clients/nodejs/error-handling/)

---

### `get()`

Retrieves value for a key from Redis

**Import:**
```typescript
import { get } from 'redis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - get-no-error-handling**

**Condition:** client.get() called without try-catch or .catch() handler

**Throws:** Connection errors, timeout errors, or WRONGTYPE errors

**Required Handling:**

MUST wrap await client.get() in try-catch block. For connection errors, implement graceful degradation (fallback to database). For WRONGTYPE errors, fix data schema. For timeout errors, retry with backoff or return cached/default value.


📖 [Source](https://redis.io/docs/latest/develop/clients/nodejs/error-handling/)

---

### `set()`

Sets a key-value pair in Redis

**Import:**
```typescript
import { set } from 'redis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - set-no-error-handling**

**Condition:** client.set() called without try-catch or .catch() handler

**Throws:** Connection errors, timeout errors, or command errors

**Required Handling:**

MUST wrap await client.set() in try-catch block. For connection errors, consider queueing write for retry. For critical writes, re-throw error to caller. For non-critical cache writes, log error and continue without cache.


📖 [Source](https://redis.io/docs/latest/develop/clients/nodejs/error-handling/)

---

### `del()`

Deletes one or more keys from Redis

**Import:**
```typescript
import { del } from 'redis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - del-no-error-handling**

**Condition:** client.del() called without try-catch or .catch() handler

**Throws:** Connection errors or timeout errors

**Required Handling:**

MUST wrap await client.del() in try-catch block. For connection errors, log error and decide whether to retry, fail operation, or continue. Critical deletes should re-throw error to caller for proper handling.


📖 [Source](https://redis.io/docs/latest/develop/clients/nodejs/error-handling/)

---

## Example: Proper Error Handling

```typescript
import redis from 'redis';

async function example() {
  try {
    const result = await createClient(/* args */);
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
