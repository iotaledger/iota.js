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
    serializeAliasAddress, serializeTokenScheme, serializeUTXOInput
} from "@iota/iota.js";
import {Converter, WriteStream, BigIntHelper, HexHelper} from "@iota/util.js";
import { Bip32Path, Blake2b, Ed25519 } from "@iota/crypto.js";
import * as readline from 'readline';
import { randomBytes } from "crypto";
import Prom from "bluebird";
import { NeonPowProvider } from "@iota/pow-neon.js";
import type {IRent, OutputTypes} from "@iota/iota.js";
import bigInt from "big-integer";
import * as console from "console";

const API_ENDPOINT = "https://localhost:14265/";
const EXPLORER = "https://explorer.alphanet.iotaledger.net/alphanet"
const FAUCET = "https://faucet.alphanet.iotaledger.net"

// Amount of tokens to mint for now
const mintAmount = 1000;
// Maximum supply recorded in the foundry
const maxSupply = 10000;

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

async function askQuestion(question: string ): Promise<string> {
    const result: string = await questionAsync(question);

    return result;
}

// In this example we set up a hot wallet, fund it with tokens from the faucet and let it mint an NFT to our address.
async function run() {
    // Neon localPoW is blazingly fast, but you need rust toolchain to build
    const client = new SingleNodeClient(API_ENDPOINT, {powProvider: new NeonPowProvider()});

    // fetch basic info from node
    const nodeInfo = await client.info();

    // ask for the target address
    const targetAddressBech32 = await askQuestion("Target address where to mint the tokens? (Bech32 encoded): ");

    // parse bech32 encoded address into iota address
    const tmp = Bech32Helper.fromBech32(targetAddressBech32, nodeInfo.protocol.bech32HRP)
    if (!tmp){
        throw new Error("Can't decode target address")
    }

    let targetAddress: AddressTypes;
    switch(tmp.addressType){
        case ED25519_ADDRESS_TYPE: {
            targetAddress = {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: Converter.bytesToHex(tmp.addressBytes, true)
            };
            break;
        }
        case ALIAS_ADDRESS_TYPE: {
            targetAddress = {
                type: ALIAS_ADDRESS_TYPE,
                aliasId: Converter.bytesToHex(tmp.addressBytes, true)
            };
            break;
        }
        case NFT_ADDRESS_TYPE: {
            targetAddress = {
                type: NFT_ADDRESS_TYPE,
                nftId: Converter.bytesToHex(tmp.addressBytes, true)
            };
            break;
        }
        default: {
            throw new Error("Unexpected address type");
        }
    }

    // Now it's time to set up an account for this demo. We generate a random seed.
    const walletEd25519Seed = new Ed25519Seed(randomBytes(32))

    console.log("Your seed");

    // For Shimmer we use Coin Type 4219
    const path = new Bip32Path("m/44'/4219'/0'/0'/0'");

    // Construct wallet from seed
    const walletSeed = walletEd25519Seed.generateSeedFromPath(path);
    const walletKeyPair = walletSeed.keyPair();
    console.log("Seed", Converter.bytesToHex(walletSeed.toBytes()));

    // Get the address for the path seed which is actually the Blake2b.sum256 of the public key
    // display it in both Ed25519 and Bech 32 format
    const walletEd25519Address = new Ed25519Address(walletKeyPair.publicKey);
    const walletAddress = walletEd25519Address.toAddress();
    const walletAddressHex = Converter.bytesToHex(walletAddress, true);
    const walletAddressBech32 = Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, walletAddress, nodeInfo.protocol.bech32HRP);
    console.log("Address Ed25519", walletAddressHex);
    console.log("Address Bech32", walletAddressBech32);

    console.log("Go to "+ FAUCET + " and send funds to " + walletAddressBech32);

    await askQuestion("Confirm you sent funds to the address by pressing any key ");

    // Fetch outputId with funds to be used as input
    const indexerPluginClient = new IndexerPluginClient(client);

    // Indexer returns outputIds of matching outputs. We are only interested in the first one coming from the faucet.
    const outputId = await fetchAndWaitForBasicOutput(walletAddressBech32, indexerPluginClient);

    console.log("OutputId: ", outputId);

    // Fetch the output itself
    const resp = await client.output(outputId);
    const consumedOutput = resp.output;

    console.log("To be consumed output: ", consumedOutput);

    // Prepare inputs to the tx
    const input:IUTXOInput = {
        type: UTXO_INPUT_TYPE,
        transactionId: outputId.slice(0, 2 + 2*TRANSACTION_ID_LENGTH), // +2 because it has 0x prefix
        transactionOutputIndex: parseInt(outputId.slice(2+2*TRANSACTION_ID_LENGTH))
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
    const requiredStorageDeposit = getStorageDeposit(aliasOutput, nodeInfo.protocol.rentStructure);
    console.log("Required Storage Deposit of the Alias output: ", requiredStorageDeposit);

    // Prepare Tx essence
    // We are going to mint the NFT to an address the user defined in the beginning
    // We could put only requiredStorageDeposit into the nft output, but hey, we have free tokens so top it up with all we have.
    // nftOutput.amount = requiredStorageDeposit.toString()

    const inputsCommitment = getInputsCommitment([consumedOutput]);

    // Figure out networkId from networkName
    const networkId = networkIdFromNetworkName(nodeInfo.protocol.networkName);

    // Creating Transaction Essence
    const txEssence: ITransactionEssence = {
        type: TRANSACTION_ESSENCE_TYPE,
        networkId: networkId,
        inputs: [input],
        outputs: [aliasOutput],
        inputsCommitment:  inputsCommitment,
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
    const txPayload : ITransactionPayload = {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence: txEssence,
        unlocks: [unlock]
    };


    // Ready with the alias minting tx, now we have to prepare the second tx that:
    //   - creates the foundry
    //   - mints tokens
    //   - transfers the control of alias to the user address

    // To be able to consume the created alias, we must know its outputId
    // outputId = txPayloadHash (32 bytes) + outputIndex (2 bytes)

    const aliasInput: IUTXOInput = {
        type: UTXO_INPUT_TYPE,
        transactionId: Converter.bytesToHex(getTransactionHash(txPayload),true), // name the output of the previous tx
        transactionOutputIndex: 0  // we only had one output
    };

    // defining the next alias output
    let nextAliasOutput: IAliasOutput = deepCopy(aliasOutput);
    const wAliasId = new WriteStream();
    serializeUTXOInput(wAliasId, aliasInput); // this will give us bytes of UTXO_INPUT_TYPE + TxHash + OutputIndex
    const aliasOutputId = wAliasId.finalBytes().slice(1); // the first byte is just a type definition

    // aliasId is the hash of the creating outputId
    nextAliasOutput.aliasId = Converter.bytesToHex(Blake2b.sum256(aliasOutputId), true);

    nextAliasOutput.stateIndex++; // has to be incremented for every state update tx
    nextAliasOutput.foundryCounter++; // has to be incremented every time we create a foundry

    // defining the foundry
    const foundryOutput: IFoundryOutput = {
        type: FOUNDRY_OUTPUT_TYPE,
        amount: "0", // we don't know yet how much we needto put here due to storage costs
        serialNumber: 1, // should correlate to current foundryCounter in alias above
        tokenScheme:  {
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
    const aliasStorageDeposit = getStorageDeposit(nextAliasOutput, nodeInfo.protocol.rentStructure);
    const foundryStorageDeposit = getStorageDeposit(foundryOutput, nodeInfo.protocol.rentStructure);
    const basicStorageDeposit = getStorageDeposit(remainderOutput, nodeInfo.protocol.rentStructure);

    if (parseInt(aliasOutput.amount) < aliasStorageDeposit + foundryStorageDeposit + basicStorageDeposit) {
        throw new Error("Initial funds not enough to cover for storage deposits");
    }

    // Update amounts in outputs. Only leave the bare minimum in the alias and the foundry, put the rest into the basic output
    nextAliasOutput.amount = aliasStorageDeposit.toString();
    foundryOutput.amount = foundryStorageDeposit.toString();
    remainderOutput.amount = (parseInt(aliasOutput.amount) - (aliasStorageDeposit + foundryStorageDeposit)).toString();

    // Prepare inputs commitment
    const inputsCommitmentTx2 = getInputsCommitment([aliasOutput]);

    // Construct tx essence
    const tx2Essence: ITransactionEssence = {
        type: TRANSACTION_ESSENCE_TYPE,
        networkId: networkId,
        inputs: [aliasInput],
        outputs: [nextAliasOutput, foundryOutput, remainderOutput],
        inputsCommitment:  inputsCommitmentTx2,
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
    const txPayload2 : ITransactionPayload = {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence: tx2Essence,
        unlocks: [unlockTx2]
    };

    // Tx 3 is going to give the governor role of tha alias to targetaddress
    const aliasInputTx3: IUTXOInput = {
        type: UTXO_INPUT_TYPE,
        transactionId: Converter.bytesToHex(getTransactionHash(txPayload2),true), // name the output of the previous tx
        transactionOutputIndex: 0  // alias was the first one
    };

    let aliasOutputTx3: IAliasOutput = deepCopy(nextAliasOutput);
    // We are performing a governance transition, so no need to increment stateIndex
    aliasOutputTx3.unlockConditions = [
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
    const inputsCommitmentTx3 = getInputsCommitment([nextAliasOutput]);

    // Construct tx essence
    const tx3Essence: ITransactionEssence = {
        type: TRANSACTION_ESSENCE_TYPE,
        networkId: networkId,
        inputs: [aliasInputTx3],
        outputs: [aliasOutputTx3],
        inputsCommitment:  inputsCommitmentTx3,
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
    const txPayload3 : ITransactionPayload = {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence: tx3Essence,
        unlocks: [unlockTx3]
    };

    // Finally, time to prepare trhe three blocks, and chain them together via `parents`

    // For the first block we do need parents
    let parentsResponse = await client.tips();
    let parents = parentsResponse.tips;

    // Constructing block that holds the transaction
    let block1: IBlock = {
        protocolVersion: DEFAULT_PROTOCOL_VERSION,
        parents: parents,
        payload: txPayload,
        nonce: "0"
    };

    // We need to calculate pow in order to know the blockId, so we can add this as a parent in block2
    console.log("Calculating PoW, submitting block...")
    const block1Id = await client.blockSubmit(block1);
    console.log("Submitted blockId is: ", block1Id);
    console.log("Check out the transaction at ", EXPLORER+"/block/"+block1Id);

    let block2: IBlock = {
        protocolVersion: DEFAULT_PROTOCOL_VERSION,
        // The only parent is our previously submitted block! We have to make sure that the tx we are spending from is in
        // tha past cone of the current block. If it's a direct parent, it is in past cone.
        parents: [block1Id],
        payload: txPayload2,
        nonce: "0"
    };

    console.log("Calculating PoW, submitting block...")
    const block2Id = await client.blockSubmit(block2);
    console.log("Submitted blockId is: ", block2Id);
    console.log("Check out the transaction at ", EXPLORER+"/block/"+block2Id);

    let block3: IBlock = {
        protocolVersion: DEFAULT_PROTOCOL_VERSION,
        // The only parent is our previously submitted block! We have to make sure that the tx we are spending from is in
        // tha past cone of the current block. If it's a direct parent, it is in past cone.
        parents: [block2Id],
        payload: txPayload3,
        nonce: "0"
    };

    console.log("Calculating PoW, submitting block...")
    const block3Id = await client.blockSubmit(block3);
    console.log("Submitted blockId is: ", block3Id);
    console.log("Check out the transaction at ", EXPLORER+"/block/"+block3Id);
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));

async function fetchAndWaitForBasicOutput(addy: string, client: IndexerPluginClient): Promise<string> {
    let outputsResponse: IOutputsResponse = { ledgerIndex: 0, cursor: "", pageSize: "", items: [] };
    let maxTries = 10;
    let tries = 0;
    while(outputsResponse.items.length == 0 ){
        if (tries > maxTries){break}
        tries++;
        console.log("\tTry #",tries,": fetching basic output for address ", addy)
        outputsResponse = await client.outputs({
            addressBech32: addy,
            hasStorageReturnCondition: false,
            hasExpirationCondition: false,
            hasTimelockCondition: false,
            hasNativeTokens: false,
        });
        if(outputsResponse.items.length == 0){
            console.log("\tDidn't find any, retrying soon...")
            await new Promise(f => setTimeout(f, 1000));}
    }
    if(tries > maxTries){
        throw new Error("Didn't find any outputs for address");
    }
    return outputsResponse.items[0]
};

function getInputsCommitment(inputs: [OutputTypes]): string {
    // InputsCommitment calculation
    const inputsCommitmentHasher = new Blake2b(Blake2b.SIZE_256); // blake2b hasher
    // Step 2: Loop over list of inputs (the actual output objects they reference).
    inputs.forEach( value => {
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

function networkIdFromNetworkName(networkName: string): string {
    const networkIdBytes = Blake2b.sum256(Converter.utf8ToBytes(networkName));
    return  BigIntHelper.read8(networkIdBytes, 0).toString();
}

function getTxEssenceHash(essence: ITransactionEssence): Uint8Array {
    const binaryEssence = new WriteStream();
    serializeTransactionEssence(binaryEssence, essence);
    const essenceFinal = binaryEssence.finalBytes();
    return  Blake2b.sum256(essenceFinal);
}

function getTransactionHash(tx: ITransactionPayload): Uint8Array {
    const binaryTx = new WriteStream();
    serializeTransactionPayload(binaryTx, tx);
    const txBytes = binaryTx.finalBytes();
    return  Blake2b.sum256(txBytes);
}

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

function deepCopy<T>(instance : T) : T {
    if ( instance == null){
        return instance;
    }

    // handle Dates
    if (instance instanceof Date) {
        return new Date(instance.getTime()) as any;
    }

    // handle Array types
    if (instance instanceof Array){
        var cloneArr = [] as any[];
        (instance as any[]).forEach((value)  => {cloneArr.push(value)});
        // for nested objects
        return cloneArr.map((value: any) => deepCopy<any>(value)) as any;
    }
    // handle objects
    if (instance instanceof Object) {
        var copyInstance = { ...(instance as { [key: string]: any }
            ) } as { [key: string]: any };
        for (var attr in instance) {
            if ( (instance as Object).hasOwnProperty(attr))
                copyInstance[attr] = deepCopy<any>(instance[attr]);
        }
        return copyInstance as T;
    }
    // handling primitive data types
    return instance;
}
