---
title: sequelize
---

# sequelize

| Property | Value |
|----------|-------|
| **Package** | `sequelize` |
| **Versions Covered** | `>=6.28.1` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install sequelize
```

## Covered Functions

This contract covers 11 function(s):

### `authenticate()`

Tests database connection

**Import:**
```typescript
import { authenticate } from 'sequelize';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connection-failure**

**Condition:** Cannot connect to database (wrong credentials, host unreachable, etc.)

**Throws:** `ConnectionError, ConnectionRefusedError, HostNotFoundError`

**Required Handling:**

Caller MUST catch connection errors. Common causes: wrong credentials, database down, network issues. Implement retry with exponential backoff for transient issues.


📖 [Source](https://sequelize.org/docs/v6/core-concepts/getting-started/)

---

### `query()`

Executes raw SQL query

**Import:**
```typescript
import { query } from 'sequelize';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - syntax-error**

**Condition:** SQL syntax error

**Throws:** `DatabaseError with original SQL error from underlying driver`

**Required Handling:**

Caller MUST validate SQL syntax before execution. DO NOT retry - indicates SQL syntax error. Check error.original for underlying driver error.


📖 [Source](https://sequelize.org/docs/v6/core-concepts/raw-queries/)

**🔴 ERROR - constraint-violation**

**Condition:** Unique constraint, foreign key, or NOT NULL violation

**Throws:** `UniqueConstraintError, ForeignKeyConstraintError, ValidationError`

**Required Handling:**

Caller MUST handle constraint violations gracefully. UniqueConstraintError: extract fields from error.fields. ForeignKeyConstraintError: check error.index. DO NOT retry without fixing data.


📖 [Source](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/)

**🔴 ERROR - connection-error**

**Condition:** Connection lost during query execution

**Throws:** `ConnectionError, TimeoutError`

**Required Handling:**

Caller MUST handle connection errors separately from query errors. Implement retry with exponential backoff for transient connection issues.


📖 [Source](https://sequelize.org/docs/v6/)

---

### `findAll()`

Finds all records matching criteria

**Import:**
```typescript
import { findAll } from 'sequelize';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - query-failure**

**Condition:** Network error, timeout, or invalid query

**Throws:** `DatabaseError, ConnectionError, TimeoutError`

**Required Handling:**

Caller MUST catch query errors. Network errors may be transient and retriable. Invalid query errors should not be retried.


📖 [Source](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)

---

### `findOne()`

Finds single record matching criteria

**Import:**
```typescript
import { findOne } from 'sequelize';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - query-failure**

**Condition:** Network error, timeout, or invalid query

**Throws:** `DatabaseError, ConnectionError, TimeoutError`

**Required Handling:**

Caller MUST catch query errors. Returns null if no record matches (not an error). Network errors may be transient and retriable.


📖 [Source](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)

---

### `findByPk()`

Finds record by primary key

**Import:**
```typescript
import { findByPk } from 'sequelize';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - query-failure**

**Condition:** Network error or timeout

**Throws:** `DatabaseError, ConnectionError, TimeoutError`

**Required Handling:**

Caller MUST catch query errors. Returns null if record not found (not an error).


📖 [Source](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/)

---

### `create()`

Inserts new record into database

**Import:**
```typescript
import { create } from 'sequelize';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - unique-constraint**

**Condition:** Unique constraint violation

**Throws:** `UniqueConstraintError with fields and error.errors array`

**Required Handling:**

Caller MUST catch unique constraint errors. Extract conflicting fields from error.fields. DO NOT retry without changing unique field values.


📖 [Source](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/)

**🔴 ERROR - validation-error**

**Condition:** Model validation fails (NOT NULL, data type, etc.)

**Throws:** `ValidationError with error.errors array`

**Required Handling:**

Caller MUST validate data before insert. Check error.errors for list of validation failures. DO NOT retry without fixing validation issues.


📖 [Source](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/)

**🔴 ERROR - foreign-key-constraint**

**Condition:** Foreign key constraint violation

**Throws:** `ForeignKeyConstraintError`

**Required Handling:**

Caller MUST verify referenced record exists before insertion. DO NOT retry - indicates data integrity issue.


📖 [Source](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - unique-constraint-not-handled**

MOST COMMON PRODUCTION BUG: Not handling UniqueConstraintError specifically. Results in generic 500 errors for duplicate entries (like email registration). ALWAYS check error.name === 'SequelizeUniqueConstraintError' and return 400. Alternative: Use Model.findOrCreate() to avoid the error entirely.


📖 [Source](https://github.com/sequelize/sequelize/issues/6762)

**⚠️ WARNING - validation-errors-array-not-checked**

VERY COMMON: Not iterating error.errors array for ValidationError. Each item in error.errors contains: message, type, path, value, validatorKey. Checking only error.message loses all validation details.


📖 [Source](https://github.com/sequelize/sequelize/issues/9249)

---

### `update()`

Updates existing records

**Import:**
```typescript
import { update } from 'sequelize';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - update-failure**

**Condition:** Network error, validation error, or constraint violation

**Throws:** `DatabaseError, ValidationError, UniqueConstraintError`

**Required Handling:**

Caller MUST catch update errors. Validation errors: check error.errors array. Constraint violations: DO NOT retry without fixing data.


📖 [Source](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)

---

### `destroy()`

Deletes records from database

**Import:**
```typescript
import { destroy } from 'sequelize';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - delete-failure**

**Condition:** Network error or foreign key constraint

**Throws:** `DatabaseError, ForeignKeyConstraintError`

**Required Handling:**

Caller MUST catch delete errors. Foreign key errors: child records may still reference this record. Deleting non-existent record is NOT an error (returns 0).


📖 [Source](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)

---

### `transaction()`

Executes operations within transaction

**Import:**
```typescript
import { transaction } from 'sequelize';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - transaction-failure**

**Condition:** Deadlock, timeout, or constraint violation during transaction

**Throws:** `DatabaseError, TimeoutError, UniqueConstraintError, etc.`

**Required Handling:**

Caller MUST catch transaction errors and handle rollback. Sequelize auto-rollbacks on error in managed transactions. For unmanaged transactions, caller must explicitly rollback. Deadlocks may be transient and retriable.


📖 [Source](https://sequelize.org/docs/v6/other-topics/transactions/)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - missing-transaction-rollback**

CRITICAL: Forgetting to rollback unmanaged transactions on error causes connection pool exhaustion. ALWAYS use try-catch-finally pattern: const t = await sequelize.transaction(); try { await operations(t); await t.commit(); } catch (e) { await t.rollback(); throw e; } RECOMMENDED: Use managed transactions (auto-rollback on error).


📖 [Source](https://github.com/sequelize/sequelize/issues/3355)

**ℹ️ INFO - deadlock-retry-missing**

Database deadlocks are transient errors that should be retried. Check if error.original?.code === 'ER_LOCK_DEADLOCK' (MySQL) or error.original?.code === '40P01' (Postgres) and retry the transaction with exponential backoff.


📖 [Source](https://dev.to/anonyma/how-to-retry-transactions-in-sequelize-5h5c)

---

### `sync()`

Synchronizes model definitions with database

**Import:**
```typescript
import { sync } from 'sequelize';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - sync-failure**

**Condition:** Schema mismatch, permission denied, or connection error

**Throws:** `DatabaseError, ConnectionError`

**Required Handling:**

Caller MUST catch sync errors. NEVER use sync() in production - use migrations instead. sync() can drop and recreate tables - data loss risk.


📖 [Source](https://sequelize.org/docs/v6/core-concepts/model-basics/)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - sync-production-danger**

CATASTROPHIC: NEVER use sync() in production, especially sync({ force: true }). It drops and recreates tables, causing permanent data loss. Use migrations instead (Sequelize CLI: sequelize-cli). This is the #1 disaster scenario.


📖 [Source](https://github.com/sequelize/sequelize/issues/2670)

---

### `count()`

Counts records matching criteria

**Import:**
```typescript
import { count } from 'sequelize';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - count-failure**

**Condition:** Network error, timeout, or invalid query

**Throws:** `DatabaseError, ConnectionError, TimeoutError`

**Required Handling:**

Caller MUST catch count errors. Network errors may be transient and retriable.


📖 [Source](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)

---

## Example: Proper Error Handling

```typescript
import sequelize from 'sequelize';

async function example() {
  try {
    const result = await authenticate(/* args */);
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
