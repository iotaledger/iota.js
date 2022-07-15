import * as lib from "@iota/iota.js";
import { Converter, WriteStream, HexHelper } from "@iota/util.js";
import { Bip32Path, Ed25519 } from "@iota/crypto.js";
import * as readline from 'readline';
import { randomBytes } from "crypto";
import Prom from "bluebird";
import { NeonPowProvider } from "@iota/pow-neon.js";
import bigInt from "big-integer";
import * as console from "console";
import fetch from "node-fetch";

const EXPLORER = "https://explorer.alphanet.iotaledger.net/alphanet";
const API_ENDPOINT = "https://api.alphanet.iotaledger.net/";
const FAUCET = "https://faucet.alphanet.iotaledger.net/api/enqueue" 

// If running the node locally
// const API_ENDPOINT = "http://localhost:14265/";
// const FAUCET = "http://localhost:8091/api/enqueue"; 

// Amount of tokens to mint for now
const mintAmount = 1000;
// Maximum supply recorded in the foundry
const maxSupply = 10000;

// context to help passing values between different stages
interface IContext {
    client?: lib.SingleNodeClient,
    walletAddressHex?: string,
    walletKeyPair?: lib.IKeyPair,
    targetAddressHex?: string,
    walletAddressBech32?: string,
    targetAddress?: lib.AddressTypes,
    info?: lib.INodeInfo,
    txPayloadByName?: Map<string, lib.ITransactionPayload>,
    outputById?: Map<string, lib.OutputTypes>,
    outputIdByName?: Map<string, string>,
    outputByName?: Map<string, lib.OutputTypes>,
    txList?: Array<lib.ITransactionPayload>,
    networkId?: string
}

let ctx: IContext = {};

