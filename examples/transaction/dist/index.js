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
const API_ENDPOINT = "http://localhost:14265";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new iota_js_1.SingleNodeClient(API_ENDPOINT);
        // These are the default values from the Hornet alphanet configuration
        const privateKey = "256a818b2aac458941f7274985a410e57fb750f3a3a67969ece5bd9ae7eef5b2f7868ab6bb55800b77b8b74191ad8285a9bf428ace579d541fda47661803ff44";
        const publicKey = "f7868ab6bb55800b77b8b74191ad8285a9bf428ace579d541fda47661803ff44";
        console.log("Genesis");
        console.log("\tPrivate Key:", privateKey);
        console.log("\tPublic Key:", publicKey);
        const genesisSeedKeyPair = {
            privateKey: iota_js_1.Converter.hexToBytes(privateKey),
            publicKey: iota_js_1.Converter.hexToBytes(publicKey)
        };
        const ed25519Address = new iota_js_1.Ed25519Address(genesisSeedKeyPair.publicKey);
        const genesisAddress = ed25519Address.toAddress();
        const genesisAddressHex = iota_js_1.Converter.bytesToHex(genesisAddress);
        console.log("\tAddress Ed25519:", genesisAddressHex);
        console.log("\tAddress Bech32:", iota_js_1.Bech32Helper.toBech32(iota_js_1.ED25519_ADDRESS_TYPE, genesisAddress));
        // Create a new seed for the wallet
        const walletSeed = new iota_js_1.Ed25519Seed(iota_js_1.Converter.hexToBytes("e57fb750f3a3a67969ece5bd9ae7eef5b2256a818b2aac458941f7274985a410"));
        // Use the new seed like a wallet with Bip32 Paths 44,4128,accountIndex,isInternal,addressIndex
        const walletPath = new iota_js_1.Bip32Path("m/44'/4218'/0'/0'/0'");
        const walletAddressSeed = walletSeed.generateSeedFromPath(walletPath);
        const walletEd25519Address = new iota_js_1.Ed25519Address(walletAddressSeed.keyPair().publicKey);
        const newAddress = walletEd25519Address.toAddress();
        const newAddressHex = iota_js_1.Converter.bytesToHex(newAddress);
        console.log("Wallet 1");
        console.log("\tSeed:", iota_js_1.Converter.bytesToHex(walletSeed.toBytes()));
        console.log("\tPath:", walletPath.toString());
        console.log(`\tAddress Ed25519 ${walletPath.toString()}:`, newAddressHex);
        console.log(`\tAddress Bech32 ${walletPath.toString()}:`, iota_js_1.Bech32Helper.toBech32(iota_js_1.ED25519_ADDRESS_TYPE, newAddress));
        console.log();
        // Because we are using the genesis address we must use send advanced as the input address is
        // not calculated from a Bip32 path, if you were doing a wallet to wallet transfer you can just use send
        // which calculates all the inputs/outputs for you
        const genesisAddressOutputs = yield client.addressEd25519Outputs(genesisAddressHex);
        const inputsWithKeyPairs = [];
        let totalGenesis = 0;
        for (let i = 0; i < genesisAddressOutputs.outputIds.length; i++) {
            const output = yield client.output(genesisAddressOutputs.outputIds[i]);
            if (!output.isSpent) {
                inputsWithKeyPairs.push({
                    input: {
                        type: 0,
                        transactionId: output.transactionId,
                        transactionOutputIndex: output.outputIndex
                    },
                    addressKeyPair: genesisSeedKeyPair
                });
                totalGenesis += output.output.amount;
            }
        }
        const amountToSend = 1000;
        const outputs = [
            // This is the transfer to the new address
            {
                address: newAddressHex,
                addressType: iota_js_1.ED25519_ADDRESS_TYPE,
                amount: amountToSend
            },
            // Sending remainder back to genesis
            {
                address: genesisAddressHex,
                addressType: iota_js_1.ED25519_ADDRESS_TYPE,
                amount: totalGenesis - amountToSend
            }
        ];
        const { messageId } = yield iota_js_1.sendAdvanced(client, inputsWithKeyPairs, outputs, "WALLET", iota_js_1.Converter.asciiToBytes("Not trinity"));
        console.log("Created Message Id", messageId);
        const newAddressBalance = yield iota_js_1.getBalance(client, walletSeed, 0);
        console.log("Wallet 1 Address Balance", newAddressBalance);
        const unspentAddress = yield iota_js_1.getUnspentAddress(client, walletSeed, 0);
        console.log("Wallet 1 First Unspent Address", unspentAddress);
        const allUspentAddresses = yield iota_js_1.getUnspentAddresses(client, walletSeed, 0);
        console.log("Wallet 1 Unspent Addresses", allUspentAddresses);
    });
}
run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBZ087QUFFaE8sTUFBTSxZQUFZLEdBQUcsd0JBQXdCLENBQUM7QUFFOUMsU0FBZSxHQUFHOztRQUNkLE1BQU0sTUFBTSxHQUFHLElBQUksMEJBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEQsc0VBQXNFO1FBQ3RFLE1BQU0sVUFBVSxHQUFHLGtJQUFrSSxDQUFDO1FBQ3RKLE1BQU0sU0FBUyxHQUFHLGtFQUFrRSxDQUFDO1FBRXJGLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV4QyxNQUFNLGtCQUFrQixHQUFhO1lBQ2pDLFVBQVUsRUFBRSxtQkFBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7WUFDNUMsU0FBUyxFQUFFLG1CQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztTQUM3QyxDQUFDO1FBRUYsTUFBTSxjQUFjLEdBQUcsSUFBSSx3QkFBYyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sY0FBYyxHQUFHLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsRCxNQUFNLGlCQUFpQixHQUFHLG1CQUFTLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLHNCQUFZLENBQUMsUUFBUSxDQUFDLDhCQUFvQixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFFOUYsbUNB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