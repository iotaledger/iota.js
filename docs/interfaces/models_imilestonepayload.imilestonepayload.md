[@iota/iota.js](../README.md) / [models/IMilestonePayload](../modules/models_IMilestonePayload.md) / IMilestonePayload

# Interface: IMilestonePayload

[models/IMilestonePayload](../modules/models_IMilestonePayload.md).IMilestonePayload

Milestone payload.

## Hierarchy

- [`ITypeBase`](models_ITypeBase.ITypeBase.md)<``1``\>

  ↳ **`IMilestonePayload`**

## Table of contents

### Properties

- [inclusionMerkleProof](models_IMilestonePayload.IMilestonePayload.md#inclusionmerkleproof)
- [index](models_IMilestonePayload.IMilestonePayload.md#index)
- [nextPoWScore](models_IMilestonePayload.IMilestonePayload.md#nextpowscore)
- [nextPoWScoreMilestoneIndex](models_IMilestonePayload.IMilestonePayload.md#nextpowscoremilestoneindex)
- [parentMessageIds](models_IMilestonePayload.IMilestonePayload.md#parentmessageids)
- [publicKeys](models_IMilestonePayload.IMilestonePayload.md#publickeys)
- [receipt](models_IMilestonePayload.IMilestonePayload.md#receipt)
- [signatures](models_IMilestonePayload.IMilestonePayload.md#signatures)
- [timestamp](models_IMilestonePayload.IMilestonePayload.md#timestamp)
- [type](models_IMilestonePayload.IMilestonePayload.md#type)

## Properties

### inclusionMerkleProof

• **inclusionMerkleProof**: `string`

The merkle proof inclusions.

___

### index

• **index**: `number`

The index name.

___

### nextPoWScore

• **nextPoWScore**: `number`

The next PoW score.

___

### nextPoWScoreMilestoneIndex

• **nextPoWScoreMilestoneIndex**: `number`

The milestone at which the next PoW score becomes active.

___

### parentMessageIds

• **parentMessageIds**: `string`[]

The parents where this milestone attaches to.

___

### publicKeys

• **publicKeys**: `string`[]

The public keys.

___

### receipt

• `Optional` **receipt**: [`IReceiptPayload`](models_IReceiptPayload.IReceiptPayload.md)

Receipt payload.

___

### signatures

• **signatures**: `string`[]

The signatures.

___

### timestamp

• **timestamp**: `number`

The timestamp of the milestone.

___

### type

• **type**: ``1``

The type of the object.

#### Inherited from

[ITypeBase](models_ITypeBase.ITypeBase.md).[type](models_ITypeBase.ITypeBase.md#type)
