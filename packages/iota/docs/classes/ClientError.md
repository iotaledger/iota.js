# Class: ClientError

Class to represent errors from Client.

## Hierarchy

- `Error`

  ↳ **`ClientError`**

## Table of contents

### Methods

- [captureStackTrace](ClientError.md#capturestacktrace)

### Properties

- [prepareStackTrace](ClientError.md#preparestacktrace)
- [route](ClientError.md#route)
- [httpStatus](ClientError.md#httpstatus)
- [code](ClientError.md#code)

### Constructors

- [constructor](ClientError.md#constructor)

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

## Properties

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

___

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
