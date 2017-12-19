# IOTA Javascript Library

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/iotaledger/iota.lib.js/master/LICENSE) [![Build Status](https://travis-ci.org/iotaledger/iota.lib.js.svg?branch=master)](https://travis-ci.org/iotaledger/iota.lib.js) [![dependencies Status](https://david-dm.org/iotaledger/iota.lib.js/status.svg)](https://david-dm.org/iotaledger/iota.lib.js)  [![devDependencies Status](https://david-dm.org/iotaledger/iota.lib.js/dev-status.svg)](https://david-dm.org/iotaledger/iota.lib.js?type=dev) [![NSP Status](https://nodesecurity.io/orgs/iota-foundation/projects/7c0214b5-e36a-4178-92bc-164c536cfd6c/badge)](https://nodesecurity.io/orgs/iota-foundation/projects/7c0214b5-e36a-4178-92bc-164c536cfd6c)

This is the official Javascript library for the IOTA Core. It implements both the [official API](https://iota.readme.io/), as well as newly proposed functionality (such as signing, bundles, utilities and conversion).

It should be noted that the Javascript Library as it stands right now is an **early beta release**. As such, there might be some unexpected results. Please join the community (see links below) and post [issues on here](https://github.com/iotaledger/iota.lib.js/issues), to ensure that the developers of the library can improve it.

> **Join the Discussion**

> If you want to get involved in the community, need help with getting setup, have any issues related with the library or just want to discuss Blockchain, Distributed Ledgers and IoT with other people, feel free to join our Slack. [Slack](http://slack.iota.org/) You can also ask questions on our dedicated forum at: [IOTA Forum](https://forum.iota.org/).

## Installation

### Node.js

```
npm install iota.lib.js
```

### Bower

```
bower install iota.lib.js
```

Once you've built the dist with gulp, you can either use `iota.js` or the minified version `iota.min.js` in the browser.

---

# Documentation

It should be noted that this is a temporary home for the official documentation. We are currently transitioning to a new developer hub, where we will have a dedicated website for the API documentation with concrete examples. The below documentation should be sufficient in enabling you to get started in the meantime.


## Getting Started

After you've successfully installed the library, it is fairly easy to get started by simply launching a new instance of the IOTA object with an optional settings object. When instantiating the object you have the option to decide the API provider that is used to send the requests to and you can also connect directly to the Sandbox environment.

The optional settings object can have the following values:

1. **`host`**: `String` Host you want to connect to. Can be DNS, IPv4 or IPv6. Defaults to `localhost `
2. **`port`**: `Int` port of the host you want to connect to. Defaults to 14265.
3. **`provider`**: `String` If you don't provide host and port, you can supply the full provider value to connect to
4. **`sandbox`**: `Bool` Optional value to determine if your provider is the IOTA Sandbox or not.
5. **`token`**: `String` Token string used for authenticating with the IOTA Sandbox if `sandbox` is set to `true`.

You can either supply the remote node directly via the `provider` option, or individually with `host` and `port`, as can be seen in the example below:

```js
// Create IOTA instance with host and port as provider
var iota = new IOTA({
    'host': 'http://localhost',
    'port': 14265
});

// Create IOTA instance directly with provider
var iota = new IOTA({
    'provider': 'http://localhost:14265'
});

// now you can start using all of the functions
iota.api.getNodeInfo();

// you can also get the version
iota.version
```

Overall, there are currently four subclasses that are accessible from the IOTA object:
- **`api`**: Core API functionality for interacting with the IOTA core.
- **`utils`**: Utility related functions for conversions, validation and so on  
- **`multisig`**: Functions for creating and signing multi-signature addresses and transactions.
- **`valid`**: Validator functions that can help with determining whether the inputs or results that you get are valid.

You also have access to the `version` of the library
- **`version`**: Current version of the library

In the future new IOTA Core modules (such as Flash, MAM) and all IXI related functionality will be available.

## How to use the Library

It should be noted that most API calls are done asynchronously. What this means is that you have to utilize callbacks in order to catch the response successfully. We will add support for sync API calls, as well as event listeners in future versions.

Here is a simple example of how to access the `getNodeInfo` function:

```js
iota.api.getNodeInfo(function(error, success) {
    if (error) {
        console.error(error);
    } else {
        console.log(success);
    }
})
```

---

## API Table of Contents

- **[api](#iotaapi)**
    - **[Standard API](#standard-api)**
    - **[getTransactionsObjects](#gettransactionsobjects)**
    - **[findTransactionObjects](#findtransactionobjects)**
    - **[getLatestInclusion](#getlatestinclusion)**
    - **[broadcastAndStore](#broadcastandstore)**
    - **[getNewAddress](#getnewaddress)**
    - **[getInputs](#getinputs)**
    - **[prepareTransfers](#preparetransfers)**
    - **[sendTrytes](#sendtrytes)**
    - **[sendTransfer](#sendtransfer)**
    - **[promoteTransaction](#promotetransaction)**
    - **[replayBundle](#replaybundle)**
    - **[broadcastBundle](#broadcastbundle)**
    - **[getBundle](#getbundle)**
    - **[getTransfers](#gettransfers)**
    - **[getAccountData](#getaccountdata)**
    - **[isPromotable](#ispromotable)**
    - **[isReattachable](#isreattachable)**
- **[utils](#iotautils)**
    - **[convertUnits](#convertunits)**
    - **[addChecksum](#addchecksum)**
    - **[noChecksum](#nochecksum)**
    - **[isValidChecksum](#isvalidchecksum)**
    - **[transactionObject](#transactionobject)**
    - **[transactionTrytes](#transactiontrytes)**
    - **[categorizeTransfers](#categorizetransfers)**
    - **[toTrytes](#totrytes)**
    - **[fromTrytes](#fromtrytes)**
    - **[extractJson](#extractjson)**
    - **[validateSignatures](#validatesignatures)**
    - **[isBundle](#isbundle)**
- **[multisig](#iotamultisig)**
    - **[getKey](#getkey)**
    - **[getDigest](#getdigest)**
    - **[Address](#Address)**
    - **[Address.absorb](#Address.absorb)**
    - **[Address.finalize](#Address.finalize)**
    - **[validateAddress](#validateaddress)**
    - **[initiateTransfer](#initiatetransfer)**
    - **[addSignature](#addsignature)**
- **[valid](#iotavalid)**
    - **[isAddress](#isaddress)**
    - **[isTrytes](#istrytes)**
    - **[isValue](#isvalue)**
    - **[isNum](#isnum)**
    - **[isHash](#ishash)**
    - **[isTransfersArray](#istransfersarray)**
    - **[isArrayOfHashes](#isarrayofhashes)**
    - **[isArrayOfTrytes](#isarrayoftrytes)**
    - **[isArrayOfAttachedTrytes](#isarrayofattachedtrytes)**
    - **[isArrayOfTxObjects](#isarrayoftxobjects)**
    - **[isInputs](#isinputs)**
    - **[isString](#isstring)**
    - **[isArray](#isarray)**
    - **[isObject](#isobject)**
    - **[isUri](#isuri)**

---

## `iota.api`

### `Standard API`

This Javascript library has implemented all of the core API calls that are made available by the current [IOTA Reference Implementation](https://github.com/iotaledger/iri). For the full documentation of all the Standard API calls, please refer to the official documentation: [official API](https://iota.readme.io/).

You can simply use any of the available options from the `api` object then. For example, if you want to use the `getTips` function, you would simply do it as such:

```js
iota.api.getTips(function(error, success) {
    // do stuff here
})
```

---

### `getTransactionsObjects`

Wrapper function for `getTrytes` and the Utility function `transactionObjects`. This function basically returns the entire transaction objects for a list of transaction hashes.


#### Input
```js
iota.api.getTransactionsObjects(hashes, callback)
```

1. **`hashes`**: `Array` List of transaction hashes
2. **`callback`**: `Function` callback.

#### Return Value

1. **`Array`** - list of all the transaction objects from the corresponding hashes.

---

### `findTransactionObjects`

Wrapper function for `findTransactions`, `getTrytes` and the Utility function `transactionObjects`. This function basically returns the entire transaction objects for a list of key values which you would usually use for `findTransactions`. Acceptable key values are:

- *`bundles`*: List of bundle hashes
- *`addresses`*: List of addresses
- *`tags`*: List of transaction tags (27 trytes length)
- *`approvees`*: List of approvees


#### Input
```js
iota.api.findTransactionObjects(searchValues, callback)
```

1. **`searchValues`**: `Object` List of transaction hashes. e.g. `{'hashes': ['ABCD']}`
2. **`callback`**: `Function` callback.

#### Return Value

1. **`Array`** - list of all the transaction objects from the corresponding hashes.

---

### `getLatestInclusion`

Wrapper function for `getNodeInfo` and `getInclusionStates`. It simply takes the most recent solid milestone as returned by getNodeInfo, and uses it to get the inclusion states of a list of transaction hashes.


#### Input
```js
iota.api.getLatestInclusion(hashes, callback)
```

1. **`hashes`**: `Array` List of transaction hashes
2. **`callback`**: `Function` callback.

#### Return Value

1. **`Array`** - list of all the inclusion states of the transaction hashes

---

### `broadcastAndStore`

Wrapper function for `broadcastTransactions` and `storeTransactions`.

#### Input
```js
iota.api.broadcastAndStore(trytes, callback)
```

1. **`trytes`**: `Array` List of transaction trytes to be broadcast and stored. Has to be trytes that were returned from `attachToTangle`
2. **`callback`**: `Function` callback.

#### Return Value

**`Object`** - empty object.

---

### `getNewAddress`

Generates a new address from a seed and returns the address. This is either done deterministically, or by providing the index of the new address to be generated. When generating an address, you have the option to choose different `security` levels for your private keys. A different security level with the same key index, means that you will get a different address obviously (as such, you could argue that single seed has 3 different accounts, depending on the security level chosen).

In total, there are 3 different security options available to choose from:

Input | Security Level | Security
--- | --- | ---
1 | Low | 81-trits
2 | Medium | 162-trits
3 | High | 243-trits

#### Input
```js
iota.api.getNewAddress(seed [, options], callback)
```

1. **`seed`**: `String` tryte-encoded seed. It should be noted that this seed is not transferred
2. **`options`**: `Object` which is optional:
  - **`index`**: `Int` If the index is provided, the generation of the address is not deterministic.
  - **`checksum`**: `Bool` Adds 9-tryte address checksum
  - **`total`**: `Int` Total number of addresses to generate.
  - **`security`**: `Int`  Security level to be used for the private key / address. Can be 1, 2 or 3
  - **`returnAll`**: `Bool` If true, it returns all addresses which were deterministically generated (until findTransactions returns null)
3. **`callback`**: `Function` Optional callback.

#### Returns
**`String | Array`** - returns either a string, or an array of strings.

---

### `getInputs`

Gets all possible inputs of a seed and returns them with the total balance. This is either done deterministically (by genearating all addresses until `findTransactions` returns null for a corresponding address), or by providing a key range to use for searching through.

You can also define the minimum `threshold` that is required. This means that if you provide the `threshold` value, you can specify that the inputs should only be returned if their collective balance is above the threshold value.


#### Input
```js
iota.api.getInputs(seed, [, options], callback)
```

1. **`seed`**: `String` tryte-encoded seed. It should be noted that this seed is not transferred
2. **`options`**: `Object` which is optional:
  - **`start`**: `int` Starting key index  
  - **`end`**: `int` Ending key index
  - **`security`**: `Int`  Security level to be used for the private key / address. Can be 1, 2 or 3
  - **`threshold`**: `int` Minimum threshold of accumulated balances from the inputs that is requested
4. **`callback`**: `Function` Optional callback.

#### Return Value

1. **`Object`** - an object with the following keys:
    - **`inputs`** `Array` - list of inputs objects consisting of `address`, `balance` and `keyIndex`
    - **`totalBalance`** `int` - aggregated balance of all inputs


---

### `prepareTransfers`

Main purpose of this function is to get an array of transfer objects as input, and then prepare the transfer by **generating the correct bundle**, as well as **choosing and signing the inputs** if necessary (if it's a value transfer). The output of this function is an array of the raw transaction data (trytes).

You can provide multiple transfer objects, which means that your prepared bundle will have multiple outputs to the same, or different recipients. As single transfer object takes the values of: `address`, `value`, `message`, `tag`. The message and tag values are required to be tryte-encoded. If you do not supply a message or a tag, the library will automatically enter empty ones for you. As such the only required fields in each transfers object are `address` and `value`.

If you provide an address with a checksum, this function will automatically validate the address for you with the Utils function `isValidChecksum`.

For the options, you can provide a list of `inputs`, that will be used for signing the transfer's inputs. It should be noted that these inputs (an array of objects) should have the provided 'security', `keyIndex` and `address` values:
```js
var inputs = [{
    'keyIndex': //VALUE,
    'address': //VALUE,
    'security': //VALUE
}]
```

The library validates these inputs then and ensures that you have sufficient balance. When defining these inputs, you can also provide multiple inputs on different security levels. The library will correctly sign these inputs using your seed and the corresponding private keys. Here is an example using security level 3 and 2 for a transfer:

```js
iota.api.prepareTransfers(seed,
    [{
        'address': 'SSEWOZSDXOVIURQRBTBDLQXWIXOLEUXHYBGAVASVPZ9HBTYJJEWBR9PDTGMXZGKPTGSUDW9QLFPJHTIEQZNXDGNRJE',
        'value': 10000
    }], {
    'inputs': [
        {
            address: 'XB9IBINADVMP9K9FEIIR9AYEOFUU9DP9EBCKOTPSDVSNRRNVSJOPTFUHSKSLPDJLEHUBOVEIOJFPDCZS9',
            balance: 1500,
            keyIndex: 0,
            security: 3
        }, {
            address: 'W9AZFNWZZZNTAQIOOGYZHKYJHSVMALVTWJSSZDDRVEIXXWPNWEALONZLPQPTCDZRZLHNIHSUKZRSZAZ9W',
            balance: 8500,
            keyIndex: 7,
            security: 2
        }
    ], function(e, s) {


        console.log(e,s);
})
```


The `address` option can be used to define the address to which a remainder balance (if that is the case), will be sent to. So if all your inputs have a combined balance of 2000, and your spending 1800 of them, 200 of your tokens will be sent to that remainder address. If you do not supply the `address`, the library will simply generate a new one from your seed (taking `security` into account, or using the standard security value of `2` (medium)).

#### Input
```js
iota.api.prepareTransfers(seed, transfersArray [, options], callback)
```

1. **`seed`**: `String` tryte-encoded seed. It should be noted that this seed is not transferred
2. **`transfersArray`**: `Array` of transfer objects:
  - **`address`**: `String` 81-tryte encoded address of recipient
  - **`value`**: `Int` value to be transferred.
  - **`message`**: `String` tryte-encoded message to be included in the bundle.
  - **`tag`**: `String` Tryte-encoded tag. Maximum value is 27 trytes.
3. **`options`**: `Object` which is optional:
  - **`inputs`**: `Array` List of inputs used for funding the transfer
  - **`address`**: `String` if defined, this address will be used for sending the remainder value (of the inputs) to.
  - **`security`**: `Int`  Security level to be used for the private key / addresses. This is for inputs and generating of the remainder address in case you did not specify it. Can be 1, 2 or 3
4. **`callback`**: `Function` Optional callback.

#### Return Value

`Array` - an array that contains the trytes of the new bundle.

---

### `sendTrytes`

Wrapper function that does `attachToTangle` and finally, it broadcasts and stores the transactions.

#### Input
```js
iota.api.sendTrytes(trytes, depth, minWeightMagnitude, callback)
```

1. **`trytes`** `Array` trytes
2. **`depth`** `Int` depth value that determines how far to go for tip selection
3. **`minWeightMagnitude`** `Int` minWeightMagnitude
4. **`callback`**: `Function` Optional callback.

#### Returns
`Array` - returns an array of the transfer (transaction objects).

---

### `sendTransfer`

Wrapper function that basically does `prepareTransfers`, as well as `attachToTangle` and finally, it broadcasts and stores the transactions locally.

#### Input
```js
iota.api.sendTransfer(seed, depth, minWeightMagnitude, transfers [, options], callback)
```

1. **`seed`** `String` tryte-encoded seed. If provided, will be used for signing and picking inputs.
2. **`depth`** `Int` depth
3. **`minWeightMagnitude`** `Int` minWeightMagnitude
4. **`transfers`**: `Array` of transfer objects:
  - **`address`**: `String` 81-tryte encoded address of recipient
  - **`value`**: `Int` value to be transferred.
  - **`message`**: `String` tryte-encoded message to be included in the bundle.
  - **`tag`**: `String` 27-tryte encoded tag.
5. **`options`**: `Object` which is optional:
  - **`inputs`**: `Array` List of inputs used for funding the transfer
  - **`address`**: `String` if defined, this address will be used for sending the remainder value (of the inputs) to.
6. **`callback`**: `Function` Optional callback.


#### Returns
`Array` - returns an array of the transfer (transaction objects).

---

### `promoteTransaction`

Promotes a transaction by adding spam on top of it, as long as it is promotable.
Will promote by adding transfers on top of the current one with `delay` interval.
Use `params.interrupt` to terminate the promotion. If `params.delay` is set to `0` only one promotion transfer will be sent.

#### Input
```js
iota.api.promoteTransaction(depth, minWeightMagnitude, transfers [, params], callback)
```

1. **`depth`** `Int` depth
2. **`minWeightMagnitude`** `Int` minWeightMagnitude
3. **`transfer`** `Array` Promotion transfer
4. **`params`** `Object` Params
  - **`delay`** `int` Delay between promotion transfers
  - **`interrupt`** `Boolean` Flag to terminate promotion
5. **`callback`** `Function` Callback

---

### `replayBundle`

Takes a tail transaction hash as input, gets the bundle associated with the transaction and then replays the bundle by attaching it to the tangle.

#### Input
```js
iota.api.replayBundle(transaction, depth, minWeightMagnitude [, callback])
```

1. **`transaction`**: `String` Transaction hash, has to be tail.
2. **`depth`** `Int` depth
3. **`minWeightMagnitude`** `Int` minWeightMagnitude
2. **`callback`**: `Function` Optional callback

---

### `broadcastBundle`

Takes a tail transaction hash as input, gets the bundle associated with the transaction and then rebroadcasts the entire bundle.

#### Input
```js
iota.api.broadcastBundle(transaction [, callback])
```

1. **`transaction`**: `String` Transaction hash, has to be tail.
2. **`callback`**: `Function` Optional callback

---

### `getBundle`

This function returns the bundle which is associated with a transaction. Input has to be a tail transaction (i.e. currentIndex = 0). If there are conflicting bundles (because of a replay for example) it will return multiple bundles. It also does important validation checking (signatures, sum, order) to ensure that the correct bundle is returned.

#### Input
```js
iota.api.getBundle(transaction, callback)
```

1. **`transaction`**: `String` Transaction hash of a tail transaction.
2. **`callback`**: `Function` Optional callback

#### Returns
`Array` - returns an array of the corresponding bundle of a tail transaction. The bundle itself consists of individual transaction objects.

---


### `getTransfers`

Returns the transfers which are associated with a seed. The transfers are determined by either calculating deterministically which addresses were already used, or by providing a list of indexes to get the addresses and the associated transfers from. The transfers are sorted by their timestamp. It should be noted that, because timestamps are not enforced in IOTA, that this may lead to incorrectly sorted bundles (meaning that their chronological ordering in the Tangle is different).

If you want to have your transfers split into received / sent, you can use the utility function `categorizeTransfers`

#### Input
```js
iota.api.getTransfers(seed [, options], callback)
```

1. **`seed`**: `String` tryte-encoded seed. It should be noted that this seed is not transferred
2. **`options`**: `Object` which is optional:
  - **`start`**: `Int` Starting key index for search
  - **`end`**: `Int` Ending key index for search
  - **`security`**: `Int`  Security level to be used for the private key / addresses, which is used for getting all associated transfers.
  - **`inclusionStates`**: `Bool` If True, it gets the inclusion states of the transfers.
3. **`callback`**: `Function` Optional callback.

#### Returns
`Array` - returns an array of transfers. Each array is a bundle for the entire transfer.

---

### `getAccountData`

Similar to `getTransfers`, just a bit more comprehensive in the sense that it also returns the `addresses`, `transfers`, `inputs` and `balance` that are associated and have been used with your account (seed). This function is useful in getting all the relevant information of your account. If you want to have your transfers split into received / sent, you can use the utility function `categorizeTransfers`

#### Input
```js
iota.api.getAccountData(seed [, options], callback)
```

1. **`seed`**: `String` tryte-encoded seed. It should be noted that this seed is not transferred
2. **`options`**: `Object` which is optional:
  - **`start`**: `Int` Starting key index for search
  - **`end`**: `Int` Ending key index for search
  - **`security`**: `Int`  Security level to be used for the private key / addresses, which is used for getting all associated transfers.
3. **`callback`**: `Function` Optional callback.

#### Returns
`Object` - returns an object of your account data in the following format:
```js
{
    'latestAddress': '', // Latest, unused address which has no transactions in the tangle
    'addresses': [], // List of all used addresses which have transactions associated with them
    'transfers': [], // List of all transfers associated with the addresses
    'inputs': [], // List of all inputs available for the seed. Follows the getInputs format of `address`, `balance`, `security` and `keyIndex`
    'balance': 0 // latest confirmed balance
}
```

---

### `isPromotable`

Checks if tail transaction is promotable by calling `checkConsistency` API call.

#### Input
```js
iota.api.isPromotable(tail)
```

1. **`tail`** {String} Tail transaction hash

#### Returns
`Promise` - resolves to true / false

---

### `isReattachable`

This API function helps you to determine whether you should replay a transaction or make a completely new transaction with a different seed. What this function does, is it takes an input address (i.e. from a spent transaction) as input and then checks whether any transactions with a value transferred are confirmed. If yes, it means that this input address has already been successfully used in a different transaction and as such you should no longer replay the transaction.

#### Input
```js
iota.api.isReattachable(inputAddress, callback)
```

1. **`inputAddress`**: `String | Array` address used as input in a transaction. Either string or array.
2. **`callback`**: `Function` callback function

#### Returns
`Bool` - true / false (if you provided an array, it's an array of bools)

---

## `iota.utils`

All utils function are done synchronously.

---

### `convertUnits`

IOTA utilizes the Standard system of Units. See below for all available units:

```
'i'   :   1,
'Ki'  :   1000,
'Mi'  :   1000000,
'Gi'  :   1000000000,
'Ti'  :   1000000000000,
'Pi'  :   1000000000000000
```

#### Input
```js
iota.utils.convertUnits(value, fromUnit, toUnit)
```

1. **`value`**: `Integer || String` Value to be converted. Can be string, an integer or float.
2. **`fromUnit`**: `String` Current unit of the value. See above for the available units to utilize for conversion.
2. **`toUnit`**: `String` Unit to convert the from value into.

#### Returns
`Integer` - returns the converted unit (fromUnit => toUnit).

---

### `addChecksum`

Takes a tryte-encoded input value and adds a checksum (length is user defined). Standard checksum length is 9 trytes. If `isAddress` is defined as true, it will validate if it's a correct 81-tryte enocded address.

#### Input
```js
iota.utils.addChecksum(inputValue, checksumLength, isAddress)
```

1. **`inputValue`**: `String | List` Either an individual tryte value, or a list of tryte values.
2. **`checksumLength`**: `Int` Checksum length. Default is 9 trytes
3. **`isAddress`**: `Bool` indicates whether the input value should be validated as an address (81-trytes). Default is true.

#### Returns
`String | List` - returns the input value + checksum either as a string or list, depending on the input.

---

### `noChecksum`

Takes an 90-trytes address as input and simply removes the checksum.

#### Input
```js
iota.utils.noChecksum(address)
```

1. **`address`**: `String | List` 90-trytes address. Either string or a list

#### Returns
`String | List` - returns the 81-tryte address(es)

---

### `isValidChecksum`

Takes an 90-trytes checksummed address and returns a true / false if it is valid.

#### Input
```js
iota.utils.isValidChecksum(addressWithChecksum)
```

1. **`addressWithChecksum`**: `String` 90-trytes address  

#### Returns
`Bool` - True / False whether the checksum is valid or not

---

### `transactionObject`

Converts the trytes of a transaction into its transaction object.

#### Input
```js
iota.utils.transactionObject(trytes)
```

1. **`trytes`**: `String` 2673-trytes of a transaction  

#### Returns
`Object` - Transaction object

---

### `transactionTrytes`

Converts a valid transaction object into trytes. Please refer to [TODO] for more information what a valid transaction object looks like.

#### Input
```js
iota.utils.transactionTrytes(transactionObject)
```

1. **`transactionObject`**: `Object` valid transaction object  

#### Returns
`trytes` - converted trytes of

---

### `categorizeTransfers`

Categorizes a list of transfers into `sent` and `received`. It is important to note that zero value transfers (which for example, is being used for storing addresses in the Tangle), are seen as `received` in this function.

#### Input
```js
iota.utils.categorizeTransfers(transfers, addresses)
```

1. **`transfers`**: `Array` A list of bundles. Basically is an array, of arrays (bundles), as is returned from getTransfers or getAccountData
2. **`addresses`**: `Array` List of addresses that belong to you. With these addresses as input, it's determined whether it's a sent or a receive transaction. Therefore make sure that these addresses actually belong to you.

#### Returns
`object` - the transfers categorized into `sent` and `received`


---

### `toTrytes`

Converts ASCII characters into trytes according to our encoding schema (read the source code for more info as to how it works). Currently only works with valid ASCII characters. As such, if you provide invalid characters the function will return `null`. In case you want to convert JSON data, stringify it first.

#### Input
```js
iota.utils.toTrytes(input)
```

1. **`input`**: `String` String you want to convert into trytes. All non-string values should be converted into strings first.

#### Returns
`string || null` - trytes, or null in case you provided an invalid ASCII character

---

### `fromTrytes`

Reverse of toTrytes.

#### Input
```js
iota.utils.fromTrytes(trytes)
```

1. **`trytes`**: `String` Trytes you want to convert to string

#### Returns
`string` - string

---

### `extractJson`

This function takes a bundle as input and from the signatureMessageFragments extracts the JSON encoded data which was sent with the transfer. This currently only works with the `toTrytes` and `fromTrytes` function that use the ASCII <-> Trytes encoding scheme. In case there is no JSON data, or invalid one, this function will return `null`

#### Input
```js
iota.utils.extractJson(bundle)
```

1. **`bundle`**: `Array` bundle from which you want to extract the JSON data.

#### Returns
`String` - Stringified JSON object which was extracted from the transactions.

---

### `validateSignatures`

This function makes it possible for each of the co-signers in the multi-signature to independently verify that a generated transaction with the corresponding signatures of the co-signers is valid. This function is safe to use and does not require any sharing of digests or key values.

#### Input
```js
iota.utils.validateSignatures(signedBundle, inputAddress)
```

1. **`signedBundle`**: `Array` signed bundle by all of the co-signers
2. **`inputAddress`**: `String` input address as provided to `initiateTransfer`.

#### Returns
`bool` - true / false  

---

### `isBundle`

Checks if the provided bundle is valid. The provided bundle has to be ordered tail (i.e. `currentIndex`: 0) first. A bundle is deemed valid if it has:

- Valid transaction structure
- Correct `currentIndex`, `lastIndex` and number of bundle transactions
- The sum of all `value` fields is 0
- The bundle hash is correct
- Valid signature

---

#### Input
```js
iota.utils.isBundle(bundle)
```

1. **`bundle`**: `Array` bundle to test

#### Returns
`bool` - true / false  

---


## `iota.multisig`

Multi signature related functions.

> **VERY IMPORTANT NOTICE**

> Before using these functions, please make sure that you have thoroughly read our [guidelines for multi-signature](https://github.com/iotaledger/wiki/blob/master/multisigs.md). It is of utmost importance that you follow these rules, else it can potentially lead to financial losses.

---

### `getKey`

Generates the corresponding private key (depending on the `security` chosen) of a seed.

#### Input
```js
iota.multisig.getKey(seed, index, security)
```

1. **`seed`**: `String` Tryte encoded seed
2. **`index`**: 'Int' Index of the private key.
3. **`security`**: `Int`  Security level to be used for the private key

#### Returns
`String` - private key represented in trytes.


---

### `getDigest`

Generates the digest value of a key.

#### Input
```js
iota.multisig.getDigest(seed, index)
```

1. **`seed`**: `String` Tryte encoded seed
2. **`index`**: 'Int' Index of the private key.
3. **`security`**: `Int`  Security level to be used for the private key

#### Returns
`String` - digest represented in trytes.

---

### `address`

This function is used to initiate the creation of a new multisig address. Once all digests were added with `addDigest()`, `finalize()` can be used to get the actual 81-tryte address value. `validateAddress()` can be used to actually validate the multi-signature.

#### Input
```js
var address = new iota.multisig.address(digests);
```

1. **`digestTrytes`**: `String || Array` Optional string or array of digest trytes as returned by `getDigest`

#### Returns
`Object` - multisig address instance

---

### `address.absorb`

Absorbs the digests of co-signers

#### Input
```js
address.addDigest(digest);
```

1. **`digest`**: `String || Array` String or array of digest trytes as returned by `getDigest`

#### Returns
`Object` - multisig address instance

---

### `address.finalize`

Finalizes the multisig address generation process and returns the correct 81-tryte address.

#### Input
```js
address.finalize()
```

#### Returns
`String` - 81-tryte multisig address


---

### `validateAddress`

Validates a generated multi-sig address by getting the corresponding key digests of each of the co-signers. The order of the digests is of essence in getting correct results.

#### Input
```js
iota.multisig.validateAddress(multisigAddress, digests)
```

1. **`multisigAddress`**: `String` digest trytes as returned by `getDigest`
2. **`digests`**: 'Array' array of the key digest for each of the cosigners. The digests need to be provided in the correct signing order.

#### Returns
`Bool` - true / false

---

### `initiateTransfer`

Initiates the creation of a new transfer by generating an empty bundle with the correct number of bundle entries to be later used for the signing process. It should be noted that currently, only a single input (via `inputAddress`) is possible. The `remainderAddress` also has to be provided and should be generated by the co-signers of the multi-signature before initiating the transfer.

The `securitySum` input is basically the sum of the `security` levels from all cosigners chosen during the private key generation (getKey / getDigest). e.g. when creating a new multisig, Bob has chosen security level 2, whereas Charles has chosen security level 3. Their securitySum is 5.

#### Input
```js
iota.multisig.initiateTransfer(securitySum, inputAddress, remainderAddress, transfers, callback)
```

1. **`securitySum`**: `Int` The sum of the security levels chosen by all cosigners when generating the private keys.
2. **`inputAddress`**: `String` input address which has sufficient balance and is controlled by the co-signers
3. **`remainderAddress`**: `String` in case there is a remainder balance, send the funds to this address. If you do not have a remainder balance, you can simply put `null`
4. **`transfers`**: `Array` Transfers object
5. **`callback`**: `Function`

#### Returns
`Array` - bundle

---

### `addSignature`

This function is called by each of the co-signers individually to add their signature to the bundle. Here too, order is important. This function returns the bundle, which should be shared with each of the participants of the multi-signature.

After having added all signatures, you can validate the signature with the `utils.validateSignature()` function.

#### Input
```js
iota.multisig.addSignature(bundleToSign, inputAddress, key, callback)
```

1. **`bundleToSign`**: `Array` bundle to sign
2. **`inputAddress`**: `String` input address as provided to `initiateTransfer`.
3. **`key`**: `String` private key trytes as returned by `getKey`
4. **`callback`**: `Function`

#### Returns
`Array` - bundle

---

## `iota.valid`

Validator functions. Return either true / false.

---

### `isAddress`

Checks if the provided input is a valid 81-tryte (non-checksum), or 90-tryte (with checksum) address.

#### Input
```js
iota.valid.isAddress(address)
```

1. **`address`**: `String` A single address

---

### `isTrytes`

Determines if the provided input is valid trytes. Valid trytes are: `ABCDEFGHIJKLMNOPQRSTUVWXYZ9`. If you specify the length parameter, you can also validate the input length.

#### Input
```js
iota.valid.isTrytes(trytes [, length])
```

1. **`trytes`**: `String`
2. **`length`**: `int || string` optional

---

### `isValue`

Validates the value input, checks if it's integer.

#### Input
```js
iota.valid.isValue(value)
```

1. **`value`**: `Integer`

---

### `isNum`

Checks if the input value is a number, can be a string, float or integer.

#### Input
```js
iota.valid.isNum(value)
```

1. **`value`**: `Integer`

---

### `isHash`

Checks if correct hash consisting of 81-trytes.

#### Input
```js
iota.valid.isHash(hash)
```

1. **`hash`**: `String`

---

### `isTransfersArray`

Checks if it's a correct array of transfer objects. A transfer object consists of the following values:
```js
{
    'address': // STRING (trytes encoded, 81 or 90 trytes)
    'value': // INT
    'message': // STRING (trytes encoded)
    'tag': // STRING (trytes encoded, maximum 27 trytes)
}
```

#### Input
```js
iota.valid.isTransfersArray(transfersArray)
```

1. **`transfersArray`**: `array`

---

### `isArrayOfHashes`

Array of valid 81 or 90-trytes hashes.

#### Input
```js
iota.valid.isArrayOfHashes(hashesArray)
```

1. **`hashesArray`**: `Array`

---

### `isArrayOfTrytes`

Checks if it's an array of correct 2673-trytes. These are trytes either returned by prepareTransfers, attachToTangle or similar call. A single transaction object is encoded 2673 trytes.

#### Input
```js
iota.valid.isArrayOfTrytes(trytesArray)
```

1. **`trytesArray`**: `Array`

---

### `isArrayOfAttachedTrytes`

Similar to `isArrayOfTrytes`, just that in addition this function also validates that the last 243 trytes are non-zero (meaning that they don't equal 9). The last 243 trytes consist of:  `trunkTransaction` + `branchTransaction` + `nonce`. As such, this function determines whether the provided trytes have been attached to the tangle successfully. For example this validator can be used for trytes returned by `attachToTangle`.

#### Input
```js
iota.valid.isArrayOfAttachedTrytes(trytesArray)
```

1. **`trytesArray`**: `Array`

---

### `isArrayOfTxObjects`

Checks if the provided bundle is an array of correct transaction objects. Basically validates if each entry in the array has all of the following keys:
```js
var keys = [
    'hash',
    'signatureMessageFragment',
    'address',
    'value',
    'tag',
    'timestamp',
    'currentIndex',
    'lastIndex',
    'bundle',
    'trunkTransaction',
    'branchTransaction',
    'nonce'
]
```

#### Input
```js
iota.valid.isArrayOfTxObjects(bundle)
```

1. **`bundle`**: `Array`

---

### `isInputs`

Validates if it's an array of correct input objects. These inputs are provided to either `prepareTransfers` or `sendTransfer`. An input objects consists of the following:

```js
{
    'keyIndex': // INT
    'address': // STRING
}
```

#### Input
```js
iota.valid.isInputs(inputsArray)
```

1. **`inputsArray`**: `Array`

---

### `isString`

Self explanatory.

#### Input
```js
iota.valid.isString(string)
```

---

### `isArray`

Self explanatory.

#### Input
```js
iota.valid.isArray(array)
```

---

### `isObject`

Self explanatory.

#### Input
```js
iota.valid.isObject(array)
```

---

### `isUri`

Validates a given string to check if it's a valid IPv6, IPv4 or hostname format. The string must have a `udp://` prefix, and it may or may not have a port. Here are some example inputs:

```
udp://[2001:db8:a0b:12f0::1]:14265
udp://[2001:db8:a0b:12f0::1]
udp://8.8.8.8:14265
udp://domain.com
udp://domain2.com:14265
```

#### Input
```js
iota.utils.isUri(node)
```

1. **`node`**: `String` IPv6, IPv4 or Hostname with or without a port.

#### Returns
`bool` - true/false if valid node format.

---
