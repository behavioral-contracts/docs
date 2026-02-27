---
title: "ajv"
---

# ajv

| Property | Value |
|----------|-------|
| **Package** | `ajv` |
| **Versions Covered** | `>=8.18.0 <10.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `draft` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install ajv
```

## Covered Functions

This contract covers 3 function(s):

### `validate()`

Validates data against a JSON schema (synchronous)

**Import:**
```typescript
import { validate } from 'ajv';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - validate-returns-false**

**Condition:** data fails validation against the JSON schema

**Returns:**

false (errors are stored in ajv.errors property)

**Required Handling:**

Caller MUST check the return value of validate() and handle the false case. When validate() returns false, ajv.errors contains validation error details. Without checking the return value, invalid data will pass through, leading to data corruption, business logic errors, or security vulnerabilities. Use pattern: if (!ajv.validate(schema, data))  console.error(ajv.errors); 


📖 [Source](https://ajv.js.org/guide/getting-started.html#basic-data-validation)

---

### `compile()`

Compiles a JSON schema into a validation function

**Import:**
```typescript
import { compile } from 'ajv';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - compile-invalid-schema**

**Condition:** schema is invalid or malformed

**Throws:** Error (schema compilation error)

**Required Handling:**

Caller MUST wrap compile() in try-catch when working with untrusted schemas. Invalid schemas cause compilation errors that crash the application. Use pattern: try  const validate = ajv.compile(schema);  catch (error)  /* handle */ 


📖 [Source](https://ajv.js.org/guide/getting-started.html#basic-data-validation)

---

### `validateSchema()`

Validates a JSON schema against meta-schema

**Import:**
```typescript
import { validateSchema } from 'ajv';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - validateschema-returns-false**

**Condition:** schema is invalid according to meta-schema

**Returns:**

false (errors are stored in ajv.errors property)

**Required Handling:**

Caller MUST check the return value to determine if schema is valid. Without checking, invalid schemas may be used, causing unexpected validation behavior. Use pattern: if (!ajv.validateSchema(schema))  console.error(ajv.errors); 


📖 [Source](https://ajv.js.org/api.html#validateschema-schema-object-boolean)

---

## Example: Proper Error Handling

```typescript
import ajv from 'ajv';

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
