---
title: "eventemitter2"
---

# eventemitter2

| Property | Value |
|----------|-------|
| **Package** | `eventemitter2` |
| **Versions Covered** | `>=6.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install eventemitter2
```

## Covered Functions

This contract covers 1 function(s):

### `EventEmitter2()`

Creates EventEmitter2 instance

**Import:**
```typescript
import { EventEmitter2 } from 'eventemitter2';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - eventemitter2-001**

**Condition:** error event emitted without listener

**Throws:** Uncaught exception unless ignoreErrors configured

**Required Handling:**

Caller MUST attach error event listener

📖 [Source](https://github.com/EventEmitter2/EventEmitter2)

---

## Example: Proper Error Handling

```typescript
import eventemitter2 from 'eventemitter2';

async function example() {
  try {
    const result = await EventEmitter2(/* args */);
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
