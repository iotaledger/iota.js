---
description: "Perform a transaction that involves native tokens with iota.js."
image: /img/client_banner.png
keywords:
- tutorial
- native
- token
- digital
- asset
- output
- transaction
---

# Performing a transaction involving native tokens

Outputs that hold native tokens can be spent within transactions to transfer some of its native tokens to a new Output. As usual, if there are remaining native tokens you need to put them into another new Output controlled by your source address. In principle there is no need to involve protocol-defined tokens (`SMR`) in this kind of transaction. However, you need to take into account that there are additional storage costs corresponding to the new Outputs generated. For instance, if you use as Input the Output created in the previous step of this tutorial, such an Output only has funds to cover its own storage costs. Thus, in that case you would need to find a second unspent Output that will be used to fund storage costs of the new Outputs generated. To meet storage costs, in this particular case, you can define a transaction with two Inputs and three Outputs as follows:

* Input #1: It corresponds to the UTXO holding native tokens minted in the step 1 of this tutorial. Remember that it also holds some `SMR` tokens that cover its storage costs.
* Input #2: A UTXO that holds enough funds to cover the storage costs of Output #1 and Output #3 (see below).

* Output #1: The Output holding some of the native tokens transferred from Input #1.  This Output shall also hold enough `SMR` tokens to cover its own storage costs.
* Output #2: The Output holding the remaining native tokens from Input #1 not transferred to Output #1. This Output will also keep the `SMR` tokens from Input #1 to cover its storage costs.
* Output #3: The Output holding the remaining `SMR` from Input #2. It must at least cover its own storage costs.

## Preparation

In order to perform this transaction it is needed:

* A Shimmer Node. You can use the [Shimmer testnet nodes](https://api.testnet.shimmer.network).

* The address that controls Output #1, `0x647f7...`, the source address.

* The keys of such an address that allow to unlock its Outputs.

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

## Query Native Tokens Output to be spent

The first step to be taken is to find the Basic Output that holds the native tokens. The easiest way to do it is through a query to the indexation plugin as shown below. Observe that we need to obtain the full Output details as we would need to use it as Input to our transaction.

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

You can observe that the query made to the indexation plugin includes the filter parameter `hasNativeTokens`, so that you can find easily the Basic Output you are concerned with. In this tutorial, it is ensured the Output at least holds `12` native tokens. Please take into account that in a real-world case you would also test that the Output holds token of the class ID you are expecting.

At the end of this step you know Input #1.

## Define the new native tokens Output

The next step is to define Output #1 that will hold the `12` native tokens as shown below:

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

As in previous examples the `amount` field is initially set to `0` so that we can later assign it depending on the storage costs of this Output. You can observe that the unlock conditions refer to the destination address that will control this Output.

At the end of this step you have defined Output #1.

## Define the remainder native tokens Output

The remainder Output is defined as shown below. Observe that in this case the amount of protocol-defined tokens is set to be exactly the same as the original Input, as that would suffice to cover the storage costs of this Output. In fact it is similar to the original one (with the only difference of the amount of native tokens). The unlock conditions, obviously, refer to the source address.

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

At the end of this step you have defined Output #2.

## Calculate storage costs

In this step you need to calculate the storage costs of the new native tokens Output. The purpose of this calculation is to know the minimal amount of `SMR` we need to spend to cover the new Outputs we are going to generate. First of all the storage cost is the one coming from the `nativeTokensOutput` defined previously. However, in order to be on the safe side we would need an Output that holds an amount of `SMR` that can also cover the remaining amount once the storage costs of `nativeTokensOutput` are covered. In order to do so you can pre-define the Output that will hold the remainder amount, so that it can be calculated its extra cost. As a result you can calculate the minimum amount of `SMR` needed (`minimumNeeded`) for the target Output.

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

At the end of this step you have defined Output #3 and you know the storage costs.

## Find an Output that can cover storage costs

Once you know the storage costs the problem is reduced to find a suitable target Output from the Outputs your source address is controlling. The code that can be used for that purpose is shown below. You can observe that the indexer plugin is used to find the unspent Basic Outputs that can fit your purpose. `hasNativeTokens` filter condition is set to `false` to avoid conflicts with Input #1. Once a list of potential Outputs is obtained, the first that has the minimal amount of `SMR` needed is taken. Please take into account that the corner case of obtaining an Output of the exact amount is not covered.

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

As you may have already guessed, the Output obtained from this step becomes the Input #2 of our transaction.

## Define Transaction Essence

In this step the transaction essence is created. Before that, the remainder amount is calculated and set. You can observe that it is equal to the original amount hold by Input #2 minus the storage cost of the native token Output (Output #1). As per our previous calculations we know beforehand that this remaining amount will suffice to cover the storage costs of Output #3.

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

At the end of this step you have created the transaction essence. Remember that it includes two Inputs :

* Input #1 from `consumedOutputNativeTokensID` (source of the native tokens transferred)
* Input #2 from `storageCostsOutputID` (pays the storage costs)

And three Outputs:

* Output #1 `nativeTokensOutput` (destination of some of the native tokens)
* Output #2 `remainderNativeTokensOutput` (remainder native tokens)
* Output #3 `remainderStorageBasicOutput` (remainder of the storage costs)

## Provide Unlock Signature of the Transaction

As it was explained in former tutorials, you can provide the unlock signature of the transaction as follows. The only detail here is that you need to provide two unlocks as two Inputs are being involved in this transaction. As the two Inputs are controlled by the same address the second one is just a reference to the first one.

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

## Submit block

And finally a block is submitted. After the block is confirmed you can query through the Explorer the state of the different addresses and Outputs involved in this tutorial.

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