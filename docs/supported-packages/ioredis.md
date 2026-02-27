---
title: "ioredis"
---

# ioredis

| Property | Value |
|----------|-------|
| **Package** | `ioredis` |
| **Versions Covered** | `>=4.27.8` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install ioredis
```

## Covered Functions

This contract covers 15 function(s):

### `Redis()`

Redis client constructor - Creates a Redis connection instance

**Import:**
```typescript
import { Redis } from 'ioredis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - missing-error-listener**

**Condition:** Redis instance created without error event listener

**Throws:** Errors emitted as events, not exceptions - silent failures

**Required Handling:**

Caller MUST attach an error listener immediately after creating Redis instance: `redis.on('error', (err) = logger.error(err))`. Without this listener, connection errors are silently logged to console and may crash the application.


📖 [Source](https://github.com/redis/ioredis#error-handling)

**🔴 ERROR - connection-errors-not-handled**

**Condition:** Connection fails (ECONNREFUSED, ETIMEDOUT, ECONNRESET, ENOTFOUND, EPIPE, EAI_AGAIN)

**Throws:** Error event emitted with connection error

**Required Handling:**

Caller MUST handle connection errors in the error event listener. Common errors: ECONNREFUSED (Redis not running), ETIMEDOUT (network timeout), ECONNRESET (connection dropped), ENOTFOUND (DNS failure).


📖 [Source](https://github.com/redis/ioredis/issues/321)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - lazy-connection**

Connection is lazy by default - errors may occur after constructor returns

📖 [Source](https://github.com/redis/ioredis#connect-to-redis)

---

### `get()`

Get value of key from Redis

**Import:**
```typescript
import { get } from 'ioredis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - unhandled-promise-rejection**

**Condition:** Command promise rejected without catch handler

**Throws:** UnhandledPromiseRejectionWarning - will crash in future Node.js versions

**Required Handling:**

Caller MUST use try-catch (async/await) or .catch() on all Redis commands. Commands return promises that may reject due to: connection errors, WRONGTYPE, timeout, or serialization failures.


📖 [Source](https://github.com/redis/ioredis/issues/433)

**⚠️ WARNING - command-timeout**

**Condition:** Command exceeds timeout (default: no timeout)

**Throws:** MaxRetriesPerRequestError or CommandTimeoutError

**Required Handling:**

Caller SHOULD set commandTimeout option to prevent hanging operations. Without timeout, commands may hang indefinitely on network issues.


📖 [Source](https://github.com/redis/ioredis#command-timeout)

---

### `set()`

Set key to value in Redis

**Import:**
```typescript
import { set } from 'ioredis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - unhandled-promise-rejection**

**Condition:** Command promise rejected without catch handler

**Throws:** UnhandledPromiseRejectionWarning

**Required Handling:**

Caller MUST use try-catch or .catch() on all Redis commands.


📖 [Source](https://github.com/redis/ioredis/issues/433)

---

### `pipeline()`

Create pipeline for batch command execution

**Import:**
```typescript
import { pipeline } from 'ioredis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - pipeline-results-not-checked**

**Condition:** Pipeline exec() results not checked for errors

**Throws:** Individual command errors silently included in results array

**Required Handling:**

Caller MUST check each result in pipeline.exec() return value. Format: [[null, 'OK'], [Error, undefined], ...]. Pipeline does NOT reject on individual command failures.


📖 [Source](https://github.com/redis/ioredis#pipelines)

**🔴 ERROR - pipeline-exec-unhandled**

**Condition:** Pipeline exec() promise rejected without catch

**Throws:** UnhandledPromiseRejectionWarning

**Required Handling:**

Caller MUST use try-catch or .catch() on pipeline.exec().


📖 [Source](https://github.com/redis/ioredis/issues/753)

---

### `multi()`

Create transaction (MULTI/EXEC block)

**Import:**
```typescript
import { multi } from 'ioredis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - watch-null-not-checked**

**Condition:** WATCH violation causes exec() to return null, not checked

**Throws:** null return value indicates transaction was aborted

**Required Handling:**

Caller MUST check if exec() returns null after using WATCH. Null indicates a watched key was modified, transaction aborted. This is NOT an error/rejection - it's a null return value.


📖 [Source](https://github.com/redis/ioredis/issues/883)

**🔴 ERROR - exec-abort-not-handled**

**Condition:** EXECABORT error in transaction not handled

**Throws:** EXECABORT error if queued command fails validation

**Required Handling:**

Caller MUST check exec() results for EXECABORT errors. Happens when queued commands fail validation (WRONGTYPE, etc.).


📖 [Source](https://github.com/redis/ioredis#transactions)

---

### `subscribe()`

Subscribe to Redis pub/sub channel

**Import:**
```typescript
import { subscribe } from 'ioredis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - subscriber-mode-violation**

**Condition:** Non-pub/sub commands used on subscriber connection

**Throws:** Error: Connection in subscriber mode, only subscriber commands allowed

**Required Handling:**

Caller MUST use separate Redis connection for pub/sub. After subscribe(), only subscribe/unsubscribe/psubscribe/punsubscribe/quit/ping allowed. Use redis.duplicate() to create separate connection for normal commands.


📖 [Source](https://github.com/redis/ioredis#pub/sub)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - duplicate-for-commands**

Must use redis.duplicate() to create separate connection for normal commands while subscribed

📖 [Source](https://github.com/redis/ioredis/issues/944)

---

### `brpop()`

Blocking pop from list (right side)

**Import:**
```typescript
import { brpop } from 'ioredis';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - blocking-without-timeout**

**Condition:** Blocking command without timeout parameter

**Throws:** Command may block indefinitely, causing resource leak

**Required Handling:**

Caller SHOULD provide timeout parameter to blocking commands (BRPOP, BLPOP, BZPOPMIN, BZPOPMAX). Without timeout (or timeout=0), command blocks until data available, potentially forever. Recommended: Set reasonable timeout (e.g., 5-30 seconds).


📖 [Source](https://redis.io/commands/brpop/)

---

### `connect()`

Explicitly connect to Redis (usually automatic)

**Import:**
```typescript
import { connect } from 'ioredis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connect-promise-unhandled**

**Condition:** connect() promise rejected without catch

**Throws:** UnhandledPromiseRejectionWarning on connection failure

**Required Handling:**

Caller MUST use try-catch or .catch() on explicit connect() calls.


📖 [Source](https://github.com/redis/ioredis#connect-to-redis)

---

### `hget()`

Get hash field value

**Import:**
```typescript
import { hget } from 'ioredis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - wrong-type-error**

**Condition:** Key exists but is not a hash

**Throws:** ReplyError with message containing 'WRONGTYPE'

**Required Handling:**

Caller MUST catch WRONGTYPE errors for hash operations. This indicates key is not a hash - DO NOT retry. Fix data model or use correct command for key type.


📖 [Source](https://redis.io/docs/latest/develop/clients/error-handling/)

**🔴 ERROR - unhandled-promise-rejection**

**Condition:** Command promise rejected without catch handler

**Throws:** UnhandledPromiseRejectionWarning

**Required Handling:**

Caller MUST use try-catch or .catch() on all Redis commands.


📖 [Source](https://github.com/redis/ioredis/issues/433)

---

### `hset()`

Set hash field value

**Import:**
```typescript
import { hset } from 'ioredis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - wrong-type-error**

**Condition:** Key exists but is not a hash

**Throws:** ReplyError with message containing 'WRONGTYPE'

**Required Handling:**

Caller MUST catch WRONGTYPE errors. Key exists with different type - DO NOT retry.


📖 [Source](https://redis.io/docs/latest/develop/clients/error-handling/)

**🔴 ERROR - unhandled-promise-rejection**

**Condition:** Command promise rejected without catch handler

**Throws:** UnhandledPromiseRejectionWarning

**Required Handling:**

Caller MUST use try-catch or .catch() on all Redis commands.


📖 [Source](https://github.com/redis/ioredis/issues/433)

---

### `hgetall()`

Get all hash fields and values

**Import:**
```typescript
import { hgetall } from 'ioredis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - wrong-type-error**

**Condition:** Key exists but is not a hash

**Throws:** ReplyError with message containing 'WRONGTYPE'

**Required Handling:**

Caller MUST catch WRONGTYPE errors. Key is not a hash - DO NOT retry.


📖 [Source](https://redis.io/docs/latest/develop/clients/error-handling/)

**🔴 ERROR - unhandled-promise-rejection**

**Condition:** Command promise rejected without catch handler

**Throws:** UnhandledPromiseRejectionWarning

**Required Handling:**

Caller MUST use try-catch or .catch() on all Redis commands.


📖 [Source](https://github.com/redis/ioredis/issues/433)

---

### `lpush()`

Push value to head of list

**Import:**
```typescript
import { lpush } from 'ioredis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - wrong-type-error**

**Condition:** Key exists but is not a list

**Throws:** ReplyError with message containing 'WRONGTYPE'

**Required Handling:**

Caller MUST catch WRONGTYPE errors. Key exists with different type - DO NOT retry.


📖 [Source](https://redis.io/docs/latest/develop/clients/error-handling/)

**🔴 ERROR - unhandled-promise-rejection**

**Condition:** Command promise rejected without catch handler

**Throws:** UnhandledPromiseRejectionWarning

**Required Handling:**

Caller MUST use try-catch or .catch() on all Redis commands.


📖 [Source](https://github.com/redis/ioredis/issues/433)

---

### `rpush()`

Push value to tail of list

**Import:**
```typescript
import { rpush } from 'ioredis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - wrong-type-error**

**Condition:** Key exists but is not a list

**Throws:** ReplyError with message containing 'WRONGTYPE'

**Required Handling:**

Caller MUST catch WRONGTYPE errors. Key exists with different type - DO NOT retry.


📖 [Source](https://redis.io/docs/latest/develop/clients/error-handling/)

**🔴 ERROR - unhandled-promise-rejection**

**Condition:** Command promise rejected without catch handler

**Throws:** UnhandledPromiseRejectionWarning

**Required Handling:**

Caller MUST use try-catch or .catch() on all Redis commands.


📖 [Source](https://github.com/redis/ioredis/issues/433)

---

### `publish()`

Publish message to Redis channel

**Import:**
```typescript
import { publish } from 'ioredis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - publish-error**

**Condition:** Publish fails (connection lost, etc.)

**Throws:** Network error or UnhandledPromiseRejectionWarning

**Required Handling:**

Caller MUST catch publish errors with try-catch or .catch(). Network errors may be transient - implement retry logic. Returns number of subscribers that received the message (may be 0).


📖 [Source](https://dev.to/franciscomendes10866/using-redis-pub-sub-with-node-js-13k3)

---

### `eval()`

Execute Lua script on Redis server

**Import:**
```typescript
import { eval } from 'ioredis';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - script-error**

**Condition:** Lua script has syntax or runtime error

**Throws:** ReplyError with script error details

**Required Handling:**

Caller MUST catch Lua script errors. Script syntax errors should NOT be retried - fix script. Script runtime errors depend on logic - may or may not be retriable.


📖 [Source](https://redis.io/docs/latest/develop/clients/error-handling/)

**🔴 ERROR - script-timeout**

**Condition:** Lua script exceeds execution time limit

**Throws:** ReplyError with timeout message

**Required Handling:**

Caller MUST catch script timeout errors. Redis has lua-time-limit configuration (default 5 seconds). Optimize script or increase limit if needed. DO NOT retry immediately - may cause cascading timeouts.


📖 [Source](https://redis.io/docs/latest/develop/clients/error-handling/)

---

## Example: Proper Error Handling

```typescript
import ioredis from 'ioredis';

async function example() {
  try {
    const result = await Redis(/* args */);
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
