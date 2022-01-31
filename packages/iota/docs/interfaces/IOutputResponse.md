# Interface: IOutputResponse

Details of an output.

## Table of contents

### Properties

- [messageId](IOutputResponse.md#messageid)
- [transactionId](IOutputResponse.md#transactionid)
- [outputIndex](IOutputResponse.md#outputindex)
- [isSpent](IOutputResponse.md#isspent)
- [milestoneIndexSpent](IOutputResponse.md#milestoneindexspent)
- [milestoneTimestampSpent](IOutputResponse.md#milestonetimestampspent)
- [milestoneIndexBooked](IOutputResponse.md#milestoneindexbooked)
- [milestoneTimestampBooked](IOutputResponse.md#milestonetimestampbooked)
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

### milestoneIndexSpent

• **milestoneIndexSpent**: `number`

The milestone index at which this output was spent.

___

### milestoneTimestampSpent

• **milestoneTimestampSpent**: `number`

The milestone timestamp this output was spent.

___

### milestoneIndexBooked

• **milestoneIndexBooked**: `number`

The milestone index at which this output was booked into the ledger.

___

### milestoneTimestampBooked

• **milestoneTimestampBooked**: `number`

The milestone timestamp this output was booked in the ledger.

___

### ledgerIndex

• **ledgerIndex**: `number`

The ledger index at which these output was available at.

___

### output

• **output**: [`OutputTypes`](../api.md#outputtypes)

The output.
