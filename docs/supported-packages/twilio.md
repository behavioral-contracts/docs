---
title: "twilio"
---

# twilio

| Property | Value |
|----------|-------|
| **Package** | `twilio` |
| **Versions Covered** | `>=3.0.0 <6.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-25 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install twilio
```

## Covered Functions

This contract covers 5 function(s):

### `create()`

Sends SMS or MMS messages via Twilio API

**Import:**
```typescript
import { create } from 'twilio';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - messages-create-no-try-catch**

**Condition:** messages.create() called without try-catch or .catch() handler

**Throws:** RestException with error.code, error.status, and error.message

**Required Handling:**

MUST wrap await client.messages.create() in try-catch block. Catch block should check error instanceof RestException and handle specific error codes (14107 for rate limiting, 20003 for invalid credentials, 21211 for invalid phone numbers) appropriately.


📖 [Source](https://www.twilio.com/docs/api/errors)

**⚠️ WARNING - messages-create-generic-catch**

**Condition:** messages.create() in try-catch but doesn't check RestException

**Required Handling:**

SHOULD check error type using instanceof RestException and inspect error.code. Handle rate limiting (14107) with retry logic, authentication errors (20003/20005) by validating credentials, and validation errors (21211/21212) with user feedback.


📖 [Source](https://github.com/twilio/twilio-node)

**⚠️ WARNING - messages-create-rate-limit-not-handled**

**Condition:** Bulk SMS operations without rate limit handling

**Required Handling:**

SHOULD check for error.code === 14107 and implement exponential backoff retry logic. Consider using retry-after information if available.


📖 [Source](https://www.twilio.com/docs/api/errors)

---

### `create()`

Initiates voice calls via Twilio API

**Import:**
```typescript
import { create } from 'twilio';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - calls-create-no-try-catch**

**Condition:** calls.create() called without try-catch or .catch() handler

**Throws:** RestException with error.code, error.status, and error.message

**Required Handling:**

MUST wrap await client.calls.create() in try-catch block. Catch block should check error instanceof RestException for detailed error information.


📖 [Source](https://www.twilio.com/docs/api/errors)

---

### `create()`

Sends verification codes for two-factor authentication

**Import:**
```typescript
import { create } from 'twilio';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - verifications-create-no-try-catch**

**Condition:** verifications.create() called without try-catch

**Throws:** RestException with error.code, error.status, and error.message

**Required Handling:**

MUST wrap verification create call in try-catch block. Handle specific error codes for better user experience.


📖 [Source](https://www.twilio.com/docs/verify/api/verification)

---

### `twilio()`

Initializes Twilio REST API client with credentials

**Import:**
```typescript
import { twilio } from 'twilio';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - hardcoded-credentials**

**Condition:** Twilio client initialized with hardcoded credentials

**Required Handling:**

MUST use environment variables for credentials. Use process.env.TWILIO_ACCOUNT_SID and process.env.TWILIO_AUTH_TOKEN. Never commit credentials to version control.


📖 [Source](https://www.twilio.com/docs/usage/secure-credentials)

**⚠️ WARNING - missing-auth-error-early-detection**

**Condition:** Initial API call doesn't check for authentication errors

**Required Handling:**

SHOULD validate credentials with test API call during initialization. Check for error codes 20003 and 20005 to fail fast with clear error messages.


📖 [Source](https://www.twilio.com/docs/api/errors)

---

### `validateRequest()`

Validates incoming webhook request signatures

**Import:**
```typescript
import { validateRequest } from 'twilio';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - webhook-no-signature-validation**

**Condition:** Webhook endpoint doesn't validate request signature

**Required Handling:**

MUST validate webhook signatures using twilio.validateRequest() or twilio.validateExpressRequest(). Reject requests with invalid signatures (return 403).


📖 [Source](https://www.twilio.com/docs/usage/webhooks/webhooks-security)

---

## Example: Proper Error Handling

```typescript
import twilio from 'twilio';

async function example() {
  try {
    const result = await create(/* args */);
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
