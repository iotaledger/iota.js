[@iota/iota.js](../README.md) / [models/IMessage](../modules/models_imessage.md) / IMessage

# Interface: IMessage

[models/IMessage](../modules/models_imessage.md).IMessage

Message layout.

## Hierarchy

* **IMessage**

## Table of contents

### Properties

- [networkId](models_imessage.imessage.md#networkid)
- [nonce](models_imessage.imessage.md#nonce)
- [parentMessageIds](models_imessage.imessage.md#parentmessageids)
- [payload](models_imessage.imessage.md#payload)

## Properties

### networkId

• `Optional` **networkId**: *undefined* \| *string*

The network id of the message.

___

### nonce

• `Optional` **nonce**: *undefined* \| *string*

The nonce for the message.

___

### parentMessageIds

• `Optional` **parentMessageIds**: *undefined* \| *string*[]

The parent message ids.

___

### payload

• `Optional` **payload**: *undefined* \| [*ITransactionPayload*](models_itransactionpayload.itransactionpayload.md) \| [*IMilestonePayload*](models_imilestonepayload.imilestonepayload.md) \| [*IIndexationPayload*](models_iindexationpayload.iindexationpayload.md)

The payload contents.
