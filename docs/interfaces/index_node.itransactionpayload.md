[@iota/iota.js](../README.md) / [index.node](../modules/index_node.md) / ITransactionPayload

# Interface: ITransactionPayload

Transaction payload.

## Hierarchy

* [*ITypeBase*](models_itypebase.itypebase.md)<*0*\>

  ↳ **ITransactionPayload**

## Index

### Properties

* [essence](index_node.itransactionpayload.md#essence)
* [type](index_node.itransactionpayload.md#type)
* [unlockBlocks](index_node.itransactionpayload.md#unlockblocks)

## Properties

### essence

• **essence**: [*ITransactionEssence*](models_itransactionessence.itransactionessence.md)

The index name.

___

### type

• **type**: *0*

The type of the object.

Inherited from: [ITypeBase](models_itypebase.itypebase.md).[type](models_itypebase.itypebase.md#type)

___

### unlockBlocks

• **unlockBlocks**: ([*IReferenceUnlockBlock*](models_ireferenceunlockblock.ireferenceunlockblock.md) \| [*ISignatureUnlockBlock*](models_isignatureunlockblock.isignatureunlockblock.md))[]

The unlock blocks.
