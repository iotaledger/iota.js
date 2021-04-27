**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["models/IMessageMetadata"](../modules/_models_imessagemetadata_.md) / IMessageMetadata

# Interface: IMessageMetadata

Response from the metadata endpoint.

## Hierarchy

* **IMessageMetadata**

## Index

### Properties

* [conflictReason](_models_imessagemetadata_.imessagemetadata.md#conflictreason)
* [isSolid](_models_imessagemetadata_.imessagemetadata.md#issolid)
* [ledgerInclusionState](_models_imessagemetadata_.imessagemetadata.md#ledgerinclusionstate)
* [messageId](_models_imessagemetadata_.imessagemetadata.md#messageid)
* [milestoneIndex](_models_imessagemetadata_.imessagemetadata.md#milestoneindex)
* [parentMessageIds](_models_imessagemetadata_.imessagemetadata.md#parentmessageids)
* [referencedByMilestoneIndex](_models_imessagemetadata_.imessagemetadata.md#referencedbymilestoneindex)
* [shouldPromote](_models_imessagemetadata_.imessagemetadata.md#shouldpromote)
* [shouldReattach](_models_imessagemetadata_.imessagemetadata.md#shouldreattach)

## Properties

### conflictReason

• `Optional` **conflictReason**: ConflictReason

The conflict reason.

___

### isSolid

•  **isSolid**: boolean

Is the message solid.

___

### ledgerInclusionState

• `Optional` **ledgerInclusionState**: [LedgerInclusionState](../modules/_models_ledgerinclusionstate_.md#ledgerinclusionstate)

The ledger inclusion state.

___

### messageId

•  **messageId**: string

The message id.

___

### milestoneIndex

• `Optional` **milestoneIndex**: undefined \| number

Is this message a valid milestone.

___

### parentMessageIds

• `Optional` **parentMessageIds**: string[]

The parent message ids.

___

### referencedByMilestoneIndex

• `Optional` **referencedByMilestoneIndex**: undefined \| number

Is the message referenced by a milestone.

___

### shouldPromote

• `Optional` **shouldPromote**: undefined \| false \| true

Should the message be promoted.

___

### shouldReattach

• `Optional` **shouldReattach**: undefined \| false \| true

Should the message be reattached.
