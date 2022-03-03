import { Converter } from "@iota/util.js";
import { Bip32Path, Bip39 } from "@iota/crypto.js";
import {
    Bech32Helper,
    Ed25519Address,
    Ed25519Seed,
    ED25519_ADDRESS_TYPE,
    generateBip44Address,
    IOTA_BIP44_BASE_PATH,
    SingleNodeClient
} from "@iota/iota.js";

const API_ENDPOINT = "http://localhost:14265/";

async function run() {
    const client = new SingleNodeClient(API_ENDPOINT);

    const info = await client.info();

    console.log("Base");

    // Generate a random mnemonic.
    const randomMnemonic = Bip39.randomMnemonic();
    console.log("\tMnemonic:", randomMnemonic);

    // Generate the seed from the Mnemonic
    const baseSeed = Ed25519Seed.fromMnemonic(randomMnemonic);
    console.log("\tSeed", Converter.bytesToHex(baseSeed.toBytes()));

    // Generate the next addresses for your account.
    console.log();
    console.log("Generated Addresses using Bip44 Format");
    const addressGeneratorAccountState = {
        accountIndex: 0,
        addressIndex: 0,
        isInternal: false
    };
    for (let i = 0; i < 6; i++) {
        const path = generateBip44Address(addressGeneratorAccountState);

        console.log(`Wallet Index ${path}`);

        const addressSeed = baseSeed.generateSeedFromPath(new Bip32Path(path));
        const addressKeyPair = addressSeed.keyPair();

        console.log("\tPrivate Key", Converter.bytesToHex(addressKeyPair.privateKey, true));
        console.log("\tPublic Key", Converter.bytesToHex(addressKeyPair.publicKey, true));

        const indexEd25519Address = new Ed25519Address(addressKeyPair.publicKey);
        const indexPublicKeyAddress = indexEd25519Address.toAddress();
        console.log("\tAddress Ed25519", Converter.bytesToHex(indexPublicKeyAddress, true));
        console.log(
            "\tAddress Bech32",
            Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, indexPublicKeyAddress, info.protocol.bech32HRP)
        );
        console.log();
    }

    console.log();
    console.log("Generated Addresses manually using Bip44 Format");
    console.log();

    // You can perform the same process as the generator manually as follows.
    const basePath = new Bip32Path(IOTA_BIP44_BASE_PATH);
    const accountIndex = 0;
    let isInternal = false;
    let addressIndex = 0;
    for (let i = 0; i < 6; i++) {
        basePath.pushHardened(accountIndex);
        basePath.pushHardened(isInternal ? 1 : 0);
        basePath.pushHardened(addressIndex);

        console.log(`Wallet Index ${basePath.toString()}`);

        // Create a new seed from the base seed using the path
        const indexSeed = baseSeed.generateSeedFromPath(basePath);
        console.log("\tSeed", Converter.bytesToHex(indexSeed.toBytes()));

        // Get the public and private keys for the path seed
        const indexSeedKeyPair = indexSeed.keyPair();
        console.log("\tPrivate Key", Converter.bytesToHex(indexSeedKeyPair.privateKey, true));
        console.log("\tPublic Key", Converter.bytesToHex(indexSeedKeyPair.publicKey, true));

        // Get the address for the path seed which is actually the Blake2b.sum256 of the public key
        // display it in both Ed25519 and Bech 32 format
        const indexEd25519Address = new Ed25519Address(indexSeedKeyPair.publicKey);
        const indexPublicKeyAddress = indexEd25519Address.toAddress();
        console.log("\tAddress Ed25519", Converter.bytesToHex(indexPublicKeyAddress, true));
        console.log(
            "\tAddress Bech32",
            Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, indexPublicKeyAddress, info.protocol.bech32HRP)
        );
        console.log();

        basePath.pop();
        basePath.pop();
        basePath.pop();

        if (isInternal) {
            addressIndex++;
        }
        isInternal = !isInternal;
    }
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
