---
description: "Send native tokens with iota.js."
image: /img/client_banner.png
keywords:
- tutorial
- native tokens
- token
- digital
- asset
- output
- transaction
---

# Send Native Tokens

Outputs that hold native tokens can be spent within transactions to transfer some of their native tokens to a new Output. As usual, if there are remaining native tokens, you need to put them into a new Output controlled by your source address. In principle, there is no need to involve protocol-defined tokens (`SMR`) in this kind of transaction. However, you need to take into account that there are additional storage costs corresponding to the new Outputs you generate. For instance, if you use the [Output you created in the previous step of this tutorial](03-mint-native-tokens.md#define the-basic-output-that-will-hold-the-initial-batch-of-minted-tokens
) as Input, that Output only has funds to cover its own storage costs. In this case, you will need to find a second unspent Output that will fund the storage costs of the new Outputs. To cover storage costs in this particular case, you can define a transaction with two Inputs and three Outputs as follows:

* **Input #1**: Corresponds to the UTXO holding the native tokens minted in step 1 of this tutorial. Remember that it also holds some `SMR` tokens that cover its own storage costs.
* **Input #2**: A UTXO that holds enough funds to cover the storage costs of **Output #1** and **Output #3** (see below).

* **Output #1**: The Output holding some of the native tokens transferred from **Input #1**.  This Output also holds enough `SMR` tokens to cover its own storage costs.
* **Output #2**: The Output holding the remaining native tokens from **Input #1** that were not transferred to **Output #1**. This Output will also keep the `SMR` tokens from **Input #1** to cover its storage costs.
* **Output #3**: The Output holding the remaining `SMR` from **Input #2**. It must at least cover its own storage costs.

## Preparation

To perform this transaction, you will need:

