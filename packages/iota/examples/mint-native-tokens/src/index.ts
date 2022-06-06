import {
    Bech32Helper,
    Ed25519Address,
    Ed25519Seed,
    ED25519_ADDRESS_TYPE,
    IndexerPluginClient,
    IUTXOInput,
    SingleNodeClient,
    UTXO_INPUT_TYPE,
    IOutputsResponse,
    TRANSACTION_ID_LENGTH,
    ITransactionEssence,
    serializeOutput,
    ISignatureUnlock,
    SIGNATURE_UNLOCK_TYPE,
    ED25519_SIGNATURE_TYPE,
    serializeTransactionEssence,
    TRANSACTION_ESSENCE_TYPE,
    ITransactionPayload,
    TRANSACTION_PAYLOAD_TYPE,
    IBlock,
    DEFAULT_PROTOCOL_VERSION,
    AddressTypes,
    ALIAS_ADDRESS_TYPE,
    NFT_ADDRESS_TYPE,
    IAliasOutput,
    ALIAS_OUTPUT_TYPE,
    STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
    ISSUER_FEATURE_TYPE,
    METADATA_FEATURE_TYPE,
    GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
    serializeTransactionPayload,
    IFoundryOutput,
    SIMPLE_TOKEN_SCHEME_TYPE,
    FOUNDRY_OUTPUT_TYPE,
    IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
    IBasicOutput,
    BASIC_OUTPUT_TYPE,
    ADDRESS_UNLOCK_CONDITION_TYPE,
    serializeAliasAddress, INodeInfo, IKeyPair, serializeBlock, MAX_BLOCK_LENGTH
} from "@iota/iota.js";
import { Converter, WriteStream, BigIntHelper, HexHelper } from "@iota/util.js";
import { Bip32Path, Blake2b, Ed25519 } from "@iota/crypto.js";
import * as readline from 'readline';
import { randomBytes } from "crypto";
import Prom from "bluebird";
import { NeonPowProvider } from "@iota/pow-neon.js";
import type { IRent, OutputTypes } from "@iota/iota.js";
import bigInt from "big-integer";
import * as console from "console";
import fetch from "node-fetch";

const API_ENDPOINT = "https://node.levi01.iota.cafe";
const EXPLORER = "https://explorer.alphanet.iotaledger.net/alphanet";
const FAUCET = "https://faucet.alphanet.iotaledger.net";
const FAUCET_ENQUEUE = "https://faucet.alphanet.iotaledger.net/api/enqueue";

// Amount of tokens to mint for now
const mintAmount = 1000;
// Maximum supply recorded in the foundry
const maxSupply = 10000;

// context to help passing values between different stages
interface IContext {
    client?: SingleNodeClient,
    walletAddressHex?: string,
    walletKeyPair?: IKeyPair,
    targetAddressHex?: string,
    walletAddressBech32?: string,
    targetAddress?: AddressTypes,
    info?: INodeInfo,
    txPayloadByName?: Map<string, ITransactionPayload>,
    outputById?: Map<string, OutputTypes>,
    outputIdByName?: Map<string, string>,
    outputByName?: Map<string, OutputTypes>,
    txList?: Array<ITransactionPayload>,
    networkId?: string
}

let ctx: IContext = {}

