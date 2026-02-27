---
title: "@aws-sdk/client-s3"
---

# @aws-sdk/client-s3

| Property | Value |
|----------|-------|
| **Package** | `@aws-sdk/client-s3` |
| **Versions Covered** | `^3.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-25 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install @aws-sdk/client-s3
```

## Covered Functions

This contract covers 2 function(s):

### `send()`

Sends S3 commands (GetObject, PutObject, DeleteObject, etc.) to AWS S3

**Import:**
```typescript
import { send } from '@aws-sdk/client-s3';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - s3-object-operation-no-try-catch**

**Condition:** s3Client.send() called with object operation commands without try-catch

**Throws:** NoSuchKey (404), AccessDenied (403), NoSuchBucket (404), network errors

**Required Handling:**

MUST wrap await s3Client.send() in try-catch block when using GetObjectCommand, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand, or CopyObjectCommand. Catch block should check error.name for specific error types (NoSuchKey, AccessDenied, NoSuchBucket) and handle appropriately.


📖 [Source](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/)

**🔴 ERROR - s3-multipart-no-try-catch**

**Condition:** s3Client.send() called with multipart commands without try-catch

**Throws:** NoSuchUpload (404), EntityTooSmall (400), InvalidPart (400)

**Required Handling:**

MUST wrap multipart upload operations in try-catch block. Catch block MUST call AbortMultipartUploadCommand with the uploadId to clean up orphaned parts. This prevents storage charges for incomplete uploads.


📖 [Source](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html)

**🔴 ERROR - s3-bucket-operation-no-try-catch**

**Condition:** s3Client.send() called with bucket operations without try-catch

**Throws:** BucketAlreadyExists (409), BucketNotEmpty (409), NoSuchBucket (404)

**Required Handling:**

MUST wrap bucket operations in try-catch block. Handle BucketAlreadyExists/BucketAlreadyOwnedByYou gracefully (may be acceptable), check BucketNotEmpty before deletion, validate permissions.


📖 [Source](https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html)

**⚠️ WARNING - s3-list-operation-no-try-catch**

**Condition:** s3Client.send() called with list operations without try-catch

**Throws:** NoSuchBucket (404), AccessDenied (403), InvalidArgument (400)

**Required Handling:**

SHOULD wrap list operations in try-catch block for robustness. Handle NoSuchBucket and AccessDenied errors gracefully. Implement pagination properly with ContinuationToken.


📖 [Source](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/)

---

### `S3Client()`

Initializes AWS S3 client

**Import:**
```typescript
import { S3Client } from '@aws-sdk/client-s3';
```

#### Postconditions

What happens **after** calling this function:

**ℹ️ INFO - s3-client-no-retry-config**

**Condition:** S3Client created without retry configuration

**Required Handling:**

CONSIDER configuring retry settings: new S3Client( region, maxAttempts: 3, retryMode: 'adaptive' ). Adaptive mode adjusts retry attempts based on throttling signals from AWS.


📖 [Source](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/error-handling.html)

**⚠️ WARNING - s3-client-missing-region**

**Condition:** S3Client created without explicit region

**Required Handling:**

SHOULD explicitly set region: new S3Client( region: 'us-east-1' ) or use environment variable with fallback.


📖 [Source](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/)

---

## Example: Proper Error Handling

```typescript
import client-s3 from '@aws-sdk/client-s3';

async function example() {
  try {
    const result = await send(/* args */);
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
