---
title: "@octokit/rest"
---

# @octokit/rest

| Property | Value |
|----------|-------|
| **Package** | `@octokit/rest` |
| **Versions Covered** | `>=19.0.0 <23.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-25 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install @octokit/rest
```

## Covered Functions

This contract covers 14 function(s):

### `repos.get()`

Fetches repository metadata from GitHub API

**Import:**
```typescript
import { repos.get } from '@octokit/rest';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - github-repo-get-no-try-catch**

**Condition:** octokit.repos.get() called without try-catch

**Throws:** RequestError with status 404 (not found), 403 (forbidden), 401 (unauthorized)

**Required Handling:**

MUST wrap await octokit.repos.get() in try-catch block. Catch block should check error.status for specific error codes: 404 (repo not found/private), 403 (rate limit or permission denied), 401 (auth failed). Handle each case appropriately.


📖 [Source](https://github.com/octokit/octokit.js/discussions/2039)

---

### `repos.create()`

Creates a new GitHub repository

**Import:**
```typescript
import { repos.create } from '@octokit/rest';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - github-repo-create-no-try-catch**

**Condition:** octokit.repos.create() called without try-catch

**Throws:** RequestError with status 422 (validation failed), 403 (forbidden), 401 (unauthorized)

**Required Handling:**

MUST wrap await octokit.repos.create() in try-catch block. Check error.status to distinguish: 422 (validation error - check error.message for details), 403 (quota/permission issue), 401 (authentication failure).


