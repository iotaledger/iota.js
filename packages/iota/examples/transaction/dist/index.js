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
const crypto_js_1 = require("@iota/crypto.js");
const iota_js_1 = require("@iota/iota.js");
const util_js_1 = require("@iota/util.js");
const API_ENDPOINT = "http://localhost:14265/";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new iota_js_1.SingleNodeClient(API_ENDPOINT);
        const nodeInfo = yield client.info();
        // These are the default values from the Hornet alphanet configuration
        const mnemonic = "giant dynamic museum toddler six deny defense ostrich bomb access mercy blood explain muscle shoot shallow glad autumn author calm heavy hawk abuse rally";
        // Generate the seed from the Mnemonic
        const genesisSeed = iota_js_1.Ed25519Seed.fromMnemonic(mnemonic);
        console.log("Genesis");
        const genesisPath = new crypto_js_1.Bip32Path("m/44'/4218'/0'/0'/0'");
        const genesisWalletSeed = genesisSeed.generateSeedFromPath(genesisPath);
        const genesisWalletKeyPair = genesisWalletSeed.keyPair();
        console.log("\tSeed", util_js_1.Converter.bytesToHex(genesisWalletSeed.toBytes()));
        // Get the address for the path seed which is actually the Blake2b.sum256 of the public key
        // display it in both Ed25519 and Bech 32 format
        const genesisEd25519Address = new iota_js_1.Ed25519Address(genesisWalletKeyPair.publicKey);
        const genesisWalletAddress = genesisEd25519Address.toAddress();
        const genesisWalletAddressHex = util_js_1.Converter.bytesToHex(genesisWalletAddress);
        const genesisWalletAddressBech32 = iota_js_1.Bech32Helper.toBech32(iota_js_1.ED25519_ADDRESS_TYPE, genesisWalletAddress, nodeInfo.protocol.bech32HRP);
        console.log("\tAddress Ed25519", genesisWalletAddressHex);
        console.log("\tAddress Bech32", genesisWalletAddressBech32);
        // Create a new seed for the wallet
        const walletSeed = new iota_js_1.Ed25519Seed(util_js_1.Converter.hexToBytes("e57fb750f3a3a67969ece5bd9ae7eef5b2256a818b2aac458941f7274985a410"));
        // Use the new seed like a wallet with Bip32 Paths 44,4128,accountIndex,isInternal,addressIndex
        const walletPath = new crypto_js_1.Bip32Path("m/44'/4218'/0'/0'/0'");
        const walletAddressSeed = walletSeed.generateSeedFromPath(walletPath);
        const walletEd25519Address = new iota_js_1.Ed25519Address(walletAddressSeed.keyPair().publicKey);
        const newAddress = walletEd25519Address.toAddress();
        const newAddressHex = util_js_1.Converter.bytesToHex(newAddress);
        console.log("Wallet 1");
        console.log("\tSeed:", util_js_1.Converter.bytesToHex(walletSeed.toBytes()));
        console.log("\tPath:", walletPath.toString());
        console.log(`\tAddress Ed25519 ${walletPath.toString()}:`, newAddressHex);
        console.log(`\tAddress Bech32 ${walletPath.toString()}:`, iota_js_1.Bech32Helper.toBech32(iota_js_1.ED25519_ADDRESS_TYPE, newAddress, nodeInfo.protocol.bech32HRP));
        console.log();
        // Because we are using the genesis address we must use send advanced as the input address is
        // not calculated from a Bip32 path, if you were doing a wallet to wallet transfer you can just use send
        // which calculates all the inputs/outputs for you
        const indexerPlugin = new iota_js_1.IndexerPluginClient(client);
        const genesisAddressOutputs = yield indexerPlugin.outputs({ addressBech32: genesisWalletAddressBech32 });
        const inputsWithKeyPairs = [];
        let totalGenesis = 0;
        for (let i = 0; i < genesisAddressOutputs.items.length; i++) {
            const output = yield client.output(genesisAddressOutputs.items[i]);
            if (!output.isSpent) {
                inputsWithKeyPairs.push({
                    input: {
                        type: iota_js_1.UTXO_INPUT_TYPE,
                        transactionId: output.transactionId,
                        transactionOutputIndex: output.outputIndex
                    },
                    addressKeyPair: genesisWalletKeyPair
                });
                if (output.output.type === iota_js_1.EXTENDED_OUTPUT_TYPE) {
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
        const { messageId } = yield (0, iota_js_1.sendAdvanced)(client, inputsWithKeyPairs, outputs, {
            tag: util_js_1.Converter.utf8ToBytes("WALLET"),
            data: util_js_1.Converter.utf8ToBytes("Fireflea")
        });
        console.log("Created Message Id", messageId);
        const newAddressBalance = yield (0, iota_js_1.getBalance)(client, walletSeed, 0);
        console.log("Wallet 1 Address Balance", newAddressBalance);
        const unspentAddress = yield (0, iota_js_1.getUnspentAddress)(client, walletSeed, 0);
        console.log("Wallet 1 First Unspent Address", unspentAddress);
        const allUspentAddresses = yield (0, iota_js_1.getUnspentAddresses)(client, walletSeed, 0);
        console.log("Wallet 1 Unspent Addresses", allUspentAddresses);
    });
}
run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBNEM7QUFDNUMsMkNBZ0J1QjtBQUN2QiwyQ0FBMEM7QUFFMUMsa0RBQWtEO0FBQ2xELE1BQU0sWUFBWSxHQUFHLHlCQUF5QixDQUFDO0FBRS9DLFNBQWUsR0FBRzs7UUFDZCxNQUFNLE1BQU0sR0FBRyxJQUFJLDBCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWxELE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXJDLHNFQUFzRTtRQUN0RSxNQUFNLFFBQVEsR0FDViwySkFBMkosQ0FBQztRQUVoSyxzQ0FBc0M7UUFDdEMsTUFBTSxXQUFXLEdBQUcscUJBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV2QixNQUFNLFdBQVcsR0FBRyxJQUFJLHFCQUFTLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUUxRCxNQUFNLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4RSxNQUFNLG9CQUFvQixHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLG1CQUFTLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV6RSwyRkFBMkY7UUFDM0YsZ0RBQWdEO1FBQ2hELE1BQU0scUJBQXFCLEdBQUcsSUFBSSx3QkFBYyxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pGLE1BQU0sb0JBQW9CLEdBQUcscUJBQXFCLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0QsTUFBTSx1QkFBdUIsR0FBRyxtQkFB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