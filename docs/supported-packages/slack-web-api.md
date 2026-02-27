---
title: "@slack/web-api"
---

# @slack/web-api

| Property | Value |
|----------|-------|
| **Package** | `@slack/web-api` |
| **Versions Covered** | `>=6.0.0 <8.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-25 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install @slack/web-api
```

## Covered Functions

This contract covers 8 function(s):

### `chat.postMessage()`

Posts a message to a Slack channel

**Import:**
```typescript
import { chat.postMessage } from '@slack/web-api';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - chat-postmessage-no-trycatch**

**Condition:** chat.postMessage() called without try-catch or .catch() handler

**Required Handling:**

MUST wrap await client.chat.postMessage() in try-catch block. Catch block should handle RequestError (network failures), RateLimitedError (check retryAfter property), and HTTPError. Also check response.ok === false for API-level errors (invalid_auth, channel_not_found, rate_limited).


📖 [Source](https://tessl.io/registry/tessl/npm-slack--web-api/7.10.0/files/docs/error-handling.md)

---

### `users.list()`

Lists all users in a Slack workspace

**Import:**
```typescript
import { users.list } from '@slack/web-api';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - users-list-no-trycatch**

**Condition:** users.list() called without try-catch or .catch() handler

**Required Handling:**

MUST wrap await client.users.list() in try-catch block to handle network errors, rate limiting, and HTTP errors.


📖 [Source](https://tessl.io/registry/tessl/npm-slack--web-api/7.10.0/files/docs/error-handling.md)

---

### `users.info()`

Gets information about a user

**Import:**
```typescript
import { users.info } from '@slack/web-api';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - users-info-no-trycatch**

**Condition:** users.info() called without try-catch or .catch() handler

**Required Handling:**

MUST wrap await client.users.info() in try-catch block.


📖 [Source](https://api.slack.com/methods/users.info)

---

### `conversations.list()`

Lists all channels in a Slack workspace

**Import:**
```typescript
import { conversations.list } from '@slack/web-api';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - conversations-list-no-trycatch**

**Condition:** conversations.list() called without try-catch or .catch() handler

**Required Handling:**

MUST wrap await client.conversations.list() in try-catch block.


📖 [Source](https://api.slack.com/methods/conversations.list)

---

### `conversations.join()`

Joins an existing channel

**Import:**
```typescript
import { conversations.join } from '@slack/web-api';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - conversations-join-no-trycatch**

**Condition:** conversations.join() called without try-catch or .catch() handler

**Required Handling:**

MUST wrap await client.conversations.join() in try-catch block.


📖 [Source](https://api.slack.com/methods/conversations.join)

---

### `conversations.invite()`

Invites users to a channel

**Import:**
```typescript
import { conversations.invite } from '@slack/web-api';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - conversations-invite-no-trycatch**

**Condition:** conversations.invite() called without try-catch or .catch() handler

**Required Handling:**

MUST wrap await client.conversations.invite() in try-catch block.


📖 [Source](https://api.slack.com/methods/conversations.invite)

---

### `files.upload()`

Uploads a file to Slack

**Import:**
```typescript
import { files.upload } from '@slack/web-api';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - files-upload-no-trycatch**

**Condition:** files.upload() called without try-catch or .catch() handler

**Required Handling:**

MUST wrap await client.files.upload() in try-catch block.


📖 [Source](https://api.slack.com/methods/files.upload)

---

### `auth.test()`

Tests authentication and token validity

**Import:**
```typescript
import { auth.test } from '@slack/web-api';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - auth-test-no-trycatch**

**Condition:** auth.test() called without try-catch or .catch() handler

**Required Handling:**

MUST wrap await client.auth.test() in try-catch block.


📖 [Source](https://api.slack.com/methods/auth.test)

---

## Example: Proper Error Handling

```typescript
import web-api from '@slack/web-api';

async function example() {
  try {
    const result = await chat.postMessage(/* args */);
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
