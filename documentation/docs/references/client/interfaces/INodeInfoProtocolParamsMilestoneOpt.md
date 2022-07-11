---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: INodeInfoProtocolParamsMilestoneOpt

Defines changing protocol parameters in a milestone.

## Hierarchy

- [`IProtocolParamsMilestoneOption`](IProtocolParamsMilestoneOption.md)

  ↳ **`INodeInfoProtocolParamsMilestoneOpt`**

## Table of contents

### Properties

- [type](INodeInfoProtocolParamsMilestoneOpt.md#type)
- [targetMilestoneIndex](INodeInfoProtocolParamsMilestoneOpt.md#targetmilestoneindex)
- [protocolVersion](INodeInfoProtocolParamsMilestoneOpt.md#protocolversion)
- [params](INodeInfoProtocolParamsMilestoneOpt.md#params)

## Properties

### type

• **type**: ``1``

The type of the object.

#### Inherited from

[IProtocolParamsMilestoneOption](IProtocolParamsMilestoneOption.md).[type](IProtocolParamsMilestoneOption.md#type)

___

### targetMilestoneIndex

• **targetMilestoneIndex**: `number`

The milestone index at which these protocol parameters become active.

#### Inherited from

[IProtocolParamsMilestoneOption](IProtocolParamsMilestoneOption.md).[targetMilestoneIndex](IProtocolParamsMilestoneOption.md#targetmilestoneindex)

___

### protocolVersion

• **protocolVersion**: `number`

The to be applied protocol version.

#### Inherited from

[IProtocolParamsMilestoneOption](IProtocolParamsMilestoneOption.md).[protocolVersion](IProtocolParamsMilestoneOption.md#protocolversion)

___

### params

• **params**: `string`

The protocol parameters in binary form. Hex-encoded with 0x prefix.

#### Inherited from

[IProtocolParamsMilestoneOption](IProtocolParamsMilestoneOption.md).[params](IProtocolParamsMilestoneOption.md#params)
