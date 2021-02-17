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
        const nodeInfo = yield client.info();
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
        console.log("\tAddress Bech32:", iota_js_1.Bech32Helper.toBech32(iota_js_1.ED25519_ADDRESS_TYPE, genesisAddress, nodeInfo.bech32HRP));
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
        console.log(`\tAddress Bech32 ${walletPath.toString()}:`, iota_js_1.Bech32Helper.toBech32(iota_js_1.ED25519_ADDRESS_TYPE, newAddress, nodeInfo.bech32HRP));
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
                        type: iota_js_1.UTXO_INPUT_TYPE,
                        transactionId: output.transactionId,
                        transactionOutputIndex: output.outputIndex
                    },
                    addressKeyPair: genesisSeedKeyPair
                });
                if (output.output.type === iota_js_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE) {
                    totalGenesis += output.output.amount;
                }
            }
        }
        const amountToSend = 10000000;
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
        const { messageId } = yield iota_js_1.sendAdvanced(client, inputsWithKeyPairs, outputs, {
            key: iota_js_1.Converter.utf8ToBytes("WALLET"),
            data: iota_js_1.Converter.utf8ToBytes("Not trinity")
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBd1M7QUFFeFMsTUFBTSxZQUFZLEdBQUcsd0JBQXdCLENBQUM7QUFFOUMsU0FBZSxHQUFHOztRQUNkLE1BQU0sTUFBTSxHQUFHLElBQUksMEJBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFckMsc0VBQXNFO1FBQ3RFLE1BQU0sVUFBVSxHQUFHLGtJQUFrSSxDQUFDO1FBQ3RKLE1BQU0sU0FBUyxHQUFHLGtFQUFrRSxDQUFDO1FBRXJGLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV4QyxNQUFNLGtCQUFrQixHQUFhO1lBQ2pDLFVBQVUsRUFBRSxtQkFBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7WUFDNUMsU0FBUyxFQUFFLG1CQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztTQUM3QyxDQUFDO1FBRUYsTUFBTSxjQUFjLEdBQUcsSUFBSSx3QkFBYyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sY0FBYyxHQUFHLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsRCxNQUFNLGlCQUFpQixHQUFHLG1CQUFTLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLHNCQUFZLENBQUMs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