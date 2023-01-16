---
description: "Claim an NFT with iota.js."
image: /img/client_banner.png
keywords:
- tutorial
- nft
- output
- claim
- storage
- deposit
- conditional
- transfer
- refund
---

# Claim NFT Under Conditional Transfer

In the [previous section of this tutorial](./04-nft-transaction.md) an NFT was transferred to a new owner. However that transfer was conditional in the sense that, only after refunding the storage costs, the new owner would have complete control of the NFT. In this section you will learn how to refund the issuer of the NFT and gain its complete control. The idea is to issue a [new NFT transaction](./04-nft-transaction.md) that changes the unlock conditions, so that the only remaining unlock condition is the address owner one. On the other hand, it is necessary to involve an additional Input that holds funds to cover the new NFT Output (as its storage deposit has been refunded) and, last but not least, generate an Output to refund the issuer. To sum up, the transaction under discussion will include two inputs:

* Input #1 The NFT Input generated in the previous section of this tutorial.
* Input #2 A Basic Input that holds enough funds to cover the storage deposit of the new NFT Output fully controlled by the NFT Owner.

and three Outputs:

* Output #1 The new NFT Output (controlled by the NFT Owner).
* Output #2 The refund Output (controlled by the NFT Issuer).
* Output #3 The Output holding the remaining funds after covering the storage costs of Output #1 (controlled by the NFT Owner).

## Preparation

To create this transaction, you will need the following:

