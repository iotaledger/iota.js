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
        const genesisPath = new crypto_js_1.Bip32Path("m/44'/4218'/0'/0'/0'");
        const genesisWalletSeed = genesisSeed.generateSeedFromPath(genesisPath);
        const genesisWalletKeyPair = genesisWalletSeed.keyPair();
        console.log("\tSeed", util_js_1.Converter.bytesToHex(genesisWalletSeed.toBytes()));
        // Get the address for the path seed which is actually the Blake2b.sum256 of the public key
        // display it in both Ed25519 and Bech 32 format
        const genesisEd25519Address = new iota_js_1.Ed25519Address(genesisWalletKeyPair.publicKey);
        const genesisWalletAddress = genesisEd25519Address.toAddress();
        const genesisWalletAddressHex = util_js_1.Converter.bytesToHex(genesisWalletAddress);
        console.log("\tAddress Ed25519", genesisWalletAddressHex);
        console.log("\tAddress Bech32", iota_js_1.Bech32Helper.toBech32(iota_js_1.ED25519_ADDRESS_TYPE, genesisWalletAddress, nodeInfo.bech32HRP));
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
        const { messageId } = yield (0, iota_js_1.sendAdvanced)(client, inputsWithKeyPairs, outputs, {
            key: util_js_1.Converter.utf8ToBytes("WALLET"),
            data: util_js_1.Converter.utf8ToBytes("Not trinity")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBNEM7QUFDNUMsMkNBZXVCO0FBQ3ZCLDJDQUEwQztBQUUxQyxNQUFNLFlBQVksR0FBRyxrQ0FBa0MsQ0FBQztBQUV4RCxTQUFlLEdBQUc7O1FBQ2QsTUFBTSxNQUFNLEdBQUcsSUFBSSwwQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsRCxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVyQyxzRUFBc0U7UUFDdEUsTUFBTSxRQUFRLEdBQ1YsMkpBQTJKLENBQUM7UUFFaEssc0NBQXNDO1FBQ3RDLE1BQU0sV0FBVyxHQUFHLHFCQUFXLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXZELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdkIsTUFBTSxXQUFXLEdBQUcsSUFBSSxxQkFBUyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFMUQsTUFBTSxpQkFBaUIsR0FBRyxXQUFXLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEUsTUFBTSxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxtQkFBUyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFekUsMkZBQTJGO1FBQzNGLGdEQUFnRDtRQUNoRCxNQUFNLHFCQUFxQixHQUFHLElBQUksd0JBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRixNQUFNLG9CQUFvQixHQUFHLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9ELE1BQU0sdUJBQXVCLEdBQUcsbUJBQVMsQ0FBQyxVQUFVLENB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