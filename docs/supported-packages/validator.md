---
title: "validator"
---

# validator

| Property | Value |
|----------|-------|
| **Package** | `validator` |
| **Versions Covered** | `>=13.15.20` |
| **Contract Version** | `1.0.0` |
| **Status** | `draft` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install validator
```

## Covered Functions

This contract covers 5 function(s):

### `escape()`

Escapes HTML special characters to prevent XSS attacks

**Import:**
```typescript
import { escape } from 'validator';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - escape-xss-prevention**

**Condition:** user input rendered in HTML without escaping

**Returns:**

escaped string (always succeeds)

**Required Handling:**

Caller MUST use escape() on ALL user input before rendering in HTML. Failure to escape allows XSS attacks, session hijacking, and data theft. CRITICAL: This is the #1 web security vulnerability.


📖 [Source](https://owasp.org/www-community/attacks/xss/)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - always-escape-user-input**

escape() replaces , , &, ', ", / with HTML entities. It ALWAYS succeeds and returns a string. However, failing to call escape() on user input before HTML rendering is the most common XSS vulnerability.


📖 [Source](https://github.com/validatorjs/validator.js#validators)

**ℹ️ INFO - template-engine-escaping**

Many template engines (React, EJS, Handlebars) auto-escape by default. Only use escape() when rendering raw HTML or using dangerouslySetInnerHTML.


📖 [Source](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)

---

### `normalizeEmail()`

Normalizes email addresses to prevent spoofing and duplicate accounts

**Import:**
```typescript
import { normalizeEmail } from 'validator';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - normalize-email-failure**

**Condition:** email format is invalid

**Returns:**

false (boolean)

**Required Handling:**

Caller MUST check return value. normalizeEmail() returns false for invalid emails, not a normalized string. Failing to check allows invalid emails to be stored, causing authentication failures.


📖 [Source](https://github.com/validatorjs/validator.js/issues/1089)

**⚠️ WARNING - normalize-email-spoofing**

**Condition:** email not normalized before storage

**Returns:**

normalized email string OR false

**Required Handling:**

Caller MUST normalize emails before storage. Without normalization, users can create duplicate accounts via case differences (User@Example.com vs user@example.com) or Gmail +alias bypass (user+1@gmail.com).


📖 [Source](https://github.com/validatorjs/validator.js#sanitizers)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - gmail-alias-removal**

normalizeEmail() removes Gmail +alias suffixes by default (user+spam@gmail.com becomes user@gmail.com). This prevents duplicate account creation but may break legitimate use cases. Use options:  gmail_remove_subaddress: false  to preserve aliases.


📖 [Source](https://github.com/validatorjs/validator.js#sanitizers)

---

### `isEmail()`

Validates email format (returns boolean, does not throw)

**Import:**
```typescript
import { isEmail } from 'validator';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - invalid-email**

**Condition:** email format is invalid

**Returns:**

false (boolean)

**Required Handling:**

Caller MUST check return value. isEmail() returns false for invalid emails, it does NOT throw. Failing to check allows invalid emails into the system, causing authentication and delivery failures.


📖 [Source](https://www.npmjs.com/package/validator)

**⚠️ WARNING - email-not-validated**

**Condition:** user email not validated before storage or sending

**Returns:**

false for invalid, true for valid

**Required Handling:**

Caller MUST validate emails before storage or sending. Accepting invalid emails causes delivery failures, spam, and phishing attacks.


📖 [Source](https://github.com/validatorjs/validator.js#validators)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - email-validation-options**

isEmail() has 40+ options for strict validation (allow_display_name, require_tld, allow_utf8_local_part, etc.). Default options accept most valid emails but may allow edge cases. Use strict options for security-critical applications.


📖 [Source](https://github.com/validatorjs/validator.js#validators)

---

### `isURL()`

Validates URL format (CRITICAL: requires protocol whitelist to prevent XSS)

**Import:**
```typescript
import { isURL } from 'validator';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - invalid-url**

**Condition:** URL format is invalid

**Returns:**

false (boolean)

**Required Handling:**

Caller MUST check return value. isURL() returns false for invalid URLs, it does NOT throw. Failing to check allows malformed URLs to pass through.


📖 [Source](https://www.npmjs.com/package/validator)

**🔴 ERROR - url-protocol-not-whitelisted**

**Condition:** URL protocol not restricted to safe protocols (https only)

**Returns:**

true for valid URL (including javascript:, data:, file: URIs)

**Required Handling:**

Caller MUST whitelist URL protocols. Default isURL() accepts dangerous protocols like javascript:, data:, and file: which enable XSS and phishing. ALWAYS use: isURL(url,  protocols: ['https'], require_protocol: true )


📖 [Source](https://github.com/validatorjs/validator.js/security/advisories/GHSA-9965-vmph-33xx)

**🔴 ERROR - url-validation-bypass-cve**

**Condition:** validator version  13.15.20

**Returns:**

true (but may incorrectly validate malicious URLs)

**Required Handling:**

CRITICAL: CVE-2025-56200 affects validator  13.15.20. The isURL() function has a validation bypass allowing XSS and open redirect attacks. Upgrade to 13.15.20+ immediately. Exploit POC available publicly.


📖 [Source](https://github.com/advisories/GHSA-9965-vmph-33xx)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - open-redirect-vulnerability**

Using isURL() for redirect validation WITHOUT protocol whitelist allows attackers to redirect users to phishing sites. Always validate destination URLs against an allowlist of trusted domains, not just URL format.


📖 [Source](https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html)

---

### `isJSON()`

Validates JSON format before JSON.parse() to prevent crashes

**Import:**
```typescript
import { isJSON } from 'validator';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - invalid-json**

**Condition:** JSON format is invalid

**Returns:**

false (boolean)

**Required Handling:**

Caller SHOULD use isJSON() before JSON.parse(). JSON.parse() throws SyntaxError on invalid JSON, crashing the application. isJSON() returns false safely, allowing graceful error handling.


📖 [Source](https://github.com/validatorjs/validator.js#validators)

**⚠️ WARNING - json-parse-without-validation**

**Condition:** JSON.parse() called on untrusted input without validation

**Returns:**

false for invalid JSON

**Required Handling:**

Caller SHOULD validate JSON before parsing. Without validation, malformed JSON from user input or external APIs causes uncaught SyntaxError exceptions, crashing the application or API endpoint.


📖 [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#exceptions)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - json-parse-dos**

Large or deeply nested JSON can cause performance issues even if valid. Consider size limits (max 1MB) and depth limits (max 100 levels) before parsing user-provided JSON to prevent DoS attacks.


📖 [Source](https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html)

---

## Example: Proper Error Handling

```typescript
import validator from 'validator';

async function example() {
  try {
    const result = await escape(/* args */);
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
