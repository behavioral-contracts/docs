---
title: "axios"
---

# axios

| Property | Value |
|----------|-------|
| **Package** | `axios` |
| **Versions Covered** | `>=1.0.0 <2.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-23 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install axios
```

## Covered Functions

This contract covers 5 function(s):

### `get()`

Makes an HTTP GET request to the specified URL

**Import:**
```typescript
import { get } from 'axios';
```

#### Preconditions

What must be true **before** calling this function:

**⚠️ WARNING - absolute-url-node**

URL must be absolute when running in Node.js environments

📖 [Source](https://axios-http.com/docs/req_config)

#### Postconditions

What happens **after** calling this function:

**ℹ️ INFO - success-2xx**

**Condition:** response status is 2xx

**Returns:**

AxiosResponse object with data, status, statusText, headers, config, and request fields

📖 [Source](https://axios-http.com/docs/res_schema)

**🔴 ERROR - error-4xx-5xx**

**Condition:** response status is 4xx or 5xx and validateStatus is default

**Throws:** AxiosError with error.response containing the error response

**Required Handling:**

Caller MUST catch AxiosError and check error.response.status to distinguish between client errors (4xx) and server errors (5xx).


📖 [Source](https://axios-http.com/docs/handling_errors)

**🔴 ERROR - rate-limited-429**

**Condition:** response status is 429 (Too Many Requests)

**Throws:** AxiosError with error.response.status === 429

**Required Handling:**

Caller MUST either: 1. Implement exponential backoff retry logic with the Retry-After header, OR 2. Explicitly handle 429 as a terminal error and surface to the user, OR 3. Use a request queue that respects rate limits. Silently catching and ignoring 429 without retry logic is a violation.


📖 [Source](https://axios-http.com/docs/handling_errors)

**🔴 ERROR - network-failure**

**Condition:** network error, connection timeout, or DNS resolution failure

**Throws:** AxiosError with error.request populated but error.response === undefined

**Required Handling:**

Caller MUST check if error.response exists before accessing error.response.status. Network errors have error.request but NO error.response property. Code that assumes error.response is always present will crash.


📖 [Source](https://axios-http.com/docs/handling_errors)

**⚠️ WARNING - request-setup-error**

**Condition:** error during request setup (before request is sent)

**Throws:** AxiosError with both error.request === undefined and error.response === undefined

**Required Handling:**

Caller MUST handle errors where neither error.request nor error.response exist. These are configuration or setup errors.


📖 [Source](https://axios-http.com/docs/handling_errors)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - relative-url-node**

Passing relative URLs (e.g., '/api/users') throws error in Node.js but works in browsers

📖 [Source](https://github.com/axios/axios/issues/1212)

**ℹ️ INFO - timeout-default-zero**

Default timeout is 0 (no timeout). Production code should set explicit timeout values.

📖 [Source](https://axios-http.com/docs/req_config)

**ℹ️ INFO - request-cancellation**

Cancelled requests throw AxiosError with error.code === 'ERR_CANCELED'

📖 [Source](https://axios-http.com/docs/cancellation)

---

### `post()`

Makes an HTTP POST request to the specified URL with request body

**Import:**
```typescript
import { post } from 'axios';
```

#### Postconditions

What happens **after** calling this function:

**ℹ️ INFO - success-2xx**

**Condition:** response status is 2xx

**Returns:**

AxiosResponse object

📖 [Source](https://axios-http.com/docs/res_schema)

**🔴 ERROR - error-4xx-5xx**

**Condition:** response status is 4xx or 5xx

**Throws:** AxiosError with error.response

**Required Handling:**

Caller MUST catch AxiosError and inspect error.response.status

📖 [Source](https://axios-http.com/docs/handling_errors)

**🔴 ERROR - rate-limited-429**

**Condition:** response status is 429

**Throws:** AxiosError with error.response.status === 429

**Required Handling:**

For POST requests, retry logic MUST be idempotency-aware. Either use idempotency keys or handle 429 as terminal error.


📖 [Source](https://axios-http.com/docs/handling_errors)

**🔴 ERROR - network-failure**

**Condition:** network error, timeout, or DNS failure

**Throws:** AxiosError with error.response === undefined

**Required Handling:**

Check error.response exists before accessing error.response.status

📖 [Source](https://axios-http.com/docs/handling_errors)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - retry-post-idempotency**

Retrying POST requests can cause duplicate operations. Use idempotency keys for unsafe operations.

📖 [Source](https://axios-http.com/docs/req_config)

---

### `put()`

Makes an HTTP PUT request to the specified URL

**Import:**
```typescript
import { put } from 'axios';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - error-handling**

**Condition:** response status is 4xx or 5xx

**Throws:** AxiosError

**Required Handling:**

Caller MUST catch AxiosError and inspect error.response.status

📖 [Source](https://axios-http.com/docs/handling_errors)

**🔴 ERROR - network-failure**

**Condition:** network error or timeout

**Throws:** AxiosError with error.response === undefined

**Required Handling:**

Check error.response exists before accessing error.response.status

📖 [Source](https://axios-http.com/docs/handling_errors)

---

### `delete()`

Makes an HTTP DELETE request to the specified URL

**Import:**
```typescript
import { delete } from 'axios';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - error-handling**

**Condition:** response status is 4xx or 5xx

**Throws:** AxiosError

**Required Handling:**

Caller MUST catch AxiosError and inspect error.response.status

📖 [Source](https://axios-http.com/docs/handling_errors)

**🔴 ERROR - network-failure**

**Condition:** network error or timeout

**Throws:** AxiosError with error.response === undefined

**Required Handling:**

Check error.response exists before accessing error.response.status

📖 [Source](https://axios-http.com/docs/handling_errors)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - retry-delete-idempotency**

DELETE is idempotent by HTTP spec, but implementations may vary. Verify your API's behavior.

📖 [Source](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE)

---

### `request()`

Makes an HTTP request with full config object (generic method)

**Import:**
```typescript
import { request } from 'axios';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - error-4xx-5xx**

**Condition:** response status is 4xx or 5xx

**Throws:** AxiosError with error.response

**Required Handling:**

Caller MUST catch AxiosError and check error.response.status to distinguish between client errors (4xx) and server errors (5xx)

📖 [Source](https://axios-http.com/docs/handling_errors)

**🔴 ERROR - rate-limited-429**

**Condition:** response status is 429 (Too Many Requests)

**Throws:** AxiosError with error.response.status === 429

**Required Handling:**

Caller MUST either: 1. Implement exponential backoff retry logic with the Retry-After header, OR 2. Explicitly handle 429 as a terminal error and surface to the user, OR 3. Use a request queue that respects rate limits. For non-idempotent methods (POST), ensure retry safety with idempotency keys.


📖 [Source](https://axios-http.com/docs/handling_errors)

**🔴 ERROR - network-failure**

**Condition:** network error or timeout

**Throws:** AxiosError with error.response === undefined

**Required Handling:**

Caller MUST check if error.response exists before accessing properties. Network errors have error.request but NO error.response property.

📖 [Source](https://axios-http.com/docs/handling_errors)

---

## Example: Proper Error Handling

```typescript
import axios from 'axios';

async function example() {
  try {
    const result = await get(/* args */);
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
