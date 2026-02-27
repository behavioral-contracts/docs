---
title: "busboy"
---

# busboy

| Property | Value |
|----------|-------|
| **Package** | `busboy` |
| **Versions Covered** | `>=1.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install busboy
```

## Covered Functions

This contract covers 1 function(s):

### `Busboy()`

Creates Busboy parser instance

**Import:**
```typescript
import { Busboy } from 'busboy';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - busboy-001**

**Condition:** parsing fails due to limits or malformed data

**Throws:** Error emitted via 'error' event

**Required Handling:**

Caller MUST attach error event listener to Busboy instance

📖 [Source](https://github.com/mscdex/busboy)

---

## Example: Proper Error Handling

```typescript
import busboy from 'busboy';

async function example() {
  try {
    const result = await Busboy(/* args */);
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
