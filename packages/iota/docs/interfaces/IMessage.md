# Interface: IMessage

Message layout.

## Table of contents

### Properties

- [protocolVersion](IMessage.md#protocolversion)
- [parentMessageIds](IMessage.md#parentmessageids)
- [payload](IMessage.md#payload)
- [nonce](IMessage.md#nonce)

## Properties

### protocolVersion

• `Optional` **protocolVersion**: `number`

The protocol version under which this message operates.

___

### parentMessageIds

• `Optional` **parentMessageIds**: `string`[]

The parent message ids.

___

### payload

• `Optional` **payload**: [`ITransactionPayload`](ITransactionPayload.md) \| [`IMilestonePayload`](IMilestonePayload.md) \| [`ITaggedDataPayload`](ITaggedDataPayload.md)

The payload contents.

___

### nonce

• `Optional` **nonce**: `string`

The nonce for the message.
