[@iota/iota.js](../README.md) / [models/api/IResponse](../modules/models_api_iresponse.md) / IResponse

# Interface: IResponse<T\>

Base response data.

## Type parameters

Name |
------ |
`T` |

## Hierarchy

* **IResponse**

## Index

### Properties

* [data](models_api_iresponse.iresponse.md#data)
* [error](models_api_iresponse.iresponse.md#error)

## Properties

### data

• **data**: T

The data in the response.

___

### error

• **error**: { `code`: *string* ; `message`: *string*  }

Optional error in the response.

#### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`code` | *string* | The code for the error response.   |
`message` | *string* | A more descriptive version of the error.   |
