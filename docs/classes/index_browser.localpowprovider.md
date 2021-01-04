[@iota/iota.js](../README.md) / [index.browser](../modules/index_browser.md) / LocalPowProvider

# Class: LocalPowProvider

Local POW Provider.
WARNING - This is really slow.

## Hierarchy

* **LocalPowProvider**

## Implements

* [*IPowProvider*](../interfaces/models_ipowprovider.ipowprovider.md)

## Index

### Constructors

* [constructor](index_browser.localpowprovider.md#constructor)

### Methods

* [pow](index_browser.localpowprovider.md#pow)

## Constructors

### constructor

\+ **new LocalPowProvider**(): [*LocalPowProvider*](pow_localpowprovider.localpowprovider.md)

**Returns:** [*LocalPowProvider*](pow_localpowprovider.localpowprovider.md)

## Methods

### pow

▸ **pow**(`message`: *Uint8Array*, `targetScore`: *number*): *Promise*<*bigint*\>

Perform pow on the message and return the nonce of at least targetScore.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | *Uint8Array* | The message to process.   |
`targetScore` | *number* | the target score.   |

**Returns:** *Promise*<*bigint*\>

The nonce.

Implementation of: [IPowProvider](../interfaces/models_ipowprovider.ipowprovider.md)
