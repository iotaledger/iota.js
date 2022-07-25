import { Bip32Path } from "@iota/crypto.js";
import {
    BASIC_OUTPUT_TYPE, Bech32Helper,
    Ed25519Address,
    Ed25519Seed,
    ED25519_ADDRESS_TYPE,
    getBalance,
    getUnspentAddress,
    getUnspentAddresses, IBasicOutput, IKeyPair, IndexerPluginClient, IOutputsResponse, IUTXOInput,
    OutputTypes,
    sendAdvanced, SingleNodeClient,
    UTXO_INPUT_TYPE
} from "@iota/iota.js";
import { Converter } from "@iota/util.js";
import { NeonPowProvider } from "@iota/pow-neon.js";
import bigInt, { BigInteger } from "big-integer";
import fetch from "node-fetch";
import { randomBytes } from "node:crypto";

const API_ENDPOINT = "https://api.alphanet.iotaledger.net/";
const FAUCET = "https://faucet.alphanet.iotaledger.net/api/enqueue" 

// If running the node locally
// const API_ENDPOINT = "http://localhost:14265/";
// const FAUCET = "http://localhost:8091/api/enqueue"; 

async function run() {
    const client = new SingleNodeClient(API_ENDPOINT, {powProvider: new NeonPowProvider()});
    const nodeInfo = await client.info();

    // Generate the seed from the Mnemonic
    // const mnemonic =
    //     "assist file add kidney sense anxiety march quality sphere stamp crime swift mystery bind thrive impact walk solar asset pottery nation dutch column beef";
    // const genesisSeed = Ed25519Seed.fromMnemonic(mnemonic);
    
    // Generate the seed from random bytes
    const genesisSeed =  new Ed25519Seed(randomBytes(32));

    const genesisPath = new Bip32Path("m/44'/4218'/0'/0'/0'");
    const genesisWalletSeed = genesisSeed.generateSeedFromPath(genesisPath);
    const genesisWalletKeyPair = genesisWalletSeed.keyPair();

    // Get the address for the path seed which is actually the Blake2b.sum256 of the public key
    // display it in both Ed25519 and Bech 32 format
    const genesisEd25519Address = new Ed25519Address(genesisWalletKeyPair.publicKey);
    const genesisWalletAddress = genesisEd25519Address.toAddress();
    const genesisWalletAddressHex = Converter.bytesToHex(genesisWalletAddress, true);
    const genesisWalletAddressBech32 = Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, genesisWalletAddress, nodeInfo.protocol.bech32Hrp);

    console.log("Genesis");
    console.log("\tSeed", Converter.bytesToHex(genesisWalletSeed.toBytes()));
    console.log("\tAddress Ed25519", genesisWalletAddressHex);
    console.log("\tAddress Bech32", genesisWalletAddressBech32);

    // Create a new seed for the wallet
    const walletSeed = new Ed25519Seed(
        Converter.hexToBytes("e57fb750f3a3a67969ece5bd9ae7eef5b2256a818b2aac458941f7274985a410")
    );

    // Use the new seed like a wallet with Bip32 Paths 44,4128,accountIndex,isInternal,addressIndex
    const walletPath = new Bip32Path("m/44'/4218'/0'/0'/0'");
    const walletAddressSeed = walletSeed.generateSeedFromPath(walletPath);
    const walletEd25519Address = new Ed25519Address(walletAddressSeed.keyPair().publicKey);
    const newAddress = walletEd25519Address.toAddress();
    const newAddressHex = Converter.bytesToHex(newAddress, true);

    console.log("Wallet 1");
    console.log("\tSeed:", Converter.bytesToHex(walletSeed.toBytes()));
    console.log("\tPath:", walletPath.toString());
    console.log(`\tAddress Ed25519 ${walletPath.toString()}:`, newAddressHex);
    console.log(
        `\tAddress Bech32 ${walletPath.toString()}:`,
        Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, newAddress, nodeInfo.protocol.bech32Hrp)
    );

    //Request funds from faucet
    const genesisFunds = await requestFunds(FAUCET, genesisWalletAddressBech32);
    console.log("genesisFunds: ", genesisFunds)

    // Because we are using the genesis address we must use send advanced as the input address is
    // not calculated from a Bip32 path, if you were doing a wallet to wallet transfer you can just use send
    // which calculates all the inputs/outputs for you
    const indexerPlugin = new IndexerPluginClient(client);
    // const genesisAddressOutputs = await indexerPlugin.outputs({ addressBech32: genesisWalletAddressBech32 });
    const genesisAddressOutputs = await fetchAndWaitForBasicOutputs(genesisWalletAddressBech32, indexerPlugin);

    const inputsWithKeyPairs: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
        consumingOutput: OutputTypes;
    }[] = [];

    let totalGenesis: BigInteger = bigInt(0);

    for (let i = 0; i < genesisAddressOutputs.items.length; i++) {
        const output = await client.output(genesisAddressOutputs.items[i]);
        if (!output.metadata.isSpent) {
            inputsWithKeyPairs.push({
                input: {
                    type: UTXO_INPUT_TYPE,
                    transactionId: output.metadata.transactionId,
                    transactionOutputIndex: output.metadata.outputIndex
                },
                addressKeyPair: genesisWalletKeyPair,
                consumingOutput: output.output
            });
            if (output.output.type === BASIC_OUTPUT_TYPE) {
                totalGenesis = totalGenesis.plus((output.output as IBasicOutput).amount);
            }
        }
    }

    const amountToSend = bigInt(10000000);

    const outputs: {
        address: string;
        addressType: number;
        amount: BigInteger;
    }[] = [
            // This is the transfer to the new address
            {
                address: newAddressHex,
                addressType: ED25519_ADDRESS_TYPE,
                amount: amountToSend
            },
            // Sending remainder back to genesis
            {
                address: genesisWalletAddressHex,
                addressType: ED25519_ADDRESS_TYPE,
                amount: totalGenesis.minus(amountToSend)
            }
        ];

    const { blockId } = await sendAdvanced(client, inputsWithKeyPairs, outputs, {
        tag: Converter.utf8ToBytes("WALLET"),
        data: Converter.utf8ToBytes("Fireflea")
    });

    console.log("Created Block Id", blockId);

    const newAddressBalance = await getBalance(client, walletSeed, 0);
    console.log("Wallet 1 Address Balance", newAddressBalance);

    const unspentAddress = await getUnspentAddress(client, walletSeed, 0);
    console.log("Wallet 1 First Unspent Address", unspentAddress);

    const allUspentAddresses = await getUnspentAddresses(client, walletSeed, 0);
    console.log("Wallet 1 Unspent Addresses", allUspentAddresses);
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
    
async function requestFunds(url: string, addressBech32: string): Promise<object> {
    const requestFounds = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ address: addressBech32 })
        });

    return await requestFounds.json();
}

async function fetchAndWaitForBasicOutputs(addressBech32: string, client: IndexerPluginClient): Promise<IOutputsResponse> {
    let outputsResponse: IOutputsResponse = { ledgerIndex: 0, cursor: "", pageSize: "", items: [] };
    let maxTries = 10;
    let tries = 0;
    while(outputsResponse.items.length == 0 ){
        if (tries > maxTries){break}
        tries++;
        console.log("\tTry #",tries,": fetching basic output for address ", addressBech32)
        outputsResponse = await client.outputs({
            addressBech32: addressBech32,
            hasStorageReturnCondition: false,
            hasExpirationCondition: false,
            hasTimelockCondition: false,
            hasNativeTokens: false,
        });
        if(outputsResponse.items.length == 0){
            console.log("\tDidn't find any, retrying soon...")
            await new Promise(f => setTimeout(f, 1000));}
    }
    if(tries > maxTries){
        throw new Error("Didn't find any outputs for address");
    }
    
    return outputsResponse;
};
