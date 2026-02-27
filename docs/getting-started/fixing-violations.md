---
sidebar_position: 4
---

# Fixing Violations

Best practices for resolving behavioral contract violations efficiently.

## General Strategy

### 1. Triage by Severity

Fix in this order:
1. 🔴 **ERRORs** - Critical issues that cause crashes
2. ⚠️ **WARNINGs** - Important edge cases
3. ℹ️ **INFOs** - Best practices and gotchas

### 2. Group by Package

Fix all violations for one package at a time:
- You'll learn the package's error patterns
- Fixes become repetitive (good for automation)
- Easier to verify you got it right

### 3. Batch Similar Violations

If you have 20 instances of "missing try-catch for axios.get()", fix them all in one PR:
- Consistent patterns across codebase
- Easier code review
- Single test run

---

## Common Violations & Fixes

### Violation 1: Missing Try-Catch

**Problem:**
```typescript
// ❌ ERROR: axios.get() called without try-catch
async function fetchUser(id: string) {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
}
```

**Solution:**
```typescript
// ✅ Proper error handling
async function fetchUser(id: string) {
  try {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // HTTP error (4xx, 5xx)
        throw new ApiError(`User fetch failed: ${error.response.status}`);
      } else {
        // Network error
        throw new NetworkError('Failed to reach API');
      }
    }
    throw error; // Unknown error type
  }
}
```

**Key Points:**
- ✅ Wraps call in try-catch
- ✅ Uses type guard (`axios.isAxiosError`)
- ✅ Checks `error.response` exists
- ✅ Handles both HTTP and network errors differently

---

### Violation 2: Unsafe Error Property Access

**Problem:**
```typescript
// ❌ ERROR: Accessing error.response without null check
try {
  await axios.get('/api/users');
} catch (error: any) {
  console.log(error.response.status); // 💥 Crashes on network errors
}
```

**Solution:**
```typescript
// ✅ Safe property access
try {
  await axios.get('/api/users');
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.log(`HTTP error: ${error.response.status}`);
    } else if (error.request) {
      console.log('Network error: no response received');
    } else {
      console.log('Request setup error');
    }
  }
}
```

---

### Violation 3: Missing 429 Rate Limit Handling

**Problem:**
```typescript
// ❌ ERROR: 429 rate limit not handled
try {
  const response = await axios.get('/api/users');
} catch (error: any) {
  console.error('Request failed'); // Doesn't retry or respect rate limits
}
```

**Solution:**
```typescript
// ✅ Proper rate limit handling with retry
async function fetchWithRetry(url: string, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await axios.get(url);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        const delayMs = retryAfter
          ? parseInt(retryAfter) * 1000
          : Math.pow(2, attempt) * 1000; // Exponential backoff

        if (attempt < maxRetries - 1) {
          console.log(`Rate limited. Retrying after ${delayMs}ms...`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          continue;
        }
      }
      throw error; // Re-throw if not 429 or max retries reached
    }
  }
}
```

**Key Points:**
- ✅ Detects 429 status code
- ✅ Respects `Retry-After` header
- ✅ Implements exponential backoff fallback
- ✅ Limits retry attempts

---

### Violation 4: Non-Idempotent POST Retry

**Problem:**
```typescript
// ⚠️ WARNING: Retrying POST without idempotency check
async function createUser(data: any) {
  for (let i = 0; i < 3; i++) {
    try {
      return await axios.post('/api/users', data);
    } catch (error) {
      // Retry on any error - might create duplicate users!
    }
  }
}
```

**Solution:**
```typescript
// ✅ POST retry with idempotency key
async function createUser(data: any) {
  const idempotencyKey = generateUUID(); // Or use client-provided key

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await axios.post('/api/users', data, {
        headers: {
          'Idempotency-Key': idempotencyKey,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        await exponentialBackoff(attempt);
        continue;
      }
      throw error; // Don't retry on non-rate-limit errors
    }
  }
}
```

**Alternative - Don't Retry:**
```typescript
// ✅ Treat POST errors as terminal
async function createUser(data: any) {
  try {
    return await axios.post('/api/users', data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new RateLimitError('Too many requests. Please try again later.');
      }
      throw new ApiError(`Failed to create user: ${error.message}`);
    }
    throw error;
  }
}
```

---

## Refactoring Patterns

### Pattern 1: Error Handling Wrapper

Instead of repeating try-catch everywhere, create a wrapper:

```typescript
// utils/api.ts
import axios, { AxiosRequestConfig } from 'axios';

export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new ApiError(
          `HTTP ${error.response.status}: ${error.response.statusText}`,
          error.response.status
        );
      } else if (error.request) {
        throw new NetworkError('Network request failed');
      }
    }
    throw error;
  }
}

// Usage
const user = await apiGet<User>('/api/users/123'); // ✅ Error handling built-in
```

