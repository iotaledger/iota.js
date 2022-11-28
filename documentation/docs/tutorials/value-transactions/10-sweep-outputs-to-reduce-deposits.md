---
description: "Learn how sweep your outputs into a single output to reduce storage costs."
image: /img/client_banner.png
keywords:
- tutorial
- single output
- unlock conditions
- transactions payload
- transactions essence
- reference unlock conditions
- main unlock conditions

---

# Sweep Outputs to Reduce Deposits

As introduced in [Understanding Deposits](09-understanding-deposits.md), if you would like to reduce your total storage
deposit, you can sweep your two outputs into a single output that will contain `0.10 SMR` by combining each `0.05 SMR`
existing output. To do so, you will need to create a new transaction and use the two existing outputs as inputs.

## Obtain the Existing Outputs

You can obtain the existing outputs by sending the address in Bech32 format to the indexer plugin. In this case, since
you want the two latest outputs; you can select the first two returned elements as shown below:

```typescript
const indexerPlugin = new IndexerPluginClient(client);
const outputList = await indexerPlugin.basicOutputs({
    addressBech32: destinationAddressBech32
});

const consumedOutputId1 = outputList.items[0];
const consumedOutputId2 = outputList.items[1];
```

You already know that each output will hold `0.05 SMR`. Still, you can query each output and obtain its amount by calling
the [`SingleNodeClient.output()`](../../references/client/classes/SingleNodeClient#output) function as shown below:

```typescript
const output1 = await client.output(consumedOutputId1);
const output2 = await client.output(consumedOutputId2);

// The two outputs are combined into only one output (the final amount will be 100000 Glow, 0.1 Shimmer)
const amount1 = bigInt(output1.output.amount);
const amount2 = bigInt(output2.output.amount);
```

## Define the Combined Output

The new output will hold the sum amount of `output1` and `output2`.

The unlock conditions correspond to the controller of the origin address. That means that, in this case, you are not
transferring funds to another address but to the same address collapsed into a single output.

Please note that you could also have transferred your new output to another address you control. Remember that with the initial seed, you can [generate multiple deterministic addresses](04-generate-addresses.md).

```typescript
const combinedOutput: IBasicOutput = {
    type: BASIC_OUTPUT_TYPE,
    amount: amount1.add(amount2).toString(),
    nativeTokens: [],
    unlockConditions: [
        {
            type: ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: destAddress
            }
        }
    ],
    features: []
};
```

## Sweep the Transaction Payload

To generate the sweep transaction, you need to:

1. Convert your initial outputs to inputs.
2. Generate a commitment
3. Create a transaction essence.

```typescript
const inputs: IUTXOInput[] = [];

inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId1));
inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId2));

const inputsCommitment = TransactionHelper.getInputsCommitment([output1.output, output2.output]);

const transactionEssence: ITransactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: protocolInfo.networkId,
    inputs,
    inputsCommitment,
    outputs: [combinedOutput]
};
```

Now, you need to calculate the hash of the transaction essence and provide the unlock conditions for each input. To provide the unlock conditions you will need the public and private keys of your address so that you can generate a proper digital signature.

In this particular case, the unlock conditions will be the same for each input, so the examples use a "Reference unlock condition", [`REFERENCE_UNLOCK_TYPE`](../../references/client/api_ref#reference_unlock_type).

```typescript
const wsTsxEssence = new WriteStream();
serializeTransactionEssence(wsTsxEssence, transactionEssence);
const essenceFinal = wsTsxEssence.finalBytes();

const essenceHash = Blake2b.sum256(essenceFinal);

const destAddressPubKey = "0x....";
const destAddressPrivateKey = "0x....";

// Main unlock condition 
const unlock1: ISignatureUnlock = {
    type: SIGNATURE_UNLOCK_TYPE,
    signature: {
        type: ED25519_SIGNATURE_TYPE,
        publicKey: destAddressPubKey,
        signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(destAddressPrivateKey), essenceHash), true)
    }
};

const unlock2: IReferenceUnlock = {
    type: REFERENCE_UNLOCK_TYPE,
    reference: 0
};

const transactionPayload: ITransactionPayload = {
    type: TRANSACTION_PAYLOAD_TYPE,
    essence: transactionEssence,
    unlocks: [unlock1, unlock2]
};
```

You can now [submit your transaction payload as block](08-transfer-funds.md#submit-the-block). Once the transaction is
confirmed, you can observe that the storage deposit is now reduced to `42600` Glow, but the balance is still `0.1 SMR`.


## Putting It All Together

By this point in the tutorial, your `sweep-deposits.ts`file should look something like this:

```typescript
import {Bip32Path, Bip39, Blake2b, Ed25519} from "@iota/crypto.js";
import {
    ADDRESS_UNLOCK_CONDITION_TYPE,
    BASIC_OUTPUT_TYPE,
    Bech32Helper,
    DEFAULT_PROTOCOL_VERSION,
    ED25519_ADDRESS_TYPE,
    ED25519_SIGNATURE_TYPE,
    Ed25519Address,
    Ed25519Seed,
    generateBip44Address,
    IBasicOutput,
    IBlock,
    IKeyPair, IndexerPluginClient, IReferenceUnlock,
    ISignatureUnlock,
    ITransactionEssence,
    ITransactionPayload,
    IUTXOInput, REFERENCE_UNLOCK_TYPE,
    serializeTransactionEssence,
    SIGNATURE_UNLOCK_TYPE,
    SingleNodeClient,
    TRANSACTION_ESSENCE_TYPE,
    TRANSACTION_PAYLOAD_TYPE,
    TransactionHelper
} from "@iota/iota.js";
import {Converter, WriteStream} from "@iota/util.js";
import {NeonPowProvider} from "@iota/pow-neon.js";
import bigInt from "big-integer";

const API_ENDPOINT = "https://api.testnet.shimmer.network";
const client = new SingleNodeClient(API_ENDPOINT, {powProvider: new NeonPowProvider()});
const protocolInfo = await client.protocolInfo();

console.log(protocolInfo);

const sourceAddress = "0x696cc8b1e0d2c1e29fbf3a4f491c0c9dc730c6e4c4e0d0ab6011e9f1209af013";
const sourceAddressBech32 = "rms1qp5kej93urfvrc5lhuay7jgupjwuwvxxunzwp59tvqg7nufqntcpxp26uj8";
const sourceAddressPublicKey = "NEED KEYS FOR EXAMPLE ADDRESS";
const sourceAddressPrivateKey = "NEED KEYS FOR EXAMPLE ADDRESS";

const destAddress = "0xbc9a935696546212c237e49e881fc6bdbd90bd0ec6140391982172f05a01b095";

const indexerPlugin = new IndexerPluginClient(client);
const outputList = await indexerPlugin.basicOutputs({
    addressBech32: sourceAddressBech32
});

const consumedOutputId1 = outputList.items[0];
const consumedOutputId2 = outputList.items[1];

const output1 = await client.output(consumedOutputId1);
const output2 = await client.output(consumedOutputId2);

// The two outputs are combined into only one output (the final amount will be 100000 Glow, 0.1 Shimmer)
const amount1 = bigInt(output1.output.amount);
const amount2 = bigInt(output2.output.amount);

const combinedOutput: IBasicOutput = {
    type: BASIC_OUTPUT_TYPE,
    amount: amount1.add(amount2).toString(),
    nativeTokens: [],
    unlockConditions: [
        {
            type: ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: destAddress
            }
        }
    ],
    features: []
};

const inputs: IUTXOInput[] = [];

inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId1));
inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId2));

const inputsCommitment = TransactionHelper.getInputsCommitment([output1.output, output2.output]);

const transactionEssence: ITransactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: protocolInfo.networkId,
    inputs,
    inputsCommitment,
    outputs: [combinedOutput]
};

const wsTsxEssence = new WriteStream();
serializeTransactionEssence(wsTsxEssence, transactionEssence);
const essenceFinal = wsTsxEssence.finalBytes();

const essenceHash = Blake2b.sum256(essenceFinal);

const destAddressPubKey = "0x....";
const destAddressPrivateKey = "0x....";

// Main unlock condition
const unlock1: ISignatureUnlock = {
    type: SIGNATURE_UNLOCK_TYPE,
    signature: {
        type: ED25519_SIGNATURE_TYPE,
        publicKey: destAddressPubKey,
        signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(destAddressPrivateKey), essenceHash), true)
    }
};

const unlock2: IReferenceUnlock = {
    type: REFERENCE_UNLOCK_TYPE,
    reference: 0
};

const transactionPayload: ITransactionPayload = {
    type: TRANSACTION_PAYLOAD_TYPE,
    essence: transactionEssence,
    unlocks: [unlock1, unlock2]
};

const block: IBlock = {
    protocolVersion: DEFAULT_PROTOCOL_VERSION,
    parents: [],
    payload: transactionPayload,
    nonce: "0",
};

const blockId = await client.blockSubmit(block);

console.log(blockId);

```
