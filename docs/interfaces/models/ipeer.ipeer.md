[@iota/iota.js](../../README.md) / [models/IPeer](../../modules/models_ipeer.md) / IPeer

# Interface: IPeer

[models/IPeer](../../modules/models_ipeer.md).IPeer

Peer details.

## Hierarchy

* **IPeer**

## Table of contents

### Properties

- [alias](ipeer.ipeer.md#alias)
- [connected](ipeer.ipeer.md#connected)
- [gossip](ipeer.ipeer.md#gossip)
- [id](ipeer.ipeer.md#id)
- [multiAddresses](ipeer.ipeer.md#multiaddresses)
- [relation](ipeer.ipeer.md#relation)

## Properties

### alias

• `Optional` **alias**: *undefined* \| *string*

The alias of the peer.

___

### connected

• **connected**: *boolean*

Is it connected.

___

### gossip

• `Optional` **gossip**: *undefined* \| { `heartbeat?`: *undefined* \| [*IGossipHeartbeat*](igossipheartbeat.igossipheartbeat.md) ; `metrics`: [*IGossipMetrics*](igossipmetrics.igossipmetrics.md)  }

Gossip metrics for the peer.

___

### id

• **id**: *string*

The id of the peer.

___

### multiAddresses

• **multiAddresses**: *string*[]

The addresses of the peer.

___

### relation

• **relation**: *string*

The relation of the peer.