// In this example we set up a hot wallet, fund it with tokens from the faucet and let it mint native tokens (with alias+foundry) to our address.
async function run() {
    // init context
    ctx.txPayloadByName = new Map<string, lib.ITransactionPayload>();
    ctx.outputById = new Map<string, lib.OutputTypes>();
    ctx.outputIdByName = new Map<string, string>();
    ctx.outputByName = new Map<string, lib.OutputTypes>();
    ctx.txList = [];
    // Neon localPoW is blazingly fast, but you need rust toolchain to build
    ctx.client = new lib.SingleNodeClient(API_ENDPOINT);
    // fetch basic info from node
    ctx.info = await ctx.client.info();
    ctx.networkId = lib.TransactionHelper.networkIdFromNetworkName(ctx.info.protocol.networkName);
    
    // ask for the target address
    const targetAddressBech32 = await askQuestion("Target address (Bech32 encoded) where to mint the tokens or leave empty and we will generate an address for you?: ");

    // parse bech32 encoded address into iota address
    try {
        const tmp = lib.Bech32Helper.fromBech32(targetAddressBech32, ctx.info.protocol.bech32HRP);
        if (!tmp){
            throw new Error("Can't decode target address");
        }
         // parse bech32 encoded address into iota address
        ctx.targetAddress = lib.Bech32Helper.addressFromBech32(targetAddressBech32, ctx.info.protocol.bech32HRP);
    } catch (error) {
        
        // If target address is not provided we are goping to set up an account for this demo.
       console.log("Target Address:");
       const [addressHex, addressBech32, addressKeyPair] = await setUpHotWallet(ctx.info.protocol.bech32HRP);
       ctx.targetAddress = lib.Bech32Helper.addressFromBech32(addressBech32, ctx.info.protocol.bech32HRP);
    }

    // Now it's time to set up an account for this demo. We generate a random seed and set up a hot wallet.
    // We also top up the address by asking funds from the faucet.
    console.log("Sender Address:");
    [ctx.walletAddressHex, ctx.walletAddressBech32, ctx.walletKeyPair] = await setUpHotWallet(ctx.info.protocol.bech32HRP, true);

    // Fetch outputId with funds to be used as input from the Indexer API
    const indexerPluginClient = new lib.IndexerPluginClient(ctx.client);
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
    let txPayload2 = createFoundryMintTokenTx(
        getOutput("tx1Alias"),
        getOutputId("tx1Alias"),
        ctx.walletKeyPair,
        ctx.info,
        ctx.targetAddress
    );
    ctx.txList.push(txPayload2);

    // Tx3 transfers the control of alias to the user address
    // Tx 3 is going to give the governor role of tha alias to targetaddress
    let txPayload3 = transferAliasTx(
        getOutput("tx2Alias"),
        getOutputId("tx2Alias"),
        ctx.walletKeyPair,
        ctx.targetAddress
    );
    ctx.txList.push(txPayload3);

    // Finally, time to prepare the three blocks, and chain them together via `parents`
    let blocks: lib.IBlock[] = await chainTrasactionsViaBlocks(ctx.client, ctx.txList, ctx.info.protocol.minPoWScore);

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
function mintAliasTx(consumedOutput: lib.OutputTypes, consumedOutputId: string, walletAddressHex: string, walletKeyPair: lib.IKeyPair, info: lib.INodeInfo): lib.ITransactionPayload {
    // Prepare inputs to the tx
    const input: lib.IUTXOInput = lib.TransactionHelper.inputFromOutputId(consumedOutputId);
    console.log("Input:", input);

    // First we need to mint an alias, then we can mint the tokens, lastly we are going to transfer the alias

    // 1st transaction: consume basic output -> create alias

    // Create the outputs, that is an Alias output
    let aliasOutput: lib.IAliasOutput = {
        type: lib.ALIAS_OUTPUT_TYPE,
        amount: consumedOutput.amount,
        // when minting, this has to be set to zero. It will be set in nodes as the hash of the outputId when the tx confirms.
        // Note, that from the first spend of the Alias you have to use the actual hash of outputId
        aliasId: "0x0000000000000000000000000000000000000000000000000000000000000000",
        stateIndex: 0,
        foundryCounter: 0,
        immutableFeatures: [
            {
                type: lib.ISSUER_FEATURE_TYPE, // Issuer feature
                address: {
                    type: lib.ED25519_ADDRESS_TYPE,
                    pubKeyHash: walletAddressHex,
                },
            },
            {
                type: lib.METADATA_FEATURE_TYPE, // Metadata Feature
                data: Converter.utf8ToHex("This is where the immutable metadata goes", true)
            }
        ],
        unlockConditions: [
            {
                type: lib.STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: lib.ED25519_ADDRESS_TYPE,
                    pubKeyHash: walletAddressHex, // we keep it in the hot wallet for now
                },
            },
            {
                type: lib.GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: lib.ED25519_ADDRESS_TYPE,
                    pubKeyHash: walletAddressHex,
                },
            }
        ]
    };

    // To know the byte cost, we need to serialize the output
    const requiredStorageDeposit = lib.TransactionHelper.getStorageDeposit(aliasOutput, info.protocol.rentStructure);
    console.log("Required Storage Deposit of the Alias output: ", requiredStorageDeposit);

    // Calculating inputs commitment
    const inputsCommitment = lib.TransactionHelper.getInputsCommitment([consumedOutput]);

    // Creating Transaction Essence
    const txEssence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [input],
        outputs: [aliasOutput],
        inputsCommitment: inputsCommitment,
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHash = lib.TransactionHelper.getTransactionEssenceHash(txEssence)

    // We unlock only one output, so there will be one unlock with signature
    let unlock: lib.ISignatureUnlock = {
        type: lib.SIGNATURE_UNLOCK_TYPE,
        signature: {
            type: lib.ED25519_SIGNATURE_TYPE,
            publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
            signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHash), true)
        }
    };

    // Constructing Transaction Payload
    const txPayload: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: txEssence,
        unlocks: [unlock]
    };

    // Record some info for ourselves
    let aliasOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0000";
    ctx.outputById?.set(aliasOutputId, aliasOutput);
    ctx.outputIdByName?.set("tx1Alias", aliasOutputId);
    ctx.outputByName?.set("tx1Alias", aliasOutput);
    ctx.txPayloadByName?.set("tx1", txPayload);

    return txPayload;
}

