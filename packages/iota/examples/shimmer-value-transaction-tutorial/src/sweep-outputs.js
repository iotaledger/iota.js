import { Bip32Path, Bip39, Blake2b, Ed25519 } from "@iota/crypto.js";
import { ADDRESS_UNLOCK_CONDITION_TYPE, BASIC_OUTPUT_TYPE, Bech32Helper, DEFAULT_PROTOCOL_VERSION, ED25519_ADDRESS_TYPE, ED25519_SIGNATURE_TYPE, Ed25519Address, Ed25519Seed, generateBip44Address, IndexerPluginClient, REFERENCE_UNLOCK_TYPE, serializeTransactionEssence, SIGNATURE_UNLOCK_TYPE, SingleNodeClient, TRANSACTION_ESSENCE_TYPE, TRANSACTION_PAYLOAD_TYPE, TransactionHelper } from "@iota/iota.js";
import { Converter, WriteStream } from "@iota/util.js";
import { NeonPowProvider } from "@iota/pow-neon.js";
import bigInt from "big-integer";
// Default entropy length is 256
const randomMnemonic = Bip39.randomMnemonic();
console.log("Seed phrase:", randomMnemonic);
const masterSeed = Ed25519Seed.fromMnemonic(randomMnemonic);
const NUM_ADDR = 6;
const addressGeneratorAccountState = {
    accountIndex: 0,
    addressIndex: 0,
    isInternal: false
};
const paths = [];
for (let i = 0; i < NUM_ADDR; i++) {
    const path = generateBip44Address(addressGeneratorAccountState);
    paths.push(path);
    console.log(`${path}`);
}
const keyPairs = [];
for (const path of paths) {
    // Master seed was generated previously
    const addressSeed = masterSeed.generateSeedFromPath(new Bip32Path(path));
    const addressKeyPair = addressSeed.keyPair();
    keyPairs.push(addressKeyPair);
    console.log(Converter.bytesToHex(addressKeyPair.privateKey, true));
    console.log(Converter.bytesToHex(addressKeyPair.publicKey, true));
}
const publicAddresses = [];
for (const keyPair of keyPairs) {
    const ed25519Address = new Ed25519Address(keyPair.publicKey);
    // Address in bytes
    const ed25519AddressBytes = ed25519Address.toAddress();
    // Conversion to BECH32
    const bech32Addr = Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, ed25519AddressBytes, "rms");
    const publicAddress = {
        ed25519: Converter.bytesToHex(ed25519AddressBytes, true),
        bech32: bech32Addr
    };
    publicAddresses.push(publicAddress);
    console.log(publicAddress);
}
const API_ENDPOINT = "https://api.testnet.shimmer.network";
const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });
const protocolInfo = await client.protocolInfo();
console.log(protocolInfo);
const sourceAddress = "0x696cc8b1e0d2c1e29fbf3a4f491c0c9dc730c6e4c4e0d0ab6011e9f1209af013";
const sourceAddressBech32 = "rms1qp5kej93urfvrc5lhuay7jgupjwuwvxxunzwp59tvqg7nufqntcpxp26uj8";
const sourceAddressPublicKey = "NEED KEYS FOR EXAMPLE ADDRESS";
const sourceAddressPrivateKey = "NEED KEYS FOR EXAMPLE ADDRESS";
const destAddress = "0xbc9a935696546212c237e49e881fc6bdbd90bd0ec6140391982172f05a01b095";
const indexerPlugin = new IndexerPluginClient(client);
const outputList = await indexerPlugin.basicOutputs({
    addressBech32: sourceAddressBech32
});
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
