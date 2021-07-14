[@iota/iota.js](../README.md) / [models/api/IOutputResponse](../modules/models_api_IOutputResponse.md) / IOutputResponse

# Interface: IOutputResponse

[models/api/IOutputResponse](../modules/models_api_IOutputResponse.md).IOutputResponse

Details of an output.

## Table of contents

### Properties

- [isSpent](models_api_IOutputResponse.IOutputResponse.md#isspent)
- [messageId](models_api_IOutputResponse.IOutputResponse.md#messageid)
- [output](models_api_IOutputResponse.IOutputResponse.md#output)
- [outputIndex](models_api_IOutputResponse.IOutputResponse.md#outputindex)
- [transactionId](models_api_IOutputResponse.IOutputResponse.md#transactionid)

## Properties

### isSpent

• **isSpent**: `boolean`

Is the output spent.

___

### messageId

• **messageId**: `string`

The message id the output was contained in.

___

### output

• **output**: [`ISigLockedSingleOutput`](models_ISigLockedSingleOutput.ISigLockedSingleOutput.md) \| [`ISigLockedDustAllowanceOutput`](models_ISigLockedDustAllowanceOutput.ISigLockedDustAllowanceOutput.md)

The output.

___

### outputIndex

• **outputIndex**: `number`

The index for the output.

___

### transactionId

• **transactionId**: `string`

The transaction id for the output.
