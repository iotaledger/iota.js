---
description: "Update an NFT’s state using a transaction with iota.js."
image: /img/client_banner.png
keywords:

- tutorial
- NFT
- output
- transaction

---

# Create an NFT Transaction

The owner of an NFT can perform transactions that change the NFT’s mutable fields to a new state. The transaction
generates a new NFT Output with the same NFT ID as the original. Remember that the NFT ID remains constant regardless of
the NFT Output that holds the funds and the NFT metadata. The **NFT Output Id** changes once it is "spent" and pruned
from the ledger.

This section will show you how to issue a transaction that will transfer the ownership of your NFT to a different
address. Since you probably want to recover the tokens you used to cover
the [storage deposits](https://wiki.iota.org/shimmer/iotajs/tutorials/value-transactions/introduction/#storage-costs-and-deposits),
this code example includes an
additional [storage deposit return](https://wiki.iota.org/shimmer/introduction/explanations/what_is_stardust/unlock_conditions/#storage-deposit-return) [unlock condition](https://wiki.iota.org/shimmer/introduction/explanations/what_is_stardust/unlock_conditions/)
to the NFT Output.

## Preparation

To create this transaction, you will need the following:

* A Shimmer Node. You can use the [Shimmer Testnet nodes](https://api.testnet.shimmer.network).

* The NFT ID of your NFT, in hexadecimal format `0x7d08...`.

* The keys of the address that controls your NFT.

```typescript
const client = new SingleNodeClient(API_ENDPOINT, {powProvider: new NeonPowProvider()});
const nodeInfo = await client.info();

const nftOwnerAddr = "0x62c0...";
const nftOwnerPubKey = "0x91db...";
const nftOwnerPrivateKey = "0x22f6...";

const nftBuyerAddr = "0x57d3...";
```

## Query For the NFT Output

You will first need to query for the NFT Output of your NFT. The easiest way to do so is through a query to
the [indexation plugin](https://wiki.iota.org/shimmer/inx-indexer/welcome/) by NFT ID. You need to obtain the full
Output details as you need to use them as input for the transaction.

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

## Set the New Unlock Conditions

Once you have [queried for the NFT output](#query-for-the-nft-output), you should create the new NFT Output by cloning
it, and then set the two new unlock conditions:

1. The [address](https://wiki.iota.org/shimmer/introduction/explanations/what_is_stardust/unlock_conditions/#address)
   corresponding to the new owner of the NFT (for instance, the buyer of the NFT).
2.
A [storage deposit unlock condition](https://wiki.iota.org/shimmer/introduction/explanations/what_is_stardust/unlock_conditions/#storage-deposit-return)
that will allow you to get a refund of the storage costs of the NFT Output. That way, the `SMR` tokens you used to cover
the storage costs will be refunded whenever the new owner of the NFT decides to unlock it.

## Define the Transaction

### Add the Unlock Conditions

Now, you are ready to define the transaction. You should assign the correct `nftId` to your new NFT Output.

As you add more unlock conditions, the storage deposit of the NFT Output increases, but that will be covered with the
extra funds you supplied when you [minted the NFT](03-mint-new-nft.md). Remember that the amount was double the minimum
one.

```typescript
const nextNftOutput: INftOutput = JSON.parse(JSON.stringify(initialNftOutput));
nextNftOutput.unlockConditions = [
    {
        type: ADDRESS_UNLOCK_CONDITION_TYPE,
        address: {
            type: ED25519_ADDRESS_TYPE,
            pubKeyHash: nftBuyerAddr
        }
    },
    {
        type: STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
        amount: nextNftOutput.amount,
        returnAddress: {
            type: ED25519_ADDRESS_TYPE,
            pubKeyHash: nftOwnerAddr
        }
    }
];

nextNftOutput.nftId = nftId;
```

### Define the Transaction Essence

The transaction takes the original NFT Output as Input and generates a **new NFT Output** with the new state that **will
still keep the original NFT ID**.

```typescript
const inputs: IUTXOInput[] = [];
const outputs: INftOutput[] = [];

inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));
outputs.push(nextNftOutput);

const inputsCommitment = TransactionHelper.getInputsCommitment([initialNftOutput]);

const transactionEssence: ITransactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: TransactionHelper.networkIdFromNetworkName(nodeInfo.protocol.networkName),
    inputs,
    inputsCommitment,
    outputs
};
```

### Add the Unlock Conditions to the New NFT Output

The unlock you need to provide correspond to the signature calculated against the transaction essence using the private
key of the original owner address.

```typescript
const essenceHash = TransactionHelper.getTransactionEssenceHash(transactionEssence);

const unlockCondition: ISignatureUnlock = {
    type: SIGNATURE_UNLOCK_TYPE,
    signature: {
        type: ED25519_SIGNATURE_TYPE,
        publicKey: nftOwnerPubKey,
        signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(nftOwnerPrivateKey), essenceHash), true)
    }
};

const transactionPayload: ITransactionPayload = {
    type: TRANSACTION_PAYLOAD_TYPE,
    essence: transactionEssence,
    unlocks: [unlockCondition]
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
the [official iota.js GitHub repository](https://github.com/iotaledger/iota.js/blob/feat/stardust/packages/iota/examples/shimmer-nft-transaction-tutorial/src/nft-transaction.ts).

