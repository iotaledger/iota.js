# Interface: INodeInfoProtocol

The Protocol Info.

## Table of contents

### Properties

- [networkName](INodeInfoProtocol.md#networkname)
- [bech32Hrp](INodeInfoProtocol.md#bech32hrp)
- [tokenSupply](INodeInfoProtocol.md#tokensupply)
- [version](INodeInfoProtocol.md#version)
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

### version

• **version**: `number`

The protocol version.

___

### minPowScore

• **minPowScore**: `number`

The minimum score required for PoW.

___

### rentStructure

• **rentStructure**: [`IRent`](IRent.md)

The rent structure used by given node/network.
