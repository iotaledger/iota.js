---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: INodeInfo

Response from the /info endpoint.

## Table of contents

### Properties

- [name](INodeInfo.md#name)
- [version](INodeInfo.md#version)
- [status](INodeInfo.md#status)
- [metrics](INodeInfo.md#metrics)
- [supportedProtocolVersions](INodeInfo.md#supportedprotocolversions)
- [protocol](INodeInfo.md#protocol)
- [pendingProtocolParameters](INodeInfo.md#pendingprotocolparameters)
- [baseToken](INodeInfo.md#basetoken)
- [features](INodeInfo.md#features)

## Properties

### name

• **name**: `string`

The name of the node.

___

### version

• **version**: `string`

The version of node.

___

### status

• **status**: [`INodeInfoStatus`](INodeInfoStatus.md)

The status of the node.

___

### metrics

• **metrics**: [`INodeInfoMetrics`](INodeInfoMetrics.md)

The metrics for the node.

___

### supportedProtocolVersions

• **supportedProtocolVersions**: `number`[]

The supported protocol versions.

___

### protocol

• **protocol**: [`INodeInfoProtocol`](INodeInfoProtocol.md)

The protocol info of the node.

___

### pendingProtocolParameters

• **pendingProtocolParameters**: [`INodeInfoProtocolParamsMilestoneOpt`](INodeInfoProtocolParamsMilestoneOpt.md)[]

Pending protocol parameters.

___

### baseToken

• **baseToken**: [`INodeInfoBaseToken`](INodeInfoBaseToken.md)

The base token info of the node.

___

### features

• **features**: `string`[]

Features supported by the node.
