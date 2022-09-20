# Interface: IOutputResponse

Details of an output.

## Table of contents

### Properties

- [messageId](IOutputResponse.md#messageid)
- [transactionId](IOutputResponse.md#transactionid)
- [outputIndex](IOutputResponse.md#outputindex)
- [isSpent](IOutputResponse.md#isspent)
- [output](IOutputResponse.md#output)

## Properties

### messageId

• **messageId**: `string`

The message id the output was contained in.

___

### transactionId

• **transactionId**: `string`

The transaction id for the output.

___

### outputIndex

• **outputIndex**: `number`

The index for the output.

___

### isSpent

• **isSpent**: `boolean`

Is the output spent.

___

### output

• **output**: [`ISigLockedDustAllowanceOutput`](ISigLockedDustAllowanceOutput.md) \| [`ISigLockedSingleOutput`](ISigLockedSingleOutput.md)

The output.
