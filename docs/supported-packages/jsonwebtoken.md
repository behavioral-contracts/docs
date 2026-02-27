---
title: "jsonwebtoken"
---

# jsonwebtoken

| Property | Value |
|----------|-------|
| **Package** | `jsonwebtoken` |
| **Versions Covered** | `>=9.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `draft` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install jsonwebtoken
```

## Covered Functions

This contract covers 2 function(s):

### `verify()`

Verifies a JWT token signature and returns decoded payload - CRITICAL security boundary

**Import:**
```typescript
import { verify } from 'jsonwebtoken';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - verify-token-expired**

**Condition:** token's exp claim is before current time

**Throws:** TokenExpiredError: jwt expired

**Required Handling:**

Caller MUST wrap jwt.verify() in try-catch block or use callback error-first pattern. TokenExpiredError indicates legitimate expiration - handle gracefully with 401 response and prompt user to refresh token or re-authenticate.


📖 [Source](https://github.com/auth0/node-jsonwebtoken#errors--codes)

**🔴 ERROR - verify-token-not-active**

**Condition:** token's nbf claim is after current time

**Throws:** NotBeforeError: jwt not active

**Required Handling:**

Caller MUST handle NotBeforeError. Token is valid but not yet active. Either reject with 401 or retry after specified date.


📖 [Source](https://github.com/auth0/node-jsonwebtoken#errors--codes)

**🔴 ERROR - verify-invalid-signature**

**Condition:** token signature does not match expected value

**Throws:** JsonWebTokenError: invalid signature

**Required Handling:**

Caller MUST handle JsonWebTokenError for invalid signatures. This indicates tampering or wrong secret/key. CRITICAL security event - log and reject with 403. Never expose error details to client.


📖 [Source](https://github.com/auth0/node-jsonwebtoken#errors--codes)

**🔴 ERROR - verify-malformed-token**

**Condition:** token structure is invalid (not 3 parts, invalid base64, etc.)

**Throws:** JsonWebTokenError: jwt malformed

**Required Handling:**

Caller MUST handle JsonWebTokenError for malformed tokens. Invalid structure indicates corrupted token or attack. Reject with 400 or 403.


📖 [Source](https://github.com/auth0/node-jsonwebtoken#errors--codes)

**🔴 ERROR - verify-invalid-algorithm**

**Condition:** token algorithm not in options.algorithms whitelist

**Throws:** JsonWebTokenError: invalid algorithm

**Required Handling:**

Caller MUST handle algorithm mismatch errors. This prevents CVE-2015-9235 algorithm confusion attack. Always specify algorithms option in verify().


📖 [Source](https://nvd.nist.gov/vuln/detail/CVE-2015-9235)

**🔴 ERROR - verify-audience-mismatch**

**Condition:** token aud claim does not match options.audience

**Throws:** JsonWebTokenError: jwt audience invalid. expected: [expected]

**Required Handling:**

Caller MUST handle audience validation errors when using options.audience. Audience mismatch indicates token intended for different service.


📖 [Source](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback)

**🔴 ERROR - verify-issuer-mismatch**

**Condition:** token iss claim does not match options.issuer

**Throws:** JsonWebTokenError: jwt issuer invalid. expected: [expected]

**Required Handling:**

Caller MUST handle issuer validation errors when using options.issuer. Issuer mismatch indicates token from untrusted source.


📖 [Source](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback)

**🔴 ERROR - verify-missing-secret**

**Condition:** secretOrPublicKey parameter is undefined or empty

**Throws:** JsonWebTokenError: secret or public key must be provided

**Required Handling:**

Caller MUST handle missing secret errors. This typically indicates configuration error (missing environment variable). Fatal error - should fail fast on application startup, not at runtime.


📖 [Source](https://github.com/auth0/node-jsonwebtoken)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - algorithm-confusion-cve-2015-9235**

CRITICAL: Always specify algorithms option in jwt.verify() to prevent CVE-2015-9235 algorithm confusion attack. Without algorithms whitelist, attacker can change RS256 (asymmetric) to HS256 (symmetric) and use public key as HMAC secret, bypassing signature verification. Vulnerable: jwt.verify(token, publicKey) Secure: jwt.verify(token, publicKey,  algorithms: ['RS256'] )


📖 [Source](https://nvd.nist.gov/vuln/detail/CVE-2015-9235)

**⚠️ WARNING - callback-error-handling**

When using callback-style jwt.verify(token, secret, callback), MUST check err parameter before using decoded value. Common mistake: jwt.verify(token, secret, (err, decoded) = 
  console.log(decoded.userId); // BUG: decoded undefined if error\!
); Correct pattern: Check err first, return early if error exists.


📖 [Source](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback)

---

### `sign()`

Signs a JWT token with secret or private key

**Import:**
```typescript
import { sign } from 'jsonwebtoken';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - sign-invalid-payload**

**Condition:** payload is not a plain object, string, or buffer

**Throws:** Error: Expected 'payload' to be a plain object, Buffer, or string

**Required Handling:**

Caller MUST validate payload type before calling jwt.sign() or wrap in try-catch. Common when payload is null, undefined, or Promise object (forgot await on database query).


📖 [Source](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback)

**🔴 ERROR - sign-missing-secret**

**Condition:** secretOrPrivateKey is undefined, null, or empty

**Throws:** Error: secretOrPrivateKey must have a value

**Required Handling:**

Caller MUST ensure secret exists before calling jwt.sign(). Missing secret indicates configuration error. Should fail fast on startup, not at runtime during login.


📖 [Source](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback)

**🔴 ERROR - sign-invalid-options**

**Condition:** options.algorithm is invalid or unsupported

**Throws:** Error: 'algorithm' must be a valid string enum value

**Required Handling:**

Caller MUST validate algorithm option. Common mistake: typo in algorithm name (e.g., 'HS-256' instead of 'HS256').


📖 [Source](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback)

**🔴 ERROR - sign-invalid-expiresin**

**Condition:** options.expiresIn is invalid format

**Throws:** Error: invalid expiresIn option

**Required Handling:**

Caller MUST validate expiresIn format. Accepts seconds (number) or time span string ('1h', '2d', '30s'). Invalid format throws.


📖 [Source](https://github.com/auth0/node-jsonwebtoken#token-expiration-exp-claim)

**🔴 ERROR - sign-claim-conflict**

**Condition:** options.expiresIn provided but payload already has exp property

**Throws:** Error: Bad 'options.expiresIn' option the payload already has an 'exp' property

**Required Handling:**

Caller MUST NOT set exp in both payload and options. Choose one method: either payload.exp or options.expiresIn, not both.


📖 [Source](https://github.com/auth0/node-jsonwebtoken#token-expiration-exp-claim)

---

## Example: Proper Error Handling

```typescript
import jsonwebtoken from 'jsonwebtoken';

async function example() {
  try {
    const result = await verify(/* args */);
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
