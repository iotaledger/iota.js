**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / IMessage

# Interface: IMessage

Message layout.

## Hierarchy

* **IMessage**

## Index

### Properties

* [networkId](imessage.md#networkid)
* [nonce](imessage.md#nonce)
* [parent1MessageId](imessage.md#parent1messageid)
* [parent2MessageId](imessage.md#parent2messageid)
* [payload](imessage.md#payload)

## Properties

### networkId

• `Optional` **networkId**: undefined \| string

The network id of the message.

___

### nonce

• `Optional` **nonce**: undefined \| string

The nonce for the message.

___

### parent1MessageId

• `Optional` **parent1MessageId**: undefined \| string

The parent 1 message id.

___

### parent2MessageId

• `Optional` **parent2MessageId**: undefined \| string

The parent 2 message id.

___

### payload

• `Optional` **payload**: [IIndexationPayload](iindexationpayload.md) \| [IMilestonePayload](imilestonepayload.md) \| [ITransactionPayload](itransactionpayload.md)

The payload contents.
