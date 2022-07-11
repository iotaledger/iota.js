---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: IOutputMetadataResponse

Details of an output.

## Table of contents

### Properties

- [blockId](IOutputMetadataResponse.md#blockid)
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

### blockId

• **blockId**: `string`

The block id the output was contained in.

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
