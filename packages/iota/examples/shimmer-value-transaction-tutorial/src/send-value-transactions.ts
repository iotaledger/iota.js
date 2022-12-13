import { Blake2b, Ed25519} from "@iota/crypto.js";
import {
    ADDRESS_UNLOCK_CONDITION_TYPE,
    BASIC_OUTPUT_TYPE,
    DEFAULT_PROTOCOL_VERSION,
    ED25519_ADDRESS_TYPE,
    ED25519_SIGNATURE_TYPE,
    IBasicOutput,
    IBlock,
    ISignatureUnlock,
    ITransactionEssence,
    ITransactionPayload,
    IUTXOInput,
    serializeTransactionEssence,
    SIGNATURE_UNLOCK_TYPE,
    SingleNodeClient,
    TRANSACTION_ESSENCE_TYPE,
    TRANSACTION_PAYLOAD_TYPE,
    TransactionHelper
} from "@iota/iota.js";
import {Converter, WriteStream} from "@iota/util.js";
import {NeonPowProvider} from "@iota/pow-neon.js";
import bigInt from "big-integer";
import { exit } from "process";

const API_ENDPOINT = "https://api.testnet.shimmer.network";
const client = new SingleNodeClient(API_ENDPOINT, {powProvider: new NeonPowProvider()});
const protocolInfo = await client.protocolInfo();

console.log(protocolInfo);

const sourceAddress = "0xf53d2274399aa35cbf61f3ad8254a188fdb5fae76cf8b261376ecf0b57fd6fb3";
const sourceAddressBech32 = "rms1qr6n6gn58xd2xh9lv8e6mqj55xy0md06uak03vnpxahv7z6hl4hmxmmxzwu";
const sourceAddressPublicKey = "0x23350ad8dcd91a96384d3c76a399e1ef967098a55ff6f9eb5461218b98ab858d";
const sourceAddressPrivateKey = "0x87b145379dbdf681fec39b026a6a1f3a40ad9ce18f523e29c839ddd7c44cc50123350ad8dcd91a96384d3c76a399e1ef967098a55ff6f9eb5461218b98ab858d";

const destAddress = "0xf8cec8dca90daf5498c3c2f5db880c1fc759bd0e4cf40b0e12c297fde3c731a1";

const consumedOutputId = "0x8642289fd18e94af55643bdf91850b79df9c90389fef0d2b9f2bbe4d1f35ff810100";
const outputDetails = await client.output(consumedOutputId);
if (outputDetails.metadata.isSpent) {
    console.error(`Output ${consumedOutputId} is already spent. Use another output controlled by ${sourceAddressBech32}`);
    exit(-1);
}

const totalFunds = bigInt(outputDetails.output.amount);

const amountToSend = bigInt("50000");

const inputs: IUTXOInput[] = [];

inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));


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
                pubKeyHash: sourceAddress
            }
        }
    ],
    features: []
};

outputs.push(basicOutput);
outputs.push(remainderBasicOutput);

const inputsCommitment = TransactionHelper.getInputsCommitment([outputDetails.output]);

const transactionEssence: ITransactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: TransactionHelper.networkIdFromNetworkName(protocolInfo.networkName),
    inputs,
    inputsCommitment,
    outputs
};

const wsTsxEssence = new WriteStream();
serializeTransactionEssence(wsTsxEssence, transactionEssence);
const essenceFinal = wsTsxEssence.finalBytes();

const essenceHash = Blake2b.sum256(essenceFinal);

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

const block: IBlock = {
    protocolVersion: DEFAULT_PROTOCOL_VERSION,
    parents: [],
    payload: transactionPayload,
    nonce: "0",
};

const blockId = await client.blockSubmit(block);

console.log(blockId);