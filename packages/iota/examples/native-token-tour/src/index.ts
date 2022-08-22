import * as lib from "@iota/iota.js"
import { Converter, WriteStream, HexHelper } from "@iota/util.js";
import { Bip32Path, Ed25519 } from "@iota/crypto.js";
import { NeonPowProvider } from "@iota/pow-neon.js";
import * as readline from 'readline';
import { randomBytes } from "crypto";
import Prom from "bluebird";
import bigInt from "big-integer";
import * as console from "console";
import fetch from "node-fetch";

const EXPLORER = "https://explorer.alphanet.iotaledger.net/alphanet";
const API_ENDPOINT = "https://api.alphanet.iotaledger.net/";
const FAUCET = "https://faucet.alphanet.iotaledger.net/api/enqueue" 

// If running the node locally
// const API_ENDPOINT = "http://localhost:14265/";
// const FAUCET = "http://localhost:8091/api/enqueue"; 


/*******************************
 In this example we will explore native tokens:
 - minting native token
 - transferring without unlock condition
 - transferring with unlock condition
 - minting new tokens via foundry
 - melting tokens via foundry
 - burning tokens
 - locking away token supply
 - consolidate everything to target address
 *******************************/

// Amount of tokens to mint for now
const mintAmount = 1000;
// Maximum supply recorded in the foundry
const maxSupply = 10000;

// context to help passing values between different stages
interface IContext {
    // client to communicate with the network
    client?: lib.SingleNodeClient,
    // Hex encoded pubic key hash of the wallet
    walletAddressHex?: string,
    // Private-public key pair of the wallet
    walletKeyPair?: lib.IKeyPair,
    // Address of the hot wallet encoded in bech32
    walletAddressBech32?: string,
    // Target pubkeyHash where to consolidate in the last step
    targetAddressHex?: string,
    // Target address as an iota.js address type
    targetAddress?: lib.AddressTypes,
    // info about the node/protocol
    info?: lib.INodeInfo
    // maps to help us locate outputs
    outputById?: Map<string, lib.OutputTypes>,
    outputIdByName?: Map<string, string>,
    outputByName?: Map<string, lib.OutputTypes>,
    // list of transactions in chaining order
    txList?: Array<lib.ITransactionPayload>,
    // networkId calculated form networkName
    networkId?: string
}

// local context
let ctx: IContext = {};

