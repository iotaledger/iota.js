[@iota/iota.js](../../README.md) / [models/IMessageMetadata](../../modules/models_imessagemetadata.md) / IMessageMetadata

# Interface: IMessageMetadata

[models/IMessageMetadata](../../modules/models_imessagemetadata.md).IMessageMetadata

Response from the metadata endpoint.

## Hierarchy

* **IMessageMetadata**

## Table of contents

### Properties

- [conflictReason](imessagemetadata.imessagemetadata.md#conflictreason)
- [isSolid](imessagemetadata.imessagemetadata.md#issolid)
- [ledgerInclusionState](imessagemetadata.imessagemetadata.md#ledgerinclusionstate)
- [messageId](imessagemetadata.imessagemetadata.md#messageid)
- [milestoneIndex](imessagemetadata.imessagemetadata.md#milestoneindex)
- [parentMessageIds](imessagemetadata.imessagemetadata.md#parentmessageids)
- [referencedByMilestoneIndex](imessagemetadata.imessagemetadata.md#referencedbymilestoneindex)
- [shouldPromote](imessagemetadata.imessagemetadata.md#shouldpromote)
- [shouldReattach](imessagemetadata.imessagemetadata.md#shouldreattach)

## Properties

### conflictReason

• `Optional` **conflictReason**: *undefined* \| none \| inputUTXOAlreadySpent \| inputUTXOAlreadySpentInThisMilestone \| inputUTXONotFound \| inputOutputSumMismatch \| invalidSignature \| unsupportedInputOrOutputType \| unsupportedAddressType \| invalidDustAllowance \| semanticValidationFailed

The conflict reason.

___

### isSolid

• **isSolid**: *boolean*

Is the message solid.

___

### ledgerInclusionState

• `Optional` **ledgerInclusionState**: *undefined* \| *noTransaction* \| *included* \| *conflicting*

The ledger inclusion state.

___

### messageId

• **messageId**: *string*

The message id.

___

### milestoneIndex

• `Optional` **milestoneIndex**: *undefined* \| *number*

Is this message a valid milestone.

___

### parentMessageIds

• `Optional` **parentMessageIds**: *undefined* \| *string*[]

The parent message ids.

___

### referencedByMilestoneIndex

• `Optional` **referencedByMilestoneIndex**: *undefined* \| *number*

Is the message referenced by a milestone.

___

### shouldPromote

• `Optional` **shouldPromote**: *undefined* \| *boolean*

Should the message be promoted.

___

### shouldReattach

• `Optional` **shouldReattach**: *undefined* \| *boolean*

Should the message be reattached.
