---
title: "bull"
---

# bull

| Property | Value |
|----------|-------|
| **Package** | `bull` |
| **Versions Covered** | `>=3.0.0 <5.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install bull
```

## Covered Functions

This contract covers 2 function(s):

### `Queue.process()`

Defines processor function for handling jobs in the queue

**Import:**
```typescript
import { Queue.process } from 'bull';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - missing-error-handler**

**Condition:** Job processor doesn't handle errors via try-catch or done(error)

**Throws:** Throws unhandled exception that Bull captures and marks job as failed

**Required Handling:**

Caller MUST handle errors in job processor using either: 1. try-catch in async processors: try  await work();  catch (err)  throw err;  2. done(error) in callback processors: done(err) Without error handling, exceptions are caught by Bull but may not be logged, and failed jobs accumulate silently if no 'failed' event listener exists.


📖 [Source](https://github.com/OptimalBits/bull)

**🔴 ERROR - missing-failed-listener**

**Condition:** Queue instance created without 'failed' event listener

**Throws:** Emits 'failed' event when job fails

**Required Handling:**

Caller MUST attach 'failed' event listener to queue instance. Without this listener, failed jobs are silently lost with no visibility. CRITICAL: This is production bug #2 (60-70% of codebases). Always add: queue.on('failed', (job, err) =  logger.error('Job failed:', err); )


📖 [Source](https://blog.logrocket.com/asynchronous-task-processing-in-node-js-with-bull/)

**🔴 ERROR - missing-stalled-listener**

**Condition:** Queue instance created without 'stalled' event listener

**Throws:** Emits 'stalled' event when job stalls (CPU-intensive code blocks event loop)

**Required Handling:**

Caller MUST attach 'stalled' event listener to queue instance. Stalled jobs are restarted by another worker, resulting in DUPLICATE PROCESSING. CRITICAL: This is production bug #1 (80-90% of codebases don't detect this). Impact: Duplicate emails, duplicate payments, data corruption. Always add: queue.on('stalled', (job) =  logger.error('Job stalled:', job.id); )


📖 [Source](https://docs.bullmq.io/guide/jobs/stalled)

**⚠️ WARNING - missing-error-listener**

**Condition:** Queue instance created without 'error' event listener

**Throws:** Emits 'error' event for Redis connection errors, queue errors

**Required Handling:**

Caller SHOULD attach 'error' event listener to queue instance. Without this listener, Redis connection errors and queue errors go unnoticed. Always add: queue.on('error', (error) =  logger.error('Queue error:', error); )


📖 [Source](https://github.com/OptimalBits/bull)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - callback-promise-mix**

CRITICAL (20-30% of codebases): Mixing callback-based and promise-based code in processor. Example: Using callback-style API calls alongside async/await or Promise. Impact: Race conditions cause jobs to stall indefinitely, blocking all subsequent jobs. DEADLOCK: Queue never recovers until application restart. Fix: Use async/await consistently throughout processor: // ❌ WRONG queue.process(async (job) = 
  action1(job.data, (err, result) =  ... );  // Callback
  return action2(job.data);  // Promise - race condition!
); // ✅ CORRECT queue.process(async (job) = 
  const result1 = await promisify(action1)(job.data);
  const result2 = await action2(job.data);
  return result2;
);


📖 [Source](https://github.com/OptimalBits/bull/issues/1822)

**⚠️ WARNING - cpu-intensive-processor**

CRITICAL (30-40% of codebases): CPU-intensive synchronous code in processor blocks event loop. Example: Large loops, image processing, complex calculations without yielding. Impact: Lock renewal fails, job marked stalled, restarted by another worker. Result: DUPLICATE PROCESSING (emails sent twice, payments charged twice). Fix: Break into async chunks using setImmediate() or increase lockDuration: // ❌ WRONG for (let i = 0; i  1000000; i++)  /* sync work */  // ✅ CORRECT for (let i = 0; i  1000000; i += 10000) 
  await new Promise(resolve = setImmediate(resolve));
  // Process chunk



📖 [Source](https://docs.bullmq.io/guide/jobs/stalled)

**⚠️ WARNING - queue-instance-leak**

COMMON (15-25% of codebases): Creating new Queue instances repeatedly. Example: Instantiating Queue in request handlers, loops, or per-operation. Impact: Redis connection leak, gradual memory exhaustion, eventual crash. Symptom: "Too many clients" Redis error after hours/days of operation. Fix: Instantiate once at application startup, reuse, close on shutdown: // ❌ WRONG app.post('/api', (req, res) = 
  const queue = new Queue('jobs', redisConfig);  // Leak!
  queue.add(req.body);
); // ✅ CORRECT const jobQueue = new Queue('jobs', redisConfig);  // Global/module scope app.post('/api', (req, res) = 
  jobQueue.add(req.body);
); process.on('SIGTERM', async () = 
  await jobQueue.close();  // Cleanup
);


📖 [Source](https://github.com/OptimalBits/bull/issues/1822)

**⚠️ WARNING - manual-job-finalization**

UNCOMMON (5-10% of codebases): Calling job.moveToFailed() from processor function. Example: try-catch that calls job.moveToFailed(error) instead of throwing. Impact: Race condition - both processor and manual code try to finalize job. Result: 'failed' event not emitted, monitoring blind spots. Rule: NEVER call moveToFailed() from processor - return/throw errors instead. // ❌ WRONG queue.process(async (job) = 
  try 
    await work();
   catch (error) 
    await job.moveToFailed( message: 'failed' );  // WRONG
  
); // ✅ CORRECT queue.process(async (job) = 
  await work();  // Just throw on error, Bull handles finalization
);


📖 [Source](https://github.com/OptimalBits/bull/issues/1104)

---

### `new Queue()`

Creates a new Bull queue instance

**Import:**
```typescript
import { new Queue } from 'bull';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - missing-queue-listeners**

**Condition:** Queue instantiated without required event listeners

**Throws:** Queue emits events but no listeners attached

**Required Handling:**

After creating Queue instance, MUST attach event listeners: 1. queue.on('failed', ...) - REQUIRED 2. queue.on('stalled', ...) - CRITICAL 3. queue.on('error', ...) - RECOMMENDED See Queue.process postconditions for details.


📖 [Source](https://github.com/OptimalBits/bull)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - repeated-instantiation**

Creating Queue instances repeatedly instead of reusing. See queue-instance-leak in Queue.process edge_cases.


📖 [Source](https://github.com/OptimalBits/bull/issues/1822)

---

## Example: Proper Error Handling

```typescript
import bull from 'bull';

async function example() {
  try {
    const result = await Queue.process(/* args */);
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
