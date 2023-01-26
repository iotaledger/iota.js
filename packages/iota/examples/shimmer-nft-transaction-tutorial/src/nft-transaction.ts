import { Blake2b, Ed25519 } from "@iota/crypto.js";
import {
    ADDRESS_UNLOCK_CONDITION_TYPE,
    DEFAULT_PROTOCOL_VERSION,
    ED25519_ADDRESS_TYPE,
    ED25519_SIGNATURE_TYPE,
    IBlock,
    IndexerPluginClient,
    INftOutput,
    ISignatureUnlock,
    ITransactionEssence,
    ITransactionPayload,
    IUTXOInput,
    SIGNATURE_UNLOCK_TYPE,
    SingleNodeClient,
    STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
    TransactionHelper,
    TRANSACTION_ESSENCE_TYPE,
    TRANSACTION_PAYLOAD_TYPE,
} from "@iota/iota.js";
import { NeonPowProvider } from "@iota/pow-neon.js";
import { Converter, WriteStream } from "@iota/util.js";

const API_ENDPOINT = "https://api.testnet.shimmer.network";

// The aliasId on the Ledger 
const nftId = process.argv[2];
if (!nftId) {
    console.error("Please provide an NFT ID to perform transition");
    process.exit(-1);
}

async function run() {
    const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });
    const nodeInfo = await client.info();

    const nftOwnerAddr = "0x62c02a68b2efce54a452a114ab2affa940f776b362a67fc4453e0cf757a33596";
    const nftOwnerPubKey = "0x91dbbfb5372a9ee9addb2c909e1e4c60ddb5d22c11da19d00482e229af3ef724";
    const nftOwnerPrivateKey = "0x22f67a6b7b80215638e367857afdda48d16dcf79af0edf9cd3aeaa704fb2aed191dbbfb5372a9ee9addb2c909e1e4c60ddb5d22c11da19d00482e229af3ef724";

    const nftBuyerAddr = "0x57d3ca802911dc5dfd505cc0ce9c0493b7183094db6ae441a4b6950368ef22d8";

    const inputs: IUTXOInput[] = [];
    const outputs: INftOutput[] = [];

    const indexerPlugin = new IndexerPluginClient(client);
    const outputList = await indexerPlugin.nft(nftId);
    if (outputList.items.length === 0) {
        throw new Error ("NFT not found");
    }

    const consumedOutputId = outputList.items[0];
    console.log("Consumed Output Id", consumedOutputId);

    const initialNftOutputDetails = await client.output(consumedOutputId);

    const initialNftOutput: INftOutput = initialNftOutputDetails.output as INftOutput;

    // New output. NFT output. 
    const nextNftOutput: INftOutput = JSON.parse(JSON.stringify(initialNftOutput));
    nextNftOutput.unlockConditions = [
        {
            type: ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: nftBuyerAddr
            }
        },
        {
            type: STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
            amount: nextNftOutput.amount,
            returnAddress: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: nftOwnerAddr
            }
        }
    ];

    nextNftOutput.nftId = nftId;

    inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));
    outputs.push(nextNftOutput);

    // 4. Get inputs commitment
    const inputsCommitment = TransactionHelper.getInputsCommitment([initialNftOutput]);

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
            publicKey: nftOwnerPubKey,
            signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(nftOwnerPrivateKey), essenceHash), true)
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
