import { Blake2b, Ed25519 } from "@iota/crypto.js";
import {
    ADDRESS_UNLOCK_CONDITION_TYPE,
    ALIAS_ADDRESS_TYPE,
    BASIC_OUTPUT_TYPE,
    DEFAULT_PROTOCOL_VERSION,
    ED25519_ADDRESS_TYPE,
    ED25519_SIGNATURE_TYPE,
    FOUNDRY_OUTPUT_TYPE,
    IAliasOutput,
    IBasicOutput,
    IBlock,
    IFoundryOutput,
    IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
    IndexerPluginClient,
    ISignatureUnlock,
    ISimpleTokenScheme,
    ITransactionEssence,
    ITransactionPayload,
    IUTXOInput,
    serializeTransactionEssence,
    SIGNATURE_UNLOCK_TYPE,
    SIMPLE_TOKEN_SCHEME_TYPE,
    SingleNodeClient,
    TransactionHelper,
    TRANSACTION_ESSENCE_TYPE,
    TRANSACTION_PAYLOAD_TYPE,
} from "@iota/iota.js";
import { NeonPowProvider } from "@iota/pow-neon.js";
import { Converter, HexHelper, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";

const API_ENDPOINT = "https://api.testnet.shimmer.network";

// The alias Id 
const aliasId = process.argv[2];
if (!aliasId) {
    console.error("Please provide your Alias Id that has enough funds");
    process.exit(-1);
}

async function run() {
    const client = new SingleNodeClient(API_ENDPOINT, { powProvider: new NeonPowProvider() });
    const nodeInfo = await client.info();
    // Ed25519 Addresses (PubKeyHash)
    const stateControllerAddress = "0x647f7a9fd831c6e6034e7e5496a50aed17ef7d2add200bb4cfde7649ce2b0aaf";
    // Key pair of the state controller
    const stateControllerPubKey = "0x55419a2a5a78703a31b00dc1d2c0c463df372728e4b36560ce6fd38255f05bfa";
    const stateControllerPrivateKey = "0xa060fffb21412a1d1a1afee3e0f4a3ac152a0098bbf1c5096bfad72e45fa4e4455419a2a5a78703a31b00dc1d2c0c463df372728e4b36560ce6fd38255f05bfa";

    // Address that will receive the initial amount of minted native tokens
    const nativeTokenOwnerAddress = "0x647f7a9fd831c6e6034e7e5496a50aed17ef7d2add200bb4cfde7649ce2b0aaf";

    const inputs: IUTXOInput[] = [];

    // Our transaction will involve the three types of Output
    const outputs: (IAliasOutput | IFoundryOutput | IBasicOutput)[] = [];

    const indexerPlugin = new IndexerPluginClient(client);
    const outputList = await indexerPlugin.alias(aliasId);
    const consumedOutputId = outputList.items[0];
    console.log("Consumed Output Id", consumedOutputId);

    const initialAliasOutputDetails = await client.output(consumedOutputId);

    const initialAliasOutput: IAliasOutput = initialAliasOutputDetails.output as IAliasOutput;

    // New output. Alias output. 
    const nextAliasOutput: IAliasOutput = JSON.parse(JSON.stringify(initialAliasOutput));
    nextAliasOutput.stateIndex++;
    nextAliasOutput.aliasId = aliasId;
    nextAliasOutput.amount = "0";
    nextAliasOutput.foundryCounter = 1;

    const mintedAmount = 128;
    const totalAmount = 512;
    const tokenScheme: ISimpleTokenScheme = {
        type: SIMPLE_TOKEN_SCHEME_TYPE,
        mintedTokens: HexHelper.fromBigInt256(bigInt(mintedAmount)),
        meltedTokens: HexHelper.fromBigInt256(bigInt(0)),
        maximumSupply: HexHelper.fromBigInt256(bigInt(totalAmount)),
    };

    const foundryOutput: IFoundryOutput = {
        type: FOUNDRY_OUTPUT_TYPE,
        amount: "0", // Not known yet
        serialNumber: 1,
        tokenScheme,
        unlockConditions: [
            {
                // Foundry supports only this unlock condition!
                // It will be controlled through its lifetime by out alias
                type: IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ALIAS_ADDRESS_TYPE,
                    aliasId
                }
            }
        ]
    };

    const tokenClassId: string = TransactionHelper.constructTokenId(
        nextAliasOutput.aliasId,
        foundryOutput.serialNumber,
        foundryOutput.tokenScheme.type
    );

    const tokenFundsOutput: IBasicOutput = {
        type: BASIC_OUTPUT_TYPE,
        amount: "0", // Not known yet
        nativeTokens: [
            // We put all minted tokens in this output
            {
                // tokenId is (serialized) controlling alias address + serialNumber + tokenSchemeType
                id: tokenClassId,
                amount: HexHelper.fromBigInt256(bigInt(mintedAmount))
            }
        ],
        unlockConditions: [
            // Send it to the target address
            {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: nativeTokenOwnerAddress
                }
            }
        ]
    }

    // Now we can calculate the storage deposits
    const foundryStorageDeposit = TransactionHelper.getStorageDeposit(foundryOutput, nodeInfo.protocol.rentStructure);
    const tokenFundsStorageDeposit = TransactionHelper.getStorageDeposit(tokenFundsOutput, nodeInfo.protocol.rentStructure);

    const totalStorageFunds = bigInt(foundryStorageDeposit).plus(bigInt(tokenFundsStorageDeposit));

    const initialFunds = bigInt(initialAliasOutput.amount);

    if (initialFunds.lesser(totalStorageFunds)) {
        throw new Error("Initial funds not enough to cover for storage deposits");
    }

    console.log("Required Storage Deposit of the Foundry output: ", foundryStorageDeposit);

    // Update amounts in outputs. Only leave the bare minimum in the alias and the foundry
    nextAliasOutput.amount = initialFunds.minus(totalStorageFunds).toString();
    foundryOutput.amount = foundryStorageDeposit.toString();
    tokenFundsOutput.amount = tokenFundsStorageDeposit.toString();

    inputs.push(TransactionHelper.inputFromOutputId(consumedOutputId));
    outputs.push(nextAliasOutput);
    outputs.push(foundryOutput);
    outputs.push(tokenFundsOutput);


    // 4. Get inputs commitment
    const inputsCommitment = TransactionHelper.getInputsCommitment([initialAliasOutput]);

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
    console.log("Native Token Id", tokenClassId);
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
