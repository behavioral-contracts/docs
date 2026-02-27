---
title: "socket.io-client"
---

# socket.io-client

| Property | Value |
|----------|-------|
| **Package** | `socket.io-client` |
| **Versions Covered** | `>=4.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install socket.io-client
```

## Covered Functions

This contract covers 2 function(s):

### `io()`

Creates Socket.IO client connection to server

**Import:**
```typescript
import socket from 'socket';
socket.io(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connect-error-event**

**Condition:** connection fails

**Throws:** emits 'connect_error' event

**Required Handling:**

Caller MUST attach connect_error event listener to handle connection failures.

Without error handling:
- Applications crash with uncaught exceptions (Node.js)
- Silent failures confuse users (browser)
- Stale data displayed without indication
- Operations attempted while disconnected

socket.active attribute indicates whether automatic reconnection will occur:
- socket.active = true: Temporary failure, auto-reconnect enabled
- socket.active = false: Server rejected (auth failure), manual reconnect required


📖 [Source](https://socket.io/docs/v4/client-api/)

**⚠️ WARNING - disconnect-event**

**Condition:** socket disconnects

**Throws:** emits 'disconnect' event with reason

**Required Handling:**

Caller SHOULD attach disconnect event listener to handle unexpected disconnections.

Without disconnect handling:
- User unaware of connection loss
- Application shows stale data
- Operations continue while offline
- Confusing user experience

Disconnect reasons and auto-reconnect behavior:
- 'io server disconnect': Server closed connection (NO auto-reconnect)
- 'io client disconnect': socket.disconnect() called (NO auto-reconnect)
- 'ping timeout': Heartbeat timeout (auto-reconnects)
- 'transport close': Connection unexpectedly closed (auto-reconnects)
- 'transport error': Connection error (auto-reconnects)


📖 [Source](https://socket.io/docs/v4/client-socket-instance/)

**⚠️ WARNING - parser-error-event**

**Condition:** parser encounters malformed packet

**Throws:** may emit 'error' event or enter limbo state

**Required Handling:**

Caller SHOULD attach error event listener to handle parser/transport errors.

Known issue (GitHub #1551):
- Parser errors may not fire any event
- Connection can enter limbo state
- Particularly problematic with binary data
- No way to recover without page reload

Workaround: socket.io.on('error', handler) may catch some errors


📖 [Source](https://github.com/socketio/socket.io-client/issues/1551)

---

### `emit()`

Emits an event to the server (on socket instance)

**Import:**
```typescript
import socket from 'socket';
socket.emit(...);
```

#### Postconditions

What happens **after** calling this function:

**ℹ️ INFO - acknowledgement-timeout**

**Condition:** server does not acknowledge within timeout

**Returns:**

callback invoked with timeout error

**Required Handling:**

Caller SHOULD use .timeout() modifier when emitting events that expect acknowledgements.

Without timeout:
- Infinite loading states if server never responds
- Callback never called
- Poor user experience
- No error feedback

Usage: socket.timeout(5000).emit('event', data, (err, response) =  ... )
Promise-based: await socket.timeout(10000).emitWithAck('event', data)


📖 [Source](https://socket.io/docs/v4/client-api/)

---

## Example: Proper Error Handling

```typescript
import socket.io-client from 'socket.io-client';

async function example() {
  try {
    const result = await io(/* args */);
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
