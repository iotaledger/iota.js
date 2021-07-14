[@iota/iota.js](../README.md) / [models/INodeInfo](../modules/models_INodeInfo.md) / INodeInfo

# Interface: INodeInfo

[models/INodeInfo](../modules/models_INodeInfo.md).INodeInfo

Response from the /info endpoint.

## Table of contents

### Properties

- [bech32HRP](models_INodeInfo.INodeInfo.md#bech32hrp)
- [confirmedMilestoneIndex](models_INodeInfo.INodeInfo.md#confirmedmilestoneindex)
- [features](models_INodeInfo.INodeInfo.md#features)
- [isHealthy](models_INodeInfo.INodeInfo.md#ishealthy)
- [latestMilestoneIndex](models_INodeInfo.INodeInfo.md#latestmilestoneindex)
- [latestMilestoneTimestamp](models_INodeInfo.INodeInfo.md#latestmilestonetimestamp)
- [messagesPerSecond](models_INodeInfo.INodeInfo.md#messagespersecond)
- [minPoWScore](models_INodeInfo.INodeInfo.md#minpowscore)
- [name](models_INodeInfo.INodeInfo.md#name)
- [networkId](models_INodeInfo.INodeInfo.md#networkid)
- [pruningIndex](models_INodeInfo.INodeInfo.md#pruningindex)
- [referencedMessagesPerSecond](models_INodeInfo.INodeInfo.md#referencedmessagespersecond)
- [referencedRate](models_INodeInfo.INodeInfo.md#referencedrate)
- [version](models_INodeInfo.INodeInfo.md#version)

## Properties

### bech32HRP

• **bech32HRP**: `string`

The human readable part of bech32 addresses.

___

### confirmedMilestoneIndex

• **confirmedMilestoneIndex**: `number`

The confirmed milestone index.

___

### features

• **features**: `string`[]

Features supported by the node.

___

### isHealthy

• **isHealthy**: `boolean`

Is the node healthy.

___

### latestMilestoneIndex

• **latestMilestoneIndex**: `number`

The latest milestone index.

___

### latestMilestoneTimestamp

• **latestMilestoneTimestamp**: `number`

The latest milestone timestamp.

___

### messagesPerSecond

• **messagesPerSecond**: `number`

Messages per second.

___

### minPoWScore

• **minPoWScore**: `number`

The minimum score required for PoW.

___

### name

• **name**: `string`

The name of the node software.

___

### networkId

• **networkId**: `string`

The network id.

___

### pruningIndex

• **pruningIndex**: `number`

The pruning index.

___

### referencedMessagesPerSecond

• **referencedMessagesPerSecond**: `number`

Referenced messages per second.

___

### referencedRate

• **referencedRate**: `number`

The rate at which rates are being referenced.

___

### version

• **version**: `string`

The version of the software running on the node.
