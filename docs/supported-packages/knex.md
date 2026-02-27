---
title: "knex"
---

# knex

| Property | Value |
|----------|-------|
| **Package** | `knex` |
| **Versions Covered** | `>=3.0.0 <4.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install knex
```

## Covered Functions

This contract covers 3 function(s):

### `select()`

Executes SELECT query

**Import:**
```typescript
import { select } from 'knex';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - select-query-error**

**Condition:** query fails (syntax error, connection lost, timeout, invalid table/column)

**Throws:** Error with query details and database-specific error code

**Required Handling:**

Caller MUST wrap select() in try-catch to handle SQL errors, connection failures, and timeouts. Query errors crash application if unhandled.

📖 [Source](https://knexjs.org/guide/query-builder.html)

---

### `insert()`

Executes INSERT query

**Import:**
```typescript
import { insert } from 'knex';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - insert-constraint-violation**

**Condition:** insert violates constraint (unique, foreign key, not null, type mismatch)

**Throws:** Error with constraint violation details and database error code

**Required Handling:**

Caller MUST wrap insert() in try-catch to handle constraint violations. Unique violations, foreign key errors, and type mismatches crash application if unhandled.

📖 [Source](https://knexjs.org/guide/query-builder.html#insert)

---

### `transaction()`

Executes queries within a transaction

**Import:**
```typescript
import { transaction } from 'knex';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - transaction-error**

**Condition:** query within transaction fails (constraint violation, deadlock, connection lost)

**Throws:** Error causing automatic rollback if unhandled

**Required Handling:**

Caller MUST wrap transaction callback in try-catch to handle errors and ensure proper rollback. Unhandled errors may leave database in inconsistent state if transaction partially commits.

📖 [Source](https://knexjs.org/guide/transactions.html)

---

## Example: Proper Error Handling

```typescript
import knex from 'knex';

async function example() {
  try {
    const result = await select(/* args */);
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
