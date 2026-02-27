---
title: square
---

# square

| Property | Value |
|----------|-------|
| **Package** | `square` |
| **Versions Covered** | `>=8.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-25 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install square
```

## Covered Functions

This contract covers 10 function(s):

### `create()`

Creates a Square payment via the Payments API

**Import:**
```typescript
import { create } from 'square';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - invalid-request-error**

**Condition:** Invalid request parameters (missing required fields, invalid values)

**Throws:** `SquareError with 4xx statusCode`

**Required Handling:**

Caller MUST catch SquareError and validate request parameters. Check err.body and err.errors array for specific validation failures. DO NOT retry without fixing the request parameters.


📖 [Source](https://developer.squareup.com/docs/sdks/nodejs/quick-start)

**🔴 ERROR - authentication-error**

**Condition:** Invalid or expired access token

**Throws:** `SquareError with statusCode 401`

**Required Handling:**

Caller MUST NOT retry. This indicates invalid credentials. Log error and alert operations team to check API credentials.


📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

**🔴 ERROR - rate-limit-error**

**Condition:** Too many API requests

**Throws:** `SquareError with statusCode 429`

**Required Handling:**

Caller MUST implement exponential backoff retry logic. SDK automatically retries on 429 (default: 2 attempts). For extended rate limiting, implement backoff with longer delays.


📖 [Source](https://developer.squareup.com/docs/build-basics/common-api-patterns/rate-limiting)

**🔴 ERROR - payment-declined**

**Condition:** Payment method declined or card verification failed

**Throws:** `SquareError with statusCode 422 and payment-specific error codes`

**Required Handling:**

Caller MUST handle payment failures gracefully. Check err.errors array for specific decline reasons. Display user-friendly message and allow payment method update. DO NOT retry declined payments without user intervention.


📖 [Source](https://developer.squareup.com/docs/payments-api/error-handling)

**🔴 ERROR - idempotency-conflict**

**Condition:** Idempotency key already used with different parameters

**Throws:** `SquareError with statusCode 409`

**Required Handling:**

Caller MUST generate a new idempotency key. This indicates duplicate request with conflicting data. Either retry with new key or retrieve the original result.


📖 [Source](https://developer.squareup.com/docs/build-basics/common-api-patterns/idempotency)

**🔴 ERROR - server-error**

**Condition:** Square server error

**Throws:** `SquareError with 5xx statusCode`

**Required Handling:**

Caller MUST implement retry with exponential backoff. SDK automatically retries 5xx errors (default: 2 attempts). Log error and monitor for persistent issues.


📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

**🔴 ERROR - network-error**

**Condition:** Network connectivity issue or timeout

**Throws:** `SquareError with statusCode 408 or connection error`

**Required Handling:**

Caller MUST implement retry with exponential backoff. SDK automatically retries 408 timeout errors (default: 2 attempts). Use idempotency keys to prevent duplicate charges on retry.


📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

---

### `createPayment()`

Creates a payment using PaymentsApi (legacy method)

**Import:**
```typescript
import { createPayment } from 'square';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - invalid-request-error**

**Condition:** Invalid request parameters

**Throws:** `SquareError with 4xx statusCode`

**Required Handling:**

Validate request parameters. DO NOT retry without fixing issues.

