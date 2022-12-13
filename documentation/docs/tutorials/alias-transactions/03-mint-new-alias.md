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

# Mint a new Alias

An Alias Output can be used to store a proof of the world state that is included on the ledger and never pruned. An Alias Output is associated with an Alias ID (also known as Alias Address as we will explain later). An Alias ID remains immutable during its lifetime.

For instance, an Alias Output can contain a hash or digital signature as a commitment to the state of a certain dynamic data set, as it happens with Smart Contracts. Such proof can be used by a data validator to ensure that the concerned data has not been tampered with. When there is a change in the concerned data, a transition to a new state is recorded on the ledger by a new transaction that generates a new Alias Output conserving the original Alias ID. That is, the Alias ID remains constant whereas a new Alias Output is generated to hold the new state.

Provided the size of the proof in bytes does not change in between state changes, a new Alias Output does not need to increase its storage deposit.

In order to mint a new Alias and generate its genesis, initial Alias Output it is needed:

* A not spent Output that holds enough funds for the minimal storage deposit needed for the genesis Alias Output. In the testnet you can provision funds through the Faucet, as we explained in our [previous tutorial](https://wiki.iota.org/shimmer/iotajs/tutorials/value-transactions/request-funds-from-the-faucet/).

* The key pair corresponding to the Shimmer address that owns the former Output as you need to unlock a certain amount of funds to cover the storage deposit of the new minted Alias.

* A State Controller Address. The State Controller address private key will be used to unlock the Alias Output of your new Alias so that it can transition to a new state when needed. We explained in our [previous tutorial](https://wiki.iota.org/shimmer/iotajs/tutorials/value-transactions/generate-addresses/) how to create addresses.

* A Governor Address. With the private key of the Governor you will be able to change the State Controller Address or even destroy the Alias.

* The data you want to store on the Alias Output (represented as an hexadecimal string). Remember the longer the data the higher storage deposit you will need.

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

## Define the genesis Alias Output

The genesis (initial) Alias Output needed to mint our Alias can be defined as follows:

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

You can observe that `aliasId` is initialized to an hexadecimal string that represents `32` bytes set to `0`. That is the way to ask for a new Alias to be minted. The `stateIndex` is initialized to `0` as this is the initial state. In the unlock conditions the State Controller address and the Governor addresses are specified in their Ed25519 hashed representation.

## Define the Transaction Essence

The transaction we are defining involves an input (the output that holds at least enough funds to cover the storage deposit of the new Alias), and two outputs. The new Alias Output and another Basic Output with the remaining funds from the original input (that can only be unlocked with the original address that controls the funds). Observe that in this case we are assigning manually an amount to send to the Alias Output (`60000 Glow`) so that it covers its storage deposit. In a real world scenario you may need to do an automatic calculation of the storage deposit as per the byte rent costs published by your node.

For calculating the remaining funds a query is made against the node to obtain the details of the aforementioned consumed output.

```typescript
 const inputs: IUTXOInput[] = [];
const outputs: (IAliasOutput | IBasicOutput)[] = [];

// The amount of funds to be sent to an alias output so that it covers its byte costs
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
    networkId: protocolInfo.networkId,
    inputs,
    inputsCommitment,
    outputs
};
```

## Issue the Transaction

Once the transaction essence is defined the transaction can be issued the same way as we did in [previous tutorials](https://wiki.iota.org/shimmer/iotajs/tutorials/value-transactions/transfer-funds/#create-a-transaction-payload). The essence has to be signed with the keys of the address that controls the initial output unlocked and which will provide funds for our Alias (the storage deposit as a minimum).

After submitting the corresponding block with the Block ID you can check in the [Tangle Explorer](https://explorer.shimmer.network/testnet) the resulting outputs.

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

It is important to understand that the new Alias ID is derived from the Id of the Alias Output and the Id of the Alias Output is derived from the Id of the transaction. The Id of the transaction is a hash of the transaction payload, that can be calculated using the function `computeTransactionIdFromTransactionPayload` as shown below. The Id of the output is calculated using the function `TransactionHelper.outputIdFromTransactionData` and then the Alias Id is the Blake256 hash of such an Output Id. Afterwards you can calculate the Bech32 address corresponding to such an Alias Id using the `Bech32Helper` and specifying that it is an `ALIAS_ADDRESS_TYPE`.

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

The code above will result in something similar to:

```text
Block Id: 0x2817e61f5a559a7521e2e20dfc69f0e184a6fa00109a05fa040a9d6cb6d292e1
Output Id: 0x6e23b48b4f4e5683832c4b53d598b00d769ba2a7305c9c0cdeefb0246b894f330000
Alias ID: 0x6dd4b53990a862f7afaa19b58c5566970d7c40482547abd50a3a6de9f9ad4b14
Alias Address: rms1ppkafdfejz5x9aa04gvmtrz4v6ts6lzqfqj50274pgaxm60e4493gdry4ys
```

Remember that the Alias ID remains constant and known by every node software regardless the transactions (Alias Outputs generated) issued. That means that you can query, through the Tangle Explorer for instance, the current Alias Output of an Alias Id by just supplying the Alias Id or its representation as a Bech32 address.
