[@iota/iota.js](../README.md) / [models/IPowProvider](../modules/models_ipowprovider.md) / IPowProvider

# Interface: IPowProvider

Perform the POW on a message.

## Hierarchy

* **IPowProvider**

## Implemented by

* [*LocalPowProvider*](../classes/pow_localpowprovider.localpowprovider.md)
* [*LocalPowProvider*](../classes/index_browser.localpowprovider.md)
* [*LocalPowProvider*](../classes/index_node.localpowprovider.md)

## Index

### Methods

* [pow](models_ipowprovider.ipowprovider.md#pow)

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
