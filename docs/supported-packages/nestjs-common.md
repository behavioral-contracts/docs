---
title: "@nestjs/common"
---

# @nestjs/common

| Property | Value |
|----------|-------|
| **Package** | `@nestjs/common` |
| **Versions Covered** | `>=10.0.0 <12.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install @nestjs/common
```

## Covered Functions

This contract covers 2 function(s):

### `Injectable()`

Decorator for dependency injection

**Import:**
```typescript
import { Injectable } from '@nestjs/common';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - injectable-constructor-error**

**Condition:** constructor throws error during dependency injection (connection failure, initialization error)

**Throws:** Error that prevents application startup

**Required Handling:**

Injectable class constructors SHOULD handle initialization errors gracefully or throw descriptive errors. Constructor errors during DI crash application startup with unclear error messages.

📖 [Source](https://docs.nestjs.com/providers)

---

### `Controller()`

Decorator for route controllers

**Import:**
```typescript
import { Controller } from '@nestjs/common';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - controller-async-handler-error**

**Condition:** async route handler throws error or promise rejects

**Throws:** Error propagated to exception filter or default error handler

**Required Handling:**

Controller route handlers MUST handle async errors with try-catch or let NestJS exception filters handle them. Unhandled async errors crash application if no exception filter is configured.

📖 [Source](https://docs.nestjs.com/exception-filters)

---

## Example: Proper Error Handling

## See Also

- [Contract Schema Reference](../contract-schema/schema-reference.md)
- [All Supported Packages](./overview.md)
- [How to Use verify-cli](../cli-reference/overview.md)