// Create a foundry with the help of an alias, mint native tokens and send them to user via a basic output.
// inputs: alias from prev tx
// output: alias, foundry, basic output
function createFoundryMintTokenTx(consumedOutput: lib.OutputTypes, consumedOutputId: string, walletKeyPair: lib.IKeyPair, info: lib.INodeInfo, targetAddress: lib.AddressTypes): lib.ITransactionPayload {
    const aliasInput = lib.TransactionHelper.inputFromOutputId(consumedOutputId);

    // defining the next alias output
    let nextAliasOutput = deepCopy(consumedOutput) as lib.IAliasOutput;

    // aliasId is the hash of the creating outputId
    nextAliasOutput.aliasId = lib.TransactionHelper.resolveIdFromOutputId(consumedOutputId);

    nextAliasOutput.stateIndex++; // has to be incremented for every state update tx
    nextAliasOutput.foundryCounter++; // has to be incremented every time we create a foundry

    // defining the foundry
    const foundryOutput: lib.IFoundryOutput = {
        type: lib.FOUNDRY_OUTPUT_TYPE,
        amount: "0", // we don't know yet how much we needto put here due to storage costs
        serialNumber: 1, // should correlate to current foundryCounter in alias above
        tokenScheme: {
            type: lib.SIMPLE_TOKEN_SCHEME_TYPE,
            mintedTokens: HexHelper.fromBigInt256(bigInt(mintAmount)),
            meltedTokens: HexHelper.fromBigInt256(bigInt(0)),
            maximumSupply: HexHelper.fromBigInt256(bigInt(maxSupply)),
        },
        unlockConditions: [
            {
                // Foundry supports only this unlock condition!
                // It will be controlled through its lifetime by out alias
                type: lib.IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: lib.ALIAS_ADDRESS_TYPE,
                    aliasId: nextAliasOutput.aliasId
                }
            }
        ],
        immutableFeatures: [
            {
                type: lib.METADATA_FEATURE_TYPE, // Metadata Feature
                data: Converter.utf8ToHex("This is where the immutable metadata goes", true)
            }
        ]
    }

    // Calculate tokendId
    const tokenId = lib.TransactionHelper.constructTokenId(nextAliasOutput.aliasId, foundryOutput.serialNumber, foundryOutput.tokenScheme.type);

    const remainderOutput: lib.IBasicOutput = {
        type: lib.BASIC_OUTPUT_TYPE,
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
                type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
                address: targetAddress,
            }
        ]
    }

    // Now we can calculate the storage deposits
    const aliasStorageDeposit = lib.TransactionHelper.getStorageDeposit(nextAliasOutput, info.protocol.rentStructure);
    const foundryStorageDeposit = lib.TransactionHelper.getStorageDeposit(foundryOutput, info.protocol.rentStructure);
    const basicStorageDeposit = lib.TransactionHelper.getStorageDeposit(remainderOutput, info.protocol.rentStructure);

    if (parseInt(consumedOutput.amount) < aliasStorageDeposit + foundryStorageDeposit + basicStorageDeposit) {
        throw new Error("Initial funds not enough to cover for storage deposits");
    }

    // Update amounts in outputs. Only leave the bare minimum in the alias and the foundry, put the rest into the basic output
    nextAliasOutput.amount = aliasStorageDeposit.toString();
    foundryOutput.amount = foundryStorageDeposit.toString();
    remainderOutput.amount = (parseInt(consumedOutput.amount) - (aliasStorageDeposit + foundryStorageDeposit)).toString();

    // Prepare inputs commitment
    const inputsCommitmentTx2 = lib.TransactionHelper.getInputsCommitment([consumedOutput]);

    // Construct tx essence
    const tx2Essence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [aliasInput],
        outputs: [nextAliasOutput, foundryOutput, remainderOutput],
        inputsCommitment: inputsCommitmentTx2
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHashTx2 = lib.TransactionHelper.getTransactionEssenceHash(tx2Essence)

    // We unlock only one output (the alias), so there will be one unlock with signature
    let unlockTx2: lib.ISignatureUnlock = {
        type: lib.SIGNATURE_UNLOCK_TYPE,
        signature: {
            type: lib.ED25519_SIGNATURE_TYPE,
            publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
            signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHashTx2), true)
        }
    };

    // Constructing Transaction Payload
    const txPayload2: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: tx2Essence,
        unlocks: [unlockTx2]
    };

    // Record some info for ourselves
    let aliasOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload2), true) + "0000";
    ctx.outputById?.set(aliasOutputId, nextAliasOutput);
    ctx.outputIdByName?.set("tx2Alias", aliasOutputId);
    ctx.outputByName?.set("tx2Alias", nextAliasOutput);

    return txPayload2;

}

