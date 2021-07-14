[@iota/iota.js](../README.md) / [models/IMessage](../modules/models_IMessage.md) / IMessage

# Interface: IMessage

[models/IMessage](../modules/models_IMessage.md).IMessage

Message layout.

## Table of contents

### Properties

- [networkId](models_IMessage.IMessage.md#networkid)
- [nonce](models_IMessage.IMessage.md#nonce)
- [parentMessageIds](models_IMessage.IMessage.md#parentmessageids)
- [payload](models_IMessage.IMessage.md#payload)

## Properties

### networkId

• `Optional` **networkId**: `string`

The network id of the message.

___

### nonce

• `Optional` **nonce**: `string`

The nonce for the message.

___

### parentMessageIds

• `Optional` **parentMessageIds**: `string`[]

The parent message ids.

___

### payload

• `Optional` **payload**: [`ITransactionPayload`](models_ITransactionPayload.ITransactionPayload.md) \| [`IMilestonePayload`](models_IMilestonePayload.IMilestonePayload.md) \| [`IIndexationPayload`](models_IIndexationPayload.IIndexationPayload.md)

The payload contents.
