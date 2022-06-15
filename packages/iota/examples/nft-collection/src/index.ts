import * as lib from "@iota/iota.js"
import { Converter, WriteStream } from "@iota/util.js";
import { Bip32Path, Ed25519 } from "@iota/crypto.js";
import { randomBytes } from "crypto";
import { NeonPowProvider } from "@iota/pow-neon.js";
import bigInt from "big-integer";
import * as console from "console";
import fetch from "node-fetch";

const API_ENDPOINT = "http://localhost:14265/";
// const API_ENDPOINT = "https://api.alphanet.iotaledger.net";
const EXPLORER = "https://explorer.alphanet.iotaledger.net/alphanet";
const FAUCET = "https://faucet.alphanet.iotaledger.net";
// const FAUCET_ENQUEUE = "https://faucet.alphanet.iotaledger.net/api/enqueue" 
const FAUCET_ENQUEUE = "http://localhost:8091/api/enqueue"; // if running private tangle

/*******************************
In this example we will explore native tokens:
1. Mint a collection NFT
2. Mint NFTs via the collection NFT, use the issuer feature
3. Transfer an NFT from the collection w/o unlock conditions
4. Transfer an NFT from the collection via:
    - expiration
    - storage return
5. Transfer the collection NFT
6. new owner mints new NFTs in the collection
7. Burn the collection NFT (lock collection)
8. Burn NFTs in the collection
 *******************************/

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
    // Address of the hot wallet
    walletAddress?: lib.AddressTypes,
    // info about the node/protocol
    info?: lib.INodeInfo
    // maps to help us locate outputs
    outputIdByName?: Map<string, string>,
    outputByName?: Map<string, lib.OutputTypes>,
    // list of transactions in chaining order
    txList?: Array<lib.ITransactionPayload>,
    // networkId calculated form networkName
    networkId?: string
}

// local context
let ctx: IContext = {}

