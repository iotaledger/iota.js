"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_js_1 = require("@iota/util.js");
const crypto_js_1 = require("@iota/crypto.js");
const iota_js_1 = require("@iota/iota.js");
const API_ENDPOINT = "http://localhost:14265/";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new iota_js_1.SingleNodeClient(API_ENDPOINT);
        const info = yield client.info();
        console.log("Base");
        // Generate a random mnemonic.
        const randomMnemonic = crypto_js_1.Bip39.randomMnemonic();
        console.log("\tMnemonic:", randomMnemonic);
        // Generate the seed from the Mnemonic
        const baseSeed = iota_js_1.Ed25519Seed.fromMnemonic(randomMnemonic);
        console.log("\tSeed", util_js_1.Converter.bytesToHex(baseSeed.toBytes()));
        // Generate the next addresses for your account.
        console.log();
        console.log("Generated Addresses using Bip44 Format");
        const addressGeneratorAccountState = {
            accountIndex: 0,
            addressIndex: 0,
            isInternal: false
        };
        for (let i = 0; i < 6; i++) {
            const path = (0, iota_js_1.generateBip44Address)(addressGeneratorAccountState);
            console.log(`Wallet Index ${path}`);
            const addressSeed = baseSeed.generateSeedFromPath(new crypto_js_1.Bip32Path(path));
            const addressKeyPair = addressSeed.keyPair();
            console.log("\tPrivate Key", util_js_1.Converter.bytesToHex(addressKeyPair.privateKey));
            console.log("\tPublic Key", util_js_1.Converter.bytesToHex(addressKeyPair.publicKey));
            const indexEd25519Address = new iota_js_1.Ed25519Address(addressKeyPair.publicKey);
            const indexPublicKeyAddress = indexEd25519Address.toAddress();
            console.log("\tAddress Ed25519", util_js_1.Converter.bytesToHex(indexPublicKeyAddress));
            console.log("\tAddress Bech32", iota_js_1.Bech32Helper.toBech32(iota_js_1.ED25519_ADDRESS_TYPE, indexPublicKeyAddress, info.protocol.bech32HRP));
            console.log();
        }
        console.log();
        console.log("Generated Addresses manually using Bip44 Format");
        console.log();
        // You can perform the same process as the generator manually as follows.
        const basePath = new crypto_js_1.Bip32Path(iota_js_1.IOTA_BIP44_BASE_PATH);
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
            console.log("\tSeed", util_js_1.Converter.bytesToHex(indexSeed.toBytes()));
            // Get the public and private keys for the path seed
            const indexSeedKeyPair = indexSeed.keyPair();
            console.log("\tPrivate Key", util_js_1.Converter.bytesToHex(indexSeedKeyPair.privateKey));
            console.log("\tPublic Key", util_js_1.Converter.bytesToHex(indexSeedKeyPair.publicKey));
            // Get the address for the path seed which is actually the Blake2b.sum256 of the public key
            // display it in both Ed25519 and Bech 32 format
            const indexEd25519Address = new iota_js_1.Ed25519Address(indexSeedKeyPair.publicKey);
            const indexPublicKeyAddress = indexEd25519Address.toAddress();
            console.log("\tAddress Ed25519", util_js_1.Converter.bytesToHex(indexPublicKeyAddress));
            console.log("\tAddress Bech32", iota_js_1.Bech32Helper.toBech32(iota_js_1.ED25519_ADDRESS_TYPE, indexPublicKeyAddress, info.protocol.bech32HRP));
            console.log();
            basePath.pop();
            basePath.pop();
            basePath.pop();
            if (isInternal) {
                addressIndex++;
            }
            isInternal = !isInternal;
        }
    });
}
run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFDMUMsK0NBQW1EO0FBQ25ELDJDQVF1QjtBQUV2QixNQUFNLFlBQVksR0FBRyx5QkFBeUIsQ0FBQztBQUUvQyxTQUFlLEdBQUc7O1FBQ2QsTUFBTSxNQUFNLEdBQUcsSUFBSSwwQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsRCxNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVqQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBCLDhCQUE4QjtRQUM5QixNQUFNLGNBQWMsR0FBRyxpQkFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRTNDLHNDQUFzQztRQUN0QyxNQUFNLFFBQVEsR0FBRyxxQkFBVyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxtQkFBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWhFLGdEQUFnRDtRQUNoRCxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7UUFDdEQsTUFBTSw0QkFBNEIsR0FBRztZQUNqQyxZQUFZLEVBQUUsQ0FBQztZQUNmLFlBQVksRUFBRSxDQUFDO1lBQ2YsVUFBVSxFQUFFLEtBQUs7U0FDcEIsQ0FBQztRQUNGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBQSw4QkFBb0Is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