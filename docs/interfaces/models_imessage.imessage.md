[@iota/iota.js](../README.md) / [models/IMessage](../modules/models_imessage.md) / IMessage

# Interface: IMessage

Message layout.

## Hierarchy

* **IMessage**

## Index

### Properties

* [networkId](models_imessage.imessage.md#networkid)
* [nonce](models_imessage.imessage.md#nonce)
* [parents](models_imessage.imessage.md#parents)
* [payload](models_imessage.imessage.md#payload)

## Properties

### networkId

• `Optional` **networkId**: *undefined* \| *string*

The network id of the message.

___

### nonce

• `Optional` **nonce**: *undefined* \| *string*

The nonce for the message.

___

### parents

• `Optional` **parents**: *undefined* \| *string*[]

The parent message ids.

___

### payload

• `Optional` **payload**: *undefined* \| [*IIndexationPayload*](models_iindexationpayload.iindexationpayload.md) \| [*IMilestonePayload*](models_imilestonepayload.imilestonepayload.md) \| [*ITransactionPayload*](models_itransactionpayload.itransactionpayload.md)

The payload contents.
