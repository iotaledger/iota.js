---
description: "Query for any output details by ID using the Node API through the iota.js library."
image: /img/client_banner.png
keywords:

- tutorial
- query output details
- output details
- metadata
- output type
- unlock conditions
- public key hash

---

# Query Output Details

If you know an `output Id`, you can query the details of using the Node API through the `iota.js` library.

## Connect to a Node

The first thing you will need to do is to connect to a node by instantiating a `client` using
the [`SingleNodeClient()`](../../references/client/classes/SingleNodeClient)
class.

```typescript
const API_ENDPOINT = "https://api.testnet.shimmer.network";
const client = new SingleNodeClient(API_ENDPOINT, {powProvider: new NeonPowProvider()});
const protocolInfo = await client.protocolInfo();

console.log(protocolInfo);
```

The code above uses the [`NeonPowProvider`](../../references/pow-neon/classes/NeonPowProvider) to calculate the PoW when
submitting blocks.
The `NeonPowProvider` executes native code and calculates the PoW faster.

The code above uses the the [`client.protocolInfo()`](../../references/client/classes/SingleNodeClient#protocolinfo)
function to retrieve metadata about the network, including the HRP for the BECH32 addresses, as mentioned when
you [generated the public address](05-public-addresses.md):

```json
{
  "networkName": "testnet",
  "networkId": "8342982141227064571",
  "bech32Hrp": "rms",
  "minPowScore": 1500
}
```

Through the interface exposed by the `iota.js` `SingleNodeClient`, you can get the details of your output, for example:

```typescript
const outputID = "0xcba9a6616df8e8e323d8203ea5d1a42e2e7c64dc9ead6b59f5d26bdc301efa540000";
const outputDetails = await client.output(outputID);
console.log(outputDetails);
```

```json
{
  "metadata": {
    "blockId": "0x2b6a3301572f19e3596c2832e55c913ef9d3acc1ba345600ad76a8e4068b9f47",
    "transactionId": "0xcba9a6616df8e8e323d8203ea5d1a42e2e7c64dc9ead6b59f5d26bdc301efa54",
    "outputIndex": 0,
    "isSpent": false,
    "milestoneIndexBooked": 1692812,
    "milestoneTimestampBooked": 1666599405,
    "ledgerIndex": 1693193
  },
  "output": {
    "type": 3,
    "amount": "1000000000",
    "unlockConditions": [
      {
        "type": 0,
        "address": {
          "type": 0,
          "pubKeyHash": "0x696cc8b1e0d2c1e29fbf3a4f491c0c9dc730c6e4c4e0d0ab6011e9f1209af013"
        }
      }
    ]
  }
}
```

The output details contain two different groups of information:

* **metadata** that conveys the status of the output on the Ledger.

* The **output details** include the type of output (`3` for value, i.e., basic outputs), the amount (in Glows), and the
  unlock conditions. You can observe that the unlock conditions contain
  the [Ed22519 public key hash](../../references/client/interfaces/IEd25519Address#pubkeyhash) of your initial
  address. That means that only the one who controls the private key corresponding to that public key hash can
  unlock this output and use the corresponding funds. The protocol defines other
  possible [unlock conditions](https://wiki.iota.org/shimmer/introduction/explanations/what_is_stardust/unlock_conditions)
  that will be when you [prepare the transaction](08-transfer-funds.md#Preparing-outputs).

## Putting It All Together

By this point in the tutorial, your `send-value-transactions.ts`file should look something like this:

```typescript
import {Bip32Path, Bip39} from "@iota/crypto.js";
import {
    Bech32Helper,
    ED25519_ADDRESS_TYPE,
    Ed25519Address,
    Ed25519Seed,
    generateBip44Address,
    IKeyPair, SingleNodeClient
} from "@iota/iota.js";
import {Converter} from "@iota/util.js";
import {NeonPowProvider} from "@iota/pow-neon.js";

const API_ENDPOINT = "https://api.testnet.shimmer.network";
const client = new SingleNodeClient(API_ENDPOINT, {powProvider: new NeonPowProvider()});
const protocolInfo = await client.protocolInfo();

console.log(protocolInfo);

const outputID = "0xcba9a6616df8e8e323d8203ea5d1a42e2e7c64dc9ead6b59f5d26bdc301efa540000";
const outputDetails = await client.output(outputID);
console.log(outputDetails);
```
