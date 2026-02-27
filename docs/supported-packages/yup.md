---
title: "yup"
---

# yup

| Property | Value |
|----------|-------|
| **Package** | `yup` |
| **Versions Covered** | `>=0.32.0 <2.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `in-development` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install yup
```

## Covered Functions

This contract covers 4 function(s):

### `validate()`

Validates data against a Yup schema asynchronously

**Import:**
```typescript
import { validate } from 'yup';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - validate-rejects**

**Condition:** data fails validation against the schema

**Throws:** Promise rejection with ValidationError

**Required Handling:**

Caller MUST wrap validate() in try-catch or use .catch() handler. Without error handling, validation failures cause unhandled promise rejections that crash the application or lead to silent failures. Use pattern: try  const value = await schema.validate(data);  catch (error)  /* handle */ 


📖 [Source](https://github.com/jquense/yup#schemavalidatevalue-options-promise)

---

### `validateSync()`

Validates data against a Yup schema synchronously

**Import:**
```typescript
import { validateSync } from 'yup';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - validatesync-throws**

**Condition:** data fails validation against the schema

**Throws:** ValidationError

**Required Handling:**

Caller MUST wrap validateSync() in try-catch block. Without error handling, validation failures throw uncaught exceptions that crash the application. Invalid data will not be caught, leading to data corruption or security vulnerabilities. Use pattern: try  const value = schema.validateSync(data);  catch (error)  /* handle */ 


📖 [Source](https://github.com/jquense/yup#schemavalidatesyncvalue-options-any)

---

### `validateAt()`

Validates a specific path in the data against the schema asynchronously

**Import:**
```typescript
import { validateAt } from 'yup';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - validateat-rejects**

**Condition:** data at the specified path fails validation

**Throws:** Promise rejection with ValidationError

**Required Handling:**

Caller MUST wrap validateAt() in try-catch or use .catch() handler. Without error handling, validation failures cause unhandled promise rejections.


📖 [Source](https://github.com/jquense/yup#schemavalidateatpath-string-value-any-options-object-promise)

---

### `validateSyncAt()`

Validates a specific path in the data against the schema synchronously

**Import:**
```typescript
import { validateSyncAt } from 'yup';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - validatesyncat-throws**

**Condition:** data at the specified path fails validation

**Throws:** ValidationError

**Required Handling:**

Caller MUST wrap validateSyncAt() in try-catch block. Without error handling, validation failures throw uncaught exceptions.


📖 [Source](https://github.com/jquense/yup#schemavalidatesyncat-path-string-value-any-options-object-any)

---

## Example: Proper Error Handling

```typescript
import yup from 'yup';

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

- [Contract Schema Reference](../contract-schema/schema-reference)
- [All Supported Packages](./overview)
- [How to Use verify-cli](../cli-reference/overview)