* A Shimmer Node. You can use the [Shimmer testnet nodes](https://api.testnet.shimmer.network).

* The address that controls **Output #1**, `0x647f7...`, the source address.

* The keys of said address that allow unlocking its Outputs.

* The source address must also control at least another UTXO with enough funds to cover the storage costs of the new Outputs created by this transaction.

```typescript
const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });
const nodeInfo = await client.info();

// The source address that controls an output with native tokens
const sourceAddress = "0x647f7...";
const sourceAddressBech32 = "rms1qpj8775lm...";
const sourceAddressPublicKey = "0x554....";
const sourceAddressPrivateKey = "0xa060ff...";

// The address that will receive the native tokens in a new Output
const destAddress = "0xc8413...";
```

## Query Native Tokens Output to be Spent

The first thing you need to do is to find the Basic Output that holds the native tokens. The easiest way to do it is through a query to the [indexation plugin](https://wiki.iota.org/shimmer/inx-indexer/welcome/), as shown below. You will need to obtain the full Output details, as you will need to use it as Input for your following transaction.

```typescript
const indexerPlugin = new IndexerPluginClient(client);
const outputList = await indexerPlugin.basicOutputs({
    addressBech32: sourceAddressBech32,
    hasNativeTokens: true
});

if (outputList.items.length === 0) {
    throw new Error("No output with native tokens found on the source address");
}

const consumedOutputNativeTokensID = outputList.items[0];
const consumedOutputNativeTokensDetails = await client.output(consumedOutputNativeTokensID);
const theOutput = consumedOutputNativeTokensDetails.output as IBasicOutput;

if (!Array.isArray(theOutput.nativeTokens)) {
    throw new Error("No native tokens to spend");
}

// 12 native tokens will be transferred
const nativeAmountTransferred = bigInt(12);

const currentNativeAmount = HexHelper.toBigInt256(theOutput.nativeTokens[0].amount);
const remainingNativeAmount = currentNativeAmount.minus(nativeAmountTransferred);
 
if (remainingNativeAmount.lesser(bigInt(0))) {
    throw new Error("Not enough funds");
}

inputs.push(TransactionHelper.inputFromOutputId(consumedOutputNativeTokensID));
```

The query made to the indexation plugin includes the filter parameter `hasNativeTokens` so that you can easily find the Basic Output you are looking for in this case. In this tutorial, the Output holds at least `12` native tokens. Please take into account that in a real-world case, you would also need to ensure that the Output holds tokens of the class ID you are expecting.

At the end of this step, you know **Input #1**.

## Define the New Native Tokens Output

The next step is to define **Output #1** that will hold the `12` native tokens as shown below:

```typescript
const nativeTokensOutput: IBasicOutput = {
    type: BASIC_OUTPUT_TYPE,
    // We don't know yet
    amount: "0",
    nativeTokens: [{
        id: theOutput.nativeTokens[0].id,
        amount: HexHelper.fromBigInt256(nativeAmountTransferred)
    }],
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

As in previous examples, the `amount` field is initially set to `0` so that you can later assign it depending on the storage costs of this Output. The unlock conditions refer to the destination address that will control this Output.

At the end of this step, you have defined **Output #1**.

## Define the Output for the Remaining NativeTokens

The remainder Output is defined in the following snippet. In this case, the amount of protocol-defined tokens is set to be exactly the same as the original Input, as that should cover the storage costs of this Output. In fact, it is similar to the original one; the only difference is the number of native tokens. The unlock conditions refer to the source address.

```typescript
const remainderNativeTokensOutput: IBasicOutput = {
    type: BASIC_OUTPUT_TYPE,
    // Amount is the same as we are not spending any protocol-defined tokens
    amount: theOutput.amount,
    nativeTokens: [{
        id: theOutput.nativeTokens[0].id,
        amount: HexHelper.fromBigInt256(remainingNativeAmount)
    }],
    unlockConditions: [
        {
            type: ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: sourceAddress
            }
        }
    ],
    features: []
};
```

At the end of this step, you have defined **Output #2**.

## Calculate the Storage Costs

In this step, you need to calculate the storage costs of the new native tokens Output, **Output #3**. The purpose of this calculation is to know the minimal amount of `SMR` you need to use to cover the new Outputs you are going to generate. The storage cost corresponds to the previously defined `nativeTokensOutput`. However, to be on the safe side, you will need an Output that holds an amount of `SMR` that can also cover the remaining amount once the storage costs of `nativeTokensOutput` are covered. To do so, you can pre-define the Output that will hold the remaining amount so that it can be calculated as its an extra cost. As a result, you can calculate the minimum amount of `SMR` needed (`minimumNeeded`) for the target Output as shown bellow:

```typescript
const nativeTokensOutputStorageDeposit = TransactionHelper.
        getStorageDeposit(nativeTokensOutput, nodeInfo.protocol.rentStructure);
nativeTokensOutput.amount = nativeTokensOutputStorageDeposit.toString();

// The remaining output remains in the origin address
const remainderStorageBasicOutput: IBasicOutput = {
    type: BASIC_OUTPUT_TYPE,
    // We don't know yet
    amount: "0",
    nativeTokens: [],
    unlockConditions: [
        {
            type: ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: sourceAddress
            }
        }
    ],
    features: []
};

const remainderStorageDeposit = TransactionHelper.
        getStorageDeposit(remainderStorageBasicOutput, nodeInfo.protocol.rentStructure);

const minimumNeeded = bigInt(nativeTokensOutputStorageDeposit).plus(bigInt(remainderStorageDeposit));
```

At the end of this step, you have defined **Output #3** and you know the storage costs.

## Find an Output That Can Cover Storage Costs

Once you know the storage costs, the problem is simply finding a suitable target Output from the Outputs your source address is controlling, as shown in the snippet below. The indexer plugin is used to find the unspent Basic Outputs that can fit your purpose. The `hasNativeTokens` filter condition is set to `false` to avoid conflicts with **Input #1**. Once you have a list of potential Outputs, the first that has the minimal amount of `SMR` you need will be used. **Please take into account that the edge case of obtaining an Output of the exact amount is not covered in this script**.

```typescript
const outputList2 = await indexerPlugin.basicOutputs({
    addressBech32: sourceAddressBech32,
    hasNativeTokens: false
});

