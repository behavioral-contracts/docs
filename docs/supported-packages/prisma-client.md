---
title: "@prisma/client"
---

# @prisma/client

| Property | Value |
|----------|-------|
| **Package** | `@prisma/client` |
| **Versions Covered** | `>=4.0.0 <8.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-24 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install @prisma/client
```

## Covered Functions

This contract covers 8 function(s):

### `create()`

Creates a new database record

**Import:**
```typescript
import { create } from '@prisma/client';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - unique-constraint-violation**

**Condition:** Unique constraint violation (duplicate key)

**Throws:** PrismaClientKnownRequestError with code 'P2002'

**Required Handling:**

Caller MUST catch P2002 errors and handle duplicate key violations gracefully. Extract conflicting field from error.meta.target. DO NOT retry without changing the unique field value.


📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference#p2002)

**🔴 ERROR - foreign-key-constraint**

**Condition:** Foreign key constraint violation

**Throws:** PrismaClientKnownRequestError with code 'P2003'

**Required Handling:**

Caller MUST verify referenced record exists before creating. This indicates data integrity issue - DO NOT retry.


📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference#p2003)

**🔴 ERROR - required-field-missing**

**Condition:** Required field is missing from data

**Throws:** PrismaClientValidationError

**Required Handling:**

Validate data completeness before calling Prisma. This is a client-side error.

📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientvalidationerror)

**🔴 ERROR - connection-error**

**Condition:** Database connection failed

**Throws:** PrismaClientInitializationError or PrismaClientRustPanicError

**Required Handling:**

Caller MUST handle connection errors separately from business logic errors. Implement exponential backoff retry for transient connection issues. Alert operations if connection errors persist.


📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientinitializationerror)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - auto-generated-ids**

If id field is auto-generated, do not pass it in create data

📖 [Source](https://www.prisma.io/docs/concepts/components/prisma-client/crud#create)

---

### `update()`

Updates an existing database record

**Import:**
```typescript
import { update } from '@prisma/client';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - record-not-found**

**Condition:** Record to update does not exist

**Throws:** PrismaClientKnownRequestError with code 'P2025'

**Required Handling:**

Caller MUST handle P2025 (record not found) errors. Decide whether to: 1. Create the record, 2. Return error to user, or 3. Silently ignore. DO NOT retry update on non-existent record.


📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference#p2025)

**🔴 ERROR - unique-constraint-violation**

**Condition:** Update would violate unique constraint

**Throws:** PrismaClientKnownRequestError with code 'P2002'

**Required Handling:**

Check if new value conflicts with existing record. DO NOT retry.

📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference#p2002)

**🔴 ERROR - foreign-key-constraint**

**Condition:** Update would violate foreign key constraint

**Throws:** PrismaClientKnownRequestError with code 'P2003'

**Required Handling:**

Verify referenced record exists. This indicates data integrity issue.

📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference#p2003)

**🔴 ERROR - connection-error**

**Condition:** Database connection failed

**Throws:** PrismaClientInitializationError

**Required Handling:**

Implement retry with exponential backoff

📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - partial-updates**

Only fields specified in 'data' are updated. Missing fields are not set to null.

