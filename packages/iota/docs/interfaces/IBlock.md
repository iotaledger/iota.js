# Interface: IBlock

Block layout.

## Table of contents

### Properties

- [protocolVersion](IBlock.md#protocolversion)
- [parents](IBlock.md#parents)
- [payload](IBlock.md#payload)
- [nonce](IBlock.md#nonce)

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
