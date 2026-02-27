---
title: mongoose
---

# mongoose

| Property | Value |
|----------|-------|
| **Package** | `mongoose` |
| **Versions Covered** | `>=5.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-25 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install mongoose
```

## Covered Functions

This contract covers 16 function(s):

### `find()`

Queries the database and returns an array of documents matching the filter

**Import:**
```typescript
import { find } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connection-error-no-try-catch**

**Condition:** Database connection failed or was interrupted

**Throws:** `MongooseError or MongoError`

**Required Handling:**

Caller MUST wrap in try-catch or use .catch(). Handle connection errors separately from query results. Implement retry logic for transient connection issues.


📖 [Source](https://mongoosejs.com/docs/connections.html)

**🔴 ERROR - cast-error-no-try-catch**

**Condition:** Query parameter cannot be cast to expected type

**Throws:** `CastError`

**Required Handling:**

Caller MUST wrap in try-catch or use .catch(). Validate query parameters before passing to mongoose. Handle CastError separately from other errors.


📖 [Source](https://mongoosejs.com/docs/schematypes.html#what-is-a-schematype)

---

### `findOne()`

Queries the database and returns a single document matching the filter

**Import:**
```typescript
import { findOne } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connection-error-no-try-catch**

**Condition:** Database connection failed

**Throws:** `MongooseError or MongoError`

**Required Handling:**

Caller MUST wrap in try-catch or use .catch() to handle connection errors

