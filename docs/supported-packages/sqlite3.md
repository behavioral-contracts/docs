---
title: sqlite3
---

# sqlite3

| Property | Value |
|----------|-------|
| **Package** | `sqlite3` |
| **Versions Covered** | `>=5.0.3` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install sqlite3
```

## Covered Functions

This contract covers 5 function(s):

### `run()`

Executes SQL statement that doesn't return rows (INSERT, UPDATE, DELETE)

**Import:**
```typescript
import { run } from 'sqlite3';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - syntax-error**

**Condition:** SQL syntax error

**Throws:** `Error with message containing 'SQLITE_ERROR' or syntax details`

**Required Handling:**

Caller MUST validate SQL syntax before execution. DO NOT retry - indicates SQL syntax error. Error message contains details about syntax issue.


📖 [Source](https://github.com/TryGhost/node-sqlite3/wiki/API)

**🔴 ERROR - constraint-violation**

**Condition:** Unique constraint, foreign key, or NOT NULL violation

**Throws:** `Error with 'SQLITE_CONSTRAINT' code`

**Required Handling:**

Caller MUST handle constraint violations: - UNIQUE constraint: error.message contains constraint details - FOREIGN KEY: foreign key constraint violation - NOT NULL: required field missing DO NOT retry without fixing data.


📖 [Source](https://www.sqlite.org/rescode.html)

**🔴 ERROR - database-locked**

**Condition:** Database is locked by another process or transaction

**Throws:** `Error with 'SQLITE_BUSY' code`

**Required Handling:**

Caller MUST handle database locked errors. SQLite uses file-level locking. Implement retry with exponential backoff. Consider using WAL mode for better concurrency.


📖 [Source](https://www.sqlite.org/lockingv3.html)

**🔴 ERROR - table-not-found**

**Condition:** Table does not exist

**Throws:** `Error with message 'no such table'`

**Required Handling:**

Caller MUST verify table exists before executing queries. DO NOT retry - indicates schema mismatch or missing migration.


📖 [Source](https://github.com/TryGhost/node-sqlite3/wiki/API)

**🔴 ERROR - disk-full**

**Condition:** Disk is full or quota exceeded

**Throws:** `Error with 'SQLITE_FULL' code`

**Required Handling:**

Caller MUST handle disk full errors. Check available disk space. Alert operations - this is a system-level issue.


📖 [Source](https://www.sqlite.org/rescode.html)

---

### `get()`

Executes query and returns first row

**Import:**
```typescript
import { get } from 'sqlite3';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - syntax-error**

**Condition:** SQL syntax error

**Throws:** `Error with 'SQLITE_ERROR' or syntax message`

**Required Handling:**

Caller MUST validate SQL syntax. DO NOT retry - fix SQL syntax.


📖 [Source](https://github.com/TryGhost/node-sqlite3/wiki/API)

**🔴 ERROR - database-locked**

**Condition:** Database is locked

**Throws:** `Error with 'SQLITE_BUSY' code`

**Required Handling:**

Caller MUST handle database locked errors. Implement retry with exponential backoff.


📖 [Source](https://www.sqlite.org/lockingv3.html)

---

### `all()`

Executes query and returns all rows

**Import:**
```typescript
import { all } from 'sqlite3';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - syntax-error**

**Condition:** SQL syntax error

**Throws:** `Error with 'SQLITE_ERROR' or syntax message`

**Required Handling:**

Caller MUST validate SQL syntax. DO NOT retry - fix SQL syntax.


📖 [Source](https://github.com/TryGhost/node-sqlite3/wiki/API)

**🔴 ERROR - database-locked**

**Condition:** Database is locked

**Throws:** `Error with 'SQLITE_BUSY' code`

**Required Handling:**

Caller MUST handle database locked errors. Implement retry with exponential backoff.


📖 [Source](https://www.sqlite.org/lockingv3.html)

**🔴 ERROR - memory-error**

**Condition:** Out of memory for large result sets

**Throws:** `Error with 'SQLITE_NOMEM' code`

**Required Handling:**

Caller MUST handle out of memory errors. Use pagination for large result sets. Consider using each() iterator instead of all().


📖 [Source](https://www.sqlite.org/rescode.html)

---

### `exec()`

Executes one or more SQL statements (no parameters)

**Import:**
```typescript
import { exec } from 'sqlite3';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - syntax-error**

**Condition:** SQL syntax error in any statement

**Throws:** `Error with 'SQLITE_ERROR' or syntax message`

**Required Handling:**

Caller MUST validate SQL syntax. exec() does not support parameterized queries. NEVER use with user input - SQL injection risk.


📖 [Source](https://github.com/TryGhost/node-sqlite3/wiki/API)

**🔴 ERROR - constraint-violation**

**Condition:** Constraint violation in any statement

**Throws:** `Error with 'SQLITE_CONSTRAINT' code`

**Required Handling:**

Caller MUST handle constraint violations. DO NOT retry without fixing data.


📖 [Source](https://www.sqlite.org/rescode.html)

---

### `prepare()`

Prepares SQL statement for multiple executions

**Import:**
```typescript
import { prepare } from 'sqlite3';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - syntax-error**

**Condition:** SQL syntax error in statement

**Throws:** `Error with 'SQLITE_ERROR' or syntax message`

**Required Handling:**

Caller MUST validate SQL syntax. DO NOT retry - fix SQL syntax.


📖 [Source](https://github.com/TryGhost/node-sqlite3/wiki/API)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - callback-error-ignored**

MOST COMMON BUG (30-40% of codebases): Callback error parameter not checked. Results in silent failures, data corruption, and application crashes. WRONG: db.run(sql, (err) => { console.log('Done'); }); // Ignores err! CORRECT: db.run(sql, (err) => { if (err) throw err; console.log('Done'); }); This is the #1 cause of silent data corruption in SQLite apps.


📖 [Source](https://github.com/TryGhost/node-sqlite3/issues/796)

**⚠️ WARNING - sql-injection-string-concatenation**

CRITICAL SECURITY: Using string concatenation instead of prepared statements. WRONG: db.run(`INSERT INTO users VALUES ('${username}', '${password}')`); CORRECT: db.run('INSERT INTO users VALUES (?, ?)', [username, password]); NEVER use exec() with user input - it doesn't support parameters. This is the #1 security vulnerability in SQLite apps.


📖 [Source](https://www.sqlite.org/lang_expr.html#varparam)

**⚠️ WARNING - transaction-rollback-missing**

COMMON: BEGIN TRANSACTION without proper ROLLBACK on error. Results in partial writes and data corruption. ALWAYS wrap transactions: BEGIN -> operations -> COMMIT or ROLLBACK on error. Consider using serialize() to ensure order.


📖 [Source](https://www.sqlite.org/lang_transaction.html)

**ℹ️ INFO - foreign-keys-not-enabled**

COMMON: Foreign key constraints disabled by default in SQLite. Most developers don't know this - leads to data integrity violations. MUST run: PRAGMA foreign_keys = ON before any FK operations. Run this immediately after opening database.


📖 [Source](https://www.sqlite.org/foreignkeys.html)

**ℹ️ INFO - prepared-statements-not-finalized**

COMMON: Prepared statements not finalized after use. Results in resource leaks and SQLITE_MISUSE errors. ALWAYS call stmt.finalize() when done with prepared statement. Or use db.run/get/all which auto-finalize.


📖 [Source](https://github.com/TryGhost/node-sqlite3/wiki/API#statementfinalizecallback)

---

## Example: Proper Error Handling

```typescript
import sqlite3 from 'sqlite3';

async function example() {
  try {
    const result = await run(/* args */);
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
