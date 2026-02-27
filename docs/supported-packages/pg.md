---
title: "pg"
---

# pg

| Property | Value |
|----------|-------|
| **Package** | `pg` |
| **Versions Covered** | `>=8.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install pg
```

## Covered Functions

This contract covers 2 function(s):

### `query()`

Executes a SQL query (Client.query or Pool.query)

**Import:**
```typescript
import { query } from 'pg';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - syntax-error**

**Condition:** SQL syntax error (42601)

**Throws:** Error with code '42601'

**Required Handling:**

Caller MUST validate SQL syntax before execution. This indicates a SQL syntax error - DO NOT retry. Check error.position for location of syntax error in query.


📖 [Source](https://www.postgresql.org/docs/current/errcodes-appendix.html)

**🔴 ERROR - unique-violation**

**Condition:** Unique constraint violation (23505)

**Throws:** Error with code '23505'

**Required Handling:**

Caller MUST handle duplicate key violations gracefully. Extract constraint name from error.constraint. DO NOT retry without changing the unique field value.


📖 [Source](https://www.postgresql.org/docs/current/errcodes-appendix.html)

**🔴 ERROR - foreign-key-violation**

**Condition:** Foreign key constraint violation (23503)

**Throws:** Error with code '23503'

**Required Handling:**

Caller MUST verify referenced record exists before insertion. Extract constraint and table from error.constraint and error.table. This indicates data integrity issue - DO NOT retry.


📖 [Source](https://www.postgresql.org/docs/current/errcodes-appendix.html)

**🔴 ERROR - not-null-violation**

**Condition:** NOT NULL constraint violation (23502)

**Throws:** Error with code '23502'

**Required Handling:**

Caller MUST provide all required fields. Extract column name from error.column. Validate data completeness before query execution.


📖 [Source](https://www.postgresql.org/docs/current/errcodes-appendix.html)

**🔴 ERROR - connection-error**

**Condition:** Connection to database failed

**Throws:** Error with code 'ECONNREFUSED' or similar network errors

**Required Handling:**

Caller MUST handle connection failures separately from query errors. Common causes: database down, wrong host/port, network issues. Implement retry with exponential backoff for transient connection issues. Alert operations if connection errors persist.


📖 [Source](https://node-postgres.com/)

**🔴 ERROR - undefined-table**

**Condition:** Table or view does not exist (42P01)

**Throws:** Error with code '42P01'

**Required Handling:**

Caller MUST verify table exists before querying. Check error.message for table name. DO NOT retry - this indicates schema mismatch or missing migration.


📖 [Source](https://www.postgresql.org/docs/current/errcodes-appendix.html)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - sql-injection-string-concatenation**

CRITICAL SECURITY: Using string concatenation or template literals with user input. WRONG: pool.query(`SELECT * FROM users WHERE username = '$username'`); CORRECT: pool.query('SELECT * FROM users WHERE username = $1', [username]); NEVER concatenate user input into SQL - use parameterized queries ($1, $2, etc). This is the #1 security vulnerability in database applications.


📖 [Source](https://dev.to/ofri-peretz/sql-injection-in-node-postgres-the-pattern-everyone-gets-wrong-54mn)

**⚠️ WARNING - transaction-not-rolled-back**

COMMON: BEGIN transaction without ROLLBACK in catch block. Results in data corruption and held locks. ALWAYS wrap transactions: try  BEGIN - COMMIT  catch  ROLLBACK  finally  release()  Missing ROLLBACK leaves database in inconsistent state.


📖 [Source](https://node-postgres.com/features/transactions)

**⚠️ WARNING - query-timeout**

Long-running queries may timeout. Configure statement_timeout or query_timeout.

📖 [Source](https://node-postgres.com/apis/client)

---

### `connect()`

Establishes connection (Client.connect or Pool.connect)

**Import:**
```typescript
import { connect } from 'pg';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - pool-exhausted**

**Condition:** All clients in pool are busy and connectionTimeoutMillis exceeded

**Throws:** Error with message 'timeout exceeded when trying to connect'

**Required Handling:**

Caller MUST handle pool exhaustion errors. Root causes: 1. Clients not released (forgot client.release()) 2. Pool size too small for load 3. Queries taking too long Implement proper client.release() in finally blocks. Monitor pool metrics to identify leaks.


📖 [Source](https://node-postgres.com/apis/pool)

**🔴 ERROR - connection-error**

**Condition:** Cannot establish database connection

**Throws:** Error with code 'ECONNREFUSED', 'ETIMEDOUT', etc.

**Required Handling:**

Caller MUST handle connection failures. Implement retry with exponential backoff. Check database server status. Verify connection string credentials.


📖 [Source](https://node-postgres.com/features/pooling)

**🔴 ERROR - client-not-released**

**Condition:** Caller forgets to release client back to pool

**Throws:** No error thrown, but pool becomes exhausted over time

**Required Handling:**

Caller MUST ALWAYS release clients in a finally block: ``` const client = await pool.connect(); try 
  await client.query(...);
 finally 
  client.release();
 ``` CRITICAL: This is the #1 production bug (affects 30% of mid-sized projects). Failure to release causes pool exhaustion and application hangs. Silent failure until complete outage.


📖 [Source](https://github.com/brianc/node-postgres/issues/1882)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - pool-query-for-transactions**

COMMON: Using pool.query() for BEGIN/COMMIT/ROLLBACK. Each pool.query() might use a different client, breaking transactions. WRONG: await pool.query('BEGIN'); await pool.query(...); await pool.query('COMMIT'); CORRECT: const client = await pool.connect(); try  await client.query('BEGIN'); ...  ... Transactions MUST use a dedicated client from pool.connect().


📖 [Source](https://node-postgres.com/features/transactions)

**⚠️ WARNING - pool-error-events**

Pool emits 'error' events for background errors. MUST add error listener to prevent crash.

📖 [Source](https://node-postgres.com/apis/pool)

**ℹ️ INFO - pool-not-closed-on-shutdown**

COMMON: Not calling pool.end() during graceful shutdown. Results in hung connections and prevents clean application exit. MUST call pool.end() in shutdown handlers (SIGTERM, SIGINT).


📖 [Source](https://node-postgres.com/apis/pool)

---

## Example: Proper Error Handling

```typescript
import pg from 'pg';

async function example() {
  try {
    const result = await query(/* args */);
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