// Transfer ownership rights of the alias to user
// inputs: alias from prev tx
// outputs: alias owned by user (noth state and governance controller)
function transferAliasTx(consumedOutput: lib.OutputTypes, consumedOutputId: string, walletKeyPair: lib.IKeyPair, targetAddress: lib.AddressTypes): lib.ITransactionPayload {
    const prevAliasInput = lib.TransactionHelper.inputFromOutputId(consumedOutputId);

    let nextAlias = deepCopy(consumedOutput) as lib.IAliasOutput;
    // We are performing a governance transition, so no need to increment stateIndex
    nextAlias.unlockConditions = [
        {
            type: lib.STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: targetAddress
        },
        {
            type: lib.GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: targetAddress
        }
    ]

    // Prepare inputs commitment
    const inputsCommitmentTx3 = lib.TransactionHelper.getInputsCommitment([consumedOutput]);

    // Construct tx essence
    const tx3Essence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [prevAliasInput],
        outputs: [nextAlias],
        inputsCommitment: inputsCommitmentTx3,
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHashTx3 = lib.TransactionHelper.getTransactionEssenceHash(tx3Essence)

    // We unlock only one output (the alias), so there will be one unlock with signature
    let unlockTx3: lib.ISignatureUnlock = {
        type: lib.SIGNATURE_UNLOCK_TYPE,
        signature: {
            type: lib.ED25519_SIGNATURE_TYPE,
            publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
            signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHashTx3), true)
        }
    };

    // Constructing Transaction Payload
    const txPayload3: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: tx3Essence,
        unlocks: [unlockTx3]
    };

    return txPayload3;
}

// Helper methods for the sake of this example

// Generate a hot wallet from a random key, ask the faucet to top it up
async function setUpHotWallet(hrp: string, fund: boolean = false) {
    // Generate a random seed
    const walletEd25519Seed = new lib.Ed25519Seed(randomBytes(32));

    // For Shimmer we use Coin Type 4219
    const path = new Bip32Path("m/44'/4219'/0'/0'/0'");

    // Construct wallet from seed
    const walletSeed = walletEd25519Seed.generateSeedFromPath(path);
    let walletKeyPair = walletSeed.keyPair();

    console.log("\tSeed", Converter.bytesToHex(walletSeed.toBytes()));

    // Get the address for the path seed which is actually the Blake2b.sum256 of the public key
    // display it in both Ed25519 and Bech 32 format
    const walletEd25519Address = new lib.Ed25519Address(walletKeyPair.publicKey);
    const walletAddress = walletEd25519Address.toAddress();
    const walletAddressHex = Converter.bytesToHex(walletAddress, true);

    let walletAddressBech32 = lib.Bech32Helper.toBech32(lib.ED25519_ADDRESS_TYPE, walletAddress, hrp);
    console.log("\tAddress Ed25519", walletAddressHex);
    console.log("\tAddress Bech32", walletAddressBech32);

    // Ask the faucet for funds
     // We also top up the address by asking funds from the faucet.
     if (fund) {
        await requestFundsFromFaucet(walletAddressBech32);
    }

    return [walletAddressHex, walletAddressBech32, walletKeyPair] as const;
}

