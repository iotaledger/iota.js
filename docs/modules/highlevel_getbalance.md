[@iota/iota.js](../README.md) / highLevel/getBalance

# Module: highLevel/getBalance

## Table of contents

### Functions

- [getBalance](highlevel_getbalance.md#getbalance)

## Functions

### getBalance

▸ **getBalance**(`client`: [*IClient*](../interfaces/models/iclient.iclient.md), `seed`: [*ISeed*](../interfaces/models/iseed.iseed.md), `accountIndex`: *number*, `addressOptions?`: {}): *Promise*<*number*\>

Get the balance for a list of addresses.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models/iclient.iclient.md) | The client to send the transfer with.   |
`seed` | [*ISeed*](../interfaces/models/iseed.iseed.md) | The seed.   |
`accountIndex` | *number* | The account index in the wallet.   |
`addressOptions?` | {} | Optional address configuration for balance address lookups.   |

**Returns:** *Promise*<*number*\>

The balance.
