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
        const ed25519Address = new iota_js_1.Ed25519Address();
        const genesisAddress = ed25519Address.publicKeyToAddress(genesisSeedKeyPair.publicKey);
        const genesisAddressHex = iota_js_1.Converter.bytesToHex(genesisAddress);
        console.log("\tAddress Ed25519:", genesisAddressHex);
        console.log("\tAddress Bech32:", iota_js_1.Bech32Helper.toBech32(iota_js_1.ED25519_ADDRESS_TYPE, genesisAddress));
        // Create a new seed for the wallet
        const walletSeed = new iota_js_1.Ed25519Seed(iota_js_1.Converter.hexToBytes("e57fb750f3a3a67969ece5bd9ae7eef5b2256a818b2aac458941f7274985a410"));
        // Use the new seed like a wallet with Bip32 Paths
        const walletPath = new iota_js_1.Bip32Path("m/0");
        const walletAddressSeed = walletSeed.generateSeedFromPath(walletPath);
        const walletEd25519Address = new iota_js_1.Ed25519Address();
        const newAddress = walletEd25519Address.publicKeyToAddress(walletAddressSeed.keyPair().publicKey);
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
        const newAddressBalance = yield iota_js_1.getBalance(client, walletSeed, new iota_js_1.Bip32Path());
        console.log("Wallet 1 Address Balance", newAddressBalance);
        const unspentAddress = yield iota_js_1.getUnspentAddress(client, walletSeed, new iota_js_1.Bip32Path());
        console.log("Wallet 1 First Unspent Address", unspentAddress);
        const allUspentAddresses = yield iota_js_1.getUnspentAddresses(client, walletSeed, new iota_js_1.Bip32Path());
        console.log("Wallet 1 Unspent Addresses", allUspentAddresses);
    });
}
run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBZ087QUFFaE8sTUFBTSxZQUFZLEdBQUcsd0JBQXdCLENBQUM7QUFFOUMsU0FBZSxHQUFHOztRQUNkLE1BQU0sTUFBTSxHQUFHLElBQUksMEJBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEQsc0VBQXNFO1FBQ3RFLE1BQU0sVUFBVSxHQUFHLGtJQUFrSSxDQUFDO1FBQ3RKLE1BQU0sU0FBUyxHQUFHLGtFQUFrRSxDQUFDO1FBRXJGLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV4QyxNQUFNLGtCQUFrQixHQUFhO1lBQ2pDLFVBQVUsRUFBRSxtQkFBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7WUFDNUMsU0FBUyxFQUFFLG1CQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztTQUM3QyxDQUFDO1FBRUYsTUFBTSxjQUFjLEdBQUcsSUFBSSx3QkFBYyxFQUFFLENBQUM7UUFDNUMsTUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZGLE1BQU0saUJBQWlCLEdBQUcsbUJBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsc0JBQVksQ0FBQyxRQUFRLENBQUMsOEJBQW9CLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUU5Rixt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