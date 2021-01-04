[@iota/iota.js](../README.md) / highLevel/sendAdvanced

# Module: highLevel/sendAdvanced

## Index

### Functions

* [buildTransactionPayload](highlevel_sendadvanced.md#buildtransactionpayload)
* [sendAdvanced](highlevel_sendadvanced.md#sendadvanced)

## Functions

### buildTransactionPayload

▸ **buildTransactionPayload**(`inputsAndSignatureKeyPairs`: {}[], `outputs`: {}[], `indexationKey?`: *string*, `indexationData?`: *Uint8Array*): [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)

Build a transaction payload.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`inputsAndSignatureKeyPairs` | {}[] | The inputs with the signature key pairs needed to sign transfers.   |
`outputs` | {}[] | The outputs to send.   |
`indexationKey?` | *string* | Optional indexation key.   |
`indexationData?` | *Uint8Array* | Optional index data.   |

**Returns:** [*ITransactionPayload*](../interfaces/models_itransactionpayload.itransactionpayload.md)

The transaction payload.

___

### sendAdvanced

▸ **sendAdvanced**(`client`: [*IClient*](../interfaces/models_iclient.iclient.md), `inputsAndSignatureKeyPairs`: {}[], `outputs`: {}[], `indexationKey?`: *string*, `indexationData?`: *Uint8Array*): *Promise*<{}\>

Send a transfer from the balance on the seed.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models_iclient.iclient.md) | The client to send the transfer with.   |
`inputsAndSignatureKeyPairs` | {}[] | The inputs with the signature key pairs needed to sign transfers.   |
`outputs` | {}[] | The outputs to send.   |
`indexationKey?` | *string* | Optional indexation key.   |
`indexationData?` | *Uint8Array* | Optional index data.   |

**Returns:** *Promise*<{}\>

The id of the message created and the remainder address if one was needed.
