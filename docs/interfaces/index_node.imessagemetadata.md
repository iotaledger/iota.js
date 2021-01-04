[@iota/iota.js](../README.md) / [index.node](../modules/index_node.md) / IMessageMetadata

# Interface: IMessageMetadata

Response from the metadata endpoint.

## Hierarchy

* **IMessageMetadata**

## Index

### Properties

* [isSolid](index_node.imessagemetadata.md#issolid)
* [ledgerInclusionState](index_node.imessagemetadata.md#ledgerinclusionstate)
* [messageId](index_node.imessagemetadata.md#messageid)
* [milestoneIndex](index_node.imessagemetadata.md#milestoneindex)
* [parents](index_node.imessagemetadata.md#parents)
* [referencedByMilestoneIndex](index_node.imessagemetadata.md#referencedbymilestoneindex)
* [shouldPromote](index_node.imessagemetadata.md#shouldpromote)
* [shouldReattach](index_node.imessagemetadata.md#shouldreattach)

## Properties

### isSolid

• `Optional` **isSolid**: *undefined* \| *boolean*

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

### parents

• `Optional` **parents**: *undefined* \| *string*[]

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
