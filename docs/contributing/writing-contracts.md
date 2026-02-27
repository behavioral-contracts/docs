---
sidebar_position: 2
---

# Writing Contracts

:::info Coming Soon
Detailed guide for writing behavioral contracts is under construction.
:::

## Basic Structure

A behavioral contract is a YAML file that documents:

1. **Metadata** - Package name, version range, maintainer
2. **Functions** - Which functions are covered
3. **Preconditions** - Requirements before calling
4. **Postconditions** - What happens after (errors, returns)
5. **Edge Cases** - Known gotchas

## Example Template

```yaml
package: example-package
semver: ">=1.0.0 <2.0.0"
contract_version: "1.0.0"
maintainer: "your-github-username"
last_verified: "2026-02-27"
status: draft

functions:
  - name: exampleFunction
    import_path: "example-package"
    description: "What this function does"

    postconditions:
      - id: error-case
        condition: "When error occurs"
        throws: "ErrorType"
        required_handling: "How to handle it"
        source: "https://package-docs.com"
        severity: error
```

## More Coming Soon

We're working on a comprehensive guide. In the meantime:

- See [Schema Reference](../contract-schema/overview)
- Browse existing contracts in the corpus
- Ask questions in GitHub Discussions
