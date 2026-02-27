---
title: "multer"
---

# multer

| Property | Value |
|----------|-------|
| **Package** | `multer` |
| **Versions Covered** | `>=2.0.0 <3.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install multer
```

## Covered Functions

This contract covers 2 function(s):

### `single()`

Middleware for handling single file upload

**Import:**
```typescript
import { single } from 'multer';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - single-throws-multer-error**

**Condition:** file upload fails due to size limit, file type, or disk error

**Throws:** MulterError

**Required Handling:**

Caller MUST add error handling middleware after multer to catch MulterError. Check error.code for specific failure reason (LIMIT_FILE_SIZE, LIMIT_UNEXPECTED_FILE, etc.)

📖 [Source](https://github.com/expressjs/multer#error-handling)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - file-size-dos-prevention**

Configure limits option to prevent DoS via large file uploads. Unlimited file sizes can exhaust disk space or memory.

📖 [Source](https://github.com/expressjs/multer#limits)

**⚠️ WARNING - file-filter-validation**

Use fileFilter to validate file types and prevent malicious uploads. Without validation, users can upload executables or scripts.

📖 [Source](https://github.com/expressjs/multer#filefilter)

---

### `array()`

Middleware for handling multiple file uploads

**Import:**
```typescript
import { array } from 'multer';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - array-throws-multer-error**

**Condition:** one or more file uploads fail

**Throws:** MulterError

**Required Handling:**

Caller MUST add error handling middleware after multer to catch MulterError. Multiple file uploads can fail individually or collectively.

📖 [Source](https://github.com/expressjs/multer#error-handling)

---

## Example: Proper Error Handling

```typescript
import multer from 'multer';

async function example() {
  try {
    const result = await single(/* args */);
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
