---
description: "Mint native tokens with iota.js."
image: /img/client_banner.png
keywords:
- tutorial
- alias
- address
- output
- mint
- foundry
- native
- token
- digital
- asset
---

# Mint Native Tokens

In order to mint a new class of native tokens you need:

* An initial *unspent Output* that holds enough funds so that the [storage costs]() of the different Outputs involved can be covered. In the Testnet, you can [request funds through the Faucet](../value-transactions/request-funds-from-the-faucet/). Remember that storage costs must be covered by **protocol-defined tokens** (`SMR`).

* An *Alias Address* that will be used to control the Foundry Output associated to your new class of native tokens. Any change made to the Foundry state will require the keys of the State Controller of this Alias Address and the corresponding state transition that will generate a subsequent unspent Alias Output.

* A *Token Scheme*, that defines a class of tokens with *initial supply* (how many native tokens of that class are minted initially) and *maximum supply*.

* A *Foundry Output* that captures all the parameters and state related to your new class of native tokens, including the Token Scheme.

* An *Address* to which the initial supply of native tokens (the ones initially minted) will be transferred to (through a Basic Output). In a [previous tutorial]() it was explained how new addresses can be generated.

## Transfer funds to cover storage deposits

The first step is to ensure that you have enough funds in your initial address to cover storage deposits. In the testnet you can do that by generating, through the Faucet, a new Basic Output controlled by your address, as we explained in previous tutorials.

## Mint a new Alias ID

In order to mint a new Alias ID you must follow the steps described by the [previous tutorial](). Please ensure that you transfer enough funds to this Alias so that it can cover later costs related to minting native tokens.

For the purposes of this tutorial we are going to use an Alias as follows:

Alias Address: `rms1pzxgrrzzug2rhaug8d0tgcq33p2g65s4x4h8c9ym6nxkmaj3r5zeg5fxxa7`
Alias ID: `0x8c818c42e2143bf7883b5eb4601188548d5215356e7c149bd4cd6df6511d0594`
State Controller Address: `rms1qpj8775lmqcudesrfel9f949ptk30mma9twjqza5el08vjww9v927ywt70u`

During this tutorial part it is assumed that the new Alias ID minted holds enough funds (protocol-defined tokens) to cover the new Outputs that will be generated during this tutorial.

## Alias Address Preparations

### Obtain the current Alias Output

Once you have your Alias ID the first step is obtain its current unspent Alias Output through the Indexer Plugin. Such an Alias Output will participate in a transaction that will result in the creation of a new Foundry Output and some minted native tokens.

```typescript
const aliasId = "0x8c81...";
const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });

const indexerPlugin = new IndexerPluginClient(client);
const outputList = await indexerPlugin.alias(aliasId);
const consumedOutputId = outputList.items[0];

const initialAliasOutputDetails = await client.output(consumedOutputId);
const initialAliasOutput: IAliasOutput = initialAliasOutputDetails.output as IAliasOutput;
```

### Define the next Alias Output (transition)

In order to define the next Alias Output you need to trigger a transition of the UTXO machine associated to your Alias ID. The way to trigger such transition is to define a new Alias Output. The new Alias Output will increment the `stateIndex`. As you are associating to your Alias ID a new Foundry that will control your new native token class, the `foundryCounter` field must now be set to `1`.

In the code below you can observe that the amount associated to the new Alias Output is set to `0`. That's done because initially you do not know how much funds shall remain on the next Alias Output. What it is sure is that the amount of funds remaining will be less than in the initial Output, as you will be using some of those funds to cover the storage deposit of the new Outputs that will be generated during this process. (Remember that you could have involved other Outputs in this transaction to cover those storage costs).

```typescript
const nextAliasOutput: IAliasOutput = JSON.parse(JSON.stringify(initialAliasOutput));
nextAliasOutput.stateIndex++;
nextAliasOutput.aliasId = aliasId;
nextAliasOutput.amount = "0";
nextAliasOutput.foundryCounter = 1;
```

## Define your Token Scheme

You can define your Token Scheme as follows:

```typescript
const mintedAmount = 128;
const totalAmount = 512;
const tokenScheme: ISimpleTokenScheme = {
    type: SIMPLE_TOKEN_SCHEME_TYPE,
    mintedTokens: HexHelper.fromBigInt256(bigInt(mintedAmount)),
    meltedTokens: HexHelper.fromBigInt256(bigInt(0)),
    maximumSupply: HexHelper.fromBigInt256(bigInt(totalAmount)),
};
```

You can observe that we define the total amount supply, and the number of minted tokens. As this is an initial state, we are not melting any tokens.

## Define the Foundry Output

Your next step to define the Foundry Output (`IFoundryOutput`) that will control your new Token Scheme. You set the serial number of the Foundry (`1` in this case), the formerly defined token scheme and the unlock conditions. You can observe that the Foundry Output can only be unlocked by the Alias Address that controls it, that is, by the state controller of such an Alias Address.

Likewise to the Alias Output, we deliberately set the amount to `0`, as at this point in time we don't know yet the amount of protocol-defined tokens it would be needed to cover the storage deposit of this Output.

```typescript
const foundryOutput: IFoundryOutput = {
    type: FOUNDRY_OUTPUT_TYPE,
    amount: "0", // Not known yet
    serialNumber: 1,
    tokenScheme,
    unlockConditions: [
        {
            // Foundry supports only this unlock condition!
            // It will be controlled through its lifetime by our alias
            type: IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ALIAS_ADDRESS_TYPE,
                aliasId
            }
        }
    ]
};
```

### Construct the Token Class ID

In order to transact with native tokens you need to refer uniquely to each class of native tokens controlled by each foundry. You can do it through the class ID that it is obtained by calculating a hash of the alias ID, foundry serial output and the type of token scheme.