📖 [Source](https://mongoosejs.com/docs/connections.html)

**🔴 ERROR - cast-error-no-try-catch**

**Condition:** Query parameter casting failed

**Throws:** `CastError`

**Required Handling:**

Caller MUST wrap in try-catch to handle type casting errors

📖 [Source](https://mongoosejs.com/docs/schematypes.html)

---

### `findById()`

Finds a single document by its _id field

**Import:**
```typescript
import { findById } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - cast-error-no-try-catch-invalid-id**

**Condition:** Provided ID is not a valid ObjectId format

**Throws:** `CastError with kind: 'ObjectId'`

**Required Handling:**

Caller MUST wrap in try-catch or use .catch(). Common when user input is passed directly as ID. Validate ID format before querying.


📖 [Source](https://mongoosejs.com/docs/api/model.html#model_Model-findById)

**🔴 ERROR - connection-error-no-try-catch**

**Condition:** Database connection failed

**Throws:** `MongooseError`

**Required Handling:**

Caller MUST handle connection errors

📖 [Source](https://mongoosejs.com/docs/connections.html)

---

### `create()`

Creates one or more documents in the database

**Import:**
```typescript
import { create } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - validation-error-no-try-catch**

**Condition:** Document validation failed (missing required fields, wrong types, custom validators)

**Throws:** `ValidationError with errors object containing field-specific ValidatorErrors`

**Required Handling:**

Caller MUST wrap in try-catch or use .catch(). Check error.name === 'ValidationError' and inspect error.errors object. Each field error is accessible via error.errors[fieldName].


📖 [Source](https://mongoosejs.com/docs/validation.html)

**🔴 ERROR - duplicate-key-error-no-try-catch**

**Condition:** Unique constraint violation (E11000 error)

**Throws:** `MongoError with code: 11000`

**Required Handling:**

Caller MUST wrap in try-catch and check error.code === 11000. This is NOT a ValidationError - it comes from MongoDB driver. Extract duplicate field from error message or error.keyPattern.


📖 [Source](https://mongoosejs.com/docs/validation.html#unique-indexes)

**🔴 ERROR - connection-error-no-try-catch**

**Condition:** Database connection failed

**Throws:** `MongooseError`

**Required Handling:**

Caller MUST handle connection errors with retry logic

📖 [Source](https://mongoosejs.com/docs/connections.html)

---

### `insertMany()`

Inserts multiple documents into the database in a single operation

**Import:**
```typescript
import { insertMany } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - validation-error-no-try-catch**

**Condition:** One or more documents fail validation

**Throws:** `ValidationError`

**Required Handling:**

Caller MUST wrap in try-catch. Default behavior stops on first error; use ordered:false to continue on errors.

📖 [Source](https://mongoosejs.com/docs/api/model.html#model_Model-insertMany)

**🔴 ERROR - duplicate-key-error-no-try-catch**

**Condition:** Duplicate key constraint violation

**Throws:** `MongoError with code: 11000`

**Required Handling:**

Caller MUST wrap in try-catch and handle duplicate key errors

📖 [Source](https://mongoosejs.com/docs/api/model.html#model_Model-insertMany)

---

### `updateOne()`

Updates a single document matching the filter

**Import:**
```typescript
import { updateOne } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - validation-error-no-try-catch**

**Condition:** Update violates validation rules

**Throws:** `ValidationError`

**Required Handling:**

Caller MUST wrap in try-catch to handle validation errors

📖 [Source](https://mongoosejs.com/docs/validation.html)

**🔴 ERROR - cast-error-no-try-catch**

**Condition:** Update value cannot be cast to schema type

**Throws:** `CastError`

**Required Handling:**

Caller MUST wrap in try-catch to handle type errors

📖 [Source](https://mongoosejs.com/docs/schematypes.html)

**🔴 ERROR - connection-error-no-try-catch**

**Condition:** Database connection failed

**Throws:** `MongooseError`

**Required Handling:**

Caller MUST handle connection errors

📖 [Source](https://mongoosejs.com/docs/connections.html)

---

### `findByIdAndUpdate()`

Finds a document by ID and updates it, returning the document

**Import:**
```typescript
import { findByIdAndUpdate } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - prototype-pollution-cve-2023-3696-no-try-catch**

**Condition:** Malicious update payload exploits prototype pollution vulnerability

**Throws:** `May not throw - vulnerability allows arbitrary code execution`

**Required Handling:**

Caller MUST wrap in try-catch. CRITICAL: Ensure mongoose version >= 5.13.20, 6.4.6, or 7.3.1 to patch CVE-2023-3696. Validate and sanitize all update payloads from user input.


📖 [Source](https://security.snyk.io/vuln/SNYK-JS-MONGOOSE-5777721)

**🔴 ERROR - validation-error-no-try-catch**

**Condition:** Update violates validation rules

**Throws:** `ValidationError`

**Required Handling:**

Caller MUST wrap in try-catch

📖 [Source](https://mongoosejs.com/docs/validation.html)

**🔴 ERROR - cast-error-no-try-catch**

**Condition:** Invalid ObjectId or type casting failure

**Throws:** `CastError`

**Required Handling:**

Caller MUST wrap in try-catch

📖 [Source](https://mongoosejs.com/docs/api/model.html#model_Model-findByIdAndUpdate)

---

### `findOneAndUpdate()`

Finds a document matching filter and updates it

**Import:**
```typescript
import { findOneAndUpdate } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - prototype-pollution-cve-2023-3696-no-try-catch**

**Condition:** Vulnerable to prototype pollution attacks

**Throws:** `May not throw - allows RCE`

**Required Handling:**

Caller MUST wrap in try-catch and validate input. Upgrade mongoose to patched version.

📖 [Source](https://security.snyk.io/vuln/SNYK-JS-MONGOOSE-5777721)

**🔴 ERROR - validation-error-no-try-catch**

**Condition:** Update violates validation

**Throws:** `ValidationError`

**Required Handling:**

Caller MUST wrap in try-catch

📖 [Source](https://mongoosejs.com/docs/validation.html)

---

### `deleteOne()`

Deletes a single document matching the filter

**Import:**
```typescript
import { deleteOne } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connection-error-no-try-catch**

**Condition:** Database connection failed

**Throws:** `MongooseError`

**Required Handling:**

Caller MUST wrap in try-catch

📖 [Source](https://mongoosejs.com/docs/connections.html)

---

### `findByIdAndDelete()`

Finds a document by ID and deletes it

**Import:**
```typescript
import { findByIdAndDelete } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - cast-error-no-try-catch**

**Condition:** Invalid ObjectId format

**Throws:** `CastError`

**Required Handling:**

Caller MUST wrap in try-catch

📖 [Source](https://mongoosejs.com/docs/api/model.html#model_Model-findByIdAndDelete)

**🔴 ERROR - connection-error-no-try-catch**

**Condition:** Database connection failed

**Throws:** `MongooseError`

**Required Handling:**

Caller MUST wrap in try-catch

📖 [Source](https://mongoosejs.com/docs/connections.html)

---

### `save()`

Saves document changes to the database

**Import:**
```typescript
import { save } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - validation-error-no-try-catch**

**Condition:** Document validation failed

**Throws:** `ValidationError with errors object`

**Required Handling:**

Caller MUST wrap in try-catch. Most common error when saving documents. Inspect error.errors for field-specific validation failures.


📖 [Source](https://mongoosejs.com/docs/api/document.html#document_Document-save)

**🔴 ERROR - duplicate-key-error-no-try-catch**

**Condition:** Unique constraint violation

**Throws:** `MongoError with code: 11000`

**Required Handling:**

Caller MUST wrap in try-catch and check error.code === 11000. Common when saving new documents with existing unique field values.


📖 [Source](https://mongoosejs.com/docs/validation.html#unique-indexes)

**🔴 ERROR - connection-error-no-try-catch**

**Condition:** Database connection failed

**Throws:** `MongooseError`

**Required Handling:**

Caller MUST wrap in try-catch

📖 [Source](https://mongoosejs.com/docs/connections.html)

---

### `exec()`

Executes the query and returns a promise

**Import:**
```typescript
import { exec } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - query-error-no-try-catch**

**Condition:** Query execution failed

**Throws:** `MongooseError, CastError, or ValidationError depending on failure type`

**Required Handling:**

Caller MUST wrap in try-catch or use .catch(). .exec() is the terminal operation for query chains. All query errors surface here.


📖 [Source](https://mongoosejs.com/docs/api/query.html#query_Query-exec)

---

### `orFail()`

Executes query and throws DocumentNotFoundError if no results

**Import:**
```typescript
import { orFail } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - document-not-found-no-try-catch**

**Condition:** No documents match the query

**Throws:** `DocumentNotFoundError`

**Required Handling:**

Caller MUST wrap in try-catch. .orFail() is explicitly designed to throw when no results found. Use this when document existence is mandatory.


📖 [Source](https://mongoosejs.com/docs/api/query.html#query_Query-orFail)

---

### `connect()`

Establishes connection to MongoDB database

**Import:**
```typescript
import { connect } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connection-failed-no-try-catch**

**Condition:** Cannot connect to MongoDB (network, auth, or invalid connection string)

**Throws:** `MongooseError or MongoError`

**Required Handling:**

Caller MUST wrap in try-catch. Connection failures should stop application startup. Log error details and exit gracefully.


📖 [Source](https://mongoosejs.com/docs/connections.html)

---

### `aggregate()`

Executes an aggregation pipeline on the collection

**Import:**
```typescript
import { aggregate } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - aggregation-error-no-try-catch**

**Condition:** Invalid pipeline stage or aggregation failure

**Throws:** `MongooseError or MongoError`

**Required Handling:**

Caller MUST wrap in try-catch. Aggregation pipelines can fail with complex stage errors.

📖 [Source](https://mongoosejs.com/docs/api/model.html#model_Model-aggregate)

---

### `countDocuments()`

Counts documents matching the filter

**Import:**
```typescript
import { countDocuments } from 'mongoose';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connection-error-no-try-catch**

**Condition:** Database connection failed

**Throws:** `MongooseError`

**Required Handling:**

Caller MUST wrap in try-catch

📖 [Source](https://mongoosejs.com/docs/api/model.html#model_Model-countDocuments)

---

## Example: Proper Error Handling

```typescript
import mongoose from 'mongoose';

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
