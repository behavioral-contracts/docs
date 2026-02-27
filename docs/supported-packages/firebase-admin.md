---
title: firebase-admin
---

# firebase-admin

| Property | Value |
|----------|-------|
| **Package** | `firebase-admin` |
| **Versions Covered** | `>=11.0.0 <14.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-25 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install firebase-admin
```

## Covered Functions

This contract covers 19 function(s):

### `verifyIdToken()`

Verifies a Firebase ID token (JWT)

**Import:**
```typescript
import { verifyIdToken } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - token-expired**

**Condition:** ID token has expired

**Throws:** `FirebaseAuthError with code 'auth/id-token-expired'`

**Required Handling:**

Caller MUST catch and handle expired token errors. Return 401 Unauthorized to client and require re-authentication. DO NOT retry with same token - it's permanently expired.


📖 [Source](https://firebase.google.com/docs/auth/admin/errors)

**🔴 ERROR - token-invalid**

**Condition:** ID token is invalid (malformed, wrong project, revoked)

**Throws:** `FirebaseAuthError with code 'auth/argument-error' or 'auth/id-token-revoked'`

**Required Handling:**

Caller MUST validate token format and handle invalid tokens. Check error.code to distinguish between format errors and revoked tokens. Return 401 Unauthorized to client.


📖 [Source](https://firebase.google.com/docs/auth/admin/verify-id-tokens)

**🔴 ERROR - network-error**

**Condition:** Network request to Firebase Auth service failed

**Throws:** `FirebaseAuthError or generic Error`

**Required Handling:**

Caller SHOULD implement retry with exponential backoff for transient failures. Check if Firebase Auth service is available.


📖 [Source](https://firebase.google.com/docs/reference/admin/error-handling)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - custom-token-vs-id-token**

verifyIdToken() only works with ID tokens, not custom tokens

📖 [Source](https://firebase.google.com/docs/auth/admin/verify-id-tokens)

---

### `createUser()`

Creates a new Firebase user account

**Import:**
```typescript
import { createUser } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - email-already-exists**

**Condition:** Email address is already in use

**Throws:** `FirebaseAuthError with code 'auth/email-already-exists'`

**Required Handling:**

Caller MUST check if error.code === 'auth/email-already-exists'. Return user-friendly error message. Consider suggesting password reset if user forgot they have an account. DO NOT retry with same email.


