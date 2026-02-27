---
title: graphql
---

# graphql

| Property | Value |
|----------|-------|
| **Package** | `graphql` |
| **Versions Covered** | `>=16.0.0 <17.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install graphql
```

## Covered Functions

This contract covers 3 function(s):

### `execute()`

Executes a GraphQL query

**Import:**
```typescript
import { execute } from 'graphql';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - execute-resolver-errors**

**Condition:** resolver throws error or promise rejects (database error, validation error, network error)

**Returns:** {errors: GraphQLError[], data: null | partial} - errors array contains resolver failures

**Required Handling:**

Caller MUST check result.errors array before accessing result.data. Resolver errors are returned in errors array, not thrown. Use if (result.errors) to detect failures and handle appropriately.

📖 [Source](https://graphql.org/graphql-js/execution/#execute)

---

### `parse()`

Parses GraphQL query string into AST

**Import:**
```typescript
import { parse } from 'graphql';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - parse-syntax-error**

**Condition:** query string has syntax error (invalid GraphQL syntax, malformed query)

**Throws:** `GraphQLError with syntax error details and location`

**Required Handling:**

Caller MUST wrap parse() in try-catch to handle syntax errors. Invalid query syntax throws GraphQLError that crashes application if unhandled.

📖 [Source](https://graphql.org/graphql-js/language/#parse)

---

### `validate()`

Validates GraphQL query against schema

**Import:**
```typescript
import { validate } from 'graphql';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - validate-schema-errors**

**Condition:** query violates schema rules (unknown field, type mismatch, invalid argument)

**Returns:** GraphQLError[] - array of validation errors (empty array means valid)

**Required Handling:**

Caller MUST check if validate() returns non-empty array before executing query. Validation errors indicate query will fail - check if (errors.length > 0) and handle before execution.

📖 [Source](https://graphql.org/graphql-js/validation/#validate)

---

## Example: Proper Error Handling

```typescript
import graphql from 'graphql';

async function example() {
  try {
    const result = await execute(/* args */);
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
