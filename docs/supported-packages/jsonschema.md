---
title: "jsonschema"
---

# jsonschema

| Property | Value |
|----------|-------|
| **Package** | `jsonschema` |
| **Versions Covered** | `>=1.0.0` |
| **Contract Version** | `undefined` |
| **Status** | `draft` |
| **Last Verified** | undefined |
| **Maintainer** | undefined |

## Installation

```bash
npm install jsonschema
```

## Covered Functions

This contract covers 3 function(s):

### `validate()`

#### Postconditions

What happens **after** calling this function:

**Condition:** must_handle_error

**Required Handling:**

try_catch

📖 [Source](https://github.com/tdegrunt/jsonschema/blob/master/README.md#errors)

**Condition:** should_check_result

**Required Handling:**

result_check

📖 [Source](https://github.com/tdegrunt/jsonschema/blob/master/README.md#usage)

---

### `Validator.validate()`

#### Postconditions

What happens **after** calling this function:

**Condition:** must_handle_error

**Required Handling:**

try_catch

📖 [Source](https://github.com/tdegrunt/jsonschema/blob/master/README.md#validator-class)

---

### `Validator.addSchema()`

#### Postconditions

What happens **after** calling this function:

**Condition:** must_handle_error

**Required Handling:**

try_catch

📖 [Source](https://github.com/tdegrunt/jsonschema/issues/290)

---

## Example: Proper Error Handling

## See Also

- [Contract Schema Reference](../contract-schema/schema-reference)
- [All Supported Packages](./overview)
- [How to Use verify-cli](../cli-reference/overview)
