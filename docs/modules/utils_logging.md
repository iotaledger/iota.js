[@iota/iota.js](../README.md) / utils/logging

# Module: utils/logging

## Table of contents

### Functions

- [logAddress](utils_logging.md#logaddress)
- [logFunds](utils_logging.md#logfunds)
- [logIndexationPayload](utils_logging.md#logindexationpayload)
- [logInfo](utils_logging.md#loginfo)
- [logInput](utils_logging.md#loginput)
- [logMessage](utils_logging.md#logmessage)
- [logMessageMetadata](utils_logging.md#logmessagemetadata)
- [logMilestonePayload](utils_logging.md#logmilestonepayload)
- [logOutput](utils_logging.md#logoutput)
- [logPayload](utils_logging.md#logpayload)
- [logReceiptPayload](utils_logging.md#logreceiptpayload)
- [logSignature](utils_logging.md#logsignature)
- [logTips](utils_logging.md#logtips)
- [logTransactionPayload](utils_logging.md#logtransactionpayload)
- [logTreasuryTransactionPayload](utils_logging.md#logtreasurytransactionpayload)
- [logUnlockBlock](utils_logging.md#logunlockblock)
- [setLogger](utils_logging.md#setlogger)

## Functions

### logAddress

▸ **logAddress**(`prefix`, `unknownAddress?`): `void`

Log an address to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unknownAddress?` | [`IEd25519Address`](../interfaces/models_IEd25519Address.IEd25519Address.md) | The address to log. |

#### Returns

`void`

___

### logFunds

▸ **logFunds**(`prefix`, `fund?`): `void`

Log fund to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `fund?` | [`IMigratedFunds`](../interfaces/models_IMigratedFunds.IMigratedFunds.md) | The fund to log. |

#### Returns

`void`

___

### logIndexationPayload

▸ **logIndexationPayload**(`prefix`, `payload?`): `void`

Log a indexation payload to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `payload?` | [`IIndexationPayload`](../interfaces/models_IIndexationPayload.IIndexationPayload.md) | The payload. |

#### Returns

`void`

___

### logInfo

▸ **logInfo**(`prefix`, `info`): `void`

Log the node information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `info` | [`INodeInfo`](../interfaces/models_INodeInfo.INodeInfo.md) | The info to log. |

#### Returns

`void`

___

### logInput

▸ **logInput**(`prefix`, `unknownInput?`): `void`

Log input to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unknownInput?` | [`IUTXOInput`](../interfaces/models_IUTXOInput.IUTXOInput.md) \| [`ITreasuryInput`](../interfaces/models_ITreasuryInput.ITreasuryInput.md) | The input to log. |

#### Returns

`void`

___

### logMessage

▸ **logMessage**(`prefix`, `message`): `void`

Log a message to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `message` | [`IMessage`](../interfaces/models_IMessage.IMessage.md) | The message to log. |

#### Returns

`void`

___

### logMessageMetadata

▸ **logMessageMetadata**(`prefix`, `messageMetadata`): `void`

Log the message metadata to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `messageMetadata` | [`IMessageMetadata`](../interfaces/models_IMessageMetadata.IMessageMetadata.md) | The messageMetadata to log. |

#### Returns

`void`

___

### logMilestonePayload

▸ **logMilestonePayload**(`prefix`, `payload?`): `void`

Log a milestone payload to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `payload?` | [`IMilestonePayload`](../interfaces/models_IMilestonePayload.IMilestonePayload.md) | The payload. |

#### Returns

`void`

___

### logOutput

▸ **logOutput**(`prefix`, `unknownOutput?`): `void`

Log output to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unknownOutput?` | [`ISigLockedSingleOutput`](../interfaces/models_ISigLockedSingleOutput.ISigLockedSingleOutput.md) \| [`ISigLockedDustAllowanceOutput`](../interfaces/models_ISigLockedDustAllowanceOutput.ISigLockedDustAllowanceOutput.md) \| [`ITreasuryOutput`](../interfaces/models_ITreasuryOutput.ITreasuryOutput.md) | The output to log. |

#### Returns

`void`

___

### logPayload

▸ **logPayload**(`prefix`, `unknownPayload?`): `void`

Log a message to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unknownPayload?` | [`ITransactionPayload`](../interfaces/models_ITransactionPayload.ITransactionPayload.md) \| [`IMilestonePayload`](../interfaces/models_IMilestonePayload.IMilestonePayload.md) \| [`IIndexationPayload`](../interfaces/models_IIndexationPayload.IIndexationPayload.md) \| [`ITreasuryTransactionPayload`](../interfaces/models_ITreasuryTransactionPayload.ITreasuryTransactionPayload.md) \| [`IReceiptPayload`](../interfaces/models_IReceiptPayload.IReceiptPayload.md) | The payload. |

#### Returns

`void`

___

### logReceiptPayload

▸ **logReceiptPayload**(`prefix`, `payload?`): `void`

Log a receipt payload to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `payload?` | [`IReceiptPayload`](../interfaces/models_IReceiptPayload.IReceiptPayload.md) | The payload. |

#### Returns

`void`

___

### logSignature

▸ **logSignature**(`prefix`, `unknownSignature?`): `void`

Log signature to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unknownSignature?` | [`IEd25519Signature`](../interfaces/models_IEd25519Signature.IEd25519Signature.md) | The signature to log. |

#### Returns

`void`

___

### logTips

▸ **logTips**(`prefix`, `tipsResponse`): `void`

Log the tips information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `tipsResponse` | [`ITipsResponse`](../interfaces/models_api_ITipsResponse.ITipsResponse.md) | The tips to log. |

#### Returns

`void`

___

### logTransactionPayload

▸ **logTransactionPayload**(`prefix`, `payload?`): `void`

Log a transaction payload to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `payload?` | [`ITransactionPayload`](../interfaces/models_ITransactionPayload.ITransactionPayload.md) | The payload. |

#### Returns

`void`

___

### logTreasuryTransactionPayload

▸ **logTreasuryTransactionPayload**(`prefix`, `payload?`): `void`

Log a treasury transaction payload to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `payload?` | [`ITreasuryTransactionPayload`](../interfaces/models_ITreasuryTransactionPayload.ITreasuryTransactionPayload.md) | The payload. |

#### Returns

`void`

___

### logUnlockBlock

▸ **logUnlockBlock**(`prefix`, `unknownUnlockBlock?`): `void`

Log unlock block to the console.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The prefix for the output. |
| `unknownUnlockBlock?` | [`ISignatureUnlockBlock`](../interfaces/models_ISignatureUnlockBlock.ISignatureUnlockBlock.md) \| [`IReferenceUnlockBlock`](../interfaces/models_IReferenceUnlockBlock.IReferenceUnlockBlock.md) | The unlock block to log. |

#### Returns

`void`

___

### setLogger

▸ **setLogger**(`log`): `void`

Set the logger for output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `log` | (`message`: `string`, `data?`: `unknown`) => `void` | The logger. |

#### Returns

`void`
