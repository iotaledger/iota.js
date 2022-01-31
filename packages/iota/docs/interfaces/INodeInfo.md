# Interface: INodeInfo

Response from the /info endpoint.

## Table of contents

### Properties

- [name](INodeInfo.md#name)
- [version](INodeInfo.md#version)
- [isHealthy](INodeInfo.md#ishealthy)
- [networkId](INodeInfo.md#networkid)
- [minPoWScore](INodeInfo.md#minpowscore)
- [bech32HRP](INodeInfo.md#bech32hrp)
- [latestMilestoneIndex](INodeInfo.md#latestmilestoneindex)
- [latestMilestoneTimestamp](INodeInfo.md#latestmilestonetimestamp)
- [confirmedMilestoneIndex](INodeInfo.md#confirmedmilestoneindex)
- [pruningIndex](INodeInfo.md#pruningindex)
- [features](INodeInfo.md#features)
- [messagesPerSecond](INodeInfo.md#messagespersecond)
- [referencedMessagesPerSecond](INodeInfo.md#referencedmessagespersecond)
- [referencedRate](INodeInfo.md#referencedrate)
- [plugins](INodeInfo.md#plugins)

## Properties

### name

• **name**: `string`

The name of the node software.

___

### version

• **version**: `string`

The version of the software running on the node.

___

### isHealthy

• **isHealthy**: `boolean`

Is the node healthy.

___

### networkId

• **networkId**: `string`

The network id.

___

### minPoWScore

• **minPoWScore**: `number`

The minimum score required for PoW.

___

### bech32HRP

• **bech32HRP**: `string`

The human readable part of bech32 addresses.

___

### latestMilestoneIndex

• **latestMilestoneIndex**: `number`

The latest milestone index.

___

### latestMilestoneTimestamp

• **latestMilestoneTimestamp**: `number`

The latest milestone timestamp.

___

### confirmedMilestoneIndex

• **confirmedMilestoneIndex**: `number`

The confirmed milestone index.

___

### pruningIndex

• **pruningIndex**: `number`

The pruning index.

___

### features

• **features**: `string`[]

Features supported by the node.

___

### messagesPerSecond

• **messagesPerSecond**: `number`

Messages per second.

___

### referencedMessagesPerSecond

• **referencedMessagesPerSecond**: `number`

Referenced messages per second.

___

### referencedRate

• **referencedRate**: `number`

The rate at which rates are being referenced.

___

### plugins

• **plugins**: `string`[]

The plugins the node exposes.
