**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["models/IReceiptPayload"](../modules/_models_ireceiptpayload_.md) / IReceiptPayload

# Interface: IReceiptPayload

Receipt payload.

## Hierarchy

* [ITypeBase](_models_itypebase_.itypebase.md)<3\>

  ↳ **IReceiptPayload**

## Index

### Properties

* [final](_models_ireceiptpayload_.ireceiptpayload.md#final)
* [funds](_models_ireceiptpayload_.ireceiptpayload.md#funds)
* [migratedAt](_models_ireceiptpayload_.ireceiptpayload.md#migratedat)
* [transaction](_models_ireceiptpayload_.ireceiptpayload.md#transaction)
* [type](_models_ireceiptpayload_.ireceiptpayload.md#type)

## Properties

### final

•  **final**: boolean

Whether this Receipt is the final one for a given migrated at index.

___

### funds

•  **funds**: [IMigratedFunds](_models_imigratedfunds_.imigratedfunds.md)[]

The index data.

___

### migratedAt

•  **migratedAt**: number

The milestone index at which the funds were migrated in the legacy network.

___

### transaction

•  **transaction**: [ITreasuryTransactionPayload](_models_itreasurytransactionpayload_.itreasurytransactionpayload.md)

The TreasuryTransaction used to fund the funds.

___

### type

•  **type**: 3

*Inherited from [ITypeBase](_models_itypebase_.itypebase.md).[type](_models_itypebase_.itypebase.md#type)*

The type of the object.