// In this example we set up a hot wallet, fund it with tokens from the faucet and let it prepare s
async function run() {
    // init context
    ctx.outputById = new Map<string, lib.OutputTypes>();
    ctx.outputIdByName = new Map<string, string>();
    ctx.outputByName = new Map<string, lib.OutputTypes>();
    ctx.txList = [];
    // We don't define a local pow provider because we will calculate pow by hand
    ctx.client = new lib.SingleNodeClient(API_ENDPOINT);
    // fetch basic info from node
    ctx.info = await ctx.client.info();
    // Calculate networkId
    ctx.networkId = lib.TransactionHelper.networkIdFromNetworkName(ctx.info.protocol.networkName);

    // Ask for the target address
    const targetAddressBech32 = await askQuestion("Target address (Bech32 encoded) where to mint the tokens or leave empty and we will generate an address for you: ");

    // Parse bech32 encoded address into iota address
    try {
         const tmp = lib.Bech32Helper.fromBech32(targetAddressBech32, ctx.info.protocol.bech32Hrp);
         if (!tmp){
             throw new Error("Can't decode target address.");
         }
        // Parse bech32 encoded address into iota address
        ctx.targetAddress = lib.Bech32Helper.addressFromBech32(targetAddressBech32, ctx.info.protocol.bech32Hrp);
    } catch (error) {
        // If target address is not provided we are going to set up an account for this demo.
        console.log("Target Address:");
        const [addressHex, addressBech32, addressKeyPair] = await setUpHotWallet(ctx.info.protocol.bech32Hrp);
        ctx.targetAddress = lib.Bech32Helper.addressFromBech32(addressBech32, ctx.info.protocol.bech32Hrp);
    }

    // Now it's time to set up an account for this demo. We generate a random seed and set up a hot wallet called "Main"
    console.log("Setting up Main wallet...");
    [ctx.walletAddressHex, ctx.walletAddressBech32, ctx.walletKeyPair] = await setUpHotWallet(ctx.info.protocol.bech32Hrp);

    // We also top up the address by asking funds from the faucet.
    await requestFundsFromFaucet(ctx.walletAddressBech32);

    // Fetch outputId with funds to be used as input from the Indexer API
    const indexerPluginClient = new lib.IndexerPluginClient(ctx.client);
    // Indexer returns outputIds of matching outputs. We are only interested in the first one coming from the faucet.
    const outputId = await fetchAndWaitForBasicOutput(ctx.walletAddressBech32, indexerPluginClient);

    // Fetch the output itself from the core API
    const resp = await ctx.client.output(outputId);
    // We start from one Basic Output that we own, Our journey starts with the genesis.
    const genesisOutput = resp.output;

    /****************************************************************************************
     * Current output ownership:
     *   - Main Hot Wallet: [genesisOutput]
     ****************************************************************************************/

    /************************************
     * 1. Prepare a transaction that creates an alias
     *  - input: basic output received from faucet
     *  - output: minted alias
     ************************************/
    console.log("Creating an alias...");
    let txPayload1 = mintAliasTx(genesisOutput, outputId, ctx.walletAddressHex, ctx.walletKeyPair, ctx.info);
    ctx.txList.push(txPayload1);

    /****************************************************************************************
     * Current output ownership:
     *   - Main Hot Wallet: [tx1Alias]
     ****************************************************************************************/

    /************************************
     * 2. Ready with the alias minting tx, now we have to prepare the second tx that:
     * - transitions the alias
     * - creates the foundry
     * - mints tokens
     ************************************/
    console.log("Creating a foundry, minting native tokens...");
    let txPayload2 = createFoundryMintTokenTx(getOutput("tx1Alias"), getOutputId("tx1Alias"), ctx.walletKeyPair, ctx.info, lib.Bech32Helper.addressFromBech32(ctx.walletAddressBech32, ctx.info.protocol.bech32Hrp));
    ctx.txList.push(txPayload2);

    /****************************************************************************************
     * Current output ownership:
     *   - Main Hot Wallet: [tx2Alias, tx2Foundry, tx2Basic(mintAmount NTs)]
     ****************************************************************************************/

    /*********************************
     * Set up another wallet so we can send token around internally
     *********************************/
    console.log("Setting up Receiver wallet...");
    let receiverWallet = {
        hex: "",
        bech32: "",
        keyPair: {
            publicKey: new Uint8Array(),
            privateKey: new Uint8Array()
        }
    };

    [receiverWallet.hex, receiverWallet.bech32, receiverWallet.keyPair] = await setUpHotWallet(ctx.info.protocol.bech32Hrp);

    // We also top up the receiver address by asking funds from the faucet.
    await requestFundsFromFaucet(receiverWallet.bech32);

    // Indexer returns outputIds of matching outputs. We are only interested in the first one coming from the faucet.
    const receiverOwnedOutputId = await fetchAndWaitForBasicOutput(receiverWallet.bech32, indexerPluginClient);

    // Fetch the output itself from the core API
    const receiverResponse = await ctx.client.output(receiverOwnedOutputId);
    // We start from one Basic Output that we own, Our journey starts with the genesis.
    const receiverGenesisOutput = receiverResponse.output;

    /****************************************************************************************
     * Current output ownership:
     *   - Main Hot Wallet: [tx2Alias, tx2Foundry, tx2Basic(mintAmount NTs)]
     *   - Receiver Hot Wallet: [receiverGenesisOutput]
     ****************************************************************************************/

    /************************************
     * 3. Transfer native tokens without unlock conditions: letting go of the storage deposit
     * - consume basic output with native tokens from tx2
     * - create basic output to receiver address with half of the tokens
     * - create basic output to wallet address with half of the tokens
     ************************************/
    console.log("Transferring tokens without unlock conditions...");
    let txPayload3 = transferNativeTokensWithoutUnlockCondition(getOutput("tx2Basic"), getOutputId("tx2Basic"), ctx.walletAddressHex, ctx.walletKeyPair, ctx.info, lib.Bech32Helper.addressFromBech32(receiverWallet.bech32, ctx.info.protocol.bech32Hrp));
    ctx.txList.push(txPayload3);

    /****************************************************************************************
     * Current output ownership:
     *   - Main Hot Wallet: [tx2Alias, tx2Foundry, tx3Remainder(mintAmount/2 NTs)]
     *   - Receiver Hot Wallet: [receiverGenesisOutput, tx3Receiver(mintAmount/2 NTs)]
     ****************************************************************************************/

    /************************************
     * 4. Transfer native tokens with unlock condition to receiver
     * - consume basic output on wallet address with native tokens from tx3
     * - create basic output with all native tokens to receiver address + min required storage deposit
     *    - with storage deposit return unlock condition
     *    - with expiration in now + 10 minutes
     * - create basic output with remaining base currency to wallet address
     ************************************/
    console.log("Transferring tokens with expiration and storage deposit return unlock conditions...");
    let txPayload4 = transferNativeTokensWithUnlockCondition(getOutput("tx3Remainder"), getOutputId("tx3Remainder"), ctx.walletAddressHex, ctx.walletKeyPair, ctx.info, lib.Bech32Helper.addressFromBech32(receiverWallet.bech32, ctx.info.protocol.bech32Hrp))
    ctx.txList.push(txPayload4);

    /****************************************************************************************
     * Current output ownership:
     *   - Main Hot Wallet: [tx2Alias, tx2Foundry, tx4Remainder]
     *   - Receiver Hot Wallet: [receiverGenesisOutput, tx3Receiver(mintAmount/2 NTs), tx4Receiver(mintAmount/2 NTs)]
     ****************************************************************************************/

    /***********************************
     * 5. Accept conditional native token transfer from receiver wallet
     *  - consume the output with Storage Return + Expiration from tx4 on receiverAddress
     *  - consume the output holding receiver funds (receiverGenesisOutput)
     *  - create an output that holds the accepted native tokens + receiver wallet funds
     *  - create a refund output that sends back the storage deposit to walletAddress (returnAddress)
     ************************************/
    console.log("Accepting conditional transfer from Receiver wallet...");
    let txPayload5 = acceptNativeTokenTransfer(
        getOutput("tx4Receiver"),
        getOutputId("tx4Receiver"),
        receiverGenesisOutput,
        receiverOwnedOutputId,
        receiverWallet.hex,
        receiverWallet.keyPair,
        ctx.info
    );
    ctx.txList.push(txPayload5);

    /****************************************************************************************
     * Current output ownership:
     *   - Main Hot Wallet: [tx2Alias, tx2Foundry, tx4Remainder, tx5Refund]
     *   - Receiver Hot Wallet: [tx3Receiver(mintAmount/2 NTs), tx5Receiver(mintAmount/2 NTs)]
     ****************************************************************************************/

    /************************************
     * 6. Minting more tokens with the foundry
     *  - consume alias, foundry, basic output holding native tokens already from tx
     *  - create nextAlias, nextFoundry, tx6Remainder
     ************************************/
    console.log("Minting more native tokens...");
    let txPayload6 = mintMoreNativeTokens(
        getOutput("tx2Alias") as lib.IAliasOutput,
        getOutputId("tx2Alias"),
        getOutput("tx2Foundry") as lib.IFoundryOutput,
        getOutputId("tx2Foundry"),
        getOutput("tx4Remainder") as lib.IBasicOutput,
        getOutputId("tx4Remainder"),
        ctx.walletKeyPair
    );
    ctx.txList.push(txPayload6);

    /****************************************************************************************
     * Current output ownership:
     *   - Main Hot Wallet: [tx6Alias, tx6Foundry, tx5Refund, tx6Remainder(maxSupply - mintAmount NTs)]
     *   - Receiver Hot Wallet: [tx3Receiver(mintAmount/2 NTs), tx5Receiver(mintAmount/2 NTs)]
     ****************************************************************************************/

    /*************************************
     * 7. Melting tokens with foundry
     *  - consume alias, foundry and tx6Remainder(maxSupply - mintAmount NTs), so we can melt the NTs via foundry
     *  - create nextAlias, nextFoundry and a basic output
     *
     * Ownership before:
     *  - wallet: tx6Alias, tx6Foundry, tx5Refund, tx6Remainder(maxSupply - mintAmount NTs)
     *  - receiver: tx3Receiver(mintAmount/2 NTs), tx5Receiver(mintAmount/2 NTs)
     *
     * Ownership after:
     *  - wallet: tx7Alias, tx7Foundry, tx5Refund, tx7Remainder
     *  - receiver: tx3Receiver(mintAmount/2 NTs), tx5Receiver(mintAmount/2 NTs)
     ************************************/
    console.log("Melting native tokens with foundry...");
    let txPayload7 = meltNativeTokens(
        getOutput("tx6Alias") as lib.IAliasOutput,
        getOutputId("tx6Alias"),
        getOutput("tx6Foundry") as lib.IFoundryOutput,
        getOutputId("tx6Foundry"),
        getOutput("tx6Remainder") as lib.IBasicOutput,
        getOutputId("tx6Remainder"),
        ctx.walletKeyPair
    );
    ctx.txList.push(txPayload7);

    /****************************************************************************************
     * Current output ownership:
     *   - Main Hot Wallet: [tx7Alias, tx7Foundry, tx5Refund, tx7Remainder]
     *   - Receiver Hot Wallet: [tx3Receiver(mintAmount/2 NTs), tx5Receiver(mintAmount/2 NTs)]
     ****************************************************************************************/

    /***************************************
     * 8. Burning tokens (without foundry)
     *  The receiver wallet holds two outputs (tx3Receiver(mintAmount/2 NTs), tx5Receiver(mintAmount/2 NTs)) that hold native tokens.
     *  We will burn the native tokens in tx3Receiver(mintAmount/2 NTs)
     *
     *  - consume tx3Receiver(mintAmount/2 NTs)
     *  - create basic output without the native tokens
     ************************************/
    console.log("Burning native tokens without foundry...");
    let txPayload8 = burnNativeTokens(
        getOutput("tx3Receiver") as lib.IBasicOutput,
        getOutputId("tx3Receiver"),
        receiverWallet.keyPair
    );
    ctx.txList.push(txPayload8);

    /****************************************************************************************
     * Current output ownership:
     *   - Main Hot Wallet: [tx7Alias, tx7Foundry, tx5Refund, tx7Remainder]
     *   - Receiver Hot Wallet: [tx5Receiver(mintAmount/2 NTs), tx8Receiver]
     ****************************************************************************************/

    /***************************************
     * 9. Minting tokens and locking them up for vesting period
     *  Scenario: Issuer (foundry controller) mints new tokens into target account, locks the tokens away for 1 year.
     *
     *  - consume tx7Alias, tx7Foundry, tx5Refund(supplies the storage deposit to the locked away tokens)
     *  - create nextAlias, nextFoundry, basic output with locked away native tokens on targetAddress
     ************************************/
    console.log("Minting more native tokens, locking them up for vesting period...");
    let txPayload9 = mintAndLockAway(
        getOutput("tx7Alias") as lib.IAliasOutput,
        getOutputId("tx7Alias"),
        getOutput("tx7Foundry") as lib.IFoundryOutput,
        getOutputId("tx7Foundry"),
        getOutput("tx5Refund") as lib.IBasicOutput,
        getOutputId("tx5Refund"),
        ctx.targetAddress,
        ctx.walletKeyPair
    );
    ctx.txList.push(txPayload9);

    /****************************************************************************************
     * Current output ownership:
     *   - Main Hot Wallet: [tx9Alias, tx9Foundry, tx7Remainder]
     *   - Receiver Hot Wallet: [tx5Receiver(mintAmount/2 NTs), tx8Receiver]
     *   - Target Address: [tx9Timelocked(mintAmount NTs)]
     ****************************************************************************************/

    /***************************************
     * 10. Sending everything to targetAddress
     *
     *  - consume tx9Alias, tx7Remainder, tx5Receiver(mintAmount/2 NTs), tx8Receiver
     *  - create nextAlias + basic output that consolidates everything onto targetAddress
     ************************************/
    console.log("Consolidating funds on target address...");
    let txPayload10 = sendAll(
        getOutput("tx9Alias") as lib.IAliasOutput,
        getOutputId("tx9Alias"),
        getOutput("tx7Remainder") as lib.IBasicOutput,
        getOutputId("tx7Remainder"),
        getOutput("tx5Receiver") as lib.IBasicOutput,
        getOutputId("tx5Receiver"),
        getOutput("tx8Receiver") as lib.IBasicOutput,
        getOutputId("tx8Receiver"),
        ctx.targetAddress,
        ctx.walletKeyPair,
        receiverWallet.keyPair
    );
    ctx.txList.push(txPayload10);

    console.log("Done with preparing transactions");

    /****************************************************************************************
     * Current output ownership:
     *   - Main Hot Wallet: empty
     *   - Receiver Hot Wallet: empty
     *   - Target Address: [tx10Alias, tx9Foundry, tx9Timelocked(mintAmount NTs), tx10Remainder(mintAmount/2 NTs)]
     ****************************************************************************************/

    console.log("Chaining together transactions via blocks...");
    // Finally, time to prepare the three blocks, and chain them together via `parents`
    let blocks: lib.IBlock[] = await chainTrasactionsViaBlocks(ctx.client, ctx.txList, ctx.info.protocol.minPowScore);

    // send the blocks to the network
    // We calculated pow by hand, so we don't define a localPow provider for the client so it doesn't redo the pow again.
    await submit(blocks, ctx.client);
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));