// In this example we set up a hot wallet, fund it with tokens from the faucet and let it mint native tokens (with alias+foundry) to our address.
async function run() {
    // init context
    ctx.txPayloadByName = new Map<string, ITransactionPayload>();
    ctx.outputById = new Map<string, OutputTypes>();
    ctx.outputIdByName = new Map<string, string>();
    ctx.outputByName = new Map<string, OutputTypes>();
    ctx.txList = [];
    // Neon localPoW is blazingly fast, but you need rust toolchain to build
    ctx.client = new SingleNodeClient(API_ENDPOINT);
    // fetch basic info from node
    ctx.info = await ctx.client.info();
    ctx.networkId = networkIdFromNetworkName(ctx.info.protocol.networkName);

    // ask for the target address
    const targetAddressBech32 = await askQuestion("Target address where to mint the tokens? (Bech32 encoded): ");

    // parse bech32 encoded address into iota address
    ctx.targetAddress = addressFromBech32(targetAddressBech32, ctx.info.protocol.bech32HRP);

    // Now it's time to set up an account for this demo. We generate a random seed and set up a hot wallet.
    // We also top up the address by asking funds from the faucet.
    [ctx.walletAddressHex, ctx.walletAddressBech32, ctx.walletKeyPair] = await setUpHotWallet(ctx.info.protocol.bech32HRP);

    // Fetch outputId with funds to be used as input from the Indexer API
    const indexerPluginClient = new IndexerPluginClient(ctx.client);
    // Indexer returns outputIds of matching outputs. We are only interested in the first one coming from the faucet.
    const outputId = await fetchAndWaitForBasicOutput(ctx.walletAddressBech32, indexerPluginClient);

    console.log("OutputId: ", outputId);

    // Fetch the output itself from the core API
    const resp = await ctx.client.output(outputId);
    // We start from one Basic Output that we own, Our journey starts with the genesis.
    const genesisOutput = resp.output;

    console.log("Genesis output: ", genesisOutput);

    // Prepare a transaction that mints an alias
    let txPayload1 = mintAliasTx(genesisOutput, outputId, ctx.walletAddressHex, ctx.walletKeyPair, ctx.info);
    ctx.txList.push(txPayload1);

    // Ready with the alias minting tx, now we have to prepare the second tx that:
    //   - creates the foundry
    //   - mints tokens to target address
    let txPayload2 = createFoundryMintTokenTx(getOutput("tx1Alias"), getOutputId("tx1Alias"), ctx.walletAddressHex, ctx.walletKeyPair, ctx.info, ctx.targetAddress);
    ctx.txList.push(txPayload2);

    // Tx3 transfers the control of alias to the user address
    // Tx 3 is going to give the governor role of tha alias to targetaddress
    let txPayload3 = transferAliasTx(getOutput("tx2Alias"), getOutputId("tx2Alias"), ctx.walletAddressHex, ctx.walletKeyPair, ctx.info, ctx.targetAddress);
    ctx.txList.push(txPayload3);

    // Finally, time to prepare the three blocks, and chain them together via `parents`
    let blocks: IBlock[] = await chainTrasactionsViaBlocks(ctx.client, ctx.txList, ctx.info.protocol.minPoWScore);

    // send the blocks to the network
    // We calculated pow by hand, so we don't define a localPow provider for the client so it doesn't redo the pow again.
    submit(blocks, ctx.client);
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));


// Transaction creating functions

// Create an alias
// inputs: a basic output received from faucet
// outputs: an alias output
function mintAliasTx(consumedOutput: OutputTypes, consumedOutputId: string, walletAddressHex: string, walletKeyPair: IKeyPair, info: INodeInfo): ITransactionPayload {
    // Prepare inputs to the tx
    const input: IUTXOInput = {
        type: UTXO_INPUT_TYPE,
        transactionId: consumedOutputId.slice(0, 2 + 2 * TRANSACTION_ID_LENGTH), // +2 because it has 0x prefix
        transactionOutputIndex: parseInt(consumedOutputId.slice(2 + 2 * TRANSACTION_ID_LENGTH))
    }

    console.log("Input: ", input)

    // First we need to mint an alias, then we can mint the tokens, lastly we are going to transfer the alias

    // 1st transaction: consume basic output -> create alias

    // Create the outputs, that is an Alias output
    let aliasOutput: IAliasOutput = {
        type: ALIAS_OUTPUT_TYPE,
        amount: consumedOutput.amount,
        // when minting, this has to be set to zero. It will be set in nodes as the hash of the outputId when the tx confirms.
        // Note, that from the first spend of the Alias you have to use the actual hash of outputId
        aliasId: "0x0000000000000000000000000000000000000000000000000000000000000000",
        stateIndex: 0,
        foundryCounter: 0,
        immutableFeatures: [
            {
                type: ISSUER_FEATURE_TYPE, // Issuer feature
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: walletAddressHex,
                },
            },
            {
                type: METADATA_FEATURE_TYPE, // Metadata Feature
                data: Converter.utf8ToHex("This is where the immutable metadata goes", true)
            }
        ],
        unlockConditions: [
            {
                type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: walletAddressHex, // we keep it in the hot wallet for now
                },
            },
            {
                type: GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: walletAddressHex,
                },
            }
        ]
    };

    // To know the byte cost, we need to serialize the output
    const requiredStorageDeposit = getStorageDeposit(aliasOutput, info.protocol.rentStructure);
    console.log("Required Storage Deposit of the Alias output: ", requiredStorageDeposit);

    // Calculating inputs commitment
    const inputsCommitment = getInputsCommitment([consumedOutput]);

    // Creating Transaction Essence
    const txEssence: ITransactionEssence = {
        type: TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [input],
        outputs: [aliasOutput],
        inputsCommitment: inputsCommitment,
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHash = getTxEssenceHash(txEssence)

    // We unlock only one output, so there will be one unlock with signature
    let unlock: ISignatureUnlock = {
        type: SIGNATURE_UNLOCK_TYPE,
        signature: {
            type: ED25519_SIGNATURE_TYPE,
            publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
            signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHash), true)
        }
    };

    // Constructing Transaction Payload
    const txPayload: ITransactionPayload = {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence: txEssence,
        unlocks: [unlock]
    };

    // Record some info for ourselves
    let aliasOutputId = Converter.bytesToHex(getTransactionHash(txPayload), true) + "0000";
    ctx.outputById?.set(aliasOutputId, aliasOutput);
    ctx.outputIdByName?.set("tx1Alias", aliasOutputId);
    ctx.outputByName?.set("tx1Alias", aliasOutput);
    ctx.txPayloadByName?.set("tx1", txPayload);

    return txPayload;
}

