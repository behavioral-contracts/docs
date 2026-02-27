---
sidebar_position: 4
---

# Licensing

Behavioral Contracts uses different licenses for different components, carefully chosen to keep the project open while preventing proprietary forks and SaaS copycats.

---

## Corpus (Behavioral Contracts) - CC BY-SA 4.0

**Repository:** https://github.com/behavioral-contracts/corpus

**License:** [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://github.com/behavioral-contracts/corpus/blob/main/LICENSE)

### What This Means

✅ **You CAN:**
- Use contracts locally in your projects (free forever)
- Fork and modify contracts
- Create derivative works
- Use commercially

❌ **You MUST:**
- **Attribute** - Credit the original corpus
- **ShareAlike** - If you modify or extend contracts, you must share them under CC BY-SA 4.0

### Why CC BY-SA 4.0?

The **ShareAlike** clause prevents proprietary contract databases. If you fork or extend the corpus:
1. You must license your version under CC BY-SA 4.0 (same terms)
2. You must make it publicly available
3. You must credit the original corpus

This ensures the behavioral contracts standard remains **open and discoverable**, while preventing vendors from creating closed, proprietary contract databases.

### Attribution

When using contracts from this corpus, you must credit:

```
Behavioral contracts from https://github.com/behavioral-contracts/corpus (CC BY-SA 4.0)
```

---

## verify-cli (Static Analyzer) - AGPL-3.0

**Repository:** https://github.com/behavioral-contracts/verify-cli

**License:** [GNU Affero General Public License v3.0 (AGPL-3.0)](https://github.com/behavioral-contracts/verify-cli/blob/main/LICENSE)

### What This Means

✅ **You CAN:**
- Use locally in your projects (free forever)
- Run in CI/CD pipelines (GitHub Actions, GitLab CI, etc.)
- Self-host for your organization
- Modify for internal use
- Redistribute modifications (under AGPL-3.0)

⚠️ **Special Requirement for SaaS:**
- If you run verify-cli as a **web service (SaaS)**, you **MUST** open source your modifications
- The AGPL "network use" clause means users must have access to the source code

### Why AGPL-3.0?

The **Affero GPL** prevents SaaS copycats while keeping the tool free for everyone else.

**The Problem:** MIT/Apache licenses allow vendors to:
1. Fork the code
2. Add proprietary features
3. Offer closed SaaS
4. Never contribute back

**AGPL Solution:** If you offer this as a SaaS, you must open source your code. This prevents the "AWS ElastiCache problem" where cloud providers take open source projects and offer them as proprietary services.

### Examples

| Use Case | Allowed? | Notes |
|----------|----------|-------|
| Running locally | ✅ Free | No restrictions |
| GitHub Actions CI/CD | ✅ Free | Not considered SaaS |
| Self-hosting for your team | ✅ Free | Internal use is fine |
| Building closed-source IDE plugin | ❌ Must open source | Or get commercial license |
| Offering public SaaS like "ContractCheckr.com" | ❌ Must open source | Or get commercial license |
| Running as API for your app users | ❌ Must open source | Network use triggers AGPL |

### Dual Licensing

For organizations that **cannot comply with AGPL-3.0**, we offer commercial licensing options.

This is common for open source projects:
- **GitLab** uses this model (AGPL + commercial license)
- **Sentry** uses this model (BSL + commercial license)
- **MongoDB** uses this model (SSPL + commercial license)

---

## Documentation - CC BY 4.0

**Repository:** https://github.com/behavioral-contracts/docs

**License:** [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)

### What This Means

✅ **You CAN:**
- Share and redistribute documentation
- Adapt and remix for any purpose (even commercially)

❌ **You MUST:**
- **Attribute** - Give appropriate credit

Documentation does **not** require ShareAlike - you can create derivative docs under any license as long as you credit the original.

---

## License Comparison

| Component | License | Key Restriction |
|-----------|---------|-----------------|
| **Corpus** | CC BY-SA 4.0 | ShareAlike (prevents proprietary forks) |
| **verify-cli** | AGPL-3.0 | Network use (prevents SaaS copycats) |
| **Documentation** | CC BY 4.0 | Attribution only |

---

## Why These Licenses?

### Open Source Sustainability

We chose these licenses to:
1. **Keep the project free** for individual developers and companies
2. **Prevent proprietary forks** that fragment the standard
3. **Protect against SaaS exploitation** by cloud providers
4. **Encourage contributions** back to the community

### Learning from History

**What went wrong with MIT/Apache:**
- **Redis** (BSD) → AWS ElastiCache (proprietary)
- **Elasticsearch** (Apache) → AWS OpenSearch (proprietary)
- **MongoDB** (AGPL) → AWS DocumentDB (tried, but AGPL forced them to license)

**What works:**
- **GitLab** (AGPL) → $15B valuation, thriving open source
- **Sentry** (BSL/AGPL-like) → $3B valuation, sustainable
- **MongoDB** (SSPL) → Protected from AWS

We're following the successful model.

---

## Frequently Asked Questions

### Can I use this in my commercial product?

**Yes!** Both CC BY-SA and AGPL allow commercial use.

**Corpus (contracts):** Use freely. If you extend the contracts, share them back under CC BY-SA.

**verify-cli:** Use freely locally, in CI/CD, or self-hosted. If you offer it as SaaS, you must open source your code or get a commercial license.

### Can I integrate verify-cli into my closed-source tool?

**It depends:**
- **Local tool** (runs on user's machine): ✅ Yes, AGPL allows this
- **SaaS tool** (runs on your servers): ❌ Must open source or get commercial license
- **IDE plugin** (local): ✅ Likely fine (consult AGPL FAQ)
- **CI/CD integration**: ✅ Fine (not SaaS)

When in doubt, contact us for clarification or commercial licensing.

### What if I just want to check my own code?

**100% free, no restrictions.** Both licenses allow unlimited personal and internal use.

### Can I create a competing SaaS?

**Yes, but** you must open source your SaaS code under AGPL-3.0. The point of AGPL is to prevent **closed** SaaS competitors.

If you want to build a **closed** SaaS, contact us for commercial licensing.

### What about the corpus data? Can I use it in my proprietary system?

**Yes, locally.** You can load contracts into your proprietary system for internal use.

**No, if you redistribute modified contracts.** If you modify or extend contracts and distribute them, they must be shared under CC BY-SA 4.0.

### Can I train AI models on the contracts?

**Yes!** CC BY-SA allows this. Just attribute the source and share any derivative contracts under CC BY-SA.

---

## Full License Text

Read the complete licenses:

- **Corpus:** https://github.com/behavioral-contracts/corpus/blob/main/LICENSE
- **verify-cli:** https://github.com/behavioral-contracts/verify-cli/blob/main/LICENSE
- **CC BY-SA 4.0:** https://creativecommons.org/licenses/by-sa/4.0/legalcode
- **AGPL-3.0:** https://www.gnu.org/licenses/agpl-3.0.txt
- **CC BY 4.0:** https://creativecommons.org/licenses/by/4.0/legalcode

---

## Contributing

By contributing to behavioral-contracts (contracts, code, or documentation), you agree to license your contributions under the same license as the project:

- **Corpus/Contracts**: CC BY-SA 4.0
- **verify-cli/Code**: AGPL-3.0
- **Documentation**: CC BY 4.0

See [Contributing Guide](../contributing/how-to-contribute.md) for details.

---

## TL;DR

### For Individual Developers
✅ **Use everything freely.** No restrictions for local use.

### For Companies (Internal Use)
✅ **Use everything freely.** Run in CI/CD, self-host, no cost.

### For SaaS Providers
⚠️ **verify-cli as SaaS requires open sourcing** OR commercial license.
⚠️ **Modified contracts require ShareAlike** (must share under CC BY-SA).

### For Open Source Projects
✅ **Perfect fit.** All licenses are compatible with open source development.

---

**Bottom Line:** We want behavioral contracts to be **free and open for everyone**, while preventing proprietary forks and SaaS exploitation. These licenses achieve that balance.
