---
title: "typeorm"
---

# typeorm

| Property | Value |
|----------|-------|
| **Package** | `typeorm` |
| **Versions Covered** | `>=0.3.0 <1.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install typeorm
```

## Covered Functions

This contract covers 3 function(s):

### `find()`

Finds entities matching criteria

**Import:**
```typescript
import { find } from 'typeorm';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - find-query-error**

**Condition:** query fails (connection lost, invalid relation, timeout, syntax error)

**Throws:** QueryFailedError or connection error

**Required Handling:**

Caller MUST wrap repository.find() in try-catch to handle database errors. Connection failures and invalid queries crash application if unhandled.

📖 [Source](https://typeorm.io/find-options)

---

### `save()`

Saves entity to database

**Import:**
```typescript
import { save } from 'typeorm';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - save-constraint-violation**

**Condition:** save violates constraint (unique, foreign key, validation, type mismatch)

**Throws:** QueryFailedError with constraint violation details

**Required Handling:**

Caller MUST wrap save() in try-catch to handle constraint violations and validation errors. Unique violations, foreign key errors, and validation failures crash application if unhandled.

📖 [Source](https://typeorm.io/repository-api)

---

### `transaction()`

Executes operations within a transaction

**Import:**
```typescript
import { transaction } from 'typeorm';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - transaction-error**

**Condition:** operation within transaction fails (constraint violation, deadlock, connection lost)

**Throws:** Error causing automatic rollback

**Required Handling:**

Caller MUST wrap transaction operations in try-catch to handle errors and ensure rollback. Unhandled errors leave database in inconsistent state if transaction partially commits.

📖 [Source](https://typeorm.io/transactions)

---

## Example: Proper Error Handling

```typescript
import typeorm from 'typeorm';

async function example() {
  try {
    const result = await find(/* args */);
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
