# @iota/core

Core functionality to interact with the IOTA network. Includes methods for:
- Generating addresses
- Creating, attaching and broadcasting transactions
- Querying for transactions
- Monitoring balances
- Monitoring inclusion states and consistency of transactions
- Promoting and reattaching pending transactions

## Installation

Install using [npm](https://www.npmjs.org/):

```
npm install @iota/core
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @iota/core
```

## API Reference

    
* [core](#module_core)

    * [.composeApi([settings])](#module_core.composeApi)

    * [.addNeighbors(URIs, [callback])](#module_core.addNeighbors)

    * [.attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, [callback])](#module_core.attachToTangle)

    * [.broadcastBundle(tailTransactionHash, [callback])](#module_core.broadcastBundle)

    * [.broadcastTransactions(trytes, [callback])](#module_core.broadcastTransactions)

    * [.checkConsistency(transactions, [options], [callback])](#module_core.checkConsistency)

    * [.findTransactionObjects(query, [callback])](#module_core.findTransactionObjects)

    * [.findTransactions(query, [callback])](#module_core.findTransactions)

    * [.getAccountData(seed, options, [callback])](#module_core.getAccountData)

    * [.getBalances(addresses, [tips], [callback])](#module_core.getBalances)

    * [.getBundle(tailTransactionHash, [callback])](#module_core.getBundle)

    * [.getInclusionStates(transactions, [callback])](#module_core.getInclusionStates)

    * [.getInputs(seed, [options], [callback])](#module_core.getInputs)

    * [.getNeighbors([callback])](#module_core.getNeighbors)

    * [.getNewAddress(seed, [options], [callback])](#module_core.getNewAddress)

    * [.getNodeInfo([callback])](#module_core.getNodeInfo)

    * [.getTransactionObjects(hashes, [callback])](#module_core.getTransactionObjects)

    * [.getTransactionsToApprove(depth, [reference], [callback])](#module_core.getTransactionsToApprove)

    * [.getTrytes(hashes, [callback])](#module_core.getTrytes)

    * [.isPromotable(tail, [callback])](#module_core.isPromotable)

    * [.createPrepareTransfers([provider])](#module_core.createPrepareTransfers)

    * [.prepareTransfers(seed, transfers, [options], [callback])](#module_core.prepareTransfers)

    * [.promoteTransaction(tail, depth, minWeightMagnitude, [spamTransfers], [options], [callback])](#module_core.promoteTransaction)

    * [.removeNeighbors(uris, [callback])](#module_core.removeNeighbors)

    * [.replayBundle(tail, depth, minWeightMagnitude, [callback])](#module_core.replayBundle)

    * [.sendTrytes(trytes, depth, minWeightMagnitude, [reference], [callback])](#module_core.sendTrytes)

    * [.storeAndBroadcast(trytes, [callback])](#module_core.storeAndBroadcast)

    * [.storeAndBroadcast(trytes, [callback])](#module_core.storeAndBroadcast)

    * [.traverseBundle(trunkTransaction, [bundle], [callback])](#module_core.traverseBundle)

    * [.generateAddress(seed, index, [security], [checksum])](#module_core.generateAddress)


<a name="module_core.composeApi"></a>

### *core*.composeApi([settings])
**Summary**: Creates an API object that's used to send requests to an IRI node.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [settings] | <code>Object</code> | <code>{}</code> | Connection settings. |
| [settings.network] | <code>Provider</code> | <code>http-client</code> | Network provider |
| [settings.provider] | <code>string</code> | <code>&quot;http://localhost:14265&quot;</code> | URI of an IRI node |
| [settings.attachToTangle] | <code>function</code> | <code>attachToTangle</code> | Function that overrides the default `attachToTangle` endpoint |
| [settings.apiVersion] | <code>string</code> \| <code>number</code> | <code>1</code> | IOTA API version to use in the `X-IOTA-API-Version` HTTP header |
| [settings.requestBatchSize] | <code>number</code> | <code>1000</code> | Maximum number of parameters that may be sent in batched API request for [`findTransactions`](#module_core.findTransactions), [`getBalances`](#module_core.getBalances), [`getInclusionStates`](#module_core.getInclusionStates), and [`getTrytes`](#module_core.getTrytes) |

**Returns**: [<code>API</code>](#API) - iota - API object to use to interact with an IRI node.  
**Example**  
```js
const Iota = require('@iota/core`);

const iota = Iota.composeAPI({
 provider: 'https://nodes.devnet.thetangle.org:443'
});
```
<a name="module_core.addNeighbors"></a>

### *core*.addNeighbors(URIs, [callback])
**Summary**: Adds temporary neighbors to the connected IRI node.  
**Fulfil**: <code>number</code> numberOfNeighbors - Number of neighbors that were added  
**Reject**: <code>Error</code> error - One of the following errors:
- `INVALID_URI`: Make sure that the URI is a string and starts with `tcp://`
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| URIs | <code>Array.&lt;string&gt;</code> | Comma-separated URIs of neighbor nodes that you want to add |
| [callback] | <code>Callback</code> | Optional callback function |

This method adds temporary neighbors to the connected IRI node by calling the its
[`addNeighbors`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#addNeighbors) endpoint.

These neighbors are removed when the node is restarted.

## Related methods

To see statistics about the connected IRI node's neighbors, use the [`getNeighbors()`](#module_core.getNeighbors) method.

**Example**  
```js
addNeighbors(['tcp://148.148.148.148:15600'])
  .then(numberOfNeighbors => {
    console.log(`Successfully added ${numberOfNeighbors} neighbors`)
  }).catch(error => {
    console.log(`Something went wrong: ${error}`)
  })
```
<a name="module_core.attachToTangle"></a>

### *core*.attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, [callback])
**Summary**: Connects the given transaction trytes into a bundle and sends them to the connected IOTA node to complete [remote proof of work](https://docs.iota.org/docs/getting-started/0.1/transactions/proof-of-work).  
**Fulfil**: <code>TransactionTrytes[]</code> attachedTrytes - Array of transaction trytes in tail-first order. To attach these transactions to the Tangle, pass the trytes to the [`broadcastTransactions()`](#module_core.broadcastTransactions) method.  
**Reject**: <code>Error</code> error - One of the following errors:
- `INVALID_TRUNK_TRANSACTION`: Make sure that the hash contains 81 trytes
- `INVALID_BRANCH_TRANSACTION`: Make sure that the hash contains 81 trytes
- `INVALID_MIN_WEIGHT_MAGNITUDE`: Make sure that the minimum weight magnitude is at least the same as the one used for the branch and trunk transactions.
- `INVALID_TRANSACTION_TRYTES`: Make sure the trytes can be converted to a valid transaction object
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| trunkTransaction | <code>Hash</code> | Trunk transaction hash |
| branchTransaction | <code>Hash</code> | Branch transaction hash |
| minWeightMagnitude | <code>number</code> | The [minimum weight magnitude](https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude) to use for proof of work. **Note:** This value must be at least the same as the minimum weight magnitude of the branch and trunk transactions. |
| trytes | <code>Array.&lt;TransactionTrytes&gt;</code> | Array of transaction trytes in head first order, which are returned by the [`prepareTransfers()`](#module_core.prepareTransfers) method |
| [callback] | <code>Callback</code> | Optional callback function |

This method uses the connected IRI node's [`attachToTangle`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#attachToTangle) endpoint to chain the given transaction trytes into a bundle and do proof of work.

By doing proof of work, this method overwrites the following transaction fields:
 - `hash`
 - `nonce`
 - `attachmentTimestamp`
 - `attachmentTimestampLowerBound`
 - `attachmentTimestampUpperBound`

**Note:** You can replace this method with your own custom one in the [`composeApi()`](##module_core.composeApi) method. For example, you may want to write a function that does local proof of work, using either the [`ccurl.interface.js`](https://github.com/iotaledger/ccurl.interface.js) NodeJS library,
or the [`curl.lib.js`](https://github.com/iotaledger/curl.lib.js) library for browsers that support WebGL2.

## Related methods

To attach the returned transaction trytes to the Tangle, use the [`broadcastTransactions()`](#module_core.broadcastTransactions) method to send them to a node.

You can get a trunk and branch transaction hash by calling the
[`getTransactionsToApprove()`](#module_core.getTransactionsToApprove) method

**Example**  
```js
getTransactionsToApprove(depth)
  .then(({ trunkTransaction, branchTransaction }) =>
    attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes)
  )
  .then(attachedTrytes => {
    console.log(`Successfully did proof of work. Here are your bundle's transaction trytes: ${attachedTrytes}`)
  }).catch(error => {
    console.log(`Something went wrong: ${error}`)
  })
```
<a name="module_core.broadcastBundle"></a>

### *core*.broadcastBundle(tailTransactionHash, [callback])
**Summary**: Resends all transactions in the bundle of a given tail transaction hash to the connected IRI node.  
**Fulfil**: <code>Transaction[]</code> transactionObjects - Array of transaction objects  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hash is 81 trytes long and its `currentIndex` field is 0
- `INVALID_BUNDLE`: Check the tail transaction's bundle for the following:
  - Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
  - Transactions in the bundle array are in the same order as their currentIndex field
  - The total value of all transactions in the bundle sums to 0
  - The bundle hash is valid
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| tailTransactionHash | <code>Hash</code> | Tail transaction hash |
| [callback] | <code>Callback</code> | Optional callback function |

This method uses the `getBundle()` method to get all transactions in the given tail transaction's bundle from the connected IRI node.

Then, those transactions are sent to the node again so that the node sends them to all of its neighbors.

You may want to use this method to improve the likelihood of your transactions reaching the rest of the network.

**Note:** To use this method, the node must already have your bundle's transaction trytes in its ledger.

## Related methods

To create and sign a bundle of new transactions, use the [`prepareTransfers()`](#module_core.prepareTransfers) method.

**Example**  
```js
broadcastBundle(tailHash)
  .then(transactionObjects => {
     console.log(`Successfully sent the following bundle to the node:)
     console.log(JSON.stringify(transactionObjects));
  })
  .catch(error => {
    console.log(`Something went wrong: ${error}`)
  })
```
<a name="module_core.broadcastTransactions"></a>

### *core*.broadcastTransactions(trytes, [callback])
**Summary**: Sends the given transaction trytes to the connected IRI node.  
**Fulfil**: <code>TransactionTrytes[]</code> transactionTrytes - Array of transaction trytes that you just broadcast  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_ATTACHED_TRYTES`: Make sure that the trytes include a proof of work
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| trytes | <code>Array.&lt;TransactionTrytes&gt;</code> | Transaction trytes that include proof of work |
| [callback] | <code>Callback</code> | Optional callback |

This method sends the given transaction trytes to the connected IRI node, using its
[`broadcastTransactions`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#broadcastTransactions) endpoint.

**Note:** Before calling this method, we recommend saving your transaction trytes in local storage.
By doing so, you make sure that you can always reattach your transactions to the Tangle in case they remain in a pending state.

## Related methods

The given transaction trytes must be in a valid bundle and must include a proof of work.

To create a valid bundle, use the `prepareTransfers()` method. For more information about what makes a bundles and transactions valid, see [this guide](https://docs.iota.org/docs/node-software/0.1/iri/concepts/transaction-validation).

To do proof of work, use one of the following methods:

- [`attachToTangle()`](#module_core.attachToTangle)
- [`sendTrytes()`](#module_core.sendTrytes)

**Example**  
```js
broadcastTransactions(trytes)
  .then(transactionTrytes => {
     console.log(`Successfully sent the following transaction trytes to the node:)
     console.log(JSON.stringify(transactionTrytes));
  })
  .catch(error => {
    console.log(`Something went wrong: ${error}`)
  })
```
<a name="module_core.checkConsistency"></a>

### *core*.checkConsistency(transactions, [options], [callback])
**Summary**: Checks if one or more transactions are consistent.  
**Fulfil**: <code>boolean</code> isConsistent - Whether the given transactions are consistent  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hashes are 81 trytes long and their `currentIndex` field is 0
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
- Reason for inconsistency if the method was called with the `options.rejectWithReason` argument  

| Param | Type | Description |
| --- | --- | --- |
| transactions | <code>Hash</code> \| <code>Array.&lt;Hash&gt;</code> | One or more tail transaction hashes to check |
| [options] | <code>Object</code> | Options object |
| [options.rejectWithReason] | <code>boolean</code> | Return the reason for inconsistent transactions |
| [callback] | <code>Callback</code> | Optional callback function |

This method finds out if a transaction has a chance of being confirmed, using the connected node's
[`checkConsistency`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#checkconsistency) endpoint.

A consistent transaction is one where:
- The node has the transaction's branch and trunk transactions in its ledger
- The transaction's bundle is valid
- The transaction's branch and trunk transactions are valid

For more information about what makes a bundles and transactions valid, see [this article](https://docs.iota.org/docs/node-software/0.1/iri/concepts/transaction-validation).

As long as a transaction is consistent it has a chance of being confirmed.

## Related methods

If a consistent transaction is taking a long time to be confirmed, you can improve its chances, using the
[`promoteTransaction()`](#module_core.promoteTransaction) method.

If a transaction is inconsistent, it will never be confirmed. In this case, you can reattach the transaction, using the [`replayBundle()`](#module_core.replayBundle) method.

**Example**  
```js
checkConsistency(transactions)
  .then(isConsistent => {
    isConsistent? console.log(All these transactions are consistent): console.log(One or more of these transactions are inconsistent);
  })
  .catch(err => {
    console.log(`Something went wrong: ${error}`);
  })
```
<a name="module_core.findTransactionObjects"></a>

### *core*.findTransactionObjects(query, [callback])
**Summary**: Searches the Tangle for transaction objects that contain all the given values in their [transaction fields](https://docs.iota.org/docs/getting-started/0.1/transactions/transactions#structure-of-a-transaction).  
**Fulfil**: <code>Transaction[]</code> transactionObjects - Array of transaction objects, which contain fields that match the query object  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_SEARCH_KEY`: Make sure that you entered valid query parameters
- `INVALID_HASH`: Make sure that the bundle hashes are 81 trytes long
- `INVALID_TRANSACTION_HASH`: Make sure that the approvee transaction hashes are 81 trytes long
- `INVALID_ADDRESS`: Make sure that the addresses contain only trytes
- `INVALID_TAG`: Make sure that the tags contain only trytes
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Object</code> | Query object |
| [query.addresses] | <code>Array.&lt;Hash&gt;</code> | Array of addresses to search for in transactions |
| [query.bundles] | <code>Array.&lt;Hash&gt;</code> | Array of bundle hashes to search for in transactions |
| [query.tags] | <code>Array.&lt;Tag&gt;</code> | Array of tags to search for in transactions |
| [query.approvees] | <code>Array.&lt;Hash&gt;</code> | Array of transaction hashes that you want to search for in transactions' branch and trunk transaction fields |
| [callback] | <code>Callback</code> | Optional callback function |

This method uses the [`findTransactions()`](#module_core.findTransactions) to find transactions with the given fields, then it uses
the [`getTransactionObjects()`](#module_core.getTransactionObjects) method to return the transaction objects.

If you pass more than one query, this method returns only transactions that contain all the given fields in those queries.

## Related methods

To find only transaction hashes, use the [`findTransactions()`](#module_core.findTransactions) method.

**Example**  
```js
findTransactionObjects({ addresses: ['ADDRESS999...'] })
   .then(transactionObjects => {
     console.log(`Successfully found the following transactions:)
     console.log(JSON.stringify(transactionObjects));
  })
  .catch(error => {
    console.log(`Something went wrong: ${error}`)
  })
```
<a name="module_core.findTransactions"></a>

### *core*.findTransactions(query, [callback])
**Summary**: * Searches the Tangle for the hashes of transactions that contain all the given values in their transaction fields.  
**Fulfil**: <code>Hash[]</code> transactionHashes - Array of transaction hashes for transactions, which contain fields that match the query object  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_SEARCH_KEY`: Make sure that you entered valid query parameters
- `INVALID_HASH`: Make sure that the bundle hashes are 81 trytes long
- `INVALID_TRANSACTION_HASH`: Make sure that the approvee transaction hashes are 81 trytes long
- `INVALID_ADDRESS`: Make sure that the addresses contain only trytes
- `INVALID_TAG`: Make sure that the tags contain only trytes
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Object</code> | Query object |
| [query.addresses] | <code>Array.&lt;Hash&gt;</code> | Array of addresses to search for in transactions |
| [query.bundles] | <code>Array.&lt;Hash&gt;</code> | Array of bundle hashes to search for in transactions |
| [query.tags] | <code>Array.&lt;Tag&gt;</code> | Array of tags to search for in transactions |
| [query.approvees] | <code>Array.&lt;Hash&gt;</code> | Array of transaction hashes that you want to search for in transactions' branch and trunk transaction fields |
| [callback] | <code>Callback</code> | Optional callback function |

This method searches for transaction hashes by calling the connected IRI node's [`findTransactions`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#findTransactions) endpoint.

If you pass more than one query parameter, this method returns only transactions that contain all the given fields in those queries.

## Related methods

To find transaction objects, use the [`findTransactionObjects()`](#module_core.findTransactionObjects) method.

**Example**  
```js
findTransactions({ addresses: ['ADDRESS999...'] })
   .then(transactionHashes => {
     console.log(`Successfully found the following transactions:)
     console.log(JSON.stringify(transactionHashes));
  })
  .catch(error => {
    console.log(`Something went wrong: ${error}`)
  })
```
<a name="module_core.getAccountData"></a>

### *core*.getAccountData(seed, options, [callback])
**Summary**: Searches the Tangle for transctions, addresses, and balances that are associated with a given seed.  
**Fulfil**: <code>AccountData</code> accountData - Object that contains the following:
- accountData.transfers: (deprecated) Array of transaction objects that contain one of the seed's addresses
- accountData.transactions: Array of transaction hashes for transactions that contain one of the seed's addresses
- accountData.addresses: Array of spent addresses
- accountData.inputs: Array of input objects for any unspent addresses
  - accountData.inputs.address: The 81-tryte address (without checksum)
  - accountData.inputs.keyIndex: The key index of the address
  - accountData.inputs.security: Security level of the address
  - accountData.inputs.balance: Balance of the address
- accountData.balance: The total balance of unspent addresses  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_SEED`: Make sure that the seed contains only trytes
- `INVALID_SECURITY_LEVEL`: Make sure that the security level is a number between 1 and 3
- `INVALID_START_OPTION`: Make sure that the `options.start` argument is greater than zero
- `INVALID_START_END_OPTIONS`: Make sure that the `options.end` argument is not greater than the `options.start` argument by more than 1,000`
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| seed | <code>string</code> |  | The seed to use to generate addresses |
| options | <code>Object</code> |  | Options object |
| [options.start] | <code>number</code> | <code>0</code> | The key index from which to start generating addresses |
| [options.security] | <code>number</code> | <code>2</code> | The [security level](https://docs.iota.org/docs/getting-started/0.1/clients/security-levels) to use to generate the addresses |
| [options.end] | <code>number</code> |  | The key index at which to stop generating addresses |
| [callback] | <code>Callback</code> |  | Optional callback function |

This method generates [addresses](https://docs.iota.org/docs/getting-started/0.1/clients/addresses) for a given seed, and searches the Tangle for data about those addresses such as transactions, inputs, and total balance.

**Note:** The given seed is used to [generate addresses](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/generate-an-address) on your local device. It is never sent anywhere.

If you don't pass an `options.end` argument to this method, it will continue to generate addresses until it finds an unspent one.

**Note:** The total balance does not include IOTA tokens on [spent addresses](https://docs.iota.org/docs/getting-started/0.1/clients/addresses#spent-addresses).

## Related methods

To find the balance of specific addresses, which don't have to belong to your seed, use the [`getBalances()`](#module_core.getBalances) method.

To find only inputs (objects that contain information about addresses with a postive balance), use the [`getInputs()`](#module_core.getInputs) method.

**Example**  
```js
getAccountData(seed)
  .then(accountData => {
    const { addresses, inputs, transactions, balance } = accountData
    console.log(`Successfully found the following transactions:)
    console.log(JSON.stringify(transactions));
  })
  .catch(error => {
    console.log(`Something went wrong: ${error}`)
  })
```
<a name="module_core.getBalances"></a>

### *core*.getBalances(addresses, [tips], [callback])
**Summary**: Gets the confirmed balances of the given addresses.  
**Fulfil**: <code>Balances</code> balances - Object that contains the following:
- balances.addresses: Array of balances in the same order as the `addresses` argument
- balances.references: Either the transaction hash of the latest milestone, or the transaction hashes that were passed to the `tips` argument
- balances.milestoneIndex: The latest milestone index that confirmed the balance
- balances.duration: The number of milliseconds that it took for the node to return a response  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_HASH`: Make sure that the addresses contain only trytes
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| addresses | <code>Array.&lt;Hash&gt;</code> | Array of addresses |
| [tips] | <code>Array.&lt;Hash&gt;</code> | Array of past transaction hashes from which to calculate the balances of the addresses. The balance will be calculated from the latest milestone that references these transactions. |
| [callback] | <code>Callback</code> | Optional callback function |

This method uses the connected IRI node's [`getBalances`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#getbalances) endpoint.

Any pending output transactions are not included in the balance.
For example, if a pending output transaction deposits 10 Mi into an address that contains 50 Mi, this method will return a balance of 50 Mi not 60 Mi.

## Related methods

To find the balance of all addresses that belong to your seed, use the [`getAccountData()`](#module_core.getAccountData) method.

**Example**  
```js
getBalances([address])
  .then( balances => {
    console.log(`Balance of the first address: `$balances.balances[0])
    console.log(JSON.stringify(transactions));
  })
  .catch(error => {
    console.log(`Something went wrong: ${error}`)
}
```
<a name="module_core.getBundle"></a>

### *core*.getBundle(tailTransactionHash, [callback])
**Summary**: Searches the Tangle for a valid bundle that includes the given tail transaction hash.  
**Fulfil**: <code>Transaction[]</code> bundle - Array of transaction objects that are in the bundle  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hash is 81 trytes long
- `INVALID_TAIL_HASH`: Make sure that the tail transaction hash is for a transaction whose `currentIndex` field is 0
- `INVALID_BUNDLE`: Check the tail transaction's bundle for the following:
  - Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
  - Transactions in the bundle array are in the same order as their currentIndex field
  - The total value of all transactions in the bundle sums to 0
  - The bundle hash is valid
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| tailTransactionHash | <code>Hash</code> | Tail transaction hash |
| [callback] | <code>Callback</code> | Optional callback function |

This method uses the [`traverseBundle()`](#module_core.traverseBundle) method to find all transactions in a bundle, validate them, and return them as transaction objects.

For more information about what makes a bundles and transactions valid, see [this guide](https://docs.iota.org/docs/node-software/0.1/iri/concepts/transaction-validation).

## Related methods

To find transaction objects that aren't in the same bundle, use the [`getTransactionObjects()`](#module_core.getTransactionObjects) method.

**Example**  
```js
getBundle(tail)
   .then(bundle => {
    console.log(`Bundle found:)
    console.log(JSON.stringify(bundle));
  })
  .catch(error => {
    console.log(`Something went wrong: ${error}`)
   })
```
<a name="module_core.getInclusionStates"></a>

### *core*.getInclusionStates(transactions, [callback])
**Summary**: Finds out if one or more given transactions are referenced by one or more other given transactions.  
**Fulfil**: <code>boolean[]</code> states - Array of inclusion states, where `true` means that the transaction is referenced by the given transacions and `false` means that it's not.  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_TRANSACTION_HASH`: Make sure that the transaction hashes are 81 trytes long
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| transactions | <code>Array.&lt;Hash&gt;</code> | Array of transaction hashes to check |
| [callback] | <code>Callback</code> | Optional callback function |

This method uses the connected IRI node's [`getInclusionStates`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#getinclusionstates) endpoint.

If the given tip transactions reference a given transaction, the returned state is `true`.

If the given tip transactions do not reference a given transaction, the returned state is `false`.

**Example**  
```js
getInclusionStates(transactions)
  .then(states => {
     for(let i = 0; i < states.length; i++){
         states? console.log(`Transaction ${i} is referenced by the given transactions`) :
         console.log(`Transaction ${i} is not referenced by the given transactions`);
     }
  })
  .catch(error => {
    console.log(`Something went wrong: ${error}`)
  });
```
<a name="module_core.getInputs"></a>

### *core*.getInputs(seed, [options], [callback])
**Summary**: Finds a seed's addresses that have a positive balance.  
**Fulfil**: <code>Inputs</code> - Array that contains the following:
- input.addresses: An address
- input.keyIndex: The key index of the address
- input.security: The security level of the address
- input.balance: The amount of IOTA tokens in the address
- inputs.totalBalance: The combined balance of all addresses  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_SEED`: Make sure that the seed contains only trytes
- `INVALID_SECURITY_LEVEL`: Make sure that the security level is a number between 1 and 3
- `INVALID_START_OPTION`: Make sure that the `options.start` argument is greater than zero
- `INVALID_START_END_OPTIONS`: Make sure that the `options.end` argument is not greater than the `options.start` argument by more than 1,000`
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) `
- `INVALID_THRESHOLD`: Make sure that the threshold is a number greater than zero
- `INSUFFICIENT_BALANCE`: Make sure that the seed has addresses that contain IOTA tokens
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| seed | <code>string</code> |  | The seed to use to generate addresses |
| [options] | <code>Object</code> |  | Options object |
| [options.start] | <code>number</code> | <code>0</code> | The key index from which to start generating addresses |
| [options.security] | <code>number</code> | <code>2</code> | The [security level](https://docs.iota.org/docs/getting-started/0.1/clients/security-levels) to use to generate the addresses |
| [options.end] | <code>number</code> |  | The key index at which to stop generating addresses |
| [options.threshold] | <code>number</code> |  | The amount of IOTA tokens that you want to find |
| [callback] | <code>Callback</code> |  | Optional callback function |

This method generates [addresses](https://docs.iota.org/docs/getting-started/0.1/clients/addresses) for a given seed and finds those that have a positive balance.

**Note:** The given seed is used to [generate addresses](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/generate-an-address) on your local device. It is never sent anywhere.

To find a certain amount of [IOTA tokens](https://docs.iota.org/docs/getting-started/0.1/clients/token) and return only the addresses that, when combined, contain that amount, pass it to the `options.threshold` argument.

## Related methods

You may want to use this method to find inputs for the [`prepareTransfers()`](#module_core.prepareTransfers) method.

**Example**  
```js
getInputs(seed)
  .then(({ inputs, totalBalance }) => {
    console.log(`Your seed has a total of ${totalBalance} IOTA tokens \n` +
    `on the following addresses:`)
     for(let i = 0; i < inputs.length; i++) {
         console.log(`${inputs[i].address}: ${inputs[i].balance}`)
     }
  })
  .catch(error => {
    if (error.message === errors.INSUFFICIENT_BALANCE) {
       console.log('You have no IOTA tokens');
    }
  });
```
<a name="module_core.getNeighbors"></a>

### *core*.getNeighbors([callback])
**Summary**: Gets information and statistics about the connected IRI node's neighbors.  
**Fulfil**: <code>Neighbors</code> neighbors - Array that contains the following:
- neighbors.address: IP address of the neighbor
- neighbors.domain: Domain name of the neighbor
- neighbors.numberOfAllTransactions: Number of transactions in the neighbors ledger (including invalid ones)
- neighbors.numberOfRandomTransactionRequests: Number of random tip transactions that the neighbor has requested from the connected node
- neighbors.numberOfNewTransactions: Number of new transactions that the neighbor has sent to the connected node
- neighbors.numberOfInvalidTransactions: Number of invalid transactions that the neighbor sent to the connected node
- neighbors.numberOfStaleTransactions: Number of transactions that the neighbor sent to the connected node, which contain a timestamp that's older than the connected node's latest snapshot
- neighbors.numberOfSentTransactions: Number of transactions that the connected node has sent to the neighbor
- neighbors.numberOfDroppedSentPackets: Number of network packets that the neighbor dropped because its queue was full
- neighbors.connectionType: The transport protocol that the neighbor uses to sent packets to the connected node
- neighbors.connected: Whether the neighbor is connected to the node  
**Reject**: <code>Error</code> error - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>Callback</code> | Optional callback function |

This method uses the connected IRI node's [`getNeighbors`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#getneighbors) endpoint to find information about the neighbors' activity.

All statistics are aggregated until the node restarts.

## Related methods

To add neighbors to the node, use the [`addNeighbors()`](#module_core.addNeighbors) method.

**Example**  
```js
getNeighbors()
.then(neighbors => {
    console.log(`Node is connected to the following neighbors: \n`)
    console.log(JSON.stringify(neighbors));
})
.catch(error => {
    console.log(`Something went wrong: ${error}`);
});
```
<a name="module_core.getNewAddress"></a>

### *core*.getNewAddress(seed, [options], [callback])
**Summary**: Generates a new address for a given seed.  
**Fulfil**: <code>Hash\|Hash[]</code> address - A single new address or an array of new addresses  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_SEED`: Make sure that the seed contains only trytes
- `INVALID_SECURITY_LEVEL`: Make sure that the security level is a number between 1 and 3
- `INVALID_START_OPTION`: Make sure that the `options.start` argument is greater than zero
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| seed | <code>string</code> |  | The seed to use to generate addresses |
| [options] | <code>Object</code> |  | Options object |
| [options.index] | <code>number</code> | <code>0</code> | The key index from which to start generating addresses |
| [options.security] | <code>number</code> | <code>2</code> | The [security level](https://docs.iota.org/docs/getting-started/0.1/clients/security-levels) to use to generate the addresses |
| [options.checksum] | <code>boolean</code> | <code>false</code> | `Deprecated` |
| [options.total] | <code>number</code> |  | `Deprecated` |
| [options.returnAll] | <code>boolean</code> | <code>false</code> | `Deprecated` |
| [callback] | <code>Callback</code> |  | Optional callback function |

This method uses the connected IRI node's [`findTransactions`](#module_core.findTransactions)
endpoint to search every transactions in the Tangle for each generated address. If an address is found in a transaction, a new address is generated until one is found that isn't in any transactions.

**Note:** The given seed is used to [generate addresses](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/generate-an-address) on your local device. It is never sent anywhere.

**Note:** Because of local snapshots, this method is not a reliable way of generating unspent addresses. Instead, you should use the [account module](https://docs.iota.org/docs/client-libraries/0.1/account-module/introduction/overview) to keep track of your spent addresses.

## Related methods

To find out which of your addresses are spent, use the [`getAccountData()`](#module_core.getAccountData) method.

**Example**  
```js
getNewAddress(seed)
  .then(address => {
    console.log(`Here's your new address: ${address})
  })
  .catch(error => {
    console.log(`Something went wrong: ${error}`);
  })
```
<a name="module_core.getNodeInfo"></a>

### *core*.getNodeInfo([callback])
**Summary**: Gets information about the connected IRI node.  
**Fulfil**: <code>NodeInfo</code> info - Object that contains the following information:
info.appName: Name of the IRI network
info.appVersion: Version of the [IRI node software](https://docs.iota.org/docs/node-software/0.1/iri/introduction/overview)
info.jreAvailableProcessors: Available CPU cores on the node
info.jreFreeMemory: Amount of free memory in the Java virtual machine
info.jreMaxMemory: Maximum amount of memory that the Java virtual machine can use
info.jreTotalMemory: Total amount of memory in the Java virtual machine
info.jreVersion: The version of the Java runtime environment
info.latestMilestone: Transaction hash of the latest [milestone](https://docs.iota.org/docs/getting-started/0.1/network/the-coordinator)
info.latestMilestoneIndex: Index of the latest milestone
info.latestSolidSubtangleMilestone: Transaction hash of the node's latest solid milestone
info.latestSolidSubtangleMilestoneIndex: Index of the node's latest solid milestone
info.milestoneStartIndex: Start milestone for the current version of the IRI node software
info.lastSnapshottedMilestoneIndex: Index of the last milestone that triggered a [local snapshot](https://docs.iota.org/docs/getting-started/0.1/network/nodes#local-snapshots) on the node
info.neighbors: Total number of connected neighbors
info.packetsQueueSize: Size of the node's packet queue
info.time: Unix timestamp
info.tips: Number of tips transactions
info.transactionsToRequest: Total number of transactions that the node is missing in its ledger
info.features: Enabled configuration options on the node
info.coordinatorAddress: Address (Merkle root) of the [Coordinator](https://docs.iota.org/docs/getting-started/0.1/network/the-coordinator)
info.duration: Number of milliseconds it took to complete the request  
**Reject**: <code>Error</code> error - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>Callback</code> | Optional callback function |

This method uses the connected IRI node's
[`getNodeInfo`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#getnodeinfo) endpoint.

## Related methods

To get statistics about the connected node's neighbors, use the [`getNeighbors()`](#module_core.getNeighbors) method.

**Example**  
```js
getNodeInfo()
  .then(info => console.log(JSON.stringify(info)))
  .catch(error => {
    console.log(`Something went wrong: ${error}`);
  })
```
<a name="module_core.getTransactionObjects"></a>

### *core*.getTransactionObjects(hashes, [callback])
**Summary**: Searches the Tangle for transactions with the given hashes and returns their contents as objects.  
**Fulfil**: <code>Transaction[]</code> - Array of transaction objects  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_TRANSACTION_HASH`: Make sure that the transaction hashes are 81 trytes long
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| hashes | <code>Array.&lt;Hash&gt;</code> | Array of transaction hashes |
| [callback] | <code>function</code> | Optional callback function |

This method returns transaction objects in the same order as the given hashes.
For example, if the node doesn't have any transactions with a given hash, the value at that index in the returned array is empty.

## Related methods

To find all transaction objects in a specific bundle, use the [`getBundle()`](#module_core.getBundle) method.

**Example**  
```js
getTransactionObjects(transactionHashes)
  .then(transactionObjects => {
    console.log('Found the following transactions:');
    console.log(JSON.stringify(transactionObjects));
  })
  .catch(error => {
    console.log(`Something went wrong: ${error}`);
  });
```
<a name="module_core.getTransactionsToApprove"></a>

### *core*.getTransactionsToApprove(depth, [reference], [callback])
**Summary**: Gets two tip transaction hashes that can be used as branch and trunk transactions.  
**Fulfil**: <code>Object</code> transactionsToApprove - An object that contains the following:
- trunkTransaction: Transaction hash
- branchTransaction: Transaction hash  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_DEPTH`: Make sure that the `depth` argument is greater than zero
- `INVALID_REFERENCE_HASH`: Make sure that the reference transaction hash is 81 trytes long
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| depth | <code>number</code> | The [depth](https://docs.iota.org/docs/getting-started/0.1/transactions/depth) at which to start the weighted random walk. The [Trinity wallet](https://trinity.iota.org/) uses a value of `3`, meaning that the weighted random walk starts 3 milestones in the past. |
| [reference] | <code>Hash</code> | Optional transaction hash that you want the tip transactions to reference |
| [callback] | <code>Callback</code> | Optional callback function |

This method gets two [consistent](#module_core.checkConsistency) tip transaction hashes that can be used as branch and trunk transactions by calling the connected IRI node's [`getTransactionsToApprove`](https://docs.iota.works/iri/api#endpoints/getTransactionsToApprove) endpoint.

To make sure that the tip transactions also directly or indirectly reference another transaction, add that transaction's hash to the `reference` argument.

## Related methods

You can use the returned transaction hashes to do proof of work on transaction trytes, using the [`attachToTangle()`](#module_core.attachToTangle) method.

**Example**  
```js
getTransactionsToApprove(3)
  .then(transactionsToApprove) => {
     console.log(Found the following transaction hashes that you can reference in a new bundle:);
     console.log(JSON.stringify(transactionsToApprove));
  })
  .catch(error => {
    console.log(`Something went wrong: ${error}`);
  })
```
<a name="module_core.getTrytes"></a>

### *core*.getTrytes(hashes, [callback])
**Summary**: Gets the transaction trytes for the given transaction hashes.  
**Fulfil**: <code>Trytes[]</code> transactionTrytes - Array of transaction trytes  
**Reject**: Error{} error - An error that contains one of the following:
- `INVALID_TRANSACTION_HASH`: Make sure that the transaction hashes are 81 trytes long
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| hashes | <code>Array.&lt;Hash&gt;</code> | Array of transaction hashes |
| [callback] | <code>Callback</code> | Optional callback function |

This method uses the connected IRI node's
[`getTrytes`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#gettrytes) endpoint.

The transaction trytes include all transaction fields except the transaction hash.

**Note:** If the connected IRI node doesn't have the given transaction in its ledger, the value at the index of that transaction hash is either `null` or a string of `9`s.

## Related methods

To get transaction objects instead of trytes, use the [`getTransactionObjects()`](#module_core.getTransactionObjects) method.

**Example**  
```js
getTrytes(hashes)
  .then(trytes => {
  .then(transactionTrytes => {
    console.log(Found the following transaction trytes:);
    console.log(JSON.stringify(transactionTrytes));
  })
  .catch(error => {
    console.log(`Something went wrong: ${error}`);
  });
```
<a name="module_core.isPromotable"></a>

### *core*.isPromotable(tail, [callback])
**Summary**: Checks if a given tail transaction hash can be [promoted](https://docs.iota.org/docs/getting-started/0.1/transactions/reattach-rebroadcast-promote#promote).  
**Fulfil**: <code>boolean</code> isPromotable - Returns `true` if the transaction is promotable or `false` if not.  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hashes are 81 trytes long and their `currentIndex` field is 0
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| tail | <code>Hash</code> | Tail transaction hash |
| [callback] | <code>Callback</code> | Optional callback function |

To decide if a transaction can be promoted, this method makes sure that it's [consistent](#module_core.checkConsistency)
and that the value of the transaction's `attachmentTimestamp` field is not older than the latest 6 milestones.

## Related methods

If a transaction is promotable, you can promote it by using the [`promoteTransaction()`](#module_core.promoteTransaction) method.

**Example**  
```js
isPromotable(tailTransactionHash)
  .then(isPromotable => {
    isPromotable? console.log(`${tailTransactionHash} can be promoted`):
    console.log(`${tailTransactionHash} cannot be promoted. You may want to reattach it.`);
  })
  .catch(error => {
    console.log(`Something went wrong: ${error}`);
  })
```
<a name="module_core.createPrepareTransfers"></a>

### *core*.createPrepareTransfers([provider])
**Summary**: Creates a new `prepareTransfers()` method.  

| Param | Type | Description |
| --- | --- | --- |
| [provider] | <code>Provider</code> | Optional provider object that the method should use to call the node's API endpoints. To create transactions offline, omit this parameter so that the returned function does not get your addresses and balances from the node. To create value transactions offline, make sure to pass input objects and a remainder address to the returned function. |

**Returns**: <code>function</code> - [`prepareTransfers`](#module_core.prepareTransfers)  - A new `prepareTransfers()` function that uses your chosen Provider instance.  
**Example**  
```js
const prepareTransfers = Iota.createPrepareTransfers();

const transfers = [
 {
   value: 1,
   address: 'RECEIVINGADDRESS...'
 }
];

prepareTransfers(seed, transfers, {
 inputs:[{address: 'ADDRESS...',
 keyIndex: 5,
 security: 2,
 balance: 50}],
 // Remainder will be 50 -1 = 49 IOTA tokens
 address: 'REMAINDERADDRESS...'
})
.then(bundleTrytes => {
 console.log('Bundle trytes are ready to be attached to the Tangle:');
 console.log(JSON.stringify(bundleTrytes));
})
.catch(error => {
 console.log(`Something went wrong: ${error}`);
});
```
<a name="module_core.prepareTransfers"></a>

### *core*.prepareTransfers(seed, transfers, [options], [callback])
**Summary**: Creates and signs a bundle of valid transaction trytes, using the given arguments.  
**Fulfil**: <code>array</code> bundleTrytes - Array of transaction trytes  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_SEED`: Make sure that the seed contains only trytes
- `INVALID_TRANSFER_ARRAY`: Make sure that any objects in the `transfers` argument are valid (for example that the addresses contain only trytes, the values are numbers)
- `INVALID_INPUT`: Make sure that the `options.inputs[]` argument contains valid input objects
- `INVALID_REMAINDER_ADDRESS`: If you used the `createPrepareTransfers()` method without a provider, make sure you entered an address in the `options.remainderAddress` argument
- `INSUFFICIENT_BALANCE`: Make sure that the seed's addresses have enough IOTA tokens to complete the transfer
- `NO_INPUTS`: Make sure that the `options.inputs[]` argument contains valid input objects
- `SENDING_BACK_TO_INPUTS`: Make sure that none of the `transfer.address` arguments are in the `options.inputs[].address parameters
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| seed | <code>string</code> |  | The seed to use to generate addresses and sign transactions |
| transfers | <code>Transfers.&lt;Transfer&gt;</code> |  | Array of transfer objects |
| transfer.address | <code>Hash</code> |  | Address to which to send a transaction |
| transfer.value | <code>number</code> |  | Amount of IOTA tokens to send to the address |
| transfer.message | <code>string</code> |  | Message to include in the transaction. The message must include only ASCII characters. |
| transfer.tag | <code>string</code> |  | Up to 27 trytes to include in the transaction's `obsoleteTag` field |
| [options] | <code>Object</code> |  | Options object |
| [options.inputs] | <code>Array.&lt;Input&gt;</code> |  | Array of input objects, which contain information about the addresses from which to withdraw IOTA tokens |
| [options.inputs[].address] | <code>Hash</code> |  | One of the seed's addresses from which to withdraw IOTA tokens |
| [options.inputs[].keyIndex] | <code>number</code> |  | Key index of the address |
| [options.inputs[].security] | <code>number</code> |  | Security level of the address |
| [options.inputs[].balance] | <code>number</code> |  | Total balance of the address. The total balance is withdrawn and any remaining IOTA tokens are sent to the address in the `options.remainderAddress` field. |
| [options.remainderAddress] | <code>Hash</code> |  | Remainder address to send any remaining IOTA tokens (total value in the `transfers` array minus the total balance of the input addresses) |
| [options.security] | <code>number</code> | <code>2</code> | Security level to use for calling the [`getInputs`](#module_core.getInputs) method to automatically select input objects |
| [callback] | <code>function</code> |  | Optional callback function |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [options.hmacKey] | <code>Hash</code> | HMAC key used for adding an HMAC signature to the transaction |

This method creates a bundle, using the given arguments and uses the given seed to sign any transactions that withdraw IOTA tokens.

**Note:** The given seed is used to [generate addresses](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/generate-an-address) and sign transactions on your local device. It is never sent anywhere.

**Note:** To create transactions offline, use the [`createPrepareTransfers`](#module_core.createPrepareTransfers) without a `provider` argument.

After calling this method, we recommend saving the returned transaction trytes in local storage before sending them to a node.
By doing so, you make sure that you can always reattach your transactions to the Tangle in case they remain in a pending state.
Reattaching transactions is safer than creating and signing new transactions, which could lead to [spent addresses](https://docs.iota.org/docs/getting-started/0.1/clients/addresses#spent-addresses).

## Related methods

To attach the returned transaction trytes to the Tangle, you can use one of the following:

- [`sendTrytes()`](#module_core.sendTrytes) (easiest)
- [`getTransactionsToApprove()`](#module_core.getTransactionsToApprove) followed by [`attachToTangle()`](#module_core.attachToTangle) followed by [`broadcastTransactions()`](#module_core.broadcastTransactions) (for more control)

**Example**  
```js

const transfers = [
 {
   value: 1,
   address: 'RECEIVINGADDRESS...'
 }
];

prepareTransfers(seed, transfers)
.then(bundleTrytes => {
 console.log('Bundle trytes are ready to be attached to the Tangle:');
 console.log(JSON.stringify(bundleTrytes));
})
.catch(error => {
 console.log(`Something went wrong: ${error}`);
});
```
<a name="module_core.promoteTransaction"></a>

### *core*.promoteTransaction(tail, depth, minWeightMagnitude, [spamTransfers], [options], [callback])
**Summary**: [Promotes](https://docs.iota.org/docs/getting-started/0.1/transactions/reattach-rebroadcast-promote#promote) a given tail transaction.  
**Fulfil**: <code>Transaction[]</code> transactions - Array of zero-value transaction objects that were sent  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INCONSISTENT_SUBTANGLE`: In this case, promotion has no effect and a reattachment is required by calling the [`replayBundle()`](#module_core.replayBundle) method
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| tail | <code>Hash</code> |  | Tail transaction hash |
| depth | <code>number</code> |  | The [depth](https://docs.iota.org/docs/getting-started/0.1/transactions/depth) at which to start the weighted random walk. The [Trinity wallet](https://trinity.iota.org/) uses a value of `3`, meaning that the weighted random walk starts 3 milestones in the past. |
| minWeightMagnitude | <code>number</code> |  | [Minimum weight magnitude](https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude) |
| [spamTransfers] | <code>Array</code> | <code>{address: &#x27;9999...999&#x27;, value:0, tag:&#x27;999...999&#x27;,message: &#x27;999...999&#x27; }</code> | Array of transfer objects to use to promote the transaction |
| [options] | <code>Object</code> |  | Options object |
| [options.delay] | <code>number</code> |  | Delay in milliseconds before sending each zero-value transaction |
| [options.interrupt] | <code>boolean</code> \| <code>function</code> |  | Either a boolean or a function that evaluates to a boolean to stop the method from sending transactions |
| [callback] | <code>Callback</code> |  | Optional callback function |

This method promotes only consistent transactions by checking them with the [`checkConsistency()`](#module_core.checkConsistency) method.

## Related methods

Use the [`isPromotable()`](#module_core.isPromotable) method to check if a transaction can be [promoted](https://docs.iota.org/docs/getting-started/0.1/transactions/reattach-rebroadcast-promote).

If a transaction can't be promoted, use the [`replayBundle()`](#module_core.replayBundle) method to [reattach](https://docs.iota.org/docs/getting-started/0.1/transactions/reattach-rebroadcast-promote) it to the Tangle.

**Example**  
```js
iota.promoteTransaction('FOSJBUZEHOBDKIOJ9RXBRPPZSJHWMXCDFJLIJSLJG9HRKEEJGAHWATEVCYERPQXDWFHQRGZOGIILZ9999',
3,14)
.then(transactions => {
  console.log(`Promoted the tail transaction, using the following transactions: \n` +
  JSON.stringify(transactions));
})
.catch(error => {
    console.log(`Something went wrong: ${error}`);
})
```
<a name="module_core.removeNeighbors"></a>

### *core*.removeNeighbors(uris, [callback])
**Summary**: Removes a list of neighbors from the connected IRI node.  
**Fulfil**: <code>number</code> numberOfNeighbors - Number of neighbors that were removed  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_URI`: Make sure that the URI is valid (for example URIs must start with `udp://` or `tcp://`)
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| uris | <code>Array</code> | Array of neighbor URIs that you want to add to the node |
| [callback] | <code>Callback</code> | Optional callback function |

This method removes a list of neighbors from the connected IRI node by calling its
[`removeNeighbors`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#removeneighbors) endpoint.

These neighbors are re-added when the node is restarted.

## Related methods

To see statistics about the connected IRI node's neighbors, use the [`getNeighbors()`](#module_core.getNeighbors) method.

**Example**  
```js
iota.addNeighbors(['tcp://148.148.148.148:15600'])
  .then(numberOfNeighbors => {
    console.log(`Successfully removed ${numberOfNeighbors} neighbors`)
  }).catch(error => {
    console.log(`Something went wrong: ${error}`)
  })
```
<a name="module_core.replayBundle"></a>

### *core*.replayBundle(tail, depth, minWeightMagnitude, [callback])
**Summary**: Reattaches a bundle to the Tangle.  
**Fulfil**: <code>Transaction[]</code> bundle - Array of transaction objects in the reattached bundle  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_DEPTH`: Make sure that the `depth` argument is greater than zero
- `INVALID_MIN_WEIGHT_MAGNITUDE`: Make sure that the minimum weight magnitude is at least the same as the original bundle
- `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hash is 81 trytes long and its `currentIndex` field is 0
- `INVALID_BUNDLE`: Check the tail transaction's bundle for the following:
  - Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
  - Transactions in the bundle array are in the same order as their currentIndex field
  - The total value of all transactions in the bundle sums to 0
  - The bundle hash is valid
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| tail | <code>Hash</code> | Tail transaction hash |
| depth | <code>number</code> | The [depth](https://docs.iota.org/docs/getting-started/0.1/transactions/depth) at which to start the weighted random walk. The [Trinity wallet](https://trinity.iota.org/) uses a value of `3`, meaning that the weighted random walk starts 3 milestones in the past. |
| minWeightMagnitude | <code>number</code> | The [minimum weight magnitude](https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude) to use for proof of work. **Note:** This value must be at least the same as the minimum weight magnitude of the branch and trunk transactions. |
| [callback] | <code>Callback</code> | Optional callback function |

This method [reattaches](https://docs.iota.org/docs/getting-started/0.1/transactions/reattach-rebroadcast-promote#reattach) a bundle to the Tangle by calling the [`sendTrytes()`](#module_core.sendTrytes) method.

You can call this function as many times as you need until one of the bundles becomes confirmed.

## Related methods

Before you call this method, it's worth finding out if you can promote it by calling the [`isPromotable()`](#module_core.isPromotable) method.

**Example**  
```js
iota.replayBundle(tailTransactionHash)
  .then(bundle => {
    console.log(`Successfully reattached ${tailTransactionHash}`);
    console.log(JSON.stringify(bundle));
  }).catch(error => {
    console.log(`Something went wrong: ${error}`)
  })
```
<a name="module_core.sendTrytes"></a>

### *core*.sendTrytes(trytes, depth, minWeightMagnitude, [reference], [callback])
**Summary**: Does tip selection and proof of work for a bundle of transaction trytes before sending the final transactions to the connected IRI node.  
**Fulfil**: <code>Transaction[]</code> bundle - Array of transaction objects that you just sent to the node  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_TRANSACTION_TRYTES`: Make sure the trytes can be converted to a valid transaction object
- `INVALID_DEPTH`: Make sure that the `depth` argument is greater than zero
- `INVALID_MIN_WEIGHT_MAGNITUDE`: Make sure that the minimum weight magnitude is at least the same as the original bundle
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| trytes | <code>Array.&lt;Trytes&gt;</code> | Array of prepared transaction trytes to attach, store, and send |
| depth | <code>number</code> | The [depth](https://docs.iota.org/docs/getting-started/0.1/transactions/depth) at which to start the weighted random walk. The [Trinity wallet](https://trinity.iota.org/) uses a value of `3`, meaning that the weighted random walk starts 3 milestones in the past. |
| minWeightMagnitude | <code>number</code> | The [minimum weight magnitude](https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude) to use for proof of work. **Note:** This value must be at least the same as the minimum weight magnitude of the branch and trunk transactions. |
| [reference] | <code>string</code> | Optional reference transaction hash |
| [callback] | <code>Callback</code> | Optional callback function |

This method takes an array of transaction trytes that don't include a proof of work or

Then, the method calls the following to finalize the bundle and send it to the node:
- [`getTransactionsToApprove()`](#module_core.getTransactionsToApprove)
- [`attachToTangle()`](#module_core.attachToTangle)
- [`storeAndBroadcast()`](#module_core.storeAndBroadcast)

**Note:** Before calling this method, we recommend saving your transaction trytes in local storage.
By doing so, you make sure that you can always reattach your transactions to the Tangle in case they remain in a pending state.

## Related methods

To create transaction trytes that don't include a proof of work or trunk and branch transactions, use the [`prepareTransfers()`](#module_core.prepareTransfers) method.

**Example**  
```js
prepareTransfers(seed, transfers)
  .then(trytes => {
     return iota.sendTrytes(trytes, depth, minWeightMagnitude)
  })
  .then(bundle => {
    console.log(`Successfully attached transactions to the Tangle`);
    console.log(JSON.stringify(bundle));
  }).catch(error => {
    console.log(`Something went wrong: ${error}`)
  })
```
<a name="module_core.storeAndBroadcast"></a>

### *core*.storeAndBroadcast(trytes, [callback])
**Summary**: Sends the given transaction trytes to the connected IRI node.  
**Fulfil**: <code>Trytes[]</code> transactionTrytes - Attached transaction trytes  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_TRANSACTION_TRYTES`: Make sure the trytes can be converted to a valid transaction object
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| trytes | <code>Array.&lt;Trytes&gt;</code> | Array of transaction trytes |
| [callback] | <code>Callback</code> | Optional callback function |

This method uses the connected IRI node's
[`broadcastTransactions`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#broadcastTransactions) and [`storeTransactions`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#storeTransactions) endpoints to send it the given transaction trytes.

**Note:** Before calling this method, we recommend saving your transaction trytes in local storage.
By doing so, you make sure that you can always reattach your transactions to the Tangle in case they remain in a pending state.

## Related methods

The given transaction trytes must be in a valid bundle and must include a proof of work.

To create a valid bundle, use the `prepareTransfers()` method. For more information about what makes a bundles and transactions valid, see [this guide](https://docs.iota.org/docs/node-software/0.1/iri/concepts/transaction-validation).

To do proof of work, use one of the following methods:

- [`attachToTangle()`](#module_core.attachToTangle)
- [`sendTrytes()`](#module_core.sendTrytes)

**Example**  
```js
storeAndBroadcast(trytes)
.then(transactionTrytes => {
    console.log(`Successfully sent transactions to the node`);
    console.log(JSON.stringify(transactionTrytes));
}).catch(error => {
    console.log(`Something went wrong: ${error}`)
})
```
<a name="module_core.storeAndBroadcast"></a>

### *core*.storeAndBroadcast(trytes, [callback])
**Summary**: Stores the given transaction trytes on the connected IRI node.  
**Fullfil**: <code>Trytes[]</code> transactionTrytes - Attached transaction trytes  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_TRANSACTION_TRYTES`: Make sure the trytes can be converted to a valid transaction object
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| trytes | <code>Array.&lt;Trytes&gt;</code> | Array of transaction trytes |
| [callback] | <code>Callback</code> | Optional callback function |

This method uses the connected IRI node's
[`storeTransactions`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#storeTransactions) endpoint to store the given transaction trytes.

**Note:** Before calling this method, we recommend saving your transaction trytes in local storage.
By doing so, you make sure that you can always reattach your transactions to the Tangle in case they remain in a pending state.

## Related methods

The given transaction trytes must be in a valid bundle and must include a proof of work.

To create a valid bundle, use the `prepareTransfers()` method. For more information about what makes a bundles and transactions valid, see [this guide](https://docs.iota.org/docs/node-software/0.1/iri/concepts/transaction-validation).

To do proof of work, use one of the following methods:

- [`attachToTangle()`](#module_core.attachToTangle)
- [`sendTrytes()`](#module_core.sendTrytes)

**Example**  
```js
storeTransactions(trytes)
.then(transactionTrytes => {
    console.log(`Successfully stored transactions on the node`);
    console.log(JSON.stringify(transactionTrytes));
}).catch(error => {
    console.log(`Something went wrong: ${error}`)
})
```
<a name="module_core.traverseBundle"></a>

### *core*.traverseBundle(trunkTransaction, [bundle], [callback])
**Summary**: Gets all transaction in the bundle of a given tail transaction hash.  
**Fulfil**: <code>Transaction[]</code> bundle - Array of transaction objects  
**Reject**: <code>Error</code> error - An error that contains one of the following:
- `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hash is 81 trytes long
-`INVALID_TAIL_TRANSACTION`: Make sure that the tail transaction hash is for a transaction whose `currentIndex` field is 0
- `INVALID_BUNDLE`: Check the tail transaction's bundle for the following:
  - Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
  - Transactions in the bundle array are in the same order as their currentIndex field
  - The total value of all transactions in the bundle sums to 0
  - The bundle hash is valid
- Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| trunkTransaction | <code>Hash</code> |  | Tail transaction hash |
| [bundle] | <code>Hash</code> | <code>[]</code> | Array of existing transaction objects to include in the returned bundle |
| [callback] | <code>Callback</code> |  | Optional callback function |

Gets all transactions in the bundle of a given tail transaction hash, by traversing its `trunkTransaction` field.

**Note:** This method does not validate the bundle.

## Related methods

To get and validate all transactions in a bundle, use the [`getBundle()`](#module_core.getBundle) method.

**Example**  
```js
traverseBundle(tailTransactionHash)
.then(bundle => {
    console.log(`Successfully found the following transactions in the bundle:`);
    console.log(JSON.stringify(bundle));
}).catch(error => {
    console.log(`Something went wrong: ${error}`)
})
```
<a name="module_core.generateAddress"></a>

### *core*.generateAddress(seed, index, [security], [checksum])
**Summary**: Generates an address with a specific index and security level.  
**Throws**:

- <code>errors.INVALID\_SEED</code> : Make sure that the seed contains only trytes
- <code>errors.INVALID\_SECURITY\_LEVEL</code> : Make sure that the security level is a number between 1 and 3


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| seed | <code>string</code> |  | The seed to use to generate the address |
| index | <code>number</code> |  | The key index to use to generate the address |
| [security] | <code>number</code> | <code>2</code> | The [security level](https://docs.iota.org/docs/getting-started/0.1/clients/security-levels) to use to generate the address |
| [checksum] | <code>boolean</code> | <code>false</code> | Whether to add the [checksum](https://docs.iota.org/docs/getting-started/0.1/clients/checksums) |

Generates an address, according to the given seed, index, and security level.

**Note:** This method does not check if the address is [spent](https://docs.iota.org/docs/getting-started/0.1/clients/addresses#spent-addresses).

## Related methods

To generate an address that has a lower probability of being spent, use the [`getNewAddress()`](#module_core.getNewAddress) method.

**Returns**: <code>Hash</code> - address - An 81-tryte address  
**Example**  
```js
const myAddress = generateAddress(seed, 0);
```
