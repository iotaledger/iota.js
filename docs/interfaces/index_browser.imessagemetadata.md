[@iota/iota.js](../README.md) / [index.browser](../modules/index_browser.md) / IMessageMetadata

# Interface: IMessageMetadata

Response from the metadata endpoint.

## Hierarchy

* **IMessageMetadata**

## Index

### Properties

* [isSolid](index_browser.imessagemetadata.md#issolid)
* [ledgerInclusionState](index_browser.imessagemetadata.md#ledgerinclusionstate)
* [messageId](index_browser.imessagemetadata.md#messageid)
* [milestoneIndex](index_browser.imessagemetadata.md#milestoneindex)
* [parents](index_browser.imessagemetadata.md#parents)
* [referencedByMilestoneIndex](index_browser.imessagemetadata.md#referencedbymilestoneindex)
* [shouldPromote](index_browser.imessagemetadata.md#shouldpromote)
* [shouldReattach](index_browser.imessagemetadata.md#shouldreattach)

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
