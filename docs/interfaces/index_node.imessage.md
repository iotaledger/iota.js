[@iota/iota.js](../README.md) / [index.node](../modules/index_node.md) / IMessage

# Interface: IMessage

Message layout.

## Hierarchy

* **IMessage**

## Index

### Properties

* [networkId](index_node.imessage.md#networkid)
* [nonce](index_node.imessage.md#nonce)
* [parents](index_node.imessage.md#parents)
* [payload](index_node.imessage.md#payload)

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
