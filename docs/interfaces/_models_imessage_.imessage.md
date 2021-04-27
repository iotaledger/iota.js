**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["models/IMessage"](../modules/_models_imessage_.md) / IMessage

# Interface: IMessage

Message layout.

## Hierarchy

* **IMessage**

## Index

### Properties

* [networkId](_models_imessage_.imessage.md#networkid)
* [nonce](_models_imessage_.imessage.md#nonce)
* [parentMessageIds](_models_imessage_.imessage.md#parentmessageids)
* [payload](_models_imessage_.imessage.md#payload)

## Properties

### networkId

• `Optional` **networkId**: undefined \| string

The network id of the message.

___

### nonce

• `Optional` **nonce**: undefined \| string

The nonce for the message.

___

### parentMessageIds

• `Optional` **parentMessageIds**: string[]

The parent message ids.

___

### payload

• `Optional` **payload**: [ITransactionPayload](_models_itransactionpayload_.itransactionpayload.md) \| [IMilestonePayload](_models_imilestonepayload_.imilestonepayload.md) \| [IIndexationPayload](_models_iindexationpayload_.iindexationpayload.md)

The payload contents.
