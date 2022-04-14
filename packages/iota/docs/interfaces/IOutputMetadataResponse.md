# Interface: IOutputMetadataResponse

Details of an output.

## Hierarchy

- **`IOutputMetadataResponse`**

  ↳ [`IOutputResponse`](IOutputResponse.md)

## Table of contents

### Properties

- [messageId](IOutputMetadataResponse.md#messageid)
- [transactionId](IOutputMetadataResponse.md#transactionid)
- [outputIndex](IOutputMetadataResponse.md#outputindex)
- [isSpent](IOutputMetadataResponse.md#isspent)
- [milestoneIndexSpent](IOutputMetadataResponse.md#milestoneindexspent)
- [milestoneTimestampSpent](IOutputMetadataResponse.md#milestonetimestampspent)
- [transactionIdSpent](IOutputMetadataResponse.md#transactionidspent)
- [milestoneIndexBooked](IOutputMetadataResponse.md#milestoneindexbooked)
- [milestoneTimestampBooked](IOutputMetadataResponse.md#milestonetimestampbooked)
- [ledgerIndex](IOutputMetadataResponse.md#ledgerindex)

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

• `Optional` **milestoneIndexSpent**: `number`

The milestone index at which this output was spent.

___

### milestoneTimestampSpent

• `Optional` **milestoneTimestampSpent**: `number`

The milestone timestamp this output was spent.

___

### transactionIdSpent

• `Optional` **transactionIdSpent**: `string`

The transaction this output was spent with.

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