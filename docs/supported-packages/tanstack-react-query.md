---
title: "@tanstack/react-query"
---

# @tanstack/react-query

| Property | Value |
|----------|-------|
| **Package** | `@tanstack/react-query` |
| **Versions Covered** | `>=5.0.0 <6.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-24 |
| **Maintainer** | behavioral-contracts |

## Installation

```bash
npm install @tanstack/react-query
```

## Covered Functions

This contract covers 4 function(s):

### `useQuery()`

Hook that fetches data and manages query state, caching, and refetching

**Import:**
```typescript
import { useQuery } from '@tanstack/react-query';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - query-error-unhandled**

**Condition:** queryFn throws an error and error state is not checked

**Throws:** Error (type specified by TError generic, defaults to Error)

**Required Handling:**

Caller MUST handle query errors using one of these methods:
1. Check the `error` property and `isError` state returned by useQuery, OR
2. Wrap the component in an ErrorBoundary with throwOnError: true, OR
3. Provide an onError callback in query options.

Query errors are NOT thrown - they are returned in the error property.
Ignoring the error state leaves users with broken UI and no feedback.


📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/query-functions)

**⚠️ WARNING - query-retry-client-errors**

**Condition:** retry is configured without checking error type (retries on 4xx)

**Throws:** N/A

**Required Handling:**

When configuring custom retry logic, MUST NOT retry on client errors (400, 401, 403, 404).

Bad: retry: 3 (retries all errors including 4xx)
Good: retry: (failureCount, error) = 
  if (error.response?.status = 400 && error.response?.status  500) return false;
  return failureCount  3;


Retrying client errors wastes resources and delays user feedback.
Only server errors (5xx) and network errors should trigger retries.


📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/query-retries)

**🔴 ERROR - stale-query-refetch-error**

**Condition:** stale query refetches in background and new fetch fails

**Throws:** Error from queryFn

**Required Handling:**

When staleTime expires and background refetch fails, the error property will be populated.
Previous cached data remains available via the `data` property.

Caller MUST either:
1. Check `isError` state and show error UI/toast, OR
2. Configure global error handler via QueryCache onError, OR
3. Use `failureReason` to track errors without entering error state.

Silent failures leave users viewing stale data with no indication of problems.


📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/caching)

**🔴 ERROR - network-error-handling**

**Condition:** network failure prevents query from executing

**Throws:** Network error (TypeError, fetch errors, etc.)

**Required Handling:**

Network errors (DNS failures, timeouts, connection refused) are treated as query errors.

Caller MUST handle network errors separately from HTTP errors:
1. Check error type/message to distinguish network vs HTTP errors
2. Show appropriate user feedback ("No internet connection" vs "Server error")
3. Consider different retry strategies (network errors may need exponential backoff)

Treating all errors the same provides poor user experience.


📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/query-functions)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - query-fn-returns-error**

If queryFn returns an error object instead of throwing, React Query treats it as successful data

📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/query-functions)

**ℹ️ INFO - concurrent-query-errors**

Multiple components using same query key share error state. Error in one affects all.

📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/queries)

---

### `useMutation()`

Hook that performs mutations (POST, PUT, DELETE) and manages mutation state

**Import:**
```typescript
import { useMutation } from '@tanstack/react-query';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - mutation-error-unhandled**

**Condition:** mutationFn throws an error and error is not handled

**Throws:** Error (type specified by TError generic, defaults to Error)

**Required Handling:**

Caller MUST handle mutation errors using one of these methods:
1. Check the `error` property and `isError` state returned by useMutation, OR
2. Provide onError callback in mutation options, OR
3. Handle errors in the .catch() when calling mutate/mutateAsync, OR
4. Configure global mutation error handler via QueryClient mutationCache.onError.

Mutations modify server state - users MUST know if they failed.
Silent failures lead to data inconsistency and user confusion.


📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)

**🔴 ERROR - mutation-optimistic-update-rollback**

**Condition:** optimistic update is performed and mutation fails

**Throws:** Error from mutationFn

**Required Handling:**

When using optimistic updates, the onError callback MUST roll back the optimistic changes.

Required pattern:
```
onMutate: async (newData) = 
  await queryClient.cancelQueries( queryKey )
  const previousData = queryClient.getQueryData(queryKey)
  queryClient.setQueryData(queryKey, newData) // optimistic update
  return  previousData  // context for rollback
