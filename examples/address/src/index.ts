import { Bip39, Bech32Helper, Bip32Path, Converter, Ed25519Address, Ed25519Seed, ED25519_ADDRESS_TYPE, RandomHelper } from "@iota/iota.js";

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
    const baseEd25519Address = new Ed25519Address();
    const basePublicKeyAddress = baseEd25519Address.publicKeyToAddress(baseSeedKeyPair.publicKey);
    console.log("\tPublic Key Address Ed25519", Converter.bytesToHex(basePublicKeyAddress));
    console.log("\tPublic Key Address Bech32", Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, basePublicKeyAddress));
    console.log();

    // Now generate some additional addresses using Bip32
    const basePath = new Bip32Path("m/0");
    for (let i = 0; i < 10; i++) {
        basePath.push(i);

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
        const indexEd25519Address = new Ed25519Address();
        const indexPublicKeyAddress = indexEd25519Address.publicKeyToAddress(indexSeedKeyPair.publicKey);
        console.log("\tAddress Ed25519", Converter.bytesToHex(indexPublicKeyAddress));
        console.log("\tAddress Bech32", Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, indexPublicKeyAddress));
        console.log();

        basePath.pop();

    }
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));