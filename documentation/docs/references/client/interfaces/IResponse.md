---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: IResponse<T\>

Base response data.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [data](IResponse.md#data)
- [error](IResponse.md#error)

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
