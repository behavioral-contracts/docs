---
title: "joi"
---

# joi

| Property | Value |
|----------|-------|
| **Package** | `joi` |
| **Versions Covered** | `>=17.0.0 <19.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install joi
```

## Covered Functions

This contract covers 4 function(s):

### `validate()`

Validates data against a Joi schema synchronously

**Import:**
```typescript
import { validate } from 'joi';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - validate-returns-error**

**Condition:** data fails validation against the schema

**Returns:**

error: ValidationError, value: any where error contains validation failure details

**Required Handling:**

Caller MUST check result.error property before using result.value. Without checking error, invalid data will pass through silently, leading to data corruption, business logic errors, or security vulnerabilities. Use pattern: const  error, value  = schema.validate(data); if (error)  /* handle */ 


📖 [Source](https://joi.dev/api/#anyvalidatevalue-options)

---

### `validateAsync()`

Validates data against a Joi schema asynchronously

**Import:**
```typescript
import { validateAsync } from 'joi';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - validateasync-rejects**

**Condition:** data fails validation against the schema

**Throws:** Promise rejection with ValidationError

**Required Handling:**

Caller MUST wrap validateAsync() in try-catch or use .catch() handler. Without error handling, validation failures cause unhandled promise rejections that crash the application. Use pattern: try  const value = await schema.validateAsync(data);  catch (error)  /* handle */ 


📖 [Source](https://joi.dev/api/#anyvalidateasyncvalue-options)

---

### `assert()`

Asserts that a value matches a schema, throwing on failure

**Import:**
```typescript
import { assert } from 'joi';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - assert-throws**

**Condition:** data fails validation against the schema

**Throws:** ValidationError

**Required Handling:**

Caller MUST wrap Joi.assert() in try-catch block. Without error handling, validation failures throw uncaught exceptions that crash the application. Use pattern: try  Joi.assert(value, schema);  catch (error)  /* handle */ 


📖 [Source](https://joi.dev/api/#assertvalue-schema-message-options)

---

### `attempt()`

Validates data and returns the validated value or throws

**Import:**
```typescript
import { attempt } from 'joi';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - attempt-throws**

**Condition:** data fails validation against the schema

**Throws:** ValidationError

**Required Handling:**

Caller MUST wrap Joi.attempt() in try-catch block. Without error handling, validation failures throw uncaught exceptions that crash the application. Use pattern: try  const validated = Joi.attempt(value, schema);  catch (error)  /* handle */ 


📖 [Source](https://joi.dev/api/#attemptvalue-schema-message-options)

---

## Example: Proper Error Handling

```typescript
import joi from 'joi';

async function example() {
  try {
    const result = await validate(/* args */);
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
