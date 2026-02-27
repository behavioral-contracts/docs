---
title: "formidable"
---

# formidable

| Property | Value |
|----------|-------|
| **Package** | `formidable` |
| **Versions Covered** | `>=3.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install formidable
```

## Covered Functions

This contract covers 1 function(s):

### `parse()`

Parses form data from HTTP request

**Import:**
```typescript
import { parse } from 'formidable';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - formidable-001**

**Condition:** form parsing fails due to invalid data or size limits

**Throws:** Error with parsing details

**Required Handling:**

Caller MUST handle parsing errors in event listener or try-catch

📖 [Source](https://github.com/node-formidable/formidable)

---

## Example: Proper Error Handling

```typescript
import formidable from 'formidable';

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
