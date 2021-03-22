import {
    Bech32Helper,
    Bip32Path,
    Converter,
    Ed25519Address,
    Ed25519Seed,
    ED25519_ADDRESS_TYPE,
    IKeyPair,
    IUTXOInput,
    sendAdvanced,
    SingleNodeClient,
    promote,
    reattach,
    INodeInfo
} from "@iota/iota.js";

const API_ENDPOINT = "http://localhost:14265";

// Amount to distribute (Should be equal to amount faucet sends to every address)
const AMOUNT = 1000;

// Number of addresses to which the distribution should be made
const DISTRIBUTION_SPACE = 15;

const MAX_ADDRESS_LOOKUP_SPACE = DISTRIBUTION_SPACE * 5;

// Seed to spend funds from
const SEED = 'ENTER SEED HERE!';

const DELAY_TIME = 120000;

type AddressWithKeyPairs = {
    address: string;
    keyIndex: number;
    keyPair: IKeyPair;
    balance: number;
}

type Output = {
    address: string;
    addressType: number,
    amount: number;
}

type InputOutputs = {
    inputAddresses: string[],
    outputAddresses: string[],
    input: AddressWithKeyPairs,
    outputs: Output[]
}

type DistributionResult = {
    messageId: string;
    inputAddresses: string[];
    outputAddresses: string[];
}

/**
 * Generates addresses
 * 
 * @method getAddressesWithKeyPairs
 * 
 * @param {number} start
 * 
 * @returns {AddressWithKeyPairs[]} 
 */
function getAddressesWithKeyPairs(start: number, info: INodeInfo): AddressWithKeyPairs[] {
    const walletSeed = new Ed25519Seed(Converter.hexToBytes(SEED));

    const addresses = []

    for (let i = start; i < DISTRIBUTION_SPACE + start; i++) {
        const walletPath = new Bip32Path(`m/44'/4218'/0'/0'/${i}'`);
        const walletAddressSeed = walletSeed.generateSeedFromPath(walletPath);
        const walletEd25519Address = new Ed25519Address(walletAddressSeed.keyPair().publicKey);

        const newAddress = walletEd25519Address.toAddress();

        addresses.push({
            address: Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, newAddress, info.bech32HRP),
            keyIndex: i,
            keyPair: walletAddressSeed.keyPair(),
            balance: 0
        });
    }

    return addresses;
}

async function assignBalances(addresses: AddressWithKeyPairs[]): Promise<AddressWithKeyPairs[]> {
    const addressesWithBalance: AddressWithKeyPairs[] = []

    for (const addressObject of addresses) {
        const info = await client.address(addressObject.address);

        addressesWithBalance.push(Object.assign({}, addressObject, {
            balance: info.balance
        }))
    }

    return addressesWithBalance;
}

/**
 * @method prepareInputAndOutputs
 * 
 * @param {number} start 
 * @param {AddressWithKeyPairs[]} addresses 
 * 
 * @return {InputOutputs}
 */
async function prepareInputAndOutputs(start = 0, addresses: AddressWithKeyPairs[] = []): Promise<InputOutputs> {
    if (start > MAX_ADDRESS_LOOKUP_SPACE) {
        throw new Error('Max attempts reached!')
    }

    if (!nodeInfo) {
        nodeInfo = await client.info()
    }

    addresses = [...addresses, ...getAddressesWithKeyPairs(start, nodeInfo)];
    addresses = await assignBalances(addresses)

    if (
        addresses.every((addressObject: AddressWithKeyPairs) => addressObject.balance === 0)
    ) {
        return prepareInputAndOutputs(start + DISTRIBUTION_SPACE, addresses)
    }

    // Input should be the address with highest balance
    const input = addresses.reduce((acc, info) => acc.balance > info.balance ? acc : info);

    if (input.balance < DISTRIBUTION_SPACE * AMOUNT) {
        return prepareInputAndOutputs(start + DISTRIBUTION_SPACE, addresses)
    }

    const outputs = addresses.filter(
        (addressObject) => addressObject.balance === 0 &&
            addressObject.address !== input.address
    ).slice(0, DISTRIBUTION_SPACE)

    if (outputs.length < DISTRIBUTION_SPACE) {
        return prepareInputAndOutputs(start + DISTRIBUTION_SPACE, addresses)
    }

    return {
        inputAddresses: [input.address],
        outputAddresses: outputs.map((output) => output.address),
        input,
        outputs: [
            ...outputs
                .map((addressObject) => ({
                    // @ts-ignore
                    address: Converter.bytesToHex(Bech32Helper.fromBech32(addressObject.address, nodeInfo.bech32HRP).addressBytes),
                    addressType: ED25519_ADDRESS_TYPE,
                    amount: AMOUNT
                })),
            {
                // @ts-ignore
                // Send remainder to input address
                address: Converter.bytesToHex(Bech32Helper.fromBech32(input.address, nodeInfo.bech32HRP).addressBytes),
                addressType: ED25519_ADDRESS_TYPE,
                amount: input.balance - (AMOUNT * outputs.length)
            }
        ]
    }
}

