---
title: socket.io
---

# socket.io

| Property | Value |
|----------|-------|
| **Package** | `socket.io` |
| **Versions Covered** | `^4.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install socket.io
```

## Covered Functions

This contract covers 2 function(s):

### `emit()`

Emits an event to connected clients

**Import:**
```typescript
import socket from 'socket';
socket.emit(...);
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - emit-no-error-handling**

**Condition:** emit fails due to disconnected client or serialization error

**Throws:** `Error may be thrown or silently fail`

**Required Handling:**

Register 'error' event listener or wrap emit in try-catch when using acknowledgement callbacks

📖 [Source](https://socket.io/docs/v4/emitting-events/)

---

### `on()`

Registers event handler

**Import:**
```typescript
import socket from 'socket';
socket.on(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - on-handler-no-error-handling**

**Condition:** async operation within event handler throws

**Throws:** `Unhandled promise rejection crashes server`

**Required Handling:**

Wrap all async operations inside event handlers with try-catch blocks

📖 [Source](https://socket.io/docs/v4/listening-to-events/)

---

## Example: Proper Error Handling

## See Also

- [Contract Schema Reference](../contract-schema/schema-reference.md)
- [All Supported Packages](./overview.md)
- [How to Use verify-cli](../cli-reference/overview.md)
