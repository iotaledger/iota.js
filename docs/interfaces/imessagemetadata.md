**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / IMessageMetadata

# Interface: IMessageMetadata

Response from the metadata endpoint.

## Hierarchy

* **IMessageMetadata**

## Index

### Properties

* [isSolid](imessagemetadata.md#issolid)
* [ledgerInclusionState](imessagemetadata.md#ledgerinclusionstate)
* [messageId](imessagemetadata.md#messageid)
* [milestoneIndex](imessagemetadata.md#milestoneindex)
* [parent1MessageId](imessagemetadata.md#parent1messageid)
* [parent2MessageId](imessagemetadata.md#parent2messageid)
* [referencedByMilestoneIndex](imessagemetadata.md#referencedbymilestoneindex)
* [shouldPromote](imessagemetadata.md#shouldpromote)
* [shouldReattach](imessagemetadata.md#shouldreattach)

## Properties

### isSolid

• `Optional` **isSolid**: undefined \| false \| true

Is the message solid.

___

### ledgerInclusionState

• `Optional` **ledgerInclusionState**: [LedgerInclusionState](../README.md#ledgerinclusionstate)

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

### parent1MessageId

•  **parent1MessageId**: string

The message id of parent 1.

___

### parent2MessageId

•  **parent2MessageId**: string

The message id of parent 2.

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
