---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: IBlockMetadata

Response from the metadata endpoint.

## Table of contents

### Properties

- [blockId](IBlockMetadata.md#blockid)
- [parents](IBlockMetadata.md#parents)
- [isSolid](IBlockMetadata.md#issolid)
- [referencedByMilestoneIndex](IBlockMetadata.md#referencedbymilestoneindex)
- [milestoneIndex](IBlockMetadata.md#milestoneindex)
- [ledgerInclusionState](IBlockMetadata.md#ledgerinclusionstate)
- [conflictReason](IBlockMetadata.md#conflictreason)
- [shouldPromote](IBlockMetadata.md#shouldpromote)
- [shouldReattach](IBlockMetadata.md#shouldreattach)

## Properties

### blockId

• **blockId**: `string`

The block id.

___

### parents

• **parents**: `string`[]

The parent block ids.

___

### isSolid

• **isSolid**: `boolean`

Is the block solid.

___

### referencedByMilestoneIndex

• `Optional` **referencedByMilestoneIndex**: `number`

Is the block referenced by a milestone.

___

### milestoneIndex

• `Optional` **milestoneIndex**: `number`

Is this block a valid milestone.

___

### ledgerInclusionState

• `Optional` **ledgerInclusionState**: [`LedgerInclusionState`](../api_ref.md#ledgerinclusionstate)

The ledger inclusion state.

___

### conflictReason

• `Optional` **conflictReason**: [`ConflictReason`](../enums/ConflictReason.md)

The conflict reason.

___

### shouldPromote

• `Optional` **shouldPromote**: `boolean`

Should the block be promoted.

___

### shouldReattach

• `Optional` **shouldReattach**: `boolean`

Should the block be reattached.