* A Shimmer Node. You can use the [Shimmer Testnet nodes](https://api.testnet.shimmer.network).

* The NFT ID of your NFT, in hexadecimal format `0x7d08...`.

* The keys of the address that controls your NFT (remember that it was transferred to a new owner in [part 4](./04-nft-transaction.md)).

* A UTXO controlled by the owner of the NFT with enough funds to allow to cover the storage costs of the new NFT Output.

```typescript
const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });
const nodeInfo = await client.info();

const nftOwnerAddr = "0x57d3...";
const nftOwnerBech32Addr = "rms1qpta...";
const nftOwnerPubKey = "0xd38f...";
const nftOwnerPrivateKey = "0xc2be...";
```

## Query NFT Output

You will first need to find the NFT Output of your NFT. The easiest way to do so is through a query to the [indexation plugin](https://wiki.iota.org/shimmer/inx-indexer/welcome/) by NFT ID. Observe that you need to obtain the full Output details as you need to use them as Input for the transaction.

```typescript
const indexerPlugin = new IndexerPluginClient(client);
const outputList = await indexerPlugin.nft(nftId);
if (outputList.items.length === 0) {
    throw new Error ("NFT not found");
}

const consumedOutputId = outputList.items[0];
console.log("Consumed Output Id", consumedOutputId);

const initialNftOutputDetails = await client.output(consumedOutputId);
const initialNftOutput: INftOutput = initialNftOutputDetails.output as INftOutput;
```

At the end of this step you have obtained Input #1 of your transaction.

## Set the New Unlock Conditions

To continue, you can create the new NFT Output by cloning the one received in the [previous step](#query-nft-output), and then only keep the address unlock condition and remove the storage cost refund condition. That way you will have full control of the NFT through your address' keys.

You can also observe that the `amount` field is set to `0`, as you are interested in calculating later the minimum storage deposit needed for your new NFT Output.  Last but not least, you should ensure that you assign the correct `nftId` to your new NFT Output.

```typescript
const nextNftOutput: INftOutput = JSON.parse(JSON.stringify(initialNftOutput));
nextNftOutput.unlockConditions = ;

const nextNftOutput: INftOutput = JSON.parse(JSON.stringify(initialNftOutput));
nextNftOutput.unlockConditions = nextNftOutput.unlockConditions.filter(
    (condition) => condition.type !== STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE
);

nextNftOutput.nftId = nftId;
nextNftOutput.amount = "0";
```

At the end of this step you have defined Output #1 of your transaction.

## Refund the NFT Issuer

In this step you need to create a new Basic Output to refund the Issuer of the NFT, so that you take full control of it. Please observe that you don't need to use your own funds to refund the Issuer, just take the `SMR` in deposit in the original NFT Output and transfer it to an Output controlled by the Issuer.

```typescript
const refundCondition = initialNftOutput.unlockConditions[1] as IStorageDepositReturnUnlockCondition;

const refundToBePerformed = bigInt(refundCondition.amount);

const refundOutput: IBasicOutput = {
    type: BASIC_OUTPUT_TYPE,
    amount: refundToBePerformed.toString(),
    unlockConditions: [
        {
            type: ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: (refundCondition.returnAddress as IEd25519Address).pubKeyHash
            }
        }
    ]
};
```

At the end of this step you have defined Output #2 of your transaction.

## Calculate NFT Storage Costs

In this step you are going to calculate the storage costs so that you have an estimation of the minimum amount of funds that should be held by a transaction Output covering them.

```typescript
const depositNft = bigInt(TransactionHelper.getStorageDeposit(nextNftOutput, nodeInfo.protocol.rentStructure));
nextNftOutput.amount = depositNft.toString();
```

At the end of this stage you have set the right amounts to cover NFT storage costs.

## Cover Storage Costs

The aim of this step is to find a Basic Output owned by the NFT owner that can cover the NFT storage costs. As it was explained in previous tutorials, the minimal amount of funds is determined by the storage cost of such an NFT plus the storage costs of the Output holding the remainder funds.

### Define the Remainder Output

The remainder Output is just a Basic Output.

```typescript
const remainderOutput: IBasicOutput = {
    type: BASIC_OUTPUT_TYPE,
    amount: "0",
    unlockConditions: [
        {
            type: ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: nftOwnerAddr
            }
        }
    ]
};

const remainderOutputCost = bigInt(TransactionHelper.getStorageDeposit(remainderOutput, nodeInfo.protocol.rentStructure));
const totalCost = depositNft.plus(remainderOutputCost);
```

At the end of this sub-step you know the total cost that should be covered by your Output at a minimum.

### Find Output with enough funds

Finding the right Basic Output it is a matter of querying the indexation plugin. Observe that it is checked that the Output has not been spent yet.

```typescript
 const basicOutputList = await indexerPlugin.basicOutputs({
    addressBech32: nftOwnerBech32Addr
});

let costsOutput: IBasicOutput | undefined;
let costsOutputId: string | undefined;
for (const basicOutput of basicOutputList.items) {
    const theOutput = await client.output(basicOutput)
    if (theOutput.metadata.isSpent === false) {
        const output = theOutput.output as IBasicOutput;
        const amount = bigInt(output.amount);
        if (amount.greater(totalCost)) {
            costsOutputId = basicOutput;
            costsOutput = output;
            break;
        }
    }
}

if (!costsOutput) {
    throw new Error("No Outputs found to refund and cover costs");
}

remainderOutput.amount = bigInt(costsOutput.amount).minus(depositNft).toString();
```

At the end of this step you have defined Output #3 of your transaction.

## Define the Transaction

In this step you need to define the transaction essence as follows:

```typescript
const inputs: IUTXOInput[] = [];
const outputs: (INftOutput | IBasicOutput)[] = [];

inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));
inputs.push(TransactionHelper.inputFromOutputId(costsOutputId as string));

outputs.push(nextNftOutput);
outputs.push(refundOutput);
outputs.push(remainderOutput);

const inputsCommitment = TransactionHelper.getInputsCommitment([initialNftOutput, costsOutput]);

const transactionEssence: ITransactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: TransactionHelper.networkIdFromNetworkName(nodeInfo.protocol.networkName),
    inputs,
    inputsCommitment,
    outputs
};
```

At the end of this step, you have created the transaction essence. It includes two Inputs :

* **Input #1**: `consumedOutputId`, the last NFT unspent Output of your NFT.
* **Input #2**: `costsOutputId` which pays the storage costs.

And three Outputs:

* **Output #1**: `nextNftOutput`, the next NFT Output of your NFT.
* **Output #2**: `refundOutput`, the refund made to the Issuer of your NFT.
* **Output #3**: `remainderOutput`, the remainder of the storage costs.

## Unlock the Outputs

The unlock you need to provide correspond to the signature calculated against the transaction essence using the private key of the NFT Owner. The second Input is also unlocked by the same signature.

```typescript
const essenceHash = TransactionHelper.getTransactionEssenceHash(transactionEssence);

const unlockConditionNft: ISignatureUnlock = {
    type: SIGNATURE_UNLOCK_TYPE,
    signature: {
        type: ED25519_SIGNATURE_TYPE,
        publicKey: nftOwnerPubKey,
        signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(nftOwnerPrivateKey), essenceHash), true)
    }
};

const unlockConditionCost: IReferenceUnlock = {
    type: REFERENCE_UNLOCK_TYPE,
    reference: 0
};

const transactionPayload: ITransactionPayload = {
    type: TRANSACTION_PAYLOAD_TYPE,
    essence: transactionEssence,
    unlocks: [unlockConditionNft, unlockConditionCost]
};
```

## Submit the Block

Finally, you should submit the block. After the block is confirmed, if you query your NFT ID through [the Shimmer Explorer](https://explorer.shimmer.network/shimmer), you will find the new NFT Output with the updated state.

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

The complete source code of this part of the tutorial is available in the [official iota.js GitHub repository](https://github.com/iotaledger/iota.js/blob/feat/stardust/packages/iota/examples/shimmer-nft-transaction-tutorial/src/claim-nft.ts).
