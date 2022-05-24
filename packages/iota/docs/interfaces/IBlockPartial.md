# Interface: IBlockPartial

An interface with partial data for a Block.

## Table of contents

### Properties

- [protocolVersion](IBlockPartial.md#protocolversion)
- [parents](IBlockPartial.md#parents)
- [payload](IBlockPartial.md#payload)
- [nonce](IBlockPartial.md#nonce)

## Properties

### protocolVersion

• `Optional` **protocolVersion**: `number`

The protocol version under which this block operates.

___

### parents

• `Optional` **parents**: `string`[]

The parent block ids.

___

### payload

• `Optional` **payload**: [`ITransactionPayload`](ITransactionPayload.md) \| [`IMilestonePayload`](IMilestonePayload.md) \| [`ITaggedDataPayload`](ITaggedDataPayload.md)

The payload contents.

___

### nonce

• `Optional` **nonce**: `string`

The nonce for the block.
