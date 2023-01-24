---
description: "Mint a new NFT with iota.js."
image: /img/client_banner.png
keywords:

- tutorial
- NFT
- token
- asset
- digital
- non
- fungible
- output
- mint

---

# Mint a New NFT

An [NFT](https://wiki.iota.org/shimmer/introduction/explanations/ledger/nft/) is a unique token on the ledger. Its owner
controls it through the private key of
an [address](https://wiki.iota.org/iota.rs/explanations/address_key_space/). An NFT has a unique ID assigned by the
Ledger, bound to an Output in the Ledger. An NFT has some immutable
features that cannot be changed through the lifetime of the NFT, namely the issuer of the NFT. Additionally, immutable
metadata links the NFT with a Digital Asset (image, video, etc.). The owner of the NFT can only change non-immutable
aspects of
the NFT by unlocking its unspent Output in a transaction and generating a
new Output (conserving the NFT ID). The owner can also use a transaction to transfer the NFT to another owner. As with
other types of Outputs, NFT Outputs must also cover
their [storage costs](https://wiki.iota.org/shimmer/introduction/explanations/what_is_stardust/storage_deposit/) with
protocol-defined tokens (`SMR`).

To mint an NFT, you will need the following:

* A unspent [Basic Output](https://wiki.iota.org/shimmer/tips/tips/TIP-0018/#basic-output) that holds enough funds for
  the minimal storage deposit needed for the NFT Output. In
  the [Testnet](https://wiki.iota.org/shimmer/introduction/reference/networks/betanet/), you
  can [request funds from the Faucet](https://wiki.iota.org/shimmer/iotajs/tutorials/value-transactions/request-funds-from-the-faucet/).

* The key pair that corresponds to the Shimmer address that owns the former Output, as you need to unlock a certain
  amount of funds to cover the storage deposit of the Output corresponding to the newly minted NFT.

* The immutable metadata that will allow you to associate the NFT with a digital asset. For instance, you could store a
  digital asset in a permissioned server. Upon proving ownership of the NFT, the server would grant access to the
  associated digital asset. Remember the longer the metadata, the higher the storage deposit.

```typescript
const consumedOutputId = "0xcb16...";

const sourceAddress = "0x62c0...";

const sourceAddressPublicKey = "0x91db...";
const sourceAddressPrivateKey = "0x22f...";

const client = new SingleNodeClient(API_ENDPOINT, {powProvider: new NeonPowProvider()});
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

## Initialize the NFT

The `nftId` is initialized as a hexadecimal string that represents `32` bytes set to `0`. By doing this, you tell the
request to mint a **new** NFT. The Output also includes two immutable features:
The `Issuer`. It must be equal to the owner of the Input of the transaction that will create the NFT
The `metadata`. This allows knowing information about the asset bound to the NFT. In this case,
the [IRC27 standard](https://wiki.iota.org/shimmer/tips/tips/TIP-0027/) is used to assert that the asset is an image
hosted at a particular URI.

### Unlock Conditions

The unlock conditions set that the `sourceAddress` is the one that owns this NFT. You will need to calculate the storage
costs of the NFT Output and assign it to the `amount` held by the Output. In this case, the code transferred double the
actual cost so that, if needed, the NFT Output can be expanded with extra metadata or unlock conditions.

## Define the Transaction Essence

The transaction involves an Input (the Output that holds at least enough funds to cover the storage deposit of
the new NFT) and two Outputs. The new NFT Output and another Basic Output with the remaining funds from the original
Input that you can only unlock with the original address that controls the funds.

To calculate the remaining funds, you need to query the node to obtain the details of the consumed Output.

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

Once the transaction essence is defined you can issue the transaction the same way as
with [value transaction](../value-transactions/transfer-funds/#create-a-transaction-payload). You will need to sign the
essence with the keys of the address that controls the initial Output, which will provide funds for your NFT (the
storage deposit as a minimum).

After submitting the corresponding block with the Block ID, you can check the resulting outputs in
the [Tangle Explorer](https://explorer.shimmer.network/testnet).

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

It is important to understand that the new NFT ID is derived from the ID of the NFT Output. In turn, the ID of the NFT
Output is derived from the transaction ID. The transaction ID is a hash of the transaction payload. You can calculate it
using the function `computeTransactionIdFromTransactionPayload` as shown below. The Output ID is
calculated using the function `TransactionHelper.outputIdFromTransactionData`, and then the NFT ID is the Blake256 hash
of the Output Id. Afterward, you can calculate the Bech32 address corresponding to the NFT ID using
the [`Bech32Helper`](../../references/client/classes/Bech32Helper.md) and specifying that it is an `NFT_ADDRESS_TYPE`.

Before querying the block, you can wait some seconds for confirmation and check through the `blockMetadata`
function that the Ledger included your block.

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
            Bech32Helper.toBech32(NFT_ADDRESS_TYPE, nftIdBytes, nodeInfo.protocol.bech32Hrp));
    } else if (blockMetadata.ledgerInclusionState === "conflicting") {
        throw new Error("Conflicting Block");
    }
}, 6000);

function computeTransactionIdFromTransactionPayload(payload: ITransactionPayload) {
    const tpWriteStream = new WriteStream();
    serializeTransactionPayload(tpWriteStream, payload);
    return Converter.bytesToHex(Blake2b.sum256(tpWriteStream.finalBytes()), true);
}
```

If you run the code above, you should get an output similar to:

```text
Block Id: 0xfd8fdb766f6e55afc52c4828cb93510530b7efcd7bdd55aadf8b8a01d6505b59
Output Id: 0xaced9bcc3b7b4ea5f55d19990de851dbe58676f2b3453a3a8bd780906154422e0000
NFT ID: 0x601c1c6a67b25c453a2286f639a43f8a68aeb865bcc53632cb670e6afa2ad12a
NFT Address: rms1zpspc8r2v7e9c3f6y2r0vwdy879x3t4cvk7v2d3jednsu6h69tgj5y8mzdm
```

Remember that the NFT ID remains constant and known by every node regardless of the transactions (NFT Outputs
generated) issued. That means you can query, through the [Tangle Explorer](https://explorer.shimmer.network/testnet),
for instance, the current NFT Output of an
NFT by supplying the NFT ID or its representation as a Bech32 address.

## Putting It All Together

The complete source code of this part of the tutorial is available in
the [official iota.js GitHub repository](https://github.com/iotaledger/iota.js/blob/feat/stardust/packages/iota/examples/shimmer-nft-transaction-tutorial/src/mint-new-nft.ts).
