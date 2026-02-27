---
title: "@azure/storage-blob"
---

# @azure/storage-blob

| Property | Value |
|----------|-------|
| **Package** | `@azure/storage-blob` |
| **Versions Covered** | `>=12.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install @azure/storage-blob
```

## Covered Functions

This contract covers 9 function(s):

### `download()`

Downloads a blob from Azure Blob Storage

**Import:**
```typescript
import @azure/storage-blob from '@azure/storage-blob';
@azure/storage-blob.download(...);
```

#### Postconditions

What happens **after** calling this function:

**ℹ️ INFO - success**

**Condition:** blob exists and download succeeds

**Returns:**

BlobDownloadResponse with readableStreamBody and blob metadata

📖 [Source](https://learn.microsoft.com/en-us/javascript/api/@azure/storage-blob/blobclient#@azure-storage-blob-blobclient-download)

**🔴 ERROR - blob-not-found**

**Condition:** blob does not exist

**Throws:** RestError with statusCode 404 and x-ms-error-code: BlobNotFound

**Required Handling:**

Caller MUST catch RestError and check error.statusCode === 404 or error.response.headers.get('x-ms-error-code') === 'BlobNotFound' to handle missing blobs.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

**🔴 ERROR - blob-archived**

**Condition:** blob is in archived tier

**Throws:** RestError with statusCode 409 and errorCode: BlobArchived

**Required Handling:**

Caller MUST catch RestError and handle archived blobs by either rehydrating the blob first or returning appropriate error to user.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

**🔴 ERROR - network-error**

**Condition:** network failure, connection timeout, or DNS resolution failure

**Throws:** Error with code ECONNREFUSED, ETIMEDOUT, or ENOTFOUND

**Required Handling:**

Caller MUST catch errors and implement retry logic with exponential backoff for transient network failures.


📖 [Source](https://github.com/Azure/azure-sdk-for-js/issues/4999)

---

### `getProperties()`

Gets blob properties including metadata, content type, and last modified time

**Import:**
```typescript
import @azure/storage-blob from '@azure/storage-blob';
@azure/storage-blob.getProperties(...);
```

#### Postconditions

What happens **after** calling this function:

**ℹ️ INFO - success**

**Condition:** blob exists

**Returns:**

BlobGetPropertiesResponse with metadata, contentType, lastModified, etc.

📖 [Source](https://learn.microsoft.com/en-us/javascript/api/@azure/storage-blob/blobclient#@azure-storage-blob-blobclient-getproperties)

**🔴 ERROR - blob-not-found**

**Condition:** blob does not exist

**Throws:** RestError with statusCode 404 and errorCode: BlobNotFound

**Required Handling:**

Caller MUST catch RestError and check error.statusCode === 404 to handle missing blobs. Common pattern is to check existence before accessing properties.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

**🔴 ERROR - container-not-found**

**Condition:** container does not exist

**Throws:** RestError with statusCode 404 and errorCode: ContainerNotFound

**Required Handling:**

Caller MUST catch RestError and distinguish between BlobNotFound and ContainerNotFound to provide appropriate error messages.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

---

### `upload()`

Uploads data to a block blob

**Import:**
```typescript
import @azure/storage-blob from '@azure/storage-blob';
@azure/storage-blob.upload(...);
```

#### Postconditions

What happens **after** calling this function:

**ℹ️ INFO - success**

**Condition:** upload succeeds

**Returns:**

BlockBlobUploadResponse with requestId, version, and ETag

📖 [Source](https://learn.microsoft.com/en-us/javascript/api/@azure/storage-blob/blockblobclient#@azure-storage-blob-blockblobclient-upload)

**🔴 ERROR - blob-already-exists**

**Condition:** blob exists and If-None-Match: * is set

**Throws:** RestError with statusCode 409 and errorCode: BlobAlreadyExists

**Required Handling:**

Caller MUST catch RestError and check error.statusCode === 409 to handle conflicts when blob already exists.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

**🔴 ERROR - container-not-found**

**Condition:** container does not exist

**Throws:** RestError with statusCode 404 and errorCode: ContainerNotFound

**Required Handling:**

Caller MUST catch RestError and either create container first or return appropriate error. Common mistake is not checking container existence.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

**🔴 ERROR - invalid-blob-type**

**Condition:** blob exists as different type (e.g., page blob)

**Throws:** RestError with statusCode 409 and errorCode: InvalidBlobType

**Required Handling:**

Caller MUST catch RestError and handle type conflicts appropriately.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

**🔴 ERROR - network-error**

**Condition:** network failure during upload

**Throws:** Error with code ECONNREFUSED, ETIMEDOUT, or ENOTFOUND

**Required Handling:**

Caller MUST catch errors and implement retry logic for transient failures.


📖 [Source](https://github.com/Azure/azure-sdk-for-js/issues/4999)

---

### `uploadFile()`

Uploads a local file to a block blob (Node.js only)

**Import:**
```typescript
import @azure/storage-blob from '@azure/storage-blob';
@azure/storage-blob.uploadFile(...);
```

#### Postconditions

What happens **after** calling this function:

**ℹ️ INFO - success**

**Condition:** file upload succeeds

**Returns:**

BlobUploadCommonResponse with requestId, version, and ETag

📖 [Source](https://learn.microsoft.com/en-us/javascript/api/@azure/storage-blob/blockblobclient#@azure-storage-blob-blockblobclient-uploadfile)

**🔴 ERROR - container-not-found**

**Condition:** container does not exist

**Throws:** RestError with statusCode 404 and errorCode: ContainerNotFound

**Required Handling:**

Caller MUST catch RestError and create container before uploading.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

**🔴 ERROR - network-error**

**Condition:** network failure during multipart upload

**Throws:** Error with network error code

**Required Handling:**

Caller MUST catch errors and retry failed uploads with exponential backoff.


📖 [Source](https://github.com/Azure/azure-sdk-for-js/issues/4999)

---

### `uploadData()`

Uploads a Buffer or Blob to a block blob

**Import:**
```typescript
import @azure/storage-blob from '@azure/storage-blob';
@azure/storage-blob.uploadData(...);
```

#### Postconditions

What happens **after** calling this function:

**ℹ️ INFO - success**

**Condition:** data upload succeeds

**Returns:**

BlobUploadCommonResponse with requestId, version, and ETag

📖 [Source](https://learn.microsoft.com/en-us/javascript/api/@azure/storage-blob/blockblobclient#@azure-storage-blob-blockblobclient-uploaddata)

**🔴 ERROR - container-not-found**

**Condition:** container does not exist

**Throws:** RestError with statusCode 404 and errorCode: ContainerNotFound

**Required Handling:**

Caller MUST catch RestError and handle missing container appropriately.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

**🔴 ERROR - network-error**

**Condition:** network failure

**Throws:** Error with network error code

**Required Handling:**

Caller MUST catch errors and implement retry logic.


📖 [Source](https://github.com/Azure/azure-sdk-for-js/issues/4999)

---

### `create()`

Creates a new container in the storage account

**Import:**
```typescript
import @azure/storage-blob from '@azure/storage-blob';
@azure/storage-blob.create(...);
```

#### Postconditions

What happens **after** calling this function:

**ℹ️ INFO - success**

**Condition:** container creation succeeds

**Returns:**

ContainerCreateResponse with requestId and ETag

📖 [Source](https://learn.microsoft.com/en-us/javascript/api/@azure/storage-blob/containerclient#@azure-storage-blob-containerclient-create)

**🔴 ERROR - container-already-exists**

**Condition:** container with same name already exists

**Throws:** RestError with statusCode 409 and errorCode: ContainerAlreadyExists

**Required Handling:**

Caller MUST catch RestError and check error.statusCode === 409 to handle existing containers. Common pattern is to check exists() first or catch and continue.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

**🔴 ERROR - container-being-deleted**

**Condition:** container is currently being deleted

**Throws:** RestError with statusCode 409 and errorCode: ContainerBeingDeleted

**Required Handling:**

Caller MUST catch RestError and wait for deletion to complete before retrying.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

**🔴 ERROR - auth-error**

**Condition:** authentication fails or insufficient permissions

**Throws:** RestError with statusCode 403

**Required Handling:**

Caller MUST catch RestError with statusCode 403 and handle authentication/authorization failures.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

---

### `delete()`

Deletes the container

**Import:**
```typescript
import @azure/storage-blob from '@azure/storage-blob';
@azure/storage-blob.delete(...);
```

#### Postconditions

What happens **after** calling this function:

**ℹ️ INFO - success**

**Condition:** container deletion succeeds

**Returns:**

ContainerDeleteResponse with requestId

📖 [Source](https://learn.microsoft.com/en-us/javascript/api/@azure/storage-blob/containerclient#@azure-storage-blob-containerclient-delete)

**🔴 ERROR - container-not-found**

**Condition:** container does not exist

**Throws:** RestError with statusCode 404 and errorCode: ContainerNotFound

**Required Handling:**

Caller MUST catch RestError and handle missing containers. Common pattern is to check exists() first or catch 404 and treat as success.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

**🔴 ERROR - lease-id-missing**

**Condition:** container has active lease but lease ID not provided

**Throws:** RestError with statusCode 412 and errorCode: LeaseIdMissing

**Required Handling:**

Caller MUST catch RestError with statusCode 412 and handle lease conflicts.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

---

### `exists()`

Checks whether the container exists

**Import:**
```typescript
import @azure/storage-blob from '@azure/storage-blob';
@azure/storage-blob.exists(...);
```

#### Postconditions

What happens **after** calling this function:

**ℹ️ INFO - success**

**Condition:** check completes successfully

**Returns:**

boolean indicating whether container exists

📖 [Source](https://learn.microsoft.com/en-us/javascript/api/@azure/storage-blob/containerclient#@azure-storage-blob-containerclient-exists)

**⚠️ WARNING - auth-error**

**Condition:** authentication fails

**Throws:** RestError with statusCode 403

**Required Handling:**

Caller SHOULD catch RestError for permission errors even when checking existence.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

---

### `listContainers()`

Lists containers in the storage account

**Import:**
```typescript
import @azure/storage-blob from '@azure/storage-blob';
@azure/storage-blob.listContainers(...);
```

#### Postconditions

What happens **after** calling this function:

**ℹ️ INFO - success**

**Condition:** listing succeeds

**Returns:**

AsyncIterableIterator of ContainerItem objects

📖 [Source](https://learn.microsoft.com/en-us/javascript/api/@azure/storage-blob/blobserviceclient#@azure-storage-blob-blobserviceclient-listcontainers)

**🔴 ERROR - auth-error**

**Condition:** authentication fails

**Throws:** RestError with statusCode 403

**Required Handling:**

Caller MUST catch RestError when iterating containers to handle auth failures.


📖 [Source](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes)

---

## Example: Proper Error Handling

```typescript
import storage-blob from '@azure/storage-blob';

async function example() {
  try {
    const result = await download(/* args */);
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
