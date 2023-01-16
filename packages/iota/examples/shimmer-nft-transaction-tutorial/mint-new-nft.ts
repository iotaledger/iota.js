import { Blake2b, Ed25519 } from "@iota/crypto.js";
import {
    ADDRESS_UNLOCK_CONDITION_TYPE,
    Bech32Helper,
    DEFAULT_PROTOCOL_VERSION,
    ED25519_ADDRESS_TYPE,
    ED25519_SIGNATURE_TYPE,
    IBasicOutput,
    IBlock,
    INftOutput,
    ISignatureUnlock,
    ISSUER_FEATURE_TYPE,
    IStorageDepositReturnUnlockCondition,
    ITransactionEssence,
    ITransactionPayload,
    IUTXOInput,
    METADATA_FEATURE_TYPE,
    NFT_ADDRESS_TYPE,
    NFT_OUTPUT_TYPE,
    serializeTransactionPayload,
    SIGNATURE_UNLOCK_TYPE,
    SingleNodeClient,
    TransactionHelper,
    TRANSACTION_ESSENCE_TYPE,
    TRANSACTION_PAYLOAD_TYPE,
} from "@iota/iota.js";
import { NeonPowProvider } from "@iota/pow-neon.js";
import { Converter, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";

const API_ENDPOINT = "https://api.testnet.shimmer.network";

// The output that holds the fund we will be transferring 
const consumedOutputId = process.argv[2];
if (!consumedOutputId) {
    console.error("Please provide an output to be consumed that has enough funds");
    process.exit(-1);
}


async function run() {
    const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });
    const nodeInfo = await client.info();

    // Ed25519 Address (PubKeyHash)
    const sourceAddress = "0x62c02a68b2efce54a452a114ab2affa940f776b362a67fc4453e0cf757a33596";

    // Ed25519 Key pairs
    const sourceAddressPublicKey = "0x91dbbfb5372a9ee9addb2c909e1e4c60ddb5d22c11da19d00482e229af3ef724";
    const sourceAddressPrivateKey = "0x22f67a6b7b80215638e367857afdda48d16dcf79af0edf9cd3aeaa704fb2aed191dbbfb5372a9ee9addb2c909e1e4c60ddb5d22c11da19d00482e229af3ef724";

    const inputs: IUTXOInput[] = [];
    const outputs: (INftOutput | IBasicOutput)[] = [];

    inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));

    // Details the of consumed Output
    const consumedOutputDetails = await client.output(consumedOutputId);
    const consumedOutput = consumedOutputDetails.output;

    const initialNftId = new Uint8Array(new ArrayBuffer(32));

    const immutableData = {
        standard: "IRC27",
        version: "v1.0",
        type: "image/jpeg",
        uri: "https://nft-oceean.example.org/my-nft.jpeg"
    };

    // New output. NFT output. 
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

    // The remaining output remains in the origin address
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

   const essenceHash = TransactionHelper.getTransactionEssenceHash(transactionEssence);

    // Main unlock condition 
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

    // Create Block
    const block: IBlock = {
        protocolVersion: DEFAULT_PROTOCOL_VERSION,
        parents: [],
        payload: transactionPayload,
        nonce: "0",
    };

    console.log("Calculating PoW, submitting block...");
    const blockId = await client.blockSubmit(block);
    console.log("Block Id:", blockId);

    setTimeout(async () => {
        const blockMetadata = await client.blockMetadata(blockId);
        if (!blockMetadata.ledgerInclusionState) {
            throw new Error("Block still pending confirmation");
        }

        if (blockMetadata.ledgerInclusionState === "included") {
            const transactionId = calculateTransactionId(transactionPayload);
            const outputId = TransactionHelper.outputIdFromTransactionData(transactionId, 0);
            console.log("Output ID:", outputId);
            const nftIdBytes = Blake2b.sum256(Converter.hexToBytes(outputId));
            const nftId = Converter.bytesToHex(nftIdBytes, true)
            console.log("NFT ID:", nftId);
            console.log("NFT Address:", 
                Bech32Helper.toBech32(NFT_ADDRESS_TYPE, nftIdBytes, nodeInfo.protocol.bech32Hrp ));
        }
        else if (blockMetadata.ledgerInclusionState === "conflicting") {
            throw new Error("Conflicting Block");
        }
    }, 6000);
}

function calculateTransactionId(transactionPayload: ITransactionPayload): string {
    const tpWriteStream = new WriteStream();
    serializeTransactionPayload(tpWriteStream, transactionPayload);
    return Converter.bytesToHex(Blake2b.sum256(tpWriteStream.finalBytes()), true);
}

run()
    .then(() => console.log("Waiting 6 seconds to check confirmation..."))
    .catch(err => console.error(err));
