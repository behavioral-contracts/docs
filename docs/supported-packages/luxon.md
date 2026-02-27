---
title: "luxon"
---

# luxon

| Property | Value |
|----------|-------|
| **Package** | `luxon` |
| **Versions Covered** | `>=3.2.1` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install luxon
```

## Covered Functions

This contract covers 6 function(s):

### `DateTime.fromISO()`

Parses an ISO 8601 date string into a DateTime object

**Import:**
```typescript
import { DateTime.fromISO } from 'luxon';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - fromiso-invalid-date**

**Condition:** input string is not a valid ISO 8601 format

**Returns:**

Invalid DateTime object (dt.isValid is false, dt.invalidReason contains error)

**Required Handling:**

Caller MUST check isValid property before using the DateTime object. Invalid DateTime objects contain error information in invalidReason and invalidExplanation. Without validation, invalid dates cause calculation errors, display issues, or data corruption. Use pattern: const dt = DateTime.fromISO(input); if (!dt.isValid)  console.error(dt.invalidReason); 


📖 [Source](https://moment.github.io/luxon/api-docs/index.html#datetimefromiso)

---

### `DateTime.fromFormat()`

Parses a date string using a specified format

**Import:**
```typescript
import { DateTime.fromFormat } from 'luxon';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - fromformat-invalid-date**

**Condition:** input string does not match the specified format

**Returns:**

Invalid DateTime object (dt.isValid is false, dt.invalidReason contains error)

**Required Handling:**

Caller MUST check isValid property after parsing. Invalid DateTime objects indicate parsing failure but do not throw. Use pattern: const dt = DateTime.fromFormat(input, format); if (!dt.isValid)  /* handle */ 


📖 [Source](https://moment.github.io/luxon/api-docs/index.html#datetimefromformat)

---

### `DateTime.fromSQL()`

Parses a SQL date/datetime string

**Import:**
```typescript
import { DateTime.fromSQL } from 'luxon';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - fromsql-invalid-date**

**Condition:** input string is not a valid SQL date format

**Returns:**

Invalid DateTime object (dt.isValid is false)

**Required Handling:**

Caller MUST check isValid property. Invalid SQL dates can cause database query errors and data corruption. Use pattern: const dt = DateTime.fromSQL(input); if (!dt.isValid)  /* handle */ 


📖 [Source](https://moment.github.io/luxon/api-docs/index.html#datetimefromsql)

---

### `DateTime.fromHTTP()`

Parses an HTTP header date string (RFC 2822/1123)

**Import:**
```typescript
import { DateTime.fromHTTP } from 'luxon';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - fromhttp-invalid-date**

**Condition:** input string is not a valid HTTP date format

**Returns:**

Invalid DateTime object (dt.isValid is false)

**Required Handling:**

Caller MUST check isValid property. Invalid HTTP dates can cause caching errors and incorrect header processing. Use pattern: const dt = DateTime.fromHTTP(input); if (!dt.isValid)  /* handle */ 


📖 [Source](https://moment.github.io/luxon/api-docs/index.html#datetimefromhttp)

---

### `DateTime.fromRFC2822()`

Parses an RFC 2822 date string

**Import:**
```typescript
import { DateTime.fromRFC2822 } from 'luxon';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - fromrfc2822-invalid-date**

**Condition:** input string is not a valid RFC 2822 format

**Returns:**

Invalid DateTime object (dt.isValid is false)

**Required Handling:**

Caller MUST check isValid property. Use pattern: const dt = DateTime.fromRFC2822(input); if (!dt.isValid)  /* handle */ 


📖 [Source](https://moment.github.io/luxon/api-docs/index.html#datetimefromrfc2822)

---

### `DateTime.fromObject()`

Creates a DateTime from an object with date/time properties

**Import:**
```typescript
import { DateTime.fromObject } from 'luxon';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - fromobject-invalid-date**

**Condition:** object contains invalid date values (e.g., month 13, day 400)

**Returns:**

Invalid DateTime object (dt.isValid is false)

**Required Handling:**

Caller MUST check isValid property. Invalid calendar values (February 30, 25:00, month 13) produce invalid DateTimes. Use pattern: const dt = DateTime.fromObject(year, month, day); if (!dt.isValid)  /* handle */ 


📖 [Source](https://moment.github.io/luxon/api-docs/index.html#datetimefromobject)

---

## Example: Proper Error Handling

## See Also

- [Contract Schema Reference](../contract-schema/schema-reference)
- [All Supported Packages](./overview)
- [How to Use verify-cli](../cli-reference/overview)
