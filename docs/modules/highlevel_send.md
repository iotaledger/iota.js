[@iota/iota.js](../README.md) / highLevel/send

# Module: highLevel/send

## Table of contents

### Functions

- [calculateInputs](highlevel_send.md#calculateinputs)
- [send](highlevel_send.md#send)
- [sendEd25519](highlevel_send.md#sended25519)
- [sendMultiple](highlevel_send.md#sendmultiple)
- [sendMultipleEd25519](highlevel_send.md#sendmultipleed25519)
- [sendWithAddressGenerator](highlevel_send.md#sendwithaddressgenerator)

## Functions

### calculateInputs

▸ **calculateInputs**<T\>(`client`: [*IClient*](../interfaces/models_iclient.iclient.md) \| *string*, `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `initialAddressState`: T, `nextAddressPath`: (`addressState`: T, `isFirst`: *boolean*) => *string*, `outputs`: {}[], `zeroCount?`: *number*): *Promise*<{}[]\>

Calculate the inputs from the seed and basePath.

#### Type parameters:

| Name |
| :------ |
| `T` |

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `client` | [*IClient*](../interfaces/models_iclient.iclient.md) \| *string* | - | The client or node endpoint to calculate the inputs with. |
| `seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | - | The seed to use for address generation. |
| `initialAddressState` | T | - | The initial address state for calculating the addresses. |
| `nextAddressPath` | (`addressState`: T, `isFirst`: *boolean*) => *string* | - | Calculate the next address for inputs. |
| `outputs` | {}[] | - | The outputs to send. |
| `zeroCount` | *number* | 5 | Abort when the number of zero balances is exceeded. |

**Returns:** *Promise*<{}[]\>

The id of the message created and the contructed message.

___

### send

▸ **send**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md) \| *string*, `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `accountIndex`: *number*, `addressBech32`: *string*, `amount`: *number*, `indexation?`: {}, `addressOptions?`: {}): *Promise*<{}\>

Send a transfer from the balance on the seed to a single output.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [*IClient*](../interfaces/models_iclient.iclient.md) \| *string* | The client or node endpoint to send the transfer with. |
| `seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | The seed to use for address generation. |
| `accountIndex` | *number* | The account index in the wallet. |
| `addressBech32` | *string* | The address to send the funds to in bech32 format. |
| `amount` | *number* | The amount to send. |
| `indexation?` | *object* | Optional indexation data to associate with the transaction. |
| `addressOptions?` | *object* | Optional address configuration for balance address lookups. |

**Returns:** *Promise*<{}\>

The id of the message created and the contructed message.

___

### sendEd25519

▸ **sendEd25519**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md) \| *string*, `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `accountIndex`: *number*, `addressEd25519`: *string*, `amount`: *number*, `indexation?`: {}, `addressOptions?`: {}): *Promise*<{}\>

Send a transfer from the balance on the seed to a single output.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [*IClient*](../interfaces/models_iclient.iclient.md) \| *string* | The client or node endpoint to send the transfer with. |
| `seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | The seed to use for address generation. |
| `accountIndex` | *number* | The account index in the wallet. |
| `addressEd25519` | *string* | The address to send the funds to in ed25519 format. |
| `amount` | *number* | The amount to send. |
| `indexation?` | *object* | Optional indexation data to associate with the transaction. |
| `addressOptions?` | *object* | Optional address configuration for balance address lookups. |

**Returns:** *Promise*<{}\>

The id of the message created and the contructed message.

___

### sendMultiple

▸ **sendMultiple**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md) \| *string*, `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `accountIndex`: *number*, `outputs`: {}[], `indexation?`: {}, `addressOptions?`: {}): *Promise*<{}\>

Send a transfer from the balance on the seed to multiple outputs.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [*IClient*](../interfaces/models_iclient.iclient.md) \| *string* | The client or node endpoint to send the transfer with. |
| `seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | The seed to use for address generation. |
| `accountIndex` | *number* | The account index in the wallet. |
| `outputs` | {}[] | The address to send the funds to in bech32 format and amounts. |
| `indexation?` | *object* | Optional indexation data to associate with the transaction. |
| `addressOptions?` | *object* | Optional address configuration for balance address lookups. |

**Returns:** *Promise*<{}\>

The id of the message created and the contructed message.

___

### sendMultipleEd25519

▸ **sendMultipleEd25519**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md) \| *string*, `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `accountIndex`: *number*, `outputs`: {}[], `indexation?`: {}, `addressOptions?`: {}): *Promise*<{}\>

Send a transfer from the balance on the seed.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [*IClient*](../interfaces/models_iclient.iclient.md) \| *string* | The client or node endpoint to send the transfer with. |
| `seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | The seed to use for address generation. |
| `accountIndex` | *number* | The account index in the wallet. |
| `outputs` | {}[] | The outputs including address to send the funds to in ed25519 format and amount. |
| `indexation?` | *object* | Optional indexation data to associate with the transaction. |
| `addressOptions?` | *object* | Optional address configuration for balance address lookups. |

**Returns:** *Promise*<{}\>

The id of the message created and the contructed message.

___

### sendWithAddressGenerator

▸ **sendWithAddressGenerator**<T\>(`client`: [*IClient*](../interfaces/models_iclient.iclient.md) \| *string*, `seed`: [*ISeed*](../interfaces/models_iseed.iseed.md), `initialAddressState`: T, `nextAddressPath`: (`addressState`: T, `isFirst`: *boolean*) => *string*, `outputs`: {}[], `indexation?`: {}, `zeroCount?`: *number*): *Promise*<{}\>

Send a transfer using account based indexing for the inputs.

#### Type parameters:

| Name |
| :------ |
| `T` |

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [*IClient*](../interfaces/models_iclient.iclient.md) \| *string* | The client or node endpoint to send the transfer with. |
| `seed` | [*ISeed*](../interfaces/models_iseed.iseed.md) | The seed to use for address generation. |
| `initialAddressState` | T | The initial address state for calculating the addresses. |
| `nextAddressPath` | (`addressState`: T, `isFirst`: *boolean*) => *string* | Calculate the next address for inputs. |
| `outputs` | {}[] | The address to send the funds to in bech32 format and amounts. |
| `indexation?` | *object* | Optional indexation data to associate with the transaction. |
| `zeroCount?` | *number* | The number of addresses with 0 balance during lookup before aborting. |

**Returns:** *Promise*<{}\>

The id of the message created and the contructed message.
