---
title: "sinon"
---

# sinon

| Property | Value |
|----------|-------|
| **Package** | `sinon` |
| **Versions Covered** | `>=1.0.0` |
| **Contract Version** | `2.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install sinon
```

## Covered Functions

This contract covers 6 function(s):

### `stub()`

Creates a test stub that can replace functions and track calls

**Import:**
```typescript
import { stub } from 'sinon';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - stub-must-restore**

**Condition:** sinon.stub(obj, 'method') is called

**Throws:** TypeError: Attempted to wrap [method] which is already wrapped

**Required Handling:**

MUST call stub.restore() in afterEach or finally block to clean up stubs. Failure to restore causes "already wrapped" errors in subsequent tests. Best practice: Use sandboxes with sandbox.restore() in afterEach. Pattern: const sandbox = sinon.createSandbox(); afterEach(() = sandbox.restore());


📖 [Source](https://github.com/sinonjs/sinon/issues/1673)

**🔴 ERROR - stub-non-existent-property**

**Condition:** sinon.stub is called on non-existent or non-function property

**Throws:** TypeError: Attempted to wrap undefined property [name]

**Required Handling:**

MUST verify property exists and is a function before stubbing. Pattern: if (typeof obj.method === 'function')  sinon.stub(obj, 'method'); 


📖 [Source](https://github.com/sinonjs/sinon/issues/1762)

**🔴 ERROR - stub-returns-arg-invalid-index**

**Condition:** stub.returnsArg(index) is called with index = argument count

**Throws:** TypeError: index unavailable

**Required Handling:**

MUST ensure argument index exists before calling stub.returnsArg(index). Note: Prior to v6.1.2 returns undefined; v6.1.2+ throws TypeError.


📖 [Source](https://sinonjs.org/releases/latest/stubs/)

**🔴 ERROR - stub-calls-arg-not-function**

**Condition:** stub.callsArg(index) is called with non-function argument

**Throws:** TypeError: index missing or not a function

**Required Handling:**

MUST verify argument at index is a function before calling stub.callsArg(index).


📖 [Source](https://sinonjs.org/releases/latest/stubs/)

**🔴 ERROR - stub-yields-no-callback**

**Condition:** stub.yields() is called but stub was never called with a function argument

**Throws:** Error: stub was never called with a function argument

**Required Handling:**

MUST ensure stub is called with at least one function argument before using yields().


📖 [Source](https://sinonjs.org/releases/latest/stubs/)

---

### `spy()`

Creates a spy that wraps a function and tracks calls

**Import:**
```typescript
import { spy } from 'sinon';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - spy-first-call-null-access**

**Condition:** spy.firstCall is accessed when spy was never called

**Throws:** TypeError: Cannot read property 'args' of null

**Required Handling:**

MUST check spy.called before accessing spy.firstCall, spy.lastCall, or spy.getCall(n). Best practice: Use spy.calledWith(arg) instead of direct call access. Pattern: if (spy.called)  spy.firstCall.args 


📖 [Source](https://github.com/sinonjs/sinon/issues/1936)

**🔴 ERROR - spy-must-restore**

**Condition:** sinon.spy(obj, 'method') is called

**Throws:** TypeError: Attempted to wrap [method] which is already wrapped

**Required Handling:**

MUST call spy.restore() in afterEach or finally block. Use sandboxes for automatic cleanup: sandbox.spy(obj, 'method'); afterEach(() = sandbox.restore());


📖 [Source](https://github.com/sinonjs/sinon/issues/1775)

---

### `mock()`

Creates a mock object with pre-programmed expectations

**Import:**
```typescript
import { mock } from 'sinon';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - mock-verify-not-called**

**Condition:** mock.expects() is called but mock.verify() is never called

**Throws:** Silent failure - expectations not enforced

**Required Handling:**

MUST call mock.verify() or sandbox.verifyAndRestore() to enforce expectations. Without verification, tests pass even when expectations are not met. Pattern: afterEach(() =  mock.verify(); ) or sandbox.verifyAndRestore()


📖 [Source](https://sinonjs.org/releases/latest/mocks/)

**ℹ️ INFO - mock-verify-fails**

**Condition:** mock.verify() is called and expectations are not met

**Throws:** ExpectationError

**Required Handling:**

This is expected behavior when expectations fail. Ensure expectations match actual usage.


📖 [Source](https://sinonjs.org/releases/latest/mocks/)

---

### `useFakeTimers()`

Replaces global timer functions with fake implementations

**Import:**
```typescript
import { useFakeTimers } from 'sinon';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - fake-timers-must-restore**

**Condition:** sinon.useFakeTimers() is called

**Throws:** Test hangs, setTimeout/setInterval never fire in subsequent tests

**Required Handling:**

MUST call clock.restore() in afterEach or finally block. Failure to restore causes timer pollution and test hangs. Pattern: let clock; beforeEach(() = clock = sinon.useFakeTimers()); afterEach(() = clock.restore());


📖 [Source](https://sinonjs.org/releases/latest/fake-timers/)

---

### `createSandbox()`

Creates a sandbox for managing test doubles with automatic cleanup

**Import:**
```typescript
import { createSandbox } from 'sinon';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - sandbox-must-restore**

**Condition:** sinon.createSandbox() is called

**Throws:** Test pollution, 'already wrapped' errors in subsequent tests

**Required Handling:**

MUST call sandbox.restore() in afterEach or finally block. Sandboxes simplify cleanup but still require explicit restoration. Pattern: const sandbox = sinon.createSandbox(); afterEach(() = sandbox.restore());


📖 [Source](https://sinonjs.org/releases/latest/sandbox/)

---

### `createStubInstance()`

Creates a stub instance without invoking constructor

**Import:**
```typescript
import { createStubInstance } from 'sinon';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - create-stub-instance-double-use**

**Condition:** sinon.createStubInstance is called twice on same constructor without cleanup

**Throws:** TypeError: Attempted to wrap [method] which is already wrapped

**Required Handling:**

MUST restore or use different sandbox between createStubInstance calls. Pattern: Use sandbox.createStubInstance() and restore sandbox between uses.


📖 [Source](https://github.com/sinonjs/sinon/issues/852)

---

## Example: Proper Error Handling

```typescript
import sinon from 'sinon';

async function example() {
  try {
    const result = await stub(/* args */);
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
