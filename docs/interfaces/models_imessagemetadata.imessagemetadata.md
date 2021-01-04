[@iota/iota.js](../README.md) / [models/IMessageMetadata](../modules/models_imessagemetadata.md) / IMessageMetadata

# Interface: IMessageMetadata

Response from the metadata endpoint.

## Hierarchy

* **IMessageMetadata**

## Index

### Properties

* [isSolid](models_imessagemetadata.imessagemetadata.md#issolid)
* [ledgerInclusionState](models_imessagemetadata.imessagemetadata.md#ledgerinclusionstate)
* [messageId](models_imessagemetadata.imessagemetadata.md#messageid)
* [milestoneIndex](models_imessagemetadata.imessagemetadata.md#milestoneindex)
* [parents](models_imessagemetadata.imessagemetadata.md#parents)
* [referencedByMilestoneIndex](models_imessagemetadata.imessagemetadata.md#referencedbymilestoneindex)
* [shouldPromote](models_imessagemetadata.imessagemetadata.md#shouldpromote)
* [shouldReattach](models_imessagemetadata.imessagemetadata.md#shouldreattach)

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
