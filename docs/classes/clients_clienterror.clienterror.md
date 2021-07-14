[@iota/iota.js](../README.md) / [clients/clientError](../modules/clients_clientError.md) / ClientError

# Class: ClientError

[clients/clientError](../modules/clients_clientError.md).ClientError

Class to represent errors from Client.

## Hierarchy

- `Error`

  ↳ **`ClientError`**

## Table of contents

### Constructors

- [constructor](clients_clientError.ClientError.md#constructor)

### Properties

- [code](clients_clientError.ClientError.md#code)
- [httpStatus](clients_clientError.ClientError.md#httpstatus)
- [route](clients_clientError.ClientError.md#route)

### Methods

- [captureStackTrace](clients_clientError.ClientError.md#capturestacktrace)
- [prepareStackTrace](clients_clientError.ClientError.md#preparestacktrace)

## Constructors

### constructor

• **new ClientError**(`message`, `route`, `httpStatus`, `code?`)

Create a new instance of ClientError.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The message for the error. |
| `route` | `string` | The route the request was made to. |
| `httpStatus` | `number` | The http status code. |
| `code?` | `string` | The code in the payload. |

#### Overrides

Error.constructor

## Properties

### code

• `Optional` **code**: `string`

The code return in the payload.

___

### httpStatus

• **httpStatus**: `number`

The HTTP status code returned.

___

### route

• **route**: `string`

The route the request was made to.

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

___

### prepareStackTrace

▸ `Static` `Optional` **prepareStackTrace**(`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

#### Returns

`any`

#### Inherited from

Error.prepareStackTrace