// In this example we set up a hot wallet and fund it with tokens from the faucet
async function run(){
    // init context
    ctx.outputIdByName = new Map<string, string>();
    ctx.outputByName = new Map<string, lib.OutputTypes>();
    ctx.txList = [];
    // We don't define a local pow provider because we will calculate pow by hand
    ctx.client = new lib.SingleNodeClient(API_ENDPOINT);
    // fetch basic info from node
    ctx.info = await ctx.client.info();
    // calculate networkId
    ctx.networkId = lib.TransactionHelper.networkIdFromNetworkName(ctx.info.protocol.networkName);

    // Now it's time to set up an account for this demo. We generate a random seed and set up a hot wallet called "Main"
    console.log("Setting up Main wallet...");
    [ctx.walletAddressHex, ctx.walletAddressBech32, ctx.walletKeyPair] = await setUpHotWallet(ctx.info.protocol.bech32HRP, "Main");
    ctx.walletAddress = lib.Bech32Helper.addressFromBech32(ctx.walletAddressBech32, ctx.info.protocol.bech32HRP);
    // We also top up the address by asking funds from the faucet.
    await requestFundsFromFaucet(ctx.walletAddressBech32);

    // Fetch outputId with funds to be used as input from the Indexer API
    const indexerPluginClient = new lib.IndexerPluginClient(ctx.client);
    // Indexer returns outputIds of matching outputs. We are only interested in the first one coming from the faucet.
    const outputId = await fetchAndWaitForBasicOutput(ctx.walletAddressBech32, indexerPluginClient);

    // Fetch the output itself from the core API
    const outputResponse = await ctx.client.output(outputId);
    // We start from one Basic Output that we own, Our journey starts with the genesis.
    const genesisOutput = outputResponse.output;

     /*********************************
     * Set up another wallet so we can send NFTs
     *********************************/
 
    //target addres
    console.log("Setting up Receiver wallet...");
    const [receiverAddressHex, receiverAddressBech32, receiverKeyPair] = await setUpHotWallet(ctx.info.protocol.bech32HRP, "Receiver");
    const receiverAddress = lib.Bech32Helper.addressFromBech32(receiverAddressBech32, ctx.info.protocol.bech32HRP);

    /****************************************************************************************
     * Current output ownership:
     *  - Main Hot Wallet: [genesisOutput]
     *  - Receiver Hot Wallet: []
     ****************************************************************************************/

    /************************************
     * 1. Prepare a transaction that creates a collection nft
     *  - input: basic output received from faucet
     *  - output: minted nft
     ************************************/
    console.log("Minting collection nft...");
    let txPayload1 = mintCollectionNft(genesisOutput, outputId, ctx.walletAddressHex, ctx.walletKeyPair, ctx.walletAddress);
    ctx.txList.push(txPayload1);

    /****************************************************************************************
     * Current output ownership:
     *   - Main Hot Wallet: [tx1collectionNft, tx1Basic]
     *   - Receiver Hot Wallet: []
     ****************************************************************************************/
    /************************************
     * 2. Ready with the collection nft minting tx, now we have to prepare the second tx that:
     * - mint nfts (nft collection) via collectionNFT
     ************************************/
    const collectionNftAddress: lib.AddressTypes = {
        type: lib.NFT_ADDRESS_TYPE,
        nftId: lib.TransactionHelper.resolveIdFromOutputId(getOutputId("tx1CollectionNft"))
    };
    const nftCollectionOutputs = createNftCollectionOutputs(collectionNftAddress, ctx.walletAddress, ctx.walletAddressBech32, 5, ctx.info);

    if (nftCollectionOutputs.totalDeposit > parseInt(getOutput("tx1CollectionNft").amount)) {
        throw new Error("Not enough funds to mint collection. Request funds from faucet:" + FAUCET);
    }
    console.log("Minting nft collection...");
    let txPayload2 = mintCollectionNfts("tx2", true, getOutput("tx1CollectionNft"), getOutputId("tx1CollectionNft"), nftCollectionOutputs.outputs, nftCollectionOutputs.totalDeposit, ctx.walletKeyPair, ctx.info);
    ctx.txList.push(txPayload2);

    /****************************************************************************************
     * Current output ownership:
     *  - Main Hot Wallet: [tx1Basic, tx2CollectionNft, tx2Nft1, tx2Nft2, tx2Nft3, tx2Nft4, tx2Nft5]
     *  - Receiver Hot Wallet: []
     ****************************************************************************************/
    /************************************
     * 3.Transfer an NFT from the collection w/o unlock conditions
     *************************************/
    console.log("Transfering Nft without unlock conditions...");
    let txPayload3 = transferNftTxWithoutUnlockConditions("tx3Nft1", true, getOutput("tx2Nft1"), getOutputId("tx2Nft1"), ctx.walletKeyPair, receiverAddress);
    ctx.txList.push(txPayload3);
    
    /****************************************************************************************
     * Current output ownership:
     *  - Main Hot Wallet: [tx1Basic, tx2CollectionNft, tx2Nft2, tx2Nft3, tx2Nft4, tx2Nft5]
     *  - Receiver Hot Wallet: [tx3Nft1]
     ****************************************************************************************/
    /************************************
     * 4.Transfer an NFT from the collection with expiration and return storage deposit unlock condition
     *************************************/
    console.log("Transfering Nft with unlock conditions...");
    let txPayload4 = transferNftTxWithUnlockConditions(getOutput("tx2Nft2"), getOutputId("tx2Nft2"), getOutput("tx1Basic"), getOutputId("tx1Basic"), ctx.walletAddressHex, ctx.walletKeyPair, receiverAddress, ctx.info);
    ctx.txList.push(txPayload4);

    /****************************************************************************************
     * Current output ownership:
     *  - Main Hot Wallet: [tx4Basic, tx2CollectionNft, tx2Nft3, tx2Nft4, tx2Nft5]
     *  - Receiver Hot Wallet: [tx3Nft1, tx4Nft2]
     ****************************************************************************************/
    /************************************
     * 5.Transfer the collection NFT to new owner
     *************************************/
    console.log("Transfering the collection Nft to new owner...", JSON.stringify(getOutput("tx2CollectionNft")));
    let txPayload5 = transferNftTxWithoutUnlockConditions("tx5CollectionNft", false, getOutput("tx2CollectionNft"), getOutputId("tx2CollectionNft"), ctx.walletKeyPair, receiverAddress);
    ctx.txList.push(txPayload5);
    /****************************************************************************************
     * Current output ownership:
     *  - Main Hot Wallet: [tx4Basic, tx2Nft3, tx2Nft4, tx2Nft5]
     *  - Receiver Hot Wallet: [tx3Nft1, tx4Nft2, tx5CollectionNft]
     ****************************************************************************************/
    /************************************
     * 6. New Owner minta nft collection using collectionNFT
     *************************************/
    const tx6NftCollectionOutputs = createNftCollectionOutputs(collectionNftAddress, receiverAddress, receiverAddressBech32, 5, ctx.info);

    if (tx6NftCollectionOutputs.totalDeposit > parseInt(getOutput("tx5CollectionNft").amount)) {
        throw new Error("Not enough funds to mint collection. Request funds from faucet:" + FAUCET);
    }
    console.log("New Owner minting nft collection...");
    let txPayload6 = mintCollectionNfts("tx6", false, getOutput("tx5CollectionNft"), getOutputId("tx5CollectionNft"), tx6NftCollectionOutputs.outputs, tx6NftCollectionOutputs.totalDeposit, receiverKeyPair, ctx.info);
    ctx.txList.push(txPayload6)
    /****************************************************************************************
     * Current output ownership:
     *  - Main Hot Wallet: [tx4Basic, tx2Nft3, tx2Nft4, tx2Nft5]
     *  - Receiver Hot Wallet: [tx3Nft1, tx4Nft2, tx6CollectionNft, tx6Nft1, tx6Nft2, tx6Nft3, tx6Nft4, tx6Nft5]
     ****************************************************************************************/
    /************************************
     * 7. Burn the collection NFT (lock collection)
     *************************************/
    console.log("Burning collectionNFT...");
    let txPayload7 = burnCollectionNft("tx7Basic", getOutput("tx6CollectionNft"), getOutputId("tx6CollectionNft"), receiverKeyPair, receiverAddress);
    ctx.txList.push(txPayload7);
    /****************************************************************************************
     * Current output ownership:
     *  - Main Hot Wallet: [tx4Basic, tx2Nft3, tx2Nft4, tx2Nft5]
     *  - Receiver Hot Wallet: [tx3Nft1, tx4Nft2, tx6Nft1, tx6Nft2, tx6Nft3, tx6Nft4, tx6Nft5, tx7Basic]
     ****************************************************************************************/
    /************************************
     * 8. Burn NFTs in the collection
     *************************************/
    console.log("Burning NFTs from collection...");
    const burnNftCollection: string[] = ["tx3Nft1", "tx6Nft1", "tx6Nft5"];
    for (let i = 0; i < burnNftCollection.length; i++) {
        let txPayload = burnCollectionNft("tx8Basic" + i, getOutput(burnNftCollection[i]), getOutputId(burnNftCollection[i]), receiverKeyPair, receiverAddress);
        ctx.txList.push(txPayload);
    };
    /****************************************************************************************
     * Current output ownership:
     *  - Main Hot Wallet: [tx4Basic, tx2Nft3, tx2Nft4, tx2Nft5]
     *  - Receiver Hot Wallet: [tx4Nft2, tx6Nft2, tx6Nft3, tx6Nft4, tx7Basic, tx8Basic1, tx8Basic2, tx8Basic3 ]
     ****************************************************************************************/

    console.log("Chaining together transactions via blocks...");
    // Finally, time to prepare the three blocks, and chain them together via `parents`
    let blocks: lib.IBlock[] = await chainTrasactionsViaBlocks(ctx.client, ctx.txList, ctx.info.protocol.minPoWScore);

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

function mintCollectionNft(consumedOutput: lib.OutputTypes, consumedOutputId: string, walletAddressHex: string, walletKeyPair: lib.IKeyPair, targetAddress: lib.AddressTypes): lib.ITransactionPayload{
    // Prepare inputs to the tx
    const input = lib.TransactionHelper.inputFromOutputId(consumedOutputId);

    // Create the outputs, that is an NFT output
    let nftOutput: lib.INftOutput = {
        type: lib.NFT_OUTPUT_TYPE,
        amount: (parseInt(consumedOutput.amount) / 2).toString(),  // We could put only requiredStorageDepoist into the nft output, but we will mint nft collection so we are going to transfer half of the basic output amount.
        // when minting, this has to be set to zero. It will be set in nodes as the hash of the outputId when the tx confirms.
        // Note, that from the first spend of the NFT you have to use the actual hash of outputId
        nftId: "0x0000000000000000000000000000000000000000000000000000000000000000",
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
                data: Converter.utf8ToHex("This is where the immutable NFT metadata goes.", true)
            }
        ],
        unlockConditions: [
            {
                type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
                address: targetAddress, // minting it directly onto target addressBech32
            }
        ]
    }

    // create basic output for the reminder amount
    const remainderOutput: lib.IBasicOutput = {
        type: lib.BASIC_OUTPUT_TYPE,
        amount: (parseInt(consumedOutput.amount) / 2).toString(), // we return the other half as a reminder
        nativeTokens: [],
        unlockConditions: [
            // Send it to the target address
            {
                type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
                address: targetAddress,
            }
        ],
        features: [],
    }

    // Prepare Tx essence
    // InputsCommitment calculation
    const inputsCommitment = lib.TransactionHelper.getInputsCommitment([consumedOutput]);

    // Creating Transaction Essence
    const txEssence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [input],
        outputs: [nftOutput, remainderOutput],
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
    let nftOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0000";
    let basicOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0100";

    ctx.outputIdByName?.set("tx1CollectionNft", nftOutputId);
    ctx.outputByName?.set("tx1CollectionNft", nftOutput);
    ctx.outputIdByName?.set("tx1Basic", basicOutputId);
    ctx.outputByName?.set("tx1Basic", remainderOutput);

    return txPayload;
}

