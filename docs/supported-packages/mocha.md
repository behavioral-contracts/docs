---
title: "mocha"
---

# mocha

| Property | Value |
|----------|-------|
| **Package** | `mocha` |
| **Versions Covered** | `>=8.0.0 <12.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install mocha
```

## Covered Functions

This contract covers 6 function(s):

### `it()`

Defines a test case that may be synchronous or asynchronous

**Import:**
```typescript
import { it } from 'mocha';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - it-async-unhandled-rejection**

**Condition:** test function is async or returns a Promise that rejects

**Throws:** UnhandledPromiseRejectionWarning

**Required Handling:**

Test functions that return promises or use async/await MUST handle rejections. Without proper error handling, unhandled promise rejections in tests cause test failures to be reported incorrectly or crash the test runner. Use pattern: it('test', async () =  try  await operation();  catch (e)  throw e;  ) or rely on Mocha's built-in async handling.


📖 [Source](https://mochajs.org/#asynchronous-code)

---

### `before()`

Defines a hook that runs before all tests in a suite

**Import:**
```typescript
import { before } from 'mocha';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - before-async-unhandled-rejection**

**Condition:** hook function is async or returns a Promise that rejects

**Throws:** UnhandledPromiseRejectionWarning

**Required Handling:**

Before hooks that return promises MUST handle rejections properly. Unhandled rejections in before hooks cause test suite failures without clear error messages. Use async/await or return promises that are properly handled.


📖 [Source](https://mochajs.org/#hooks)

---

### `after()`

Defines a hook that runs after all tests in a suite

**Import:**
```typescript
import { after } from 'mocha';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - after-async-unhandled-rejection**

**Condition:** hook function is async or returns a Promise that rejects

**Throws:** UnhandledPromiseRejectionWarning

**Required Handling:**

After hooks that return promises MUST handle rejections properly. Unhandled rejections in cleanup hooks can leave resources in inconsistent states. Use async/await or return promises that are properly handled.


📖 [Source](https://mochajs.org/#hooks)

---

### `beforeEach()`

Defines a hook that runs before each test in a suite

**Import:**
```typescript
import { beforeEach } from 'mocha';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - beforeeach-async-unhandled-rejection**

**Condition:** hook function is async or returns a Promise that rejects

**Throws:** UnhandledPromiseRejectionWarning

**Required Handling:**

BeforeEach hooks that return promises MUST handle rejections properly. Unhandled rejections cause individual test failures without clear attribution.


📖 [Source](https://mochajs.org/#hooks)

---

### `afterEach()`

Defines a hook that runs after each test in a suite

**Import:**
```typescript
import { afterEach } from 'mocha';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - aftereach-async-unhandled-rejection**

**Condition:** hook function is async or returns a Promise that rejects

**Throws:** UnhandledPromiseRejectionWarning

**Required Handling:**

AfterEach hooks that return promises MUST handle rejections properly. Unhandled rejections in cleanup can leave test environment in bad state.


📖 [Source](https://mochajs.org/features/hooks/)

**⚠️ WARNING - aftereach-resource-leak**

**Condition:** hook has async cleanup (server.close(), db.disconnect()) but doesn't await it

**Throws:** Mocha hangs, won't exit (requires --exit flag)

**Required Handling:**

AfterEach hooks with async cleanup MUST await completion or return promises. Common mistake: afterEach(() =  server.close(); ) instead of afterEach(async () =  await server.close(); ). Unclosed resources (servers, database connections, file handles) prevent Mocha from exiting. Frequency: 25-35% of resource cleanup bugs.


📖 [Source](https://www.mindfulchase.com/explore/troubleshooting-tips/testing-frameworks/troubleshooting-mocha-flaky-tests,-async-bugs,-and-ci-failures.html)

---

### `describe()`

Defines a test suite (must be synchronous)

**Import:**
```typescript
import { describe } from 'mocha';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - describe-must-be-sync**

**Condition:** describe() callback is async or contains await

**Throws:** Undefined behavior - async code in describe not awaited

**Required Handling:**

describe() callbacks MUST be synchronous. Mocha does NOT await async code in describe blocks. Common mistake: describe('Suite', async () =  const data = await fetchData(); ... ) - data will be undefined. Use before() hook for async setup: before(async () =  data = await fetchData(); ). Frequency: 15-20% of suite setup bugs.


📖 [Source](https://mochajs.org/next/features/asynchronous-code/)

---

## Example: Proper Error Handling

## See Also

- [Contract Schema Reference](../contract-schema/schema-reference)
- [All Supported Packages](./overview)
- [How to Use verify-cli](../cli-reference/overview)
