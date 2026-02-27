---
title: "@google-cloud/storage"
---

# @google-cloud/storage

| Property | Value |
|----------|-------|
| **Package** | `@google-cloud/storage` |
| **Versions Covered** | `>=5.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install @google-cloud/storage
```

## Covered Functions

This contract covers 10 function(s):

### `upload()`

Uploads a file to Google Cloud Storage bucket

**Import:**
```typescript
import { upload } from '@google-cloud/storage';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - upload-network-error**

**Condition:** Network connection fails or times out

**Throws:** ApiError with code ECONNRESET, ETIMEDOUT, or HTTP 408/504

**Required Handling:**

Caller MUST wrap bucket.upload() in try-catch block. Network errors can occur due to internet connectivity issues, DNS failures, or Cloud Storage service downtime. The library automatically retries (default: 3 attempts with exponential backoff), but will throw after max retries exhausted.


📖 [Source](https://github.com/googleapis/nodejs-storage/issues/833)

**🔴 ERROR - upload-permission-error**

**Condition:** IAM permissions insufficient for bucket write

**Throws:** ApiError with HTTP 403 Forbidden

**Required Handling:**

Caller MUST handle permission errors. Verify service account has storage.objects.create permission on the target bucket. This error is NOT automatically retried.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload)

**🔴 ERROR - upload-bucket-not-found**

**Condition:** Bucket does not exist

**Throws:** ApiError with HTTP 404 Not Found

**Required Handling:**

Caller MUST handle bucket not found errors. Create bucket first using storage.createBucket() or verify bucket name is correct.


📖 [Source](https://github.com/googleapis/nodejs-storage/issues/813)

**🔴 ERROR - upload-file-not-found**

**Condition:** Local file path does not exist

**Throws:** Error: ENOENT: no such file or directory

**Required Handling:**

Caller MUST validate local file exists before calling upload(). Check with fs.existsSync() or handle file not found errors gracefully.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload)

---

### `download()`

Downloads a file from Google Cloud Storage

**Import:**
```typescript
import { download } from '@google-cloud/storage';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - download-file-not-found**

**Condition:** File does not exist in bucket

**Throws:** ApiError with HTTP 404 Not Found

**Required Handling:**

Caller MUST handle file not found errors. Check if file exists using file.exists() before downloading, or handle 404 gracefully.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/File.html#download)

**🔴 ERROR - download-permission-error**

**Condition:** IAM permissions insufficient for file read

**Throws:** ApiError with HTTP 403 Forbidden

**Required Handling:**

Caller MUST handle permission errors. Verify service account has storage.objects.get permission. This error is NOT automatically retried.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/File.html#download)

**🔴 ERROR - download-network-error**

**Condition:** Network connection fails during download

**Throws:** ApiError with code ECONNRESET, ETIMEDOUT

**Required Handling:**

Caller MUST handle network errors. Large file downloads are more susceptible to connection timeouts. The library automatically retries, but will throw after max retries exhausted.


