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

• **protocolVersion**: `number`

The protocol version under which this block operates.

___

### parents

• **parents**: `string`[]

The parent block ids.

___

### payload

• `Optional` **payload**: [`IMilestonePayload`](IMilestonePayload.md) \| [`ITaggedDataPayload`](ITaggedDataPayload.md) \| [`ITransactionPayload`](ITransactionPayload.md)

The payload contents.

___

### nonce

• **nonce**: `string`

The nonce for the block.