📖 [Source](https://www.prisma.io/docs/concepts/components/prisma-client/crud#update)

---

### `delete()`

Deletes a database record

**Import:**
```typescript
import { delete } from '@prisma/client';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - record-not-found**

**Condition:** Record to delete does not exist

**Throws:** PrismaClientKnownRequestError with code 'P2025'

**Required Handling:**

Caller MUST handle P2025 errors. Decide if missing record is acceptable (idempotent delete). DO NOT retry delete on non-existent record.


📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference#p2025)

**🔴 ERROR - foreign-key-constraint**

**Condition:** Cannot delete because of foreign key constraint (dependent records exist)

**Throws:** PrismaClientKnownRequestError with code 'P2003' or 'P2014'

**Required Handling:**

Caller MUST either: 1. Delete dependent records first (cascade delete), or 2. Return error to user. Check referencing tables before attempting delete.


📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference#p2014)

**🔴 ERROR - connection-error**

**Condition:** Database connection failed

**Throws:** PrismaClientInitializationError

**Required Handling:**

Implement retry with exponential backoff

📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - cascade-deletes**

If onDelete: Cascade is set in schema, dependent records are automatically deleted

📖 [Source](https://www.prisma.io/docs/concepts/components/prisma-schema/relations#referential-actions)

---

### `findUnique()`

Finds a single record by unique identifier

**Import:**
```typescript
import { findUnique } from '@prisma/client';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - record-not-found**

**Condition:** Record with specified ID does not exist

**Returns:**

null

**Required Handling:**

Caller MUST check if result is null before accessing properties. Code that assumes findUnique always returns a record will crash.


📖 [Source](https://www.prisma.io/docs/concepts/components/prisma-client/crud#findunique)

**🔴 ERROR - connection-error**

**Condition:** Database connection failed

**Throws:** PrismaClientInitializationError

**Required Handling:**

Implement retry with exponential backoff

📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - findunique-vs-findfirst**

findUnique requires unique field. For non-unique queries, use findFirst or findMany.

📖 [Source](https://www.prisma.io/docs/concepts/components/prisma-client/crud#findunique)

---

### `findUniqueOrThrow()`

Finds a single record by unique identifier, throws if not found

**Import:**
```typescript
import { findUniqueOrThrow } from '@prisma/client';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - record-not-found**

**Condition:** Record with specified ID does not exist

**Throws:** PrismaClientKnownRequestError with code 'P2025'

**Required Handling:**

Caller MUST catch P2025 errors when using findUniqueOrThrow. This method throws instead of returning null, requiring explicit error handling.


📖 [Source](https://www.prisma.io/docs/concepts/components/prisma-client/crud#finduniqueorthrow)

**🔴 ERROR - connection-error**

**Condition:** Database connection failed

**Throws:** PrismaClientInitializationError

**Required Handling:**

Implement retry with exponential backoff

📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference)

---

### `$transaction()`

Executes multiple operations in a database transaction

**Import:**
```typescript
import { $transaction } from '@prisma/client';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - transaction-failed**

**Condition:** Any operation in transaction fails

**Throws:** PrismaClientKnownRequestError (various codes) or PrismaClientUnknownRequestError

**Required Handling:**

Caller MUST handle transaction failures. All operations are rolled back. Identify which operation failed using error.code and error.meta. Consider retry strategy for transient errors (connection issues).


📖 [Source](https://www.prisma.io/docs/concepts/components/prisma-client/transactions)

**🔴 ERROR - deadlock-error**

**Condition:** Transaction deadlock detected by database

**Throws:** PrismaClientKnownRequestError with code 'P2034'

**Required Handling:**

Caller SHOULD implement retry logic for deadlock errors. Use exponential backoff with jitter to reduce contention. Consider redesigning transaction to reduce lock duration.


📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference#p2034)

**🔴 ERROR - connection-error-in-transaction**

**Condition:** Connection lost during transaction

**Throws:** PrismaClientInitializationError

**Required Handling:**

Transaction is automatically rolled back. Retry entire transaction. Implement idempotency if retrying critical transactions (payments, etc).


📖 [Source](https://www.prisma.io/docs/concepts/components/prisma-client/transactions#transaction-timeouts)

**⚠️ WARNING - transaction-timeout**

**Condition:** Transaction exceeded max duration

**Throws:** PrismaClientKnownRequestError with code 'P2024'

**Required Handling:**

Break transaction into smaller units or increase timeout. Long transactions hold locks and can cause performance issues.


📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference#p2024)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - nested-transactions**

Prisma does not support nested transactions. Use a single top-level transaction.

📖 [Source](https://www.prisma.io/docs/concepts/components/prisma-client/transactions#nested-transactions)

---

### `$connect()`

Explicitly connects to the database

**Import:**
```typescript
import { $connect } from '@prisma/client';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connection-failed**

**Condition:** Unable to establish database connection

**Throws:** PrismaClientInitializationError

**Required Handling:**

Caller MUST handle connection failures. Common causes: 1. Database server is down 2. Invalid connection string 3. Network issues 4. Database authentication failure Implement retry with exponential backoff for transient errors.


📖 [Source](https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientinitializationerror)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - auto-connect**

Prisma Client connects automatically on first query. Explicit $connect is optional.

📖 [Source](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management#connect)

---

### `$disconnect()`

Closes all database connections

**Import:**
```typescript
import { $disconnect } from '@prisma/client';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - disconnect-with-pending-queries**

**Condition:** Disconnecting while queries are pending

**Throws:** May throw errors for pending queries

**Required Handling:**

Caller SHOULD await all pending queries before calling $disconnect. Use in graceful shutdown handlers (SIGTERM, SIGINT).


📖 [Source](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management#disconnect)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - disconnect-in-serverless**

In serverless environments, do NOT call $disconnect in every function invocation

📖 [Source](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#serverless-environments-faas)

---

## Example: Proper Error Handling

```typescript
import client from '@prisma/client';

async function example() {
  try {
    const result = await create(/* args */);
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