📖 [Source](https://github.com/googleapis/nodejs-storage/issues/2482)

**🔴 ERROR - download-corruption-error**

**Condition:** Downloaded file hash does not match expected checksum

**Throws:** Error with code CONTENT_DOWNLOAD_MISMATCH

**Required Handling:**

Caller MUST retry download when corruption detected. This error indicates the downloaded content differs from what was stored. Retry the download operation.


📖 [Source](https://github.com/googleapis/nodejs-storage/issues/709)

---

### `delete()`

Deletes a file or bucket from Google Cloud Storage

**Import:**
```typescript
import { delete } from '@google-cloud/storage';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - delete-not-found**

**Condition:** File or bucket does not exist

**Throws:** ApiError with HTTP 404 Not Found

**Required Handling:**

Caller SHOULD handle 404 errors gracefully. If idempotent delete is desired, catch 404 and treat as success. Otherwise, throw error to caller.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/File.html#delete)

**🔴 ERROR - delete-permission-error**

**Condition:** IAM permissions insufficient for delete

**Throws:** ApiError with HTTP 403 Forbidden

**Required Handling:**

Caller MUST handle permission errors. Verify service account has storage.objects.delete or storage.buckets.delete permission.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/File.html#delete)

**🔴 ERROR - delete-bucket-not-empty**

**Condition:** Attempting to delete bucket that contains files

**Throws:** ApiError with HTTP 409 Conflict

**Required Handling:**

Caller MUST delete all files first using bucket.deleteFiles() before deleting bucket, or handle conflict error.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/Bucket.html#delete)

---

### `save()`

Writes data to a file in Google Cloud Storage

**Import:**
```typescript
import { save } from '@google-cloud/storage';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - save-permission-error**

**Condition:** IAM permissions insufficient for file write

**Throws:** ApiError with HTTP 403 Forbidden

**Required Handling:**

Caller MUST handle permission errors. Verify service account has storage.objects.create permission on the target bucket.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/File.html#save)

**🔴 ERROR - save-network-error**

**Condition:** Network connection fails during write

**Throws:** ApiError with code ECONNRESET, ETIMEDOUT

**Required Handling:**

Caller MUST handle network errors. The library automatically retries with exponential backoff, but will throw after max retries exhausted.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/File.html#save)

---

### `getMetadata()`

Retrieves metadata for a file or bucket

**Import:**
```typescript
import { getMetadata } from '@google-cloud/storage';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - getmetadata-not-found**

**Condition:** File or bucket does not exist

**Throws:** ApiError with HTTP 404 Not Found

**Required Handling:**

Caller MUST handle not found errors. Check if resource exists using exists() method before calling getMetadata(), or handle 404 gracefully.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/File.html#getMetadata)

**🔴 ERROR - getmetadata-permission-error**

**Condition:** IAM permissions insufficient for metadata read

**Throws:** ApiError with HTTP 403 Forbidden

**Required Handling:**

Caller MUST handle permission errors. Verify service account has appropriate read permissions for the resource.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/File.html#getMetadata)

---

### `setMetadata()`

Updates metadata for a file or bucket

**Import:**
```typescript
import { setMetadata } from '@google-cloud/storage';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - setmetadata-not-found**

**Condition:** File or bucket does not exist

**Throws:** ApiError with HTTP 404 Not Found

**Required Handling:**

Caller MUST handle not found errors. Verify resource exists before attempting to update metadata.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/File.html#setMetadata)

**🔴 ERROR - setmetadata-permission-error**

**Condition:** IAM permissions insufficient for metadata write

**Throws:** ApiError with HTTP 403 Forbidden

**Required Handling:**

Caller MUST handle permission errors. Verify service account has storage.objects.update or storage.buckets.update permission.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/File.html#setMetadata)

---

### `getFiles()`

Lists files in a bucket

**Import:**
```typescript
import { getFiles } from '@google-cloud/storage';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - getfiles-permission-error**

**Condition:** IAM permissions insufficient for listing

**Throws:** ApiError with HTTP 403 Forbidden

**Required Handling:**

Caller MUST handle permission errors. Verify service account has storage.objects.list permission on the bucket.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/Bucket.html#getFiles)

**🔴 ERROR - getfiles-network-error**

**Condition:** Network connection fails

**Throws:** ApiError with network error codes

**Required Handling:**

Caller MUST handle network errors. The library automatically retries, but will throw after max retries exhausted.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/Bucket.html#getFiles)

---

### `createBucket()`

Creates a new Google Cloud Storage bucket

**Import:**
```typescript
import { createBucket } from '@google-cloud/storage';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - createbucket-already-exists**

**Condition:** Bucket with same name already exists

**Throws:** ApiError with HTTP 409 Conflict

**Required Handling:**

Caller SHOULD handle bucket already exists errors. If idempotent create is desired, catch 409 and retrieve existing bucket.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/Storage.html#createBucket)

**🔴 ERROR - createbucket-invalid-name**

**Condition:** Bucket name violates naming requirements

**Throws:** ApiError with HTTP 400 Bad Request

**Required Handling:**

Caller MUST validate bucket names before creation. Names must be globally unique, lowercase, 3-63 characters, and follow DNS naming conventions.


📖 [Source](https://cloud.google.com/storage/docs/naming-buckets)

**🔴 ERROR - createbucket-permission-error**

**Condition:** IAM permissions insufficient for bucket creation

**Throws:** ApiError with HTTP 403 Forbidden

**Required Handling:**

Caller MUST handle permission errors. Verify service account has storage.buckets.create permission in the project.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/Storage.html#createBucket)

---

### `deleteFiles()`

Deletes multiple files from a bucket (batch operation)

**Import:**
```typescript
import { deleteFiles } from '@google-cloud/storage';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - deletefiles-partial-failure**

**Condition:** Some files fail to delete while others succeed

**Throws:** PartialFailureError containing array of failed operations

**Required Handling:**

Caller MUST handle PartialFailureError separately from ApiError. Inspect error.errors array to determine which files failed and why. Consider retry logic for failed operations.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/Bucket.html#deleteFiles)

**🔴 ERROR - deletefiles-permission-error**

**Condition:** IAM permissions insufficient for batch delete

**Throws:** ApiError with HTTP 403 Forbidden

**Required Handling:**

Caller MUST handle permission errors. Verify service account has storage.objects.delete permission on all matching files.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/Bucket.html#deleteFiles)

---

### `getSignedUrl()`

Generates a signed URL for temporary file access

**Import:**
```typescript
import { getSignedUrl } from '@google-cloud/storage';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - getsignedurl-invalid-credentials**

**Condition:** Service account credentials are invalid or missing

**Throws:** ApiError with authentication failure

**Required Handling:**

Caller MUST handle credential errors. Signed URLs require service account with private key. Verify GOOGLE_APPLICATION_CREDENTIALS is set correctly.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/File.html#getSignedUrl)

**🔴 ERROR - getsignedurl-file-not-found**

**Condition:** File does not exist (for read operations)

**Throws:** ApiError with HTTP 404 Not Found

**Required Handling:**

Caller SHOULD handle file not found errors. For read URLs, file must exist. For write URLs, file will be created on upload.


📖 [Source](https://googleapis.dev/nodejs/storage/latest/File.html#getSignedUrl)

---

## Example: Proper Error Handling

```typescript
import storage from '@google-cloud/storage';

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

- [Contract Schema Reference](../contract-schema/schema-reference)
- [All Supported Packages](./overview)
- [How to Use verify-cli](../cli-reference/overview)
