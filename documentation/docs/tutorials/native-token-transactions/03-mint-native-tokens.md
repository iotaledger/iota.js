---
description: "Mint native tokens with iota.js."
image: /img/client_banner.png
keywords:
- tutorial
- alias
- address
- output
- mint
- foundry
- native token
- token
- digital
- asset
---

# Mint Native Tokens

To mint a new native token you will need the following:

* An initial *unspent Output* with enough funds to cover the [storage costs](https://wiki.iota.org/shimmer/introduction/explanations/what_is_stardust/storage_deposit/) of the different Outputs involved. In the Testnet, you can [request funds through the Faucet](../value-transactions/06-request-funds-from-the-faucet.md).

:::info Storage Deposits

[Storage deposits](https://wiki.iota.org/shimmer/learn/role-of-token/#storage-deposits) can only be covered by **protocol-defined tokens** (`SMR`).

:::

* An *Alias Address* that you will use to control the Foundry Output associated with your new native tokens. Any change made to the Foundry state will require the keys of the [State Controller](https://wiki.iota.org/shimmer/tips/tips/TIP-0018/#state-controller-address-unlock-condition) of this Alias Address and the corresponding state transition that will generate an unspent Alias Output.

* A *Token Scheme* that defines a class of tokens with *initial supply* (how many native tokens of that class you will mint initially) and *maximum supply*.

* A *Foundry Output* that captures all the parameters and the state related to your new native tokens, including the [Token Scheme](https://wiki.iota.org/shimmer/tips/tips/TIP-0018/#simple-token-scheme-validation-rules).

* An *Address* to which you will transfer the initial supply of native tokens through a Basic Output. You can find a guide to generating your [seed](../value-transactions/03-generate-a-seed.md) and [address](../value-transactions/04-generate-addresses.md) in the [send value transactions tutorial](../value-transactions/01-introduction.md).

## Transfer Funds to Cover Storage Deposits

The first step is to ensure that you have enough funds in your initial address to cover storage deposits. In the Testnet, you can simply [request funds from the Faucet](../value-transactions/06-request-funds-from-the-faucet.md) to your address.

## Mint a New Alias ID

You can find information on [minting a new Alias address](../alias-transactions/03-mint-new-alias.md) in the [Alias transactions tutorial](../alias-transactions/01-introduction.md).  Please ensure that you transfer enough funds to this Alias so that it can cover later costs related to minting native tokens.

This tutorial uses the following Alias:

* Alias Address: `rms1pzxgrrzzug2rhaug8d0tgcq33p2g65s4x4h8c9ym6nxkmaj3r5zeg5fxxa7`
* Alias ID: `0x8c818c42e2143bf7883b5eb4601188548d5215356e7c149bd4cd6df6511d0594`
* State Controller Address: `rms1qpj8775lmqcudesrfel9f949ptk30mma9twjqza5el08vjww9v927ywt70u`

:::tip Storage Deposits

This tutorial assumes that the newly minted Alias ID holds enough funds (protocol-defined tokens, or `SMR`) to cover the new Outputs that you will generate.

:::

## Prepare the Alias Address

### Obtain the Current Alias Output

Once you have your Alias ID, you will need to get its current unspent Alias Output through the [Indexer Plugin](https://wiki.iota.org/shimmer/inx-indexer/welcome/). The Alias Output will participate in a transaction that will create a new Foundry Output and mint native tokens.

```typescript
const aliasId = "0x8c81...";
const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });

const indexerPlugin = new IndexerPluginClient(client);
const outputList = await indexerPlugin.alias(aliasId);
const consumedOutputId = outputList.items[0];

const initialAliasOutputDetails = await client.output(consumedOutputId);
const initialAliasOutput: IAliasOutput = initialAliasOutputDetails.output as IAliasOutput;
```

### Define the Next Alias Output (transition)

To define the next Alias Output, you need to trigger a transition of the UTXO machine associated to your Alias ID. To do so, you will need to define a new Alias Output. The new Alias Output will increment the `stateIndex`. Since you associate your Alias ID with a new Foundry that will control your new native token class, you must set the `foundryCounter` field to `1`.

In the code below you can observe that the amount associated to the new Alias Output is set to `0`. That's because, initially, you don’t know how many funds will remain on the next Alias Output. What it is sure is that the amount of funds remaining will be less than in the initial Output, as you will be using some of those funds to cover the storage deposit of the new Outputs that will be generated during this process. Alternatively, you could have involved other Outputs in this transaction to cover those storage costs..

```typescript
const nextAliasOutput: IAliasOutput = JSON.parse(JSON.stringify(initialAliasOutput));
nextAliasOutput.stateIndex++;
nextAliasOutput.aliasId = aliasId;
nextAliasOutput.amount = "0";
nextAliasOutput.foundryCounter = 1;
```

## Define your Token Scheme

You can define your Token Scheme as follows:

```typescript
const mintedAmount = 128;
const totalAmount = 512;
const tokenScheme: ISimpleTokenScheme = {
    type: SIMPLE_TOKEN_SCHEME_TYPE,
    mintedTokens: HexHelper.fromBigInt256(bigInt(mintedAmount)),
    meltedTokens: HexHelper.fromBigInt256(bigInt(0)),
    maximumSupply: HexHelper.fromBigInt256(bigInt(totalAmount)),
};
```

You can observe that you need to define the total amount and the maximum supply of minted tokens.

## Define the Foundry Output

Your next step is to define the Foundry Output (`IFoundryOutput`) that will control your new Token Scheme. You will need to set the serial number of the Foundry (`1` in this case), the formerly defined token scheme and the [unlock conditions](https://wiki.iota.org/shimmer/introduction/explanations/what_is_stardust/unlock_conditions/). The Foundry Output can only be unlocked by the state controller of the Alias Address that controls it.

As with the Alias Output, you need to deliberately set the amount to `0`, as at this point in time you don't know the amount of protocol-defined tokens you will need to cover the storage deposit for this Output.

```typescript
const foundryOutput: IFoundryOutput = {
    type: FOUNDRY_OUTPUT_TYPE,
    amount: "0", // Not known yet
    serialNumber: 1,
    tokenScheme,
    unlockConditions: [
        {
            // Foundry supports only this unlock condition!
            // It will be controlled through its lifetime by our alias
            type: IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ALIAS_ADDRESS_TYPE,
                aliasId
            }
        }
    ]
};
```

### Create the Token Class ID

To issue native token transactions,  you will need a way to refer to each class of native tokens controlled by each foundry uniquely. You can do it using the class ID, which you can obtain by calculating a hash of the Alias ID, foundry serial output, and the type of token scheme as shown in the following snippet:

```typescript
const tokenClassId: string = TransactionHelper.constructTokenId(
    nextAliasOutput.aliasId,
    foundryOutput.serialNumber,
    foundryOutput.tokenScheme.type
);
```

If you use this tutorial’s Alias ID, you should obtain the following token class ID:

`0x080e6284ef54774f66942ef48f0c98c6da6e5b4e3ed044e83bd8da43f5b01790cb0100000000`.

That token class ID is simply the Foundry ID that will remain immutable regardless of the state changes of your Foundry.

## Define the Basic Output That Will Hold the Initial Batch of Minted Tokens

As the Foundry has an initial set of minted tokens, you will need a [Basic Output](https://wiki.iota.org/shimmer/introduction/explanations/ledger/simple_transfers/) to hold those native tokens. This new Basic Output will hold the initial amount of minted native tokens identified through their token class ID. As with other Outputs, you need to set the amount of protocol-defined tokens to `0` as you don't know yet the storage deposit cost.

```typescript
const nativeTokenOwnerAddress = "0x647f....";

const tokenFundsOutput: IBasicOutput = {
    type: BASIC_OUTPUT_TYPE,
    amount: "0", // Not known yet
    nativeTokens: [
        // We put all minted tokens in this output
        {
            id: tokenClassId,
            amount: HexHelper.fromBigInt256(bigInt(mintedAmount))
        }
    ],
    unlockConditions: [
        {
            type: ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: nativeTokenOwnerAddress
            }
        }
    ]
};
```

## Calculate and Set the Storage Deposits

Next, you should calculate the storage deposit that will be needed for each Output. A helper function provided by `iota.js` will allow you to determine the exact number of protocol-defined tokens needed for each Output. This helper function needs the protocol parameters to be exposed by the Node, using the [`client.info()` function](../../references/client/interfaces/IClient.md#info).

The next Alias Output of the Alias Address will hold fewer funds than the original, as those funds will be used to cover the storage deposits of the Foundry Output and the Basic Output that will hold the minted native token funds.

```typescript
const nodeInfo = await client.info();

const foundryStorageDeposit = TransactionHelper.getStorageDeposit(foundryOutput, nodeInfo.protocol.rentStructure);
const tokenFundsStorageDeposit = TransactionHelper.getStorageDeposit(tokenFundsOutput, nodeInfo.protocol.rentStructure);

const totalStorageFunds = bigInt(foundryStorageDeposit).plus(bigInt(tokenFundsStorageDeposit));

const initialFunds = bigInt(initialAliasOutput.amount);
if (initialFunds.lesser(totalStorageFunds)) {
    throw new Error("Initial funds not enough to cover for storage deposits");
}

nextAliasOutput.amount = initialFunds.minus(totalStorageFunds).toString();
foundryOutput.amount = foundryStorageDeposit.toString();
tokenFundsOutput.amount = tokenFundsStorageDeposit.toString();
```

## Submit the Transaction

### Create the Transaction Essence

This is a complex transaction that involves one input and three different outputs. The input is the Alias Output you obtained through your initial query to the indexer plugin. The Outputs are:

* The next Alias Output of your Alias Address (`nextAliasOutput`).
* The initial Foundry Output (`foundryOutput`).
* The Basic Output that holds the native token funds initially minted (`tokenFundsOutput`).

```typescript
const inputs: IUTXOInput[] = [];
const outputs: (IAliasOutput | IFoundryOutput | IBasicOutput)[] = [];

inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));
outputs.push(nextAliasOutput);
outputs.push(foundryOutput);
outputs.push(tokenFundsOutput);

const inputsCommitment = TransactionHelper.getInputsCommitment([initialAliasOutput]);
const transactionEssence: ITransactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: TransactionHelper.networkIdFromNetworkName(nodeInfo.protocol.networkName),
    inputs,
    inputsCommitment,
    outputs
};

const wsTsxEssence = new WriteStream();
serializeTransactionEssence(wsTsxEssence, transactionEssence);
const essenceFinal = wsTsxEssence.finalBytes();
const essenceHash = Blake2b.sum256(essenceFinal);
```

### Provide the Transaction Signature

Once you have the [created the transaction essence](#create-the-transaction-essence), you need to provide the signature that unlocks your [initial Alias Output](#obtain-the-current-alias-output), the Input of the transaction. Remember that unlocking an Alias Output requires the Private Key of the State Controller Address.

```typescript
const stateControllerPubKey = "0x55419...";
const stateControllerPrivateKey = "0xa060f....";

const unlockSignature: ISignatureUnlock = {
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

### Submit the Block

Now that you have the transaction payload, you can submit the [Block](../../references/client/interfaces/IBlock.md):

```typescript
const block: IBlock = {
    protocolVersion: DEFAULT_PROTOCOL_VERSION,
    parents: [],
    payload: transactionPayload,
    nonce: "0",
};

const blockId = await client.blockSubmit(block);
console.log("Block ID:", blockId);
console.log("Native Token Class ID", tokenClassId);
```

Once you know the Block ID and the Native Token Class ID, you can query them through the [Shimmer Explorer](https://explorer.shimmer.network/) to verify that your transaction went well and the Foundry Output has been added to the Ledger.

## Putting It All Together

You can download the code to mint a native token from the [iota.js repository](https://github.com/iotaledger/iota.js/tree/feat/stardust/packages/iota/examples/shimmer-native-token-transaction-tutorial/src/mint-tokens.ts).


