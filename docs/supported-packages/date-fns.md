---
title: date-fns
---

# date-fns

| Property | Value |
|----------|-------|
| **Package** | `date-fns` |
| **Versions Covered** | `>=3.0.0 <5.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install date-fns
```

## Covered Functions

This contract covers 2 function(s):

### `parse()`

Parses date string into Date object

**Import:**
```typescript
import { parse } from 'date-fns';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - parse-returns-invalid-date**

**Condition:** input string is malformed or doesn't match format string

**Returns:** Invalid Date object (isNaN(date) returns true)

**Required Handling:**

Caller MUST use isValid() to check if parsed date is valid before using in calculations or formatting. Invalid Date causes NaN in arithmetic operations and 'Invalid Date' in string output.

📖 [Source](https://date-fns.org/docs/parse)

---

### `format()`

Formats Date object as string

**Import:**
```typescript
import { format } from 'date-fns';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - format-invalid-date**

**Condition:** input Date object is Invalid Date (isNaN returns true)

**Returns:** string 'Invalid Date'

**Required Handling:**

Caller SHOULD check if date is valid with isValid() before formatting to avoid returning 'Invalid Date' string to users. Use isValid(date) before format() to ensure proper output.

📖 [Source](https://date-fns.org/docs/format)

---

## Example: Proper Error Handling

## See Also

- [Contract Schema Reference](../contract-schema/schema-reference.md)
- [All Supported Packages](./overview.md)
- [How to Use verify-cli](../cli-reference/overview.md)
