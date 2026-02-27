---
title: "stripe"
---

# stripe

| Property | Value |
|----------|-------|
| **Package** | `stripe` |
| **Versions Covered** | `>=8.0.0 <16.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-24 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install stripe
```

## Covered Functions

This contract covers 4 function(s):

### `create()`

Creates a Stripe resource (charge, paymentIntent, customer, refund, etc.)

**Import:**
```typescript
import { create } from 'stripe';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - card-error**

**Condition:** Card was declined or invalid

**Throws:** StripeCardError with error.type === 'card_error'

**Required Handling:**

Caller MUST catch StripeCardError and handle gracefully. Display user-friendly message based on error.decline_code. DO NOT retry card_error without user intervention.


📖 [Source](https://stripe.com/docs/error-handling)

**🔴 ERROR - rate-limit-error**

**Condition:** Too many API requests

**Throws:** StripeRateLimitError with error.type === 'rate_limit_error'

**Required Handling:**

Caller MUST implement exponential backoff retry logic. Stripe rate limits are per-account, not per-key.


📖 [Source](https://stripe.com/docs/rate-limits)

**🔴 ERROR - authentication-error**

**Condition:** Invalid API key

**Throws:** StripeAuthenticationError with error.type === 'authentication_error'

**Required Handling:**

Caller MUST NOT retry. This indicates configuration error. Log error and alert operations team immediately.


📖 [Source](https://stripe.com/docs/error-handling)

**🔴 ERROR - network-error**

**Condition:** Network connectivity issue

**Throws:** Error with no error.type (connection error)

**Required Handling:**

Caller MUST handle network errors separately from Stripe API errors. Implement retry with exponential backoff (max 3 attempts).


📖 [Source](https://stripe.com/docs/error-handling)

---

### `confirm()`

Confirms a PaymentIntent to complete the payment

**Import:**
```typescript
import { confirm } from 'stripe';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - card-error**

**Condition:** Card declined during confirmation

**Throws:** StripeCardError

**Required Handling:**

Return to payment form, allow user to update payment method

📖 [Source](https://stripe.com/docs/error-handling)

**🔴 ERROR - rate-limit-error**

**Condition:** Rate limit exceeded

**Throws:** StripeRateLimitError

**Required Handling:**

Implement exponential backoff

📖 [Source](https://stripe.com/docs/rate-limits)

**🔴 ERROR - authentication-error**

**Condition:** Invalid API key

**Throws:** StripeAuthenticationError

**Required Handling:**

DO NOT retry, alert operations

📖 [Source](https://stripe.com/docs/error-handling)

**🔴 ERROR - network-error**

**Condition:** Network error during confirmation

**Throws:** Network error

**Required Handling:**

Retry with idempotency key. Query payment status before creating new PaymentIntent.

📖 [Source](https://stripe.com/docs/error-handling)

---

### `constructEvent()`

Verifies and constructs an event from webhook payload

**Import:**
```typescript
import { constructEvent } from 'stripe';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - signature-verification-failed**

**Condition:** Webhook signature is invalid

**Throws:** StripeSignatureVerificationError

**Required Handling:**

Return 400 Bad Request immediately. DO NOT process the webhook. Log the error for security monitoring (possible attack).


📖 [Source](https://stripe.com/docs/webhooks/signatures)

**🔴 ERROR - timestamp-too-old**

**Condition:** Webhook timestamp is too old (replay attack)

**Throws:** StripeSignatureVerificationError with 'Timestamp outside the tolerance zone' message

**Required Handling:**

Return 400. This prevents replay attacks.

📖 [Source](https://stripe.com/docs/webhooks/signatures)

---

### `retrieve()`

Retrieves a Stripe resource (customer, paymentIntent, etc.)

**Import:**
```typescript
import { retrieve } from 'stripe';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - resource-not-found**

**Condition:** Resource ID does not exist

**Throws:** StripeInvalidRequestError with code 'resource_missing'

**Required Handling:**

Handle missing resource gracefully. DO NOT retry.

📖 [Source](https://stripe.com/docs/api/errors)

**🔴 ERROR - rate-limit-error**

**Condition:** Rate limit exceeded

**Throws:** StripeRateLimitError

**Required Handling:**

Implement exponential backoff

📖 [Source](https://stripe.com/docs/rate-limits)

**🔴 ERROR - authentication-error**

**Condition:** Invalid API key

**Throws:** StripeAuthenticationError

**Required Handling:**

DO NOT retry, alert operations

📖 [Source](https://stripe.com/docs/error-handling)

**🔴 ERROR - network-error**

**Condition:** Network error

**Throws:** Network error

**Required Handling:**

Retry with exponential backoff

📖 [Source](https://stripe.com/docs/error-handling)

---

## Example: Proper Error Handling

```typescript
import stripe from 'stripe';

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

- [Contract Schema Reference](../contract-schema/schema-reference)
- [All Supported Packages](./overview)
- [How to Use verify-cli](../cli-reference/overview)
