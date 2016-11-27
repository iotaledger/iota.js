# IOTA Javascript LIBRARY

This is the official Javascript library for the IOTA Core. It implements both the [official API](https://iota.readme.io/), as well as newly proposed functionality (such as signing, bundles, utilities and conversion).

> **Join the Discussion**

> If you want to get involved in the community, need help with getting setup, have any issues related with the library or just want to discuss Blockchain, Distributed Ledgers and IoT with other people, feel free to join our Slack. [Slack](http://slack.iotatoken.com/) You can also ask questions on our dedicated forum at: [IOTA Forum](http://forum.iotatoken.com/).

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

After you've successfully installed the library, it is fairly easy to get started by simply launching a new instance of the IOTA object:

```
// Create IOTA instance
var iota = new IOTA();

// now you can start using all of the functions
iota.api.getNodeInfo();
```

Overall, there are currently two subclasses that are accessible from the IOTA object:
- **`api`**: Core API functionality for interacting with the IOTA core.
- **`utils`**: Utility related functions for conversions, validation and so on  

In the future new IOTA Core modules (such as Flash, MAM) and all IXI related functionality will be available.

## How to use the Library

It should be noted that most API calls are done asynchronously. What this means is that you have to utilize callbacks in order to catch the response successfully. We will add support for sync API calls, as well as event listeners in future versions.

Here is a simple example of how to access the `getNodeInfo` function:

```
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

- **[api](#api)**
    - **[Standard API](#standard-api)**
    - **[getTransactionsObjects](#gettransactionsobjects)**
    - **[broadcastAndStore](#broadcastandstore)**
    - **[getNewAddress](#getnewaddress)**
    - **[getInputs](#getinputs)**
    - **[prepareTransfers](#preparetransfers)**
    - **[sendTrytes](#sendtrytes)**
    - **[sendTransfer](#sendtransfer)**
    - **[replayTransfer](#replaytransfer)**
    - **[broadcastTransfer](#broadcasttransfer)**
    - **[getBundle](#getbundle)**
    - **[getTransfers](#gettransfers)**
- **[utils](#utils)**
    - **[convertUnits](#convertunits)**
    - **[getChecksum](#getchecksum)**
    - **[noChecksum](#noChecksum)**
    - **[transactionObject](#transactionObject)**
    - **[transactionTrytes](#transactionTrytes)**
- **[changeNode](#changeNode)**

---

## `iota.api`

### `Standard API`

This Javascript library has implemented all of the core API calls that are made available by the current [IOTA Reference Implementation](https://github.com/iotaledger/iri). For the full documentation of all the Standard API calls, please refer to the official documentation: [official API](https://iota.readme.io/).

You can simply use any of the available options from the `api` object then. For example, if you want to use the `getTips` function, you would simply do it as such:

```
iota.api.getTips(function(error, success) {
    // do stuff here
})
```

---

### `getTransactionsObjects`

Wrapper function for `getTrytes` and the Utility function `transactionObjects`. This function basically returns the entire transaction objects for a list of transaction hashes.


#### Input
```
iota.api.getTransactionsObjects(hashes, callback)
```

1. **`hashes`**: `Array` List of transaction hashes
2. **`callback`**: `Function` callback.

#### Return Value

1. **`Array`** - list of all the transaction objects from the corresponding hashes.

---

### `broadcastAndStore`

Wrapper function for `broadcastTransactions` and `storeTransactions`.

#### Input
```
iota.api.broadcastAndStore(trytes, callback)
```

1. **`trytes`**: `Array` List of transaction trytes to be broadcast and stored. Has to be trytes that were returned from `attachToTangle`
2. **`callback`**: `Function` callback.

#### Return Value

**`Object`** - empty object.

---

### `getNewAddress`

Generates a new address from a seed and returns the address. This is either done deterministically, or by providing the index of the new address to be generated.

#### Input
```
iota.api.getNewAddress(seed [, options], callback)
```

1. **`seed`**: `String` tryte-encoded seed. It should be noted that this seed is not transferred
2. **`options`**: `Object` which is optional:
  - **`index`**: `Int` If the index is provided, the generation of the address is not deterministic.
  - **`checksum`**: `Bool` Adds 9-tryte address checksum
  - **`total`**: `Int` Total number of addresses to generate.
  - **`returnAll`**: `Bool` If true, it returns all addresses which were deterministically generated (until findTransactions returns null)
3. **`callback`**: `Function` Optional callback.

#### Returns
**`String | Array`** - returns either a string, or an array of strings.

---

### `getInputs`

Gets all possible inputs of a seed and returns them with the total balance. This is either done deterministically (by genearating all addresses until `findTransactions` returns null for a corresponding address), or by providing a key range to use for searching through.

You can also define the minimum `threshold` that is required. This means that if you provide the `threshold` value, you can specify that the inputs should only be returned if their collective balance is above the threshold value.


#### Input
```
iota.api.getInputs(seed, [, options], callback)
```

1. **`seed`**: `String` tryte-encoded seed. It should be noted that this seed is not transferred
2. **`options`**: `Object` which is optional:
  - **`start`**: `int` Starting key index  
  - **`end`**: `int` Ending key index
  - **`threshold`**: `int` Minimum threshold of accumulated balances from the inputs that is requested
4. **`callback`**: `Function` Optional callback.

#### Return Value

1. **`Object`** - an object with the following keys:
    - **`inputs`** `Array` - list of inputs objects consisting of `address`, `balance` and `keyIndex`
    - **`totalBalance`** `int` - aggregated balance of all inputs


---

### `prepareTransfers`

Main purpose of this function is to get an array of transfer objects as input, and then prepare the transfer by **generating the correct bundle**, as well as **choosing and signing the inputs** if necessary (if it's a value transfer). The output of this function is an array of the raw transaction data (trytes).

You can provide multiple transfer objects, which means that your prepared bundle will have multiple outputs to the same, or different recipients. As single transfer object takes the values of: `address`, `value`, `message`, `tag`. The message and tag values are required to be tryte-encoded.

#### Input
```
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
4. **`callback`**: `Function` Optional callback.

#### Return Value

`Array` - an array that contains the trytes of the new bundle.

---

### `sendTrytes`

Wrapper function that does `attachToTangle` and finally, it broadcasts and stores the transactions.

#### Input
```
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
```
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

### `replayTransfer`

Takes a tail transaction hash as input, gets the bundle associated with the transaction and then replays the bundle by attaching it to the tangle.

#### Input
```
iota.api.replayTransfer(transaction [, callback])
```

1. **`transaction`**: `String` Transaction hash, has to be tail.
2. **`callback`**: `Function` Optional callback

---

### `broadcastTransfer`

Takes a tail transaction hash as input, gets the bundle associated with the transaction and then rebroadcasts the entire bundle.

#### Input
```
iota.api.broadcastTransfer(transaction [, callback])
```

1. **`transaction`**: `String` Transaction hash, has to be tail.
2. **`callback`**: `Function` Optional callback

---

### `getBundle`

This function returns the bundle which is associated with a transaction. Input has to be a tail transaction (i.e. currentIndex = 0). If there are conflicting bundles (because of a replay for example) it will return multiple bundles. It also does important validation checking (signatures, sum, order) to ensure that the correct bundle is returned.

#### Input
```
iota.api.getBundle(transaction, callback)
```

1. **`transaction`**: `String` Transaction hash of a tail transaction.
2. **`callback`**: `Function` Optional callback

#### Returns
`Array` - returns an array of the corresponding bundle of a tail transaction. The bundle itself consists of individual transaction objects.

---


### `getTransfers`

Returns the transfers which are associated with a seed. The transfers are determined by either calculating deterministically which addresses were already used, or by providing a list of indexes to get the transfers from.

#### Input
```
getTransfers(seed [, options], callback)
```

1. **`seed`**: `String` tryte-encoded seed. It should be noted that this seed is not transferred
2. **`options`**: `Object` which is optional:
  - **`indexes`**: `Array` - optional. If the index of addresses is provided, it will be used to get all transfers associated with the addresses.
  - **`inclusionStates`**: `Bool` If True, it gets the inclusion states of the transfers.
3. **`callback`**: `Function` Optional callback.

#### Returns
`Array` - returns an array of transfers. Each array is a bundle for the entire transfer.

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
```
iota.api.convertUnits(value, fromUnit, toUnit)
```

1. **`value`**: `Integer` Value to be converted
2. **`fromUnit`**: `String` Current unit of the value. See above for the available units to utilize for conversion.
2. **`toUnit`**: `String` Unit to convert the from value into.

#### Returns
`Integer` - returns the converted unit (fromUnit => toUnit).

---

### `getChecksum`

Takes an 81-trytes address as input and calculates the 9-trytes checksum of the address.

#### Input
```
iota.api.getChecksum(address)
```

1. **`address`**: `String` 81-trytes address  

#### Returns
`String` - returns the 90-trytes address (81-trytes address + 9-trytes checksum)

---

### `noChecksum`

Takes an 90-trytes address as input and simply removes the checksum.

#### Input
```
iota.api.getChecksum(address)
```

1. **`address`**: `String` 90-trytes address  

#### Returns
`String` - returns an 81-tryte address

---

### `isValidChecksum`

Takes an 90-trytes checksummed address and returns a true / false if it is valid.

#### Input
```
iota.api.isValidChecksum(addressWithChecksum)
```

1. **`addressWithChecksum`**: `String` 90-trytes address  

#### Returns
`Bool` - True / False whether the checksum is valid or not

---

### `transactionObject`

Converts the trytes of a transaction into its transaction object.

#### Input
```
iota.api.transactionObject(trytes)
```

1. **`trytes`**: `String` 2673-trytes of a transaction  

#### Returns
`Object` - Transaction object

---

### `transactionTrytes`

Converts a valid transaction object into trytes. Please refer to [TODO] for more information what a valid transaction object looks like.

#### Input
```
iota.api.transactionTrytes(transactionObject)
```

1. **`transactionObject`**: `Object` valid transaction object  

#### Returns
`trytes` - converted trytes of

---