// Create a foundry with the help of an alias, mint native tokens and send them to user via a basic output.
// inputs: alias from prev tx
// output: alias, foundry, basic output
function createFoundryMintTokenTx(consumedOutput: OutputTypes, consumedOutputId: string, walletAddressHex: string, walletKeyPair: IKeyPair, info: INodeInfo, targetAddress: AddressTypes): ITransactionPayload {
    const aliasInput = inputFromOutputId(consumedOutputId);

    // defining the next alias output
    let prevAlias = getOutput("tx1Alias");
    let nextAliasOutput = deepCopy(prevAlias) as IAliasOutput;

    // aliasId is the hash of the creating outputId
    nextAliasOutput.aliasId = aliasIdFromOutputId(consumedOutputId);

    nextAliasOutput.stateIndex++; // has to be incremented for every state update tx
    nextAliasOutput.foundryCounter++; // has to be incremented every time we create a foundry

    // defining the foundry
    const foundryOutput: IFoundryOutput = {
        type: FOUNDRY_OUTPUT_TYPE,
        amount: "0", // we don't know yet how much we needto put here due to storage costs
        serialNumber: 1, // should correlate to current foundryCounter in alias above
        tokenScheme: {
            type: SIMPLE_TOKEN_SCHEME_TYPE,
            mintedTokens: HexHelper.fromBigInt256(bigInt(mintAmount)),
            meltedTokens: HexHelper.fromBigInt256(bigInt(0)),
            maximumSupply: HexHelper.fromBigInt256(bigInt(maxSupply)),
        },
        unlockConditions: [
            {
                // Foundry supports only this unlock condition!
                // It will be controlled through its lifetime by out alias
                type: IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ALIAS_ADDRESS_TYPE,
                    aliasId: nextAliasOutput.aliasId
                }
            }
        ],
        immutableFeatures: [
            {
                type: METADATA_FEATURE_TYPE, // Metadata Feature
                data: Converter.utf8ToHex("This is where the immutable metadata goes", true)
            }
        ]
    }

    // Calculate tokendId
    const tokenId = constructTokenId(nextAliasOutput.aliasId, foundryOutput.serialNumber, foundryOutput.tokenScheme.type);

    const remainderOutput: IBasicOutput = {
        type: BASIC_OUTPUT_TYPE,
        amount: "0", // we don't know yet
        nativeTokens: [
            // We put all minted tokens in this output
            {
                // tokenId is (serialized) controlling alias address + serialNumber + tokenSchemeType
                id: tokenId,
                amount: HexHelper.fromBigInt256(bigInt(mintAmount))
            }
        ],
        unlockConditions: [
            // Send it to the target address
            {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                address: targetAddress,
            }
        ]
    }

    // Now we can calculate the storage deposits
    const aliasStorageDeposit = getStorageDeposit(nextAliasOutput, info.protocol.rentStructure);
    const foundryStorageDeposit = getStorageDeposit(foundryOutput, info.protocol.rentStructure);
    const basicStorageDeposit = getStorageDeposit(remainderOutput, info.protocol.rentStructure);

    if (parseInt(prevAlias.amount) < aliasStorageDeposit + foundryStorageDeposit + basicStorageDeposit) {
        throw new Error("Initial funds not enough to cover for storage deposits");
    }

    // Update amounts in outputs. Only leave the bare minimum in the alias and the foundry, put the rest into the basic output
    nextAliasOutput.amount = aliasStorageDeposit.toString();
    foundryOutput.amount = foundryStorageDeposit.toString();
    remainderOutput.amount = (parseInt(prevAlias.amount) - (aliasStorageDeposit + foundryStorageDeposit)).toString();

    // Prepare inputs commitment
    const inputsCommitmentTx2 = getInputsCommitment([prevAlias]);

    // Construct tx essence
    const tx2Essence: ITransactionEssence = {
        type: TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [aliasInput],
        outputs: [nextAliasOutput, foundryOutput, remainderOutput],
        inputsCommitment: inputsCommitmentTx2,
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHashTx2 = getTxEssenceHash(tx2Essence)

    // We unlock only one output (the alias), so there will be one unlock with signature
    let unlockTx2: ISignatureUnlock = {
        type: SIGNATURE_UNLOCK_TYPE,
        signature: {
            type: ED25519_SIGNATURE_TYPE,
            publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
            signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHashTx2), true)
        }
    };

    // Constructing Transaction Payload
    const txPayload2: ITransactionPayload = {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence: tx2Essence,
        unlocks: [unlockTx2]
    };

    // Record some info for ourselves
    let aliasOutputId = Converter.bytesToHex(getTransactionHash(txPayload2), true) + "0000";
    ctx.outputById?.set(aliasOutputId, nextAliasOutput);
    ctx.outputIdByName?.set("tx2Alias", aliasOutputId);
    ctx.outputByName?.set("tx2Alias", nextAliasOutput);

    return txPayload2;

}

