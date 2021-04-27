**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["models/ITransactionEssence"](../modules/_models_itransactionessence_.md) / ITransactionEssence

# Interface: ITransactionEssence

Transaction payload.

## Hierarchy

* [ITypeBase](_models_itypebase_.itypebase.md)<0\>

  ↳ **ITransactionEssence**

## Index

### Properties

* [inputs](_models_itransactionessence_.itransactionessence.md#inputs)
* [outputs](_models_itransactionessence_.itransactionessence.md#outputs)
* [payload](_models_itransactionessence_.itransactionessence.md#payload)
* [type](_models_itransactionessence_.itransactionessence.md#type)

## Properties

### inputs

•  **inputs**: [IUTXOInput](_models_iutxoinput_.iutxoinput.md)[]

The inputs of the transaction.

___

### outputs

•  **outputs**: ([ISigLockedSingleOutput](_models_isiglockedsingleoutput_.isiglockedsingleoutput.md) \| [ISigLockedDustAllowanceOutput](_models_isiglockeddustallowanceoutput_.isiglockeddustallowanceoutput.md))[]

The outputs of the transaction.

___

### payload

• `Optional` **payload**: [IIndexationPayload](_models_iindexationpayload_.iindexationpayload.md)

Indexation payload.

___

### type

•  **type**: 0

*Inherited from [ITypeBase](_models_itypebase_.itypebase.md).[type](_models_itypebase_.itypebase.md#type)*

The type of the object.
