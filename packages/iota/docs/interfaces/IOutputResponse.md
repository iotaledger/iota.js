# Interface: IOutputResponse

Details of an output.

## Table of contents

### Properties

- [messageId](IOutputResponse.md#messageid)
- [transactionId](IOutputResponse.md#transactionid)
- [outputIndex](IOutputResponse.md#outputindex)
- [isSpent](IOutputResponse.md#isspent)
- [milestoneIndex](IOutputResponse.md#milestoneindex)
- [milestoneTimestamp](IOutputResponse.md#milestonetimestamp)
- [ledgerIndex](IOutputResponse.md#ledgerindex)
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

### milestoneIndex

• **milestoneIndex**: `number`

The milestone index at which this output was booked into the ledger.

___

### milestoneTimestamp

• **milestoneTimestamp**: `number`

The milestone timestamp this output was booked in the ledger.

___

### ledgerIndex

• **ledgerIndex**: `number`

The ledger index at which these output was available at.

___

### output

• **output**: [`OutputTypes`](../api.md#outputtypes)

The output.