// Requests frunds from the faucet via API
async function requestFundsFromFaucet(addressBech32: string) {
    const requestObj = JSON.stringify({ address: addressBech32 });
    let errorMessage, data;
    try {
        const response = await fetch(FAUCET, {
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

    if (errorMessage != "OK") {
        throw new Error(`Didn't manage to get funds from faucet: ${errorMessage}`);
    }
}
// Use the indexer API to fetch the output sent to the wallet address by the faucet
async function fetchAndWaitForBasicOutput(addressBech32: string, client: lib.IndexerPluginClient): Promise<string> {
    let outputsResponse: lib.IOutputsResponse = { ledgerIndex: 0, cursor: "", pageSize: "", items: [] };
    let maxTries = 10;
    let tries = 0;
    while (outputsResponse.items.length == 0) {
        if (tries > maxTries) { 
            break;
        }
        tries++;
        console.log("\tTry #", tries, ": fetching basic output for address ", addressBech32)
        outputsResponse = await client.outputs({
            addressBech32,
            hasStorageReturnCondition: false,
            hasExpirationCondition: false,
            hasTimelockCondition: false,
            hasNativeTokens: false
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
async function chainTrasactionsViaBlocks(client: lib.SingleNodeClient, txs: Array<lib.ITransactionPayload>, minPoWScore: number): Promise<Array<lib.IBlock>> {
    if (txs.length === 0) {
        throw new Error("can't create blocks from emppty trasnaction payload list");
    }

    // we will chain the blocks together via their blockIds as parents
    let blockIds: Array<string> = [];
    let blocks: Array<lib.IBlock> = [];

    // parents for the first block
    let parents = (await client.tips()).tips;

    for (let i = 0; i < txs.length; i++) {
        let block: lib.IBlock = {
            protocolVersion: lib.DEFAULT_PROTOCOL_VERSION,
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
        const blockId = lib.TransactionHelper.calculateBlockId(block);

        // Add it to list of blockIds
        blockIds.push(blockId);

        // Add it to list of block
        blocks.push(block);
      }

    return blocks;
}

// Send an array of block in order to the node.
async function submit(blocks: Array<lib.IBlock>, client: lib.SingleNodeClient) {
    for (let i = 0; i < blocks.length; i++) {
        console.log(`Submitting block ${i}...`);
        const blockId = await client.blockSubmit(blocks[i]);
        console.log(`Submitted block ${i} blockId is ${blockId}, check out the transaction at ${EXPLORER}/block/${blockId}`);
    }
}

// Gets an output from the local context
function getOutput(name: string): lib.OutputTypes {
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

// Performs PoW on a block to calculate nonce. Uses NeonPowProvider.
async function caluclateNonce(block: lib.IBlock, minPoWScore: number): Promise<string> {
    const writeStream = new WriteStream();
    lib.serializeBlock(writeStream, block);
    const blockBytes = writeStream.finalBytes();

    if (blockBytes.length > lib.MAX_BLOCK_LENGTH) {
        throw new Error(
            `The block length is ${blockBytes.length}, which exceeds the maximum size of ${lib.MAX_BLOCK_LENGTH}`
        );
    }

    const powProvider = new NeonPowProvider();
    const nonce = await powProvider.pow(blockBytes, minPoWScore);
    return nonce.toString();
}

// Utils

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

