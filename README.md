# Behavioral Contracts Documentation

This repository contains the documentation website for Behavioral Contracts, built with [Docusaurus](https://docusaurus.io/).

## Structure

```
docs/
├── docs/                    # Documentation pages (markdown)
├── blog/                    # Blog posts (markdown)
├── src/                     # React components and pages
├── static/                  # Static assets (images, etc.)
├── scripts/                 # Auto-generation scripts
└── docusaurus.config.ts     # Docusaurus configuration
```

## Auto-Generated Content

The following documentation pages are automatically generated from source:

- **CLI Reference** - Generated from `verify-cli --help` output
- **Schema Reference** - Generated from `corpus/schema/contract.schema.json`
- **Package Pages** - Generated from `corpus/packages/*/contract.yaml`

**IMPORTANT:** Do NOT edit auto-generated files by hand. Run `npm run docs:generate` to regenerate them.

## Development

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

This starts a local development server and opens a browser window. Most changes are reflected live without restarting the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static hosting service.

### Generate Documentation

Before building, regenerate auto-generated docs:

```bash
npm run docs:generate
```

This runs all generation scripts:
- `docs:generate-cli` - Regenerate CLI reference from verify-cli
- `docs:generate-schema` - Regenerate schema reference from corpus
- `docs:generate-packages` - Regenerate package pages from contracts

### Validate

Before committing, validate all examples:

```bash
npm run validate
```

This ensures:
- All TypeScript code examples compile
- All CLI commands actually work
- All contract examples are valid YAML
- All internal links are not broken

## Writing Documentation

### Manual Content

Edit these files directly:

- `docs/introduction/*.md` - Conceptual explanations
- `docs/getting-started/*.md` - Tutorials
- `docs/ai-integration/*.md` - AI usage guides
- `docs/benchmarking/*.md` - Benchmarking guides
- `docs/contributing/*.md` - Contribution guides
- `docs/reference/*.md` - FAQ, glossary, etc.

### Auto-Generated Content

Do NOT edit these files:

- `docs/cli-reference/*.md` (except ci-cd-integration.md)
- `docs/contract-schema/schema-reference.md`
- `docs/supported-packages/*.md` (except overview.md intro)

Run `npm run docs:generate` to regenerate them.

### Code Examples

When adding code examples, use markers to enable validation:

\`\`\`typescript expectsViolation
// This should trigger a violation
await axios.get('/api/users'); // Missing try-catch
\`\`\`

\`\`\`typescript expectsClean
// This should NOT trigger violations
try {
  await axios.get('/api/users');
} catch (error) {
  // Handle error
}
\`\`\`

The validation script will compile these examples and run verify-cli against them.

## Deployment

Deployment is handled automatically via GitHub Actions:

1. Push to `main` branch
2. CI runs validation (`npm run validate`)
3. CI generates docs (`npm run docs:generate`)
4. CI builds site (`npm run build`)
5. CI deploys to Vercel/Netlify

See `.github/workflows/deploy.yml` for details.

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for the full contribution guide.

### Quick Rules

- ✅ **DO** edit conceptual documentation directly
- ✅ **DO** add blog posts for case studies and announcements
- ✅ **DO** run `npm run validate` before committing
- ❌ **DON'T** edit auto-generated files
- ❌ **DON'T** add code examples without validation markers
- ❌ **DON'T** commit broken links or invalid examples

## License

Documentation content is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
