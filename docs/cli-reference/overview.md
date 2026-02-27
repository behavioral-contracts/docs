---
sidebar_position: 1
---

# CLI Reference

The `verify-cli` is a static analyzer that checks your TypeScript code against behavioral contracts.

## Quick Start

```bash
# Install globally
npm install -g @behavioral-contracts/verify-cli

# Or use with npx
npx @behavioral-contracts/verify-cli --tsconfig ./tsconfig.json
```

## Help Output

```
Usage: verify-cli [options]

Verify TypeScript code against behavioral contracts

Options:
  -V, --version         output the version number
  --tsconfig <path>     Path to tsconfig.json or project directory (default:
                        ./tsconfig.json) (default: "./tsconfig.json")
  --corpus <path>       Path to corpus directory (default:
                        "/Users/calebgates/WebstormProjects/behavioral-contracts/corpus")
  --output <path>       Output path for audit record JSON (default:
                        auto-generated in output/runs/)
  --project <path>      Path to project root (for package.json discovery)
                        (default:
                        "/Users/calebgates/WebstormProjects/behavioral-contracts/verify-cli")
  --no-terminal         Disable terminal output (JSON only)
  --fail-on-warnings    Exit with error code if warnings are found
  --discover-packages   Enable package discovery and coverage reporting
                        (default: true)
  --include-tests       Include test files in analysis (default: excludes test
                        files) (default: false)
  --include-drafts      Include draft and in-development contracts (default:
                        excludes draft/in-development) (default: false)
  --include-deprecated  Include deprecated contracts (default: excludes
                        deprecated) (default: false)
  --positive-report     Generate positive evidence report (default: true)
                        (default: true)
  --no-positive-report  Disable positive evidence report
  -h, --help            display help for command
```

## Common Usage Patterns

### Basic Scan

Scan your project using your existing tsconfig.json:

```bash
verify-cli --tsconfig ./tsconfig.json
```

### With Output File

Save results to a JSON file for later analysis or AI integration:

```bash
verify-cli --tsconfig ./tsconfig.json --output violations.json
```

### Custom Corpus Path

Use a local or custom corpus directory:

```bash
verify-cli --tsconfig ./tsconfig.json --corpus ./my-contracts
```

### CI/CD Integration

Exit with non-zero code if violations are found:

```bash
verify-cli --tsconfig ./tsconfig.json --fail-on-error
```

## See Also

- [CI/CD Integration](./ci-cd-integration) - Using in pipelines
