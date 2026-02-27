---
title: "winston"
---

# winston

| Property | Value |
|----------|-------|
| **Package** | `winston` |
| **Versions Covered** | `>=3.0.0 <4.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install winston
```

## Covered Functions

This contract covers 2 function(s):

### `createLogger()`

Creates a logger instance

**Import:**
```typescript
import { createLogger } from 'winston';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - logger-transport-errors**

**Condition:** transport fails (file write error, network error, permission denied)

**Returns:**

logger instance that silently fails without error listener

**Required Handling:**

Caller MUST attach 'error' event listener to logger and transports to handle transport failures. Without listener, errors are silently ignored and logs may be lost.

📖 [Source](https://github.com/winstonjs/winston#handling-uncaught-exceptions-with-winston)

---

### `log()`

Logs a message

**Import:**
```typescript
import { log } from 'winston';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - log-transport-failure**

**Condition:** transport fails during log write (file system full, network down, permissions)

**Returns:**

void (operation may fail silently)

**Required Handling:**

Caller MUST attach 'error' event listener to logger to detect transport failures. Use logger.on('error', handler) to prevent silent log loss.

📖 [Source](https://github.com/winstonjs/winston#awaiting-logs-to-be-written-in-winston)

---

## Example: Proper Error Handling

## See Also

- [Contract Schema Reference](../contract-schema/schema-reference)
- [All Supported Packages](./overview)
- [How to Use verify-cli](../cli-reference/overview)