📖 [Source](https://developer.squareup.com/docs/payments-api/error-handling)

**🔴 ERROR - authentication-error**

**Condition:** Invalid credentials

**Throws:** `SquareError with statusCode 401`

**Required Handling:**

DO NOT retry. Alert operations team.

📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

**🔴 ERROR - rate-limit-error**

**Condition:** Rate limit exceeded

**Throws:** `SquareError with statusCode 429`

**Required Handling:**

Implement exponential backoff

📖 [Source](https://developer.squareup.com/docs/build-basics/common-api-patterns/rate-limiting)

**🔴 ERROR - payment-declined**

**Condition:** Payment declined

**Throws:** `SquareError with statusCode 422`

**Required Handling:**

Handle gracefully, allow user to update payment method

📖 [Source](https://developer.squareup.com/docs/payments-api/error-handling)

**🔴 ERROR - network-error**

**Condition:** Network error

**Throws:** `SquareError with statusCode 408 or connection error`

**Required Handling:**

Retry with idempotency key

📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

---

### `createOrder()`

Creates an order via the Orders API

**Import:**
```typescript
import { createOrder } from 'square';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - invalid-request-error**

**Condition:** Invalid order data

**Throws:** `SquareError with 4xx statusCode`

**Required Handling:**

Validate order line items, prices, and location_id. Check err.errors array for specific validation issues.


📖 [Source](https://developer.squareup.com/docs/orders-api/error-scenarios)

**🔴 ERROR - authentication-error**

**Condition:** Invalid credentials

**Throws:** `SquareError with statusCode 401`

**Required Handling:**

DO NOT retry. Check API credentials.

📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

**🔴 ERROR - rate-limit-error**

**Condition:** Rate limit exceeded

**Throws:** `SquareError with statusCode 429`

**Required Handling:**

Implement exponential backoff

📖 [Source](https://developer.squareup.com/docs/build-basics/common-api-patterns/rate-limiting)

**🔴 ERROR - network-error**

**Condition:** Network error

**Throws:** `SquareError`

**Required Handling:**

Retry with idempotency key

📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

---

### `updateOrder()`

Updates an existing order

**Import:**
```typescript
import { updateOrder } from 'square';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - order-not-found**

**Condition:** Order ID does not exist

**Throws:** `SquareError with statusCode 404`

**Required Handling:**

Handle missing order gracefully. DO NOT retry.

📖 [Source](https://developer.squareup.com/docs/orders-api/error-scenarios)

**🔴 ERROR - invalid-version**

**Condition:** Order version mismatch (concurrent update)

**Throws:** `SquareError with 409 statusCode`

**Required Handling:**

Retrieve latest order version and retry with correct version. This prevents overwriting concurrent updates.


📖 [Source](https://developer.squareup.com/docs/orders-api/manage-orders)

**🔴 ERROR - authentication-error**

**Condition:** Invalid credentials

**Throws:** `SquareError with statusCode 401`

**Required Handling:**

DO NOT retry. Check credentials.

📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

**🔴 ERROR - rate-limit-error**

**Condition:** Rate limit exceeded

**Throws:** `SquareError with statusCode 429`

**Required Handling:**

Implement exponential backoff

📖 [Source](https://developer.squareup.com/docs/build-basics/common-api-patterns/rate-limiting)

---

### `createCustomer()`

Creates a customer via the Customers API

**Import:**
```typescript
import { createCustomer } from 'square';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - invalid-request-error**

**Condition:** Invalid customer data

**Throws:** `SquareError with 4xx statusCode`

**Required Handling:**

Validate customer fields. Check err.errors for details.

📖 [Source](https://developer.squareup.com/docs/customers-api/use-the-api)

**🔴 ERROR - duplicate-customer**

**Condition:** Customer with same email or phone already exists

**Throws:** `SquareError with statusCode 409`

**Required Handling:**

Handle duplicate gracefully. Either retrieve existing customer or update existing customer instead of creating new one.


📖 [Source](https://developer.squareup.com/docs/customers-api/use-the-api)

**🔴 ERROR - authentication-error**

**Condition:** Invalid credentials

**Throws:** `SquareError with statusCode 401`

**Required Handling:**

DO NOT retry. Check credentials.

📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

**🔴 ERROR - rate-limit-error**

**Condition:** Rate limit exceeded

**Throws:** `SquareError with statusCode 429`

**Required Handling:**

Implement exponential backoff

📖 [Source](https://developer.squareup.com/docs/build-basics/common-api-patterns/rate-limiting)

---

### `retrieveCustomer()`

Retrieves a customer by ID

**Import:**
```typescript
import { retrieveCustomer } from 'square';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - customer-not-found**

**Condition:** Customer ID does not exist

**Throws:** `SquareError with statusCode 404`

**Required Handling:**

Handle missing customer gracefully. DO NOT retry.

📖 [Source](https://developer.squareup.com/docs/customers-api/use-the-api)

**🔴 ERROR - authentication-error**

**Condition:** Invalid credentials

**Throws:** `SquareError with statusCode 401`

**Required Handling:**

DO NOT retry. Check credentials.

📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

**🔴 ERROR - rate-limit-error**

**Condition:** Rate limit exceeded

**Throws:** `SquareError with statusCode 429`

**Required Handling:**

Implement exponential backoff

📖 [Source](https://developer.squareup.com/docs/build-basics/common-api-patterns/rate-limiting)

---

### `list()`

Lists locations via the Locations API

**Import:**
```typescript
import { list } from 'square';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - authentication-error**

**Condition:** Invalid credentials

**Throws:** `SquareError with statusCode 401`

**Required Handling:**

DO NOT retry. Check credentials.

📖 [Source](https://developer.squareup.com/docs/sdks/nodejs/quick-start)

**🔴 ERROR - rate-limit-error**

**Condition:** Rate limit exceeded

**Throws:** `SquareError with statusCode 429`

**Required Handling:**

Implement exponential backoff

📖 [Source](https://developer.squareup.com/docs/build-basics/common-api-patterns/rate-limiting)

**🔴 ERROR - network-error**

**Condition:** Network error

**Throws:** `SquareError with statusCode 408 or connection error`

**Required Handling:**

Retry with exponential backoff

📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

---

### `retrieveOrder()`

Retrieves an existing order by ID

**Import:**
```typescript
import { retrieveOrder } from 'square';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - order-not-found**

**Condition:** Order ID does not exist

**Throws:** `SquareError with statusCode 404`

**Required Handling:**

Handle missing order gracefully. DO NOT retry.

📖 [Source](https://developer.squareup.com/docs/orders-api/error-scenarios)

**🔴 ERROR - authentication-error**

**Condition:** Invalid credentials

**Throws:** `SquareError with statusCode 401`

**Required Handling:**

DO NOT retry. Check credentials.

📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

**🔴 ERROR - rate-limit-error**

**Condition:** Rate limit exceeded

**Throws:** `SquareError with statusCode 429`

**Required Handling:**

Implement exponential backoff

📖 [Source](https://developer.squareup.com/docs/build-basics/common-api-patterns/rate-limiting)

**🔴 ERROR - network-error**

**Condition:** Network error

**Throws:** `SquareError`

**Required Handling:**

Retry with exponential backoff

📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

---

### `getPayment()`

Retrieves a payment by ID via Payments API

**Import:**
```typescript
import { getPayment } from 'square';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - payment-not-found**

**Condition:** Payment ID does not exist

**Throws:** `SquareError with statusCode 404`

**Required Handling:**

Handle missing payment gracefully. DO NOT retry.

📖 [Source](https://developer.squareup.com/docs/payments-api/error-handling)

**🔴 ERROR - authentication-error**

**Condition:** Invalid credentials

**Throws:** `SquareError with statusCode 401`

**Required Handling:**

DO NOT retry. Check credentials.

📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

**🔴 ERROR - rate-limit-error**

**Condition:** Rate limit exceeded

**Throws:** `SquareError with statusCode 429`

**Required Handling:**

Implement exponential backoff

📖 [Source](https://developer.squareup.com/docs/build-basics/common-api-patterns/rate-limiting)

**🔴 ERROR - network-error**

**Condition:** Network error

**Throws:** `SquareError`

**Required Handling:**

Retry with exponential backoff

📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

---

### `createPaymentLink()`

Creates a payment link via Checkout API

**Import:**
```typescript
import { createPaymentLink } from 'square';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - invalid-request-error**

**Condition:** Invalid request parameters

**Throws:** `SquareError with 4xx statusCode`

**Required Handling:**

Validate request parameters. DO NOT retry without fixing issues.

📖 [Source](https://developer.squareup.com/docs/checkout-api/error-handling)

**🔴 ERROR - authentication-error**

**Condition:** Invalid credentials

**Throws:** `SquareError with statusCode 401`

**Required Handling:**

DO NOT retry. Check credentials.

📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

**🔴 ERROR - rate-limit-error**

**Condition:** Rate limit exceeded

**Throws:** `SquareError with statusCode 429`

**Required Handling:**

Implement exponential backoff

📖 [Source](https://developer.squareup.com/docs/build-basics/common-api-patterns/rate-limiting)

**🔴 ERROR - network-error**

**Condition:** Network error

**Throws:** `SquareError`

**Required Handling:**

Retry with idempotency key

📖 [Source](https://developer.squareup.com/docs/sdks/nodejs)

---

## Example: Proper Error Handling

```typescript
import square from 'square';

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