### Pattern 2: Axios Interceptor

Handle errors globally with interceptors:

```typescript
// config/axios.ts
import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        // Handle rate limiting globally
        return handleRateLimit(error);
      }

      if (!error.response) {
        // Network error
        console.error('Network error:', error.message);
      }
    }
    return Promise.reject(error);
  }
);
```

**Important:** When using interceptors, document this in your codebase:

```typescript
// @behavioral-contract-ignore axios/network-failure: Global interceptor handles errors
const response = await axios.get('/api/users');
```

---

## Testing Your Fixes

### Unit Tests

Test that your error handling works:

```typescript
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchUser } from './api';

describe('fetchUser', () => {
  it('handles network errors', async () => {
    vi.spyOn(axios, 'get').mockRejectedValue({
      isAxiosError: true,
      request: {}, // Has request but no response
      response: undefined,
    });

    await expect(fetchUser('123')).rejects.toThrow(NetworkError);
  });

  it('handles HTTP errors', async () => {
    vi.spyOn(axios, 'get').mockRejectedValue({
      isAxiosError: true,
      response: {
        status: 404,
        statusText: 'Not Found',
      },
    });

    await expect(fetchUser('123')).rejects.toThrow(ApiError);
  });

  it('handles rate limits with retry', async () => {
    vi.spyOn(axios, 'get')
      .mockRejectedValueOnce({
        isAxiosError: true,
        response: { status: 429, headers: { 'retry-after': '1' } },
      })
      .mockResolvedValueOnce({ data: { id: '123' } });

    const result = await fetchWithRetry('/api/users/123');
    expect(result.data.id).toBe('123');
    expect(axios.get).toHaveBeenCalledTimes(2); // Initial + 1 retry
  });
});
```

---

## Automation with AI

You can automate fixing violations using AI agents:

### Step 1: Export violations to JSON

```bash
verify-cli --tsconfig ./tsconfig.json --output violations.json
```

### Step 2: Feed to AI (Claude/ChatGPT)

```
I have the following behavioral contract violations:

[paste violations.json]

Please fix all violations following the required_handling guidance.
For each fix:
1. Show the original code
2. Show the fixed code
3. Explain what changed and why
```

### Step 3: Review AI-generated fixes

AI is good at:
- ✅ Adding try-catch blocks
- ✅ Adding type guards
- ✅ Following required_handling instructions

AI might miss:
- ⚠️ Business logic implications
- ⚠️ Existing error handling patterns in your codebase
- ⚠️ Performance considerations

**Always review AI fixes before applying.**

See [AI Integration Guide](../ai-integration/using-with-claude.md) for detailed workflows.

---

## When NOT to Fix

Sometimes a violation is a false positive or doesn't apply:

### 1. Framework Handles Errors

**Example: NestJS**
```typescript
@Controller('users')
export class UsersController {
  // @behavioral-contract-ignore prisma/p2002: NestJS exception filter handles this
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }
}
```

### 2. Test Files

Tests often intentionally trigger errors:

```typescript
// test/api.test.ts
it('throws on invalid input', async () => {
  // @behavioral-contract-ignore axios/network-failure: Test expects error
  await expect(fetchUser('invalid')).rejects.toThrow();
});
```

### 3. Legacy Code with Global Handlers

```typescript
// @behavioral-contract-ignore axios/*: Legacy code uses global error handler
// TODO: Migrate to explicit error handling
const response = await axios.get('/api/legacy');
```

---

## Tracking Progress

### Create a Tracking Doc

```markdown
# Behavioral Contract Violations - Fix Progress

**Total:** 47 violations
**Fixed:** 23 ✅
**Remaining:** 24 ⏳

## By Package

- **axios** - 15/20 fixed
- **@prisma/client** - 5/15 fixed
- **stripe** - 3/12 fixed

## By Severity

- **ERROR** - 10/25 fixed (priority!)
- **WARNING** - 10/15 fixed
- **INFO** - 3/7 noted

## Next Steps

- [ ] Fix remaining axios network-failure errors (5)
- [ ] Add rate limit handling for Stripe (8)
- [ ] Review Prisma P2002 handling (10)
```

### Re-run After Fixes

```bash
verify-cli --tsconfig ./tsconfig.json --output after-fixes.json
```

Compare before and after:

```bash
diff violations.json after-fixes.json
```

---

## Next Steps

- [AI Integration](../ai-integration/using-with-claude.md) - Automate fixes with Claude
- [CI/CD Integration](../cli-reference/ci-cd-integration.md) - Prevent new violations
- [Contributing](../contributing/how-to-contribute.md) - Help improve contracts