```typescript
const tokenClassId: string = TransactionHelper.constructTokenId(
    nextAliasOutput.aliasId,
    foundryOutput.serialNumber,
    foundryOutput.tokenScheme.type
);
```

For the Alias ID initially mentioned in this tutorial you would obtain the following token class ID:

`0x080e6284ef54774f66942ef48f0c98c6da6e5b4e3ed044e83bd8da43f5b01790cb0100000000`.

Actually that token class ID is just the Foundry ID that will remain immutable regardless of the state changes of your Foundry.

## Define the Basic Output that will hold the initial batch of minted tokens

As there is an initial set of minted tokens by the Foundry, you are going to need a Basic Output to hold those native tokens. The definition of a Basic Output was already explained in a [previous tutorial](). The only difference here is that this Basic Output will also hold the initial amount of minted native tokens, identified through its token class ID. As it happened with previous Outputs, you need to set the amount of protocol-defined tokens to `0` as you don't know yet the storage deposit cost.

```typescript
const nativeTokenOwnerAddress = "0x647f....";

const tokenFundsOutput: IBasicOutput = {
    type: BASIC_OUTPUT_TYPE,
    amount: "0", // Not known yet
    nativeTokens: [
        // We put all minted tokens in this output
        {
            id: tokenClassId,
            amount: HexHelper.fromBigInt256(bigInt(mintedAmount))
        }
    ],
    unlockConditions: [
        {
            type: ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: nativeTokenOwnerAddress
            }
        }
    ]
};
```

## Calculate and set the storage deposits

In this step you are going to calculate the storage deposit needed for each Output. Conversely to what it was explained in previous tutorials, here a helper function provided by `iota.js` will allow you to determine the exact amount of protocol-defined tokens needed at a minimum for each Output. Such helper function needs the protocol parameters exposed by the Node, `client.info()`.

The idea is that the the next Alias Output of the Alias Address will end up with less funds, as those funds left will be used to cover the storage deposits of the Foundry Output and the Basic Output that will hold the minted native token funds.

```typescript
const nodeInfo = await client.info();

const foundryStorageDeposit = TransactionHelper.getStorageDeposit(foundryOutput, nodeInfo.protocol.rentStructure);
const tokenFundsStorageDeposit = TransactionHelper.getStorageDeposit(tokenFundsOutput, nodeInfo.protocol.rentStructure);

const totalStorageFunds = bigInt(foundryStorageDeposit).plus(bigInt(tokenFundsStorageDeposit));

const initialFunds = bigInt(initialAliasOutput.amount);
if (initialFunds.lesser(totalStorageFunds)) {
    throw new Error("Initial funds not enough to cover for storage deposits");
}

nextAliasOutput.amount = initialFunds.minus(totalStorageFunds).toString();
foundryOutput.amount = foundryStorageDeposit.toString();
tokenFundsOutput.amount = tokenFundsStorageDeposit.toString();
```

## Submit the transaction

### Transaction Essence

In this case this is a complex transaction that involves one input and three different outputs. The input is the Alias Output we obtained through our initial query to the indexer plugin. The Outputs are threefold:

* The next Alias Output of our Alias Address (`nextAliasOutput`)
* The initial Foundry Output (`foundryOutput`)
* The Basic Output that holds the native token funds initially minted (`tokenFundsOutput`)

```typescript
const inputs: IUTXOInput[] = [];
const outputs: (IAliasOutput | IFoundryOutput | IBasicOutput)[] = [];

inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));
outputs.push(nextAliasOutput);
outputs.push(foundryOutput);
outputs.push(tokenFundsOutput);

const inputsCommitment = TransactionHelper.getInputsCommitment([initialAliasOutput]);
const transactionEssence: ITransactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: TransactionHelper.networkIdFromNetworkName(nodeInfo.protocol.networkName),
    inputs,
    inputsCommitment,
    outputs
};

const wsTsxEssence = new WriteStream();
serializeTransactionEssence(wsTsxEssence, transactionEssence);
const essenceFinal = wsTsxEssence.finalBytes();
const essenceHash = Blake2b.sum256(essenceFinal);
```

### Transaction Signature

Once you have the transaction essence you need to provide the signature that unlocks our initial Alias Output (the Input of our transaction). Remember that for unlocking an Alias Output it is needed the Private Key of the State Controller Address.

```typescript
const stateControllerPubKey = "0x55419...";
const stateControllerPrivateKey = "0xa060f....";

const unlockSignature: ISignatureUnlock = {
    type: SIGNATURE_UNLOCK_TYPE,
    signature: {
        type: ED25519_SIGNATURE_TYPE,
        publicKey: stateControllerPubKey,
        signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(stateControllerPrivateKey), essenceHash), true)
    }
};

const transactionPayload: ITransactionPayload = {
    type: TRANSACTION_PAYLOAD_TYPE,
    essence: transactionEssence,
    unlocks: [unlockCondition]
};
```

### Submit the Block

Now that you have the transaction payload you can submit the corresponding Block as we did in previous tutorials:

```typescript
const block: IBlock = {
    protocolVersion: DEFAULT_PROTOCOL_VERSION,
    parents: [],
    payload: transactionPayload,
    nonce: "0",
};

const blockId = await client.blockSubmit(block);
console.log("Block ID:", blockId);
console.log("Native Token Class ID", tokenClassId);
```

Once you know the Block ID and the Native Token Class ID you can query them through the Explorer to verify that your transaction went well and the Foundry Output has been added to the Ledger.

## Putting It All Together

You can find [here]() the source code of the program thar executes all the steps of this part of the tutorial.