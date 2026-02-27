---
sidebar_position: 1
---

# Frequently Asked Questions

## General

### What are behavioral contracts?

Machine-readable specifications of runtime behavior (errors, edge cases) that TypeScript can't express. See [What Are Behavioral Contracts](../introduction/what-are-behavioral-contracts) for a detailed explanation.

### How is this different from TypeScript?

TypeScript checks **types** at compile-time. Behavioral contracts check **behavior** at static-analysis-time:

| TypeScript | Behavioral Contracts |
|------------|---------------------|
| `function get(url: string): Promise<Response>` | "This function throws `AxiosError` on network failures, and you MUST check `error.response` exists" |
| Types | Runtime behavior |
| Compile-time | Static analysis |

They complement each other.

### Is this free?

Yes! 100% open source and free:
- **Corpus**: CC BY-SA 4.0 (Creative Commons Attribution-ShareAlike)
- **verify-cli**: AGPL-3.0 (GNU Affero GPL)
- **Documentation**: CC BY 4.0

No telemetry, no vendor lock-in, no hidden costs for personal and internal use.

---

## Getting Started

### Do I need to change my code to use this?

No! Just run `verify-cli --tsconfig ./tsconfig.json` against your existing codebase. It will find violations and suggest fixes, but you decide what to fix and when.

### What packages are supported?

See [Supported Packages](../supported-packages/overview) for the full list. We currently have contracts for 100+ popular packages including:
- axios
- @prisma/client
- stripe
- openai
- pg
- And many more...

### What if my package isn't supported?

You have three options:
1. **Request a contract** - Open a GitHub issue
2. **Write your own** - See [Writing Contracts](../contributing/writing-contracts)
3. **Use the tool anyway** - It will check packages that *are* covered

---

## Technical Questions

### How does static analysis work?

The verify-cli:
1. Parses your TypeScript code into an AST
2. Finds all function calls that match contract patterns
3. Checks if the calls are wrapped in appropriate error handling
4. Reports violations with fix suggestions

It uses the TypeScript compiler API for accurate type information.

### Does it slow down my build?

Typical scan times:
- Small project (< 100 files): 2-5 seconds
- Medium project (100-500 files): 10-30 seconds
- Large project (500+ files): 30-60 seconds

Run it in CI or as a pre-commit hook, not on every file save.

### Can I use this with JavaScript?

The analyzer requires TypeScript for type information. If you're using plain JavaScript:
1. Add `// @ts-check` to files
2. Create a minimal `tsconfig.json`
3. Run verify-cli

Better yet, migrate to TypeScript for full benefits!

### Does it support JSX/TSX?

Yes! React, Vue, Svelte—if it compiles with TypeScript, we can analyze it.

---

## Violations & Fixes

### Are all violations real issues?

Most are! But you might encounter false positives when:
- You have a global error handler (framework-level)
- You're intentionally triggering errors (tests)
- You're using a wrapper that handles errors

Use `@behavioral-contract-ignore` comments to suppress false positives.

### How do I suppress a violation?

Add a comment above the line:

```typescript
// @behavioral-contract-ignore axios/network-failure: Global error handler
await axios.get('/api/users');
```

Or use a config file (`.behavioralcontractsrc.json`):

```json
{
  "ignore": [
    {
      "file": "src/test/**",
      "reason": "Test files"
    }
  ]
}
```

### Can I fix violations automatically?

Yes! Use AI integration:
1. Export to JSON: `verify-cli --output violations.json`
2. Feed to Claude/ChatGPT
3. Review and apply fixes

See [AI Integration](../ai-integration/using-with-claude) for details.

---

## Contracts

### Who writes the contracts?

The community! Contracts are:
- Written by developers
- Backed by official documentation
- Reviewed for accuracy
- Maintained as packages evolve

See [Contributing](../contributing/how-to-contribute) to help.

### How do you keep contracts up-to-date?

Each contract has:
- `last_verified` date
- `source` URLs to official docs
- `semver` range for applicable versions

