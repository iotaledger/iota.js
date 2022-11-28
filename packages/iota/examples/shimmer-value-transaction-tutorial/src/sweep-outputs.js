import { Blake2b, Ed25519 } from "@iota/crypto.js";
import { ADDRESS_UNLOCK_CONDITION_TYPE, BASIC_OUTPUT_TYPE, Bech32Helper, DEFAULT_PROTOCOL_VERSION, ED25519_ADDRESS_TYPE, ED25519_SIGNATURE_TYPE, Ed25519Address, Ed25519Seed, generateBip44Address, IndexerPluginClient, REFERENCE_UNLOCK_TYPE, serializeTransactionEssence, SIGNATURE_UNLOCK_TYPE, SingleNodeClient, TRANSACTION_ESSENCE_TYPE, TRANSACTION_PAYLOAD_TYPE, TransactionHelper } from "@iota/iota.js";
import { Converter, WriteStream } from "@iota/util.js";
import { NeonPowProvider } from "@iota/pow-neon.js";
import bigInt from "big-integer";

const API_ENDPOINT = "https://api.testnet.shimmer.network";
const client = new SingleNodeClient(API_ENDPOINT, {powProvider: new NeonPowProvider()});
const protocolInfo = await client.protocolInfo();

console.log(protocolInfo);
	
const destAddressBech32 = "rms1qruvajxu4yx674ycc0p0tkugps0uwkdapex0gzcwztpf0l0rcuc6zqqndre";
const destAddress = "0xf8cec8dca90daf5498c3c2f5db880c1fc759bd0e4cf40b0e12c297fde3c731a1";

const indexerPlugin = new IndexerPluginClient(client);
const outputList = await indexerPlugin.basicOutputs({
    addressBech32: destAddressBech32
});

if (outputList.items.length < 2) {
    console.error(`To sweep funds you need at least 2 outputs controlled by address ${destAddressBech32}`);
    process.exit(-1);
}

const consumedOutputId1 = outputList.items[0];
const consumedOutputId2 = outputList.items[1];
const output1 = await client.output(consumedOutputId1);
const output2 = await client.output(consumedOutputId2);
// The two outputs are combined into only one output (the final amount will be 100000 Glow, 0.1 Shimmer)
const amount1 = bigInt(output1.output.amount);
const amount2 = bigInt(output2.output.amount);
const combinedOutput = {
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
const inputs = [];
inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId1));
inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId2));
const inputsCommitment = TransactionHelper.getInputsCommitment([output1.output, output2.output]);
const transactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: protocolInfo.networkId,
    inputs,
    inputsCommitment,
    outputs: [combinedOutput]
};
const wsTsxEssence = new WriteStream();
serializeTransactionEssence(wsTsxEssence, transactionEssence);
const essenceFinal = wsTsxEssence.finalBytes();
const essenceHash = Blake2b.sum256(essenceFinal);
const destAddressPubKey = "0x....";
const destAddressPrivateKey = "0x....";
// Main unlock condition
const unlock1 = {
    type: SIGNATURE_UNLOCK_TYPE,
    signature: {
        type: ED25519_SIGNATURE_TYPE,
        publicKey: destAddressPubKey,
        signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(destAddressPrivateKey), essenceHash), true)
    }
};
const unlock2 = {
    type: REFERENCE_UNLOCK_TYPE,
    reference: 0
};
const transactionPayload = {
    type: TRANSACTION_PAYLOAD_TYPE,
    essence: transactionEssence,
    unlocks: [unlock1, unlock2]
};
const block = {
    protocolVersion: DEFAULT_PROTOCOL_VERSION,
    parents: [],
    payload: transactionPayload,
    nonce: "0",
};
const blockId = await client.blockSubmit(block);
console.log(blockId);
