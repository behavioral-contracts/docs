---
title: "cloudinary"
---

# cloudinary

| Property | Value |
|----------|-------|
| **Package** | `cloudinary` |
| **Versions Covered** | `>=1.0.0 <3.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-25 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install cloudinary
```

## Covered Functions

This contract covers 4 function(s):

### `upload()`

Upload image or video files to Cloudinary

**Import:**
```typescript
import { upload } from 'cloudinary';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - upload-missing-error-handling**

**Condition:** network error, validation error, authentication failure, or quota exceeded during upload

**Throws:** Error with network/validation/auth details

**Required Handling:**

MUST wrap cloudinary.v2.uploader.upload() in try-catch (for async/await) OR check error parameter in callback: (error, result) =  if (error) ... 


📖 [Source](https://cloudinary.com/documentation/node_image_and_video_upload)

---

### `upload_large()`

Upload large files (100MB) in chunks to handle network interruptions

**Import:**
```typescript
import { upload_large } from 'cloudinary';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - upload-large-missing-error-handling**

**Condition:** network interruption, 413 error, authentication failure, or chunk upload failure

**Throws:** Error with 413 Request Entity Too Large or network error details

**Required Handling:**

MUST wrap cloudinary.v2.uploader.upload_large() in try-catch OR check error parameter in callback. Files 100MB require this method.


📖 [Source](https://cloudinary.com/documentation/node_image_and_video_upload)

---

### `upload_stream()`

Stream-based upload for processing files on-the-fly

**Import:**
```typescript
import { upload_stream } from 'cloudinary';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - upload-stream-missing-error-handling**

**Condition:** stream read error, network interruption, memory issue, or authentication failure

**Throws:** Error with stream or network details

**Required Handling:**

MUST provide callback with error parameter: cloudinary.v2.uploader.upload_stream((error, result) =  if (error) ... ) Stream uploads REQUIRE callback-based error handling.


📖 [Source](https://support.cloudinary.com/hc/en-us/community/posts/360026620212-stream-upload-catching-errors-NODE-JS-)

---

### `destroy()`

Delete an asset from Cloudinary by public_id

**Import:**
```typescript
import { destroy } from 'cloudinary';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - destroy-missing-error-handling**

**Condition:** asset not found, authentication failure, network error, or permission denied

**Throws:** Error with resource not found or authentication details

**Required Handling:**

MUST wrap cloudinary.v2.uploader.destroy() in try-catch OR check error parameter in callback. Asset may not exist.


📖 [Source](https://cloudinary.com/documentation/image_upload_api_reference)

---

## Example: Proper Error Handling

```typescript
import cloudinary from 'cloudinary';

async function example() {
  try {
    const result = await upload(/* args */);
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
