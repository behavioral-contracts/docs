---
title: "dayjs"
---

# dayjs

| Property | Value |
|----------|-------|
| **Package** | `dayjs` |
| **Versions Covered** | `>=1.10.0 <2.0.0` |
| **Contract Version** | `1.1.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install dayjs
```

## Covered Functions

This contract covers 3 function(s):

### `dayjs()`

Parses date strings and creates Day.js objects (moment.js compatible API)

**Import:**
```typescript
import { dayjs } from 'dayjs';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - dayjs-invalid-date**

**Condition:** input string is not a valid date format

**Returns:**

Invalid Day.js object (dayjs().isValid() returns false)

**Required Handling:**

Caller MUST check isValid() before using the Day.js object. Invalid Day.js objects can cause incorrect date calculations, display issues, or NaN values propagating through the application. Use pattern: const d = dayjs(input); if (!d.isValid())  /* handle error */ 


📖 [Source](https://day.js.org/docs/en/parse/string)

---

### `utc()`

Parses date in UTC mode (requires UTC plugin)

**Import:**
```typescript
import { utc } from 'dayjs';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - utc-invalid-date**

**Condition:** input string is not a valid date format

**Returns:**

Invalid Day.js object (dayjs().isValid() returns false)

**Required Handling:**

Caller MUST check isValid() after parsing. Invalid UTC dates can cause timezone calculation errors and data corruption. Use pattern: const d = dayjs.utc(input); if (!d.isValid())  /* handle error */ 


📖 [Source](https://day.js.org/docs/en/plugin/utc)

---

### `format()`

Formats dayjs object to string using format tokens

**Import:**
```typescript
import { format } from 'dayjs';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - format-string-redos**

**Condition:** format string is user-controlled or very long

**Returns:**

Formatted string (but may cause ReDoS with malicious input)

**Required Handling:**

Avoid using user-controlled format strings directly. Vulnerable regex patterns in format parsing can cause quadratic time complexity, leading to CPU exhaustion and DoS. Validate and limit format string length. See GitHub PR #2908 for technical details.


📖 [Source](https://github.com/iamkun/dayjs/pull/2908)

---

## Example: Proper Error Handling

```typescript
import dayjs from 'dayjs';

async function example() {
  try {
    const result = await dayjs(/* args */);
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
