import { Bip32Path } from "@iota/crypto.js";
import {
    Bech32Helper,
    Ed25519Address,
    Ed25519Seed,
    ED25519_ADDRESS_TYPE,
    getBalance,
    getUnspentAddress,
    getUnspentAddresses,
    IKeyPair,
    ISigLockedSingleOutput,
    IUTXOInput,
    sendAdvanced,
    SIG_LOCKED_SINGLE_OUTPUT_TYPE,
    SingleNodeClient,
    UTXO_INPUT_TYPE
} from "@iota/iota.js";
import { Converter } from "@iota/util.js";

const API_ENDPOINT = "https://chrysalis-nodes.iota.org";

async function run() {
    const client = new SingleNodeClient(API_ENDPOINT);

    const nodeInfo = await client.info();

    // These are the default values from the Hornet alphanet configuration
    const mnemonic =
        "giant dynamic museum toddler six deny defense ostrich bomb access mercy blood explain muscle shoot shallow glad autumn author calm heavy hawk abuse rally";

    // Generate the seed from the Mnemonic
    const genesisSeed = Ed25519Seed.fromMnemonic(mnemonic);

    console.log("Genesis");

    const genesisPath = new Bip32Path("m/44'/4218'/0'/0'/0'");

    const genesisWalletSeed = genesisSeed.generateSeedFromPath(genesisPath);
    const genesisWalletKeyPair = genesisWalletSeed.keyPair();
    console.log("\tSeed", Converter.bytesToHex(genesisWalletSeed.toBytes()));

    // Get the address for the path seed which is actually the Blake2b.sum256 of the public key
    // display it in both Ed25519 and Bech 32 format
    const genesisEd25519Address = new Ed25519Address(genesisWalletKeyPair.publicKey);
    const genesisWalletAddress = genesisEd25519Address.toAddress();
    const genesisWalletAddressHex = Converter.bytesToHex(genesisWalletAddress);
    console.log("\tAddress Ed25519", genesisWalletAddressHex);
    console.log(
        "\tAddress Bech32",
        Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, genesisWalletAddress, nodeInfo.bech32HRP)
    );

    // Create a new seed for the wallet
    const walletSeed = new Ed25519Seed(
        Converter.hexToBytes("e57fb750f3a3a67969ece5bd9ae7eef5b2256a818b2aac458941f7274985a410")
    );

    // Use the new seed like a wallet with Bip32 Paths 44,4128,accountIndex,isInternal,addressIndex
    const walletPath = new Bip32Path("m/44'/4218'/0'/0'/0'");
    const walletAddressSeed = walletSeed.generateSeedFromPath(walletPath);
    const walletEd25519Address = new Ed25519Address(walletAddressSeed.keyPair().publicKey);
    const newAddress = walletEd25519Address.toAddress();
    const newAddressHex = Converter.bytesToHex(newAddress);

    console.log("Wallet 1");
    console.log("\tSeed:", Converter.bytesToHex(walletSeed.toBytes()));
    console.log("\tPath:", walletPath.toString());
    console.log(`\tAddress Ed25519 ${walletPath.toString()}:`, newAddressHex);
    console.log(
        `\tAddress Bech32 ${walletPath.toString()}:`,
        Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, newAddress, nodeInfo.bech32HRP)
    );
    console.log();

    // Because we are using the genesis address we must use send advanced as the input address is
    // not calculated from a Bip32 path, if you were doing a wallet to wallet transfer you can just use send
    // which calculates all the inputs/outputs for you
    const genesisAddressOutputs = await client.addressEd25519Outputs(genesisWalletAddressHex);

    const inputsWithKeyPairs: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
    }[] = [];

    let totalGenesis = 0;

    for (let i = 0; i < genesisAddressOutputs.outputIds.length; i++) {
        const output = await client.output(genesisAddressOutputs.outputIds[i]);
        if (!output.isSpent) {
            inputsWithKeyPairs.push({
                input: {
                    type: UTXO_INPUT_TYPE,
                    transactionId: output.transactionId,
                    transactionOutputIndex: output.outputIndex
                },
                addressKeyPair: genesisWalletKeyPair
            });
            if (output.output.type === SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
                totalGenesis += (output.output as ISigLockedSingleOutput).amount;
            }
        }
    }

    const amountToSend = 10000000;

    const outputs: {
        address: string;
        addressType: number;
        amount: number;
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
            amount: totalGenesis - amountToSend
        }
    ];

    const { messageId } = await sendAdvanced(client, inputsWithKeyPairs, outputs, {
        key: Converter.utf8ToBytes("WALLET"),
        data: Converter.utf8ToBytes("Not trinity")
    });

    console.log("Created Message Id", messageId);

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
