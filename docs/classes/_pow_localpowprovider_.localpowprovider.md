**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["pow/localPowProvider"](../modules/_pow_localpowprovider_.md) / LocalPowProvider

# Class: LocalPowProvider

Local POW Provider.
WARNING - This is really slow.

## Hierarchy

* **LocalPowProvider**

## Implements

* [IPowProvider](../interfaces/_models_ipowprovider_.ipowprovider.md)

## Index

### Methods

* [pow](_pow_localpowprovider_.localpowprovider.md#pow)

## Methods

### pow

▸ **pow**(`message`: Uint8Array, `targetScore`: number): Promise<bigint\>

*Implementation of [IPowProvider](../interfaces/_models_ipowprovider_.ipowprovider.md)*

Perform pow on the message and return the nonce of at least targetScore.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | Uint8Array | The message to process. |
`targetScore` | number | the target score. |

**Returns:** Promise<bigint\>

The nonce.
