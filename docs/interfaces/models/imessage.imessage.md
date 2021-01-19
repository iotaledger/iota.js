[@iota/iota.js](../../README.md) / [models/IMessage](../../modules/models_imessage.md) / IMessage

# Interface: IMessage

[models/IMessage](../../modules/models_imessage.md).IMessage

Message layout.

## Hierarchy

* **IMessage**

## Table of contents

### Properties

- [networkId](imessage.imessage.md#networkid)
- [nonce](imessage.imessage.md#nonce)
- [parent1MessageId](imessage.imessage.md#parent1messageid)
- [parent2MessageId](imessage.imessage.md#parent2messageid)
- [payload](imessage.imessage.md#payload)

## Properties

### networkId

• `Optional` **networkId**: *undefined* \| *string*

The network id of the message.

___

### nonce

• `Optional` **nonce**: *undefined* \| *string*

The nonce for the message.

___

### parent1MessageId

• `Optional` **parent1MessageId**: *undefined* \| *string*

The parent 1 message id.

___

### parent2MessageId

• `Optional` **parent2MessageId**: *undefined* \| *string*

The parent 2 message id.

___

### payload

• `Optional` **payload**: *undefined* \| [*IIndexationPayload*](iindexationpayload.iindexationpayload.md) \| [*IMilestonePayload*](imilestonepayload.imilestonepayload.md) \| [*ITransactionPayload*](itransactionpayload.itransactionpayload.md)

The payload contents.
