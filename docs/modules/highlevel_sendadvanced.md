[@iota/iota.js](../README.md) / highLevel/sendAdvanced

# Module: highLevel/sendAdvanced

## Table of contents

### Functions

- [buildTransactionPayload](highlevel_sendadvanced.md#buildtransactionpayload)
- [sendAdvanced](highlevel_sendadvanced.md#sendadvanced)

## Functions

### buildTransactionPayload

▸ **buildTransactionPayload**(`inputsAndSignatureKeyPairs`: {}[], `outputs`: {}[], `indexation?`: {}): [*ITransactionPayload*](../interfaces/models/itransactionpayload.itransactionpayload.md)

Build a transaction payload.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`inputsAndSignatureKeyPairs` | {}[] | The inputs with the signature key pairs needed to sign transfers.   |
`outputs` | {}[] | The outputs to send.   |
`indexation?` | {} | Optional indexation data to associate with the transaction.   |

**Returns:** [*ITransactionPayload*](../interfaces/models/itransactionpayload.itransactionpayload.md)

The transaction payload.

___

### sendAdvanced

▸ **sendAdvanced**(`client`: [*IClient*](../interfaces/models/iclient.iclient.md), `inputsAndSignatureKeyPairs`: {}[], `outputs`: {}[], `indexation?`: {}): *Promise*<{}\>

Send a transfer from the balance on the seed.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models/iclient.iclient.md) | The client to send the transfer with.   |
`inputsAndSignatureKeyPairs` | {}[] | The inputs with the signature key pairs needed to sign transfers.   |
`outputs` | {}[] | The outputs to send.   |
`indexation?` | {} | Optional indexation data to associate with the transaction.   |

**Returns:** *Promise*<{}\>

The id of the message created and the remainder address if one was needed.
