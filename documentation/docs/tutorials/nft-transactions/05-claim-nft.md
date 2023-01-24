---
description: "Claim an NFT under conditional transfer with iota.js."
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

In the previous section of this tutorial, you [transferred and NFT](./04-nft-transaction.md) to a new owner. However,
since you added
a [storage deposit return unlock condition](https://wiki.iota.org/shimmer/introduction/explanations/what_is_stardust/unlock_conditions/#storage-deposit-return)
to the transfer, the new owner will need to create a new Output to return the deposit.

This section will show you how to refund the issuer of the NFT and gain complete control over the NFT. To do so, you
will need to do the following:

Issue a [new NFT transaction](./04-nft-transaction.md) that changes the unlock conditions so that the only remaining
condition is
the [address](https://wiki.iota.org/shimmer/introduction/explanations/what_is_stardust/unlock_conditions/#address).

Create an additional Input with enough funds to cover the storage deposit for the new NFT Output,
Generate an Output to refund the issuer.

So, the transaction will include two Inputs:

* **Input #1** The [NFT Input you minted](03-mint-new-nft.md).
* **Input #2** A Basic Input that holds enough funds to cover the storage deposit of the new NFT Output controlled by the
  new NFT Owner.

The transaction will also include three Outputs:

* **Output #1** The new NFT Output, controlled by the new NFT Owner.
* **Output #2** The refund Output, controlled by the NFT Issuer.
* **Output #3** The Output holding the remaining funds after covering the storage costs of **Output #1** (controlled by the NFT
  Owner).

## Preparation

To create this transaction, you will need the following:

* A Shimmer Node. You can use the [Shimmer Testnet nodes](https://api.testnet.shimmer.network).

* The NFT ID of your NFT, in hexadecimal format `0x7d08...`.

* The keys of the address you [transferred your NFT to](./04-nft-transaction.md).

* A UTXO controlled by the new owner of the NFT with enough funds to cover the new NFT Output storage costs.

```typescript
const client = new SingleNodeClient(API_ENDPOINT, {powProvider: new NeonPowProvider()});
const nodeInfo = await client.info();

const nftOwnerAddr = "0x57d3...";
const nftOwnerBech32Addr = "rms1qpta...";
const nftOwnerPubKey = "0xd38f...";
const nftOwnerPrivateKey = "0xc2be...";
```

## Query For the NFT Output

You will first need to retrieve the NFT Output of your NFT from the network. The easiest way to do so is through a query
to the [indexation plugin](https://wiki.iota.org/shimmer/inx-indexer/welcome/) by NFT ID. You need to obtain the full
Output details as you need to use them as Input for the transaction.

```typescript
const indexerPlugin = new IndexerPluginClient(client);
const outputList = await indexerPlugin.nft(nftId);
if (outputList.items.length === 0) {
    throw new Error("NFT not found");
}

const consumedOutputId = outputList.items[0];
console.log("Consumed Output Id", consumedOutputId);

const initialNftOutputDetails = await client.output(consumedOutputId);
const initialNftOutput: INftOutput = initialNftOutputDetails.output as INftOutput;
```

At the end of this step you have obtained **Input #1** of your transaction.

## Set the New Unlock Conditions

You can create the new NFT Output by cloning the [one received from the node](#query-nft-output), removing
the [storage deposit return unlock condition](https://wiki.iota.org/shimmer/introduction/explanations/what_is_stardust/unlock_conditions/#storage-deposit-return),
and only keep
the [address unlock condition](https://wiki.iota.org/shimmer/introduction/explanations/what_is_stardust/unlock_conditions/#address).
That way, you will have full control of the NFT through your address keys.

The `amount` field is set to `0`, so you can later calculate the minimum storage deposit needed for your new NFT Output.
Keep in mind that you should ensure that you assign the correct `nftId` to your new NFT Output, in this case the
original NFT ID.

```typescript
const nextNftOutput: INftOutput = JSON.parse(JSON.stringify(initialNftOutput));
nextNftOutput.unlockConditions =;

const nextNftOutput: INftOutput = JSON.parse(JSON.stringify(initialNftOutput));
nextNftOutput.unlockConditions = nextNftOutput.unlockConditions.filter(
    (condition) => condition.type !== STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE
);

nextNftOutput.nftId = nftId;
nextNftOutput.amount = "0";
```

At the end of this step you have defined **Output #1** of your transaction.

## Refund the NFT Issuer

In this step, you need to create a new Basic Output to refund the Issuer of the NFT so that you take full control over
it. **You don't need to use your own funds to refund the Issuer**. You only need to take the `SMR` deposited in the
original NFT Output and transfer it to an Output controlled by the Issuer.

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

At the end of this step you have defined **Output #2** of your transaction.

## Calculate the NFT Storage Costs

Once you have returned the original storage deposit, you will need to calculate the storage costs for your new NFT. This
way, you will have an estimation of the minimum amount of funds that should be held by a transaction Output covering
them.

```typescript
const depositNft = bigInt(TransactionHelper.getStorageDeposit(nextNftOutput, nodeInfo.protocol.rentStructure));
nextNftOutput.amount = depositNft.toString();
```

At the end of this step, you have set the right amounts to cover NFT storage deposits.

## Cover Storage Deposits

Once you have [calculated the storage deposit](#calculate-the-nft-storage-costs), you will need to find a Basic Output
owned by the new NFT owner that can cover the deposit. The minimal amount of funds is determined by the storage cost of
the NFT plus the storage costs of the Output holding the remainder funds.

### Define the Remainder Output

The remainder Output is just a Basic Output, as shown below:

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

### Find an Output With Enough Funds

You can find the right Basic Output by querying
the [indexation plugin](https://wiki.iota.org/shimmer/inx-indexer/welcome/). You should check that the Output has not
been spent yet.

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

At the end of this step you have defined **Output #3** of your transaction.

## Define the Transaction

The next thing you need to do is define the transaction essence, as shown bellow:

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
* **Input #2**: `costsOutputId`, which pays the storage costs.

And three Outputs:

* **Output #1**: `nextNftOutput`, the next NFT Output of your NFT.
* **Output #2**: `refundOutput`, the refund made to the Issuer of your NFT.
* **Output #3**: `remainderOutput`, the remainder of the storage costs.

## Unlock the Outputs

The unlock condition you need to provide corresponds to the signature calculated against the transaction essence using
the private key of the NFT Owner. The same signature also unlocks the second Input.

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

Finally, you should submit the block. After the block is confirmed, if you query your NFT ID
through [the Shimmer Explorer](https://explorer.shimmer.network/shimmer), you will find the new NFT Output with the
updated state.

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

The complete source code of this part of the tutorial is available in
the [official iota.js GitHub repository](https://github.com/iotaledger/iota.js/blob/feat/stardust/packages/iota/examples/shimmer-nft-transaction-tutorial/src/claim-nft.ts).

