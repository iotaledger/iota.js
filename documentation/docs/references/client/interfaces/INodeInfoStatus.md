---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: INodeInfoStatus

Response from the /info endpoint.

## Table of contents

### Properties

- [isHealthy](INodeInfoStatus.md#ishealthy)
- [latestMilestone](INodeInfoStatus.md#latestmilestone)
- [confirmedMilestone](INodeInfoStatus.md#confirmedmilestone)
- [pruningIndex](INodeInfoStatus.md#pruningindex)

## Properties

### isHealthy

• **isHealthy**: `boolean`

Is the node healthy.

___

### latestMilestone

• **latestMilestone**: [`INodeInfoMilestone`](INodeInfoMilestone.md)

The latest milestone info.

___

### confirmedMilestone

• **confirmedMilestone**: [`INodeInfoMilestone`](INodeInfoMilestone.md)

The confirmed milestone info.

___

### pruningIndex

• **pruningIndex**: `number`

The pruning index.