/***********************************************************************************************************************
 * FUNCTIONS TO CREATE THE TRANSACTIONS
 ***********************************************************************************************************************/


/***********************************************************************************************************************
 * 1. Create alias
 * @param consumedOutput: The output that will be consumed in the tx
 * @param consumedOutputId: The id of the consumed output
 * @param walletAddressHex: The address of the wallet that controls consumed output
 * @param walletKeyPair: The keypair of the wallet that controls consumed output
 * @param info: Protocol info
 */
function mintAliasTx(consumedOutput: lib.OutputTypes, consumedOutputId: string, walletAddressHex: string, walletKeyPair: lib.IKeyPair, info: lib.INodeInfo): lib.ITransactionPayload {
    // Prepare inputs to the tx
    const input = lib.TransactionHelper.inputFromOutputId(consumedOutputId);
    // First we need to mint an alias, then we can mint the tokens, lastly we are going to transfer the alias

    // Create the outputs, that is an Alias output
    let aliasOutput: lib.IAliasOutput = {
        type: lib.ALIAS_OUTPUT_TYPE,
        amount: consumedOutput.amount,
        // when minting, this has to be set to zero. It will be set in nodes as the hash of the outputId when the tx confirms.
        // Note, that from the first spend of the Alias you have to use the actual hash of outputId
        aliasId: "0x0000000000000000000000000000000000000000000000000000000000000000",
        stateIndex: 0,
        foundryCounter: 0,
        immutableFeatures: [
            {
                type: lib.ISSUER_FEATURE_TYPE, // Issuer feature
                address: {
                    type: lib.ED25519_ADDRESS_TYPE,
                    pubKeyHash: walletAddressHex,
                },
            },
            {
                type: lib.METADATA_FEATURE_TYPE, // Metadata Feature
                data: Converter.utf8ToHex("This is where the immutable metadata goes", true)
            }
        ],
        unlockConditions: [
            {
                type: lib.STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: lib.ED25519_ADDRESS_TYPE,
                    pubKeyHash: walletAddressHex, // we keep it in the hot wallet for now
                },
            },
            {
                type: lib.GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: lib.ED25519_ADDRESS_TYPE,
                    pubKeyHash: walletAddressHex,
                },
            }
        ]
    };

    // To know the byte cost, we need to serialize the output
    const requiredStorageDeposit = lib.TransactionHelper.getStorageDeposit(aliasOutput, info.protocol.rentStructure);
    console.log("Required Storage Deposit of the Alias output: ", requiredStorageDeposit);

    // Prepare Tx essence
    const inputsCommitment = lib.TransactionHelper.getInputsCommitment([consumedOutput]);

    // Creating Transaction Essence
    const txEssence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [input],
        outputs: [aliasOutput],
        inputsCommitment: inputsCommitment,
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHash = lib.TransactionHelper.getTransactionEssenceHash(txEssence)

    // We unlock only one output, so there will be one unlock with signature
    let unlock: lib.ISignatureUnlock = {
        type: lib.SIGNATURE_UNLOCK_TYPE,
        signature: {
            type: lib.ED25519_SIGNATURE_TYPE,
            publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
            signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHash), true)
        }
    };

    // Constructing Transaction Payload
    const txPayload: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: txEssence,
        unlocks: [unlock]
    };

    // Record some info for ourselves
    let aliasOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0000";
    ctx.outputById?.set(aliasOutputId, aliasOutput);
    ctx.outputIdByName?.set("tx1Alias", aliasOutputId);
    ctx.outputByName?.set("tx1Alias", aliasOutput);

    return txPayload;
}

// Create a foundry with the help of an alias, mint native tokens and send them to user via a basic output.
// inputs: alias from prev tx
// output: alias, foundry, basic output
function createFoundryMintTokenTx(consumedOutput: lib.OutputTypes, consumedOutputId: string, walletKeyPair: lib.IKeyPair, info: lib.INodeInfo, targetAddress: lib.AddressTypes): lib.ITransactionPayload {
    const aliasInput = lib.TransactionHelper.inputFromOutputId(consumedOutputId);

    // defining the next alias output
    let nextAliasOutput = deepCopy(consumedOutput) as lib.IAliasOutput;

    // aliasId is the hash of the creating outputId
    nextAliasOutput.aliasId = lib.TransactionHelper.resolveIdFromOutputId(consumedOutputId);

    nextAliasOutput.stateIndex++; // has to be incremented for every state update tx
    nextAliasOutput.foundryCounter++; // has to be incremented every time we create a foundry

    // defining the foundry
    const foundryOutput: lib.IFoundryOutput = {
        type: lib.FOUNDRY_OUTPUT_TYPE,
        amount: "0", // we don't know yet how much we need to put here due to storage costs
        serialNumber: 1, // should correlate to current foundryCounter in alias above
        tokenScheme: {
            type: lib.SIMPLE_TOKEN_SCHEME_TYPE,
            mintedTokens: HexHelper.fromBigInt256(bigInt(mintAmount)),
            meltedTokens: HexHelper.fromBigInt256(bigInt(0)),
            maximumSupply: HexHelper.fromBigInt256(bigInt(maxSupply)),
        },
        unlockConditions: [
            {
                // Foundry supports only this unlock condition!
                // It will be controlled through its lifetime by out alias
                type: lib.IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: lib.ALIAS_ADDRESS_TYPE,
                    aliasId: nextAliasOutput.aliasId
                }
            }
        ],
        immutableFeatures: [
            {
                type: lib.METADATA_FEATURE_TYPE, // Metadata Feature
                data: Converter.utf8ToHex("This is where the immutable metadata goes", true)
            }
        ]
    }

    // Calculate tokendId
    const tokenId = lib.TransactionHelper.constructTokenId(nextAliasOutput.aliasId, foundryOutput.serialNumber, foundryOutput.tokenScheme.type);

    const remainderOutput: lib.IBasicOutput = {
        type: lib.BASIC_OUTPUT_TYPE,
        amount: "0", // we don't know yet
        nativeTokens: [
            // We put all minted tokens in this output
            {
                // tokenId is (serialized) controlling alias address + serialNumber + tokenSchemeType
                id: tokenId,
                amount: HexHelper.fromBigInt256(bigInt(mintAmount))
            }
        ],
        unlockConditions: [
            // Send it to the target address
            {
                type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
                address: targetAddress,
            }
        ]
    }

    // Now we can calculate the storage deposits
    const aliasStorageDeposit = lib.TransactionHelper.getStorageDeposit(nextAliasOutput, info.protocol.rentStructure);
    const foundryStorageDeposit = lib.TransactionHelper.getStorageDeposit(foundryOutput, info.protocol.rentStructure);
    const basicStorageDeposit = lib.TransactionHelper.getStorageDeposit(remainderOutput, info.protocol.rentStructure);

    if (parseInt(consumedOutput.amount) < aliasStorageDeposit + foundryStorageDeposit + basicStorageDeposit) {
        throw new Error("Initial funds not enough to cover for storage deposits");
    }

    console.log("Required Storage Deposit of the Foundry output: ", foundryStorageDeposit);

    // Update amounts in outputs. Only leave the bare minimum in the alias and the foundry, put the rest into the basic output
    nextAliasOutput.amount = aliasStorageDeposit.toString();
    foundryOutput.amount = foundryStorageDeposit.toString();
    remainderOutput.amount = (parseInt(consumedOutput.amount) - (aliasStorageDeposit + foundryStorageDeposit)).toString();

    // Prepare inputs commitment
    const inputsCommitmentTx2 = lib.TransactionHelper.getInputsCommitment([consumedOutput]);

    // Construct tx essence
    const tx2Essence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [aliasInput],
        outputs: [nextAliasOutput, foundryOutput, remainderOutput],
        inputsCommitment: inputsCommitmentTx2,
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHashTx2 = lib.TransactionHelper.getTransactionEssenceHash(tx2Essence)

    // We unlock only one output (the alias), so there will be one unlock with signature
    let unlockTx2: lib.ISignatureUnlock = {
        type: lib.SIGNATURE_UNLOCK_TYPE,
        signature: {
            type: lib.ED25519_SIGNATURE_TYPE,
            publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
            signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHashTx2), true)
        }
    };

    // Constructing Transaction Payload
    const txPayload2: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: tx2Essence,
        unlocks: [unlockTx2]
    };

    // Record some info for ourselves
    let aliasOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload2), true) + "0000";
    let foundryOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload2), true) + "0100";
    let basicOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload2), true) + "0200";
    ctx.outputById?.set(aliasOutputId, nextAliasOutput);
    ctx.outputIdByName?.set("tx2Alias", aliasOutputId);
    ctx.outputByName?.set("tx2Alias", nextAliasOutput);
    ctx.outputIdByName?.set("tx2Foundry", foundryOutputId);
    ctx.outputByName?.set("tx2Foundry", foundryOutput);
    ctx.outputIdByName?.set("tx2Basic", basicOutputId);
    ctx.outputByName?.set("tx2Basic", remainderOutput);

    return txPayload2;
}

