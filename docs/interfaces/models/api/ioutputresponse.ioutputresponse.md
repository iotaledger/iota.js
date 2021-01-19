[@iota/iota.js](../../../README.md) / [models/api/IOutputResponse](../../../modules/models_api_ioutputresponse.md) / IOutputResponse

# Interface: IOutputResponse

[models/api/IOutputResponse](../../../modules/models_api_ioutputresponse.md).IOutputResponse

Details of an output.

## Hierarchy

* **IOutputResponse**

## Table of contents

### Properties

- [isSpent](ioutputresponse.ioutputresponse.md#isspent)
- [messageId](ioutputresponse.ioutputresponse.md#messageid)
- [output](ioutputresponse.ioutputresponse.md#output)
- [outputIndex](ioutputresponse.ioutputresponse.md#outputindex)
- [transactionId](ioutputresponse.ioutputresponse.md#transactionid)

## Properties

### isSpent

• **isSpent**: *boolean*

Is the output spent.

___

### messageId

• **messageId**: *string*

The message id the output was contained in.

___

### output

• **output**: [*ISigLockedSingleOutput*](../isiglockedsingleoutput.isiglockedsingleoutput.md) \| [*ISigLockedDustAllowanceOutput*](../isiglockeddustallowanceoutput.isiglockeddustallowanceoutput.md)

The output.

___

### outputIndex

• **outputIndex**: *number*

The index for the output.

___

### transactionId

• **transactionId**: *string*

The transaction id for the output.