,
onError: (err, newData, context) = 
  queryClient.setQueryData(queryKey, context.previousData) // ROLLBACK

```

Without rollback, failed mutations leave UI showing incorrect data.


📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)

**⚠️ WARNING - mutation-default-no-retry**

**Condition:** mutation fails and caller expects retry behavior

**Throws:** N/A

**Required Handling:**

Mutations do NOT retry by default (unlike queries).

If retry is needed for idempotent mutations:
1. Explicitly configure retry option
2. Ensure mutation is idempotent or uses idempotency keys
3. Only retry on network/server errors, NOT client errors

Bad: retry: 3 (may duplicate non-idempotent operations)
Good: retry: false (default, explicit)
Acceptable: retry: (failureCount, error) = 
  // Only retry GET-like mutations or with idempotency keys
  return error.response?.status = 500 && failureCount  2



📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)

**⚠️ WARNING - mutation-parallel-execution**

**Condition:** multiple mutations executing concurrently cause race conditions

**Throws:** N/A

**Required Handling:**

By default, mutations execute in parallel which can cause race conditions.

For sequential mutations, caller MUST:
1. Use mutateAsync with await for sequential execution, OR
2. Use onSuccess callback to chain mutations, OR
3. Configure mutation queue in QueryClient.

Parallel mutations can cause: last-write-wins conflicts, data inconsistency, incorrect UI state.


📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - mutate-vs-mutateasync**

mutate() doesn't return a Promise. Use mutateAsync() if you need to await the result.

📖 [Source](https://tanstack.com/query/latest/docs/framework/react/reference/useMutation)

**ℹ️ INFO - mutation-context-type-safety**

Context returned from onMutate must match type expected in onError/onSuccess

📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)

---

### `useInfiniteQuery()`

Hook for infinite scrolling/pagination that manages multiple pages of data

**Import:**
```typescript
import { useInfiniteQuery } from '@tanstack/react-query';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - infinite-query-error-unhandled**

**Condition:** fetchNextPage fails and error is not handled

**Throws:** Error from queryFn for failed page

**Required Handling:**

Caller MUST handle errors when fetching additional pages:
1. Check `error` and `isError` state, OR
2. Check `fetchNextPageError` for page-specific errors, OR
3. Provide onError callback in query options.

When fetchNextPage fails, previously loaded pages remain accessible via `data`.
User must be informed that loading more failed.


📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries)

**🔴 ERROR - infinite-query-refetch-all-pages**

**Condition:** query is refetched and middle pages fail

**Throws:** Error from queryFn

**Required Handling:**

When refetching infinite query, ALL pages are refetched by default.
If any page fails, the entire query enters error state.

Caller MUST either:
1. Handle errors gracefully (show toast, retry button), OR
2. Configure refetchPages to only refetch first page: refetchPages: 'first', OR
3. Use refetchOnWindowFocus: false to prevent automatic refetches.

Refetch failures can lose all previously loaded pages if not handled.


📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - getnextpageparam-undefined**

If getNextPageParam returns undefined, hasNextPage becomes false. Ensure this is intentional.

📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries)

**ℹ️ INFO - infinite-query-memory**

Infinite queries accumulate pages in memory. Consider gcTime for cleanup or limit max pages.

📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries)

---

### `QueryClient()`

Main client for managing queries, mutations, and cache configuration

**Import:**
```typescript
import { QueryClient } from '@tanstack/react-query';
```

#### Preconditions

What must be true **before** calling this function:

**⚠️ WARNING - missing-global-error-handlers**

QueryClient created without global error handlers in production

📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/query-functions)

**⚠️ WARNING - default-retry-strategy-production**

Using default retry strategy (3 retries for all errors) in production

📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/query-retries)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - staletime-vs-gctime**

staleTime (data freshness) and gcTime (memory cleanup) serve different purposes. Understand the difference.

📖 [Source](https://tanstack.com/query/latest/docs/framework/react/guides/caching)

---

## Example: Proper Error Handling

```typescript
import react-query from '@tanstack/react-query';

async function example() {
  try {
    const result = await useQuery(/* args */);
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
