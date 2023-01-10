---
description: "Melt native tokens with iota.js."
image: /img/client_banner.png
keywords:
- tutorial
- alias
- address
- output
- melt
- foundry
- native
- token
- digital
- asset
---

# Melting native tokens

In this part of the tutorial you will learn how to transition an existing Foundry Output to a new state. Specifically you will learn how to melt the tokens that were transferred to an Output in the [previous part of this tutorial](). This transaction is going to involve three Inputs and three Outputs as follows:

* Input #1 The unspent Output of the Alias Address that controls your Foundry, created in [part 3 of this tutorial]().
* Input #2. The Foundry Output created in [part 3 of this tutorial](), controlled by your Alias Address and which corresponds to the serial number `1`.
* Input #3. The UTXO created in [part 4 of this tutorial]() that holds `12` native tokens that you are going to melt by issuing this transaction.

* Output #1 The next Alias Output that captures the state of your Alias Address.
* Output #2 The next Foundry Output that captures the next state of your Foundry (declaring melted tokens after transaction confirmation)
* Output #3 The same as Input #3 but without any native token as they will have been melted.

## Preparation

In order to perform this transaction it is needed:

* A Shimmer Node. You can use the [Shimmer testnet nodes](https://api.testnet.shimmer.network).

* The Alias ID of your Alias, in hexadecimal format `0x6dd4...`.

* The keys of the State Controller of your Alias.

* The address (and keys) that holds the native tokens to be melted `rms1qryyzvm...`.

```typescript
const aliasId = process.argv[2];
if (!aliasId) {
    console.error("Please provide your Alias Id");
    process.exit(-1);
}

const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });
const nodeInfo = await client.info();
const protocolInfo = nodeInfo.protocol;

const stateControllerAddress = "0x647f...";
const stateControllerPubKey = "0x55419...";
const stateControllerPrivateKey = "0xa060f...";

const nativeTokenOwnerAddress = "0xc8413...";
const nativeTokenOwnerAddressBech32 = "rms1qryyzvmx...";
const nativeTokenOwnerPubKey = "0xa5e76a...";
const nativeTokenOwnerPrivateKey = "0xc4e210...";
```

## Set new state of your Alias Address

In this step you need to transition the Alias Address to a new state, as one of its bound elements, the Foundry, is changing its state.

### Query Alias Output

First of all you need to find the unspent Alias Output of your Alias Address through a query to the indexing plugin by Alias ID. Observe that you need to obtain the full Output details as you would need to use it as Input of your transaction.

```typescript
const indexerPlugin = new IndexerPluginClient(client);
const outputList = await indexerPlugin.alias(aliasId);
const consumedOutputID = outputList.items[0];
console.log("Consumed Output Id", consumedOutputID);

const initialAliasOutputDetails = await client.output(consumedOutputID);
const initialAliasOutput: IAliasOutput = initialAliasOutputDetails.output as IAliasOutput;
```

### Assign the new state of the Alias

In order to continue you can create the next Alias Output by just cloning the one obtained in the previous step, and afterwards increment the `stateIndex`.

```typescript
const nextAliasOutput: IAliasOutput = JSON.parse(JSON.stringify(initialAliasOutput));
nextAliasOutput.stateIndex++;
```

At the end of this step you know both Input #1 and Output #1.

## Set new state of your Foundry

In this step you need to transition your Foundry to a new state as some tokens will be put in melted state.

### Query Foundry Output

The first sub-step to take is to find the unspent Foundry Output you need to transition through a query to the indexing plugin by Alias Address. Observe that you need to obtain the full Output details as you would need to use it as Input of your transaction.

```typescript
const aliasIdBech32 = Bech32Helper.toBech32(ALIAS_ADDRESS_TYPE, Converter.hexToBytes(aliasId), protocolInfo.bech32Hrp);
const foundryList = await indexerPlugin.foundries({
    aliasAddressBech32: aliasIdBech32
});
if (foundryList.items.length === 0) {
    throw new Error("Foundry Output not found");
}

const foundryOutputID = foundryList.items[0];

const initialFoundryOutputDetails = await client.output(foundryOutputID);
const initialFoundryOutput: IFoundryOutput = initialFoundryOutputDetails.output as IFoundryOutput;
```

The only detail to take into account in the code above is the conversion from your Alias ID to a Bech32 address to match the format of the parameter expected by the indexing plugin.

At the end of this step you know Input #2.

### Query Native Tokens Output

As you are going to melt all the tokens of your formerly created Output, you need to perform a query to obtain its ID (that you will also need as Input #3 of the transaction) and the amount of native tokens involved (those which token class ID corresponds to the token class ID we calculated in the previous part of this tutorial).

```typescript
const tokenClassId: string = TransactionHelper.constructTokenId(
    initialAliasOutput.aliasId,
    initialFoundryOutput.serialNumber,
    initialFoundryOutput.tokenScheme.type
);

const outputWithTokensToMeltList = await indexerPlugin.basicOutputs({
    addressBech32: nativeTokenOwnerAddressBech32,
    hasNativeTokens: true
});

if (outputWithTokensToMeltList.items.length === 0) {
    throw new Error("There are no outputs with native tokens");
}

// We assume the first one is the right one
const outputWithTokensToMeltID = outputWithTokensToMeltList.items[0];
const outputWithTokensToMeltDetails = await client.output(outputWithTokensToMeltID);
const outputWithTokensToMelt = outputWithTokensToMeltDetails.output as IBasicOutput;

if (!outputWithTokensToMelt.nativeTokens?.some(element => element.id === tokenClassId)) {
    throw new Error("Unexpected token class Id");
}
```

You can observe that with the `some` function we check that the Output actually holds native tokens of the expected class ID.

At the end of this step you know Input #3.

### Set melted tokens on the Foundry

Once you know how many tokens are going to be melted you just need to set the `meltedTokens` field of the next Foundry Output.
We use the  `findIndex` function to ensure we refer to the right token class, as an Output can hold tokens of many classes at the same time. (In this simple case you can check that `index` is equal to `0`).

```typescript
const index = outputWithTokensToMelt.nativeTokens?.findIndex(element => element.id === tokenClassId);

nextFoundryOutput.tokenScheme.meltedTokens = outputWithTokensToMelt.nativeTokens[index].amount;
```

At the end of this step you know Output #2.

## Create remainder Output

In this step you need to create the remainder Output. The remainder Output will be just the same as Input #3 with the exception of the native tokens of `tokenClassId` that are removed from the Output.

```typescript
const remainderOutput = JSON.parse(JSON.stringify(outputWithTokensToMelt)) as IBasicOutput;

// No longer have native tokens (assumption: there is only one entry of native tokens of tokenClassId)
remainderOutput.nativeTokens = remainderOutput.nativeTokens?.filter((element) => {
    element.id !== tokenClassId
});
```

At the end of this step you know Output #3.

## Define the transaction

In this step the transaction essence is created.

```typescript
const inputs: IUTXOInput[] = [];
const outputs: (IAliasOutput | IFoundryOutput | IBasicOutput)[] = [];

inputs.push(TransactionHelper.inputFromOutputId(consumedOutputID));
inputs.push(TransactionHelper.inputFromOutputId(foundryOutputID));
inputs.push(TransactionHelper.inputFromOutputId(outputWithTokensToMeltID));

outputs.push(nextAliasOutput);
outputs.push(nextFoundryOutput);
outputs.push(remainderOutput);

const inputsCommitment = TransactionHelper.getInputsCommitment([
    initialAliasOutput, initialFoundryOutput, outputWithTokensToMelt
]);

const transactionEssence: ITransactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: TransactionHelper.networkIdFromNetworkName(protocolInfo.networkName),
    inputs,
    inputsCommitment,
    outputs
};
```

At the end of this step the transaction essence is defined. Remember that it includes three Inputs :

* Input #1 from `consumedOutputID` (Unspent Alias Output of the Alias Address)
* Input #2 from `foundryOutputID` (Unspent Foundry Output owned by the Alias Address)
* Input #3 from `outputWithTokensToMeltID` (Basic Output holding native tokens)

And three Outputs:

* Output #1 `nextAliasOutput` (Next Alias Output of the Alias Address)
* Output #2 `nextFoundryOutput` (Next Foundry Output, now declaring melted tokens)
* Output #3 `remainderOutput` (remainder of the Basic Output with no native tokens of `tokenClassID`)

## Provide unlocks

In this case three unlocks have to be provided:

* The State Controller unlock signature for the Alias Output.
* The reference to the former to unlock the Foundry Output (remember that the Foundry is controlled by the Alias).
* The unlock signature of the controller of the address that holds the native tokens melted.

```typescript
const wsTsxEssence = new WriteStream();
serializeTransactionEssence(wsTsxEssence, transactionEssence);
const essenceFinal = wsTsxEssence.finalBytes();

const essenceHash = Blake2b.sum256(essenceFinal);

const unlockSignature: ISignatureUnlock = {
    type: SIGNATURE_UNLOCK_TYPE,
    signature: {
        type: ED25519_SIGNATURE_TYPE,
        publicKey: stateControllerPubKey,
        signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(stateControllerPrivateKey), essenceHash), true)
    }
};

const unlockFoundry: IAliasUnlock = {
    type: ALIAS_UNLOCK_TYPE,
    reference: 0
};

const unlockTokens: ISignatureUnlock = {
    type: SIGNATURE_UNLOCK_TYPE,
    signature: {
        type: ED25519_SIGNATURE_TYPE,
        publicKey: nativeTokenOwnerPubKey,
        signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(nativeTokenOwnerPrivateKey), essenceHash), true)
    }
};

const transactionPayload: ITransactionPayload = {
    type: TRANSACTION_PAYLOAD_TYPE,
    essence: transactionEssence,
    unlocks: [unlockSignature, unlockFoundry, unlockTokens]
};
```

## Submit block

And finally you submit the block. After the block is confirmed if you query your Alias Address through the Explorer you will find the new Alias Output with the updated state.

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

You can find [here]() the source code of the program thar executes all the steps of this part of the tutorial.