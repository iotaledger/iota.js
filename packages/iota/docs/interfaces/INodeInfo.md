# Interface: INodeInfo

Response from the /info endpoint.

## Table of contents

### Properties

- [name](INodeInfo.md#name)
- [version](INodeInfo.md#version)
- [status](INodeInfo.md#status)
- [protocol](INodeInfo.md#protocol)
- [metrics](INodeInfo.md#metrics)
- [features](INodeInfo.md#features)
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

### status

• **status**: [`INodeInfoStatus`](INodeInfoStatus.md)

The status of the node.

___

### protocol

• **protocol**: [`INodeInfoProtocol`](INodeInfoProtocol.md)

The protocol information of the node.

___

### metrics

• **metrics**: [`INodeInfoMetrics`](INodeInfoMetrics.md)

The metrics for the node.

___

### features

• **features**: `string`[]

Features supported by the node.

___

### plugins

• **plugins**: `string`[]

The plugins the node exposes.