const client = new SingleNodeClient(API_ENDPOINT);

let nodeInfo: INodeInfo;

/**
 * Distribute funds
 * 
 * @method distribute
 * 
 * @returns {Promise<DistributionResult>}
 */
async function distribute(): Promise<DistributionResult> {
    const { inputAddresses, outputAddresses, input, outputs } = await prepareInputAndOutputs();

    const inputAddressOutputs = await client.addressOutputs(input.address)

    const unspentOutputs = [];

    for (const outputId of inputAddressOutputs.outputIds) {
        const output = await client.output(outputId);

        if (!output.isSpent) {
            unspentOutputs.push(output)
        }
    }

    if (!unspentOutputs.length) {
        throw new Error('No unspent outputs against input address.')
    }

    const inputs: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
    }[] = unspentOutputs.map((output) => {
        return {
            input: {
                type: 0,
                transactionId: output.transactionId,
                transactionOutputIndex: output.outputIndex
            },
            addressKeyPair: input.keyPair
        }
    })

    const { messageId } = await sendAdvanced(client, inputs, outputs);

    return {
        messageId,
        inputAddresses,
        outputAddresses
    }
}

/**
 * Promotes and reattaches a message
 * 
 * @method promoteAndReattach
 * 
 * @param {string} messageId 
 */
function promoteAndReattach(messageId: string) {
    const _checkMeta = (id: string): Promise<any> => {
        return client.messageMetadata(id)
            .then((metadata) => {
                if (metadata.ledgerInclusionState) {
                    return Promise.resolve(metadata);
                }

                if (metadata.shouldPromote) {
                    return _promote(id)
                }

                if (metadata.shouldReattach) {
                    return _reattach(id);
                }

                return new Promise((resolve) => {
                    setTimeout(resolve, 1000);
                }).then(() => {
                    return _checkMeta(id);
                })
            })
    };

    const _promote = (id: string): Promise<any> => {
        return promote(
            client,
            id
        ).then(() => {
            console.info(`Successfully promoted message with id ${id}`);
            return _checkMeta(id);
        })
    };


    const _reattach = (id: string): Promise<any> => {
        return reattach(
            client,
            id
        ).then((message) => {
            console.info(`Successfully reattached message id ${id}`);
            console.info(`Reattached id ${message.messageId}`)

            return _checkMeta(message.messageId);
        })
    };

    return _checkMeta(messageId).catch((error) => {
        return _checkMeta(messageId);
    });
}

function run() {
    const _distribute = (): Promise<any> => {
        return new Promise((resolve) => {
            setTimeout(resolve, DELAY_TIME)
        }).then(() => distribute())
            .then((result: DistributionResult) => {
                console.info('-'.repeat(75));
                console.info('Funds distributed successfully!');

                console.info('Message ID: ', result.messageId);
                console.info('Sender address: ', result.inputAddresses[0])
                console.info('Receiver addresses:')

                result.outputAddresses.forEach((address, idx) => {
                    console.info(`${idx + 1}: ${address}`)
                })

                console.info('-'.repeat(75));

                return promoteAndReattach(result.messageId).then((metadata) => {
                    console.log(`Included in ledger state: ${metadata.ledgerInclusionState}`);

                    return new Promise((_, reject) => {
                        setTimeout(() => reject(new Error(`Paused!`)), DELAY_TIME)
                    });
                })
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
    setTimeout(resolve, 1000)
}).then(run);
