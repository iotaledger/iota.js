**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "highLevel/getUnspentAddress"

# Module: "highLevel/getUnspentAddress"

## Index

### Functions

* [getUnspentAddress](_highlevel_getunspentaddress_.md#getunspentaddress)

## Functions

### getUnspentAddress

▸ **getUnspentAddress**(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `seed`: [ISeed](../interfaces/_models_iseed_.iseed.md), `accountIndex`: number, `addressOptions?`: undefined \| { startIndex?: undefined \| number ; zeroCount?: undefined \| number  }): Promise<{ address: string ; balance: number ; path: string  } \| undefined\>

Get the first unspent address.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | The client or node endpoint to send the transfer with. |
`seed` | [ISeed](../interfaces/_models_iseed_.iseed.md) | The seed to use for address generation. |
`accountIndex` | number | The account index in the wallet. |
`addressOptions?` | undefined \| { startIndex?: undefined \| number ; zeroCount?: undefined \| number  } | Optional address configuration for balance address lookups. |

**Returns:** Promise<{ address: string ; balance: number ; path: string  } \| undefined\>

The first unspent address.