📖 [Source](https://firebase.google.com/docs/auth/admin/errors)

**🔴 ERROR - invalid-email**

**Condition:** Email format is invalid

**Throws:** `FirebaseAuthError with code 'auth/invalid-email'`

**Required Handling:**

Caller SHOULD validate email format before calling createUser. Use email validation library to prevent this error.


📖 [Source](https://firebase.google.com/docs/auth/admin/errors)

**🔴 ERROR - uid-already-exists**

**Condition:** Provided UID is already in use (when specifying custom UID)

**Throws:** `FirebaseAuthError with code 'auth/uid-already-exists'`

**Required Handling:**

If using custom UIDs, generate unique values. Catch this error and either generate new UID or handle collision.


📖 [Source](https://firebase.google.com/docs/auth/admin/errors)

**🔴 ERROR - invalid-password**

**Condition:** Password is too weak or doesn't meet requirements

**Throws:** `FirebaseAuthError with code 'auth/invalid-password'`

**Required Handling:**

Validate password strength on client side. Firebase requires minimum 6 characters. Return helpful error to user about password requirements.


📖 [Source](https://firebase.google.com/docs/auth/admin/manage-users)

---

### `getUser()`

Fetches user data by UID

**Import:**
```typescript
import { getUser } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - user-not-found**

**Condition:** No user record found for the given UID

**Throws:** `FirebaseAuthError with code 'auth/user-not-found'`

**Required Handling:**

Caller MUST handle user-not-found errors. DO NOT assume user exists - always catch this error. Consider if this indicates deleted account or invalid UID.


📖 [Source](https://firebase.google.com/docs/auth/admin/errors)

**🔴 ERROR - invalid-uid**

**Condition:** UID format is invalid

**Throws:** `FirebaseAuthError with code 'auth/invalid-uid'`

**Required Handling:**

Validate UID format before calling getUser. Firebase UIDs are typically 28-character strings.


📖 [Source](https://firebase.google.com/docs/auth/admin/errors)

---

### `updateUser()`

Updates an existing user's data

**Import:**
```typescript
import { updateUser } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - user-not-found**

**Condition:** No user record found for the given UID

**Throws:** `FirebaseAuthError with code 'auth/user-not-found'`

**Required Handling:**

Caller MUST handle user-not-found errors. Decide whether to create user or return error.


📖 [Source](https://firebase.google.com/docs/auth/admin/errors)

**🔴 ERROR - email-already-exists**

**Condition:** New email address is already in use by another user

**Throws:** `FirebaseAuthError with code 'auth/email-already-exists'`

**Required Handling:**

Check if new email is available before updating. Return user-friendly error if email is taken.


📖 [Source](https://firebase.google.com/docs/auth/admin/errors)

---

### `deleteUser()`

Deletes a user account

**Import:**
```typescript
import { deleteUser } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - user-not-found**

**Condition:** No user record found for the given UID

**Throws:** `FirebaseAuthError with code 'auth/user-not-found'`

**Required Handling:**

Caller SHOULD handle user-not-found errors gracefully. Consider if idempotent delete is acceptable (user already deleted).


📖 [Source](https://firebase.google.com/docs/auth/admin/errors)

---

### `getUserByEmail()`

Fetches user data by email address

**Import:**
```typescript
import { getUserByEmail } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - user-not-found**

**Condition:** No user record with the given email

**Throws:** `FirebaseAuthError with code 'auth/user-not-found'`

**Required Handling:**

Caller MUST handle user-not-found errors. This is common when checking if email is registered.


📖 [Source](https://firebase.google.com/docs/auth/admin/errors)

---

### `setCustomUserClaims()`

Sets custom claims for user tokens

**Import:**
```typescript
import { setCustomUserClaims } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - user-not-found**

**Condition:** No user record found

**Throws:** `FirebaseAuthError with code 'auth/user-not-found'`

**Required Handling:**

Verify user exists before setting claims.


📖 [Source](https://firebase.google.com/docs/auth/admin/errors)

**🔴 ERROR - invalid-claims**

**Condition:** Claims object exceeds 1000 bytes or uses reserved keys

**Throws:** `FirebaseAuthError with code 'auth/invalid-claims'`

**Required Handling:**

Validate claims size and avoid reserved keys. Reserved keys: iss, sub, aud, exp, iat, auth_time, nonce, etc.


📖 [Source](https://firebase.google.com/docs/auth/admin/custom-claims)

---

### `get()`

Reads Firestore document or collection data

**Import:**
```typescript
import { get } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - permission-denied**

**Condition:** Security rules deny read access

**Throws:** `Error with code 'PERMISSION_DENIED' (gRPC code 7)`

**Required Handling:**

Caller MUST handle permission errors. Check Firestore security rules. Admin SDK bypasses rules by default - if seeing this, check service account permissions.


📖 [Source](https://cloud.google.com/firestore/docs/understand-error-codes)

**🔴 ERROR - not-found**

**Condition:** Document does not exist

**Returns:** DocumentSnapshot with exists: false

**Required Handling:**

Caller MUST check snapshot.exists before accessing data. Use snapshot.exists or check if snapshot.data() is undefined.


📖 [Source](https://firebase.google.com/docs/firestore/query-data/get-data)

**🔴 ERROR - deadline-exceeded**

**Condition:** Operation timed out

**Throws:** `Error with code 'DEADLINE_EXCEEDED' (gRPC code 4)`

**Required Handling:**

Caller SHOULD implement retry with exponential backoff. Check network connectivity and Firestore status. Consider if query is too complex (missing indexes).


📖 [Source](https://cloud.google.com/firestore/docs/understand-error-codes)

---

### `add()`

Adds a new document to Firestore collection with auto-generated ID

**Import:**
```typescript
import { add } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - permission-denied**

**Condition:** Security rules deny write access

**Throws:** `Error with code 'PERMISSION_DENIED' (gRPC code 7)`

**Required Handling:**

Check Firestore security rules and service account permissions.


📖 [Source](https://cloud.google.com/firestore/docs/understand-error-codes)

**🔴 ERROR - resource-exhausted**

**Condition:** Write quota exceeded or rate limit hit

**Throws:** `Error with code 'RESOURCE_EXHAUSTED' (gRPC code 8)`

**Required Handling:**

Caller MUST handle quota errors. Check if billing is enabled (free tier limits). Implement backoff and reduce write rate. Avoid writing to lexicographically close documents (hot spots).


📖 [Source](https://firebase.google.com/docs/firestore/best-practices)

---

### `set()`

Writes or overwrites a Firestore document

**Import:**
```typescript
import { set } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - aborted**

**Condition:** Transaction aborted due to contention

**Throws:** `Error with code 'ABORTED' (gRPC code 10)`

**Required Handling:**

Caller SHOULD retry with exponential backoff and jitter. Occurs when multiple transactions access same data. Consider redesigning to reduce contention.


📖 [Source](https://cloud.google.com/firestore/docs/understand-error-codes)

**🔴 ERROR - resource-exhausted**

**Condition:** Write quota exceeded

**Throws:** `Error with code 'RESOURCE_EXHAUSTED'`

**Required Handling:**

Implement rate limiting and backoff. Check daily write quota and billing status.


📖 [Source](https://firebase.google.com/docs/firestore/best-practices)

---

### `update()`

Updates fields in existing Firestore document

**Import:**
```typescript
import { update } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - not-found**

**Condition:** Document to update does not exist

**Throws:** `Error with code 'NOT_FOUND' (gRPC code 5)`

**Required Handling:**

Caller MUST handle not-found errors. Use set() with merge: true if you want to create-or-update. update() requires document to exist.


📖 [Source](https://firebase.google.com/docs/firestore/manage-data/add-data)

**🔴 ERROR - aborted**

**Condition:** Transaction contention

**Throws:** `Error with code 'ABORTED'`

**Required Handling:**

Retry with exponential backoff.

📖 [Source](https://cloud.google.com/firestore/docs/understand-error-codes)

---

### `delete()`

Deletes a Firestore document

**Import:**
```typescript
import { delete } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - permission-denied**

**Condition:** Security rules deny delete access

**Throws:** `Error with code 'PERMISSION_DENIED'`

**Required Handling:**

Check security rules and permissions.

📖 [Source](https://cloud.google.com/firestore/docs/understand-error-codes)

---

### `send()`

Sends a message to a device via Firebase Cloud Messaging

**Import:**
```typescript
import { send } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - invalid-recipient**

**Condition:** Device token is invalid, expired, or unregistered

**Throws:** `FirebaseMessagingError with code 'messaging/invalid-recipient'`

**Required Handling:**

Caller MUST remove invalid tokens from database. Check error code and error.code === 'messaging/invalid-recipient'. Tokens can expire if user uninstalls app or revokes permissions.


📖 [Source](https://firebase.google.com/docs/cloud-messaging/error-codes)

**🔴 ERROR - invalid-argument**

**Condition:** Message payload is malformed or exceeds size limits

**Throws:** `FirebaseMessagingError with code 'messaging/invalid-argument'`

**Required Handling:**

Validate message structure before sending. Check payload size limits (4KB for data messages). Verify required fields are present.


📖 [Source](https://firebase.google.com/docs/cloud-messaging/error-codes)

**🔴 ERROR - quota-exceeded**

**Condition:** FCM rate limit exceeded

**Throws:** `FirebaseMessagingError with code 'messaging/quota-exceeded'`

**Required Handling:**

Implement exponential backoff retry. Reduce message send rate. Check if quota limit is reasonable for use case.


📖 [Source](https://firebase.google.com/docs/cloud-messaging/error-codes)

---

### `sendMulticast()`

Sends a message to multiple devices (up to 500)

**Import:**
```typescript
import { sendMulticast } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - partial-failure**

**Condition:** Some tokens succeeded, some failed

**Returns:** BatchResponse with failureCount > 0

**Required Handling:**

Caller MUST check response.failureCount and response.responses array. Each response contains success boolean and optional error. Remove invalid tokens from database based on specific error codes.


📖 [Source](https://firebase.google.com/docs/cloud-messaging/send-message)

**🔴 ERROR - invalid-argument**

**Condition:** Invalid tokens or payload

**Throws:** `FirebaseMessagingError`

**Required Handling:**

Validate all tokens and payload before sending.

📖 [Source](https://firebase.google.com/docs/cloud-messaging/error-codes)

---

### `sendToTopic()`

Sends a message to all devices subscribed to a topic

**Import:**
```typescript
import { sendToTopic } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - invalid-topic**

**Condition:** Topic name is invalid or doesn't exist

**Throws:** `FirebaseMessagingError with code 'messaging/invalid-argument'`

**Required Handling:**

Validate topic name format. Topic names must match /topics/[a-zA-Z0-9-_.~%]+


📖 [Source](https://firebase.google.com/docs/cloud-messaging/send-message#send-messages-to-topics)

---

### `once()`

Reads Realtime Database data once (non-listening)

**Import:**
```typescript
import { once } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - permission-denied**

**Condition:** Database rules deny read access

**Throws:** `Error with code 'PERMISSION_DENIED'`

**Required Handling:**

Check Realtime Database rules. Admin SDK bypasses rules by default - if seeing this, check databaseAuthVariableOverride.


📖 [Source](https://firebase.google.com/docs/database/admin/start)

**🔴 ERROR - network-error**

**Condition:** Network connection failed

**Throws:** `Error`

**Required Handling:**

Implement retry with exponential backoff for transient failures.


📖 [Source](https://firebase.google.com/docs/reference/admin/error-handling)

---

### `set()`

Writes data to Realtime Database path (overwrites)

**Import:**
```typescript
import { set } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - permission-denied**

**Condition:** Database rules deny write access

**Throws:** `Error with code 'PERMISSION_DENIED'`

**Required Handling:**

Check database rules and authentication.

📖 [Source](https://firebase.google.com/docs/database/admin/save-data)

---

### `update()`

Updates specific fields in Realtime Database

**Import:**
```typescript
import { update } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - permission-denied**

**Condition:** Database rules deny write access

**Throws:** `Error with code 'PERMISSION_DENIED'`

**Required Handling:**

Check database rules.

📖 [Source](https://firebase.google.com/docs/database/admin/save-data)

---

### `remove()`

Deletes data from Realtime Database path

**Import:**
```typescript
import { remove } from 'firebase-admin';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - permission-denied**

**Condition:** Database rules deny delete access

**Throws:** `Error with code 'PERMISSION_DENIED'`

**Required Handling:**

Check database rules.

📖 [Source](https://firebase.google.com/docs/database/admin/save-data)

---

## Example: Proper Error Handling

```typescript
import firebase-admin from 'firebase-admin';

async function example() {
  try {
    const result = await verifyIdToken(/* args */);
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
