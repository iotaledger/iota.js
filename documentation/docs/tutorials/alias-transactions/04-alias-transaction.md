---
description: "Perform an Alias Transaction with iota.js."
image: /img/client_banner.png
keywords:
- tutorial
- alias
- output
- transaction
---

# Create an Alias Transaction

The State Controller of an Alias can perform transactions that change the Alias to a new state. The transaction generates a new Alias Output with the Alias ID of the original Alias. Remember that the Alias ID remains constant regardless of the Alias Output that holds the funds and the state metadata. The **Alias Output Id** changes, and once it is "spent", it is pruned from the ledger.

## Preparation

To create this transaction, you will need the following:

* A Shimmer Node. You can use the [Shimmer Testnet nodes](https://api.testnet.shimmer.network).

* The Alias ID of your Alias, in hexadecimal format `0x6dd4...`.

* The keys of the state controller of your Alias.

```typescript
const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });
const protocolInfo = await client.protocolInfo();

const stateControllerPubKey = "0x55419...";
const stateControllerPrivateKey = "0xa060ff...";
```

## Query Alias Output

You will first need to find the Alias Output of your Alias. The easiest way to do so is through a query to the [indexation plugin](https://wiki.iota.org/shimmer/inx-indexer/welcome/) by Alias ID. Observe that you need to obtain the full output details as we need to use them as input for the transaction.

```typescript
const indexerPlugin = new IndexerPluginClient(client);
const outputList = await indexerPlugin.alias(aliasId);
const consumedOutputId = outputList.items[0];
console.log("Consumed Output Id", consumedOutputId);

const initialAliasOutputDetails = await client.output(consumedOutputId);
const initialAliasOutput: IAliasOutput = initialAliasOutputDetails.output as IAliasOutput;
```

## Assign the New State

To continue, you can create the new Alias Output by cloning the one received in the [previous step](#query-alias-output), and then increment the `stateIndex` and set the new `stateMetadata`. Now, you are ready to define the transaction. You should ensure that you assign the correct `aliasId` to your new Alias Output.

As the proof size does not change between state changes, your new Alias Output does not need to increase its storage deposit.

```typescript
const nextAliasOutput: IAliasOutput = JSON.parse(JSON.stringify(initialAliasOutput));
nextAliasOutput.stateIndex++;
nextAliasOutput.stateMetadata = "0x98765";
console.log("New state index: ", nextAliasOutput.stateIndex);
nextAliasOutput.aliasId = aliasId;
```

## Define the Transaction

The transaction takes the original Alias Output as Input and generates a new Alias Output with the new state but keeps the original Alias ID.

```typescript
const inputs: IUTXOInput[] = [];
const outputs: IAliasOutput[] = [];

inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));
outputs.push(nextAliasOutput);

const inputsCommitment = TransactionHelper.getInputsCommitment([initialAliasOutput]);

const transactionEssence: ITransactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: TransactionHelper.networkIdFromNetworkName(protocolInfo.networkName),
    inputs,
    inputsCommitment,
    outputs
};
```

## Unlock your Input

To unlock your Input you need to provide the signature of the State Controller calculated against the transaction essence.

```typescript
const wsTsxEssence = new WriteStream();
serializeTransactionEssence(wsTsxEssence, transactionEssence);
const essenceFinal = wsTsxEssence.finalBytes();

const essenceHash = Blake2b.sum256(essenceFinal);

const unlockCondition: ISignatureUnlock = {
    type: SIGNATURE_UNLOCK_TYPE,
    signature: {
        type: ED25519_SIGNATURE_TYPE,
        publicKey: stateControllerPubKey,
        signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(stateControllerPrivateKey), essenceHash), true)
    }
};

const transactionPayload: ITransactionPayload = {
    type: TRANSACTION_PAYLOAD_TYPE,
    essence: transactionEssence,
    unlocks: [unlockCondition]
};   
```

## Submit the Block

Finally, you should submit the block. After the block is confirmed, if you query your Alias Address through [the Shimmer Explorer](https://explorer.shimmer.network/shimmer), you will find the new Alias Output with the updated state.

```typescript
const block: IBlock = {
    protocolVersion: DEFAULT_PROTOCOL_VERSION,
    parents: [],
    payload: transactionPayload,
    nonce: "0",
};

const blockId = await client.blockSubmit(block);
console.log("Block Id:", blockId);
```

## Putting It All Together

The complete source code of this part of the tutorial is available in the [official iota.js GitHub repository](https://github.com/iotaledger/iota.js/blob/feat/stardust/packages/iota/examples/shimmer-alias-transaction-tutorial/src/alias-transaction.ts).