function mintCollectionNfts(txName: string, resolveCollectionNftId: boolean, consumedOutput: lib.OutputTypes, consumedOutputId: string, collectionOutputs: lib.OutputTypes[], totalDeposit: number, signerKeyPair: lib.IKeyPair, nodeInfo: lib.INodeInfo): lib.ITransactionPayload{
    // Prepare inputs to the tx
    const input = lib.TransactionHelper.inputFromOutputId(consumedOutputId);

    // InputsCommitment calculation
    const inputsCommitment = lib.TransactionHelper.getInputsCommitment([consumedOutput]);

    // Transition the CollectionNft
    let collectionNft = deepCopy(consumedOutput) as lib.INftOutput;
    // resolve nft Id if its all zeros
    if(resolveCollectionNftId){
        collectionNft.nftId = lib.TransactionHelper.resolveIdFromOutputId(consumedOutputId);
    }
     
    collectionNft.amount = bigInt(consumedOutput.amount).minus(totalDeposit).toString(); 

    // 5.Create transaction essence
    const collectionTransactionEssence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [input],
        outputs: [collectionNft, ...collectionOutputs],
        inputsCommitment
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHash = lib.TransactionHelper.getTransactionEssenceHash(collectionTransactionEssence);

    // Create the unlocks
    const unlockConditions: lib.UnlockTypes[] = [
        {
            type: lib.SIGNATURE_UNLOCK_TYPE,
            signature: {
                type: lib.ED25519_SIGNATURE_TYPE,
                publicKey: Converter.bytesToHex(signerKeyPair.publicKey, true),
                signature: Converter.bytesToHex(Ed25519.sign(signerKeyPair.privateKey, essenceHash), true)
            }
        }
    ];

    // Create transaction payload
     const txPayload: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: collectionTransactionEssence,
        unlocks: unlockConditions
    };

    // Record some info for ourselves
    let collectionNftOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0000";
    let nftOutputId1 = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0100";
    let nftOutputId2 = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0200";
    let nftOutputId3 = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0300";
    let nftOutputId4 = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0400";
    let nftOutputId5 = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0500";

    // write collectionNFT
    ctx.outputIdByName?.set(txName + "CollectionNft", collectionNftOutputId);
    ctx.outputByName?.set(txName + "CollectionNft", collectionNft);
    //write collection nfts
    ctx.outputIdByName?.set(txName + "Nft1", nftOutputId1);
    ctx.outputByName?.set(txName + "Nft1", collectionOutputs[0]);
    ctx.outputIdByName?.set(txName + "Nft2", nftOutputId2);
    ctx.outputByName?.set(txName +"Nft2", collectionOutputs[1]);
    ctx.outputIdByName?.set(txName + "Nft3", nftOutputId3);
    ctx.outputByName?.set(txName + "Nft3", collectionOutputs[2]);
    ctx.outputIdByName?.set(txName + "Nft4", nftOutputId4);
    ctx.outputByName?.set(txName + "Nft4", collectionOutputs[3]);
    ctx.outputIdByName?.set(txName + "Nft5", nftOutputId5);
    ctx.outputByName?.set(txName + "Nft5", collectionOutputs[4]);

    return txPayload;
}

