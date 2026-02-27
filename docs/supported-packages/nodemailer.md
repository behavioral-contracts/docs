---
title: "nodemailer"
---

# nodemailer

| Property | Value |
|----------|-------|
| **Package** | `nodemailer` |
| **Versions Covered** | `>=7.0.11` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install nodemailer
```

## Covered Functions

This contract covers 3 function(s):

### `sendMail()`

Sends email via configured transport

**Import:**
```typescript
import { sendMail } from 'nodemailer';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - connection-error**

**Condition:** Network connectivity issues (TCP connection failed, timeout, DNS failure)

**Throws:** Error with code: ECONNECTION, ETIMEDOUT, EDNS, ESOCKET

**Required Handling:**

Caller MUST catch connection errors. ECONNECTION: TCP connection failed or closed unexpectedly. ETIMEDOUT: Connection/greeting/socket timeout (defaults: 2min/30s/10min). EDNS: Hostname DNS resolution failed. ESOCKET: Low-level socket error from net/tls modules. These errors are TRANSIENT and RETRIABLE with exponential backoff.


📖 [Source](https://nodemailer.com/errors/#econnection)

**🔴 ERROR - authentication-failure**

**Condition:** SMTP authentication fails (wrong credentials, locked account, unsupported auth)

**Throws:** Error with code: EAUTH, ENOAUTH, EOAUTH2

**Required Handling:**

Caller MUST catch authentication errors. EAUTH: Invalid username/password, account locked, unsupported auth method. ENOAUTH: Authentication required but not configured. EOAUTH2: OAuth2 token refresh failed or invalid credentials. DO NOT RETRY - indicates configuration issue. Check SMTP credentials and account status.


📖 [Source](https://nodemailer.com/errors/#eauth)

**🔴 ERROR - tls-ssl-error**

**Condition:** TLS/SSL certificate validation fails or STARTTLS fails

**Throws:** Error with code: ETLS, EREQUIRETLS

**Required Handling:**

Caller MUST catch TLS errors. ETLS: Certificate validation failed, hostname mismatch, STARTTLS failed. EREQUIRETLS: RFC 8689 REQUIRETLS extension unsupported by server. DO NOT RETRY - indicates certificate or TLS configuration issue. Verify SSL certificate validity and STARTTLS support.


📖 [Source](https://nodemailer.com/smtp/#tls-options)

**🔴 ERROR - invalid-recipient**

**Condition:** Recipient email address is malformed or rejected

**Throws:** Error with code: EENVELOPE

**Required Handling:**

Caller MUST validate email addresses before sending. EENVELOPE: Invalid recipient format, missing from/to address, SMTP rejected. Validate against RFC 5321/5322 before calling sendMail(). Check info.rejected array for partial failures. SECURITY: Sanitize addresses to prevent CVE-2021-23400 (header injection).


📖 [Source](https://nodemailer.com/errors/#eenvelope)

**🔴 ERROR - message-content-error**

**Condition:** Message content is invalid or attachments fail to load

**Throws:** Error with code: EMESSAGE, EFILEACCESS, EURLACCESS, EFETCH, ESTREAM

**Required Handling:**

Caller MUST validate message content and attachments. EMESSAGE: Invalid message structure, encoding issues. EFILEACCESS: Attachment file not found or unreadable. EURLACCESS: Cannot fetch URL attachment. EFETCH: HTTP error fetching remote content. ESTREAM: Attachment stream failed. Verify attachment paths exist and are readable before sending.


📖 [Source](https://nodemailer.com/message/attachments/)

**🔴 ERROR - protocol-error**

**Condition:** SMTP protocol violation or configuration error

**Throws:** Error with code: EPROTOCOL, ECONFIG, EMAXLIMIT

**Required Handling:**

Caller MUST handle protocol errors. EPROTOCOL: SMTP protocol error from server. ECONFIG: Invalid transport configuration. EMAXLIMIT: Message size exceeds server limit. Check SMTP server logs and message size limits.


📖 [Source](https://nodemailer.com/errors/#eprotocol)

#### Edge Cases

Known gotchas and sharp edges:

**⚠️ WARNING - missing-await-serverless**

MOST COMMON PRODUCTION BUG (30-40% of issues): Missing await in serverless. In AWS Lambda, Google Cloud Functions, or Vercel Functions, forgetting to await sendMail() causes function to terminate before email is sent. No error is logged because promise rejection happens after termination. ALWAYS use: await transporter.sendMail(mailOptions) NEVER use: transporter.sendMail(mailOptions) // Missing await! This is the #1 cause of "emails not sending" support tickets.


📖 [Source](https://github.com/nodemailer/nodemailer/issues/1174)

**⚠️ WARNING - no-input-validation**

SECURITY CRITICAL: Not sanitizing email addresses enables CVE-2021-23400. Attackers can inject HTTP headers via newlines/carriage returns in addresses. ALWAYS sanitize: email.replace(/[\r\n]/g, '') REQUIRED: Validate against RFC 5321/5322 format. Affects ALL user-supplied email addresses (to, from, cc, bcc, replyTo).


📖 [Source](https://nvd.nist.gov/vuln/detail/CVE-2021-23400)

**⚠️ WARNING - ignored-rejected-recipients**

COMMON: Not checking info.rejected array causes silent partial failures. sendMail() succeeds even if some recipients were rejected. ALWAYS check: if (info.rejected.length  0)  handle_partial_failure();  Also check: info.rejectedErrors for detailed error per rejected recipient.


📖 [Source](https://github.com/nodemailer/nodemailer/issues/414)

**ℹ️ INFO - new-transporter-each-time**

PERFORMANCE: Creating new transporter for each email causes overhead. Creates new connection pool every time, wastes resources, may exceed limits. CORRECT: Create once during initialization, reuse for all emails. Use pool: true for high-volume sending (default: 5 connections).


📖 [Source](https://nodemailer.com/smtp/pooled/)

**ℹ️ INFO - no-retry-transient-errors**

RELIABILITY: Not retrying transient network errors causes permanent failures. RETRIABLE: ECONNECTION, ETIMEDOUT, EDNS, ESOCKET NON-RETRIABLE: EAUTH, ENOAUTH, EENVELOPE, ETLS Implement exponential backoff: 1s, 2s, 4s, 8s delays. Use job queue (Bull, BullMQ) for production retry logic.


📖 [Source](https://github.com/nodemailer/nodemailer/issues/1340)

---

### `verify()`

Verifies SMTP connection and configuration

**Import:**
```typescript
import { verify } from 'nodemailer';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - verification-failure**

**Condition:** SMTP connection or authentication fails during verification

**Throws:** Error with code: ECONNECTION, EAUTH, ETLS, EDNS, ETIMEDOUT

**Required Handling:**

Caller MUST catch verification errors. Call verify() during application initialization to catch config issues early. Same error codes as sendMail() connection/auth errors. Verification failure indicates configuration problem - fix before deployment.


📖 [Source](https://nodemailer.com/usage/#verify-smtp-connection-configuration)

#### Edge Cases

Known gotchas and sharp edges:

**ℹ️ INFO - no-verify-before-production**

BEST PRACTICE: Not calling verify() during initialization means config errors are discovered only when first email is sent (possibly in production). ALWAYS call verify() during app startup to fail fast on misconfiguration. Example: await transporter.verify(); // Before serving requests


📖 [Source](https://github.com/nodemailer/nodemailer/issues/206)

---

### `createTransport()`

Creates reusable email transport instance

**Import:**
```typescript
import { createTransport } from 'nodemailer';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - configuration-error**

**Condition:** Invalid transport configuration

**Throws:** Error with code: ECONFIG

**Required Handling:**

Caller MUST validate transport configuration. Common issues: missing host/port, invalid auth structure, unsupported options. Use environment variables for credentials, never hardcode. Call verify() after createTransport() to test configuration.


📖 [Source](https://nodemailer.com/smtp/)

---

## Example: Proper Error Handling

```typescript
import nodemailer from 'nodemailer';

async function example() {
  try {
    const result = await sendMail(/* args */);
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
