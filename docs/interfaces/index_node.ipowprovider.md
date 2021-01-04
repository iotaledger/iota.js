[@iota/iota.js](../README.md) / [index.node](../modules/index_node.md) / IPowProvider

# Interface: IPowProvider

Perform the POW on a message.

## Hierarchy

* **IPowProvider**

## Index

### Methods

* [pow](index_node.ipowprovider.md#pow)

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
