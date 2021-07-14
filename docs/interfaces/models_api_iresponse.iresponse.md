[@iota/iota.js](../README.md) / [models/api/IResponse](../modules/models_api_IResponse.md) / IResponse

# Interface: IResponse<T\>

[models/api/IResponse](../modules/models_api_IResponse.md).IResponse

Base response data.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [data](models_api_IResponse.IResponse.md#data)
- [error](models_api_IResponse.IResponse.md#error)

## Properties

### data

• **data**: `T`

The data in the response.

___

### error

• `Optional` **error**: `Object`

Optional error in the response.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | The code for the error response. |
| `message` | `string` | A more descriptive version of the error. |
