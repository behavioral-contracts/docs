---
title: "uuid"
---

# uuid

| Property | Value |
|----------|-------|
| **Package** | `uuid` |
| **Versions Covered** | `>=9.0.0 <14.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install uuid
```

## Covered Functions

This contract covers 1 function(s):

### `v4()`

Generates a random UUID v4

**Import:**
```typescript
import { v4 } from 'uuid';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - v4-returns-valid-uuid**

**Condition:** called with valid or no arguments

**Returns:**

string containing valid UUID v4 format

**Required Handling:**

When accepting UUID from user input, caller SHOULD use validate() to verify format before using in database queries or business logic. Malformed UUIDs can cause SQL errors or security issues.

📖 [Source](https://github.com/uuidjs/uuid#uuidvalidatestr)

---

## Example: Proper Error Handling

## See Also

- [Contract Schema Reference](../contract-schema/schema-reference)
- [All Supported Packages](./overview)
- [How to Use verify-cli](../cli-reference/overview)
