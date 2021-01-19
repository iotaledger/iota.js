[@iota/iota.js](../../README.md) / [pow/localPowProvider](../../modules/pow_localpowprovider.md) / LocalPowProvider

# Class: LocalPowProvider

[pow/localPowProvider](../../modules/pow_localpowprovider.md).LocalPowProvider

Local POW Provider.
WARNING - This is really slow.

## Hierarchy

* **LocalPowProvider**

## Implements

* [*IPowProvider*](../../interfaces/models/ipowprovider.ipowprovider.md)

## Table of contents

### Constructors

- [constructor](localpowprovider.localpowprovider.md#constructor)

### Methods

- [pow](localpowprovider.localpowprovider.md#pow)

## Constructors

### constructor

\+ **new LocalPowProvider**(): [*LocalPowProvider*](localpowprovider.localpowprovider.md)

**Returns:** [*LocalPowProvider*](localpowprovider.localpowprovider.md)

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

Implementation of: [IPowProvider](../../interfaces/models/ipowprovider.ipowprovider.md)
