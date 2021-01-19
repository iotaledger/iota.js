[@iota/iota.js](../../README.md) / [models/INodeInfo](../../modules/models_inodeinfo.md) / INodeInfo

# Interface: INodeInfo

[models/INodeInfo](../../modules/models_inodeinfo.md).INodeInfo

Response from the /info endpoint.

## Hierarchy

* **INodeInfo**

## Table of contents

### Properties

- [bech32HRP](inodeinfo.inodeinfo.md#bech32hrp)
- [features](inodeinfo.inodeinfo.md#features)
- [isHealthy](inodeinfo.inodeinfo.md#ishealthy)
- [latestMilestoneIndex](inodeinfo.inodeinfo.md#latestmilestoneindex)
- [minPowScore](inodeinfo.inodeinfo.md#minpowscore)
- [name](inodeinfo.inodeinfo.md#name)
- [networkId](inodeinfo.inodeinfo.md#networkid)
- [pruningIndex](inodeinfo.inodeinfo.md#pruningindex)
- [solidMilestoneIndex](inodeinfo.inodeinfo.md#solidmilestoneindex)
- [version](inodeinfo.inodeinfo.md#version)

## Properties

### bech32HRP

• **bech32HRP**: *string*

The human readable part of bech32 addresses.

___

### features

• **features**: *string*[]

Features supported by the node.

___

### isHealthy

• **isHealthy**: *boolean*

Is the node healthy.

___

### latestMilestoneIndex

• **latestMilestoneIndex**: *number*

The latest milestone message index;

___

### minPowScore

• **minPowScore**: *number*

The minimum score required for PoW.

___

### name

• **name**: *string*

The name of the node software.

___

### networkId

• **networkId**: *string*

The network id.

___

### pruningIndex

• **pruningIndex**: *number*

The pruning index;

___

### solidMilestoneIndex

• **solidMilestoneIndex**: *number*

The latest solid milestone message index;

___

### version

• **version**: *string*

The version of the software running on the node.
