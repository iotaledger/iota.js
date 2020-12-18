import { Bech32Helper, Bip32Path, Bip39, Converter, Ed25519Address, Ed25519Seed, ED25519_ADDRESS_TYPE, generateBip44Address, IOTA_BIP44_BASE_PATH } from "@iota/iota.js";

async function run() {
    console.log("Base");

    // Generate a random mnenomic.
    const randomMnemonic = Bip39.randomMnemonic();
    console.log("\tMnenomic:", randomMnemonic)

    // Generate the seed from the mnenomic
    const baseSeed = Ed25519Seed.fromMnemonic(randomMnemonic);

    console.log("\tSeed", Converter.bytesToHex(baseSeed.toBytes()));

    // Seed has public and private key
    const baseSeedKeyPair = baseSeed.keyPair();
    console.log("\tPrivate Key", Converter.bytesToHex(baseSeedKeyPair.privateKey));
    console.log("\tPublic Key", Converter.bytesToHex(baseSeedKeyPair.publicKey));

    // Get the address for the seed which is actually the Blake2b.sum256 of the public key
    // display it in both Ed25519 and Bech 32 format
    const baseEd25519Address = new Ed25519Address(baseSeedKeyPair.publicKey);
    const basePublicKeyAddress = baseEd25519Address.toAddress();
    console.log("\tPublic Key Address Ed25519", Converter.bytesToHex(basePublicKeyAddress));
    console.log("\tPublic Key Address Bech32", Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, basePublicKeyAddress));
    console.log();

    // Generate the next addresses for your account.
    console.log();
    console.log("Generated Addresses using Bip44 Format");
    const addressGeneratorAccountState = {
        accountIndex: 0,
        addressIndex: 0,
        isInternal: false
    };
    for (let i = 0; i < 6; i++) {
        const path = generateBip44Address(addressGeneratorAccountState, i === 0);

        console.log(`Wallet Index ${path}`);

        const addressSeed = baseSeed.generateSeedFromPath(new Bip32Path(path));
        const addressKeyPair = addressSeed.keyPair();

        console.log("\tPrivate Key", Converter.bytesToHex(addressKeyPair.privateKey));
        console.log("\tPublic Key", Converter.bytesToHex(addressKeyPair.publicKey));

        const indexEd25519Address = new Ed25519Address(addressKeyPair.publicKey);
        const indexPublicKeyAddress = indexEd25519Address.toAddress();
        console.log("\tAddress Ed25519", Converter.bytesToHex(indexPublicKeyAddress));
        console.log("\tAddress Bech32", Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, indexPublicKeyAddress));
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
        console.log("\tPrivate Key", Converter.bytesToHex(indexSeedKeyPair.privateKey));
        console.log("\tPublic Key", Converter.bytesToHex(indexSeedKeyPair.publicKey));

        // Get the address for the path seed which is actually the Blake2b.sum256 of the public key
        // display it in both Ed25519 and Bech 32 format
        const indexEd25519Address = new Ed25519Address(indexSeedKeyPair.publicKey);
        const indexPublicKeyAddress = indexEd25519Address.toAddress();
        console.log("\tAddress Ed25519", Converter.bytesToHex(indexPublicKeyAddress));
        console.log("\tAddress Bech32", Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, indexPublicKeyAddress));
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
    .catch((err) => console.error(err));