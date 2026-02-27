---
title: "zod"
---

# zod

| Property | Value |
|----------|-------|
| **Package** | `zod` |
| **Versions Covered** | `>=3.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | Mon Feb 23 2026 19:00:00 GMT-0500 (Eastern Standard Time) |
| **Maintainer** | behavioral-contracts |

## Installation

```bash
npm install zod
```

## Covered Functions

This contract covers 4 function(s):

### `parse()`

Validates data against a schema synchronously. Throws ZodError if validation
fails. Returns the validated and typed data if successful.


**Import:**
```typescript
import { parse } from 'zod';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - parse-validation-error**

**Condition:** When input data does not match the schema definition

**Throws:** ZodError

**Required Handling:**

Caller MUST wrap parse() in try-catch block or use safeParse() instead.
ZodError contains detailed validation failure information in the 'issues' array.


📖 [Source](https://github.com/colinhacks/zod#parse)

**🔴 ERROR - parse-type-coercion-error**

**Condition:** When type coercion fails (e.g., z.coerce.date() receives invalid date string)

**Throws:** ZodError

**Required Handling:**

Caller MUST handle coercion failures. Use safeParse() or try-catch.


📖 [Source](https://github.com/colinhacks/zod#coercion-for-primitives)

---

### `parseAsync()`

Validates data against a schema asynchronously. Supports async refinements
and transformations. Throws ZodError if validation fails.


**Import:**
```typescript
import { parseAsync } from 'zod';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - parse-async-validation-error**

**Condition:** When input data does not match the schema definition or async refinements fail

**Throws:** ZodError

**Required Handling:**

Caller MUST wrap parseAsync() in try-catch block or use safeParseAsync() instead.
Handle rejected promises appropriately.


📖 [Source](https://github.com/colinhacks/zod#parse)

**🔴 ERROR - parse-async-refinement-error**

**Condition:** When custom async refinement validation fails

**Throws:** ZodError

**Required Handling:**

Caller MUST handle async refinement failures. The error.issues array will
contain details about which refinements failed.


📖 [Source](https://github.com/colinhacks/zod#refine)

---

### `safeParse()`

Validates data against a schema synchronously without throwing. Returns a
discriminated union with success: true, data or success: false, error.


**Import:**
```typescript
import { safeParse } from 'zod';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - safe-parse-success-check**

**Condition:** When validation completes (success or failure)

**Throws:** never

**Required Handling:**

Caller MUST check result.success before accessing result.data or result.error.
TypeScript discriminated unions enforce this at compile time.


📖 [Source](https://github.com/colinhacks/zod#safeparse)

---

### `safeParseAsync()`

Validates data against a schema asynchronously without throwing. Returns a
promise of discriminated union with success: true, data or success: false, error.


**Import:**
```typescript
import { safeParseAsync } from 'zod';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - safe-parse-async-success-check**

**Condition:** When async validation completes (success or failure)

**Throws:** never

**Required Handling:**

Caller MUST check result.success before accessing result.data or result.error.
Handle the promise appropriately.


📖 [Source](https://github.com/colinhacks/zod#safeparse)

---

## Example: Proper Error Handling

```typescript
import zod from 'zod';

async function example() {
  try {
    const result = await parse(/* args */);
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
