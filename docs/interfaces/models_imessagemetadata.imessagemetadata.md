[@iota/iota.js](../README.md) / [models/IMessageMetadata](../modules/models_IMessageMetadata.md) / IMessageMetadata

# Interface: IMessageMetadata

[models/IMessageMetadata](../modules/models_IMessageMetadata.md).IMessageMetadata

Response from the metadata endpoint.

## Table of contents

### Properties

- [conflictReason](models_IMessageMetadata.IMessageMetadata.md#conflictreason)
- [isSolid](models_IMessageMetadata.IMessageMetadata.md#issolid)
- [ledgerInclusionState](models_IMessageMetadata.IMessageMetadata.md#ledgerinclusionstate)
- [messageId](models_IMessageMetadata.IMessageMetadata.md#messageid)
- [milestoneIndex](models_IMessageMetadata.IMessageMetadata.md#milestoneindex)
- [parentMessageIds](models_IMessageMetadata.IMessageMetadata.md#parentmessageids)
- [referencedByMilestoneIndex](models_IMessageMetadata.IMessageMetadata.md#referencedbymilestoneindex)
- [shouldPromote](models_IMessageMetadata.IMessageMetadata.md#shouldpromote)
- [shouldReattach](models_IMessageMetadata.IMessageMetadata.md#shouldreattach)

## Properties

### conflictReason

• `Optional` **conflictReason**: [`ConflictReason`](../enums/models_conflictReason.ConflictReason.md)

The conflict reason.

___

### isSolid

• **isSolid**: `boolean`

Is the message solid.

___

### ledgerInclusionState

• `Optional` **ledgerInclusionState**: [`LedgerInclusionState`](../modules/models_ledgerInclusionState.md#ledgerinclusionstate)

The ledger inclusion state.

___

### messageId

• **messageId**: `string`

The message id.

___

### milestoneIndex

• `Optional` **milestoneIndex**: `number`

Is this message a valid milestone.

___

### parentMessageIds

• `Optional` **parentMessageIds**: `string`[]

The parent message ids.

___

### referencedByMilestoneIndex

• `Optional` **referencedByMilestoneIndex**: `number`

Is the message referenced by a milestone.

___

### shouldPromote

• `Optional` **shouldPromote**: `boolean`

Should the message be promoted.

___

### shouldReattach

• `Optional` **shouldReattach**: `boolean`

Should the message be reattached.