// Transfer half of the native tokens to target address, keep the rest in wallet
function transferNativeTokensWithoutUnlockCondition(consumedOutput: lib.OutputTypes, consumedOutputId: string, walletAddressHex: string, walletKeyPair: lib.IKeyPair, info: lib.INodeInfo, targetAddress: lib.AddressTypes) {
    // Prepare the input object
    const input = lib.TransactionHelper.inputFromOutputId(consumedOutputId);

    const consumedBasic = consumedOutput as lib.IBasicOutput;
    if (consumedBasic.nativeTokens === undefined) {
        throw new Error("Consumed output doesn't have native tokens")
    }

    let tokenId = consumedBasic.nativeTokens[0].id;
    let availableTokenAmount = HexHelper.toBigInt256(consumedBasic.nativeTokens[0].amount)

    // half we send to target
    const receiverOutput: lib.IBasicOutput = {
        type: lib.BASIC_OUTPUT_TYPE,
        amount: "0", // we don't know hoe much we need yet
        nativeTokens: [
            {
                id: tokenId,
                amount: HexHelper.fromBigInt256(bigInt(mintAmount / 2)) // we minted 1000, transfer half of it
            }
        ],
        unlockConditions: [
            {
                type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
                address: targetAddress,
            }
        ]
    }

    // half we keep to ourselves
    const remainderOutput: lib.IBasicOutput = {
        type: lib.BASIC_OUTPUT_TYPE,
        amount: "0", // we don't know hoe much we need yet
        nativeTokens: [
            {
                id: tokenId,
                amount: HexHelper.fromBigInt256(bigInt(mintAmount / 2)) // we minted 1000, transfer half of it
            }
        ],
        unlockConditions: [
            {
                type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: lib.ED25519_ADDRESS_TYPE,
                    pubKeyHash: walletAddressHex
                },
            }
        ]
    }

    const receiverStorageDeposit = lib.TransactionHelper.getStorageDeposit(receiverOutput, info.protocol.rentStructure);
    const remainderStorageDeposit = lib.TransactionHelper.getStorageDeposit(remainderOutput, info.protocol.rentStructure);

    if ((receiverStorageDeposit + remainderStorageDeposit) > parseInt(consumedBasic.amount)) {
        throw new Error(`Insufficient funds to carry out the transaction, have ${parseInt(consumedBasic.amount)} but need ${receiverStorageDeposit + remainderStorageDeposit}`);
    }

    // We send the native tokens and let go of the storage deposit. Receiver has full control over it.
    receiverOutput.amount = receiverStorageDeposit.toString();
    remainderOutput.amount = (parseInt(consumedBasic.amount) - receiverStorageDeposit).toString();

    // Prepare inputs commitment
    const inputsCommitment = lib.TransactionHelper.getInputsCommitment([consumedOutput]);

    // Construct tx essence
    const essence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [input],
        outputs: [receiverOutput, remainderOutput],
        inputsCommitment: inputsCommitment,
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHash = lib.TransactionHelper.getTransactionEssenceHash(essence)

    // We unlock only one output, so there will be one unlock with signature
    let unlock: lib.ISignatureUnlock = {
        type: lib.SIGNATURE_UNLOCK_TYPE,
        signature: {
            type: lib.ED25519_SIGNATURE_TYPE,
            publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
            signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHash), true)
        }
    };

    // Constructing Transaction Payload
    const txPayload: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: essence,
        unlocks: [unlock]
    };

    // Record some info for ourselves
    let receiverOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0000";
    let remainderOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0100";

    ctx.outputByName?.set("tx3Receiver", receiverOutput);
    ctx.outputIdByName?.set("tx3Receiver", receiverOutputId);
    ctx.outputIdByName?.set("tx3Remainder", remainderOutputId);
    ctx.outputByName?.set("tx3Remainder", remainderOutput);

    return txPayload;
}

// Transfer native tokens with storage deposit return + expiration unlock condition
function transferNativeTokensWithUnlockCondition(consumedOutput: lib.OutputTypes, consumedOutputId: string, walletAddressHex: string, walletKeyPair: lib.IKeyPair, info: lib.INodeInfo, targetAddress: lib.AddressTypes) {
    // Prepare the input object
    const input = lib.TransactionHelper.inputFromOutputId(consumedOutputId);

    const consumedBasic = consumedOutput as lib.IBasicOutput;
    if (consumedBasic.nativeTokens === undefined) {
        throw new Error("Consumed output doesn't have native tokens")
    }

    let tokenId = consumedBasic.nativeTokens[0].id;
    let availableTokenAmount = HexHelper.toBigInt256(consumedBasic.nativeTokens[0].amount)

    // we send all native tokens to receiver
    const receiverOutput: lib.IBasicOutput = {
        type: lib.BASIC_OUTPUT_TYPE,
        amount: "0", // we don't know hoe much we need yet
        nativeTokens: [
            {
                id: tokenId,
                amount: HexHelper.fromBigInt256(availableTokenAmount)
            }
        ],
        unlockConditions: [
            {
                type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
                // owned by targetAddress until expiration
                address: targetAddress,
            },
            {
                // to consume the output, targetAddress has to pay back "amount" to "returnAdress"
                type: lib.STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
                amount: "0", // we will put here the same as to receiverOutput.amount
                returnAddress: {
                    type: lib.ED25519_ADDRESS_TYPE,
                    pubKeyHash: walletAddressHex
                },
            },
            {
                type: lib.EXPIRATION_UNLOCK_CONDITION_TYPE,
                unixTime: Math.floor(Date.now() / 1000) + (10 * 60), // Expires in now + 10 minutes
                // expires to the wallet address
                returnAddress: {
                    type: lib.ED25519_ADDRESS_TYPE,
                    pubKeyHash: walletAddressHex
                },
            }
        ]
    }

    const remainderOutput: lib.IBasicOutput = {
        type: lib.BASIC_OUTPUT_TYPE,
        amount: "0", // we don't know how much we need yet
        unlockConditions: [
            {
                type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: lib.ED25519_ADDRESS_TYPE,
                    pubKeyHash: walletAddressHex
                },
            }
        ]
    }

    const receiverStorageDeposit = lib.TransactionHelper.getStorageDeposit(receiverOutput, info.protocol.rentStructure);
    const remainderStorageDeposit = lib.TransactionHelper.getStorageDeposit(remainderOutput, info.protocol.rentStructure);

    if ((receiverStorageDeposit + remainderStorageDeposit) > parseInt(consumedBasic.amount)) {
        throw new Error(`Insufficient funds to carry out the transaction, have ${parseInt(consumedBasic.amount)} but need ${receiverStorageDeposit + remainderStorageDeposit}`);
    }

    // Update amount fields
    // Put the bare minimum in receiverOutput, leave the rest in remainder
    receiverOutput.amount = receiverStorageDeposit.toString();
    // the storage unlock condition was the 2nd, so it has index 1.
    receiverOutput.unlockConditions[1] = {
        type: lib.STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
        // we want to get back every SMR/IOTA
        amount: receiverOutput.amount,
        returnAddress: {
            type: lib.ED25519_ADDRESS_TYPE,
            pubKeyHash: walletAddressHex
        },
    };

    remainderOutput.amount = (parseInt(consumedOutput.amount) - receiverStorageDeposit).toString();

    // Prepare inputs commitment
    const inputsCommitment = lib.TransactionHelper.getInputsCommitment([consumedOutput]);

    // Construct tx essence
    const essence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [input],
        outputs: [receiverOutput, remainderOutput],
        inputsCommitment: inputsCommitment,
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHash = lib.TransactionHelper.getTransactionEssenceHash(essence)

    // We unlock only one output, so there will be one unlock with signature
    let unlock: lib.ISignatureUnlock = {
        type: lib.SIGNATURE_UNLOCK_TYPE,
        signature: {
            type: lib.ED25519_SIGNATURE_TYPE,
            publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
            signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHash), true)
        }
    };

    // Constructing Transaction Payload
    const txPayload: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: essence,
        unlocks: [unlock]
    };

    // Record some info for ourselves
    let receiverOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0000";
    let remainderOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0100";
    ctx.outputByName?.set("tx4Receiver", receiverOutput);
    ctx.outputIdByName?.set("tx4Receiver", receiverOutputId);
    ctx.outputIdByName?.set("tx4Remainder", remainderOutputId);
    ctx.outputByName?.set("tx4Remainder", remainderOutput);

    return txPayload;
}