if (outputList2.items.length === 0) {
    throw new Error("There are no outputs that can cover the storage cost");
}

let storageCostsOutput: IBasicOutput | undefined = undefined;
let storageCostsOutputID: string | undefined = undefined;
for (const output of outputList2.items) {
    const outputData = await client.output(output);
    const outputAmount = bigInt(outputData.output.amount);
    // We are not treating the case where the output amount is equal to the storage cost
    if (outputAmount.greater(minimumNeeded)) {
        storageCostsOutput = outputData.output as IBasicOutput;
        storageCostsOutputID = output;
        break;
    }
}

if (!storageCostsOutput) {
    throw new Error("There are no outputs that can cover the storage cost");
}

console.log("Output used to cover the storage costs: ", storageCostsOutputID);
```

The Output obtained from this step becomes **Input #2** of our transaction.

## Define the Transaction Essence

In this step, you will create the transaction essence. Before that, you will need to calculate and set the remaining amount. It will be equal to the original amount held by **Input #2** minus the storage cost of the native token Output (**Output #1**). As per the previous calculations, you know beforehand that the remaining amount will suffice to cover the storage costs of **Output #3**.

```typescript
const remainderAmount = bigInt(storageCostsOutput.amount).minus(bigInt(nativeTokensOutputStorageDeposit));
remainderStorageBasicOutput.amount = remainderAmount.toString();

inputs.push(TransactionHelper.inputFromOutputId(storageCostsOutputID as string));

outputs.push(nativeTokensOutput);
outputs.push(remainderNativeTokensOutput);
outputs.push(remainderStorageBasicOutput);

const inputsCommitment = TransactionHelper.
        getInputsCommitment([consumedOutputNativeTokensDetails.output, storageCostsOutput]);

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

At the end of this step, you have created the transaction essence. It includes two Inputs :

* **Input #1**: `consumedOutputNativeTokensID`, the source of the transferred native tokens.
* **Input #2**: `storageCostsOutputID` which pays the storage costs.

And three Outputs:

* **Output #1**: `nativeTokensOutput`, the destination of some of the native tokens.
* **Output #2**: `remainderNativeTokensOutput`, the remainder native tokens.
* **Output #3**: `remainderStorageBasicOutput`, the remainder of the storage costs.

## Provide the Transaction’s Unlock Signature

As two Inputs are being involved in this transaction, you will need to provide two unlocks. But, since the two Inputs are controlled by the same address, the second one is just a reference to the first one as shown bellow:

```typescript
const unlockSignature: ISignatureUnlock = {
    type: SIGNATURE_UNLOCK_TYPE,
    signature: {
        type: ED25519_SIGNATURE_TYPE,
        publicKey: sourceAddressPublicKey,
        signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(sourceAddressPrivateKey), essenceHash), true)
    }
};

const unlockRef: IReferenceUnlock = {
    type: REFERENCE_UNLOCK_TYPE,
    reference: 0
};

const transactionPayload: ITransactionPayload = {
    type: TRANSACTION_PAYLOAD_TYPE,
    essence: transactionEssence,
    unlocks: [unlockSignature, unlockRef]
};
```

## Submit the Block

Finally, you have to submit a Block. After the block is confirmed, you can query the [Shimmer Explorer](https://explorer.shimmer.network/) to see the state of the different addresses and Outputs involved in this tutorial.

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

You can download the code to send native tokens from the [iota.js repository](https://github.com/iotaledger/iota.js/tree/feat/stardust/packages/iota/examples/shimmer-native-token-transaction-tutorial/src/native-tokens-transaction.ts).





