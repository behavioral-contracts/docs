---
title: @anthropic-ai/sdk
---

# @anthropic-ai/sdk

| Property | Value |
|----------|-------|
| **Package** | `@anthropic-ai/sdk` |
| **Versions Covered** | `>=0.18.0 <1.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-24 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install @anthropic-ai/sdk
```

## Covered Functions

This contract covers 3 function(s):

### `create()`

Creates a message completion using Claude models

**Import:**
```typescript
import { create } from '@anthropic-ai/sdk';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - messages-create-no-try-catch**

**Condition:** messages.create() called without try-catch or .catch() handler

**Throws:** `APIError with error.status and error.message`

**Required Handling:**

MUST wrap await client.messages.create() in try-catch block. Catch block should check error instanceof Anthropic.APIError and handle specific error types (RateLimitError, AuthenticationError, etc.) appropriately.


📖 [Source](https://platform.claude.com/docs/en/api/errors)

**⚠️ WARNING - messages-create-generic-catch**

**Condition:** messages.create() in try-catch but doesn't check error types

**Required Handling:**

SHOULD check error type using instanceof or error.status code. Handle RateLimitError with retry logic (using retry-after header), AuthenticationError by validating API key, and server errors (500/529) with appropriate backoff.


📖 [Source](https://github.com/anthropics/anthropic-sdk-typescript)

---

### `stream()`

Creates a streaming message completion using Claude models

**Import:**
```typescript
import { stream } from '@anthropic-ai/sdk';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - messages-stream-no-try-catch**

**Condition:** messages.stream() called without try-catch or .catch() handler

**Throws:** `APIError, can occur mid-stream after initial 200 response`

**Required Handling:**

MUST wrap await client.messages.stream() in try-catch block. Should also wrap stream iteration in try-catch to handle mid-stream errors. Check error types for proper recovery.


📖 [Source](https://platform.claude.com/docs/en/api/errors)

**ℹ️ INFO - stream-abort-not-handled**

**Condition:** Stream created but no abort/cleanup handling

**Required Handling:**

SHOULD implement cancellation handling with stream.controller.abort() or break from stream iteration. Use finally blocks for cleanup.


📖 [Source](https://github.com/anthropics/anthropic-sdk-typescript)

---

### `Anthropic()`

Initializes Anthropic API client

**Import:**
```typescript
import { Anthropic } from '@anthropic-ai/sdk';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - api-key-not-validated**

**Condition:** Anthropic client created without validating API key exists

**Required Handling:**

SHOULD validate API key exists before client creation: if (!process.env.ANTHROPIC_API_KEY) throw new Error('Missing ANTHROPIC_API_KEY'). Consider using default apiKey validation from SDK.


📖 [Source](https://platform.claude.com/docs/en/api/errors)

**ℹ️ INFO - rate-limit-no-retry-logic**

**Condition:** API calls made without retry logic for 429 errors

**Required Handling:**

SHOULD implement retry logic for 429 errors. Check retry-after header value and implement exponential backoff. Example: if (error instanceof RateLimitError) wait for error.headers['retry-after'] seconds before retry.


📖 [Source](https://platform.claude.com/docs/en/api/errors)

---

## Example: Proper Error Handling

```typescript
import sdk from '@anthropic-ai/sdk';

async function example() {
  try {
    const result = await create(/* args */);
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
