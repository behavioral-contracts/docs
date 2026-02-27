---
title: "sharp"
---

# sharp

| Property | Value |
|----------|-------|
| **Package** | `sharp` |
| **Versions Covered** | `>=0.30.0 <1.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install sharp
```

## Covered Functions

This contract covers 2 function(s):

### `toFile()`

Writes processed image to file system

**Import:**
```typescript
import { toFile } from 'sharp';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - tofile-rejects-on-error**

**Condition:** file system error, invalid image data, or processing failure

**Throws:** Promise rejection with Error (ENOENT, EACCES, ENOMEM, or processing errors)

**Required Handling:**

Caller MUST use try-catch or .catch() to handle Promise rejections from toFile(). File system errors (missing directory, permissions), invalid image data, and memory issues will reject the Promise and crash the application if unhandled. Use pattern: try  await sharp(input).toFile('output.jpg');  catch (error)  /* handle */ 


📖 [Source](https://sharp.pixelplumbing.com/api-output#tofile)

---

### `toBuffer()`

Returns processed image as Buffer

**Import:**
```typescript
import { toBuffer } from 'sharp';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - tobuffer-rejects-on-error**

**Condition:** invalid image data or processing failure

**Throws:** Promise rejection with Error

**Required Handling:**

Caller MUST use try-catch or .catch() to handle Promise rejections from toBuffer(). Invalid or corrupted image data will reject the Promise and crash if unhandled. Use pattern: try  const buffer = await sharp(input).toBuffer();  catch (error)  /* handle */ 


📖 [Source](https://sharp.pixelplumbing.com/api-output#tobuffer)

---

## Example: Proper Error Handling

```typescript
import sharp from 'sharp';

async function example() {
  try {
    const result = await toFile(/* args */);
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
