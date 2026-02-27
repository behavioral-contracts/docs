---
sidebar_position: 2
---

# Schema Reference

This page documents the complete behavioral contract YAML schema.

:::info Auto-Generated
This page is automatically generated from `corpus/schema/contract.schema.json`.
Do not edit manually. Run `npm run docs:generate-schema` to regenerate.
:::

## Top-Level Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `package` | `string` | ✅ | The npm package name this contract applies to |
| `semver` | `string` | ✅ | Semver range this contract applies to |
| `contract_version` | `string` | ✅ | Semver version of this contract file itself |
| `maintainer` | `string` | ✅ | GitHub username or team maintaining this contract |
| `last_verified` | `string` | ✅ | ISO date when this contract was last verified against package documentation |
| `status` | `"production"` \| `"draft"` \| `"in-development"` \| `"deprecated"` |  | Quality and validation status of this contract |
| `deprecated` | `boolean` |  | Whether this contract is deprecated |
| `deprecated_reason` | `string` |  | Reason for deprecation |
| `deprecated_date` | `string` |  | Date when this contract was deprecated |
| `functions` | `Array<function>` (see [function](#function-definition)) | ✅ | List of functions covered by this contract |

## Contract Metadata

### package

The npm package name this contract applies to.

**Type:** `string`

**Pattern:** Follows npm package naming conventions (supports scoped packages).

**Examples:**
- `"axios"`
- `"@prisma/client"`
- `"stripe"`

### semver

Semantic version range this contract applies to.

**Type:** `string`

**Examples:**
- `">=1.0.0 <2.0.0"` - All 1.x versions
- `"^5.0.0"` - 5.x compatible versions
- `"*"` - All versions (use sparingly)

### contract_version

Version of this contract file itself (not the package version).

**Type:** `string`

**Format:** `major.minor.patch` (semver)

Increment when:
- **Major:** Breaking changes to contract structure
- **Minor:** New functions, postconditions, or edge cases added
- **Patch:** Fixes to descriptions or sources

### status

Quality and validation status of this contract.

**Type:** `enum`

**Values:**
- `"production"` - Fully verified and ready for use
- `"draft"` - Initial version, not yet verified
- `"in-development"` - Work in progress
- `"deprecated"` - No longer maintained


## Function Definition

Each contract contains an array of functions with their behavioral specifications.

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Function name |
| `import_path` | `string` | How this function is imported (e.g., 'axios', 'axios.default', 'axios/lib/core') |
| `description` | `string` | Human-readable description of what this function does |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `preconditions` | `Array<precondition>` (see [precondition](#precondition-definition)) | Conditions that must be true before calling this function |
| `postconditions` | `Array<postcondition>` (see [postcondition](#postcondition-definition)) | What happens after calling this function (returns/throws) |
| `edge_cases` | `Array<edge_case>` (see [edge_case](#edge-case-definition)) | Known sharp edges and gotchas |

## Precondition Definition

Conditions that must be true **before** calling a function.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for this precondition within the function |
| `description` | `string` | ✅ | What must be true before calling the function |
| `source` | `string` | ✅ | URL to authoritative documentation supporting this claim |
| `severity` | `"error"` \| `"warning"` \| `"info"` | ✅ | How critical is this precondition |

**Example:**

```yaml
preconditions:
  - id: absolute-url-node
    description: "URL must be absolute when running in Node.js"
    source: "https://axios-http.com/docs/req_config"
    severity: warning
```


## Postcondition Definition

Outcomes that occur **after** calling a function (returns/throws).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for this postcondition within the function |
| `condition` | `string` | ✅ | When does this outcome occur |
| `returns` | `string` |  | What value is returned (if applicable) |
| `throws` | `string` |  | What error type is thrown (if applicable) |
| `required_handling` | `string` |  | What the caller MUST do to handle this case |
| `source` | `string` | ✅ | URL to authoritative documentation supporting this claim |
| `severity` | `"error"` \| `"warning"` \| `"info"` | ✅ | How critical is this postcondition |

**Important:** If `severity: error`, then `required_handling` is mandatory.


**Example:**

```yaml
postconditions:
  - id: network-failure
    condition: "network error or timeout"
    throws: "AxiosError with error.response === undefined"
    required_handling: >
      Caller MUST check if error.response exists before accessing it.
    source: "https://axios-http.com/docs/handling_errors"
    severity: error
```


## Edge Case Definition

Known gotchas, sharp edges, and non-obvious behavior.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for this edge case within the function |
| `description` | `string` | ✅ | What the edge case is |
| `source` | `string` | ✅ | URL to documentation or GitHub issue describing this edge case |
| `severity` | `"warning"` \| `"info"` | ✅ | Edge cases cannot have error severity |

**Note:** Edge cases can only have `warning` or `info` severity (not `error`).


**Example:**

```yaml
edge_cases:
  - id: timeout-default-zero
    description: "Default timeout is 0 (no timeout). Production should set explicit timeout."
    source: "https://axios-http.com/docs/req_config"
    severity: info
```


## Severity Levels

| Level | Meaning | When to Use |
|-------|---------|-------------|
| `error` | Must fix - causes crashes, data loss, security issues | Unhandled exceptions, missing required checks |
| `warning` | Should fix - edge cases, performance issues | Non-critical but important issues |
| `info` | Nice to know - best practices, gotchas | Educational notes, best practices |


## Complete Example

```yaml
package: axios
semver: ">=1.0.0 <2.0.0"
contract_version: "1.0.0"
maintainer: "corpus-team"
last_verified: "2026-02-27"
status: production

functions:
  - name: get
    import_path: "axios"
    description: "Makes an HTTP GET request"

    preconditions:
      - id: absolute-url-node
        description: "URL must be absolute in Node.js"
        source: "https://axios-http.com/docs/req_config"
        severity: warning

    postconditions:
      - id: network-failure
        condition: "network error or timeout"
        throws: "AxiosError"
        required_handling: "Check error.response exists"
        source: "https://axios-http.com/docs/handling_errors"
        severity: error

    edge_cases:
      - id: timeout-default-zero
        description: "Default timeout is 0"
        source: "https://axios-http.com/docs/req_config"
        severity: info
```


## See Also

- [Understanding the Contract Schema](./overview) - Conceptual explanation
- [Writing Contracts](./writing-contracts) - How to create contracts
- [Examples](./examples) - Real-world contract examples
