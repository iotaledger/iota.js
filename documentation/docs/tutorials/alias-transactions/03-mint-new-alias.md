---
description: "Mint a new Alias with iota.js."
image: /img/client_banner.png
keywords:
- tutorial
- alias
- address
- output
- mint
---

# Mint a New Alias Address

You can use an [Alias Output](https://wiki.iota.org/shimmer/introduction/explanations/ledger/alias/) to store proof of the world state included in the ledger and never pruned. An Alias Output is associated with an Alias ID (also known as an [Alias Address](#calculate-the-alias-id)). An Alias ID remains immutable during its lifetime.

For instance, an Alias Output can contain a hash or digital signature as a commitment to the state of a particular dynamic data set, as it happens with Smart Contracts. A data validator can use such proof to ensure that the concerned data has not been tampered with. When there is a change in the data, a transition to a new state is recorded on the ledger by a new transaction that generates a new Alias Output with the original Alias ID. The Alias ID remains constant, whereas a new Alias Output is generated to hold the new state.

Provided the proof size in bytes does not change between state changes, a new Alias Output does not need to increase its storage deposit.

To mint a new Alias and generate its genesis, you will need the following:

* An unspent Output that holds enough funds for the minimal storage deposit needed for the genesis Alias Output. In the Testnet, you can [request funds through the Faucet](../value-transactions/06-request-funds-from-the-faucet.md).

* The key pair that corresponds to the Shimmer address that owns the output, as you need to unlock a certain amount of funds to cover the storage deposit of the new minted Alias.

* A State Controller Address. You will use the State Controller address private key to unlock the Alias Output of your new Alias so that it can transition to a new state when needed. If you haven’t generated any addresses before, you can find detailed instructions in the [Send Value Transactions tutorial](../value-transactions/04-generate-addresses.md).

* A Governor Address. With the private key of the Governor, you will be able to change the State Controller Address or even destroy the Alias.

* The data you want to store on the Alias Output (represented as a hexadecimal string). Remember, the longer the data, the higher the storage deposit you will need.

```typescript
const consumedOutputId = "0x45678...";

// Ed25519 Addresses (PubKeyHash)
const sourceAddress = "0x377a...";

// Ed25519 Key pairs
const sourceAddressPublicKey = "0x1be6ea...";
const sourceAddressPrivateKey = "0xb2a5c46a...";

// Ed25519 Addresses (PubKeyHash)
const stateControllerAddress = "0x647f7a9fd831c6e6034e7e5496a50aed17ef7d2add200bb4cfde7649ce2b0aaf";
const governorAddress = "0x22847390aad479d34d52e4fb58a01d752887ae0247708f7e66b488c5b5ba2751";

const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });
const protocolInfo = await client.protocolInfo();
```

## Define the Genesis Alias Output

You can define the genesis (initial) Alias Output to mint your Alias with the following snippet:

```typescript
const initialAliasId = new Uint8Array(new ArrayBuffer(32));

const aliasOutput: IAliasOutput = {
    type: ALIAS_OUTPUT_TYPE,
    amount: amountToSend.toString(),
    aliasId: Converter.bytesToHex(initialAliasId, true),
    stateMetadata: "0x12345678",
    stateIndex: 0,
    foundryCounter: 0,
    unlockConditions: [
        {
            type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: stateControllerAddress
            }
        },
        {
            type: GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: governorAddress
            }
        }
    ]
};
```

The `aliasId` is initialized as a hexadecimal string that represents `32` bytes set to `0`. That is the way to ask for a new Alias to be minted. The `stateIndex` is initialized as `0`, as this is the initial state. In the unlock conditions, the State Controller and Governor addresses are specified in their Ed25519 hashed representation.

## Define the Transaction Essence

The transaction you are defining involves an input (the output that holds enough funds to cover the storage deposit of the new Alias) and two outputs:
The new Alias Output
A Basic Output that holds the remaining funds from the original Input. You can only unlock this Output with the original address that controls the funds.

In this case, you manually assign an amount to send to the Alias Output (`60000 Glow`) so that it covers its storage deposit. In a real-world scenario, you may need to automatically calculate the storage deposit as per the byte rent costs published by your node.

You can calculate the remaining funds by sending a query to the node to obtain the details of the consumed output. You can use the following snippet to do so:

```typescript
 const inputs: IUTXOInput[] = [];
const outputs: (IAliasOutput | IBasicOutput)[] = [];

// The number of funds to be sent to an alias output so that it covers its byte costs
const amountToSend = bigInt("60000");

inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));

// Details the of consumed Output
const consumedOutputDetails = await client.output(consumedOutputId);
const totalFunds = bigInt(consumedOutputDetails.output.amount);

// The remaining output remains in the origin address
const remainderBasicOutput: IBasicOutput = {
    type: BASIC_OUTPUT_TYPE,
    amount: totalFunds.minus(amountToSend).toString(),
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

outputs.push(aliasOutput);
outputs.push(remainderBasicOutput);

// Get inputs commitment
const inputsCommitment = TransactionHelper.getInputsCommitment([consumedOutputDetails.output]);

// Create transaction essence
const transactionEssence: ITransactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: TransactionHelper.networkIdFromNetworkName(protocolInfo.networkName),
    inputs,
    inputsCommitment,
    outputs
};
```

## Issue the Transaction

Once you have defined the transaction essence, you can [issue the transaction](../value-transactions/08-transfer-funds.md#create-a-transaction-payload). You will need to sign the essence with the keys of the address that controls the initial output that will provide funds for the Alias output (the storage deposit as a minimum).

After submitting the block with the Block ID, you can check the [Tangle Explorer](https://explorer.shimmer.network/testnet) for the resulting outputs.

```typescript
const wsTsxEssence = new WriteStream();
serializeTransactionEssence(wsTsxEssence, transactionEssence);
const essenceFinal = wsTsxEssence.finalBytes();

const essenceHash = Blake2b.sum256(essenceFinal);
   
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

const blockId = await client.blockSubmit(block);
console.log("Block Id:", blockId);
```

## Calculate the Alias ID

It is important to understand that the new Alias ID is derived from the ID of the Alias Output, and the ID of the Alias Output is derived from the ID of the transaction. The transaction ID is a hash of the transaction payload, which can be calculated using the function `computeTransactionIdFromTransactionPayload` as shown below. The output ID is calculated using the function [`TransactionHelper.outputIdFromTransactionData`](../../references/client/classes/TransactionHelper.md#outputidfromtransactiondata), and the Alias Id is the Blake256 hash of an Output Id. You can calculate the Bech32 address corresponding to the Alias Id using the [`Bech32Helper`](../../references/client/classes/Bech32Helper.md) and specifying that it is an `ALIAS_ADDRESS_TYPE`.

```typescript
const blockData: IBlock = await client.block(blockId);
const blockTransactionPayload = blockData.payload as ITransactionPayload;

const transactionId = computeTransactionIdFromTransactionPayload(blockTransactionPayload);
const outputId = TransactionHelper.outputIdFromTransactionData(transactionId, 0);
console.log("Output Id:", outputId);

const addrHash = Blake2b.sum256(Converter.hexToBytes(outputId));
console.log("Alias ID:", Converter.bytesToHex(addrHash, true));
console.log("Alias Address:", Bech32Helper.toBech32(ALIAS_ADDRESS_TYPE, addrHash, protocolInfo.bech32Hrp));

function computeTransactionIdFromTransactionPayload(payload: ITransactionPayload) {
  const tpWriteStream = new WriteStream();
  serializeTransactionPayload(tpWriteStream, payload);
  return Converter.bytesToHex(Blake2b.sum256(tpWriteStream.finalBytes()), true);
}
```

The code above will result in something similar to the following:

```text
Block Id: 0x2817e61f5a559a7521e2e20dfc69f0e184a6fa00109a05fa040a9d6cb6d292e1
Output Id: 0x6e23b48b4f4e5683832c4b53d598b00d769ba2a7305c9c0cdeefb0246b894f330000
Alias ID: 0x6dd4b53990a862f7afaa19b58c5566970d7c40482547abd50a3a6de9f9ad4b14
Alias Address: rms1ppkafdfejz5x9aa04gvmtrz4v6ts6lzqfqj50274pgaxm60e4493gdry4ys
```

Remember that the Alias ID remains constant and known by every node software regardless of the transactions (Alias Outputs generated) issued. That means you can query through the Tangle Explorer, for instance, the current Alias Output of an Alias Id by just supplying the Alias Id or its representation as a Bech32 address.

## Putting It All Together

The complete source code of this part of the tutorial is available in the [official iota.js GitHub repository](https://github.com/iotaledger/iota.js/blob/feat/stardust/packages/iota/examples/shimmer-alias-transaction-tutorial/src/mint-new-alias.ts).
