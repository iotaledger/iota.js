# Interface: IMessage

Message layout.

## Table of contents

### Properties

- [networkId](IMessage.md#networkid)
- [parentMessageIds](IMessage.md#parentmessageids)
- [payload](IMessage.md#payload)
- [nonce](IMessage.md#nonce)

## Properties

### networkId

• `Optional` **networkId**: `string`

The network id of the message.

___

### parentMessageIds

• `Optional` **parentMessageIds**: `string`[]

The parent message ids.

___

### payload

• `Optional` **payload**: [`ITransactionPayload`](ITransactionPayload.md) \| [`IMilestonePayload`](IMilestonePayload.md) \| [`IIndexationPayload`](IIndexationPayload.md)

The payload contents.

___

### nonce

• `Optional` **nonce**: `string`

The nonce for the message.
