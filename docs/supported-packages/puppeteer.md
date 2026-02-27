---
title: "puppeteer"
---

# puppeteer

| Property | Value |
|----------|-------|
| **Package** | `puppeteer` |
| **Versions Covered** | `>=1.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-26 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install puppeteer
```

## Covered Functions

This contract covers 6 function(s):

### `launch()`

Launches a browser instance

**Import:**
```typescript
import { launch } from 'puppeteer';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - launch-rejects-on-error**

**Condition:** browser launch fails (timeout, protocol error, missing Chrome)

**Throws:** Promise rejection with TimeoutError, ProtocolError, or Error

**Required Handling:**

Caller MUST use try-catch to handle Promise rejections from puppeteer.launch(). Common failures: timeout (default 30s), protocol errors in Docker/containers, missing Chrome binary. Browser instance MUST be closed in finally block to prevent zombie processes. Use pattern: let browser; try  browser = await puppeteer.launch();  catch (error)  /* handle */  finally  if (browser) await browser.close(); 


📖 [Source](https://pptr.dev/api/puppeteer.puppeteernode.launch)

---

### `goto()`

Navigates page to URL

**Import:**
```typescript
import { goto } from 'puppeteer';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - goto-rejects-on-timeout**

**Condition:** navigation timeout (default 30s) or network error

**Throws:** Promise rejection with TimeoutError

**Required Handling:**

Caller MUST use try-catch to handle Promise rejections from page.goto(). This is the #1 cause of production failures. Timeouts occur with slow networks, Cloudflare protection, heavy JavaScript pages. CRITICAL: In headless shell mode, HTTP 404/500 do NOT throw - must check response.ok(). Use pattern: const response = await page.goto(url,  timeout: 60000 ); if (!response || !response.ok()) throw new Error('Navigation failed');


📖 [Source](https://pptr.dev/api/puppeteer.page.goto)

---

### `newPage()`

Creates a new browser page

**Import:**
```typescript
import { newPage } from 'puppeteer';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - newpage-rejects-on-error**

**Condition:** page creation timeout or protocol error

**Throws:** Promise rejection with ProtocolError (Target.createTarget timed out)

**Required Handling:**

Caller MUST use try-catch to handle Promise rejections from browser.newPage(). Common in Docker/containers with rapid page creation cycles. Increase protocolTimeout in launch options for containers. Use pattern: try  const page = await browser.newPage();  catch (error)  /* handle */ 


📖 [Source](https://pptr.dev/api/puppeteer.browser.newpage)

---

### `close()`

Closes browser instance

**Import:**
```typescript
import { close } from 'puppeteer';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - browser-close-must-run**

**Condition:** browser instance exists after operations

**Throws:** May throw Error if browser already closed or connection lost

**Required Handling:**

Browser.close() MUST be called in finally block to prevent zombie Chrome processes. Each zombie process consumes 80-90MB. Accumulation causes memory exhaustion and server crashes. Close can itself throw errors - wrap in try-catch within finally to avoid masking original errors. Use pattern: finally  if (browser)  try  await browser.close();  catch (e)   


📖 [Source](https://pptr.dev/api/puppeteer.browser.close)

---

### `waitForSelector()`

Waits for element to appear

**Import:**
```typescript
import { waitForSelector } from 'puppeteer';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - waitforselector-rejects-on-timeout**

**Condition:** element not found within timeout (default 30s)

**Throws:** Promise rejection with TimeoutError

**Required Handling:**

Caller MUST use try-catch to handle TimeoutError from page.waitForSelector(). Timeouts common when element never appears or takes longer than expected. Consider increasing timeout for slow-loading pages. Use pattern: try  await page.waitForSelector('selector',  timeout: 10000 );  catch (error)  /* handle */ 


📖 [Source](https://pptr.dev/api/puppeteer.page.waitforselector)

---

### `click()`

Clicks an element

**Import:**
```typescript
import { click } from 'puppeteer';
```

#### Postconditions

What happens **after** calling this function:

**⚠️ WARNING - click-rejects-on-error**

**Condition:** element not found or not clickable

**Throws:** Promise rejection with Error

**Required Handling:**

Caller MUST use try-catch to handle errors from page.click(). Common failures: selector not found, element not clickable, element moved. CRITICAL: When click triggers navigation, use Promise.all([page.waitForNavigation(), page.click()]) to avoid race conditions. Use pattern: try  await page.click('button');  catch (error)  /* handle */ 


📖 [Source](https://pptr.dev/api/puppeteer.page.click)

---

## Example: Proper Error Handling

```typescript
import puppeteer from 'puppeteer';

async function example() {
  try {
    const result = await launch(/* args */);
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
