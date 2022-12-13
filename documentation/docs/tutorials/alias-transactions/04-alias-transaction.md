---
description: "Perform an Alias Transaction with iota.js."
image: /img/client_banner.png
keywords:
- tutorial
- alias
- output
- transaction
---

# Performing an Alias Transaction

The State Controller of an Alias can perform a transaction so that the Alias transits to a new state. The transaction generates a new Alias Output which Alias ID is the original one of the Alias. Remember that the alias ID remains constant regardless the Alias Output that holds the funds and the state metadata. It is the Alias Output Id the one which changes and once "spent" it is pruned from the ledger.

## Preparation

In order to perform this transaction it is needed:

* A Shimmer Node. You can use the [Shimmer testnet nodes](https://api.testnet.shimmer.network).

* The Alias ID of your Alias, in hexadecimal format `0x6dd4...`

* The keys of the state controller of your Alias

```typescript
const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });
const protocolInfo = await client.protocolInfo();

const stateControllerPubKey = "0x55419...";
const stateControllerPrivateKey = "0xa060ff...";
```

## Query Alias Output

The first thing that it is needed is to find the Alias Output of your Alias and the easiest way to do it is through a query to the indexation plugin by Alias ID. Observe that we need to obtain the full output details as we would need to use it as input of our transaction.

```typescript
const indexerPlugin = new IndexerPluginClient(client);
const outputList = await indexerPlugin.alias(aliasId);
const consumedOutputId = outputList.items[0];
console.log("Consumed Output Id", consumedOutputId);

const initialAliasOutputDetails = await client.output(consumedOutputId);
const initialAliasOutput: IAliasOutput = initialAliasOutputDetails.output as IAliasOutput;
```

## Assign the new state

In order to continue we can create the new Alias Output by just cloning the one received in the previous step, and afterwards increment the `stateIndex` and set the new `stateMetadata`. Now we are ready to define our transaction. Observe that we ensure we assign the correct aliasId to our new Alias Output. 

As the size of the proof does not change in between state changes, our new Alias Output does not need to increase its storage deposit.

```typescript
const nextAliasOutput: IAliasOutput = JSON.parse(JSON.stringify(initialAliasOutput));
nextAliasOutput.stateIndex++;
nextAliasOutput.stateMetadata = "0x98765";
console.log("New state index: ", nextAliasOutput.stateIndex);
nextAliasOutput.aliasId = aliasId;
```

## Define the transaction

The transaction to be performed takes as input the original Alias Output and generates a new Alias Output with the new state but, as you know, keeping the original Alias ID.

```typescript
const inputs: IUTXOInput[] = [];
const outputs: IAliasOutput[] = [];

inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));
outputs.push(nextAliasOutput);

const inputsCommitment = TransactionHelper.getInputsCommitment([initialAliasOutput]);

const transactionEssence: ITransactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: protocolInfo.networkId,
    inputs,
    inputsCommitment,
    outputs
};
```

## Provide unlock conditions

The unlock conditions to be provided correspond to the State Controller signature calculated against the transaction essence.

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

## Submit block

And finally we submit the block. After the block is confirmed if you query your Alias Address through the Explorer you will find the new Alias Output with the updated state.

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
