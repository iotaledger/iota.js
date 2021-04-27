**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "utils/logging"

# Module: "utils/logging"

## Index

### Functions

* [logAddress](_utils_logging_.md#logaddress)
* [logFunds](_utils_logging_.md#logfunds)
* [logIndexationPayload](_utils_logging_.md#logindexationpayload)
* [logInfo](_utils_logging_.md#loginfo)
* [logInput](_utils_logging_.md#loginput)
* [logMessage](_utils_logging_.md#logmessage)
* [logMessageMetadata](_utils_logging_.md#logmessagemetadata)
* [logMilestonePayload](_utils_logging_.md#logmilestonepayload)
* [logOutput](_utils_logging_.md#logoutput)
* [logPayload](_utils_logging_.md#logpayload)
* [logReceiptPayload](_utils_logging_.md#logreceiptpayload)
* [logSignature](_utils_logging_.md#logsignature)
* [logTips](_utils_logging_.md#logtips)
* [logTransactionPayload](_utils_logging_.md#logtransactionpayload)
* [logTreasuryTransactionPayload](_utils_logging_.md#logtreasurytransactionpayload)
* [logUnlockBlock](_utils_logging_.md#logunlockblock)
* [logger](_utils_logging_.md#logger)
* [setLogger](_utils_logging_.md#setlogger)

## Functions

### logAddress

▸ **logAddress**(`prefix`: string, `unknownAddress?`: [IEd25519Address](../interfaces/_models_ied25519address_.ied25519address.md)): void

Log an address to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`unknownAddress?` | [IEd25519Address](../interfaces/_models_ied25519address_.ied25519address.md) | The address to log.  |

**Returns:** void

___

### logFunds

▸ **logFunds**(`prefix`: string, `fund?`: [IMigratedFunds](../interfaces/_models_imigratedfunds_.imigratedfunds.md)): void

Log fund to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`fund?` | [IMigratedFunds](../interfaces/_models_imigratedfunds_.imigratedfunds.md) | The fund to log.  |

**Returns:** void

___

### logIndexationPayload

▸ **logIndexationPayload**(`prefix`: string, `payload?`: [IIndexationPayload](../interfaces/_models_iindexationpayload_.iindexationpayload.md)): void

Log a indexation payload to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`payload?` | [IIndexationPayload](../interfaces/_models_iindexationpayload_.iindexationpayload.md) | The payload.  |

**Returns:** void

___

### logInfo

▸ **logInfo**(`prefix`: string, `info`: [INodeInfo](../interfaces/_models_inodeinfo_.inodeinfo.md)): void

Log the node information.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`info` | [INodeInfo](../interfaces/_models_inodeinfo_.inodeinfo.md) | The info to log.  |

**Returns:** void

___

### logInput

▸ **logInput**(`prefix`: string, `unknownInput?`: [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md) \| [ITreasuryInput](../interfaces/_models_itreasuryinput_.itreasuryinput.md)): void

Log input to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`unknownInput?` | [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md) \| [ITreasuryInput](../interfaces/_models_itreasuryinput_.itreasuryinput.md) | The input to log.  |

**Returns:** void

___

### logMessage

▸ **logMessage**(`prefix`: string, `message`: [IMessage](../interfaces/_models_imessage_.imessage.md)): void

Log a message to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`message` | [IMessage](../interfaces/_models_imessage_.imessage.md) | The message to log.  |

**Returns:** void

___

### logMessageMetadata

▸ **logMessageMetadata**(`prefix`: string, `messageMetadata`: [IMessageMetadata](../interfaces/_models_imessagemetadata_.imessagemetadata.md)): void

Log the message metadata to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`messageMetadata` | [IMessageMetadata](../interfaces/_models_imessagemetadata_.imessagemetadata.md) | The messageMetadata to log.  |

**Returns:** void

___

### logMilestonePayload

▸ **logMilestonePayload**(`prefix`: string, `payload?`: [IMilestonePayload](../interfaces/_models_imilestonepayload_.imilestonepayload.md)): void

Log a milestone payload to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`payload?` | [IMilestonePayload](../interfaces/_models_imilestonepayload_.imilestonepayload.md) | The payload.  |

**Returns:** void

___

### logOutput

▸ **logOutput**(`prefix`: string, `unknownOutput?`: [ISigLockedSingleOutput](../interfaces/_models_isiglockedsingleoutput_.isiglockedsingleoutput.md) \| [ISigLockedDustAllowanceOutput](../interfaces/_models_isiglockeddustallowanceoutput_.isiglockeddustallowanceoutput.md) \| [ITreasuryOutput](../interfaces/_models_itreasuryoutput_.itreasuryoutput.md)): void

Log output to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`unknownOutput?` | [ISigLockedSingleOutput](../interfaces/_models_isiglockedsingleoutput_.isiglockedsingleoutput.md) \| [ISigLockedDustAllowanceOutput](../interfaces/_models_isiglockeddustallowanceoutput_.isiglockeddustallowanceoutput.md) \| [ITreasuryOutput](../interfaces/_models_itreasuryoutput_.itreasuryoutput.md) | The output to log.  |

**Returns:** void

___

### logPayload

▸ **logPayload**(`prefix`: string, `unknownPayload?`: [ITransactionPayload](../interfaces/_models_itransactionpayload_.itransactionpayload.md) \| [IMilestonePayload](../interfaces/_models_imilestonepayload_.imilestonepayload.md) \| [IIndexationPayload](../interfaces/_models_iindexationpayload_.iindexationpayload.md) \| [ITreasuryTransactionPayload](../interfaces/_models_itreasurytransactionpayload_.itreasurytransactionpayload.md) \| [IReceiptPayload](../interfaces/_models_ireceiptpayload_.ireceiptpayload.md)): void

Log a message to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`unknownPayload?` | [ITransactionPayload](../interfaces/_models_itransactionpayload_.itransactionpayload.md) \| [IMilestonePayload](../interfaces/_models_imilestonepayload_.imilestonepayload.md) \| [IIndexationPayload](../interfaces/_models_iindexationpayload_.iindexationpayload.md) \| [ITreasuryTransactionPayload](../interfaces/_models_itreasurytransactionpayload_.itreasurytransactionpayload.md) \| [IReceiptPayload](../interfaces/_models_ireceiptpayload_.ireceiptpayload.md) | The payload.  |

**Returns:** void

___

### logReceiptPayload

▸ **logReceiptPayload**(`prefix`: string, `payload?`: [IReceiptPayload](../interfaces/_models_ireceiptpayload_.ireceiptpayload.md)): void

Log a receipt payload to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`payload?` | [IReceiptPayload](../interfaces/_models_ireceiptpayload_.ireceiptpayload.md) | The payload.  |

**Returns:** void

___

### logSignature

▸ **logSignature**(`prefix`: string, `unknownSignature?`: [IEd25519Signature](../interfaces/_models_ied25519signature_.ied25519signature.md)): void

Log signature to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`unknownSignature?` | [IEd25519Signature](../interfaces/_models_ied25519signature_.ied25519signature.md) | The signature to log.  |

**Returns:** void

___

### logTips

▸ **logTips**(`prefix`: string, `tipsResponse`: [ITipsResponse](../interfaces/_models_api_itipsresponse_.itipsresponse.md)): void

Log the tips information.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`tipsResponse` | [ITipsResponse](../interfaces/_models_api_itipsresponse_.itipsresponse.md) | The tips to log.  |

**Returns:** void

___

### logTransactionPayload

▸ **logTransactionPayload**(`prefix`: string, `payload?`: [ITransactionPayload](../interfaces/_models_itransactionpayload_.itransactionpayload.md)): void

Log a transaction payload to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`payload?` | [ITransactionPayload](../interfaces/_models_itransactionpayload_.itransactionpayload.md) | The payload.  |

**Returns:** void

___

### logTreasuryTransactionPayload

▸ **logTreasuryTransactionPayload**(`prefix`: string, `payload?`: [ITreasuryTransactionPayload](../interfaces/_models_itreasurytransactionpayload_.itreasurytransactionpayload.md)): void

Log a treasury transaction payload to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`payload?` | [ITreasuryTransactionPayload](../interfaces/_models_itreasurytransactionpayload_.itreasurytransactionpayload.md) | The payload.  |

**Returns:** void

___

### logUnlockBlock

▸ **logUnlockBlock**(`prefix`: string, `unknownUnlockBlock?`: [ISignatureUnlockBlock](../interfaces/_models_isignatureunlockblock_.isignatureunlockblock.md) \| [IReferenceUnlockBlock](../interfaces/_models_ireferenceunlockblock_.ireferenceunlockblock.md)): void

Log unlock block to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | The prefix for the output. |
`unknownUnlockBlock?` | [ISignatureUnlockBlock](../interfaces/_models_isignatureunlockblock_.isignatureunlockblock.md) \| [IReferenceUnlockBlock](../interfaces/_models_ireferenceunlockblock_.ireferenceunlockblock.md) | The unlock block to log.  |

**Returns:** void

___

### logger

▸ `Let`**logger**(`message`: string, `data`: unknown): void

The logger used by the log methods.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | string | The message to output. |
`data` | unknown | The data to output. |

**Returns:** void

Nothing.

___

### setLogger

▸ **setLogger**(`log`: (message: string, data?: unknown) => void): void

Set the logger for output.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`log` | (message: string, data?: unknown) => void | The logger.  |

**Returns:** void
