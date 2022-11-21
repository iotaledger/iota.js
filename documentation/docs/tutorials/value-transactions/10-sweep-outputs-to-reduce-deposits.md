# Sweep Outputs to Reduce Deposits

As introduced in [Understanding Deposits](09-understanding-deposits.md), if you would like to reduce your total storage
deposit, you can sweep your two outputs into a single output that will contain `0.10 SMR` by combining each `0.05 SMR`
existing output. To do so, you will need to create a new transaction and use the two existing outputs as inputs.

## Obtain the Existing Outputs

You can obtain the existing outputs by sending the address in Bech32 format to the indexer plugin. In this case, since
you want the two latest outputs, you can select the first two returned elements as shown below:

```typescript
const indexerPlugin = new IndexerPluginClient(client);
const outputList = await indexerPlugin.basicOutputs({
    addressBech32: destinationAddressBech32
});

const consumedOutputId1 = outputList.items[0];
const consumedOutputId2 = outputList.items[1];
```

You already know that each output will hold `0.05 SMR`, but you can query each output and obtain its amount by calling
the [`SingleNodeClient.output()`](../../references/client/classes/SingleNodeClient#output) function as shown below:

```typescript
const output1 = await client.output(consumedOutputId1);
const output2 = await client.output(consumedOutputId2);

// The two outputs are combined into only one output (final amount will be 100000 Glow, 0.1 Shimmer)
const amount1 = bigInt(output1.output.amount);
const amount2 = bigInt(output2.output.amount);
```

## Define the Combined Output

The new output will hold the sum amount of `output1` and `output2`.

The unlock conditions correspond to the controller of the origin address. That means that, in this case, you are not
transferring funds to another address but to the same address collapsed into a single output.

Please note that you could also have transferred your new output to another address you control. Remember
that with the initial seed you can [generate multiple deterministic addresses](04-generate-addresses.md).

```typescript
const combinedOutput: IBasicOutput = {
    type: BASIC_OUTPUT_TYPE,
    amount: amount1.add(amount2).toString(),
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

## Sweep the Transaction Payload

To generate the sweep transaction ,you need to:

1. Convert your initial outputs to inputs.
2. Generate a commitment
3. Create a transaction essence.

```typescript
const inputs: IUTXOInput[] = [];

inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId1));
inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId2));

const inputsCommitment = TransactionHelper.getInputsCommitment([output1.output, output2.output]);

const transactionEssence: ITransactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: protocolInfo.networkId,
    inputs,
    inputsCommitment,
    outputs: [combinedOutput]
};
```

Now, you need to calculate the hash of the transaction essence and provide the unlock conditions for each input. To
provide the unlock conditions, you will need the public and private keys of your address, so that you can generate a
proper digital
signature.

In this particular case, the unlock conditions will be the same for each input, so the examples uses a "Reference unlock
condition", [`REFERENCE_UNLOCK_TYPE`](../../references/client/api_ref#reference_unlock_type).

```typescript
const wsTsxEssence = new WriteStream();
serializeTransactionEssence(wsTsxEssence, transactionEssence);
const essenceFinal = wsTsxEssence.finalBytes();

const essenceHash = Blake2b.sum256(essenceFinal);

const destAddressPubKey = "0x....";
const destAddressPrivateKey = "0x....";

// Main unlock condition 
const unlock1: ISignatureUnlock = {
    type: SIGNATURE_UNLOCK_TYPE,
    signature: {
        type: ED25519_SIGNATURE_TYPE,
        publicKey: destAddressPubKey,
        signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(destAddressPrivateKey), essenceHash), true)
    }
};

const unlock2: IReferenceUnlock = {
    type: REFERENCE_UNLOCK_TYPE,
    reference: 0
};

const transactionPayload: ITransactionPayload = {
    type: TRANSACTION_PAYLOAD_TYPE,
    essence: transactionEssence,
    unlocks: [unlock1, unlock2]
};
```

You can now [submit your transaction payload as block](08-transfer-funds.md#submit-the-block). Once the transaction is
confirmed, you can observe that now the storage deposit is reduced to `42600` Glow, but the balance is still `0.1 SMR`.