// Transfer ownership rights of the alias to user
// inputs: alias from prev tx
// outputs: alias owned by user (noth state and governance controller)
function transferAliasTx(consumedOutput: OutputTypes, consumedOutputId: string, walletAddressHex: string, walletKeyPair: IKeyPair, info: INodeInfo, targetAddress: AddressTypes): ITransactionPayload {
    const prevAliasInput = inputFromOutputId(consumedOutputId);

    let prevAlias = getOutput("tx2Alias");
    let nextAlias = deepCopy(prevAlias) as IAliasOutput;
    // We are performing a governance transition, so no need to increment stateIndex
    nextAlias.unlockConditions = [
        {
            type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: targetAddress,
        },
        {
            type: GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: targetAddress,
        }
    ]

    // Prepare inputs commitment
    const inputsCommitmentTx3 = getInputsCommitment([prevAlias]);

    // Construct tx essence
    const tx3Essence: ITransactionEssence = {
        type: TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [prevAliasInput],
        outputs: [nextAlias],
        inputsCommitment: inputsCommitmentTx3,
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHashTx3 = getTxEssenceHash(tx3Essence)

    // We unlock only one output (the alias), so there will be one unlock with signature
    let unlockTx3: ISignatureUnlock = {
        type: SIGNATURE_UNLOCK_TYPE,
        signature: {
            type: ED25519_SIGNATURE_TYPE,
            publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
            signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHashTx3), true)
        }
    };

    // Constructing Transaction Payload
    const txPayload3: ITransactionPayload = {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence: tx3Essence,
        unlocks: [unlockTx3]
    };

    return txPayload3;
}

// Helper methods for the sake of this example