function transferNftTxWithoutUnlockConditions(txName: string, resolveNftId: boolean, consumedOutput: lib.OutputTypes, consumedOutputId: string, signerKeyPair: lib.IKeyPair, targetAddress: lib.AddressTypes) {
    // Prepare inputs to the tx
    let input: lib.IUTXOInput = lib.TransactionHelper.inputFromOutputId(consumedOutputId);
    
    //transfer nft
    let nextNft = deepCopy(consumedOutput) as lib.INftOutput;
    // resolve nft id if its all zeros
    if (resolveNftId) {
        nextNft.nftId = lib.TransactionHelper.resolveIdFromOutputId(consumedOutputId);
    }
    
    //Change unlock conditions
    nextNft.unlockConditions = [
        {
            type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
            address: targetAddress,
        }
    ];

    // Calculate inputs commitment
    let inputsCommitment = lib.TransactionHelper.getInputsCommitment([consumedOutput]);

    // Construct tx essence
    const txEssence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs: [input],
        outputs: [nextNft],
        inputsCommitment,
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHash = lib.TransactionHelper.getTransactionEssenceHash(txEssence);

    // We unlock the nft output
    let unlocks: lib.UnlockTypes[] = [
        {
            type: lib.SIGNATURE_UNLOCK_TYPE,
            signature: {
                type: lib.ED25519_SIGNATURE_TYPE,
                publicKey: Converter.bytesToHex(signerKeyPair.publicKey, true),
                signature: Converter.bytesToHex(Ed25519.sign(signerKeyPair.privateKey, essenceHash), true)
            }
        }
    ];

    // Constructing Transaction Payload
    const txPayload: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: txEssence,
        unlocks
    };

    // Record some info for ourselves
    let nftOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0000";
    
    ctx.outputIdByName?.set(txName, nftOutputId);
    ctx.outputByName?.set(txName, nextNft);

    return txPayload;
}

