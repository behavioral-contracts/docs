---
title: "lodash"
---

# lodash

| Property | Value |
|----------|-------|
| **Package** | `lodash` |
| **Versions Covered** | `>=4.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `draft` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install lodash
```

## Covered Functions

This contract covers 9 function(s):

### `template()`

Compiles a template string into a function

**Import:**
```typescript
import { template } from 'lodash';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - syntax-error**

**Condition:** template string has invalid syntax

**Throws:** SyntaxError

**Required Handling:**

Caller MUST wrap in try-catch if template comes from untrusted input

📖 [Source](https://lodash.com/docs/#template)

---

### `attempt()`

Attempts to invoke a function, returning an Error on failure

**Import:**
```typescript
import { attempt } from 'lodash';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - function-error**

**Condition:** wrapped function throws

**Returns:**

Error instance

**Required Handling:**

Caller MUST check if result is Error using _.isError()

📖 [Source](https://lodash.com/docs/#attempt)

---

### `merge()`

Recursively merges own and inherited enumerable properties

**Import:**
```typescript
import { merge } from 'lodash';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - prototype-pollution**

**Condition:** source objects contain __proto__, constructor, or prototype keys

**Throws:** Prototype pollution vulnerability

**Required Handling:**

Caller MUST validate input objects to exclude __proto__, constructor, and prototype keys when merging untrusted data

📖 [Source](https://github.com/lodash/lodash/security/advisories (CVE-2019-10744))

---

### `mergeWith()`

Like merge but accepts customizer to control merging

**Import:**
```typescript
import { mergeWith } from 'lodash';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - prototype-pollution**

**Condition:** source objects contain __proto__, constructor, or prototype keys

**Throws:** Prototype pollution vulnerability

**Required Handling:**

Caller MUST validate input objects to exclude __proto__, constructor, and prototype keys when merging untrusted data

📖 [Source](https://github.com/lodash/lodash/security/advisories (CVE-2019-10744))

---

### `defaultsDeep()`

Recursively assigns default properties

**Import:**
```typescript
import { defaultsDeep } from 'lodash';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - prototype-pollution**

**Condition:** source objects contain __proto__, constructor, or prototype keys

**Throws:** Prototype pollution vulnerability

**Required Handling:**

Caller MUST validate input objects to exclude __proto__, constructor, and prototype keys when using with untrusted data

📖 [Source](https://github.com/lodash/lodash/security/advisories (CVE-2019-10744))

---

### `setWith()`

Sets value at path of object with customizer

**Import:**
```typescript
import { setWith } from 'lodash';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - prototype-pollution**

**Condition:** path contains __proto__, constructor, or prototype

**Throws:** Prototype pollution vulnerability

**Required Handling:**

Caller MUST validate paths to exclude __proto__, constructor, and prototype when using with untrusted input

📖 [Source](https://github.com/lodash/lodash/security/advisories (CVE-2019-10744))

---

### `zipObjectDeep()`

Creates object with deep property paths

**Import:**
```typescript
import { zipObjectDeep } from 'lodash';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - prototype-pollution**

**Condition:** property paths contain __proto__, constructor, or prototype

**Throws:** Prototype pollution vulnerability

**Required Handling:**

Caller MUST validate property paths to exclude __proto__, constructor, and prototype when using with untrusted input

📖 [Source](https://security.snyk.io/vuln/SNYK-JS-LODASH-590103 (CVE-2020-8203))

---

### `unset()`

Removes property at path of object

**Import:**
```typescript
import { unset } from 'lodash';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - prototype-pollution**

**Condition:** path contains __proto__, constructor, or prototype

**Throws:** Prototype pollution vulnerability allowing prototype method deletion

**Required Handling:**

Caller MUST validate paths to exclude __proto__, constructor, and prototype when using with untrusted input. Upgrade to lodash 4.17.23+

📖 [Source](https://github.com/lodash/lodash/security/advisories/GHSA-xxjr-mmjv-4gpg (CVE-2025-13465))

---

### `omit()`

Creates object with specified properties omitted

**Import:**
```typescript
import { omit } from 'lodash';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - prototype-pollution**

**Condition:** property paths contain __proto__, constructor, or prototype

**Throws:** Prototype pollution vulnerability allowing prototype method deletion

**Required Handling:**

Caller MUST validate property paths to exclude __proto__, constructor, and prototype when using with untrusted input. Upgrade to lodash 4.17.23+

📖 [Source](https://github.com/lodash/lodash/security/advisories/GHSA-xxjr-mmjv-4gpg (CVE-2025-13465))

---

## Example: Proper Error Handling

```typescript
import lodash from 'lodash';

async function example() {
  try {
    const result = await template(/* args */);
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