// Generate a hot wallet from a random key, ask the faucet to top it up
async function setUpHotWallet(hrp: string) {
    // Generate a random seed
    const walletEd25519Seed = new Ed25519Seed(randomBytes(32));

    // For Shimmer we use Coin Type 4219
    const path = new Bip32Path("m/44'/4219'/0'/0'/0'");

    // Construct wallet from seed
    const walletSeed = walletEd25519Seed.generateSeedFromPath(path);
    let walletKeyPair = walletSeed.keyPair();

    console.log("Your seed");
    console.log("Seed", Converter.bytesToHex(walletSeed.toBytes()));

    // Get the address for the path seed which is actually the Blake2b.sum256 of the public key
    // display it in both Ed25519 and Bech 32 format
    const walletEd25519Address = new Ed25519Address(walletKeyPair.publicKey);
    const walletAddress = walletEd25519Address.toAddress();
    const walletAddressHex = Converter.bytesToHex(walletAddress, true);

    let walletAddressBech32 = Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, walletAddress, hrp);
    console.log("Address Ed25519", walletAddressHex);
    console.log("Address Bech32", walletAddressBech32);

    // Ask the faucet for funds
    const requestObj = JSON.stringify({address: walletAddressBech32});
    let errorMessage, data;
    try {
        const response = await fetch(FAUCET_ENQUEUE, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: requestObj,
        });
        if (response.status === 202) {
          errorMessage = "OK";
        } else if (response.status === 429) {
          errorMessage = "Too many requests. Please, try again later.";
        } else {
          data = await response.json();
          errorMessage = data.error.message;
        }
      } catch (error) {
        errorMessage = error;
      }

    if (errorMessage != "OK"){
        throw new Error(`Didn't manage to get funds from faucet: ${errorMessage}`);
    }
    return [walletAddressHex, walletAddressBech32, walletKeyPair] as const;
}

// Use the indexer API to fetch the output sent to the wallet address by the faucet
async function fetchAndWaitForBasicOutput(addy: string, client: IndexerPluginClient): Promise<string> {
    let outputsResponse: IOutputsResponse = { ledgerIndex: 0, cursor: "", pageSize: "", items: [] };
    let maxTries = 10;
    let tries = 0;
    while (outputsResponse.items.length == 0) {
        if (tries > maxTries) { break }
        tries++;
        console.log("\tTry #", tries, ": fetching basic output for address ", addy)
        outputsResponse = await client.outputs({
            addressBech32: addy,
            hasStorageReturnCondition: false,
            hasExpirationCondition: false,
            hasTimelockCondition: false,
            hasNativeTokens: false,
        });
        if (outputsResponse.items.length == 0) {
            console.log("\tDidn't find any, retrying soon...")
            await new Promise(f => setTimeout(f, 1000));
        }
    }
    if (tries > maxTries) {
        throw new Error("Didn't find any outputs for address");
    }
    return outputsResponse.items[0]
};

// Chain together transaction payloads via blocks.
// To reference the previous block, we need to calculate its blockId.
// To calculate blockId, we need to set the parents and perform pow to get the nonce.
//
// The first block will have parents fetched from the tangle. The subsequent blocks refernce always the previous block as parent.
async function chainTrasactionsViaBlocks(client: SingleNodeClient, txs: Array<ITransactionPayload>, minPoWScore: number): Promise<Array<IBlock>> {
    if (txs.length === 0) {
        throw new Error("can't create blocks from emppty trasnaction payload list");
    }

    // we will chain the blocks together via their blockIds as parents
    let blockIds: Array<string> = [];
    let blocks: Array<IBlock> = [];

    // parents for the first block
    let parents = (await client.tips()).tips;

    for (let i = 0; i < txs.length; i++) {
        let block: IBlock = {
            protocolVersion: DEFAULT_PROTOCOL_VERSION,
            parents: [],
            payload: txs[i],
            nonce: "0" // will be filled when calculating pow
        };

        if (i === 0) {
            // the first block  will have the fetched parents
            block.parents = parents;
        } else {
            // subsequent blocks reference the previous block
            block.parents = [blockIds[i-1]];
        }

        // Calculate Pow
        console.log(`Calculating PoW for block ${i}...`)
        const blockNonce = await caluclateNonce(block, minPoWScore);

        // Update nonce field of the block
        block.nonce = blockNonce;

        // Calculate blockId
        const blockId = calculateBlockId(block);

        // Add it to list of blockIds
        blockIds.push(blockId);

        // Add it to list of block
        blocks.push(block);
      }

    return blocks;
}

// Send an array of block in order to the node.
async function submit(blocks: Array<IBlock>, client: SingleNodeClient) {
    for (let i = 0; i < blocks.length; i++) {
        console.log(`Submitting block ${i}...`);
        const blockId = await client.blockSubmit(blocks[i]);
        console.log(`Submitted block ${i} blockId is ${blockId}, check out the transaction at ${EXPLORER}/block/${blockId}`);
    }
}

