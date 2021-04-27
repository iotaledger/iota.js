**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "highLevel/getUnspentAddresses"

# Module: "highLevel/getUnspentAddresses"

## Index

### Functions

* [getUnspentAddresses](_highlevel_getunspentaddresses_.md#getunspentaddresses)
* [getUnspentAddressesWithAddressGenerator](_highlevel_getunspentaddresses_.md#getunspentaddresseswithaddressgenerator)

## Functions

### getUnspentAddresses

▸ **getUnspentAddresses**(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `seed`: [ISeed](../interfaces/_models_iseed_.iseed.md), `accountIndex`: number, `addressOptions?`: undefined \| { requiredCount?: undefined \| number ; startIndex?: undefined \| number ; zeroCount?: undefined \| number  }): Promise<{ address: string ; balance: number ; path: string  }[]\>

Get all the unspent addresses.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | The client or node endpoint to send the transfer with. |
`seed` | [ISeed](../interfaces/_models_iseed_.iseed.md) | The seed to use for address generation. |
`accountIndex` | number | The account index in the wallet. |
`addressOptions?` | undefined \| { requiredCount?: undefined \| number ; startIndex?: undefined \| number ; zeroCount?: undefined \| number  } | Optional address configuration for balance address lookups. |

**Returns:** Promise<{ address: string ; balance: number ; path: string  }[]\>

All the unspent addresses.

___

### getUnspentAddressesWithAddressGenerator

▸ **getUnspentAddressesWithAddressGenerator**<T\>(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `seed`: [ISeed](../interfaces/_models_iseed_.iseed.md), `initialAddressState`: T, `nextAddressPath`: (addressState: T, isFirst: boolean) => string, `addressOptions?`: undefined \| { requiredCount?: undefined \| number ; startIndex?: undefined \| number ; zeroCount?: undefined \| number  }): Promise<{ address: string ; balance: number ; path: string  }[]\>

Get all the unspent addresses using an address generator.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | The client or node endpoint to get the addresses from. |
`seed` | [ISeed](../interfaces/_models_iseed_.iseed.md) | The seed to use for address generation. |
`initialAddressState` | T | The initial address state for calculating the addresses. |
`nextAddressPath` | (addressState: T, isFirst: boolean) => string | Calculate the next address for inputs. |
`addressOptions?` | undefined \| { requiredCount?: undefined \| number ; startIndex?: undefined \| number ; zeroCount?: undefined \| number  } | Optional address configuration for balance address lookups. |

**Returns:** Promise<{ address: string ; balance: number ; path: string  }[]\>

All the unspent addresses.
