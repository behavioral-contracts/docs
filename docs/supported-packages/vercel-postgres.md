---
title: "@vercel/postgres"
---

# @vercel/postgres

| Property | Value |
|----------|-------|
| **Package** | `@vercel/postgres` |
| **Versions Covered** | `^0.10.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-25 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install @vercel/postgres
```

## Covered Functions

This contract covers 3 function(s):

### `sql()`

Tagged template function for executing SQL queries

**Import:**
```typescript
import { sql } from '@vercel/postgres';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - sql-query-no-error-handling**

**Condition:** SQL query fails due to syntax error, connection issue, or constraint violation

**Throws:** Database error with error code and message

**Required Handling:**

Wrap sql queries in try-catch blocks to handle database errors appropriately

📖 [Source](https://vercel.com/docs/storage/vercel-postgres)

---

### `query()`

Executes a SQL query on database connection

**Import:**
```typescript
import { query } from '@vercel/postgres';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - query-no-error-handling**

**Condition:** Query fails due to connection issue or SQL error

**Throws:** Database error

**Required Handling:**

Wrap query() calls in try-catch blocks to handle connection and SQL errors

📖 [Source](https://vercel.com/docs/storage/vercel-postgres)

---

### `connect()`

Obtains a client from the connection pool

**Import:**
```typescript
import { connect } from '@vercel/postgres';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connect-no-cleanup**

**Condition:** Client obtained from pool is not released

**Throws:** Connection pool exhaustion on subsequent queries

**Required Handling:**

Call client.release() in a finally block to ensure connection is returned to pool

📖 [Source](https://vercel.com/kb/guide/connection-pooling-with-functions)

---

## Example: Proper Error Handling

```typescript
import postgres from '@vercel/postgres';

async function example() {
  try {
    const result = await sql(/* args */);
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
