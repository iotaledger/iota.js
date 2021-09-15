# Class: ClientError

Class to represent errors from Client.

## Hierarchy

- `Error`

  ↳ **`ClientError`**

## Table of contents

### Methods

- [captureStackTrace](ClientError.md#capturestacktrace)
- [prepareStackTrace](ClientError.md#preparestacktrace)

### Constructors

- [constructor](ClientError.md#constructor)

### Properties

- [route](ClientError.md#route)
- [httpStatus](ClientError.md#httpstatus)
- [code](ClientError.md#code)

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

### route

• **route**: `string`

The route the request was made to.

___

### httpStatus

• **httpStatus**: `number`

The HTTP status code returned.

___

### code

• `Optional` **code**: `string`

The code return in the payload.
