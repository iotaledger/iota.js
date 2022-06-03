import {
    Bech32Helper,
    Ed25519Address,
    Ed25519Seed,
    ED25519_ADDRESS_TYPE,
    IndexerPluginClient, IUTXOInput,
    SingleNodeClient,
    UTXO_INPUT_TYPE,
    IOutputsResponse,
    TRANSACTION_ID_LENGTH,
    INftOutput,
    NFT_OUTPUT_TYPE,
    serializeNftOutput,
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
    LocalPowProvider,
    AddressTypes,
    ALIAS_ADDRESS_TYPE,
    NFT_ADDRESS_TYPE
} from "@iota/iota.js";
import { Converter, WriteStream, BigIntHelper } from "@iota/util.js";
import { Bip32Path, Blake2b, Ed25519 } from "@iota/crypto.js";
import * as readline from 'node:readline';
import { randomBytes } from "node:crypto";
import Prom from "bluebird";

const API_ENDPOINT = "http://localhost:14265/";
const EXPLORER = "https://explorer.alphanet.iotaledger.net/alphanet"
const FAUCET = "https://faucet.alphanet.iotaledger.net"

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
    // LocalPoW is extremely slow and only runs in 1 thread...
    const client = new SingleNodeClient(API_ENDPOINT, {powProvider: new LocalPowProvider()});

    // fetch basic info from node
    const nodeInfo = await client.info();

    // ask for the target address
    const targetAddressBech32 = await askQuestion("Target address where to mint the NFT? (Bech32 encoded): ");

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

    // Put here you mnemonic
    // const mnemonic =
    //     "assist file add kidney sense anxiety march quality sphere stamp crime swift mystery bind thrive impact walk solar asset pottery nation dutch column beef";
    // Generate the seed from the Mnemonic
    //const walletEd25519Seed = Ed25519Seed.fromMnemonic(mnemonic);

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

    // Create the outputs, that is an NFT output
    let nftOutput: INftOutput = {
        type: NFT_OUTPUT_TYPE,
        amount: "0", // for now zero as we don't know the byte cost yet
        // when minting, this has to be set to zero. It will be set in nodes as the hash of the outputId when the tx confirms.
        // Note, that from the first spend of the NFT you have to use the actual hash of outputId
        nftId: "0x0000000000000000000000000000000000000000000000000000000000000000",
        immutableFeatures: [
            {
                type: 1, // Issuer feature
                address: {
                    type: 0,
                    pubKeyHash: walletAddressHex,
                },
            },
            {
                type: 2, // Metadata Feature
                data: Converter.utf8ToHex("This is where the immutable NFT metadata goes", true)
            }
        ],
        unlockConditions: [
            {
                type: 0,
                address: targetAddress, // minting it directly onto target addy
            }
        ]
    }

    // To know the byte cost, we need to serialize the output
    const writeStream = new WriteStream();
    serializeNftOutput(writeStream, nftOutput);
    const nftOutputBytes = writeStream.finalBytes();
    const offset = nodeInfo.protocol.rentStructure.vByteFactorKey*34 + nodeInfo.protocol.rentStructure.vByteFactorData*(32 + 4 + 4); // 10* outputIdLength + blockIdLength + confMSIndexLength + confUnixTSLength src: https://github.com/muXxer/tips/blob/master/tips/TIP-0019/tip-0019.md
    let vByteSize =  nodeInfo.protocol.rentStructure.vByteFactorData*nftOutputBytes.length + offset;
    let requiredStorageDeposit = nodeInfo.protocol.rentStructure.vByteCost * vByteSize;
    console.log("Virtual Byte Size of the NFT output: ", vByteSize);
    console.log("Required Storage Deposit of the NFT output: ", requiredStorageDeposit);

    // Prepare Tx essence
    // We are going to mint the NFT to an address the user defined in the beginning
    // We could put only requiredStorageDepoist into the nft output, but hey, we have free tokens so top it up with all we have.
    // nftOutput.amount = requiredStorageDeposit.toString()
    nftOutput.amount = consumedOutput.amount;


    // InputsCommitment calculation
    const inputsCommitmentHasher = new Blake2b(Blake2b.SIZE_256); // blake2b hasher
    // Step 1: sort inputs lexicographically basedon serialized bytes
    //       -> we have only 1 input, no need to
    // Step 2: Loop over list of inputs (the actual output objects they reference).
    //   SubStep 2a: Calculate hash of serialized output
    const outputHasher = new Blake2b(Blake2b.SIZE_256);
    const w = new WriteStream();
    serializeOutput(w, consumedOutput);
    const consumedOutputBytes = w.finalBytes();
    outputHasher.update(consumedOutputBytes);
    const outputHash = outputHasher.final();

    //   SubStep 2b: add each output hash to buffer
    inputsCommitmentHasher.update(outputHash);

    // Step 3: Calculate Sum from buffer
    const inputsCommitment = Converter.bytesToHex(inputsCommitmentHasher.final(), true);

    // Figure out networkId from networkName
    const networkIdBytes = Blake2b.sum256(Converter.utf8ToBytes(nodeInfo.protocol.networkName));
    const currentNetworkId = BigIntHelper.read8(networkIdBytes, 0).toString();

    // Creating Transaction Essence
    const txEssence: ITransactionEssence = {
        type: TRANSACTION_ESSENCE_TYPE,
        networkId: currentNetworkId,
        inputs: [ input],
        outputs: [nftOutput], // outputs don't have to be sorted anymore!!!
        inputsCommitment:  inputsCommitment,
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const binaryEssence = new WriteStream();
    serializeTransactionEssence(binaryEssence, txEssence);
    const essenceFinal = binaryEssence.finalBytes();
    const essenceHash = Blake2b.sum256(essenceFinal);

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

    // Getting parents for the block
    let parentsResponse = await client.tips();
    let parents = parentsResponse.tips;

    // Constructing block that holds the transaction
    let block: IBlock = {
        protocolVersion: DEFAULT_PROTOCOL_VERSION,
        parents: parents,
        payload: txPayload,
        nonce: "0"
    };

    // LocalPoW is so slow and simpe threaded that it may happen that by the time you push the msg to the node,
    // it is alsready below max depth (parents), or will need to be promoted...
    // alternatively, connect to a node with remotePoW enabled
    const blockId = await client.blockSubmit(block);

    console.log("Submitted blockId is: ", blockId);

    console.log("Check out the transaction at ", EXPLORER+"/block/"+blockId);

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
}