function transferNftTxWithUnlockConditions(consumedOutput: lib.OutputTypes, consumedOutputId: string, basicOutput: lib.OutputTypes, basicOutputId: string, walletAddressHex: string, signerKeyPair: lib.IKeyPair, targetAddress: lib.AddressTypes, nodeInfo: lib.INodeInfo): lib.ITransactionPayload{
    // Prepare inputs to the tx
    let inputs: lib.IUTXOInput[] = [lib.TransactionHelper.inputFromOutputId(consumedOutputId), lib.TransactionHelper.inputFromOutputId(basicOutputId)];

    //transfer nft
    let nextNft = deepCopy(consumedOutput) as lib.INftOutput;
    nextNft.nftId = lib.TransactionHelper.resolveIdFromOutputId(consumedOutputId);
    
    //Change unlock conditions
    nextNft.unlockConditions = [
        {
            type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
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
            // milestoneIndex: nodeInfo.status.latestMilestone.index + 50 // We combine milestoneIndex and unixTime
            // expires to the wallet address
            returnAddress: {
                type: lib.ED25519_ADDRESS_TYPE,
                pubKeyHash: walletAddressHex
            },
        }
    ];

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

    const nftStorageDeposit = lib.TransactionHelper.getStorageDeposit(nextNft, nodeInfo.protocol.rentStructure);
    const remainderStorageDeposit = lib.TransactionHelper.getStorageDeposit(remainderOutput, nodeInfo.protocol.rentStructure);

    if ((nftStorageDeposit + remainderStorageDeposit) > parseInt(basicOutput.amount)) {
        throw new Error(`Insufficient funds to carry out the transaction, have ${parseInt(basicOutput.amount)} but need ${nftStorageDeposit + remainderStorageDeposit}`);
    }

    // Update amount fields
    // Put the bare minimum in nftOutput, leave the rest in remainder
    nextNft.amount = nftStorageDeposit.toString();
    // the storage unlock condition was the 2nd, so it has index 1.
    nextNft.unlockConditions[1] = {
        type: lib.STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
        // we want to get back every SMR/IOTA
        amount: nextNft.amount,
        returnAddress: {
            type: lib.ED25519_ADDRESS_TYPE,
            pubKeyHash: walletAddressHex
        },
    };
    
    remainderOutput.amount = (parseInt(basicOutput.amount) - (nftStorageDeposit - parseInt(consumedOutput.amount))).toString();

    // Calculate inputs commitment
    let inputsCommitment = lib.TransactionHelper.getInputsCommitment([consumedOutput, basicOutput]);

    // Construct tx essence
    const txEssence: lib.ITransactionEssence = {
        type: lib.TRANSACTION_ESSENCE_TYPE,
        networkId: getNetworkId(),
        inputs,
        outputs: [nextNft, remainderOutput],
        inputsCommitment,
    };

    // Calculating Transaction Essence Hash (to be signed in signature unlocks)
    const essenceHash = lib.TransactionHelper.getTransactionEssenceHash(txEssence);

    // We unlock the nft output
    let unlocks: lib.UnlockTypes[] = [
        {
            type: lib.SIGNATURE_UNLOCK_TYPE,
            signature: {
                type: lib.ED25519_SIGNATURE_TYPE,
                publicKey: Converter.bytesToHex(signerKeyPair.publicKey, true),
                signature: Converter.bytesToHex(Ed25519.sign(signerKeyPair.privateKey, essenceHash), true)
            }
        },
        { // reference unlock that unlocks basic output
            type: lib.REFERENCE_UNLOCK_TYPE,
            reference: 0
        }
    ];

    // Constructing Transaction Payload
    const txPayload: lib.ITransactionPayload = {
        type: lib.TRANSACTION_PAYLOAD_TYPE,
        essence: txEssence,
        unlocks
    };

    // Record some info for ourselves
    let nftOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0000";
    let reminderOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0100";

    ctx.outputIdByName?.set("tx4Nft2", nftOutputId);
    ctx.outputByName?.set("tx4Nft2", nextNft);
    ctx.outputIdByName?.set("tx4Basic", reminderOutputId);
    ctx.outputByName?.set("tx4Basic", remainderOutput);

    return txPayload;
}

