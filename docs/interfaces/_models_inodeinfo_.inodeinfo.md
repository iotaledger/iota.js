**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["models/INodeInfo"](../modules/_models_inodeinfo_.md) / INodeInfo

# Interface: INodeInfo

Response from the /info endpoint.

## Hierarchy

* **INodeInfo**

## Index

### Properties

* [bech32HRP](_models_inodeinfo_.inodeinfo.md#bech32hrp)
* [confirmedMilestoneIndex](_models_inodeinfo_.inodeinfo.md#confirmedmilestoneindex)
* [features](_models_inodeinfo_.inodeinfo.md#features)
* [isHealthy](_models_inodeinfo_.inodeinfo.md#ishealthy)
* [latestMilestoneIndex](_models_inodeinfo_.inodeinfo.md#latestmilestoneindex)
* [latestMilestoneTimestamp](_models_inodeinfo_.inodeinfo.md#latestmilestonetimestamp)
* [messagesPerSecond](_models_inodeinfo_.inodeinfo.md#messagespersecond)
* [minPoWScore](_models_inodeinfo_.inodeinfo.md#minpowscore)
* [name](_models_inodeinfo_.inodeinfo.md#name)
* [networkId](_models_inodeinfo_.inodeinfo.md#networkid)
* [pruningIndex](_models_inodeinfo_.inodeinfo.md#pruningindex)
* [referencedMessagesPerSecond](_models_inodeinfo_.inodeinfo.md#referencedmessagespersecond)
* [referencedRate](_models_inodeinfo_.inodeinfo.md#referencedrate)
* [version](_models_inodeinfo_.inodeinfo.md#version)

## Properties

### bech32HRP

•  **bech32HRP**: string

The human readable part of bech32 addresses.

___

### confirmedMilestoneIndex

•  **confirmedMilestoneIndex**: number

The confirmed milestone index;

___

### features

•  **features**: string[]

Features supported by the node.

___

### isHealthy

•  **isHealthy**: boolean

Is the node healthy.

___

### latestMilestoneIndex

•  **latestMilestoneIndex**: number

The latest milestone index;

___

### latestMilestoneTimestamp

•  **latestMilestoneTimestamp**: number

The latest milestone timestamp;

___

### messagesPerSecond

•  **messagesPerSecond**: number

Messages per second.

___

### minPoWScore

•  **minPoWScore**: number

The minimum score required for PoW.

___

### name

•  **name**: string

The name of the node software.

___

### networkId

•  **networkId**: string

The network id.

___

### pruningIndex

•  **pruningIndex**: number

The pruning index;

___

### referencedMessagesPerSecond

•  **referencedMessagesPerSecond**: number

Referenced messages per second.

___

### referencedRate

•  **referencedRate**: number

The rate at which rates are being referenced.

___

### version

•  **version**: string

The version of the software running on the node.
