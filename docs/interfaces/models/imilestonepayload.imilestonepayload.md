[@iota/iota.js](../../README.md) / [models/IMilestonePayload](../../modules/models_imilestonepayload.md) / IMilestonePayload

# Interface: IMilestonePayload

[models/IMilestonePayload](../../modules/models_imilestonepayload.md).IMilestonePayload

Milestone payload.

## Hierarchy

* [*ITypeBase*](itypebase.itypebase.md)<*1*\>

  ↳ **IMilestonePayload**

## Table of contents

### Properties

- [inclusionMerkleProof](imilestonepayload.imilestonepayload.md#inclusionmerkleproof)
- [index](imilestonepayload.imilestonepayload.md#index)
- [parents](imilestonepayload.imilestonepayload.md#parents)
- [publicKeys](imilestonepayload.imilestonepayload.md#publickeys)
- [receipt](imilestonepayload.imilestonepayload.md#receipt)
- [signatures](imilestonepayload.imilestonepayload.md#signatures)
- [timestamp](imilestonepayload.imilestonepayload.md#timestamp)
- [type](imilestonepayload.imilestonepayload.md#type)

## Properties

### inclusionMerkleProof

• **inclusionMerkleProof**: *string*

The merkle proof inclusions.

___

### index

• **index**: *number*

The index name.

___

### parents

• **parents**: *string*[]

The parenst where this milestone attaches to.

___

### publicKeys

• **publicKeys**: *string*[]

The public keys.

___

### receipt

• `Optional` **receipt**: *undefined* \| [*IReceiptPayload*](ireceiptpayload.ireceiptpayload.md)

Receipt payload.

___

### signatures

• **signatures**: *string*[]

The signatures.

___

### timestamp

• **timestamp**: *number*

The timestamp of the milestone.

___

### type

• **type**: *1*

The type of the object.

Inherited from: [ITypeBase](itypebase.itypebase.md).[type](itypebase.itypebase.md#type)
