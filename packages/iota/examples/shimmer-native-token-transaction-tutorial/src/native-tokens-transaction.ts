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
    IReferenceUnlock,
    ISignatureUnlock,
    ITransactionEssence,
    ITransactionPayload,
    IUTXOInput,
    REFERENCE_UNLOCK_TYPE,
    serializeTransactionEssence,
    SIGNATURE_UNLOCK_TYPE,
    SingleNodeClient,
    TransactionHelper,
    TRANSACTION_ESSENCE_TYPE,
    TRANSACTION_PAYLOAD_TYPE,
} from "@iota/iota.js";
import { NeonPowProvider } from "@iota/pow-neon.js";
import { Converter, HexHelper, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";

const API_ENDPOINT = "https://api.testnet.shimmer.network";

async function run() {
    const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });
    const nodeInfo = await client.info();

    // The source address that controls an output with native tokens
    const sourceAddress = "0x647f7a9fd831c6e6034e7e5496a50aed17ef7d2add200bb4cfde7649ce2b0aaf";
    const sourceAddressBech32 = "rms1qpj8775lmqcudesrfel9f949ptk30mma9twjqza5el08vjww9v927ywt70u";
    const sourceAddressPublicKey = "0x55419a2a5a78703a31b00dc1d2c0c463df372728e4b36560ce6fd38255f05bfa";
    const sourceAddressPrivateKey = "0xa060fffb21412a1d1a1afee3e0f4a3ac152a0098bbf1c5096bfad72e45fa4e4455419a2a5a78703a31b00dc1d2c0c463df372728e4b36560ce6fd38255f05bfa";

    // The address that will receive the native tokens in an output
    const destAddress = "0xc84133667de5987631c7d41d6fef4018865763bb729fbd9cc3319acc53fd1d71";

    // We are going to have two inputs
    const inputs: IUTXOInput[] = [];
    // We are going to generate three outputs
    const outputs: IBasicOutput[] = [];

    const indexerPlugin = new IndexerPluginClient(client);
    const outputList = await indexerPlugin.basicOutputs({
        addressBech32: sourceAddressBech32,
        hasNativeTokens: true
    });

    if (outputList.items.length === 0) {
        throw new Error("No output with native tokens found on the source address");
    }

    const consumedOutputNativeTokensID = outputList.items[0];
    const consumedOutputNativeTokensDetails = await client.output(consumedOutputNativeTokensID);
    const theOutput = consumedOutputNativeTokensDetails.output as IBasicOutput;

    if (!Array.isArray(theOutput.nativeTokens)) {
        throw new Error("No native tokens to spend");
    }

    // 12 native tokens will be transferred
    const nativeAmountTransferred = bigInt(12);

    const currentNativeAmount = HexHelper.toBigInt256(theOutput.nativeTokens[0].amount);
    const remainingNativeAmount = currentNativeAmount.minus(nativeAmountTransferred);

    if (remainingNativeAmount.lesser(bigInt(0))) {
        throw new Error("Not enough funds");
    }

    inputs.push(TransactionHelper.inputFromOutputId(consumedOutputNativeTokensID));

    // Output that will hold some native tokens
    const nativeTokensOutput: IBasicOutput = {
        type: BASIC_OUTPUT_TYPE,
        // We don't know yet
        amount: "0",
        nativeTokens: [{
            id: theOutput.nativeTokens[0].id,
            amount: HexHelper.fromBigInt256(nativeAmountTransferred)
        }],
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

    // Output that will keep the remaining native tokens
    const remainderNativeTokensOutput: IBasicOutput = {
        type: BASIC_OUTPUT_TYPE,
        // Amount is the same as we are not spending any protocol-defined tokens
        amount: theOutput.amount,
        nativeTokens: [{
            id: theOutput.nativeTokens[0].id,
            amount: HexHelper.fromBigInt256(remainingNativeAmount)
        }],
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

    // Now we need to calculate the storage cost of the new output holding tokens
    const nativeTokensOutputStorageDeposit = TransactionHelper.
        getStorageDeposit(nativeTokensOutput, nodeInfo.protocol.rentStructure);
    nativeTokensOutput.amount = nativeTokensOutputStorageDeposit.toString();

    // The remaining output remains in the origin address
    const remainderStorageBasicOutput: IBasicOutput = {
        type: BASIC_OUTPUT_TYPE,
        // We don't know yet
        amount: "0",
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

    const remainderStorageDeposit = TransactionHelper.
        getStorageDeposit(remainderStorageBasicOutput, nodeInfo.protocol.rentStructure);
    const minimumNeeded = bigInt(nativeTokensOutputStorageDeposit).plus(bigInt(remainderStorageDeposit));

    // We need to find an output with enough funds to cover the storage costs
    const outputList2 = await indexerPlugin.basicOutputs({
        addressBech32: sourceAddressBech32,
        hasNativeTokens: false
    });

    if (outputList2.items.length === 0) {
        throw new Error("There are no outputs that can cover the storage cost");
    }

    let storageCostsOutput: IBasicOutput | undefined = undefined;
    let storageCostsOutputID: string | undefined = undefined;
    for (const output of outputList2.items) {
        const outputData = await client.output(output);
        const outputAmount = bigInt(outputData.output.amount);
        // We are not treating the case where the output amount is equal to the storage cost
        if (outputAmount.greater(minimumNeeded)) {
            storageCostsOutput = outputData.output as IBasicOutput;
            storageCostsOutputID = output;
            break;
        }
    }

    if (!storageCostsOutput) {
        throw new Error("There are no outputs that can cover the storage cost");
    }

    console.log("Output used to cover the storage costs: ", storageCostsOutputID);

    const remainderAmount = bigInt(storageCostsOutput.amount).minus(bigInt(nativeTokensOutputStorageDeposit));
    remainderStorageBasicOutput.amount = remainderAmount.toString();

    inputs.push(TransactionHelper.inputFromOutputId(storageCostsOutputID as string));

    outputs.push(nativeTokensOutput);
    outputs.push(remainderNativeTokensOutput);
    outputs.push(remainderStorageBasicOutput);

    // 4. Get inputs commitment
    const inputsCommitment = TransactionHelper.
        getInputsCommitment([consumedOutputNativeTokensDetails.output, storageCostsOutput]);

    // 5.Create transaction essence
    const transactionEssence: ITransactionEssence = {
        type: TRANSACTION_ESSENCE_TYPE,
        networkId: TransactionHelper.networkIdFromNetworkName(nodeInfo.protocol.networkName),
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

    // Main unlock 
    const unlockSignature: ISignatureUnlock = {
        type: SIGNATURE_UNLOCK_TYPE,
        signature: {
            type: ED25519_SIGNATURE_TYPE,
            publicKey: sourceAddressPublicKey,
            signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(sourceAddressPrivateKey), essenceHash), true)
        }
    };

    // Same unlock
    const unlockRef: IReferenceUnlock = {
        type: REFERENCE_UNLOCK_TYPE,
        reference: 0
    };

    const transactionPayload: ITransactionPayload = {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence: transactionEssence,
        unlocks: [unlockSignature, unlockRef]
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

    console.log(blockId);
}


run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
