---
description: "Mint a new NFT with iota.js."
image: /img/client_banner.png
keywords:
- tutorial
- nft
- token
- asset
- digital
- non
- fungible
- output
- mint
---

# Mint a new NFT

An [NFT](https://wiki.iota.org/shimmer/introduction/explanations/ledger/nft/) is a token on the ledger that is unique and controlled by its owner through the private key of an [address](). An NFT has a unique ID assigned by the Ledger which also yields to an address. Actually, an NFT is bound to an Output in the Ledger. An NFT has some immutable features that cannot be changed through the lifetime of the NFT, namely the issuer of the NFT. In addition there is usually also immutable metadata that links the NFT with a Digital Asset (image, video, etc.). Non-immutable aspects of the NFT can only be changed by the owner of the NFT by unlocking its unspent Output in a transaction, and generating a new Output (conserving the NFT ID). A transaction can also be used to transfer the NFT to another owner. As it happens with other types of Outputs, NFT Outputs must also cover its storage costs with protocol-defined tokens (`SMR`).

In order to mint a new NFT it is needed:

* A not spent [Basic Output]() that holds enough funds for the minimal storage deposit needed for the NFT Output. In the testnet you can provision funds through the Faucet, as we explained in our [previous tutorial](https://wiki.iota.org/shimmer/iotajs/tutorials/value-transactions/request-funds-from-the-faucet/).

* The key pair corresponding to the Shimmer address that owns the former Output as you need to unlock a certain amount of funds to cover the storage deposit of the Output corresponding to the new minted NFT.

* The immutable metadata that will allow you to associate the NFT with a digital asset. For instance the digital asset could be stored, in a permissioned server. Upon proving ownership of the NFT, such server can grant access to the associated digital asset. Remember the longer the metadata the higher storage deposit you will need.

```typescript
const consumedOutputId = "0xcb16...";

const sourceAddress = "0x62c0...";

const sourceAddressPublicKey = "0x91db...";
const sourceAddressPrivateKey = "0x22f...";

const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });
const info = await client.info();
```

## Define the NFT Output

The initial NFT Output needed to mint your NFT can be defined as follows:

```typescript
const initialNftId = new Uint8Array(new ArrayBuffer(32));

const immutableData = {
    standard: "IRC27",
    version: "v1.0",
    type: "image/jpeg",
    uri: "https://nft-oceean.example.org/my-nft.jpeg"
};

const nftOutput: INftOutput = {
    type: NFT_OUTPUT_TYPE,
    amount: "0",
    nftId: Converter.bytesToHex(initialNftId, true),
    immutableFeatures: [
        {
            type: ISSUER_FEATURE_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: sourceAddress
            }
        },
        {
            type: METADATA_FEATURE_TYPE,
            data: Converter.utf8ToHex(JSON.stringify(immutableData), true)
        },
    ],
    unlockConditions: [
        {
            type: ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: sourceAddress
            }
        }
    ]
};

const nftStorageCost = TransactionHelper.getStorageDeposit(nftOutput, nodeInfo.protocol.rentStructure);
const amountNeeded = bigInt(nftStorageCost).multiply(bigInt(2));
nftOutput.amount = amountNeeded.toString();
```

You can observe that `nftId` is initialized to an hexadecimal string that represents `32` bytes set to `0`. That is the way to ask for a new NFT to be minted. The Output also includes two immutable features: the `Issuer` (that must be equal to the owner of the Input of the transaction that is going to create the NFT) and the `metadata`. The latter allows to know information about the asset bound to the NFT. In this case the [IRC27 standard]() is used to assert that the asset is an image hosted at a particular URI.

The unlock conditions set that the `sourceAddress` is the one that owns this NFT. As you did in previous tutorials you need to calculate the storage costs of the NFT Output and assign it to the `amount` held by the Output. In this case the double of the cost is transferred so that, if needed, the NFT Output can be expanded with extra metadata or unlock conditions.

## Define the Transaction Essence

The transaction defined involves an Input (the Output that holds at least enough funds to cover the storage deposit of the new NFT), and two Outputs. The new NFT Output and another Basic Output with the remaining funds from the original Input (that can only be unlocked with the original address that controls the funds).

For calculating the remaining funds, a query is made against the node to obtain the details of the aforementioned consumed Output.

```typescript
const inputs: IUTXOInput[] = [];
const outputs: (INftOutput | IBasicOutput)[] = [];

inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));

const consumedOutputDetails = await client.output(consumedOutputId);
const totalFunds = bigInt(consumedOutputDetails.output.amount);

const remainderBasicOutput: IBasicOutput = JSON.parse(JSON.stringify(consumedOutput));

const remainingFunds = bigInt(consumedOutput.amount).minus(bigInt(nftOutput.amount));
remainderBasicOutput.amount = remainingFunds.toString();

outputs.push(nftOutput);
outputs.push(remainderBasicOutput);

const inputsCommitment = TransactionHelper.getInputsCommitment([consumedOutput]);

const transactionEssence: ITransactionEssence = {
type: TRANSACTION_ESSENCE_TYPE,
    networkId: TransactionHelper.networkIdFromNetworkName(nodeInfo.protocol.networkName),
    inputs,
    inputsCommitment,
    outputs
};
```

## Issue the Transaction

Once the transaction essence is defined the transaction can be issued the same way as we did in [previous tutorials](../value-transactions/transfer-funds/#create-a-transaction-payload). The essence has to be signed with the keys of the address that controls the initial Output unlocked and which will provide funds for your NFT (the storage deposit as a minimum).

After submitting the corresponding block with the Block ID you can check in the [Tangle Explorer](https://explorer.shimmer.network/testnet) the resulting outputs.

```typescript
const essenceHash = TransactionHelper.getTransactionEssenceHash(transactionEssence);

const unlockCondition: ISignatureUnlock = {
    type: SIGNATURE_UNLOCK_TYPE,
    signature: {
        type: ED25519_SIGNATURE_TYPE,
        publicKey: sourceAddressPublicKey,
        signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(sourceAddressPrivateKey), essenceHash), true)
    }
};

const transactionPayload: ITransactionPayload = {
    type: TRANSACTION_PAYLOAD_TYPE,
    essence: transactionEssence,
    unlocks: [unlockCondition]
};

const block: IBlock = {
    protocolVersion: DEFAULT_PROTOCOL_VERSION,
    parents: [],
    payload: transactionPayload,
    nonce: "0",
};

console.log("Calculating PoW, submitting block...");
const blockId = await client.blockSubmit(block);
console.log("Block Id:", blockId);
```

## Calculate the NFT ID

It is important to understand that the new NFT ID is derived from the Id of the NFT Output and the Id of the NFT Output is derived from the Id of the transaction. The Id of the transaction is a hash of the transaction payload, that can be calculated using the function `computeTransactionIdFromTransactionPayload` as shown below. The Id of the Output is calculated using the function `TransactionHelper.outputIdFromTransactionData` and then the NFT ID is the Blake256 hash of such an Output Id. Afterwards you can calculate the Bech32 address corresponding to such an NFT ID using the `Bech32Helper` and specifying that it is an `NFT_ADDRESS_TYPE`.

In this case, before querying the block you can wait some seconds for confirmation and check through the `blockMetadata` function that your block was actually included by the Ledger.

```typescript
setTimeout(async () => {
    const blockMetadata = await client.blockMetadata(blockId);
    if (!blockMetadata.ledgerInclusionState) {
        throw new Error("Block still pending confirmation");
    }

    if (blockMetadata.ledgerInclusionState === "included") {
        const transactionId = calculateTransactionId(transactionPayload);
        const outputId = TransactionHelper.outputIdFromTransactionData(transactionId, 0);
        console.log("Output Id:", outputId);
        const nftIdBytes = Blake2b.sum256(Converter.hexToBytes(outputID));
        const nftId = Converter.bytesToHex(nftIdBytes, true)
        console.log("NFT ID:", nftId);
        console.log("NFT Address:", 
        Bech32Helper.toBech32(NFT_ADDRESS_TYPE, nftIdBytes, nodeInfo.protocol.bech32Hrp ));
    }
    else if (blockMetadata.ledgerInclusionState === "conflicting") {
        throw new Error("Conflicting Block");
    }
}, 6000);

function computeTransactionIdFromTransactionPayload(payload: ITransactionPayload) {
  const tpWriteStream = new WriteStream();
  serializeTransactionPayload(tpWriteStream, payload);
  return Converter.bytesToHex(Blake2b.sum256(tpWriteStream.finalBytes()), true);
}
```

The code above will result in something similar to:

```text
Block Id: 0xfd8fdb766f6e55afc52c4828cb93510530b7efcd7bdd55aadf8b8a01d6505b59
Output Id: 0xaced9bcc3b7b4ea5f55d19990de851dbe58676f2b3453a3a8bd780906154422e0000
NFT ID: 0x601c1c6a67b25c453a2286f639a43f8a68aeb865bcc53632cb670e6afa2ad12a
NFT Address: rms1zpspc8r2v7e9c3f6y2r0vwdy879x3t4cvk7v2d3jednsu6h69tgj5y8mzdm
```

Remember that the NFT ID remains constant and known by every node software regardless the transactions (NFT Outputs generated) issued. That means that you can query, through the Tangle Explorer for instance, the current NFT Output of an NFT by just supplying the NFT ID or its representation as a Bech32 address.

## Putting It All Together

The complete source code of this part of the tutorial is available in the [official iota.js GitHub repository](https://github.com/iotaledger/iota.js/blob/feat/stardust/packages/iota/examples/shimmer-nft-transaction-tutorial/src/mint-new-nft.ts).
