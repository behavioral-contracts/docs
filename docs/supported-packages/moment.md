---
title: "moment"
---

# moment

| Property | Value |
|----------|-------|
| **Package** | `moment` |
| **Versions Covered** | `>=2.29.0 <3.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install moment
```

## Covered Functions

This contract covers 3 function(s):

### `moment()`

Parses date strings and creates moment objects

**Import:**
```typescript
import { moment } from 'moment';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - moment-invalid-date**

**Condition:** input string is not a valid date format

**Returns:**

Invalid moment object (moment.isValid() returns false)

**Required Handling:**

Caller MUST check isValid() before using the moment object. Invalid moment objects can cause incorrect date calculations, display issues, or NaN values propagating through the application. Use pattern: const m = moment(input); if (!m.isValid())  /* handle error */ 


📖 [Source](https://momentjs.com/docs/#/parsing/string/)

---

### `utc()`

Parses date in UTC mode

**Import:**
```typescript
import { utc } from 'moment';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - utc-invalid-date**

**Condition:** input string is not a valid date format

**Returns:**

Invalid moment object (moment.isValid() returns false)

**Required Handling:**

Caller MUST check isValid() after parsing. Invalid UTC moments can cause timezone calculation errors and data corruption. Use pattern: const m = moment.utc(input); if (!m.isValid())  /* handle error */ 


📖 [Source](https://momentjs.com/docs/#/parsing/utc/)

---

### `locale()`

Sets or gets the current locale

**Import:**
```typescript
import { locale } from 'moment';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - locale-path-traversal**

**Condition:** user-provided locale string passed without validation

**Required Handling:**

When using user input to set locale, MUST validate against an allowlist. Vulnerable versions (1.0.1-2.29.1) allow path traversal via locale strings containing dot-dot sequences (/../). Patched in version 2.29.2. Use pattern: const allowed = ['en','fr','de']; if (allowed.includes(userLocale)) moment.locale(userLocale);


📖 [Source](https://nvd.nist.gov/vuln/detail/CVE-2022-24785)

---

## Example: Proper Error Handling

```typescript
import moment from 'moment';

async function example() {
  try {
    const result = await moment(/* args */);
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
