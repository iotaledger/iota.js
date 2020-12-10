**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / IResponse

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

* [data](iresponse.md#data)
* [error](iresponse.md#error)

## Properties

### data

•  **data**: T

The data in the response.

___

### error

•  **error**: { code: string ; message: string  }

Optional error in the response.

#### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`code` | string | The code for the error response. |
`message` | string | A more descriptive version of the error. |
