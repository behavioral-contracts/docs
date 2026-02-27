---
title: got
---

# got

| Property | Value |
|----------|-------|
| **Package** | `got` |
| **Versions Covered** | `>=11.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `undefined` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install got
```

## Covered Functions

This contract covers 6 function(s):

### `default()`

Makes HTTP request (supports all HTTP methods via options or got.get/post/etc)

**Import:**
```typescript
import { default } from 'got';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - network-error-handling**

**Condition:** network failure, DNS error, timeout, connection refused, HTTP errors

**Throws:** `RequestError or HTTPError (Promise rejection)`

**Required Handling:**

Use try-catch (async/await) or .catch() (promises)

📖 [Source](https://www.npmjs.com/package/got)

---

### `get()`

Makes HTTP GET request

**Import:**
```typescript
import { get } from 'got';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - network-error-handling**

**Condition:** network failure, DNS error, timeout, connection refused, HTTP errors

**Throws:** `RequestError or HTTPError (Promise rejection)`

**Required Handling:**

Use try-catch (async/await) or .catch() (promises)

📖 [Source](https://www.npmjs.com/package/got)

---

### `post()`

Makes HTTP POST request

**Import:**
```typescript
import { post } from 'got';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - network-error-handling**

**Condition:** network failure, DNS error, timeout, connection refused, HTTP errors

**Throws:** `RequestError or HTTPError (Promise rejection)`

**Required Handling:**

Use try-catch (async/await) or .catch() (promises)

📖 [Source](https://www.npmjs.com/package/got)

---

### `put()`

Makes HTTP PUT request

**Import:**
```typescript
import { put } from 'got';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - network-error-handling**

**Condition:** network failure, DNS error, timeout, connection refused, HTTP errors

**Throws:** `RequestError or HTTPError (Promise rejection)`

**Required Handling:**

Use try-catch (async/await) or .catch() (promises)

📖 [Source](https://www.npmjs.com/package/got)

---

### `delete()`

Makes HTTP DELETE request

**Import:**
```typescript
import { delete } from 'got';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - network-error-handling**

**Condition:** network failure, DNS error, timeout, connection refused, HTTP errors

**Throws:** `RequestError or HTTPError (Promise rejection)`

**Required Handling:**

Use try-catch (async/await) or .catch() (promises)

📖 [Source](https://www.npmjs.com/package/got)

---

### `patch()`

Makes HTTP PATCH request

**Import:**
```typescript
import { patch } from 'got';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - network-error-handling**

**Condition:** network failure, DNS error, timeout, connection refused, HTTP errors

**Throws:** `RequestError or HTTPError (Promise rejection)`

**Required Handling:**

Use try-catch (async/await) or .catch() (promises)

📖 [Source](https://www.npmjs.com/package/got)

---

## Example: Proper Error Handling

```typescript
import got from 'got';

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

- [Contract Schema Reference](../contract-schema/schema-reference.md)
- [All Supported Packages](./overview.md)
- [How to Use verify-cli](../cli-reference/overview.md)
