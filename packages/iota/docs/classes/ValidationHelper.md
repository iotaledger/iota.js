# Class: ValidationHelper

Class to help with validation.

## Table of contents

### Methods

- [validateDistinct](ValidationHelper.md#validatedistinct)
- [getMinStorageDeposit](ValidationHelper.md#getminstoragedeposit)

## Methods

### validateDistinct

▸ `Static` **validateDistinct**(`elements`, `containerName`, `elementName`): `IValidationResult`

Validates the array is composed of distinct elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elements` | `string`[] \| `number`[] | The elements. |
| `containerName` | `string` | The name of the object containing the elements. |
| `elementName` | `string` | The element in the contaier. |

#### Returns

`IValidationResult`

The validation result.

___

### getMinStorageDeposit

▸ `Static` **getMinStorageDeposit**(`address`, `rentStructure`): `number`

Calculates the minimum required storage deposit of an output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | [`AddressTypes`](../api.md#addresstypes) | The address to calculate min storage deposit. |
| `rentStructure` | [`IRent`](../interfaces/IRent.md) | Rent cost of objects which take node resources. |

#### Returns

`number`

The required storage deposit.
