---
title: "openai"
---

# openai

| Property | Value |
|----------|-------|
| **Package** | `openai` |
| **Versions Covered** | `>=4.0.0 <5.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-23 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install openai
```

## Covered Functions

This contract covers 2 function(s):

### `create()`

Creates OpenAI resources (completions, embeddings, transcriptions, etc.)

**Import:**
```typescript
import { create } from 'openai';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - authentication-error**

**Condition:** Invalid or missing API key (401)

**Throws:** AuthenticationError with status 401

**Required Handling:**

Caller MUST NOT retry with the same API key. Verify API key is correct and not revoked. Use environment variables, never hardcode keys. Alert operations team - this is a configuration error.


📖 [Source](https://developers.openai.com/api/docs/guides/error-codes/)

**🔴 ERROR - rate-limit-error**

**Condition:** Rate limit exceeded - RPM, TPM, RPD, TPD, or IPM (429)

**Throws:** RateLimitError with status 429

**Required Handling:**

Caller MUST implement exponential backoff retry logic. Check rate limit headers (x-ratelimit-remaining-requests, x-ratelimit-remaining-tokens). Different endpoints have different limits (IPM for images, RPM/TPM for text). SDK automatically retries 2 times with exponential backoff.


📖 [Source](https://developers.openai.com/api/docs/guides/rate-limits/)

**🔴 ERROR - server-error**

**Condition:** OpenAI server error (500, 502, 503)

**Throws:** APIError with status = 500

**Required Handling:**

Caller SHOULD treat as transient failure and retry with exponential backoff. SDK automatically retries 2 times. If errors persist, check OpenAI status page.


📖 [Source](https://developers.openai.com/api/docs/guides/error-codes/)

**🔴 ERROR - timeout-error**

**Condition:** Request timeout (default 10 minutes)

**Throws:** APIConnectionTimeoutError

**Required Handling:**

Caller SHOULD retry with exponential backoff. SDK automatically retries.


📖 [Source](https://www.npmjs.com/package/openai)

**🔴 ERROR - invalid-request-error**

**Condition:** Invalid parameters (e.g., model not found, invalid temperature, file too large)

**Throws:** BadRequestError with status 400

**Required Handling:**

Caller MUST validate parameters before making API call. Check error.message for specific parameter that failed. DO NOT retry without fixing the parameter.


📖 [Source](https://developers.openai.com/api/docs/guides/error-codes/)

---

### `generate()`

Generates images from text prompts using DALL-E

**Import:**
```typescript
import { generate } from 'openai';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - authentication-error**

**Condition:** Invalid API key (401)

**Throws:** AuthenticationError

**Required Handling:**

Verify API key, DO NOT retry. Alert operations.

📖 [Source](https://developers.openai.com/api/docs/guides/error-codes/)

**🔴 ERROR - rate-limit-error-images**

**Condition:** Image generation rate limit exceeded (429) - measured in IPM (images per minute)

**Throws:** RateLimitError

**Required Handling:**

Implement exponential backoff. Image generation has different rate limits than text completion (IPM vs RPM/TPM).


📖 [Source](https://developers.openai.com/api/docs/guides/rate-limits/)

**🔴 ERROR - content-policy-violation**

**Condition:** Prompt violates content policy

**Throws:** BadRequestError with content policy violation message

**Required Handling:**

DO NOT retry with same prompt. Return user-friendly error about content policy.


📖 [Source](https://developers.openai.com/api/docs/guides/error-codes/)

**🔴 ERROR - server-error**

**Condition:** Server error (500+)

**Throws:** APIError

**Required Handling:**

Retry with exponential backoff. SDK auto-retries 2 times.

📖 [Source](https://developers.openai.com/api/docs/guides/error-codes/)

---

## Example: Proper Error Handling

```typescript
import openai from 'openai';

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

- [Contract Schema Reference](../contract-schema/schema-reference)
- [All Supported Packages](./overview)
- [How to Use verify-cli](../cli-reference/overview)
