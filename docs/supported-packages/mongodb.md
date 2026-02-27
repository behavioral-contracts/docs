---
title: mongodb
---

# mongodb

| Property | Value |
|----------|-------|
| **Package** | `mongodb` |
| **Versions Covered** | `>=5.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install mongodb
```

## Covered Functions

This contract covers 15 function(s):

### `connect()`

Establishes connection to MongoDB server or cluster

**Import:**
```typescript
import { connect } from 'mongodb';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connection-failure**

**Condition:** Network error, authentication failure, or server selection timeout

**Throws:** `MongoNetworkError, MongoServerSelectionError, MongoNetworkTimeoutError, or MongoError`

**Required Handling:**

Caller MUST catch connection errors and handle them separately from query errors. Implement retry logic with exponential backoff for transient connection issues. Log connection errors for operations monitoring.


📖 [Source](https://www.mongodb.com/docs/drivers/node/current/connection-troubleshooting/)

---

### `find()`

Queries collection for documents matching filter criteria

**Import:**
```typescript
import { find } from 'mongodb';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - query-failure**

**Condition:** Network error, timeout, or invalid query syntax

**Throws:** `MongoServerError, MongoNetworkError, or MongoError`

**Required Handling:**

Caller MUST catch query errors. Network errors (MongoNetworkError) may be transient and can be retried. Invalid query errors (MongoServerError) should not be retried.


