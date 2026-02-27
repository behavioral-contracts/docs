---
title: "request-promise"
---

# request-promise

| Property | Value |
|----------|-------|
| **Package** | `request-promise` |
| **Versions Covered** | `>=4.2.6` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install request-promise
```

## Covered Functions

This contract covers 7 function(s):

### `default()`

Makes HTTP request with promise support (DEPRECATED - wraps request library)

**Import:**
```typescript
import { default } from 'request-promise';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - http-status-code-errors**

**Condition:** non-2xx HTTP status codes (4xx, 5xx) when options.simple=true (default)

**Throws:** Promise rejection with StatusCodeError containing statusCode, body, options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle HTTP errors

📖 [Source](https://github.com/request/request-promise - StatusCodeError for non-2xx responses)

**🔴 ERROR - network-request-errors**

**Condition:** network failures (ENOTFOUND, ECONNREFUSED, ETIMEDOUT), DNS errors, connection refused

**Throws:** Promise rejection with RequestError containing cause (original error), options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle network failures

📖 [Source](https://npmdoc.github.io/node-npmdoc-request-promise/build/apidoc.html - RequestError documentation)

**🔴 ERROR - transform-errors**

**Condition:** response transformation failures (e.g., JSON parsing errors)

**Throws:** Promise rejection with TransformError containing cause (transform error), options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle parsing errors

📖 [Source](https://github.com/request/request-promise - TransformError for transformation failures)

---

### `get()`

Makes HTTP GET request (DEPRECATED)

**Import:**
```typescript
import { get } from 'request-promise';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - http-status-code-errors**

**Condition:** non-2xx HTTP status codes (4xx, 5xx) when options.simple=true (default)

**Throws:** Promise rejection with StatusCodeError containing statusCode, body, options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle HTTP errors

📖 [Source](https://github.com/request/request-promise - StatusCodeError for non-2xx responses)

**🔴 ERROR - network-request-errors**

**Condition:** network failures (ENOTFOUND, ECONNREFUSED, ETIMEDOUT), DNS errors, connection refused

**Throws:** Promise rejection with RequestError containing cause (original error), options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle network failures

📖 [Source](https://npmdoc.github.io/node-npmdoc-request-promise/build/apidoc.html - RequestError documentation)

**🔴 ERROR - transform-errors**

**Condition:** response transformation failures (e.g., JSON parsing errors)

**Throws:** Promise rejection with TransformError containing cause (transform error), options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle parsing errors

📖 [Source](https://github.com/request/request-promise - TransformError for transformation failures)

---

### `post()`

Makes HTTP POST request (DEPRECATED)

**Import:**
```typescript
import { post } from 'request-promise';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - http-status-code-errors**

**Condition:** non-2xx HTTP status codes (4xx, 5xx) when options.simple=true (default)

**Throws:** Promise rejection with StatusCodeError containing statusCode, body, options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle HTTP errors

📖 [Source](https://github.com/request/request-promise - StatusCodeError for non-2xx responses)

**🔴 ERROR - network-request-errors**

**Condition:** network failures (ENOTFOUND, ECONNREFUSED, ETIMEDOUT), DNS errors, connection refused

**Throws:** Promise rejection with RequestError containing cause (original error), options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle network failures

📖 [Source](https://npmdoc.github.io/node-npmdoc-request-promise/build/apidoc.html - RequestError documentation)

**🔴 ERROR - transform-errors**

**Condition:** response transformation failures (e.g., JSON parsing errors)

**Throws:** Promise rejection with TransformError containing cause (transform error), options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle parsing errors

📖 [Source](https://github.com/request/request-promise - TransformError for transformation failures)

---

### `put()`

Makes HTTP PUT request (DEPRECATED)

**Import:**
```typescript
import { put } from 'request-promise';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - http-status-code-errors**

**Condition:** non-2xx HTTP status codes (4xx, 5xx) when options.simple=true (default)

**Throws:** Promise rejection with StatusCodeError containing statusCode, body, options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle HTTP errors

📖 [Source](https://github.com/request/request-promise - StatusCodeError for non-2xx responses)

**🔴 ERROR - network-request-errors**

**Condition:** network failures (ENOTFOUND, ECONNREFUSED, ETIMEDOUT), DNS errors, connection refused

**Throws:** Promise rejection with RequestError containing cause (original error), options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle network failures

📖 [Source](https://npmdoc.github.io/node-npmdoc-request-promise/build/apidoc.html - RequestError documentation)

**🔴 ERROR - transform-errors**

**Condition:** response transformation failures (e.g., JSON parsing errors)

**Throws:** Promise rejection with TransformError containing cause (transform error), options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle parsing errors

📖 [Source](https://github.com/request/request-promise - TransformError for transformation failures)

---

### `delete()`

Makes HTTP DELETE request (DEPRECATED)

**Import:**
```typescript
import { delete } from 'request-promise';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - http-status-code-errors**

**Condition:** non-2xx HTTP status codes (4xx, 5xx) when options.simple=true (default)

**Throws:** Promise rejection with StatusCodeError containing statusCode, body, options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle HTTP errors

📖 [Source](https://github.com/request/request-promise - StatusCodeError for non-2xx responses)

**🔴 ERROR - network-request-errors**

**Condition:** network failures (ENOTFOUND, ECONNREFUSED, ETIMEDOUT), DNS errors, connection refused

**Throws:** Promise rejection with RequestError containing cause (original error), options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle network failures

📖 [Source](https://npmdoc.github.io/node-npmdoc-request-promise/build/apidoc.html - RequestError documentation)

**🔴 ERROR - transform-errors**

**Condition:** response transformation failures (e.g., JSON parsing errors)

**Throws:** Promise rejection with TransformError containing cause (transform error), options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle parsing errors

📖 [Source](https://github.com/request/request-promise - TransformError for transformation failures)

---

### `patch()`

Makes HTTP PATCH request (DEPRECATED)

**Import:**
```typescript
import { patch } from 'request-promise';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - http-status-code-errors**

**Condition:** non-2xx HTTP status codes (4xx, 5xx) when options.simple=true (default)

**Throws:** Promise rejection with StatusCodeError containing statusCode, body, options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle HTTP errors

📖 [Source](https://github.com/request/request-promise - StatusCodeError for non-2xx responses)

**🔴 ERROR - network-request-errors**

**Condition:** network failures (ENOTFOUND, ECONNREFUSED, ETIMEDOUT), DNS errors, connection refused

**Throws:** Promise rejection with RequestError containing cause (original error), options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle network failures

📖 [Source](https://npmdoc.github.io/node-npmdoc-request-promise/build/apidoc.html - RequestError documentation)

**🔴 ERROR - transform-errors**

**Condition:** response transformation failures (e.g., JSON parsing errors)

**Throws:** Promise rejection with TransformError containing cause (transform error), options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle parsing errors

📖 [Source](https://github.com/request/request-promise - TransformError for transformation failures)

---

### `head()`

Makes HTTP HEAD request (DEPRECATED)

**Import:**
```typescript
import { head } from 'request-promise';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - http-status-code-errors**

**Condition:** non-2xx HTTP status codes (4xx, 5xx) when options.simple=true (default)

**Throws:** Promise rejection with StatusCodeError containing statusCode, body, options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle HTTP errors

📖 [Source](https://github.com/request/request-promise - StatusCodeError for non-2xx responses)

**🔴 ERROR - network-request-errors**

**Condition:** network failures (ENOTFOUND, ECONNREFUSED, ETIMEDOUT), DNS errors, connection refused

**Throws:** Promise rejection with RequestError containing cause (original error), options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle network failures

📖 [Source](https://npmdoc.github.io/node-npmdoc-request-promise/build/apidoc.html - RequestError documentation)

**🔴 ERROR - transform-errors**

**Condition:** response transformation failures (e.g., JSON parsing errors)

**Throws:** Promise rejection with TransformError containing cause (transform error), options, response

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) to handle parsing errors

📖 [Source](https://github.com/request/request-promise - TransformError for transformation failures)

---

## Example: Proper Error Handling

```typescript
import request-promise from 'request-promise';

async function example() {
  try {
    const result = await default(/* args */);
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
