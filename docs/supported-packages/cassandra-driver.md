---
title: "cassandra-driver"
---

# cassandra-driver

| Property | Value |
|----------|-------|
| **Package** | `cassandra-driver` |
| **Versions Covered** | `>=4.0.0 <5.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install cassandra-driver
```

## Covered Functions

This contract covers 6 function(s):

### `connect()`

Establishes connection to Cassandra cluster

**Import:**
```typescript
import { connect } from 'cassandra-driver';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connection-failure**

**Condition:** Cannot connect to any contact point in cluster

**Throws:** NoHostAvailableError with details of failed contact points

**Required Handling:**

Caller MUST handle NoHostAvailableError. Common causes: - All nodes unreachable - Wrong contact points - Authentication failure Check error.innerErrors for details on each contact point. Implement retry with exponential backoff.


📖 [Source](https://docs.datastax.com/en/developer/nodejs-driver/4.6/getting-started/)

**🔴 ERROR - authentication-failure**

**Condition:** Invalid credentials

**Throws:** AuthenticationError

**Required Handling:**

Caller MUST handle authentication errors. DO NOT retry with same credentials. Verify username/password in connection config.


📖 [Source](https://docs.datastax.com/en/developer/nodejs-driver/4.6/features/auth/)

---

### `execute()`

Executes CQL query or prepared statement

**Import:**
```typescript
import { execute } from 'cassandra-driver';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - syntax-error**

**Condition:** Invalid CQL syntax

**Throws:** ResponseError with code indicating syntax error

**Required Handling:**

Caller MUST validate CQL syntax before execution. Common error codes: - 0x2000: Syntax error - 0x2200: Invalid query DO NOT retry - fix CQL syntax.


📖 [Source](https://docs.datastax.com/en/developer/nodejs-driver/4.6/features/error-handling/)

**🔴 ERROR - unavailable**

**Condition:** Required replicas unavailable for consistency level

**Throws:** ResponseError with code 0x1000 (Unavailable)

**Required Handling:**

Caller MUST handle unavailable errors. Not enough replicas available for requested consistency level. May be transient if nodes are recovering. Consider: 1. Retry with exponential backoff 2. Lower consistency level (if acceptable) 3. Check cluster health


📖 [Source](https://docs.datastax.com/en/cassandra-oss/3.x/cassandra/dml/dmlAboutDataConsistency.html)

**🔴 ERROR - timeout**

**Condition:** Query timeout exceeded

**Throws:** OperationTimedOutError

**Required Handling:**

Caller MUST handle timeout errors. Query took longer than configured timeout. May indicate: - Slow query needing optimization - Overloaded cluster - Network issues Consider retry with exponential backoff for transient issues.


📖 [Source](https://docs.datastax.com/en/developer/nodejs-driver/4.6/features/error-handling/)

**🔴 ERROR - write-timeout**

**Condition:** Write operation timeout at replica

**Throws:** ResponseError with code 0x1100 (Write_timeout)

**Required Handling:**

Caller MUST handle write timeout errors. Write acknowledged by coordinator but timeout waiting for replicas. Data may or may not be written (non-idempotent risk). Implement idempotent retries or check if write succeeded.


📖 [Source](https://docs.datastax.com/en/cassandra-oss/3.x/cassandra/dml/dmlAboutDataConsistency.html)

**🔴 ERROR - read-timeout**

**Condition:** Read operation timeout at replica

**Throws:** ResponseError with code 0x1200 (Read_timeout)

**Required Handling:**

Caller MUST handle read timeout errors. Timeout waiting for replicas to respond. May be transient - implement retry logic.


📖 [Source](https://docs.datastax.com/en/cassandra-oss/3.x/cassandra/dml/dmlAboutDataConsistency.html)

**🔴 ERROR - overloaded**

**Condition:** Coordinator node is overloaded

**Throws:** ResponseError with code 0x1001 (Overloaded)

**Required Handling:**

Caller MUST handle overloaded errors. Coordinator cannot handle more requests. Implement retry with exponential backoff and jitter.


📖 [Source](https://docs.datastax.com/en/developer/nodejs-driver/4.6/features/error-handling/)

**🔴 ERROR - invalid-query**

**Condition:** Keyspace or table does not exist

**Throws:** ResponseError with code 0x2200 (Invalid)

**Required Handling:**

Caller MUST verify schema exists before querying. DO NOT retry - indicates schema mismatch.


📖 [Source](https://docs.datastax.com/en/developer/nodejs-driver/4.6/features/error-handling/)

---

### `batch()`

Executes batch of statements atomically (within same partition)

**Import:**
```typescript
import { batch } from 'cassandra-driver';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - batch-failure**

**Condition:** One or more statements in batch failed

**Throws:** ResponseError with details of failure

**Required Handling:**

Caller MUST handle batch errors. Entire batch fails if any statement fails. Check error code to determine failure reason. Note: Cassandra batches are NOT transactions across partitions.


📖 [Source](https://docs.datastax.com/en/developer/nodejs-driver/4.6/features/batch/)

**🔴 ERROR - write-timeout**

**Condition:** Batch write timeout

**Throws:** ResponseError with code 0x1100 (Write_timeout)

**Required Handling:**

Caller MUST handle batch write timeouts. Batch may be partially applied (non-atomic across partitions). Implement idempotent retry logic.


📖 [Source](https://docs.datastax.com/en/developer/nodejs-driver/4.6/features/batch/)

---

### `shutdown()`

Closes all connections to cluster

**Import:**
```typescript
import { shutdown } from 'cassandra-driver';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - shutdown-error**

**Condition:** Error during shutdown (rare)

**Throws:** Error with details of shutdown issue

**Required Handling:**

Caller SHOULD handle shutdown errors. Typically safe to ignore, but log for investigation.


📖 [Source](https://docs.datastax.com/en/developer/nodejs-driver/4.6/getting-started/)

---

### `stream()`

Returns readable stream for query results

**Import:**
```typescript
import { stream } from 'cassandra-driver';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - stream-error**

**Condition:** Query execution fails during streaming

**Throws:** ResponseError emitted via 'error' event

**Required Handling:**

Caller MUST listen for 'error' event on stream. Without error listener, unhandled error will crash process. Errors can occur during query execution or while reading rows. Handle NoHostAvailableError, OperationTimedOutError, ResponseError.


📖 [Source](https://docs.datastax.com/en/developer/nodejs-driver/4.6/features/queries/)

---

### `eachRow()`

Processes query results row-by-row via callback

**Import:**
```typescript
import { eachRow } from 'cassandra-driver';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - row-callback-error**

**Condition:** Query fails or row processing throws error

**Throws:** Error passed to endCallback parameter

**Required Handling:**

Caller MUST check error parameter in endCallback. Errors include: - NoHostAvailableError: Connection failure - OperationTimedOutError: Query timeout - ResponseError: Server-side query error If row callback throws, eachRow stops and calls endCallback with error.


📖 [Source](https://docs.datastax.com/en/developer/nodejs-driver/4.6/features/queries/)

---

## Example: Proper Error Handling

```typescript
import cassandra-driver from 'cassandra-driver';

async function example() {
  try {
    const result = await connect(/* args */);
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