// Gets an output from the local context
function getOutput(name: string): OutputTypes {
    if (ctx.outputByName === undefined) {
        throw new Error("undefined output map");
    }
    let output = ctx.outputByName.get(name);
    if (output === undefined) {
        throw new Error("output " + name + " doesn't exists in context");
    }
    return output;
}

// Gets an outtputId from local context
function getOutputId(name: string): string {
    if (ctx.outputIdByName === undefined) {
        throw new Error("undefined outputId map");
    }
    let outputId = ctx.outputIdByName.get(name);
    if (outputId === undefined) {
        throw new Error("outputId " + name + " doesn't exists in context");
    }
    return outputId;
}

// Gets the networkId from local context
function getNetworkId(): string {
    if (ctx.networkId === undefined) {
        throw new Error("undefined networkId map");
    }
    return ctx.networkId;
}

// Helper methods for working with library types

// Calculate blockId from a block.
// Hint: blockId is the Blake1b-256 hash of the serialized block bytes
function calculateBlockId(block: IBlock): string {
    console.log(block);
    const writeStream = new WriteStream();
    serializeBlock(writeStream, block);
    const blockBytes = writeStream.finalBytes();

    return Converter.bytesToHex(Blake2b.sum256(blockBytes), true);
}

// Performs PoW on a block to calculate nonce. Uses NeonPowProvider.
async function caluclateNonce(block: IBlock, minPoWScore: number): Promise<string> {
    const writeStream = new WriteStream();
    serializeBlock(writeStream, block);
    const blockBytes = writeStream.finalBytes();

    if (blockBytes.length > MAX_BLOCK_LENGTH) {
        throw new Error(
            `The block length is ${blockBytes.length}, which exceeds the maximum size of ${MAX_BLOCK_LENGTH}`
        );
    }

    const powProvider = new NeonPowProvider();
    const nonce = await powProvider.pow(blockBytes, minPoWScore);
    return nonce.toString();
}

// Returns an input object from an outputId.
function inputFromOutputId(outputId: string): IUTXOInput {
    let input: IUTXOInput = {
        type: UTXO_INPUT_TYPE,
        // outputId = txPayloadHash (32 bytes) + outputIndex (2 bytes)
        transactionId: outputId.slice(0, 2 + 2 * TRANSACTION_ID_LENGTH), // +2 because it has 0x prefix, // name the output of the previous tx
        transactionOutputIndex: parseInt(outputId.slice(2 + 2 * TRANSACTION_ID_LENGTH)) // we only had one output
    }
    return input
}

// Returns aliasId from an outputId.
// Hint: aliasId is the Blake2b-256 hash of the outputId that created the alias.
function aliasIdFromOutputId(outputId: string): string {
    // Convert string to bytes, hash it once, convert back to string (with prefix)
    return Converter.bytesToHex(Blake2b.sum256(Converter.hexToBytes(outputId)), true)
}

// Returns the inputCommitment from the output objects that refer to inputs.
function getInputsCommitment(inputs: [OutputTypes]): string {
    // InputsCommitment calculation
    const inputsCommitmentHasher = new Blake2b(Blake2b.SIZE_256); // blake2b hasher
    // Step 2: Loop over list of inputs (the actual output objects they reference).
    inputs.forEach(value => {
        // Sub-step 2a: Calculate hash of serialized output
        const outputHasher = new Blake2b(Blake2b.SIZE_256);
        const w = new WriteStream();
        serializeOutput(w, value);
        const consumedOutputBytes = w.finalBytes();
        outputHasher.update(consumedOutputBytes);
        const outputHash = outputHasher.final();
        // Sub-step 2b: add each output hash to buffer
        inputsCommitmentHasher.update(outputHash);
    })
    return Converter.bytesToHex(inputsCommitmentHasher.final(), true);
};

// Calculates the networkId value from the network name.
function networkIdFromNetworkName(networkName: string): string {
    const networkIdBytes = Blake2b.sum256(Converter.utf8ToBytes(networkName));
    return BigIntHelper.read8(networkIdBytes, 0).toString();
}

// Calculates the Transaction Essence Hash.
function getTxEssenceHash(essence: ITransactionEssence): Uint8Array {
    const binaryEssence = new WriteStream();
    serializeTransactionEssence(binaryEssence, essence);
    const essenceFinal = binaryEssence.finalBytes();
    return Blake2b.sum256(essenceFinal);
}

