---
title: "typescript"
---

# typescript

| Property | Value |
|----------|-------|
| **Package** | `typescript` |
| **Versions Covered** | `>=4.0.0 <6.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-24 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install typescript
```

## Covered Functions

This contract covers 5 function(s):

### `readFile()`

Reads a file from the file system synchronously and returns its contents as a string

**Import:**
```typescript
import { readFile } from 'typescript';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - file-not-found**

**Condition:** file does not exist at the specified path

**Throws:** Error with code ENOENT (file not found)

**Required Handling:**

Caller MUST wrap ts.sys.readFile() in a try-catch block to handle file-not-found errors. Uncaught ENOENT errors will crash the application.


📖 [Source](https://github.com/microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md)

**🔴 ERROR - permission-denied**

**Condition:** insufficient permissions to read the file

**Throws:** Error with code EACCES (permission denied)

**Required Handling:**

Caller MUST wrap ts.sys.readFile() in a try-catch block to handle permission errors. File system permissions can vary across environments.


📖 [Source](https://nodejs.org/docs/latest/api/errors.html)

**⚠️ WARNING - encoding-error**

**Condition:** file contains invalid encoding or binary data read as text

**Throws:** Error or returns corrupted string data

**Required Handling:**

Caller SHOULD validate file contents after reading, especially when reading user-provided or external files. Binary files read as text will produce invalid results.


📖 [Source](https://github.com/microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - undefined-return**

May return undefined instead of throwing if file doesn't exist (implementation-dependent)

📖 [Source](https://github.com/microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md)

---

### `readDirectory()`

Reads a directory and returns an array of file paths matching the specified extensions

**Import:**
```typescript
import { readDirectory } from 'typescript';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - directory-not-found**

**Condition:** directory does not exist at the specified path

**Throws:** Error with code ENOENT (directory not found)

**Required Handling:**

Caller MUST wrap ts.sys.readDirectory() in a try-catch block to handle directory-not-found errors. Uncaught ENOENT errors will crash the application.


📖 [Source](https://github.com/microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md)

**🔴 ERROR - permission-denied**

**Condition:** insufficient permissions to read the directory

**Throws:** Error with code EACCES (permission denied)

**Required Handling:**

Caller MUST wrap ts.sys.readDirectory() in a try-catch block to handle permission errors. Directory permissions can vary across environments.


📖 [Source](https://nodejs.org/docs/latest/api/errors.html)

**⚠️ WARNING - symlink-loop**

**Condition:** directory contains circular symbolic links

**Throws:** Error with code ELOOP (too many symbolic links)

**Required Handling:**

Caller SHOULD wrap ts.sys.readDirectory() in a try-catch to handle symlink loops, especially when scanning user-provided or external directories.


📖 [Source](https://nodejs.org/docs/latest/api/errors.html)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - empty-array-return**

Returns empty array if no files match the specified extensions, not an error

📖 [Source](https://github.com/microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md)

---

### `writeFile()`

Writes content to a file synchronously

**Import:**
```typescript
import { writeFile } from 'typescript';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - permission-denied**

**Condition:** insufficient permissions to write to the file or directory

**Throws:** Error with code EACCES (permission denied)

**Required Handling:**

Caller MUST wrap ts.sys.writeFile() in a try-catch block to handle permission errors. Write permissions can be restricted in production environments.


📖 [Source](https://nodejs.org/docs/latest/api/errors.html)

**🔴 ERROR - directory-not-found**

**Condition:** parent directory does not exist

**Throws:** Error with code ENOENT (directory not found)

**Required Handling:**

Caller MUST either: 1. Wrap ts.sys.writeFile() in a try-catch and handle ENOENT, OR 2. Create parent directories before writing (e.g., using ts.sys.createDirectory or mkdirp)


📖 [Source](https://nodejs.org/docs/latest/api/errors.html)

**⚠️ WARNING - disk-full**

**Condition:** insufficient disk space

**Throws:** Error with code ENOSPC (no space left on device)

**Required Handling:**

Caller SHOULD wrap ts.sys.writeFile() in a try-catch to handle disk-full errors, especially for build tools that may write large files.


📖 [Source](https://nodejs.org/docs/latest/api/errors.html)

**⚠️ WARNING - read-only-filesystem**

**Condition:** filesystem is mounted read-only

**Throws:** Error with code EROFS (read-only file system)

**Required Handling:**

Caller SHOULD wrap ts.sys.writeFile() in a try-catch to handle read-only filesystem errors.


📖 [Source](https://nodejs.org/docs/latest/api/errors.html)

---

### `createProgram()`

Creates a TypeScript program from source files and compiler options

**Import:**
```typescript
import { createProgram } from 'typescript';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - file-not-found**

**Condition:** source file specified in rootNames does not exist

**Throws:** May throw Error or return program with diagnostics

**Required Handling:**

Caller SHOULD wrap ts.createProgram() in a try-catch AND check ts.getPreEmitDiagnostics() for file-not-found errors. The API may return a program with errors rather than throwing.


📖 [Source](https://github.com/microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md)

**⚠️ WARNING - invalid-compiler-options**

**Condition:** compiler options are invalid or incompatible

**Throws:** May throw Error or return program with diagnostics

**Required Handling:**

Caller SHOULD validate compiler options before passing to ts.createProgram() or check diagnostics after program creation.


📖 [Source](https://github.com/microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md)

**⚠️ WARNING - unchecked-diagnostics**

**Condition:** program created successfully but contains compilation errors

**Returns:**

Program object with errors accessible via getPreEmitDiagnostics()

**Required Handling:**

Caller MUST call ts.getPreEmitDiagnostics(program) after creating a program to check for compilation errors. Programs can be created even when source files have errors, but emitting without checking diagnostics is unsafe.


📖 [Source](https://github.com/microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - module-resolution-failure**

If module resolution fails, errors appear in diagnostics rather than throwing

📖 [Source](https://www.typescriptlang.org/docs/handbook/module-resolution.html)

---

### `createCompilerHost()`

Creates a compiler host that provides file system and environment operations

**Import:**
```typescript
import { createCompilerHost } from 'typescript';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - custom-host-file-errors**

**Condition:** custom getSourceFile implementation encounters file system errors

**Throws:** Depends on custom implementation - may throw or return undefined

**Required Handling:**

When implementing custom CompilerHost, the getSourceFile method MUST handle file system errors (ENOENT, EACCES) gracefully. Either wrap fs operations in try-catch and return undefined, or allow errors to propagate with clear messages.


📖 [Source](https://github.com/microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - default-host-delegates-to-sys**

Default compiler host delegates to ts.sys, which can throw file system errors

📖 [Source](https://github.com/microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md)

---

## Example: Proper Error Handling

```typescript
import typescript from 'typescript';

async function example() {
  try {
    const result = await readFile(/* args */);
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
