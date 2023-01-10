import { Blake2b, Ed25519 } from "@iota/crypto.js";
import {
    ALIAS_ADDRESS_TYPE,
    ALIAS_UNLOCK_TYPE,
    Bech32Helper,
    DEFAULT_PROTOCOL_VERSION,
    ED25519_SIGNATURE_TYPE,
    IAliasOutput,
    IAliasUnlock,
    IBasicOutput,
    IBlock,
    IFoundryOutput,
    IndexerPluginClient,
    ISignatureUnlock,
    ITransactionEssence,
    ITransactionPayload,
    IUTXOInput,
    serializeTransactionEssence,
    SIGNATURE_UNLOCK_TYPE,
    SingleNodeClient,
    TransactionHelper,
    TRANSACTION_ESSENCE_TYPE,
    TRANSACTION_PAYLOAD_TYPE,
} from "@iota/iota.js";
import { NeonPowProvider } from "@iota/pow-neon.js";
import { Converter, WriteStream } from "@iota/util.js";

const API_ENDPOINT = "https://api.testnet.shimmer.network";

// The alias Id 
const aliasId = process.argv[2];
if (!aliasId) {
    console.error("Please provide your Alias Id");
    process.exit(-1);
}

async function run() {
    const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });
    const nodeInfo = await client.info();
    const protocolInfo = nodeInfo.protocol;

    // Ed25519 Addresses (PubKeyHash)
    const stateControllerAddress = "0x647f7a9fd831c6e6034e7e5496a50aed17ef7d2add200bb4cfde7649ce2b0aaf";
    // Key pair of the state controller
    const stateControllerPubKey = "0x55419a2a5a78703a31b00dc1d2c0c463df372728e4b36560ce6fd38255f05bfa";
    const stateControllerPrivateKey = "0xa060fffb21412a1d1a1afee3e0f4a3ac152a0098bbf1c5096bfad72e45fa4e4455419a2a5a78703a31b00dc1d2c0c463df372728e4b36560ce6fd38255f05bfa";

    // Address that holds the native tokens to be melted
    const nativeTokenOwnerAddress = "0xc84133667de5987631c7d41d6fef4018865763bb729fbd9cc3319acc53fd1d71";
    const nativeTokenOwnerAddressBech32 = "rms1qryyzvmx0hjesa33cl2p6ml0gqvgv4mrhdefl0vucvce4nznl5whz7wycrr";
    const nativeTokenOwnerPubKey = "0xa5e76ad7bc824a679587a198def6166096331f1ba31cb700b550b38ff15db9b4";
    const nativeTokenOwnerPrivateKey = "0xc4e210cfc803a546a25d031cc869fdda21888c0fcc743597b9742da7952d05f5a5e76ad7bc824a679587a198def6166096331f1ba31cb700b550b38ff15db9b4";

    const inputs: IUTXOInput[] = [];

    // Our transaction will involve the three types of Output
    const outputs: (IAliasOutput | IFoundryOutput | IBasicOutput)[] = [];

    const indexerPlugin = new IndexerPluginClient(client);
    const outputList = await indexerPlugin.alias(aliasId);
    const consumedOutputID = outputList.items[0];
    console.log("Consumed Output Id", consumedOutputID);

    const initialAliasOutputDetails = await client.output(consumedOutputID);
    const initialAliasOutput: IAliasOutput = initialAliasOutputDetails.output as IAliasOutput;

    // Output 1. Alias output. 
    const nextAliasOutput: IAliasOutput = JSON.parse(JSON.stringify(initialAliasOutput));
    nextAliasOutput.stateIndex++;

    const aliasIdBech32 = Bech32Helper.toBech32(ALIAS_ADDRESS_TYPE,
        Converter.hexToBytes(aliasId), protocolInfo.bech32Hrp);
    const foundryList = await indexerPlugin.foundries({
        aliasAddressBech32: aliasIdBech32
    });
    if (foundryList.items.length === 0) {
        throw new Error("Foundry Output not found");
    }

    const foundryOutputID = foundryList.items[0];

    const initialFoundryOutputDetails = await client.output(foundryOutputID);
    const initialFoundryOutput: IFoundryOutput = initialFoundryOutputDetails.output as IFoundryOutput;

    // Output 2. Foundry Output
    const nextFoundryOutput: IFoundryOutput = JSON.parse(JSON.stringify(initialFoundryOutput));

    const outputWithTokensToMeltList = await indexerPlugin.basicOutputs({
        addressBech32: nativeTokenOwnerAddressBech32,
        hasNativeTokens: true
    });

    if (outputWithTokensToMeltList.items.length === 0) {
        throw new Error("There are no outputs with native tokens");
    }

    const tokenClassId: string = TransactionHelper.constructTokenId(
        initialAliasOutput.aliasId,
        initialFoundryOutput.serialNumber,
        initialFoundryOutput.tokenScheme.type
    );

    // We assume the first one is the right one
    const outputWithTokensToMeltID = outputWithTokensToMeltList.items[0];
    const outputWithTokensToMeltDetails = await client.output(outputWithTokensToMeltID);
    const outputWithTokensToMelt = outputWithTokensToMeltDetails.output as IBasicOutput;

    if (!outputWithTokensToMelt.nativeTokens?.some(element => element.id === tokenClassId)) {
        throw new Error("Unexpected token class Id");
    }


    const index = outputWithTokensToMelt.nativeTokens?.findIndex(element => element.id === tokenClassId);

    // Assigning the melted tokens
    nextFoundryOutput.tokenScheme.meltedTokens = outputWithTokensToMelt.nativeTokens[index].amount;

    const remainderOutput = JSON.parse(JSON.stringify(outputWithTokensToMelt)) as IBasicOutput;

    // No longer have native tokens
    const found = false;
    remainderOutput.nativeTokens = remainderOutput.nativeTokens?.filter((element) => {
        element.id !== tokenClassId
    });

    inputs.push(TransactionHelper.inputFromOutputId(consumedOutputID));
    inputs.push(TransactionHelper.inputFromOutputId(foundryOutputID));
    inputs.push(TransactionHelper.inputFromOutputId(outputWithTokensToMeltID));

    outputs.push(nextAliasOutput);
    outputs.push(nextFoundryOutput);
    outputs.push(remainderOutput);

    // 4. Get inputs commitment
    const inputsCommitment = TransactionHelper.getInputsCommitment([
        initialAliasOutput, initialFoundryOutput, outputWithTokensToMelt]);

    // 5.Create transaction essence
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
    console.log("Essence Hash", essenceHash);

    console.log("Transaction Essence: ", transactionEssence);

    // Main unlock signature 
    const unlockSignature: ISignatureUnlock = {
        type: SIGNATURE_UNLOCK_TYPE,
        signature: {
            type: ED25519_SIGNATURE_TYPE,
            publicKey: stateControllerPubKey,
            signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(stateControllerPrivateKey), essenceHash), true)
        }
    };

    const unlockFoundry: IAliasUnlock = {
        type: ALIAS_UNLOCK_TYPE,
        reference: 0
    };

    const unlockTokens: ISignatureUnlock = {
        type: SIGNATURE_UNLOCK_TYPE,
        signature: {
            type: ED25519_SIGNATURE_TYPE,
            publicKey: nativeTokenOwnerPubKey,
            signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(nativeTokenOwnerPrivateKey), essenceHash), true)
        }
    };

    const transactionPayload: ITransactionPayload = {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence: transactionEssence,
        unlocks: [unlockSignature, unlockFoundry, unlockTokens]
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
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
