[@iota/iota.js](../README.md) / [index.browser](../modules/index_browser.md) / ITransactionEssence

# Interface: ITransactionEssence

Transaction payload.

## Hierarchy

* [*ITypeBase*](models_itypebase.itypebase.md)<*0*\>

  ↳ **ITransactionEssence**

## Index

### Properties

* [inputs](index_browser.itransactionessence.md#inputs)
* [outputs](index_browser.itransactionessence.md#outputs)
* [payload](index_browser.itransactionessence.md#payload)
* [type](index_browser.itransactionessence.md#type)

## Properties

### inputs

• **inputs**: [*IUTXOInput*](models_iutxoinput.iutxoinput.md)[]

The inputs of the transaction.

___

### outputs

• **outputs**: [*ISigLockedSingleOutput*](models_isiglockedsingleoutput.isiglockedsingleoutput.md)[]

The outputs of the transaction.

___

### payload

• `Optional` **payload**: *undefined* \| [*IIndexationPayload*](models_iindexationpayload.iindexationpayload.md)

Indexation payload.

___

### type

• **type**: *0*

The type of the object.

Inherited from: [ITypeBase](models_itypebase.itypebase.md).[type](models_itypebase.itypebase.md#type)
