import { Blake2b, Ed25519 } from "@iota/crypto.js";
import {
    ADDRESS_UNLOCK_CONDITION_TYPE,
    BASIC_OUTPUT_TYPE,
    DEFAULT_PROTOCOL_VERSION,
    ED25519_ADDRESS_TYPE,
    ED25519_SIGNATURE_TYPE,
    IBasicOutput,
    IBlock,
    IndexerPluginClient,
    INftOutput,
    IReferenceUnlock,
    ISignatureUnlock,
    IStorageDepositReturnUnlockCondition,
    ITransactionEssence,
    ITransactionPayload,
    IUTXOInput,
    SIGNATURE_UNLOCK_TYPE,
    SingleNodeClient,
    STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
    TransactionHelper,
    TRANSACTION_ESSENCE_TYPE,
    TRANSACTION_PAYLOAD_TYPE,
    REFERENCE_UNLOCK_TYPE,
    IEd25519Address
} from "@iota/iota.js";
import { NeonPowProvider } from "@iota/pow-neon.js";
import { Converter, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";

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

    const nftOwnerAddr = "0x57d3ca802911dc5dfd505cc0ce9c0493b7183094db6ae441a4b6950368ef22d8";
    const nftOwnerBech32Addr = "rms1qpta8j5q9ygach0a2pwvpn5uqjfmwxpsjndk4ezp5jmf2qmgau3dstanlce";
    const nftOwnerPubKey = "0xd38f099d7a23bf5d068c8f046c6f59f4a7a516bef96ab45e0072be25f80aca3b";
    const nftOwnerPrivateKey = "0xc2be39ff640e86a672768cd71c8942ffb728b1965970d603bcaa7f5c3120e16bd38f099d7a23bf5d068c8f046c6f59f4a7a516bef96ab45e0072be25f80aca3b";

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
    nextNftOutput.unlockConditions = nextNftOutput.unlockConditions.filter(
        (condition) => condition.type !== STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE
    );

    nextNftOutput.nftId = nftId;
    nextNftOutput.amount = "0";

    const refundCondition = initialNftOutput.unlockConditions[1] as IStorageDepositReturnUnlockCondition;

    const refundToBePerformed = bigInt(refundCondition.amount);

    const refundOutput: IBasicOutput = {
        type: BASIC_OUTPUT_TYPE,
        amount: refundToBePerformed.toString(),
        unlockConditions: [
            {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: (refundCondition.returnAddress as IEd25519Address).pubKeyHash
                }
            }
        ]
    };

    console.log("Refund", refundOutput.amount);

    // Calculate storage deposit
    const depositNft = bigInt(TransactionHelper.getStorageDeposit(nextNftOutput, nodeInfo.protocol.rentStructure));
    nextNftOutput.amount = depositNft.toString();

    console.log("NFT Cost", nextNftOutput.amount);

    // Remainder Output
    const remainderOutput: IBasicOutput = {
        type: BASIC_OUTPUT_TYPE,
        amount: "0",
        unlockConditions: [
            {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: nftOwnerAddr
                }
            }
        ]
    };

    const remainderOutputCost = bigInt(TransactionHelper.getStorageDeposit(remainderOutput, nodeInfo.protocol.rentStructure));

    const totalCost = depositNft.plus(remainderOutputCost);

    const basicOutputList = await indexerPlugin.basicOutputs({
        addressBech32: nftOwnerBech32Addr
    });

    let costsOutput: IBasicOutput | undefined;
    let costsOutputId: string | undefined;
    for (const basicOutput of basicOutputList.items) {
        const theOutput = await client.output(basicOutput)
        if (theOutput.metadata.isSpent === false) {
            const output = theOutput.output as IBasicOutput;
            const amount = bigInt(output.amount);
            if (amount.greater(totalCost)) {
                costsOutputId = basicOutput;
                costsOutput = output;
                break;
            }
        }
    }

    if (!costsOutput) {
        throw new Error("No Outputs found to refund and cover costs");
    }

    remainderOutput.amount = bigInt(costsOutput.amount).minus(depositNft).toString();

    console.log("Remainder", remainderOutput.amount);

    const inputs: IUTXOInput[] = [];
    const outputs: (INftOutput | IBasicOutput)[] = [];

    inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));
    inputs.push(TransactionHelper.inputFromOutputId(costsOutputId as string));

    outputs.push(nextNftOutput);
    outputs.push(refundOutput);
    outputs.push(remainderOutput);

    const inputsCommitment = TransactionHelper.getInputsCommitment([initialNftOutput, costsOutput]);

    console.log("Input NFT", initialNftOutput.amount);
    console.log("Input Basic", costsOutput.amount);

    const transactionEssence: ITransactionEssence = {
        type: TRANSACTION_ESSENCE_TYPE,
        networkId: TransactionHelper.networkIdFromNetworkName(nodeInfo.protocol.networkName),
        inputs,
        inputsCommitment,
        outputs
    };

   const essenceHash = TransactionHelper.getTransactionEssenceHash(transactionEssence);

    // NFT unlock condition 
    const unlockConditionNft: ISignatureUnlock = {
        type: SIGNATURE_UNLOCK_TYPE,
        signature: {
            type: ED25519_SIGNATURE_TYPE,
            publicKey: nftOwnerPubKey,
            signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(nftOwnerPrivateKey), essenceHash), true)
        }
    };

    const unlockConditionCost: IReferenceUnlock = {
        type: REFERENCE_UNLOCK_TYPE,
        reference: 0
    };

    const transactionPayload: ITransactionPayload = {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence: transactionEssence,
        unlocks: [unlockConditionNft, unlockConditionCost]
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
