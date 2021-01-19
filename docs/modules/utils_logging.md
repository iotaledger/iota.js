[@iota/iota.js](../README.md) / utils/logging

# Module: utils/logging

## Table of contents

### Functions

- [logAddress](utils_logging.md#logaddress)
- [logInfo](utils_logging.md#loginfo)
- [logInput](utils_logging.md#loginput)
- [logMessage](utils_logging.md#logmessage)
- [logMessageMetadata](utils_logging.md#logmessagemetadata)
- [logOutput](utils_logging.md#logoutput)
- [logPayload](utils_logging.md#logpayload)
- [logSignature](utils_logging.md#logsignature)
- [logTips](utils_logging.md#logtips)
- [logUnlockBlock](utils_logging.md#logunlockblock)
- [setLogger](utils_logging.md#setlogger)

## Functions

### logAddress

▸ **logAddress**(`prefix`: *string*, `unknownAddress?`: [*ITypeBase*](../interfaces/models/itypebase.itypebase.md)<*unknown*\>): *void*

Log an address to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`unknownAddress?` | [*ITypeBase*](../interfaces/models/itypebase.itypebase.md)<*unknown*\> | The address to log.    |

**Returns:** *void*

___

### logInfo

▸ **logInfo**(`prefix`: *string*, `info`: [*INodeInfo*](../interfaces/models/inodeinfo.inodeinfo.md)): *void*

Log the node information.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`info` | [*INodeInfo*](../interfaces/models/inodeinfo.inodeinfo.md) | The info to log.    |

**Returns:** *void*

___

### logInput

▸ **logInput**(`prefix`: *string*, `unknownInput?`: [*ITypeBase*](../interfaces/models/itypebase.itypebase.md)<*unknown*\>): *void*

Log input to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`unknownInput?` | [*ITypeBase*](../interfaces/models/itypebase.itypebase.md)<*unknown*\> | The input to log.    |

**Returns:** *void*

___

### logMessage

▸ **logMessage**(`prefix`: *string*, `message`: [*IMessage*](../interfaces/models/imessage.imessage.md)): *void*

Log a message to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`message` | [*IMessage*](../interfaces/models/imessage.imessage.md) | The message to log.    |

**Returns:** *void*

___

### logMessageMetadata

▸ **logMessageMetadata**(`prefix`: *string*, `messageMetadata`: [*IMessageMetadata*](../interfaces/models/imessagemetadata.imessagemetadata.md)): *void*

Log the message metadata to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`messageMetadata` | [*IMessageMetadata*](../interfaces/models/imessagemetadata.imessagemetadata.md) | The messageMetadata to log.    |

**Returns:** *void*

___

### logOutput

▸ **logOutput**(`prefix`: *string*, `unknownOutput?`: [*ITypeBase*](../interfaces/models/itypebase.itypebase.md)<*unknown*\>): *void*

Log output to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`unknownOutput?` | [*ITypeBase*](../interfaces/models/itypebase.itypebase.md)<*unknown*\> | The output to log.    |

**Returns:** *void*

___

### logPayload

▸ **logPayload**(`prefix`: *string*, `unknownPayload?`: [*ITypeBase*](../interfaces/models/itypebase.itypebase.md)<*unknown*\>): *void*

Log a message to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`unknownPayload?` | [*ITypeBase*](../interfaces/models/itypebase.itypebase.md)<*unknown*\> | The payload.    |

**Returns:** *void*

___

### logSignature

▸ **logSignature**(`prefix`: *string*, `unknownSignature?`: [*ITypeBase*](../interfaces/models/itypebase.itypebase.md)<*unknown*\>): *void*

Log signature to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`unknownSignature?` | [*ITypeBase*](../interfaces/models/itypebase.itypebase.md)<*unknown*\> | The signature to log.    |

**Returns:** *void*

___

### logTips

▸ **logTips**(`prefix`: *string*, `tipsResponse`: [*ITipsResponse*](../interfaces/models/api/itipsresponse.itipsresponse.md)): *void*

Log the tips information.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`tipsResponse` | [*ITipsResponse*](../interfaces/models/api/itipsresponse.itipsresponse.md) | The tips to log.    |

**Returns:** *void*

___

### logUnlockBlock

▸ **logUnlockBlock**(`prefix`: *string*, `unknownUnlockBlock?`: [*ITypeBase*](../interfaces/models/itypebase.itypebase.md)<*unknown*\>): *void*

Log unlock block to the console.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`prefix` | *string* | The prefix for the output.   |
`unknownUnlockBlock?` | [*ITypeBase*](../interfaces/models/itypebase.itypebase.md)<*unknown*\> | The unlock block to log.    |

**Returns:** *void*

___

### setLogger

▸ **setLogger**(`log`: (`message`: *string*, `data?`: *unknown*) => *void*): *void*

Set the logger for output.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`log` | (`message`: *string*, `data?`: *unknown*) => *void* | The logger.    |

**Returns:** *void*