📖 [Source](https://www.mongodb.com/docs/drivers/node/current/)

---

### `findOne()`

Queries collection for a single document matching filter criteria

**Import:**
```typescript
import { findOne } from 'mongodb';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - query-failure**

**Condition:** Network error, timeout, or invalid query

**Throws:** `MongoServerError, MongoNetworkError, or MongoError`

**Required Handling:**

Caller MUST catch query errors. Returns null if no document matches (not an error). Network errors may be transient and retriable.


📖 [Source](https://www.mongodb.com/docs/drivers/node/current/)

---

### `insertOne()`

Inserts a single document into collection

**Import:**
```typescript
import { insertOne } from 'mongodb';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - duplicate-key**

**Condition:** Document violates unique index constraint

**Throws:** `MongoServerError with error.code === 11000`

**Required Handling:**

Caller MUST catch duplicate key errors (code 11000) and handle gracefully. Extract conflicting field from error message. DO NOT retry without changing the unique field value.


📖 [Source](https://www.mongodb.com/docs/drivers/node/current/)

---

### `insertMany()`

Inserts multiple documents into collection in bulk

**Import:**
```typescript
import { insertMany } from 'mongodb';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - bulk-write-failure**

**Condition:** One or more documents failed to insert

**Throws:** `MongoBulkWriteError with details of failed operations`

**Required Handling:**

Caller MUST catch bulk write errors. Check error.result to see which documents succeeded and which failed. Handle partial success scenarios appropriately.


📖 [Source](https://www.mongodb.com/docs/drivers/node/current/)

---

### `updateOne()`

Updates a single document matching filter

**Import:**
```typescript
import { updateOne } from 'mongodb';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - update-failure**

**Condition:** Network error, invalid update operation, or write concern failure

**Throws:** `MongoServerError, MongoWriteConcernError, or MongoError`

**Required Handling:**

Caller MUST catch update errors. Network errors may be transient. Invalid update operators (MongoServerError) should not be retried.


📖 [Source](https://www.mongodb.com/docs/drivers/node/current/)

---

### `updateMany()`

Updates multiple documents matching filter

**Import:**
```typescript
import { updateMany } from 'mongodb';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - bulk-update-failure**

**Condition:** Update operation failed or write concern not satisfied

**Throws:** `MongoServerError, MongoWriteConcernError, or MongoError`

**Required Handling:**

Caller MUST catch bulk update errors. Check result.modifiedCount to verify how many documents were updated. Implement retry logic for transient failures.


📖 [Source](https://www.mongodb.com/docs/drivers/node/current/)

---

### `deleteOne()`

Deletes a single document matching filter

**Import:**
```typescript
import { deleteOne } from 'mongodb';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - delete-failure**

**Condition:** Network error or write concern failure

**Throws:** `MongoServerError, MongoWriteConcernError, or MongoError`

**Required Handling:**

Caller MUST catch delete errors. Deleting non-existent document is NOT an error (deletedCount = 0). Network errors may be transient and retriable.


📖 [Source](https://www.mongodb.com/docs/drivers/node/current/)

---

### `deleteMany()`

Deletes multiple documents matching filter

**Import:**
```typescript
import { deleteMany } from 'mongodb';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - bulk-delete-failure**

**Condition:** Delete operation failed or write concern not satisfied

**Throws:** `MongoServerError, MongoWriteConcernError, or MongoError`

**Required Handling:**

Caller MUST catch bulk delete errors. Check result.deletedCount to verify how many documents were deleted. Implement retry logic for transient failures.


📖 [Source](https://www.mongodb.com/docs/drivers/node/current/)

---

### `aggregate()`

Executes aggregation pipeline on collection

**Import:**
```typescript
import { aggregate } from 'mongodb';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - aggregation-failure**

**Condition:** Invalid pipeline stage, network error, or timeout

**Throws:** `MongoServerError, MongoNetworkError, or MongoError`

**Required Handling:**

Caller MUST catch aggregation errors. Pipeline syntax errors (MongoServerError) should not be retried. Network errors may be transient and retriable.


📖 [Source](https://www.mongodb.com/docs/drivers/node/current/)

---

### `countDocuments()`

Counts documents in collection matching filter

**Import:**
```typescript
import { countDocuments } from 'mongodb';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - count-failure**

**Condition:** Network error, timeout, or invalid filter

**Throws:** `MongoServerError, MongoNetworkError, or MongoError`

**Required Handling:**

Caller MUST catch count errors. Network errors may be transient. Invalid filters should not be retried.


📖 [Source](https://www.mongodb.com/docs/drivers/node/current/)

---

### `createIndex()`

Creates index on collection

**Import:**
```typescript
import { createIndex } from 'mongodb';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - index-creation-failure**

**Condition:** Invalid index options, duplicate index name, or insufficient permissions

**Throws:** `MongoServerError or MongoError`

**Required Handling:**

Caller MUST catch index creation errors. Index with same name but different options will fail. Check if index already exists before creating.


📖 [Source](https://www.mongodb.com/docs/drivers/node/current/)

---

### `drop()`

Drops collection from database

**Import:**
```typescript
import { drop } from 'mongodb';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - drop-failure**

**Condition:** Collection does not exist, insufficient permissions, or network error

**Throws:** `MongoServerError or MongoError`

**Required Handling:**

Caller MUST catch drop errors. Dropping non-existent collection throws error. Use dropCollection with ifExists option to avoid errors.


📖 [Source](https://www.mongodb.com/docs/drivers/node/current/)

---

### `collection()`

Returns reference to collection in database

**Import:**
```typescript
import { collection } from 'mongodb';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - collection-access-failure**

**Condition:** Invalid collection name or database not connected

**Throws:** `MongoError`

**Required Handling:**

Caller MUST catch collection access errors. Ensure database connection is established before accessing collections. Validate collection names before use.


📖 [Source](https://www.mongodb.com/docs/drivers/node/current/)

---

### `bulkWrite()`

Executes multiple write operations in bulk

**Import:**
```typescript
import { bulkWrite } from 'mongodb';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - bulk-write-failure**

**Condition:** One or more operations failed

**Throws:** `MongoBulkWriteError with details of failed operations`

**Required Handling:**

Caller MUST catch bulk write errors. Check error.result for success/failure details of each operation. Handle partial success appropriately.


📖 [Source](https://www.mongodb.com/docs/drivers/node/current/)

---

## Example: Proper Error Handling

```typescript
import mongodb from 'mongodb';

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
