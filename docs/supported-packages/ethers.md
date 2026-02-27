---
title: "ethers"
---

# ethers

| Property | Value |
|----------|-------|
| **Package** | `ethers` |
| **Versions Covered** | `>=6.0.0 <7.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-25 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install ethers
```

## Covered Functions

This contract covers 2 function(s):

### `getBalance()`

Gets account balance from blockchain

**Import:**
```typescript
import { getBalance } from 'ethers';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - getbalance-rpc-error**

**Condition:** RPC call fails (network down, rate limit, invalid address, node error)

**Throws:** Error with RPC error details and error code

**Required Handling:**

Caller MUST wrap provider.getBalance() in try-catch to handle RPC errors. Network failures, rate limits, and invalid addresses crash application if unhandled.

📖 [Source](https://docs.ethers.org/v6/api/providers/#Provider-getBalance)

---

### `sendTransaction()`

Sends transaction to blockchain

**Import:**
```typescript
import { sendTransaction } from 'ethers';
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - sendtransaction-error**

**Condition:** transaction fails (insufficient gas, nonce error, network error, reverted)

**Throws:** Error with transaction failure details (gas estimation, nonce, revert reason)

**Required Handling:**

Caller MUST wrap sendTransaction() in try-catch to handle transaction errors. Gas estimation failures, nonce conflicts, and reverted transactions crash application if unhandled. Check error.code for specific error types.

📖 [Source](https://docs.ethers.org/v6/api/providers/#Signer-sendTransaction)

---

## Example: Proper Error Handling

```typescript
import ethers from 'ethers';

async function example() {
  try {
    const result = await getBalance(/* args */);
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
