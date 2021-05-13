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
const API_ENDPOINT = "https://chrysalis-nodes.iota.org";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new iota_js_1.SingleNodeClient(API_ENDPOINT);
        const nodeInfo = yield client.info();
        // These are the default values from the Hornet alphanet configuration
        const mnemonic = "giant dynamic museum toddler six deny defense ostrich bomb access mercy blood explain muscle shoot shallow glad autumn author calm heavy hawk abuse rally";
        // Generate the seed from the Mnemonic
        const genesisSeed = iota_js_1.Ed25519Seed.fromMnemonic(mnemonic);
        console.log("Genesis");
        const genesisPath = new iota_js_1.Bip32Path("m/44'/4218'/0'/0'/0'");
        const genesisWalletSeed = genesisSeed.generateSeedFromPath(genesisPath);
        const genesisWalletKeyPair = genesisWalletSeed.keyPair();
        console.log("\tSeed", iota_js_1.Converter.bytesToHex(genesisWalletSeed.toBytes()));
        // Get the address for the path seed which is actually the Blake2b.sum256 of the public key
        // display it in both Ed25519 and Bech 32 format
        const genesisEd25519Address = new iota_js_1.Ed25519Address(genesisWalletKeyPair.publicKey);
        const genesisWalletAddress = genesisEd25519Address.toAddress();
        const genesisWalletAddressHex = iota_js_1.Converter.bytesToHex(genesisWalletAddress);
        console.log("\tAddress Ed25519", genesisWalletAddressHex);
        console.log("\tAddress Bech32", iota_js_1.Bech32Helper.toBech32(iota_js_1.ED25519_ADDRESS_TYPE, genesisWalletAddress, nodeInfo.bech32HRP));
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
        const genesisAddressOutputs = yield client.addressEd25519Outputs(genesisWalletAddressHex);
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
                    addressKeyPair: genesisWalletKeyPair
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
                address: genesisWalletAddressHex,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBd1M7QUFFeFMsTUFBTSxZQUFZLEdBQUcsa0NBQWtDLENBQUM7QUFFeEQsU0FBZSxHQUFHOztRQUNkLE1BQU0sTUFBTSxHQUFHLElBQUksMEJBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFckMsc0VBQXNFO1FBQ3RFLE1BQU0sUUFBUSxHQUFHLDJKQUEySixDQUFDO1FBRTdLLHNDQUFzQztRQUN0QyxNQUFNLFdBQVcsR0FBRyxxQkFBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV2RCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXZCLE1BQU0sV0FBVyxHQUFHLElBQUksbUJBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRTFELE1BQU0saUJBQWlCLEdBQUcsV0FBVyxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sb0JBQW9CLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsbUJBQVMsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXpFLDJGQUEyRjtRQUMzRixnREFBZ0Q7UUFDaEQsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLHdCQUFjLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakYsTUFBTSxvQkFBb0IsR0FBRyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMvRCxNQUFNLHVCQUF1QixHQUFHLG1CQUFTLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDM0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsc0JBQVksQ0FBQyxRQUFRLENBQUMsOEJBQW9CLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFFdkgsbUNBQW1DO1FBQ25DLE1BQU0sVUFBVSxHQUFHLElBQUkscUJBQVcsQ0FBQyxtQkFBUyxDQUFDLFVBQVUsQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDLENBQUM7UUFFN0gsK0ZBQStGO1FBQy9GLE1BQU0sVUFBVSxHQUFHLElBQUksbUJBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3pELE1BQU0saUJBQWlCLEdBQUcsVUFBVSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSx3QkFBYyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZGLE1BQU0sVUFBVSxHQUFHLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BELE1BQU0sYUFBYSxHQUFHLG1CQUFTLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsbUJBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixVQUFVLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUMxRSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixVQUFVLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxzQkFBWSxDQUFDLFFBQVEsQ0FBQyw4QkFBb0IsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDdkksT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWQsNkZBQTZGO1FBQzdGLHdHQUF3RztRQUN4RyxrREFBa0Q7UUFDbEQsTUFBTSxxQkFBcUIsR0FBRyxNQUFNLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBRTFGLE1BQU0sa0JBQWtCLEdBR2xCLEVBQUUsQ0FBQztRQUVULElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUVyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcscUJBQXFCLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3RCxNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pCLGtCQUFrQixDQUFDLElBQUksQ0FBQztvQkFDcEIsS0FBSyxFQUFFO3dCQUNILElBQUksRUFBRSx5QkFBZTt3QkFDckIsYUFBYSxFQUFFLE1BQU0sQ0FBQyxhQUFhO3dCQUNuQyxzQkFBc0IsRUFBRSxNQUFNLENBQUMsV0FBVztxQkFDN0M7b0JBQ0QsY0FBYyxFQUFFLG9CQUFvQjtpQkFDdkMsQ0FBQyxDQUFDO2dCQUNILElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssdUNBQTZCLEVBQUU7b0JBQ3RELFlBQVksSUFBSyxNQUFNLENBQUMsTUFBaUMsQ0FBQyxNQUFNLENBQUM7aUJBQ3BFO2FBQ0o7U0FDSjtRQUVELE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQztRQUU5QixNQUFNLE9BQU8sR0FJUDtZQUNFLDBDQUEwQztZQUMxQztnQkFDSSxPQUFPLEVBQUUsYUFBYTtnQkFDdEIsV0FBVyxFQUFFLDhCQUFvQjtnQkFDakMsTUFBTSxFQUFFLFlBQVk7YUFDdkI7WUFDRCxvQ0FBb0M7WUFDcEM7Z0JBQ0ksT0FBTyxFQUFFLHVCQUF1QjtnQkFDaEMsV0FBVyxFQUFFLDhCQUFvQjtnQkFDakMsTUFBTSxFQUFFLFlBQVksR0FBRyxZQUFZO2FBQ3RDO1NBQ0osQ0FBQztRQUVOLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxNQUFNLHNCQUFZLENBQ3BDLE1BQU0sRUFDTixrQkFBa0IsRUFDbEIsT0FBTyxFQUNQO1lBQ0ksR0FBRyxFQUFFLG1CQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUNwQyxJQUFJLEVBQUUsbUJBQVMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1NBQzdDLENBQUMsQ0FBQztRQUVQLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFN0MsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLG9CQUFVLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRSxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFM0QsTUFBTSxjQUFjLEdBQUcsTUFBTSwyQkFBaUIsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFOUQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLDZCQUFtQixDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Q0FBQTtBQUdELEdBQUcsRUFBRTtLQUNBLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQy9CLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDIn0=