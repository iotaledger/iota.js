**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ClientError

# Class: ClientError

Class to handle http errors.

## Hierarchy

* Error

  ↳ **ClientError**

## Index

### Constructors

* [constructor](clienterror.md#constructor)

### Properties

* [code](clienterror.md#code)
* [httpStatus](clienterror.md#httpstatus)
* [route](clienterror.md#route)

## Constructors

### constructor

\+ **new ClientError**(`message`: string, `route`: string, `httpStatus`: number, `code?`: undefined \| string): [ClientError](clienterror.md)

Create a new instance of ClientError.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | string | The message for the error. |
`route` | string | The route the request was made to. |
`httpStatus` | number | The http status code. |
`code?` | undefined \| string | The code in the payload.  |

**Returns:** [ClientError](clienterror.md)

## Properties

### code

• `Optional` **code**: undefined \| string

The code return in the payload.

___

### httpStatus

•  **httpStatus**: number

The HTTP status code returned.

___

### route

•  **route**: string

The route the request was made to.