We're building automated verification against package docs.

### Can I write contracts for my internal packages?

Absolutely! Create a contract YAML file:

```yaml
package: "@mycompany/api-client"
semver: ">=1.0.0"
functions:
  - name: fetchUser
    postconditions:
      - id: not-found
        throws: "UserNotFoundError"
        required_handling: "Handle UserNotFoundError"
        source: "https://internal-docs..."
        severity: error
```

Load with: `verify-cli --corpus ./my-contracts`

---

## CI/CD

### How do I use this in CI?

```yaml
# .github/workflows/verify.yml
- name: Check behavioral contracts
  run: |
    npm install -g @behavioral-contracts/verify-cli
    verify-cli --tsconfig ./tsconfig.json --fail-on-error
```

See [CI/CD Integration](../cli-reference/ci-cd-integration) for more examples.

### Should I fail builds on violations?

Recommended approach:
- **ERROR-level**: Fail the build (critical issues)
- **WARNING-level**: Report but don't fail (track over time)
- **INFO-level**: Optional, for reference

```bash
verify-cli --tsconfig ./tsconfig.json --severity error --fail-on-error
```

### Can I run this on only changed files?

Yes! Use incremental mode:

```bash
verify-cli --tsconfig ./tsconfig.json --incremental
```

Or in CI, analyze only changed files:

```bash
verify-cli --tsconfig ./tsconfig.json --files $(git diff --name-only origin/main...HEAD | grep '\.ts$')
```

---

## Benchmarking

### How accurate is this?

We measure precision (% of violations that are real issues):
- **Production contracts**: ~95% precision
- **Draft contracts**: ~85% precision

See [Benchmarking](../benchmarking/why-benchmarking-matters) for methodology.

### How does this compare to ESLint?

Different purposes:
- **ESLint**: Code style, simple patterns, best practices
- **Behavioral Contracts**: Runtime behavior, error handling, package-specific rules

Use both! They complement each other.

---

## Licensing & Commercial Use

### Can I use this in commercial projects?

Yes! Both CC BY-SA and AGPL allow commercial use.

**Important notes:**
- **Local/internal use**: Completely free, no restrictions
- **Modified contracts**: Must share under CC BY-SA 4.0
- **SaaS providers**: Must open source verify-cli modifications (AGPL requirement)

See [Licensing](./license) for details.

### Do I need to credit you?

**Yes, for the corpus.** CC BY-SA 4.0 requires attribution:

```
Behavioral contracts from https://github.com/behavioral-contracts/corpus (CC BY-SA 4.0)
```

**No, for verify-cli.** AGPL doesn't require attribution (though it's appreciated!).

### Can I fork and modify the contracts?

Yes! CC BY-SA 4.0 allows forking and modification. You must:
- **Attribute** the original corpus
- **Share modifications** under CC BY-SA 4.0 (ShareAlike requirement)
- Keep the license file

This prevents proprietary contract forks while keeping the standard open.

---

## Community

### How do I contribute?

See [Contributing Guide](../contributing/how-to-contribute) for:
- Writing contracts
- Improving the analyzer
- Adding documentation
- Reporting issues

### Where do I get help?

- **GitHub Discussions**: Community Q&A
- **GitHub Issues**: Bug reports and feature requests
- **Documentation**: This site

### How do I report a bug?

Open an issue on GitHub with:
1. The contract YAML (if relevant)
2. The TypeScript code being analyzed
3. Expected vs. actual output
4. verify-cli version: `verify-cli --version`

---

## Roadmap

### What's next?

Planned features:
- IDE plugins (VS Code, IntelliJ)
- Automated contract verification against docs
- Contract marketplace (browse, download, install)
- More package contracts (goal: 500+)
- Custom rule engine

See the [GitHub roadmap](https://github.com/behavioral-contracts/corpus/projects) for details.

---

## Still Have Questions?

- [GitHub Discussions](https://github.com/behavioral-contracts/corpus/discussions)
- [Contact the maintainers](mailto:contact@behavioral-contracts.org)
