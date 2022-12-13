import { Blake2b, Ed25519 } from "@iota/crypto.js";
import {
    ADDRESS_UNLOCK_CONDITION_TYPE,
    ALIAS_ADDRESS_TYPE,
    ALIAS_OUTPUT_TYPE,
    BASIC_OUTPUT_TYPE,
    Bech32Helper,
    DEFAULT_PROTOCOL_VERSION,
    ED25519_ADDRESS_TYPE,
    ED25519_SIGNATURE_TYPE,
    GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
    IAliasOutput,
    IBasicOutput,
    IBlock,
    ISignatureUnlock,
    ITransactionEssence,
    ITransactionPayload,
    IUTXOInput,
    serializeTransactionEssence,
    serializeTransactionPayload,
    SIGNATURE_UNLOCK_TYPE,
    SingleNodeClient,
    STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
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
    const protocolInfo = await client.protocolInfo();

    // Ed25519 Address (PubKeyHash)
    const sourceAddress = "0x377a465d1d2e6f3e57e14dbf82171be7a472139174386d86fe5dba475c4d514f";

    // Ed25519 Key pairs
    const sourceAddressPublicKey = "0x1be6ea2907dae69c72663f0626f97229c2a5600ad1410835606008cbc9d34665";
    const sourceAddressPrivateKey = "0xb2a5c46aa2cc31812b1dcf17edb019edfd48f7fe9fabe9d4cda65986fd310a0d1be6ea2907dae69c72663f0626f97229c2a5600ad1410835606008cbc9d34665";

    // Ed25519 Addresses (PubKeyHash)
    const stateControllerAddress = "0x647f7a9fd831c6e6034e7e5496a50aed17ef7d2add200bb4cfde7649ce2b0aaf";
    const governorAddress = "0x22847390aad479d34d52e4fb58a01d752887ae0247708f7e66b488c5b5ba2751";

    const inputs: IUTXOInput[] = [];

    const outputs: (IAliasOutput | IBasicOutput)[] = [];

    // The amount of funds to be sent to an alias output so that it covers its byte costs
    const amountToSend = bigInt("60000");

    inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));

    // Details the of consumed Output
    const consumedOutputDetails = await client.output(consumedOutputId);
    const totalFunds = bigInt(consumedOutputDetails.output.amount);

    const initialAliasId = new Uint8Array(new ArrayBuffer(32));

    // New output. Alias output. 
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

    // 4. Get inputs commitment
    const inputsCommitment = TransactionHelper.getInputsCommitment([consumedOutputDetails.output]);

    // 5.Create transaction essence
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
    console.log("Essence Hash", essenceHash);

    console.log("Transaction Essence: ", transactionEssence);

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

    // Now we are going to know what is the Alias ID assigned
    const blockData: IBlock = await client.block(blockId);
    const blockTransactionPayload = blockData.payload as ITransactionPayload;

    const transactionId = computeTransactionIdFromTransactionPayload(blockTransactionPayload);
    const outputId = TransactionHelper.outputIdFromTransactionData(transactionId, 0);
    console.log("Output Id:", outputId);

    const addrHash = Blake2b.sum256(Converter.hexToBytes(outputId));
    console.log("Alias ID:", Converter.bytesToHex(addrHash, true));
    console.log("Alias Address:", Bech32Helper.toBech32(ALIAS_ADDRESS_TYPE, addrHash, protocolInfo.bech32Hrp));
}

function computeTransactionIdFromTransactionPayload(payload: ITransactionPayload) {
    const tpWriteStream = new WriteStream();
    serializeTransactionPayload(tpWriteStream, payload);
    return Converter.bytesToHex(Blake2b.sum256(tpWriteStream.finalBytes()), true);
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
