---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: IProtocolParamsMilestoneOption

Protocol Parameters Milestone Option.

## Hierarchy

- [`ITypeBase`](ITypeBase.md)<``1``\>

  ↳ **`IProtocolParamsMilestoneOption`**

  ↳↳ [`INodeInfoProtocolParamsMilestoneOpt`](INodeInfoProtocolParamsMilestoneOpt.md)

## Table of contents

### Properties

- [type](IProtocolParamsMilestoneOption.md#type)
- [targetMilestoneIndex](IProtocolParamsMilestoneOption.md#targetmilestoneindex)
- [protocolVersion](IProtocolParamsMilestoneOption.md#protocolversion)
- [params](IProtocolParamsMilestoneOption.md#params)

## Properties

### type

• **type**: ``1``

The type of the object.

#### Inherited from

[ITypeBase](ITypeBase.md).[type](ITypeBase.md#type)

___

### targetMilestoneIndex

• **targetMilestoneIndex**: `number`

The milestone index at which these protocol parameters become active.

___

### protocolVersion

• **protocolVersion**: `number`

The to be applied protocol version.

___

### params

• **params**: `string`

The protocol parameters in binary form. Hex-encoded with 0x prefix.