// Calculates the transaction hash.
function getTransactionHash(tx: ITransactionPayload): Uint8Array {
    const binaryTx = new WriteStream();
    serializeTransactionPayload(binaryTx, tx);
    const txBytes = binaryTx.finalBytes();
    return Blake2b.sum256(txBytes);
}

// Constructs a tokenId from the:
// - aliasId of the alias that controls the foundry
// - serial number of the foundry
// - tokenSchemeType of the foundry
function constructTokenId(aliasId: string, serialNumber: number, tokenSchemeType: number): string {
    // Get serialized alias address bytes
    const wA = new WriteStream();
    serializeAliasAddress(wA, {
        type: ALIAS_ADDRESS_TYPE,
        aliasId: aliasId
    });
    const aliasAddressBytes = wA.finalBytes();

    const wS = new WriteStream();
    wS.writeUInt32("", serialNumber);
    const serialNumberBytes = wS.finalBytes();

    const wT = new WriteStream();
    wT.writeUInt8("", tokenSchemeType);
    const tokenSchemeTypeBytes = wT.finalBytes();

    // Append them and convert to hex string representation
    return Converter.bytesToHex(new Uint8Array([...aliasAddressBytes, ...serialNumberBytes, ...tokenSchemeTypeBytes]), true);
}

// Calculates the required storage deposit of an output.
function getStorageDeposit(output: OutputTypes, rentStructure: IRent): number {
    const w = new WriteStream();
    serializeOutput(w, output);
    const outputBytes = w.finalBytes();

    // vByteFactorKey * outputIdLength + vByteFactorData * (blockIdLength + confMSIndexLength + confUnixTSLength) src: https://github.com/muXxer/tips/blob/master/tips/TIP-0019/tip-0019.md
    const offset = rentStructure.vByteFactorKey * 34 + rentStructure.vByteFactorData * (32 + 4 + 4);

    // Calculate Virtual Byte Size (output only has data fields)
    const vByteSize = rentStructure.vByteFactorData * outputBytes.length + offset;

    // Calculate required storage deposit
    return rentStructure.vByteCost * vByteSize
}

// Returns an iota.js address type from a bech32 encoded address string.
function addressFromBech32(bech32Address: string, hrp: string): AddressTypes {
    const parsed = Bech32Helper.fromBech32(bech32Address, hrp);
    if (!parsed) {
        throw new Error("Can't decode address")
    }

    switch (parsed.addressType) {
        case ED25519_ADDRESS_TYPE: {
            return {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: Converter.bytesToHex(parsed.addressBytes, true)
            };
        }
        case ALIAS_ADDRESS_TYPE: {
            return {
                type: ALIAS_ADDRESS_TYPE,
                aliasId: Converter.bytesToHex(parsed.addressBytes, true)
            };
        }
        case NFT_ADDRESS_TYPE: {
            return {
                type: NFT_ADDRESS_TYPE,
                nftId: Converter.bytesToHex(parsed.addressBytes, true)
            };
        }
        default: {
            throw new Error("Unexpected address type");
        }
    }
}

// Other utils

// Deeply copies an object.
function deepCopy<T>(instance: T): T {
    if (instance == null) {
        return instance;
    }

    // handle Dates
    if (instance instanceof Date) {
        return new Date(instance.getTime()) as any;
    }

    // handle Array types
    if (instance instanceof Array) {
        var cloneArr = [] as any[];
        (instance as any[]).forEach((value) => { cloneArr.push(value) });
        // for nested objects
        return cloneArr.map((value: any) => deepCopy<any>(value)) as any;
    }
    // handle objects
    if (instance instanceof Object) {
        var copyInstance = {
            ...(instance as { [key: string]: any }
            )
        } as { [key: string]: any };
        for (var attr in instance) {
            if ((instance as Object).hasOwnProperty(attr))
                copyInstance[attr] = deepCopy<any>(instance[attr]);
        }
        return copyInstance as T;
    }
    // handling primitive data types
    return instance;
}


// Just some helpers to ask for user input in terminal
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const questionAsync = Prom.promisify<string, string>((question: string, callback: Function) => {
    rl.question(question,
        callback.bind(null, null) // Ugh, signature mismatch.
    );
});

async function askQuestion(question: string): Promise<string> {
    const result: string = await questionAsync(question);

    return result;
}

