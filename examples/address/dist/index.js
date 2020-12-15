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
const iota_js_1 = require("@iota/iota.js");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Base");
        // Generate a random mnenomic.
        const randomMnemonic = iota_js_1.Bip39.randomMnemonic();
        console.log("\tMnenomic:", randomMnemonic);
        // Generate the seed from the mnenomic
        const baseSeed = iota_js_1.Ed25519Seed.fromMnemonic(randomMnemonic);
        console.log("\tSeed", iota_js_1.Converter.bytesToHex(baseSeed.toBytes()));
        // Seed has public and private key
        const baseSeedKeyPair = baseSeed.keyPair();
        console.log("\tPrivate Key", iota_js_1.Converter.bytesToHex(baseSeedKeyPair.privateKey));
        console.log("\tPublic Key", iota_js_1.Converter.bytesToHex(baseSeedKeyPair.publicKey));
        // Get the address for the seed which is actually the Blake2b.sum256 of the public key
        // display it in both Ed25519 and Bech 32 format
        const baseEd25519Address = new iota_js_1.Ed25519Address();
        const basePublicKeyAddress = baseEd25519Address.publicKeyToAddress(baseSeedKeyPair.publicKey);
        console.log("\tPublic Key Address Ed25519", iota_js_1.Converter.bytesToHex(basePublicKeyAddress));
        console.log("\tPublic Key Address Bech32", iota_js_1.Bech32Helper.toBech32(iota_js_1.ED25519_ADDRESS_TYPE, basePublicKeyAddress));
        console.log();
        // Now generate some additional addresses using Bip32
        const basePath = new iota_js_1.Bip32Path("m/0");
        for (let i = 0; i < 10; i++) {
            basePath.push(i);
            console.log(`Wallet Index ${basePath.toString()}`);
            // Create a new seed from the base seed using the path
            const indexSeed = baseSeed.generateSeedFromPath(basePath);
            console.log("\tSeed", iota_js_1.Converter.bytesToHex(indexSeed.toBytes()));
            // Get the public and private keys for the path seed
            const indexSeedKeyPair = indexSeed.keyPair();
            console.log("\tPrivate Key", iota_js_1.Converter.bytesToHex(indexSeedKeyPair.privateKey));
            console.log("\tPublic Key", iota_js_1.Converter.bytesToHex(indexSeedKeyPair.publicKey));
            // Get the address for the path seed which is actually the Blake2b.sum256 of the public key
            // display it in both Ed25519 and Bech 32 format
            const indexEd25519Address = new iota_js_1.Ed25519Address();
            const indexPublicKeyAddress = indexEd25519Address.publicKeyToAddress(indexSeedKeyPair.publicKey);
            console.log("\tAddress Ed25519", iota_js_1.Converter.bytesToHex(indexPublicKeyAddress));
            console.log("\tAddress Bech32", iota_js_1.Bech32Helper.toBech32(iota_js_1.ED25519_ADDRESS_TYPE, indexPublicKeyAddress));
            console.log();
            basePath.pop();
        }
    });
}
run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMkk7QUFFM0ksU0FBZSxHQUFHOztRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEIsOEJBQThCO1FBQzlCLE1BQU0sY0FBYyxHQUFHLGVBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQTtRQUUxQyxzQ0FBc0M7UUFDdEMsTUFBTSxRQUFRLEdBQUcscUJBQVcsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsbUJBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVoRSxrQ0FBa0M7UUFDbEMsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLG1CQUFTLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQy9FLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLG1CQUFTLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRTdFLHNGQUFzRjtRQUN0RixnREFBZ0Q7UUFDaEQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLHdCQUFjLEVBQUUsQ0FBQztRQUNoRCxNQUFNLG9CQUFvQixHQUFHLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5RixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixFQUFFLG1CQUFTLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUN4RixPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLHNCQUFZLENBQUMsUUFBUSxDQUFDLDhCQUFvQixFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUM5RyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFZCxxREFBcUQ7UUFDckQsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVqQixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRW5ELHNEQUFzRDtZQUN0RCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsbUJBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVqRSxvREFBb0Q7WUFDcEQsTUFBTSxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsbUJBQVMsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNoRixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxtQkFBUyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBRTlFLDJGQUEyRjtZQUMzRixnREFBZ0Q7WUFDaEQsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLHdCQUFjLEVBQUUsQ0FBQztZQUNqRCxNQUFNLHFCQUFxQixHQUFHLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pHLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsbUJBQVMsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBQzlFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsc0JBQVksQ0FBQyxRQUFRLENBQUMsOEJBQW9CLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVkLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUVsQjtJQUNMLENBQUM7Q0FBQTtBQUVELEdBQUcsRUFBRTtLQUNBLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQy9CLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDIn0=