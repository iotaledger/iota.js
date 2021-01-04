[@iota/iota.js](../README.md) / highLevel/getUnspentAddresses

# Module: highLevel/getUnspentAddresses

## Index

### Functions

* [getUnspentAddresses](highlevel_getunspentaddresses.md#getunspentaddresses)
* [getUnspentAddressesWithAddressGenerator](highlevel_getunspentaddresses.md#getunspentaddresseswithaddressgenerator)

## Functions

### getUnspentAddresses

▸ **getUnspentAddresses**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `accountIndex`: *number*, `startIndex?`: *number*, `countLimit?`: *number*, `zeroCount?`: *number*): *Promise*<{}[]\>

Get all the unspent addresses.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client to send the transfer with.   |
`seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | The seed to use for address generation.   |
`accountIndex` | *number* | The account index in the wallet.   |
`startIndex?` | *number* | Optional start index for the wallet count address, defaults to 0.   |
`countLimit?` | *number* | Limit the number of items to find.   |
`zeroCount?` | *number* | Abort when the number of zero balances is exceeded.   |

**Returns:** *Promise*<{}[]\>

All the unspent addresses.

___

### getUnspentAddressesWithAddressGenerator

▸ **getUnspentAddressesWithAddressGenerator**<T\>(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `initialAddressState`: T, `nextAddressPath`: (`addressState`: T, `isFirst`: *boolean*) => *string*, `countLimit?`: *number*, `zeroCount?`: *number*): *Promise*<{}[]\>

Get all the unspent addresses using an address generator.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | - | The client to send the transfer with.   |
`seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | - | The seed to use for address generation.   |
`initialAddressState` | T | - | The initial address state for calculating the addresses.   |
`nextAddressPath` | (`addressState`: T, `isFirst`: *boolean*) => *string* | - | Calculate the next address for inputs.   |
`countLimit` | *number* | ... | Limit the number of items to find.   |
`zeroCount` | *number* | 5 | Abort when the number of zero balances is exceeded.   |

**Returns:** *Promise*<{}[]\>

All the unspent addresses.
