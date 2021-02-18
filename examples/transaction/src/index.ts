import { Bech32Helper, Bip32Path, Converter, Ed25519Address, Ed25519Seed, ED25519_ADDRESS_TYPE, getBalance, getUnspentAddress, getUnspentAddresses, IKeyPair, ISigLockedSingleOutput, IUTXOInput, sendAdvanced, SIG_LOCKED_SINGLE_OUTPUT_TYPE, SingleNodeClient, UTXO_INPUT_TYPE } from "@iota/iota.js";

const API_ENDPOINT = "http://localhost:14265";

async function run() {
    const client = new SingleNodeClient(API_ENDPOINT);

    const nodeInfo = await client.info();

    // These are the default values from the Hornet alphanet configuration
    const privateKey = "256a818b2aac458941f7274985a410e57fb750f3a3a67969ece5bd9ae7eef5b2f7868ab6bb55800b77b8b74191ad8285a9bf428ace579d541fda47661803ff44";
    const publicKey = "f7868ab6bb55800b77b8b74191ad8285a9bf428ace579d541fda47661803ff44";

    console.log("Genesis");
    console.log("\tPrivate Key:", privateKey);
    console.log("\tPublic Key:", publicKey);

    const genesisSeedKeyPair: IKeyPair = {
        privateKey: Converter.hexToBytes(privateKey),
        publicKey: Converter.hexToBytes(publicKey)
    };

    const ed25519Address = new Ed25519Address(genesisSeedKeyPair.publicKey);
    const genesisAddress = ed25519Address.toAddress();
    const genesisAddressHex = Converter.bytesToHex(genesisAddress);
    console.log("\tAddress Ed25519:", genesisAddressHex);
    console.log("\tAddress Bech32:", Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, genesisAddress, nodeInfo.bech32HRP));

    // Create a new seed for the wallet
    const walletSeed = new Ed25519Seed(Converter.hexToBytes("e57fb750f3a3a67969ece5bd9ae7eef5b2256a818b2aac458941f7274985a410"));

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
    console.log(`\tAddress Bech32 ${walletPath.toString()}:`, Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, newAddress, nodeInfo.bech32HRP));
    console.log();

    // Because we are using the genesis address we must use send advanced as the input address is
    // not calculated from a Bip32 path, if you were doing a wallet to wallet transfer you can just use send
    // which calculates all the inputs/outputs for you
    const genesisAddressOutputs = await client.addressEd25519Outputs(genesisAddressHex);

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
                addressKeyPair: genesisSeedKeyPair
            });
            if (output.output.type === SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
                totalGenesis += (output.output as ISigLockedSingleOutput).amount;
            }
        }
    }

    const amountToSend = 10000000;

    const outputs: {
        address: string;
        addressType: number,
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
                address: genesisAddressHex,
                addressType: ED25519_ADDRESS_TYPE,
                amount: totalGenesis - amountToSend
            }
        ];

    const { messageId } = await sendAdvanced(
        client,
        inputsWithKeyPairs,
        outputs,
        {
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
    .catch((err) => console.error(err));