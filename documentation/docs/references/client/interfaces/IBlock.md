---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
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

• `Optional` **payload**: [`ITransactionPayload`](ITransactionPayload.md) \| [`IMilestonePayload`](IMilestonePayload.md) \| [`ITaggedDataPayload`](ITaggedDataPayload.md)

The payload contents.

___

### nonce

• **nonce**: `string`

The nonce for the block.
