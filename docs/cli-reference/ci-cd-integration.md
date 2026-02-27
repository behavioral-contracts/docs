---
sidebar_position: 4
---

# CI/CD Integration

:::info Coming Soon
Detailed CI/CD integration guides are under construction.
:::

## Quick Example: GitHub Actions

```yaml
name: Behavioral Contracts Check

on: [push, pull_request]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run behavioral contracts verification
        run: |
          npm install -g @behavioral-contracts/verify-cli
          verify-cli --tsconfig ./tsconfig.json --fail-on-error
```

## Other CI Systems

Guides for other CI/CD systems coming soon:

- GitLab CI
- CircleCI
- Jenkins
- Travis CI
- Bitbucket Pipelines

## Pre-commit Hooks

Instructions for pre-commit integration coming soon.

## Questions?

Ask in [GitHub Discussions](https://github.com/behavioral-contracts/corpus/discussions)