function burnCollectionNft(txName: string, consumedOutput: lib.OutputTypes, consumedOutputId: string, signerKeyPair: lib.IKeyPair, targetAddress: lib.AddressTypes): lib.ITransactionPayload{
        // Prepare inputs to the tx
        let input: lib.IUTXOInput = lib.TransactionHelper.inputFromOutputId(consumedOutputId);
    
        // create basic output for the nft amount
        const remainderOutput: lib.IBasicOutput = {
            type: lib.BASIC_OUTPUT_TYPE,
            amount: consumedOutput.amount, // return nft amount to target address
            nativeTokens: [],
            unlockConditions: [
                // Send it to the target address
                {
                    type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: targetAddress,
                }
            ],
            features: [],
        }
        
        // Calculate inputs commitment
        let inputsCommitment = lib.TransactionHelper.getInputsCommitment([consumedOutput]);

        // Construct tx essence
        const txEssence: lib.ITransactionEssence = {
            type: lib.TRANSACTION_ESSENCE_TYPE,
            networkId: getNetworkId(),
            inputs: [input],
            outputs: [remainderOutput],
            inputsCommitment,
        };
    
        // Calculating Transaction Essence Hash (to be signed in signature unlocks)
        const essenceHash = lib.TransactionHelper.getTransactionEssenceHash(txEssence);
    
        // We unlock the nft output
        let unlocks: lib.UnlockTypes[] = [
            {
                type: lib.SIGNATURE_UNLOCK_TYPE,
                signature: {
                    type: lib.ED25519_SIGNATURE_TYPE,
                    publicKey: Converter.bytesToHex(signerKeyPair.publicKey, true),
                    signature: Converter.bytesToHex(Ed25519.sign(signerKeyPair.privateKey, essenceHash), true)
                }
            }
        ];
    
        // Constructing Transaction Payload
        const txPayload: lib.ITransactionPayload = {
            type: lib.TRANSACTION_PAYLOAD_TYPE,
            essence: txEssence,
            unlocks
        };
    
        // Record some info for ourselves
        let reminderOutputId = Converter.bytesToHex(lib.TransactionHelper.getTransactionPayloadHash(txPayload), true) + "0000";
        
        ctx.outputIdByName?.set(txName, reminderOutputId);
        ctx.outputByName?.set(txName, remainderOutput);
    
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
        const response = await fetch(FAUCET_ENQUEUE, {
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
async function setUpHotWallet(hrp: string, name: string) {
    // Generate a random seed
    const walletEd25519Seed = new lib.Ed25519Seed(randomBytes(32));

    // For Shimmer we use Coin Type 4219
    const path = new Bip32Path("m/44'/4219'/0'/0'/0'");

    // Construct wallet from seed
    const walletSeed = walletEd25519Seed.generateSeedFromPath(path);
    let walletKeyPair = walletSeed.keyPair();

    console.log(`Seed for hot wallet ${name}: ${Converter.bytesToHex(walletSeed.toBytes())}`);

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
        if (tries > maxTries) { break }
        tries++;
        console.log(`\tTry #${tries}: fetching basic output for address ${addressBech32}`)
        outputsResponse = await client.outputs({
            addressBech32: addressBech32,
            hasStorageReturnCondition: false,
            hasExpirationCondition: false,
            hasTimelockCondition: false,
            hasNativeTokens: false,
        });
        if (outputsResponse.items.length == 0) {
            console.log("\tDidn't find any, retrying soon...")
            await new Promise(f => setTimeout(f, 1500));
        }
    }
    if (tries > maxTries) {
        throw new Error(`Didn't find any outputs for address ${addressBech32}`);
    }
    return outputsResponse.items[0]
};

//Create NFT collection outputs that will be mionted using collectionNft
function createNftCollectionOutputs(issuerAddress: lib.INftAddress, targetAddress: lib.AddressTypes, royaltyAddress: string, collectionSize: number, nodeInfo: lib.INodeInfo): { outputs: lib.INftOutput[], totalDeposit: number }{
    let nftCollection: {
        outputs: lib.INftOutput[],
        totalDeposit: number
    } = { outputs:[], totalDeposit: 0 };

    for (let i = 0; i < collectionSize; i++) {
        const nft = {
            "standard" : "IRC27",
            "type": "image",
            "version": "v1.0",
            "tokenURI": "https://mywebsite.com/myfile" + i + ".png",
            "tokenName": "My NFT #" + i,
            "collectionId": issuerAddress.nftId,
            "collectionName": "My Collection of Art",
            "royalties": {
                [royaltyAddress]: 0.025
            },
            "issuerName": "My Artist Name",
            "description": "A little information about my NFT collection"
        }
        // Create the outputs, that is an NFT output
        let nftOutput: lib.INftOutput = {
            type: lib.NFT_OUTPUT_TYPE,
            amount: "0", // for now zero as we don't know the byte cost yet
            // when minting, this has to be set to zero. It will be set in nodes as the hash of the outputId when the tx confirms.
            // Note, that from the first spend of the NFT you have to use the actual hash of outputId
            nftId: "0x0000000000000000000000000000000000000000000000000000000000000000",
            immutableFeatures: [
                {
                    type: lib.ISSUER_FEATURE_TYPE, // Issuer feature
                    address: issuerAddress,
                },
                {
                    type: lib.METADATA_FEATURE_TYPE, // Metadata Feature
                    data: Converter.utf8ToHex(JSON.stringify(nft), true)
                }
            ],
            unlockConditions: [
                {
                    type: lib.ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: targetAddress, // minting it directly onto target address
                }
            ]
        }
        //calculate required storage
        const requiredStorageDeposit = lib.TransactionHelper.getStorageDeposit(nftOutput, nodeInfo.protocol.rentStructure);

        //Change NFT output amount to requred deposit storage
        nftOutput.amount = requiredStorageDeposit.toString();
       
        nftCollection.totalDeposit += requiredStorageDeposit;
        nftCollection.outputs.push(nftOutput);
    }

    return nftCollection;
}

// Chain together transaction payloads via blocks.
// To reference the previous block, we need to calculate its blockId.
// To calculate blockId, we need to set the parents and perform pow to get the nonce.
//
// The first block will have parents fetched from the tangle. The subsequent blocks refernce always the previous block as parent.
async function chainTrasactionsViaBlocks(client: lib.SingleNodeClient, txs: Array<lib.ITransactionPayload>, minPoWScore: number): Promise<Array<lib.IBlock>> {
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
        const blockNonce = await caluclateNonce(block, minPoWScore);

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
// Performs PoW on a block to calculate nonce. Uses NeonPowProvider.
async function caluclateNonce(block: lib.IBlock, minPoWScore: number): Promise<string> {
    const writeStream = new WriteStream();
    lib.serializeBlock(writeStream, block);
    const blockBytes = writeStream.finalBytes();

    if (blockBytes.length > lib.MAX_BLOCK_LENGTH) {
        throw new Error(
            `The block length is ${blockBytes.length}, which exceeds the maximum size of ${lib.MAX_BLOCK_LENGTH}`
        );
    }

    const powProvider = new NeonPowProvider();
    const nonce = await powProvider.pow(blockBytes, minPoWScore);
    return nonce.toString();
}

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
