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
// Amount to distribute (Should be equal to amount faucet sends to every address)
const AMOUNT = 1000;
// Number of addresses to which the distribution should be made
const DISTRIBUTION_SPACE = 15;
const MAX_ADDRESS_LOOKUP_SPACE = DISTRIBUTION_SPACE * 5;
// Seed to spend funds from
const SEED = 'ENTER SEED HERE!';
const DELAY_TIME = 120000;
/**
 * Generates addresses
 *
 * @method getAddressesWithKeyPairs
 *
 * @param {number} start
 *
 * @returns {AddressWithKeyPairs[]}
 */
function getAddressesWithKeyPairs(start, info) {
    const walletSeed = new iota_js_1.Ed25519Seed(iota_js_1.Converter.hexToBytes(SEED));
    const addresses = [];
    for (let i = start; i < DISTRIBUTION_SPACE + start; i++) {
        const walletPath = new iota_js_1.Bip32Path(`m/44'/4218'/0'/0'/${i}'`);
        const walletAddressSeed = walletSeed.generateSeedFromPath(walletPath);
        const walletEd25519Address = new iota_js_1.Ed25519Address(walletAddressSeed.keyPair().publicKey);
        const newAddress = walletEd25519Address.toAddress();
        addresses.push({
            address: iota_js_1.Bech32Helper.toBech32(iota_js_1.ED25519_ADDRESS_TYPE, newAddress, info.bech32HRP),
            keyIndex: i,
            keyPair: walletAddressSeed.keyPair(),
            balance: 0
        });
    }
    return addresses;
}
function assignBalances(addresses) {
    return __awaiter(this, void 0, void 0, function* () {
        const addressesWithBalance = [];
        for (const addressObject of addresses) {
            const info = yield client.address(addressObject.address);
            addressesWithBalance.push(Object.assign({}, addressObject, {
                balance: info.balance
            }));
        }
        return addressesWithBalance;
    });
}
/**
 * @method prepareInputAndOutputs
 *
 * @param {number} start
 * @param {AddressWithKeyPairs[]} addresses
 *
 * @return {InputOutputs}
 */
function prepareInputAndOutputs(start = 0, addresses = []) {
    return __awaiter(this, void 0, void 0, function* () {
        if (start > MAX_ADDRESS_LOOKUP_SPACE) {
            throw new Error('Max attempts reached!');
        }
        if (!nodeInfo) {
            nodeInfo = yield client.info();
        }
        addresses = [...addresses, ...getAddressesWithKeyPairs(start, nodeInfo)];
        addresses = yield assignBalances(addresses);
        if (addresses.every((addressObject) => addressObject.balance === 0)) {
            return prepareInputAndOutputs(start + DISTRIBUTION_SPACE, addresses);
        }
        // Input should be the address with highest balance
        const input = addresses.reduce((acc, info) => acc.balance > info.balance ? acc : info);
        if (input.balance < DISTRIBUTION_SPACE * AMOUNT) {
            return prepareInputAndOutputs(start + DISTRIBUTION_SPACE, addresses);
        }
        const outputs = addresses.filter((addressObject) => addressObject.balance === 0 &&
            addressObject.address !== input.address).slice(0, DISTRIBUTION_SPACE);
        if (outputs.length < DISTRIBUTION_SPACE) {
            return prepareInputAndOutputs(start + DISTRIBUTION_SPACE, addresses);
        }
        return {
            inputAddresses: [input.address],
            outputAddresses: outputs.map((output) => output.address),
            input,
            outputs: [
                ...outputs
                    .map((addressObject) => ({
                    // @ts-ignore
                    address: iota_js_1.Converter.bytesToHex(iota_js_1.Bech32Helper.fromBech32(addressObject.address, nodeInfo.bech32HRP).addressBytes),
                    addressType: iota_js_1.ED25519_ADDRESS_TYPE,
                    amount: AMOUNT
                })),
                {
                    // @ts-ignore
                    // Send remainder to input address
                    address: iota_js_1.Converter.bytesToHex(iota_js_1.Bech32Helper.fromBech32(input.address, nodeInfo.bech32HRP).addressBytes),
                    addressType: iota_js_1.ED25519_ADDRESS_TYPE,
                    amount: input.balance - (AMOUNT * outputs.length)
                }
            ]
        };
    });
}
const client = new iota_js_1.SingleNodeClient(API_ENDPOINT);
let nodeInfo;
/**
 * Distribute funds
 *
 * @method distribute
 *
 * @returns {Promise<DistributionResult>}
 */
