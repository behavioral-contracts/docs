---
title: "drizzle-orm"
---

# drizzle-orm

| Property | Value |
|----------|-------|
| **Package** | `drizzle-orm` |
| **Versions Covered** | `>=0.45.0 <1.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-25 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install drizzle-orm
```

## Covered Functions

This contract covers 4 function(s):

### `select()`

Executes a SELECT query

**Import:**
```typescript
import { select } from 'drizzle-orm';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - select-query-error**

**Condition:** query fails (connection lost, timeout, invalid column, SQL syntax error)

**Throws:** Error with database-specific error details

**Required Handling:**

Caller MUST wrap select queries in try-catch to handle database errors. Connection failures and SQL errors crash application if unhandled.

📖 [Source](https://orm.drizzle.team/docs/select)

---

### `insert()`

Executes an INSERT query

**Import:**
```typescript
import { insert } from 'drizzle-orm';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - insert-constraint-violation**

**Condition:** insert violates constraint (unique, foreign key, not null, check constraint)

**Throws:** Error with constraint violation details and database error code

**Required Handling:**

Caller MUST wrap insert operations in try-catch to handle constraint violations. Unique violations, foreign key errors, and validation failures crash application if unhandled.

📖 [Source](https://orm.drizzle.team/docs/insert)

---

### `update()`

Executes an UPDATE query

**Import:**
```typescript
import { update } from 'drizzle-orm';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - update-constraint-violation**

**Condition:** update violates constraint or fails (unique, foreign key, connection lost)

**Throws:** Error with constraint violation or connection error details

**Required Handling:**

Caller MUST wrap update operations in try-catch to handle constraint violations and connection errors. Database errors crash application if unhandled.

📖 [Source](https://orm.drizzle.team/docs/update)

---

### `delete()`

Executes a DELETE query

**Import:**
```typescript
import { delete } from 'drizzle-orm';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - delete-constraint-violation**

**Condition:** delete violates foreign key constraint (referenced by other tables)

**Throws:** Error with foreign key constraint violation details

**Required Handling:**

Caller MUST wrap delete operations in try-catch to handle foreign key constraint violations. Cascade deletes and constraint errors crash application if unhandled.

📖 [Source](https://orm.drizzle.team/docs/delete)

---

## Example: Proper Error Handling

```typescript
import drizzle-orm from 'drizzle-orm';

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

- [Contract Schema Reference](../contract-schema/schema-reference.md)
- [All Supported Packages](./overview.md)
- [How to Use verify-cli](../cli-reference/overview.md)
