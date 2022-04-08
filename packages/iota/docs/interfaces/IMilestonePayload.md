# Interface: IMilestonePayload

Milestone payload.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``1``\>

  ↳ **`IMilestonePayload`**

## Table of contents

### Properties

- [type](IMilestonePayload.md#type)
- [index](IMilestonePayload.md#index)
- [timestamp](IMilestonePayload.md#timestamp)
- [parentMessageIds](IMilestonePayload.md#parentmessageids)
- [inclusionMerkleProof](IMilestonePayload.md#inclusionmerkleproof)
- [nextPoWScore](IMilestonePayload.md#nextpowscore)
- [nextPoWScoreMilestoneIndex](IMilestonePayload.md#nextpowscoremilestoneindex)
- [metadata](IMilestonePayload.md#metadata)
- [signatures](IMilestonePayload.md#signatures)
- [receipt](IMilestonePayload.md#receipt)

## Properties

### type

• **type**: ``1``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

___

### index

• **index**: `number`

The index name.

___

### timestamp

• **timestamp**: `number`

The timestamp of the milestone.

___

### parentMessageIds

• **parentMessageIds**: `string`[]

The parents where this milestone attaches to.

___

### inclusionMerkleProof

• **inclusionMerkleProof**: `string`

The merkle proof inclusions.

___

### nextPoWScore

• **nextPoWScore**: `number`

The next PoW score.

___

### nextPoWScoreMilestoneIndex

• **nextPoWScoreMilestoneIndex**: `number`

The milestone at which the next PoW score becomes active.

___

### metadata

• **metadata**: `string`[]

Hex-encoded binary data with 0x prefix.

___

### signatures

• **signatures**: `string`[]

The signatures.

___

### receipt

• `Optional` **receipt**: [`IReceiptPayload`](IReceiptPayload.md)

Receipt payload.
