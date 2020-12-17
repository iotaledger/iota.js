import { Bech32Helper, Bip32Path, Bip39, Converter, DEFAULT_BIP32_ACCOUNT_PATH, Ed25519Address, Ed25519Seed, ED25519_ADDRESS_TYPE, generateAccountAddress, generateBip32Address } from "@iota/iota.js";

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

    // Now generate some additional addresses using Bip32 and the default wallet path
    const basePath = new Bip32Path(DEFAULT_BIP32_ACCOUNT_PATH);
    const accountIndex = 0;
    const isInternal = true;
    for (let addressIndex = 0; addressIndex < 10; addressIndex++) {
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
    }

    // This can also be achieved using the address builders, this will include
    // both internal and external addresses.
    console.log();
    console.log("Generated Addresses using Account Format");
    const addressGeneratorAccountState = {
        seed: baseSeed,
        accountIndex,
        addressIndex: 0,
        isInternal
    };
    for (let i = 0; i < 20; i++) {
        const path = generateAccountAddress(addressGeneratorAccountState, i === 0)

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
    console.log("Generated Addresses using Bip32 Format");
    const addressGeneratorBip32State = {
        seed: baseSeed,
        addressIndex: 0,
        basePath: new Bip32Path("m/123'/456'")
    };
    for (let i = 0; i < 10; i++) {
        const path = generateBip32Address(addressGeneratorBip32State, i === 0)
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
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));