function distribute() {
    return __awaiter(this, void 0, void 0, function* () {
        const { inputAddresses, outputAddresses, input, outputs } = yield prepareInputAndOutputs();
        const inputAddressOutputs = yield client.addressOutputs(input.address);
        const unspentOutputs = [];
        for (const outputId of inputAddressOutputs.outputIds) {
            const output = yield client.output(outputId);
            if (!output.isSpent) {
                unspentOutputs.push(output);
            }
        }
        if (!unspentOutputs.length) {
            throw new Error('No unspent outputs against input address.');
        }
        const inputs = unspentOutputs.map((output) => {
            return {
                input: {
                    type: 0,
                    transactionId: output.transactionId,
                    transactionOutputIndex: output.outputIndex
                },
                addressKeyPair: input.keyPair
            };
        });
        const { messageId } = yield iota_js_1.sendAdvanced(client, inputs, outputs);
        return {
            messageId,
            inputAddresses,
            outputAddresses
        };
    });
}
/**
 * Promotes and reattaches a message
 *
 * @method promoteAndReattach
 *
 * @param {string} messageId
 */
function promoteAndReattach(messageId) {
    const _checkMeta = (id) => {
        return client.messageMetadata(id)
            .then((metadata) => {
            if (metadata.ledgerInclusionState) {
                return Promise.resolve(metadata);
            }
            if (metadata.shouldPromote) {
                return _promote(id);
            }
            if (metadata.shouldReattach) {
                return _reattach(id);
            }
            return new Promise((resolve) => {
                setTimeout(resolve, 1000);
            }).then(() => {
                return _checkMeta(id);
            });
        });
    };
    const _promote = (id) => {
        return iota_js_1.promote(client, id).then(() => {
            console.info(`Successfully promoted message with id ${id}`);
            return _checkMeta(id);
        });
    };
    const _reattach = (id) => {
        return iota_js_1.reattach(client, id).then((message) => {
            console.info(`Successfully reattached message id ${id}`);
            console.info(`Reattached id ${message.messageId}`);
            return _checkMeta(message.messageId);
        });
    };
    return _checkMeta(messageId).catch((error) => {
        return _checkMeta(messageId);
    });
}
function run() {
    const _distribute = () => {
        return new Promise((resolve) => {
            setTimeout(resolve, DELAY_TIME);
        }).then(() => distribute())
            .then((result) => {
            console.info('-'.repeat(75));
            console.info('Funds distributed successfully!');
            console.info('Message ID: ', result.messageId);
            console.info('Sender address: ', result.inputAddresses[0]);
            console.info('Receiver addresses:');
            result.outputAddresses.forEach((address, idx) => {
                console.info(`${idx + 1}: ${address}`);
            });
            console.info('-'.repeat(75));
            return promoteAndReattach(result.messageId).then((metadata) => {
                console.log(`Included in ledger state: ${metadata.ledgerInclusionState}`);
                return new Promise((_, reject) => {
                    setTimeout(() => reject(new Error(`Paused!`)), DELAY_TIME);
                });
            });
        }).catch((error) => {
            console.info('-'.repeat(75));
            console.error(error.message);
            console.info('-'.repeat(75));
            return _distribute();
        });
    };
    return _distribute();
}
new Promise((resolve) => {
    setTimeout(resolve, 1000);
}).then(run);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FjdUI7QUFFdkIsTUFBTSxZQUFZLEdBQUcsd0JBQXdCLENBQUM7QUFFOUMsaUZBQWlGO0FBQ2pGLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQztBQUVwQiwrREFBK0Q7QUFDL0QsTUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7QUFFOUIsTUFBTSx3QkFBd0IsR0FBRyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7QUFFeEQsMkJBQTJCO0FBQzNCLE1BQU0sSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBRWhDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQztBQTRCMUI7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFTLHdCQUF3QixDQUFDLEtBQWEsRUFBRSxJQUFlO0lBQzVELE1BQU0sVUFBVSxHQUFHLElBQUkscUJBQVcsQ0FBQyxtQkFBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRS9ELE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUVwQixLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEdBQUcsa0JBQWtCLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JELE1BQU0sVUFBVSxHQUFHLElBQUksbUJBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1RCxNQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RSxNQUFNLG9CQUFvQixHQUFHLElBQUksd0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV2RixNQUFNLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVwRCxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ1gs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