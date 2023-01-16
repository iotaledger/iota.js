---
description: "Perform an NFT Transaction with iota.js."
image: /img/client_banner.png
keywords:
- tutorial
- nft
- output
- transaction
---

# Create an NFT Transaction

The owner of an NFT can perform transactions that change the NFT (the mutable fields) to a new state. The transaction generates a new NFT Output with the NFT ID of the original NFT. Remember that the NFT ID remains constant regardless of the NFT Output that holds the funds and the NFT metadata. The **NFT Output Id** changes, and once it is "spent", it is pruned from the ledger.
In this section, you will learn to issue a transaction to transfer the ownership of your NFT to a different address, for instance to a buyer of your NFT. As you normally would like to get a refund of the storage costs back to your address, you will learn how to add an additional unlock condition to the NFT Output.

## Preparation

To create this transaction, you will need the following:

* A Shimmer Node. You can use the [Shimmer Testnet nodes](https://api.testnet.shimmer.network).

* The NFT ID of your NFT, in hexadecimal format `0x7d08...`.

* The keys of the address that controls your NFT.

```typescript
const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });
const nodeInfo = await client.info();

const nftOwnerAddr = "0x62c0...";
const nftOwnerPubKey = "0x91db...";
const nftOwnerPrivateKey = "0x22f6...";

const nftBuyerAddr = "0x57d3...";
```

## Query NFT Output

You will first need to find the NFT Output of your NFT. The easiest way to do so is through a query to the [indexation plugin](https://wiki.iota.org/shimmer/inx-indexer/welcome/) by NFT ID. Observe that you need to obtain the full Output details as you need to use them as input for the transaction.

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

## Set the New Unlock Conditions

To continue, you can create the new NFT Output by cloning the one received in the [previous step](#query-nft-output), and then set the two new unlock conditions:

1. The address corresponding to the new owner of the NFT (for instance, the buyer of the NFT).
2. A storage deposit unlock condition that will allow you to get refunded of the storage costs of the NFT Output. That way the `SMR` tokens that were used to cover the storage costs will have to be refunded whenever the new owner of the NFT decides to unlock it and perform an operation over it.

Now, you are ready to define the transaction. Last but not least, you should ensure that you assign the correct `nftId` to your new NFT Output.

As you are adding more unlock conditions, the storage deposit of the NFT Output increases, but that will be covered with the extra funds that were supplied in the previous section of this tutorial. Remember that the amount was doubled from the minimum one.

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

## Define the Transaction

The transaction takes the original NFT Output as Input and generates a new NFT Output with the new state but keeps the original NFT ID.

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

## Unlock the NFT Output

The unlock you need to provide correspond to the signature calculated against the transaction essence using the private key of the original owner address.

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

The complete source code of this part of the tutorial is available in the [official iota.js GitHub repository](https://github.com/iotaledger/iota.js/blob/feat/stardust/packages/iota/examples/shimmer-nft-transaction-tutorial/src/nft-transaction.ts).
