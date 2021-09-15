# Interface: IMessageMetadata

Response from the metadata endpoint.

## Table of contents

### Properties

- [messageId](IMessageMetadata.md#messageid)
- [parentMessageIds](IMessageMetadata.md#parentmessageids)
- [isSolid](IMessageMetadata.md#issolid)
- [referencedByMilestoneIndex](IMessageMetadata.md#referencedbymilestoneindex)
- [milestoneIndex](IMessageMetadata.md#milestoneindex)
- [ledgerInclusionState](IMessageMetadata.md#ledgerinclusionstate)
- [conflictReason](IMessageMetadata.md#conflictreason)
- [shouldPromote](IMessageMetadata.md#shouldpromote)
- [shouldReattach](IMessageMetadata.md#shouldreattach)

## Properties

### messageId

• **messageId**: `string`

The message id.

___

### parentMessageIds

• `Optional` **parentMessageIds**: `string`[]

The parent message ids.

___

### isSolid

• **isSolid**: `boolean`

Is the message solid.

___

### referencedByMilestoneIndex

• `Optional` **referencedByMilestoneIndex**: `number`

Is the message referenced by a milestone.

___

### milestoneIndex

• `Optional` **milestoneIndex**: `number`

Is this message a valid milestone.

___

### ledgerInclusionState

• `Optional` **ledgerInclusionState**: [`LedgerInclusionState`](../api.md#ledgerinclusionstate)

The ledger inclusion state.

___

### conflictReason

• `Optional` **conflictReason**: [`ConflictReason`](../enums/ConflictReason.md)

The conflict reason.

___

### shouldPromote

• `Optional` **shouldPromote**: `boolean`

Should the message be promoted.

___

### shouldReattach

• `Optional` **shouldReattach**: `boolean`

Should the message be reattached.
