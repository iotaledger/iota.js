# Interface: IMilestonePayload

Milestone payload.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``7``\>

  ↳ **`IMilestonePayload`**

## Table of contents

### Properties

- [type](IMilestonePayload.md#type)
- [index](IMilestonePayload.md#index)
- [timestamp](IMilestonePayload.md#timestamp)
- [previousMilestoneId](IMilestonePayload.md#previousmilestoneid)
- [parentBlockIds](IMilestonePayload.md#parentblockids)
- [confirmedMerkleRoot](IMilestonePayload.md#confirmedmerkleroot)
- [appliedMerkleRoot](IMilestonePayload.md#appliedmerkleroot)
- [metadata](IMilestonePayload.md#metadata)
- [options](IMilestonePayload.md#options)
- [signatures](IMilestonePayload.md#signatures)

## Properties

### type

• **type**: ``7``

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

### previousMilestoneId

• **previousMilestoneId**: `string`

The id of the previous milestone.

___

### parentBlockIds

• **parentBlockIds**: `string`[]

The parents where this milestone attaches to.

___

### confirmedMerkleRoot

• **confirmedMerkleRoot**: `string`

The Merkle tree hash of all messages confirmed by this milestone.

___

### appliedMerkleRoot

• **appliedMerkleRoot**: `string`

The Merkle tree hash of all messages applied by this milestone.

___

### metadata

• `Optional` **metadata**: `string`

The metadata.

___

### options

• `Optional` **options**: [`MilestoneOptionTypes`](../api.md#milestoneoptiontypes)[]

The milestone options.

___

### signatures

• **signatures**: [`IEd25519Signature`](IEd25519Signature.md)[]

The signatures.