// Accept incoming native token transfer
function acceptNativeTokenTransfer(
    // the output we want to claim
    incomingOutput: lib.OutputTypes,
    incomingOutputId: string,
    // the output holding wallet funds
    walletOutput: lib.OutputTypes,
    walletOutputId: string,
    walletAddressHex: string,
    walletKeyPair: lib.IKeyPair,
    info: lib.INodeInfo,
): lib.ITransactionPayload {
    // Prepare the input objects
    const incomingInput = lib.TransactionHelper.inputFromOutputId(incomingOutputId);
    const walletInput = lib.TransactionHelper.inputFromOutputId(walletOutputId);

    // Fetch the tokenId and amount for the incoming native tokens.
    const incomingBasic = incomingOutput as lib.IBasicOutput;
    if (incomingBasic.nativeTokens === undefined) {
        throw new Error("Incoming output doesn't have native tokens")
    }

    let tokenId = incomingBasic.nativeTokens[0].id;
    let availableTokenAmount = HexHelper.toBigInt256(incomingBasic.nativeTokens[0].amount);

    /****************
     * We will have two output on the output side:
     *  - one that has the funds from walletOutput + the native tokens
     *  - and one that send back the storage deposit to returnaddress
     ***************/
    const sdruc = incomingBasic.unlockConditions[1] as lib.IStorageDepositReturnUnlockCondition;

    // Receiver owns funds in walletOutput plus the difference between `amount` and `returnAmount` in incomingBasic
    const receiverOwnedFunds = parseInt(walletOutput.amount) + (parseInt(incomingBasic.amount) - parseInt(sdruc.amount));

    const receiverOwnedOutput: lib.IBasicOutput = {
        type: lib.BASIC_OUTPUT_TYPE,
        amount: receiverOwnedFunds.toString(),
        nativeTokens: [
            {
                id: tokenId,
                amount: HexHelper.fromBigInt256(availableTokenAmount)
            }
        ],
        unlockConditions: [
            {
                type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: lib.ED25519_ADDRESS_TYPE,
                    pubKeyHash: walletAddressHex
                },
            }
        ]
    }

    // We are not allowed to define any other unlock conditions on this outptu, only address unlock!
    const storageDepositRefundOutput: lib.IBasicOutput = {
        type: lib.BASIC_OUTPUT_TYPE,
        amount: sdruc.amount,
        unlockConditions: [
            {
                type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
                address: sdruc.returnAddress
            }
        ]
    }

    if (parseInt(storageDepositRefundOutput.amount) < lib.TransactionHelper.getStorageDeposit(storageDepositRefundOutput, info.protocol.rentStructure)) {
        // Should never happen, as the protocol would reject tx4 for creating an output with less than minimum storage deposit return amount
    }

    // Prepare inputs commitment
    const inputsCommitment = lib.TransactionHelper.getInputsCommitment([incomingOutput, walletOutput]);

    // Construct tx essence
    const essence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [incomingInput, walletInput],
        outputs: [receiverOwnedOutput, storageDepositRefundOutput],
        inputsCommitment: inputsCommitment,
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHash = lib.TransactionHelper.getTransactionEssenceHash(essence);

    // We unlock 2 outputs now, but they are both owned by the same address. So we only have to sign once, second unlock is going to reference the first
    let unlocks: lib.UnlockTypes[] = [
        {
            type: lib.SIGNATURE_UNLOCK_TYPE,
            signature: {
                type: lib.ED25519_SIGNATURE_TYPE,
                publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
                signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHash), true)
            }
        },
        {
            type: lib.REFERENCE_UNLOCK_TYPE,
            reference: 0, // we reference the first unlock (0 index)

        }
    ];

    // Constructing Transaction Payload
    const txPayload: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: essence,
        unlocks: unlocks
    };

    // Record some info for ourselves
    let receiverOwnedOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0000";
    let refundOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0100";

    ctx.outputByName?.set("tx5Receiver", receiverOwnedOutput);
    ctx.outputIdByName?.set("tx5Receiver", receiverOwnedOutputId);
    ctx.outputIdByName?.set("tx5Refund", refundOutputId);
    ctx.outputByName?.set("tx5Refund", storageDepositRefundOutput);

    return txPayload;
}

// mints more native tokens
function mintMoreNativeTokens(
    controllingAliasOutput: lib.IAliasOutput,
    controllingAliasOutputId: string,
    foundryOutput: lib.IFoundryOutput,
    foundryOutputId: string,
    walletOwnedBasicOutput: lib.IBasicOutput,
    walletOwnedBasicOutputId: string,
    walletKeyPair: lib.IKeyPair
): lib.ITransactionPayload {
    const aliasInput = lib.TransactionHelper.inputFromOutputId(controllingAliasOutputId);
    const foundryInput = lib.TransactionHelper.inputFromOutputId(foundryOutputId);
    const walletOwnedInput = lib.TransactionHelper.inputFromOutputId(walletOwnedBasicOutputId);

    const nextAlias = deepCopy(controllingAliasOutput);
    nextAlias.stateIndex++;

    const nextFoundry = deepCopy(foundryOutput);
    nextFoundry.tokenScheme.mintedTokens = foundryOutput.tokenScheme.maximumSupply; // we mint maxSupply - mintedSupply
    // note that minted-melted > max always has to be true! In out case, melted is 0, so we are fine.


    let tokenId = lib.TransactionHelper.constructTokenId(controllingAliasOutput.aliasId, foundryOutput.serialNumber, foundryOutput.tokenScheme.type);
    let currentMinted = HexHelper.toBigInt256(foundryOutput.tokenScheme.mintedTokens);
    let currentMelted = HexHelper.toBigInt256(foundryOutput.tokenScheme.meltedTokens);
    let maxSupply = HexHelper.toBigInt256(foundryOutput.tokenScheme.maximumSupply)

    const tokensInCirculation = currentMinted.subtract(currentMelted);

    // we mint all that we can
    let toBeMinted = maxSupply.subtract(tokensInCirculation);


    const remainder: lib.IBasicOutput = {
        type: lib.BASIC_OUTPUT_TYPE,
        amount: walletOwnedBasicOutput.amount, // storage requirement doesn't increase if we just put more of the same native token in it
        nativeTokens: [
            {
                id: tokenId,
                amount: HexHelper.fromBigInt256(toBeMinted)
            }
        ],
        unlockConditions: walletOwnedBasicOutput.unlockConditions // same address
    }

    // Prepare inputs commitment
    const inputsCommitment = lib.TransactionHelper.getInputsCommitment([controllingAliasOutput, foundryOutput, walletOwnedBasicOutput]);

    // Construct tx essence
    const essence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [aliasInput, foundryInput, walletOwnedInput],
        outputs: [nextAlias, nextFoundry, remainder],
        inputsCommitment: inputsCommitment,
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHash = lib.TransactionHelper.getTransactionEssenceHash(essence)

    // We unlock 3 outputs. The alias we unlock with the sig, the foundry with an alias ref unlock, and the basic with a normal ref unlock
    let unlocks: lib.UnlockTypes[] = [
        {
            type: lib.SIGNATURE_UNLOCK_TYPE,
            signature: {
                type: lib.ED25519_SIGNATURE_TYPE,
                publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
                signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHash), true)
            }
        },
        {
            type: lib.ALIAS_UNLOCK_TYPE,
            reference: 0, // point to the unlock of the alias that controls the foundry
        },
        {
            type: lib.REFERENCE_UNLOCK_TYPE,
            reference: 0, // same address, so just reference
        }
    ];

    // Constructing Transaction Payload
    const txPayload: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: essence,
        unlocks: unlocks
    };

    // Record some info for ourselves
    let nextAliasOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0000";
    let nextFoundryOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0100";
    let remainderOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0200";

    ctx.outputByName?.set("tx6Alias", nextAlias);
    ctx.outputIdByName?.set("tx6Alias", nextAliasOutputId);
    ctx.outputByName?.set("tx6Foundry", nextFoundry);
    ctx.outputIdByName?.set("tx6Foundry", nextFoundryOutputId);
    ctx.outputIdByName?.set("tx6Remainder", remainderOutputId);
    ctx.outputByName?.set("tx6Remainder", remainder);

    return txPayload;
}

