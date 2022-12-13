import { Blake2b, Ed25519 } from "@iota/crypto.js";
import {
    DEFAULT_PROTOCOL_VERSION,
    ED25519_SIGNATURE_TYPE,
    IAliasOutput,
    IBlock,
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

// The aliasId on the Ledger 
const aliasId = process.argv[2];
if (!aliasId) {
    console.error("Please provide an alias Id to perform transition");
    process.exit(-1);
}


async function run() {
    const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });
    const protocolInfo = await client.protocolInfo();

    const stateControllerPubKey = "0x55419a2a5a78703a31b00dc1d2c0c463df372728e4b36560ce6fd38255f05bfa";
    const stateControllerPrivateKey = "0xa060fffb21412a1d1a1afee3e0f4a3ac152a0098bbf1c5096bfad72e45fa4e4455419a2a5a78703a31b00dc1d2c0c463df372728e4b36560ce6fd38255f05bfa";

    const inputs: IUTXOInput[] = [];
    const outputs: IAliasOutput[] = [];

    const indexerPlugin = new IndexerPluginClient(client);
    const outputList = await indexerPlugin.alias(aliasId);
    const consumedOutputId = outputList.items[0];
    console.log("Consumed Output Id", consumedOutputId);

    const initialAliasOutputDetails = await client.output(consumedOutputId);

    const initialAliasOutput: IAliasOutput = initialAliasOutputDetails.output as IAliasOutput;

    // New output. Alias output. 
    const nextAliasOutput: IAliasOutput = JSON.parse(JSON.stringify(initialAliasOutput));
    nextAliasOutput.stateIndex++;
    nextAliasOutput.stateMetadata = "0x987654";
    console.log("New state index: ", nextAliasOutput.stateIndex);
    nextAliasOutput.aliasId = aliasId;

    inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));
    outputs.push(nextAliasOutput);

    // 4. Get inputs commitment
    const inputsCommitment = TransactionHelper.getInputsCommitment([initialAliasOutput]);

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
            publicKey: stateControllerPubKey,
            signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(stateControllerPrivateKey), essenceHash), true)
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
}


run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
