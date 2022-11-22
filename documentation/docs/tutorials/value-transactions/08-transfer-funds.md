# Transfer Funds

This example uses the following addresses declared as constants, but you should use
the [addresses you generated](04-generate-addresses.md):

* **Origin address**: `rms1qp5kej93urfvrc5lhuay7jgupjwuwvxxunzwp59tvqg7nufqntcpxp26uj8`
  or `0x696cc8b1e0d2c1e29fbf3a4f491c0c9dc730c6e4c4e0d0ab6011e9f1209af013` in Ed25519 format.

* **Destination address:** `rms1qz7f4y6kje2xyykzxljfazqlc67mmy9apmrpgqu3nqsh9uz6qxcf2zqse0d`
  or `0xbc9a935696546212c237e49e881fc6bdbd90bd0ec6140391982172f05a01b095` in Ed25519 format.

```typescript
const sourceAddress = "0x696cc...";
const sourceAddressBech32 = "rms1qp5kej9...";
const sourceAddressPublicKey = "0x5782872d...";
const sourceAddressPrivateKey = "0x003dd7e...";

const destAddress = "0xbc9a935...";
```

You will need to take the following steps to transfer funds:

1. [Prepare the input](#prepare-the-input) by selecting the output to be consumed and turn into a transaction input.
2. [Prepare the outputs](#prepare-the-outputs)
    1. [Determine the new outputs that will be generated](#define-the-output-type)
    2. [Provide the unlock conditions for such new outputs](#provide-the-unlock-conditions)
    3. [Create a transaction payload](#create-a-transaction-payload), by wrapping the inputs and outputs into a
       [transaction essence](#create-a-transaction-essence).
    4. [Sign the transaction essence](#sign-the-transaction-essence) with the corresponding private key so that those
       inputs can be unlocked.
    5. Attach a transaction payload (essence + unlock conditions) into a block and [submit the block](#submit-the-block)
       .

## Prepare the Input

In this example we will consume the output that holds the initial
funds [requested from the testnet Faucet](07-request-funds-from-the-faucet.md). As
the unit of measurement is the Glow, you should use a `BigInt` data type to perform arithmetic operations. In this
case, the transferred value is `50000` Glow.

An input is represented by the type [`IUTXOInput`](../../references/client/interfaces/IUTXOInput), and can be easily
obtained from an output ID using
the [`TransactionHelper.inputFromOutputId()`](../../references/client/classes/TransactionHelper#inputfromoutputid)
function, as shown below:

```typescript
const consumedOutputId = "0xcba9a6616df8e8e323d8203ea5d1a42e2e7c64dc9ead6b59f5d26bdc301efa540000";
const outputDetails = await client.output(consumedOutputId);
const totalFunds = bigInt(outputDetails.output.amount);

const amountToSend = bigInt("50000");

const inputs: IUTXOInput[] = [];

inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));
```

## Prepare the Outputs

In this case, you will need to generate two new outputs:

* The output where the `50000` Glow will reside, associated to the destination address.
* The output where the remaining funds will stay, associated to the origin address.

```typescript

const outputs: IBasicOutput[] = [];

const basicOutput: IBasicOutput = {
    type: BASIC_OUTPUT_TYPE,
    amount: amountToSend.toString(),
    nativeTokens: [],
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

### Define the Output Type

You can define a basic output by assigning the [`BASIC_OUTPUT_TYPE`](../../references/client/api_ref#basic_output_type)
the `type` field.

### Provide the Unlock Conditions

This example above uses
the [`ADDRESS_UNLOCK_CONDITION_TYPE`](../../references/client/api_ref#address_unlock_condition_type).
This means that whoever controls the specified address can unlock the funds (i.e. the owner of the corresponding
private key).

The output that will hold the remaining funds is as follows:

```typescript
// The remaining output that remains in the origin address
const remainderBasicOutput: IBasicOutput = {
    type: BASIC_OUTPUT_TYPE,
    amount: totalFunds.minus(amountToSend).toString(),
    nativeTokens: [],
    unlockConditions: [
        {
            type: ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: originAddress
            }
        }
    ],
    features: []
};

outputs.push(basicOutput);
outputs.push(remainderBasicOutput);
```

**Where**:

* The amount of funds will be the total funds of the original input minus the amount now hold by the new output.
* The unlock condition in this case will still be `ADDRESS_UNLOCK_CONDITION_TYPE`, but it will correspond to the
  origin Ed25519 address.

### Create a Transaction Payload

#### Create a transaction essence

Before you can create a transaction payload, you will need to create a transaction essence, as it will
be used to calculate a hash for the corresponding signature.

The transaction essence must include the commitments to the inputs so that it is ensured that those outputs already
exist at the time of submitting the transaction. You can retrieve them using
the [`TransactionHelper.getInputsCommitment()`](../../references/client/classes/TransactionHelper#getinputscommitment)
function as shown below:

```typescript
const inputsCommitment = TransactionHelper.getInputsCommitment([outputDetails.output]);

const transactionEssence: ITransactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: protocolInfo.networkId,
    inputs,
    inputsCommitment,
    outputs
};

const wsTsxEssence = new WriteStream();
serializeTransactionEssence(wsTsxEssence, transactionEssence);
const essenceFinal = wsTsxEssence.finalBytes();

const essenceHash = Blake2b.sum256(essenceFinal);
```

#### Sign the transaction essence

Once you have calculated the hash of the transaction essence, you can create the final transaction payload by adding the
corresponding signature unlock:

```typescript
const privateKey = Converter.hexToBytes(sourceAddressPrivateKey);
const signatureUnlock: ISignatureUnlock = {
    type: SIGNATURE_UNLOCK_TYPE,
    signature: {
        type: ED25519_SIGNATURE_TYPE,
        publicKey: sourceAddressPublicKey,
        signature: Converter.bytesToHex(Ed25519.sign(privateKey, essenceHash), true)
    }
};

const transactionPayload: ITransactionPayload = {
    type: TRANSACTION_PAYLOAD_TYPE,
    essence: transactionEssence,
    unlocks: [signatureUnlock]
};
```

The signature unlock is composed by the **public key** corresponding to the source address (not the
hash) and the signature represented in hex format. The node receiving the transaction needs the public key to properly
verify the attached signature.

It is important that you note *for each input* there should be one unlock in the transaction payload. If you need to
unlock other
inputs with the same signature, then you should
use [`IReferenceUnlock`](../../references/client/interfaces/IReferenceUnlock) (
see [Sweep Outputs To Reduce Deposits](10-sweep-outputs-to-reduce-deposits.md)).

## Submit the Block

In order the transaction to be attached to the Tangle, you will need to add it to a block.
You can retrieve the parents for the block using
the [`SingleNodeClient.tips()`](../../references/client/classes/SingleNodeClient#tips) function, or you can leave it
empty if you are using the [`NeonPowProvider`](../../references/pow-neon/classes/NeonPowProvider).

```typescript
const block: IBlock = {
    protocolVersion: DEFAULT_PROTOCOL_VERSION,
    parents: [],
    payload: transactionPayload,
    nonce: "0",
};

const blockId = await client.blockSubmit(block);

console.log(blockId);
```

## Check the Results

If you have transferred the funds succesfully, you should have:

* Created a new block identified by a certain `Block Id` (Block Ids are `32` bytes long i.e. `256` bit).
* Create a new transaction identified by a `transaction Id` (Transaction Ids are `32` bytes long).
* Created two new outputs on the ledger, one associated to each address and identified by their corresponding ID (Output
  Ids are `34` bytes long).
* After the transaction is confirmed, the funds of the origin address will be `999.95 SMR` and the funds of the
  destination address will be `0.05 SMR` (`50,000 Glow`) as `1 SMR` is `10^6` (`1M`) Glow.

You can now check the balance of both addresses using
the [Shimmer Testnet Explorer](https://explorer.shimmer.network/testnet).