// Melt native tokens in he foundry.
function meltNativeTokens(
    controllingAliasOutput: lib.IAliasOutput,
    controllingAliasOutputId: string,
    foundryOutput: lib.IFoundryOutput,
    foundryOutputId: string,
    walletOwnedBasicOutputWithNT: lib.IBasicOutput,
    walletOwnedBasicOutputIdWithNT: string,
    walletKeyPair: lib.IKeyPair
): lib.ITransactionPayload {
    const aliasInput = lib.TransactionHelper.inputFromOutputId(controllingAliasOutputId);
    const foundryInput = lib.TransactionHelper.inputFromOutputId(foundryOutputId);
    const walletOwnedInputWithNT = lib.TransactionHelper.inputFromOutputId(walletOwnedBasicOutputIdWithNT);

    const nextAlias = deepCopy(controllingAliasOutput);
    // state transition. so need to increase state index
    nextAlias.stateIndex++;

    const nextFoundry = deepCopy(foundryOutput);

    // Look into inut, see how much of what native token we have
    if (walletOwnedBasicOutputWithNT.nativeTokens === undefined) {
        throw new Error("Consumed output doesn't have native tokens");
    }

    // let's melt all tokens from this output
    let tokensToMelt = HexHelper.toBigInt256(walletOwnedBasicOutputWithNT.nativeTokens[0].amount);

    const updatedMeltedTokens = HexHelper.toBigInt256(nextFoundry.tokenScheme.meltedTokens).add(tokensToMelt);

    // By increasing the melted tokens counter in the foundry we declare that these tokens should be melted, not burned
    // If the tokens are missing on the output side of the tx, but meltedTokens in foundry do not increase, we actually burn.
    nextFoundry.tokenScheme.meltedTokens = HexHelper.fromBigInt256(updatedMeltedTokens);

    const remainder: lib.IBasicOutput = {
        type: lib.BASIC_OUTPUT_TYPE,
        amount: walletOwnedBasicOutputWithNT.amount, // we carry the SMR/IOTA
        unlockConditions: walletOwnedBasicOutputWithNT.unlockConditions // still owned by the walet
    };

    // Prepare inputs commitment
    const inputsCommitment = lib.TransactionHelper.getInputsCommitment([controllingAliasOutput, foundryOutput, walletOwnedBasicOutputWithNT]);

    // Construct tx essence
    const essence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [aliasInput, foundryInput, walletOwnedInputWithNT],
        outputs: [nextAlias, nextFoundry, remainder],
        inputsCommitment: inputsCommitment
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHash = lib.TransactionHelper.getTransactionEssenceHash(essence);

    // We unlock 3 outputs. The alias we unlock with the sig, the foundry with an alias ref unlock, and the basic with a normal ref unlock
    let unlocks: lib.UnlockTypes[] = [
        {
            type: lib.SIGNATURE_UNLOCK_TYPE,
            signature: {
                type: lib.ED25519_SIGNATURE_TYPE,
                publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
                signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHash), true)
            }
        },
        {
            type: lib.ALIAS_UNLOCK_TYPE,
            reference: 0 // point to the unlock of the alias that controls the foundry
        },
        {
            type: lib.REFERENCE_UNLOCK_TYPE,
            reference: 0 // same address, so just reference
        }
    ];

    // Constructing Transaction Payload
    const txPayload: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: essence,
        unlocks: unlocks
    };

    // Record some info for ourselves
    const txHash = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true);
    let nextAliasOutputId = lib.TransactionHelper.outputIdFromTransactionData(txHash, 0);
    let nextFoundryOutputId = lib.TransactionHelper.outputIdFromTransactionData(txHash, 1);
    let remainderOutputId = lib.TransactionHelper.outputIdFromTransactionData(txHash, 2);

    ctx.outputByName?.set("tx7Alias", nextAlias);
    ctx.outputIdByName?.set("tx7Alias", nextAliasOutputId);
    ctx.outputByName?.set("tx7Foundry", nextFoundry);
    ctx.outputIdByName?.set("tx7Foundry", nextFoundryOutputId);
    ctx.outputIdByName?.set("tx7Remainder", remainderOutputId);
    ctx.outputByName?.set("tx7Remainder", remainder);

    return txPayload;
}

// Burns native tokens in the consumed output.
// Note, that those tokens that are burned can never be melted, since they are ereased from the ledger.
//  What this means is that the foundry can not be destroyed once tokens are burnt. (to burn the foundry, it must be true that meltedTokens = mintedTokens)
function burnNativeTokens(
    consumeBasicOutputWithNT: lib.IBasicOutput,
    consumeBasicOutputIdWithNT: string,
    walletKeyPair: lib.IKeyPair
): lib.ITransactionPayload {
    // Create input object
    const input = lib.TransactionHelper.inputFromOutputId(consumeBasicOutputIdWithNT);

    // Look into inut, see how much of what native token we have
    if (consumeBasicOutputWithNT.nativeTokens === undefined) {
        throw new Error("Consumed output doesn't have native tokens");
    }

    let tokenId = consumeBasicOutputWithNT.nativeTokens[0].id;
    // let's burn all tokens from this output
    let tokensToBurn = HexHelper.toBigInt256(consumeBasicOutputWithNT.nativeTokens[0].amount);

    console.log(`Burning ${tokensToBurn} tokens of token ${tokenId}...`);

    const remainder: lib.IBasicOutput = {
        type: lib.BASIC_OUTPUT_TYPE,
        // we carry the SMR/IOTA balance over, only burn the native token balance
        amount: consumeBasicOutputWithNT.amount,
        // keep it in receiverWallet
        unlockConditions: consumeBasicOutputWithNT.unlockConditions
        // By not declaring any native tokens on the output side of the transaction, we burn them
    };

    // Prepare inputs commitment
    const inputsCommitment = lib.TransactionHelper.getInputsCommitment([consumeBasicOutputWithNT]);

    // Construct tx essence
    const essence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [input],
        outputs: [remainder],
        inputsCommitment: inputsCommitment
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHash = lib.TransactionHelper.getTransactionEssenceHash(essence);

    // We unlock only 1 output
    let unlocks: lib.UnlockTypes[] = [
        {
            type: lib.SIGNATURE_UNLOCK_TYPE,
            signature: {
                type: lib.ED25519_SIGNATURE_TYPE,
                publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
                signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHash), true)
            }
        }
    ];

    // Constructing Transaction Payload
    const txPayload: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: essence,
        unlocks: unlocks
    };

    // Record some info for ourselves
    const txHash = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true);
    let remainderOutputId = lib.TransactionHelper.outputIdFromTransactionData(txHash, 0);

    ctx.outputIdByName?.set("tx8Receiver", remainderOutputId);
    ctx.outputByName?.set("tx8Receiver", remainder);

    return txPayload;
}

