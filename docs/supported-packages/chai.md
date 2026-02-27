---
title: "chai"
---

# chai

| Property | Value |
|----------|-------|
| **Package** | `chai` |
| **Versions Covered** | `>=4.0.0 <6.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install chai
```

## Covered Functions

This contract covers 3 function(s):

### `expect()`

BDD-style assertion with chainable interface

**Import:**
```typescript
import { expect } from 'chai';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - expect-assertion-failure**

**Condition:** assertion fails (e.g., expect(value).to.equal(expected) when value !== expected)

**Throws:** AssertionError

**Required Handling:**

Assertions are EXPECTED to throw in test code, but if used outside tests (e.g., in production validation), callers MUST wrap in try-catch. Without error handling, failed assertions crash the application. Use pattern: try  expect(value).to.equal(expected);  catch (error)  /* handle */ 


📖 [Source](https://www.chaijs.com/api/bdd/)

---

### `assert()`

Classic assert-style assertions

**Import:**
```typescript
import { assert } from 'chai';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - assert-assertion-failure**

**Condition:** assertion fails (e.g., assert.equal(actual, expected) when actual !== expected)

**Throws:** AssertionError

**Required Handling:**

Assert-style assertions throw AssertionError on failure. In test code, this is expected. If used in production code, MUST wrap in try-catch to prevent crashes.


📖 [Source](https://www.chaijs.com/api/assert/)

---

### `should()`

Should-style chainable assertions

**Import:**
```typescript
import { should } from 'chai';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - should-assertion-failure**

**Condition:** assertion fails (e.g., value.should.equal(expected) when value !== expected)

**Throws:** AssertionError

**Required Handling:**

Should-style assertions throw AssertionError on failure. Primarily for test code. If used outside tests, MUST wrap in try-catch.


📖 [Source](https://www.chaijs.com/api/bdd/)

---

## Example: Proper Error Handling

## See Also

- [Contract Schema Reference](../contract-schema/schema-reference)
- [All Supported Packages](./overview)
- [How to Use verify-cli](../cli-reference/overview)
