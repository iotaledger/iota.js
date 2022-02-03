# Interface: INodeInfoProtocol

Response from the /info endpoint.

## Table of contents

### Properties

- [networkName](INodeInfoProtocol.md#networkname)
- [bech32HRP](INodeInfoProtocol.md#bech32hrp)
- [minPoWScore](INodeInfoProtocol.md#minpowscore)
- [rentStructure](INodeInfoProtocol.md#rentstructure)

## Properties

### networkName

• **networkName**: `string`

The human friendly name of the network on which the node operates on.

___

### bech32HRP

• **bech32HRP**: `string`

The human readable part of bech32 addresses.

___

### minPoWScore

• **minPoWScore**: `number`

The minimum score required for PoW.

___

### rentStructure

• **rentStructure**: [`IRent`](IRent.md)

The rent structure used by given node/network.