// Mint more tokens and lock them away for a year.
function mintAndLockAway(
    controllingAliasOutput: lib.IAliasOutput,
    controllingAliasOutputId: string,
    foundryOutput: lib.IFoundryOutput,
    foundryOutputId: string,
    depositSupplierOutput: lib.IBasicOutput,
    depositSupplierOutputId: string,
    targetAddress: lib.AddressTypes,
    walletKeyPair: lib.IKeyPair
): lib.ITransactionPayload {
    // Prepare input objects
    const aliasInput = lib.TransactionHelper.inputFromOutputId(controllingAliasOutputId);
    const foundryInput = lib.TransactionHelper.inputFromOutputId(foundryOutputId);
    const depostiSupplierInput = lib.TransactionHelper.inputFromOutputId(depositSupplierOutputId);

    const nextAlias = deepCopy(controllingAliasOutput);
    // state transition. so need to increase state index
    nextAlias.stateIndex++;

    const nextFoundry = deepCopy(foundryOutput);
    // We mint mintAmount tokens with the foundry.
    // How many tokens could we theoretically mint?
    let currentMinted = HexHelper.toBigInt256(foundryOutput.tokenScheme.mintedTokens);
    let currentMelted = HexHelper.toBigInt256(foundryOutput.tokenScheme.meltedTokens);
    let maxSupply = HexHelper.toBigInt256(foundryOutput.tokenScheme.maximumSupply);

    let tokensInCirculation = currentMinted.subtract(currentMelted);
    const availableToMint = maxSupply.subtract(tokensInCirculation);

    if (availableToMint.compare(bigInt(mintAmount)) < 0) {
        throw new Error(`Want to mint ${mintAmount} tokens but only allowed ${availableToMint.toString()}`);
    }

    // increase minted counter in foundry
    nextFoundry.tokenScheme.mintedTokens = HexHelper.fromBigInt256(currentMinted.add(bigInt(mintAmount)));

    const tokenId = lib.TransactionHelper.constructTokenId(controllingAliasOutput.aliasId, foundryOutput.serialNumber, foundryOutput.tokenScheme.type);

    const now = new Date();
    // setFullYear adds X years to the date object and returns the miliseconds elapsed between 1970 and the updated date
    const aYearFromNow = Math.floor(now.setFullYear(now.getFullYear() + 1) / 1000);

    // Prepare basic output that holds the minted tokens + locks them away for 1 year
    const timeLockedWithNTs: lib.IBasicOutput = {
        type: lib.BASIC_OUTPUT_TYPE,
        amount: depositSupplierOutput.amount,
        nativeTokens: [
            {
                id: tokenId,
                amount: HexHelper.fromBigInt256(bigInt(mintAmount))
            }
        ],
        // unlock conditions must be sorted based on type!
        unlockConditions: [
            // owner is targetAddress
            {
                type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
                address: targetAddress

            },
            // let's define the time based locking condition,
            // owner can not unlock output until timelock expired
            {
                type: lib.TIMELOCK_UNLOCK_CONDITION_TYPE,
                unixTime: aYearFromNow
            }
        ]
    }

    // Prepare inputs commitment
    const inputsCommitment = lib.TransactionHelper.getInputsCommitment([controllingAliasOutput, foundryOutput, depositSupplierOutput]);

    // Construct tx essence
    const essence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [aliasInput, foundryInput, depostiSupplierInput],
        outputs: [nextAlias, nextFoundry, timeLockedWithNTs],
        inputsCommitment: inputsCommitment
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHash = lib.TransactionHelper.getTransactionEssenceHash(essence);

    // We unlock 3 outputs. The alias we unlock with the sig, the foundry with an alias ref unlock, and the basic with a normal ref unlock
    let unlocks: lib.UnlockTypes[] = [
        {
            type: lib.SIGNATURE_UNLOCK_TYPE,
            signature: {
                type: lib.ED25519_SIGNATURE_TYPE,
                publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
                signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHash), true)
            }
        },
        {
            type: lib.ALIAS_UNLOCK_TYPE,
            reference: 0 // point to the unlock of the alias that controls the foundry
        },
        {
            type: lib.REFERENCE_UNLOCK_TYPE,
            reference: 0 // same address, so just reference
        }
    ];

    // Constructing Transaction Payload
    const txPayload: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: essence,
        unlocks: unlocks
    };

    // Record some info for ourselves
    const txHash = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true);
    let nextAliasOutputId = lib.TransactionHelper.outputIdFromTransactionData(txHash, 0);
    let nextFoundryOutputId = lib.TransactionHelper.outputIdFromTransactionData(txHash, 1);
    let timeLockedOutputId = lib.TransactionHelper.outputIdFromTransactionData(txHash, 2);

    ctx.outputByName?.set("tx9Alias", nextAlias);
    ctx.outputIdByName?.set("tx9Alias", nextAliasOutputId);
    ctx.outputByName?.set("tx9Foundry", nextFoundry);
    ctx.outputIdByName?.set("tx9Foundry", nextFoundryOutputId);
    ctx.outputIdByName?.set("tx9Timelocked", timeLockedOutputId);
    ctx.outputByName?.set("tx9Timelocked", timeLockedWithNTs);

    return txPayload;
}

function sendAll(
    aliasOutput: lib.IAliasOutput,
    aliasOutputIdId: string,
    walletBasicOutput: lib.IBasicOutput,
    walletBasicOutputId: string,
    receiverBasicOutputWithNT: lib.IBasicOutput,
    receiverBasicOutputWithNTId: string,
    receiverBasicOutput: lib.IBasicOutput,
    receiverBasicOutputId: string,
    targetAddress: lib.AddressTypes,
    walletKeyPair: lib.IKeyPair,
    receiverKeyPair: lib.IKeyPair,
): lib.ITransactionPayload {
    const aliasInput = lib.TransactionHelper.inputFromOutputId(aliasOutputIdId);
    const walletBasicInput = lib.TransactionHelper.inputFromOutputId(walletBasicOutputId);
    const receiverBasitWithNTInput = lib.TransactionHelper.inputFromOutputId(receiverBasicOutputWithNTId);
    const receiverBasicInput = lib.TransactionHelper.inputFromOutputId(receiverBasicOutputId);

    const nextAlias = deepCopy(aliasOutput);
    // governance transition, so no need to increment state index!
    nextAlias.unlockConditions = [
        {
            type: lib.STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: targetAddress
        },
        {
            type: lib.GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: targetAddress
        }
    ]

    const sweptAmount = parseInt(receiverBasicOutputWithNT.amount) +
        parseInt(receiverBasicOutput.amount) +
        parseInt(walletBasicOutput.amount);

    const remainder: lib.IBasicOutput = {
        type: lib.BASIC_OUTPUT_TYPE,
        amount: sweptAmount.toString(),
        nativeTokens: receiverBasicOutputWithNT.nativeTokens,
        unlockConditions: [
            {
                type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
                address: targetAddress
            }
        ]
    }

    // Prepare inputs commitment
    const inputsCommitment = lib.TransactionHelper.getInputsCommitment([aliasOutput, walletBasicOutput, receiverBasicOutputWithNT, receiverBasicOutput]);

    // Construct tx essence
    const essence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [aliasInput, walletBasicInput, receiverBasitWithNTInput, receiverBasicInput],
        outputs: [nextAlias, remainder],
        inputsCommitment: inputsCommitment
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHash = lib.TransactionHelper.getTransactionEssenceHash(essence);

    //
    /*******************************
     * We unlock 4 outputs.
     *  - The alias we unlock with the sig from wallet
     *  - walletBasicInput via ref to the previous signature unlock
     *  - receiverBasitWithNTInput via the sig from receiver wallet
     *  - receiverBasicInput via ref to the previous
     * */
    let unlocks: lib.UnlockTypes[] = [
        {
            type: lib.SIGNATURE_UNLOCK_TYPE,
            signature: {
                type: lib.ED25519_SIGNATURE_TYPE,
                publicKey: Converter.bytesToHex(walletKeyPair.publicKey, true),
                signature: Converter.bytesToHex(Ed25519.sign(walletKeyPair.privateKey, essenceHash), true)
            }
        },
        {
            type: lib.REFERENCE_UNLOCK_TYPE,
            reference: 0
        },
        {
            type: lib.SIGNATURE_UNLOCK_TYPE,
            signature: {
                type: lib.ED25519_SIGNATURE_TYPE,
                publicKey: Converter.bytesToHex(receiverKeyPair.publicKey, true),
                signature: Converter.bytesToHex(Ed25519.sign(receiverKeyPair.privateKey, essenceHash), true)
            }
        },
        {
            type: lib.REFERENCE_UNLOCK_TYPE,
            reference: 2
        },
    ];

    // Constructing Transaction Payload
    const txPayload: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: essence,
        unlocks: unlocks
    };

    return txPayload;
}


