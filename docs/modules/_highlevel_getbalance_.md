**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "highLevel/getBalance"

# Module: "highLevel/getBalance"

## Index

### Functions

* [getBalance](_highlevel_getbalance_.md#getbalance)

## Functions

### getBalance

▸ **getBalance**(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `seed`: [ISeed](../interfaces/_models_iseed_.iseed.md), `accountIndex`: number, `addressOptions?`: undefined \| { startIndex?: undefined \| number ; zeroCount?: undefined \| number  }): Promise<number\>

Get the balance for a list of addresses.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | The client or node endpoint to send the transfer with. |
`seed` | [ISeed](../interfaces/_models_iseed_.iseed.md) | The seed. |
`accountIndex` | number | The account index in the wallet. |
`addressOptions?` | undefined \| { startIndex?: undefined \| number ; zeroCount?: undefined \| number  } | Optional address configuration for balance address lookups. |

**Returns:** Promise<number\>

The balance.