📖 [Source](https://docs.github.com/en/rest/repos/repos#create-a-repository-for-the-authenticated-user)

---

### `repos.update()`

Updates repository settings

**Import:**
```typescript
import { repos.update } from '@octokit/rest';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - github-repo-update-no-try-catch**

**Condition:** octokit.repos.update() called without try-catch

**Throws:** RequestError with status 404 (not found), 403 (forbidden), 422 (validation failed)

**Required Handling:**

MUST wrap await octokit.repos.update() in try-catch block. Handle 404 (repo not found), 403 (insufficient permissions), 422 (invalid parameters).


📖 [Source](https://docs.github.com/en/rest/repos/repos#update-a-repository)

---

### `repos.delete()`

Deletes a GitHub repository

**Import:**
```typescript
import { repos.delete } from '@octokit/rest';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - github-repo-delete-no-try-catch**

**Condition:** octokit.repos.delete() called without try-catch

**Throws:** RequestError with status 404 (not found), 403 (forbidden), 401 (unauthorized)

**Required Handling:**

MUST wrap await octokit.repos.delete() in try-catch block. Always verify repository exists before deletion. Handle 403 (verify admin permissions), 404 (already deleted or never existed), 401 (auth issue).


📖 [Source](https://docs.github.com/en/rest/repos/repos#delete-a-repository)

---

### `git.getRef()`

Fetches a git reference (branch, tag) from repository

**Import:**
```typescript
import { git.getRef } from '@octokit/rest';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - github-git-getref-no-try-catch**

**Condition:** octokit.git.getRef() called without try-catch

**Throws:** RequestError with status 404 (ref not found), 403 (forbidden), 401 (unauthorized)

**Required Handling:**

MUST wrap await octokit.git.getRef() in try-catch block. 404 errors are common and expected (ref doesn't exist), so handle gracefully. Also handle 403 (private repo or rate limit) and 401 (auth failure).


📖 [Source](https://docs.github.com/en/rest/git/refs#get-a-reference)

---

### `git.createRef()`

Creates a new git reference (branch or tag)

**Import:**
```typescript
import { git.createRef } from '@octokit/rest';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - github-git-createref-no-try-catch**

**Condition:** octokit.git.createRef() called without try-catch

**Throws:** RequestError with status 422 (ref already exists), 404 (repo not found), 403 (forbidden)

**Required Handling:**

MUST wrap await octokit.git.createRef() in try-catch block. Handle 422 (ref already exists - check if this is acceptable), 404 (repo doesn't exist), 403 (no write access). Consider checking if ref exists first with git.getRef().


📖 [Source](https://docs.github.com/en/rest/git/refs#create-a-reference)

---

### `pulls.create()`

Creates a new pull request

**Import:**
```typescript
import { pulls.create } from '@octokit/rest';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - github-pull-create-no-try-catch**

**Condition:** octokit.pulls.create() called without try-catch

**Throws:** RequestError with status 422 (validation failed), 403 (forbidden), 404 (repo not found)

**Required Handling:**

MUST wrap await octokit.pulls.create() in try-catch block. Check error.status and error.message: 422 can indicate "No commits between base and head", "Head ref doesn't exist", or "A pull request already exists". Handle each case appropriately.


📖 [Source](https://docs.github.com/en/rest/pulls/pulls#create-a-pull-request)

---

### `pulls.merge()`

Merges a pull request

**Import:**
```typescript
import { pulls.merge } from '@octokit/rest';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - github-pull-merge-no-try-catch**

**Condition:** octokit.pulls.merge() called without try-catch

**Throws:** RequestError with status 405 (not mergeable), 404 (not found), 403 (forbidden)

**Required Handling:**

MUST wrap await octokit.pulls.merge() in try-catch block. Before merging, check PR mergeable state. Handle 405 (check error.message for specific reason: conflicts, required checks, already merged), 404 (PR not found), 403 (no permission).


📖 [Source](https://docs.github.com/en/rest/pulls/pulls#merge-a-pull-request)

---

### `pulls.list()`

Lists pull requests for a repository

**Import:**
```typescript
import { pulls.list } from '@octokit/rest';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - github-pull-list-no-try-catch**

**Condition:** octokit.pulls.list() called without try-catch

**Throws:** RequestError with status 404 (repo not found), 403 (forbidden), 422 (invalid params)

**Required Handling:**

SHOULD wrap await octokit.pulls.list() in try-catch block. Handle 404 (repo not found or private), 403 (check rate limit headers), 422 (validate query parameters).


📖 [Source](https://docs.github.com/en/rest/pulls/pulls#list-pull-requests)

---

### `issues.create()`

Creates a new issue

**Import:**
```typescript
import { issues.create } from '@octokit/rest';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - github-issue-create-no-try-catch**

**Condition:** octokit.issues.create() called without try-catch

**Throws:** RequestError with status 422 (validation failed), 403 (forbidden), 404 (repo not found), 410 (issues disabled)

**Required Handling:**

MUST wrap await octokit.issues.create() in try-catch block. Handle 422 (validation - check error.message for details), 403 (no permission), 404 (repo not found), 410 (issues disabled - direct user to discussions or PRs instead).


📖 [Source](https://docs.github.com/en/rest/issues/issues#create-an-issue)

---

### `issues.update()`

Updates an existing issue

**Import:**
```typescript
import { issues.update } from '@octokit/rest';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - github-issue-update-no-try-catch**

**Condition:** octokit.issues.update() called without try-catch

**Throws:** RequestError with status 404 (not found), 403 (forbidden), 422 (validation failed), 410 (issues disabled)

**Required Handling:**

MUST wrap await octokit.issues.update() in try-catch block. Handle 404 (issue not found), 403 (check if issue is locked or user lacks permission), 422 (invalid update parameters), 410 (issues disabled).


📖 [Source](https://docs.github.com/en/rest/issues/issues#update-an-issue)

---

### `issues.list()`

Lists issues for a repository

**Import:**
```typescript
import { issues.list } from '@octokit/rest';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - github-issue-list-no-try-catch**

**Condition:** octokit.issues.list() called without try-catch

**Throws:** RequestError with status 404 (repo not found), 403 (forbidden), 422 (invalid params)

**Required Handling:**

SHOULD wrap await octokit.issues.list() in try-catch block. Handle 404 (repo not found or private), 403 (check rate limit headers), 422 (validate filter/sort parameters).


📖 [Source](https://docs.github.com/en/rest/issues/issues#list-repository-issues)

---

### `repos.createOrUpdateFileContents()`

Creates or updates a file in a repository

**Import:**
```typescript
import { repos.createOrUpdateFileContents } from '@octokit/rest';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - github-file-update-no-try-catch**

**Condition:** octokit.repos.createOrUpdateFileContents() called without try-catch

**Throws:** RequestError with status 404 (repo/branch not found), 409 (conflict), 422 (validation failed)

**Required Handling:**

MUST wrap await octokit.repos.createOrUpdateFileContents() in try-catch block. Handle 409 (concurrent modification - fetch latest SHA and retry), 404 (verify repo and branch exist), 422 (validate commit message and content encoding).


📖 [Source](https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents)

---

### `repos.getContent()`

Fetches file or directory contents from repository

**Import:**
```typescript
import { repos.getContent } from '@octokit/rest';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - github-get-content-no-try-catch**

**Condition:** octokit.repos.getContent() called without try-catch

**Throws:** RequestError with status 404 (not found), 403 (forbidden), 403 (too large)

**Required Handling:**

MUST wrap await octokit.repos.getContent() in try-catch block. Handle 404 (path not found - this is often expected behavior for existence checks), 403 with "too large" (use git.getBlob() for large files), 403 for other reasons (auth/rate limit).


📖 [Source](https://docs.github.com/en/rest/repos/contents#get-repository-content)

---

## Example: Proper Error Handling

```typescript
import rest from '@octokit/rest';

async function example() {
  try {
    const result = await repos.get(/* args */);
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
