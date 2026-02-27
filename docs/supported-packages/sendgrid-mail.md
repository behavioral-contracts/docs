---
title: @sendgrid/mail
---

# @sendgrid/mail

| Property | Value |
|----------|-------|
| **Package** | `@sendgrid/mail` |
| **Versions Covered** | `>=7.0.0 <9.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-24 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install @sendgrid/mail
```

## Covered Functions

This contract covers 3 function(s):

### `send()`

Sends a single email via SendGrid API

**Import:**
```typescript
import { send } from '@sendgrid/mail';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - send-no-try-catch**

**Condition:** send() called without try-catch or .catch() handler

**Throws:** `Error with error.response.body containing API error details`

**Required Handling:**

MUST wrap await sgMail.send() in try-catch block, or use .catch() to handle promise rejection. Catch block should check error.response.body for detailed API error information.


📖 [Source](https://github.com/sendgrid/sendgrid-nodejs/blob/main/docs/use-cases/success-failure-errors.md)

**⚠️ WARNING - send-no-error-response-check**

**Condition:** send() in try-catch but catch does not check error.response

**Required Handling:**

SHOULD check for error.response existence and log error.response.body for detailed API error information. This helps distinguish between network errors (no response) and API errors (response with error details).


📖 [Source](https://github.com/sendgrid/sendgrid-nodejs/blob/main/docs/use-cases/success-failure-errors.md)

---

### `sendMultiple()`

Sends multiple emails in parallel via SendGrid API

**Import:**
```typescript
import { sendMultiple } from '@sendgrid/mail';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - send-multiple-no-try-catch**

**Condition:** sendMultiple() called without try-catch or .catch() handler

**Throws:** `Error with error.response.body containing API error details`

**Required Handling:**

MUST wrap await sgMail.sendMultiple() in try-catch block. Should implement rate limiting protection and retry logic for 429 errors. Check error.response.body for detailed error information.


📖 [Source](https://github.com/sendgrid/sendgrid-nodejs/issues/1081)

---

### `setApiKey()`

Configures SendGrid API key for authentication

**Import:**
```typescript
import { setApiKey } from '@sendgrid/mail';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - api-key-not-validated**

**Condition:** setApiKey() called without trimming or validating API key

**Required Handling:**

SHOULD trim whitespace from API key using .trim() and validate key exists before setting: process.env.SENDGRID_API_KEY?.trim() || throw error


📖 [Source](https://github.com/sendgrid/sendgrid-nodejs/blob/main/TROUBLESHOOTING.md)

---

## Example: Proper Error Handling

```typescript
import mail from '@sendgrid/mail';

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
