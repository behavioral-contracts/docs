---
title: "helmet"
---

# helmet

| Property | Value |
|----------|-------|
| **Package** | `helmet` |
| **Versions Covered** | `>=7.0.0 <9.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `in-development` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install helmet
```

## Covered Functions

This contract covers 3 function(s):

### `helmet()`

Main helmet function that sets 13 HTTP security headers to protect against common web vulnerabilities

**Import:**
```typescript
import { helmet } from 'helmet';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - config-validation-error**

**Condition:** configuration object is invalid

**Throws:** TypeError for malformed configuration (e.g., invalid CSP directives, misspelled options)

**Required Handling:**

Caller MUST wrap helmet() calls in try-catch to prevent server crash on invalid configuration. Common causes: missing quotes on CSP keywords, invalid directive names, misspelled HSTS options.


📖 [Source](https://helmetjs.github.io/)

**🔴 ERROR - csp-keyword-quoting**

**Condition:** CSP directive contains unquoted special keywords

**Throws:** TypeError for keywords like 'self', 'none', 'unsafe-inline' without quotes

**Required Handling:**

CSP keywords MUST be wrapped in single quotes: "'self'", "'none'", "'unsafe-inline'", "'unsafe-eval'". Example: scriptSrc: ["'self'"] not scriptSrc: ['self']


📖 [Source](https://github.com/helmetjs/helmet/blob/main/middlewares/content-security-policy/README.md)

**🔴 ERROR - invalid-csp-directive**

**Condition:** contentSecurityPolicy contains invalid directive name

**Throws:** TypeError or silent failure for invalid directive names

**Required Handling:**

Only use valid CSP directive names: defaultSrc, scriptSrc, styleSrc, imgSrc, connectSrc, fontSrc, objectSrc, mediaSrc, frameSrc, baseUri, formAction, frameAncestors, etc.


📖 [Source](https://github.com/helmetjs/helmet/blob/main/middlewares/content-security-policy/README.md)

**🔴 ERROR - hsts-option-misspelling**

**Condition:** strictTransportSecurity contains misspelled 'includeSubDomains' option

**Throws:** TypeError for 'includeSubdomains' (lowercase d), 'include_sub_domains' (snake_case), etc.

**Required Handling:**

HSTS option MUST be spelled exactly as 'includeSubDomains' (camelCase with capital D). Common typos: includeSubdomains, include_sub_domains, includesubdomains


📖 [Source](https://github.com/helmetjs/helmet/issues/415)

**🔴 ERROR - module-import-error**

**Condition:** helmet is imported incorrectly (CommonJS/ESM mismatch)

**Throws:** TypeError: helmet is not a function

**Required Handling:**

Use correct import syntax: ESM: import helmet from 'helmet' CommonJS: const helmet = require('helmet') or require('helmet').default Incorrect: import * as helmet from 'helmet'


📖 [Source](https://github.com/helmetjs/helmet/issues/415)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - unsafe-inline-weakens-xss-protection**

Using 'unsafe-inline' in CSP scriptSrc defeats XSS protection

📖 [Source](https://helmetjs.github.io/)

**⚠️ WARNING - unsafe-eval-weakens-xss-protection**

Using 'unsafe-eval' in CSP scriptSrc allows eval() and weakens XSS protection

📖 [Source](https://helmetjs.github.io/)

**⚠️ WARNING - short-hsts-maxage**

HSTS maxAge less than 1 year (31536000 seconds) provides insufficient HTTPS enforcement

📖 [Source](https://helmetjs.github.io/)

**ℹ️ INFO - upgrade-insecure-requests-localhost**

upgradeInsecureRequests directive causes Safari to redirect localhost to HTTPS, breaking development

📖 [Source](https://helmetjs.github.io/)

**⚠️ WARNING - deprecated-api-v4-to-v5**

helmet 5.x+ changed API - individual middleware functions must be called through main helmet() function

📖 [Source](https://github.com/helmetjs/helmet/blob/main/CHANGELOG.md)

**⚠️ WARNING - disabled-headers-production**

Setting security middleware to false removes protection entirely

📖 [Source](https://helmetjs.github.io/)

---

### `contentSecurityPolicy()`

Sets Content-Security-Policy header to prevent XSS attacks (deprecated in v5+, use helmet( contentSecurityPolicy ) instead)

**Import:**
```typescript
import { contentSecurityPolicy } from 'helmet';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - deprecated-standalone-usage**

**Condition:** using helmet.contentSecurityPolicy() in helmet 5.x+

**Throws:** TypeError or undefined behavior due to breaking API changes

**Required Handling:**

helmet 5.x+ requires CSP configuration through main helmet() function. Old API: helmet.contentSecurityPolicy( directives:  ...  ) New API: helmet( contentSecurityPolicy:  directives:  ...   )


📖 [Source](https://github.com/helmetjs/helmet/blob/main/CHANGELOG.md)

---

### `strictTransportSecurity()`

Sets Strict-Transport-Security header to enforce HTTPS (deprecated in v5+, use helmet( strictTransportSecurity ) instead)

**Import:**
```typescript
import { strictTransportSecurity } from 'helmet';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - deprecated-standalone-usage**

**Condition:** using helmet.strictTransportSecurity() in helmet 5.x+

**Throws:** TypeError or undefined behavior due to breaking API changes

**Required Handling:**

helmet 5.x+ requires HSTS configuration through main helmet() function. Old API: helmet.hsts( maxAge: 31536000 ) New API: helmet( strictTransportSecurity:  maxAge: 31536000  )


📖 [Source](https://github.com/helmetjs/helmet/blob/main/CHANGELOG.md)

---

## Example: Proper Error Handling

```typescript
import helmet from 'helmet';

async function example() {
  try {
    const result = await helmet(/* args */);
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
