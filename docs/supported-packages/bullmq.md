---
title: "bullmq"
---

# bullmq

| Property | Value |
|----------|-------|
| **Package** | `bullmq` |
| **Versions Covered** | `>=5.0.0 <6.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install bullmq
```

## Covered Functions

This contract covers 4 function(s):

### `add()`

Adds a job to the queue with a payload

**Import:**
```typescript
import { add } from 'bullmq';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - queue-add-redis-error**

**Condition:** Redis connection fails or is down during add operation

**Throws:** Error with Redis connection failure details

**Required Handling:**

Caller MUST wrap Queue.add() in try-catch to handle Redis connection errors. Redis downtime crashes application if unhandled. Use try-catch to gracefully degrade or retry.

📖 [Source](https://docs.bullmq.io/guide/queues)

---

### `addBulk()`

Adds multiple jobs to the queue in bulk

**Import:**
```typescript
import { addBulk } from 'bullmq';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - queue-addbulk-redis-error**

**Condition:** Redis connection fails during bulk operation

**Throws:** Error causing partial or complete bulk operation failure

**Required Handling:**

Caller MUST wrap Queue.addBulk() in try-catch to handle Redis errors. Bulk operations can partially fail if Redis connection is lost - must handle to prevent data loss.

📖 [Source](https://docs.bullmq.io/guide/queues)

---

### `process()`

Worker method that processes jobs from the queue

**Import:**
```typescript
import { process } from 'bullmq';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - worker-process-job-error**

**Condition:** job processing throws error or promise rejects

**Throws:** Error causing job to fail and trigger retry logic if configured

**Required Handling:**

Worker processor SHOULD handle job errors gracefully with try-catch to control retry behavior and provide meaningful error messages. Unhandled errors in processor can cause worker to stop processing subsequent jobs.

📖 [Source](https://docs.bullmq.io/guide/workers)

---

### `close()`

Closes queue or worker Redis connection

**Import:**
```typescript
import { close } from 'bullmq';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - close-error**

**Condition:** connection close operation fails (timeout, Redis error)

**Throws:** Error during connection cleanup

**Required Handling:**

Caller SHOULD handle close() errors during graceful shutdown to ensure proper cleanup. Use try-catch in shutdown handlers to log but not crash on close errors.

📖 [Source](https://docs.bullmq.io/guide/connections)

---

## Example: Proper Error Handling

```typescript
import bullmq from 'bullmq';

async function example() {
  try {
    const result = await add(/* args */);
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
