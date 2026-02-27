---
title: ws
---

# ws

| Property | Value |
|----------|-------|
| **Package** | `ws` |
| **Versions Covered** | `>=8.17.1` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install ws
```

## Covered Functions

This contract covers 4 function(s):

### `WebSocket()`

Creates WebSocket client connection

**Import:**
```typescript
import { WebSocket } from 'ws';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - missing-error-handler**

**Condition:** WebSocket instance created without error event handler

**Throws:** `Emits 'error' event that crashes process if not handled`

**Required Handling:**

Caller MUST attach error event handler immediately after creating WebSocket. Without error handler, unhandled 'error' events crash the entire Node.js process. CRITICAL: This is the #1 production bug (60% of codebases). Always add: ws.on('error', (error) => { handle_error(error); })


📖 [Source](https://github.com/websockets/ws/issues/246)

**🔴 ERROR - connection-error**

**Condition:** Connection fails (network error, DNS failure, timeout, handshake failure)

**Throws:** `Emits 'error' event with Error object`

**Required Handling:**

Caller MUST handle connection errors via error event handler. Common errors: ECONNREFUSED, ENOTFOUND, ETIMEDOUT, ECONNRESET. Error event is emitted before close event. Implement reconnection logic with exponential backoff.


📖 [Source](https://github.com/websockets/ws/blob/master/doc/ws.md#event-error)

**🔴 ERROR - protocol-violation**

**Condition:** WebSocket protocol violation (invalid frames, reserved bits set)

**Throws:** `Emits 'error' event and closes connection with code 1002`

**Required Handling:**

Caller MUST handle protocol errors. Usually indicates server or client implementation bug. Close code 1002 means protocol error. DO NOT RETRY - fix implementation.


📖 [Source](https://tools.ietf.org/html/rfc6455#section-7.4.1)

**⚠️ WARNING - missing-close-handler**

**Condition:** Connection closes but no close event handler attached

**Throws:** `Emits 'close' event with code and reason`

**Required Handling:**

Caller SHOULD handle close events for cleanup and reconnection. Close codes: 1000 (normal), 1006 (abnormal), 1009 (too big), etc. Code 1006 indicates abnormal close (connection lost) - SHOULD reconnect. Code 1000 indicates normal close - DO NOT reconnect. Remove event listeners in close handler to prevent memory leaks.


📖 [Source](https://websocket.org/reference/close-codes/)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - no-reconnection-logic**

CRITICAL (70% of codebases): No reconnection logic on close event. Connection breaks and stays broken until page reload. ALWAYS implement exponential backoff reconnection: const delay = Math.min(1000 * Math.pow(2, attempts), 30000); const jitter = Math.random() * 1000; setTimeout(reconnect, delay + jitter); Reset attempt counter on successful connection. Include max retry limit (e.g., 10 attempts).


📖 [Source](https://dev.to/hexshift/robust-websocket-reconnection-strategies-in-javascript-with-exponential-backoff-40n1)

**⚠️ WARNING - no-heartbeat**

COMMON: No heartbeat/ping-pong mechanism for long-lived connections. Results in zombie connections (appear connected but actually dead). SERVER: Send ping every 30s, terminate if no pong received. CLIENT: Monitor ping timing, reconnect if heartbeat timeout exceeded. Use ws.isAlive pattern with pong event handler.


📖 [Source](https://oneuptime.com/blog/post/2026-02-24-websocket-heartbeat-ping-pong/view)

---

### `send()`

Sends data through WebSocket connection

**Import:**
```typescript
import { send } from 'ws';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - send-before-open**

**Condition:** send() called before connection is open (readyState !== OPEN)

**Throws:** `Error: WebSocket is not open: readyState X (CONNECTING|CLOSING|CLOSED)`

**Required Handling:**

Caller MUST check readyState before sending OR send only in open event. VERY COMMON BUG (50% of codebases): Sending immediately after new WebSocket(). CORRECT: ws.on('open', () => { ws.send(data); }) CORRECT: if (ws.readyState === WebSocket.OPEN) { ws.send(data); } WRONG: ws.send(data); // Immediately after new WebSocket() - crashes!


📖 [Source](https://github.com/websockets/ws/issues/1170)

**⚠️ WARNING - backpressure-exceeded**

**Condition:** Send buffer full (bufferedAmount exceeds threshold)

**Throws:** `Does NOT throw, but causes memory exhaustion and OOM crashes`

**Required Handling:**

Caller MUST check bufferedAmount before sending in high-throughput scenarios. If bufferedAmount > threshold (e.g., 1 MB), pause sending. Wait for drain event before resuming. WITHOUT backpressure handling: memory leak, OOM crash. Example: if (ws.bufferedAmount > 1024*1024) { pause_sending(); }


📖 [Source](https://skylinecodes.substack.com/p/backpressure-in-websocket-streams)

**🔴 ERROR - message-too-large**

**Condition:** Message size exceeds maxPayload

**Throws:** `RangeError: Invalid WebSocket frame: payload length > maxPayload`

**Required Handling:**

Caller MUST validate message size before sending. Configure maxPayload appropriately (default 100 MiB may be too high). Connection closes with code 1009 (message too big). Split large messages into chunks or use chunking protocol.


📖 [Source](https://github.com/websockets/ws/issues/1543)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - broadcasting-without-readystate-check**

COMMON: Broadcasting to all clients without checking readyState. Results in errors when sending to closing/closed connections. ALWAYS check: wss.clients.forEach(client => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(data);
  }
}); Without check: errors thrown for every closed connection.


📖 [Source](https://github.com/websockets/ws/blob/master/doc/ws.md#how-to-broadcast-a-message-to-all-clients)

---

### `WebSocketServer()`

Creates WebSocket server

**Import:**
```typescript
import { WebSocketServer } from 'ws';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - server-error**

**Condition:** Server error (port in use, permission denied, etc.)

**Throws:** `Emits 'error' event on server`

**Required Handling:**

Caller MUST attach error event handler to server. Common errors: EADDRINUSE (port in use), EACCES (permission denied). Without handler, errors crash the process.


📖 [Source](https://github.com/websockets/ws/blob/master/doc/ws.md#event-error-1)

**⚠️ WARNING - client-error-before-connection**

**Condition:** Client error before connection established (handshake failure)

**Throws:** `Emits 'wsClientError' event on server`

**Required Handling:**

Caller SHOULD handle wsClientError for errors during handshake. Prevents crashes from malformed upgrade requests. This event is emitted BEFORE connection event.


📖 [Source](https://github.com/websockets/ws/blob/master/doc/ws.md#event-wsclienterror)

**⚠️ WARNING - no-origin-validation**

**Condition:** Server accepts connections without origin validation

**Throws:** `Does NOT throw, but allows cross-origin attacks`

**Required Handling:**

Caller MUST validate origin in production via verifyClient callback. WITHOUT validation: any website can connect to your WebSocket server. SECURITY RISK: Cross-Site WebSocket Hijacking (CSWSH). Example: new WebSocketServer({
  verifyClient: (info) => {
    return allowedOrigins.includes(info.origin);
  }
});


📖 [Source](https://owasp.org/www-community/vulnerabilities/Cross-Site_WebSocket_Hijacking)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - no-maxpayload-limit**

SECURITY: Not configuring maxPayload allows DoS via large messages. Default 100 MiB is often too high for production. ALWAYS configure: new WebSocketServer({ maxPayload: 10 * 1024 * 1024 }) Set to appropriate limit for your use case (e.g., 10 MB). Prevents CVE-2016-10542 style attacks.


📖 [Source](https://nvd.nist.gov/vuln/detail/CVE-2016-10542)

**ℹ️ INFO - memory-leak-event-listeners**

COMMON: Not removing event listeners on connection close. Each connection adds listeners, but they're never removed. Results in memory leak as listener count grows unbounded. ALWAYS: ws.on('close', () => { ws.removeAllListeners(); }); Alternatively, use once() for one-time events.


📖 [Source](https://github.com/websockets/ws/issues/1334)

---

### `close()`

Closes WebSocket connection

**Import:**
```typescript
import { close } from 'ws';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - close-emits-event**

**Condition:** Connection closes (gracefully or abnormally)

**Throws:** `Emits 'close' event with code and reason`

**Required Handling:**

Caller SHOULD handle close event for cleanup. Close codes indicate reason: 1000 (normal), 1006 (abnormal), etc. Code 1006 means connection lost without close frame (network issue). Code 1000 means clean shutdown. Code 1009 means message too big. Remove event listeners to prevent memory leaks.


📖 [Source](https://websocket.org/reference/close-codes/)

---

## Example: Proper Error Handling

```typescript
import ws from 'ws';

async function example() {
  try {
    const result = await WebSocket(/* args */);
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
