[@iota/iota.js](../README.md) / highLevel/sendAdvanced

# Module: highLevel/sendAdvanced

## Table of contents

### Functions

- [buildTransactionPayload](highLevel_sendAdvanced.md#buildtransactionpayload)
- [sendAdvanced](highLevel_sendAdvanced.md#sendadvanced)

## Functions

### buildTransactionPayload

▸ **buildTransactionPayload**(`inputsAndSignatureKeyPairs`, `outputs`, `indexation?`): [`ITransactionPayload`](../interfaces/models_ITransactionPayload.ITransactionPayload.md)

Build a transaction payload.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputsAndSignatureKeyPairs` | {}[] | The inputs with the signature key pairs needed to sign transfers. |
| `outputs` | {}[] | The outputs to send. |
| `indexation?` | `Object` | Optional indexation data to associate with the transaction. |

#### Returns

[`ITransactionPayload`](../interfaces/models_ITransactionPayload.ITransactionPayload.md)

The transaction payload.

___

### sendAdvanced

▸ **sendAdvanced**(`client`, `inputsAndSignatureKeyPairs`, `outputs`, `indexation?`): `Promise`<`Object`\>

Send a transfer from the balance on the seed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`IClient`](../interfaces/models_IClient.IClient.md) \| `string` | The client or node endpoint to send the transfer with. |
| `inputsAndSignatureKeyPairs` | {}[] | The inputs with the signature key pairs needed to sign transfers. |
| `outputs` | {}[] | The outputs to send. |
| `indexation?` | `Object` | Optional indexation data to associate with the transaction. |

#### Returns

`Promise`<`Object`\>

The id of the message created and the remainder address if one was needed.
