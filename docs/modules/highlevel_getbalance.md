[@iota/iota.js](../README.md) / highLevel/getBalance

# Module: highLevel/getBalance

## Index

### Functions

* [getBalance](highlevel_getbalance.md#getbalance)

## Functions

### getBalance

▸ **getBalance**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `accountIndex`: *number*, `startIndex?`: *number*): *Promise*<*number*\>

Get the balance for a list of addresses.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | - | The client to send the transfer with.   |
`seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | - | The seed.   |
`accountIndex` | *number* | - | The account index in the wallet.   |
`startIndex` | *number* | 0 | The start index to generate from, defaults to 0.   |

**Returns:** *Promise*<*number*\>

The balance.
