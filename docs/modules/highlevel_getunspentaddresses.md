[@iota/iota.js](../README.md) / highLevel/getUnspentAddresses

# Module: highLevel/getUnspentAddresses

## Table of contents

### Functions

- [getUnspentAddresses](highlevel_getunspentaddresses.md#getunspentaddresses)
- [getUnspentAddressesWithAddressGenerator](highlevel_getunspentaddresses.md#getunspentaddresseswithaddressgenerator)

## Functions

### getUnspentAddresses

▸ **getUnspentAddresses**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md) \| *string*, `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `accountIndex`: *number*, `addressOptions?`: {}): *Promise*<{}[]\>

Get all the unspent addresses.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [*IClient*](../interfaces/models_iclient.iclient.md) \| *string* | The client or node endpoint to send the transfer with. |
| `seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | The seed to use for address generation. |
| `accountIndex` | *number* | The account index in the wallet. |
| `addressOptions?` | *object* | Optional address configuration for balance address lookups. |

**Returns:** *Promise*<{}[]\>

All the unspent addresses.

___

### getUnspentAddressesWithAddressGenerator

▸ **getUnspentAddressesWithAddressGenerator**<T\>(`client`: [*IClient*](../interfaces/models_iclient.iclient.md) \| *string*, `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `initialAddressState`: T, `nextAddressPath`: (`addressState`: T, `isFirst`: *boolean*) => *string*, `addressOptions?`: {}): *Promise*<{}[]\>

Get all the unspent addresses using an address generator.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [*IClient*](../interfaces/models_iclient.iclient.md) \| *string* | The client or node endpoint to get the addresses from. |
| `seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | The seed to use for address generation. |
| `initialAddressState` | T | The initial address state for calculating the addresses. |
| `nextAddressPath` | (`addressState`: T, `isFirst`: *boolean*) => *string* | Calculate the next address for inputs. |
| `addressOptions?` | *object* | Optional address configuration for balance address lookups. |

**Returns:** *Promise*<{}[]\>

All the unspent addresses.
