---
title: "tedious"
---

# tedious

| Property | Value |
|----------|-------|
| **Package** | `tedious` |
| **Versions Covered** | `>=18.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install tedious
```

## Covered Functions

This contract covers 8 function(s):

### `connect()`

Establishes connection to SQL Server

**Import:**
```typescript
import { connect } from 'tedious';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connection-failure**

**Condition:** Cannot connect (wrong credentials, server unreachable, etc.)

**Throws:** ConnectionError event with details

**Required Handling:**

Caller MUST handle 'error' event on Connection. Common error codes: - ESOCKET: Network/socket error - ELOGIN: Authentication failed - ETIMEOUT: Connection timeout Implement retry with exponential backoff for transient issues.


📖 [Source](https://tediousjs.github.io/tedious/api-connection.html)

---

### `execSql()`

Executes SQL statement

**Import:**
```typescript
import { execSql } from 'tedious';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - syntax-error**

**Condition:** SQL syntax error

**Throws:** Error event on Request with error.number indicating syntax error

**Required Handling:**

Caller MUST handle 'error' event on Request. SQL Server error numbers: - 102, 156: Syntax errors - 207: Invalid column name - 208: Invalid object name (table not found) DO NOT retry - fix SQL syntax.


📖 [Source](https://tediousjs.github.io/tedious/api-request.html)

**🔴 ERROR - constraint-violation**

**Condition:** Unique constraint, foreign key, or NOT NULL violation

**Throws:** Error event with error.number for constraint violations

**Required Handling:**

Caller MUST handle constraint violations: - 2627: Unique constraint violation - 547: Foreign key constraint violation - 515: NOT NULL constraint violation Extract details from error.message. DO NOT retry without fixing data.


📖 [Source](https://docs.microsoft.com/en-us/sql/relational-databases/errors-events/database-engine-events-and-errors)

**🔴 ERROR - connection-error**

**Condition:** Connection lost during query execution

**Throws:** Error event with connection-related error codes

**Required Handling:**

Caller MUST handle connection errors. Connection may be lost due to timeout or server restart. Implement retry with exponential backoff.


📖 [Source](https://tediousjs.github.io/tedious/api-connection.html)

**🔴 ERROR - deadlock**

**Condition:** Transaction deadlock detected

**Throws:** Error event with error.number = 1205

**Required Handling:**

Caller MUST handle deadlock errors. Deadlocks are transient - implement retry logic. SQL Server automatically rolls back deadlocked transaction. Consider transaction isolation level and lock hints to reduce deadlocks.


📖 [Source](https://docs.microsoft.com/en-us/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide)

**🔴 ERROR - timeout**

**Condition:** Query execution timeout exceeded

**Throws:** Error event with ETIMEOUT code

**Required Handling:**

Caller MUST handle timeout errors. Query took longer than request timeout setting. Consider optimizing query or increasing timeout.


📖 [Source](https://tediousjs.github.io/tedious/api-request.html)

---

### `callProcedure()`

Calls stored procedure

**Import:**
```typescript
import { callProcedure } from 'tedious';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - procedure-error**

**Condition:** Stored procedure raises error or does not exist

**Throws:** Error event on Request with SQL Server error number

**Required Handling:**

Caller MUST handle 'error' event on Request. Error numbers: - 2812: Procedure not found - Application errors: RAISERROR in procedure Check error.number and error.message for details.


📖 [Source](https://tediousjs.github.io/tedious/api-request.html)

**🔴 ERROR - connection-error**

**Condition:** Connection lost during procedure call

**Throws:** Error event with connection-related error codes

**Required Handling:**

Caller MUST handle connection errors. Implement retry with exponential backoff for transient issues.


📖 [Source](https://tediousjs.github.io/tedious/api-connection.html)

---

### `beginTransaction()`

Begins a database transaction

**Import:**
```typescript
import { beginTransaction } from 'tedious';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - transaction-start-error**

**Condition:** Cannot start transaction due to connection issues

**Throws:** Error event on Connection with transaction error details

**Required Handling:**

Caller MUST handle 'error' event on Connection. Connection must be in LoggedIn state to begin transaction. Ensure no other transaction is active on connection.


📖 [Source](https://tediousjs.github.io/tedious/api-connection.html)

**🔴 ERROR - nested-transaction-error**

**Condition:** Attempting to begin transaction when one is already active

**Throws:** Error event indicating transaction already in progress

**Required Handling:**

Caller MUST track transaction state. SQL Server supports nested transactions via SAVE TRANSACTION. Consider using savepoints for nested logic.


📖 [Source](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/begin-transaction-transact-sql)

---

### `commitTransaction()`

Commits the current transaction

**Import:**
```typescript
import { commitTransaction } from 'tedious';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - commit-error**

**Condition:** Cannot commit transaction (constraint violation, business rule failure)

**Throws:** Error event on Connection with commit failure details

**Required Handling:**

Caller MUST handle 'error' event on Connection. Commit can fail if deferred constraints are violated. Transaction will be rolled back automatically on commit failure.


📖 [Source](https://tediousjs.github.io/tedious/api-connection.html)

**🔴 ERROR - no-active-transaction**

**Condition:** Attempting to commit when no transaction is active

**Throws:** Error event indicating no transaction to commit

**Required Handling:**

Caller MUST track transaction state. Ensure beginTransaction was called and no prior rollback occurred.


📖 [Source](https://tediousjs.github.io/tedious/api-connection.html)

---

### `rollbackTransaction()`

Rolls back the current transaction

**Import:**
```typescript
import { rollbackTransaction } from 'tedious';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - rollback-error**

**Condition:** Cannot rollback transaction (connection lost)

**Throws:** Error event on Connection with rollback failure details

**Required Handling:**

Caller MUST handle 'error' event on Connection. Rollback rarely fails; if it does, connection may be unusable. Consider closing and reopening connection after rollback failure.


📖 [Source](https://tediousjs.github.io/tedious/api-connection.html)

**🔴 ERROR - no-active-transaction**

**Condition:** Attempting to rollback when no transaction is active

**Throws:** Error event indicating no transaction to rollback

**Required Handling:**

Caller MUST track transaction state. Ensure beginTransaction was called.


📖 [Source](https://tediousjs.github.io/tedious/api-connection.html)

---

### `prepare()`

Prepares a SQL statement for execution

**Import:**
```typescript
import { prepare } from 'tedious';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - prepare-error**

**Condition:** SQL syntax error or invalid statement

**Throws:** Error event on Request with SQL Server error details

**Required Handling:**

Caller MUST handle 'error' event on Request. Prepare validates SQL syntax before execution. Error numbers same as execSql (102, 156, 207, 208).


📖 [Source](https://tediousjs.github.io/tedious/api-request.html)

---

### `unprepare()`

Releases a prepared statement

**Import:**
```typescript
import { unprepare } from 'tedious';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - unprepare-error**

**Condition:** Cannot unprepare statement (connection lost, invalid handle)

**Throws:** Error event on Request with error details

**Required Handling:**

Caller MUST handle 'error' event on Request. Unprepare should always be called to free server resources.


📖 [Source](https://tediousjs.github.io/tedious/api-request.html)

---

## Example: Proper Error Handling

```typescript
import tedious from 'tedious';

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
