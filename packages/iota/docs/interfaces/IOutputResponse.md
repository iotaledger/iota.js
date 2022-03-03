# Interface: IOutputResponse

Details of an output.

## Hierarchy

- [`IOutputMetadataResponse`](IOutputMetadataResponse.md)

  ↳ **`IOutputResponse`**

## Table of contents

### Properties

- [messageId](IOutputResponse.md#messageid)
- [transactionId](IOutputResponse.md#transactionid)
- [outputIndex](IOutputResponse.md#outputindex)
- [isSpent](IOutputResponse.md#isspent)
- [milestoneIndexSpent](IOutputResponse.md#milestoneindexspent)
- [milestoneTimestampSpent](IOutputResponse.md#milestonetimestampspent)
- [transactionIdSpent](IOutputResponse.md#transactionidspent)
- [milestoneIndexBooked](IOutputResponse.md#milestoneindexbooked)
- [milestoneTimestampBooked](IOutputResponse.md#milestonetimestampbooked)
- [ledgerIndex](IOutputResponse.md#ledgerindex)
- [output](IOutputResponse.md#output)

## Properties

### messageId

• **messageId**: `string`

The message id the output was contained in.

#### Inherited from

[IOutputMetadataResponse](IOutputMetadataResponse.md).[messageId](IOutputMetadataResponse.md#messageid)

___

### transactionId

• **transactionId**: `string`

The transaction id for the output.

#### Inherited from

[IOutputMetadataResponse](IOutputMetadataResponse.md).[transactionId](IOutputMetadataResponse.md#transactionid)

___

### outputIndex

• **outputIndex**: `number`

The index for the output.

#### Inherited from

[IOutputMetadataResponse](IOutputMetadataResponse.md).[outputIndex](IOutputMetadataResponse.md#outputindex)

___

### isSpent

• **isSpent**: `boolean`

Is the output spent.

#### Inherited from

[IOutputMetadataResponse](IOutputMetadataResponse.md).[isSpent](IOutputMetadataResponse.md#isspent)

___

### milestoneIndexSpent

• `Optional` **milestoneIndexSpent**: `number`

The milestone index at which this output was spent.

#### Inherited from

[IOutputMetadataResponse](IOutputMetadataResponse.md).[milestoneIndexSpent](IOutputMetadataResponse.md#milestoneindexspent)

___

### milestoneTimestampSpent

• `Optional` **milestoneTimestampSpent**: `number`

The milestone timestamp this output was spent.

#### Inherited from

[IOutputMetadataResponse](IOutputMetadataResponse.md).[milestoneTimestampSpent](IOutputMetadataResponse.md#milestonetimestampspent)

___

### transactionIdSpent

• `Optional` **transactionIdSpent**: `string`

The transaction this output was spent with.

#### Inherited from

[IOutputMetadataResponse](IOutputMetadataResponse.md).[transactionIdSpent](IOutputMetadataResponse.md#transactionidspent)

___

### milestoneIndexBooked

• **milestoneIndexBooked**: `number`

The milestone index at which this output was booked into the ledger.

#### Inherited from

[IOutputMetadataResponse](IOutputMetadataResponse.md).[milestoneIndexBooked](IOutputMetadataResponse.md#milestoneindexbooked)

___

### milestoneTimestampBooked

• **milestoneTimestampBooked**: `number`

The milestone timestamp this output was booked in the ledger.

#### Inherited from

[IOutputMetadataResponse](IOutputMetadataResponse.md).[milestoneTimestampBooked](IOutputMetadataResponse.md#milestonetimestampbooked)

___

### ledgerIndex

• **ledgerIndex**: `number`

The ledger index at which these output was available at.

#### Inherited from

[IOutputMetadataResponse](IOutputMetadataResponse.md).[ledgerIndex](IOutputMetadataResponse.md#ledgerindex)

___

### output

• **output**: [`OutputTypes`](../api.md#outputtypes)

The output.