/***********************************************************************************************************************
 * HELPER FUNCTIONS FOR THE SAKE OF THIS EXAMPLE
 ***********************************************************************************************************************/

// Requests frunds from the faucet via API
async function requestFundsFromFaucet(addressBech32: string) {
    // Ask the faucet for funds
    const requestObj = JSON.stringify({ address: addressBech32 });
    let errorMessage, data;
    try {
        const response = await fetch(FAUCET, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: requestObj,
        });
        if (response.status === 202) {
            errorMessage = "OK";
        } else if (response.status === 429) {
            errorMessage = "Too many requests. Please, try again later.";
        } else {
            data = await response.json();
            errorMessage = data.error.message;
        }
    } catch (error) {
        errorMessage = error;
    }

    if (errorMessage != "OK") {
        throw new Error(`Didn't manage to get funds from faucet: ${errorMessage}`);
    }
}

// Generate a hot wallet from a random key
async function setUpHotWallet(hrp: string) {
    // Generate a random seed
    const walletEd25519Seed = new lib.Ed25519Seed(randomBytes(32));

    // For Shimmer we use Coin Type 4219
    const path = new Bip32Path("m/44'/4219'/0'/0'/0'");

    // Construct wallet from seed
    const walletSeed = walletEd25519Seed.generateSeedFromPath(path);
    let walletKeyPair = walletSeed.keyPair();

    console.log(`\tSeed for hot wallet: ${Converter.bytesToHex(walletSeed.toBytes())}`);

    // Get the address for the path seed which is actually the Blake2b.sum256 of the public key
    // display it in both Ed25519 and Bech 32 format
    const walletEd25519Address = new lib.Ed25519Address(walletKeyPair.publicKey);
    const walletAddress = walletEd25519Address.toAddress();
    const walletAddressHex = Converter.bytesToHex(walletAddress, true);

    let walletAddressBech32 = lib.Bech32Helper.toBech32(lib.ED25519_ADDRESS_TYPE, walletAddress, hrp);
    console.log("\tAddress Bech32", walletAddressBech32);
    return [walletAddressHex, walletAddressBech32, walletKeyPair] as const;
}

// Use the indexer API to fetch the output sent to the wallet address by the faucet
async function fetchAndWaitForBasicOutput(addressBech32: string, client: lib.IndexerPluginClient): Promise<string> {
    let outputsResponse: lib.IOutputsResponse = { ledgerIndex: 0, cursor: "", pageSize: "", items: [] };
    let maxTries = 15;
    let tries = 0;
    while (outputsResponse.items.length == 0) {
        if (tries > maxTries) { break; }
        tries++;
        console.log(`\tTry #${tries}: fetching basic output for address ${addressBech32}`)
        outputsResponse = await client.basicOutputs({
            addressBech32: addressBech32,
            hasStorageDepositReturn: false,
            hasExpiration: false,
            hasTimelock: false,
            hasNativeTokens: false
        });
        if (outputsResponse.items.length == 0) {
            console.log("\tDidn't find any, retrying soon...");
            await new Promise(f => setTimeout(f, 1500));
        }
    }
    if (tries > maxTries) {
        throw new Error(`Didn't find any outputs for address ${addressBech32}`);
    }
    return outputsResponse.items[0];
};

// Chain together transaction payloads via blocks.
// To reference the previous block, we need to calculate its blockId.
// To calculate blockId, we need to set the parents and perform pow to get the nonce.
//
// The first block will have parents fetched from the tangle. The subsequent blocks refernce always the previous block as parent.
async function chainTrasactionsViaBlocks(client: lib.SingleNodeClient, txs: Array<lib.ITransactionPayload>, minPowScore: number): Promise<Array<lib.IBlock>> {
    if (txs.length === 0) {
        throw new Error("can't create blocks from empty transaction payload list");
    }

    // we will chain the blocks together via their blockIds as parents
    let blockIds: Array<string> = [];
    let blocks: Array<lib.IBlock> = [];

    // parents for the first block
    let parents = (await client.tips()).tips;

    for (let i = 0; i < txs.length; i++) {
        let block: lib.IBlock = {
            protocolVersion: lib.DEFAULT_PROTOCOL_VERSION,
            parents: [],
            payload: txs[i],
            nonce: "0" // will be filled when calculating pow
        };

        if (i === 0) {
            // the first block  will have the fetched parents
            block.parents = parents;
        } else {
            // subsequent blocks reference the previous block
            block.parents = [blockIds[i - 1]];
        }

        // Calculate Pow
        console.log(`Calculating PoW for block ${i+1}...`)
        const blockNonce = await caluclateNonce(block, minPowScore);

        // Update nonce field of the block
        block.nonce = blockNonce;

        // Calculate blockId
        const blockId = lib.TransactionHelper.calculateBlockId(block);

        // Add it to list of blockIds
        blockIds.push(blockId);

        // Add it to list of block
        blocks.push(block);
    }

    return blocks;
}

// Send an array of block in order to the node.
async function submit(blocks: Array<lib.IBlock>, client: lib.SingleNodeClient) {
    for (let i = 0; i < blocks.length; i++) {
        console.log(`Submitting block ${i+1}...`);
        const blockId = await client.blockSubmit(blocks[i]);
        console.log(`Submitted block ${i+1} blockId is ${blockId}, check out the transaction at ${EXPLORER}/block/${blockId}`);
    }
}

// Gets an output from the local context
function getOutput(name: string): lib.OutputTypes {
    if (ctx.outputByName === undefined) {
        throw new Error("undefined output map");
    }
    let output = ctx.outputByName.get(name);
    if (output === undefined) {
        throw new Error("output " + name + " doesn't exists in context");
    }
    return output;
}

// Gets an outtputId from local context
function getOutputId(name: string): string {
    if (ctx.outputIdByName === undefined) {
        throw new Error("undefined outputId map");
    }
    let outputId = ctx.outputIdByName.get(name);
    if (outputId === undefined) {
        throw new Error("outputId " + name + " doesn't exists in context");
    }
    return outputId;
}

// Gets the networkId from local context
function getNetworkId(): string {
    if (ctx.networkId === undefined) {
        throw new Error("undefined networkId map");
    }
    return ctx.networkId;
}

/***********************************************************************************************************************
 * UTILS
 ***********************************************************************************************************************/

// Deeply copies an object.
function deepCopy<T>(instance: T): T {
    if (instance == null) {
        return instance;
    }

    // handle Dates
    if (instance instanceof Date) {
        return new Date(instance.getTime()) as any;
    }

    // handle Array types
    if (instance instanceof Array) {
        var cloneArr = [] as any[];
        (instance as any[]).forEach((value) => { cloneArr.push(value) });
        // for nested objects
        return cloneArr.map((value: any) => deepCopy<any>(value)) as any;
    }
    // handle objects
    if (instance instanceof Object) {
        var copyInstance = {
            ...(instance as { [key: string]: any }
            )
        } as { [key: string]: any };
        for (var attr in instance) {
            if ((instance as Object).hasOwnProperty(attr))
                copyInstance[attr] = deepCopy<any>(instance[attr]);
        }
        return copyInstance as T;
    }
    // handling primitive data types
    return instance;
}


// Just some helpers to ask for user input in terminal
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const questionAsync = Prom.promisify<string, string>((question: string, callback: Function) => {
    rl.question(question,
        callback.bind(null, null) // Ugh, signature mismatch.
    );
});

async function askQuestion(question: string): Promise<string> {
    const result: string = await questionAsync(question);

    return result;
}

// Performs PoW on a block to calculate nonce. Uses NeonPowProvider.
async function caluclateNonce(block: lib.IBlock, minPowScore: number): Promise<string> {
    const writeStream = new WriteStream();
    lib.serializeBlock(writeStream, block);
    const blockBytes = writeStream.finalBytes();

    if (blockBytes.length > lib.MAX_BLOCK_LENGTH) {
        throw new Error(
            `The block length is ${blockBytes.length}, which exceeds the maximum size of ${lib.MAX_BLOCK_LENGTH}`
        );
    }

    const powProvider = new NeonPowProvider();
    const nonce = await powProvider.pow(blockBytes, minPowScore);
    return nonce.toString();
}
