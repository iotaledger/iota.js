---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: INodeInfoProtocol

The Protocol Info.

## Table of contents

### Properties

- [networkName](INodeInfoProtocol.md#networkname)
- [bech32Hrp](INodeInfoProtocol.md#bech32hrp)
- [tokenSupply](INodeInfoProtocol.md#tokensupply)
- [protocolVersion](INodeInfoProtocol.md#protocolversion)
- [minPowScore](INodeInfoProtocol.md#minpowscore)
- [rentStructure](INodeInfoProtocol.md#rentstructure)

## Properties

### networkName

• **networkName**: `string`

The human friendly name of the network on which the node operates on.

___

### bech32Hrp

• **bech32Hrp**: `string`

The human readable part of bech32 addresses.

___

### tokenSupply

• **tokenSupply**: `string`

The token supply.

___

### protocolVersion

• **protocolVersion**: `number`

The protocol version.

___

### minPowScore

• **minPowScore**: `number`

The minimum score required for PoW.

___

### rentStructure

• **rentStructure**: [`IRent`](IRent.md)

The rent structure used by given node/network.
