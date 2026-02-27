---
title: "superagent"
---

# superagent

| Property | Value |
|----------|-------|
| **Package** | `superagent` |
| **Versions Covered** | `>=3.7.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install superagent
```

## Covered Functions

This contract covers 7 function(s):

### `get()`

Makes HTTP GET request

**Import:**
```typescript
import { get } from 'superagent';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - network-error-handling**

**Condition:** network failure, DNS error, timeout, connection refused, HTTP 4xx/5xx errors

**Throws:** Error with status, response, timeout fields (Promise rejection)

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) or .end() callback

📖 [Source](https://forwardemail.github.io/superagent/)

---

### `post()`

Makes HTTP POST request

**Import:**
```typescript
import { post } from 'superagent';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - network-error-handling**

**Condition:** network failure, DNS error, timeout, connection refused, HTTP 4xx/5xx errors

**Throws:** Error with status, response, timeout fields (Promise rejection)

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) or .end() callback

📖 [Source](https://forwardemail.github.io/superagent/)

---

### `put()`

Makes HTTP PUT request

**Import:**
```typescript
import { put } from 'superagent';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - network-error-handling**

**Condition:** network failure, DNS error, timeout, connection refused, HTTP 4xx/5xx errors

**Throws:** Error with status, response, timeout fields (Promise rejection)

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) or .end() callback

📖 [Source](https://forwardemail.github.io/superagent/)

---

### `patch()`

Makes HTTP PATCH request

**Import:**
```typescript
import { patch } from 'superagent';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - network-error-handling**

**Condition:** network failure, DNS error, timeout, connection refused, HTTP 4xx/5xx errors

**Throws:** Error with status, response, timeout fields (Promise rejection)

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) or .end() callback

📖 [Source](https://forwardemail.github.io/superagent/)

---

### `delete()`

Makes HTTP DELETE request

**Import:**
```typescript
import { delete } from 'superagent';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - network-error-handling**

**Condition:** network failure, DNS error, timeout, connection refused, HTTP 4xx/5xx errors

**Throws:** Error with status, response, timeout fields (Promise rejection)

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) or .end() callback

📖 [Source](https://forwardemail.github.io/superagent/)

---

### `del()`

Makes HTTP DELETE request (IE-compatible alias)

**Import:**
```typescript
import { del } from 'superagent';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - network-error-handling**

**Condition:** network failure, DNS error, timeout, connection refused, HTTP 4xx/5xx errors

**Throws:** Error with status, response, timeout fields (Promise rejection)

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) or .end() callback

📖 [Source](https://forwardemail.github.io/superagent/)

---

### `head()`

Makes HTTP HEAD request

**Import:**
```typescript
import { head } from 'superagent';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - network-error-handling**

**Condition:** network failure, DNS error, timeout, connection refused, HTTP 4xx/5xx errors

**Throws:** Error with status, response, timeout fields (Promise rejection)

**Required Handling:**

Use try-catch (async/await) or .catch() (promises) or .end() callback

📖 [Source](https://forwardemail.github.io/superagent/)

---

## Example: Proper Error Handling

```typescript
import superagent from 'superagent';

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
