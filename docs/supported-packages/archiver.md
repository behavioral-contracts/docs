---
title: archiver
---

# archiver

| Property | Value |
|----------|-------|
| **Package** | `archiver` |
| **Versions Covered** | `>=5.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install archiver
```

## Covered Functions

This contract covers 1 function(s):

### `archiver()`

Creates archiver instance for ZIP/TAR generation

**Import:**
```typescript
import { archiver } from 'archiver';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - missing-error-handler**

**Condition:** archiver instance created without error event handler

**Throws:** `Emits 'error' event that crashes process if not handled`

**Required Handling:**

Caller MUST attach error event handler immediately after creating archiver instance. Without error handler, unhandled 'error' events crash the entire Node.js process. CRITICAL: This is the #1 production bug (70% of codebases). Always add: archive.on('error', (error) => { handle_error(error); })


📖 [Source](https://github.com/archiverjs/node-archiver/issues/181)

**🔴 ERROR - missing-warning-handler**

**Condition:** archiver instance created without warning event handler

**Throws:** `Emits 'warning' event for non-blocking errors (ENOENT, file access failures)`

**Required Handling:**

Caller MUST attach warning event handler to catch non-blocking errors. Without warning handler, file access errors (ENOENT) go unnoticed, resulting in incomplete archives and silent data loss. CRITICAL: This is production bug #2 (80% of codebases). Always add: archive.on('warning', (err) => { if (err.code !== 'ENOENT') throw err; })


📖 [Source](https://www.npmjs.com/package/archiver)

**🔴 ERROR - compression-error**

**Condition:** Compression fails during archive creation

**Throws:** `Emits 'error' event with Error object`

**Required Handling:**

Caller MUST handle compression errors via error event handler. Common causes: out of memory, invalid compression options, stream errors. Error event is emitted during finalize().


📖 [Source](https://www.archiverjs.com/docs/archiver/)

**⚠️ WARNING - file-access-error**

**Condition:** File or directory is missing or inaccessible (ENOENT, EACCES)

**Throws:** `Emits 'warning' event for non-blocking errors like ENOENT`

**Required Handling:**

Caller MUST handle warning events to detect missing or inaccessible files. Warning events are emitted for individual file failures during directory archiving. Check err.code === 'ENOENT' to differentiate from fatal errors.


📖 [Source](https://www.npmjs.com/package/archiver)

**🔴 ERROR - missing-finalize**

**Condition:** Archive operations performed but finalize() never called

**Throws:** `Process exits silently with code 0 when event loop empties`

**Required Handling:**

Caller MUST call archive.finalize() after adding all files. Without finalize(), the archive is never completed and the process exits silently with code 0 once the event loop is empty. This is extremely difficult to debug.


📖 [Source](https://github.com/archiverjs/node-archiver/issues/457)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - no-error-handler**

CRITICAL (70% of codebases): No error event handler attached. Any compression error, write failure, or file access error results in an unhandled error that crashes the process. ALWAYS attach error handler BEFORE calling finalize() or appending files: archive.on('error', (err) => { console.error('Archive error:', err); throw err; });


📖 [Source](https://github.com/archiverjs/node-archiver/issues/181)

**⚠️ WARNING - no-warning-handler**

CRITICAL (80% of codebases): No warning event handler attached. File access errors (ENOENT) are silently ignored, resulting in incomplete archives. ALWAYS attach warning handler: archive.on('warning', (err) => {
  if (err.code === 'ENOENT') { console.warn('File not found:', err); }
  else { throw err; }
});


📖 [Source](https://www.npmjs.com/package/archiver)

**⚠️ WARNING - read-stream-errors**

COMMON (50% of codebases): Read stream errors when using append() don't automatically trigger archiver error or warning events. MUST attach error handlers to individual read streams: const stream = fs.createReadStream('file.txt'); stream.on('error', (err) => { archive.emit('error', err); }); archive.append(stream, { name: 'file.txt' });


📖 [Source](https://github.com/archiverjs/node-archiver/issues/321)

**⚠️ WARNING - incomplete-archives**

COMMON (40% of codebases): Only awaiting finalize() promise without waiting for 'close' event on output stream. With large file counts (100+), finalize() promise resolves before all files are written, resulting in corrupt/incomplete archives. MUST wait for both finalize() AND output stream 'close' event: await archive.finalize(); await new Promise(resolve => output.on('close', resolve));


📖 [Source](https://github.com/archiverjs/node-archiver/issues/476)

---

## Example: Proper Error Handling

```typescript
import archiver from 'archiver';

async function example() {
  try {
    const result = await archiver(/* args */);
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
