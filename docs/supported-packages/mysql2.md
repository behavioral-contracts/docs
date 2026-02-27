---
title: mysql2
---

# mysql2

| Property | Value |
|----------|-------|
| **Package** | `mysql2` |
| **Versions Covered** | `>=3.9.8` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install mysql2
```

## Covered Functions

This contract covers 7 function(s):

### `connect()`

Establishes connection to MySQL server

**Import:**
```typescript
import { connect } from 'mysql2/promise';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connection-failure**

**Condition:** Cannot connect (wrong credentials, host unreachable, etc.)

**Throws:** `Error with code 'ECONNREFUSED', 'ER_ACCESS_DENIED_ERROR', etc.`

**Required Handling:**

Caller MUST catch connection errors. Common error codes: - ECONNREFUSED: MySQL server not running - ER_ACCESS_DENIED_ERROR: Wrong username/password - ETIMEDOUT: Network timeout Implement retry with exponential backoff for transient issues.


📖 [Source](https://github.com/sidorares/node-mysql2)

---

### `query()`

Executes SQL query without prepared statements

**Import:**
```typescript
import { query } from 'mysql2/promise';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - syntax-error**

**Condition:** SQL syntax error

**Throws:** `Error with code 'ER_PARSE_ERROR' or similar`

**Required Handling:**

Caller MUST validate SQL syntax before execution. DO NOT retry - indicates SQL syntax error. Check error.sqlMessage for details.


📖 [Source](https://github.com/sidorares/node-mysql2)

**🔴 ERROR - constraint-violation**

**Condition:** Unique constraint, foreign key, or NOT NULL violation

**Throws:** `Error with code 'ER_DUP_ENTRY', 'ER_NO_REFERENCED_ROW', 'ER_BAD_NULL_ERROR'`

**Required Handling:**

Caller MUST handle constraint violations: - ER_DUP_ENTRY (1062): Duplicate key violation - ER_NO_REFERENCED_ROW_2 (1452): Foreign key constraint - ER_BAD_NULL_ERROR (1048): NOT NULL constraint Extract details from error.sqlMessage. DO NOT retry without fixing data.


📖 [Source](https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html)

**🔴 ERROR - connection-error**

**Condition:** Connection lost during query execution

**Throws:** `Error with code 'PROTOCOL_CONNECTION_LOST', 'ECONNRESET'`

**Required Handling:**

Caller MUST handle connection errors. Connection may be lost due to timeout or server restart. Implement retry with exponential backoff.


📖 [Source](https://github.com/sidorares/node-mysql2)

**🔴 ERROR - table-not-found**

**Condition:** Table or view does not exist

**Throws:** `Error with code 'ER_NO_SUCH_TABLE' (1146)`

**Required Handling:**

Caller MUST verify table exists before querying. DO NOT retry - indicates schema mismatch or missing migration.


📖 [Source](https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - sql-injection-risk**

NEVER use query() with string concatenation or template literals for user input. Example VULNERABLE code: query(`SELECT * FROM users WHERE id = ${userId}`) This creates SQL injection vulnerability. ALWAYS use execute() with parameters instead: execute('SELECT * FROM users WHERE id = ?', [userId])


📖 [Source](https://github.com/sidorares/node-mysql2/discussions/1601)

---

### `execute()`

Executes prepared statement (parameterized query)

**Import:**
```typescript
import { execute } from 'mysql2/promise';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - syntax-error**

**Condition:** SQL syntax error in prepared statement

**Throws:** `Error with code 'ER_PARSE_ERROR' or similar`

**Required Handling:**

Caller MUST validate SQL syntax. Prepared statements prevent SQL injection but not syntax errors. DO NOT retry - fix SQL syntax.


📖 [Source](https://github.com/sidorares/node-mysql2)

**🔴 ERROR - constraint-violation**

**Condition:** Unique, foreign key, or NOT NULL constraint violation

**Throws:** `Error with code 'ER_DUP_ENTRY', 'ER_NO_REFERENCED_ROW_2', 'ER_BAD_NULL_ERROR'`

**Required Handling:**

Caller MUST handle constraint violations gracefully. DO NOT retry without changing violating data.


📖 [Source](https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html)

**🔴 ERROR - connection-error**

**Condition:** Connection lost or timeout

**Throws:** `Error with code 'PROTOCOL_CONNECTION_LOST', 'ETIMEDOUT'`

**Required Handling:**

Caller MUST handle connection errors. May be transient - implement retry logic.


📖 [Source](https://github.com/sidorares/node-mysql2)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - prepared-statement-safety**

execute() uses MySQL prepared statements which prevent SQL injection by design. Parameters are sent separately from SQL query, making injection impossible. This is the recommended method for all queries with user input.


📖 [Source](https://github.com/sidorares/node-mysql2)

---

### `getConnection()`

Gets connection from pool

**Import:**
```typescript
import { getConnection } from 'mysql2/promise';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - pool-exhausted**

**Condition:** All connections in pool are busy and timeout exceeded

**Throws:** `Error with message 'Pool is closed' or timeout error`

**Required Handling:**

Caller MUST handle pool exhaustion. Root causes: 1. Connections not released (forgot connection.release()) 2. Pool size too small for load 3. Queries taking too long ALWAYS release connections in finally block.


📖 [Source](https://github.com/sidorares/node-mysql2)

**🔴 ERROR - connection-failure**

**Condition:** Cannot establish connection from pool

**Throws:** `Error with code 'ECONNREFUSED', 'ETIMEDOUT'`

**Required Handling:**

Caller MUST handle connection failures. Implement retry with exponential backoff.


📖 [Source](https://github.com/sidorares/node-mysql2)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - connection-leak-prevention**

MOST COMMON PRODUCTION BUG: Forgetting to call connection.release() causes pool exhaustion. ALWAYS use try-finally pattern: const conn = await pool.getConnection(); try {
  await conn.query(...);
} finally {
  conn.release(); // CRITICAL - must always execute
} Failure to release leads to "Pool is closed" errors and application hangs.


📖 [Source](https://github.com/sidorares/node-mysql2/issues/1486)

**⚠️ WARNING - multiple-release-calls**

Calling connection.release() multiple times on the same connection causes "Error: connection already released" and crashes. Only call release() once per getConnection(). Use boolean flag if needed to track release state.


📖 [Source](https://github.com/sidorares/node-mysql2/issues/1234)

---

### `beginTransaction()`

Starts database transaction

**Import:**
```typescript
import { beginTransaction } from 'mysql2/promise';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - transaction-start-failure**

**Condition:** Cannot start transaction (connection error, etc.)

**Throws:** `Error with connection-related codes`

**Required Handling:**

Caller MUST catch transaction start errors. Network errors may be transient and retriable.


📖 [Source](https://github.com/sidorares/node-mysql2)

---

### `commit()`

Commits transaction

**Import:**
```typescript
import { commit } from 'mysql2/promise';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - commit-failure**

**Condition:** Transaction commit fails (constraint violation, connection lost, etc.)

**Throws:** `Error with various codes depending on failure reason`

**Required Handling:**

Caller MUST catch commit errors. If commit fails, transaction is rolled back. Caller should handle rollback appropriately.


📖 [Source](https://github.com/sidorares/node-mysql2)

---

### `rollback()`

Rolls back transaction

**Import:**
```typescript
import { rollback } from 'mysql2/promise';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - rollback-failure**

**Condition:** Rollback fails (connection lost, etc.)

**Throws:** `Error with connection-related codes`

**Required Handling:**

Caller MUST catch rollback errors. Even rollback can fail due to connection issues. Log rollback failures for investigation.


📖 [Source](https://github.com/sidorares/node-mysql2)

---

## Example: Proper Error Handling

```typescript
import mysql2 from 'mysql2';

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

- [Contract Schema Reference](../contract-schema/schema-reference.md)
- [All Supported Packages](./overview.md)
- [How to Use verify-cli](../cli-reference/overview.md)
