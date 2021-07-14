[@iota/iota.js](../README.md) / [models/IPeer](../modules/models_IPeer.md) / IPeer

# Interface: IPeer

[models/IPeer](../modules/models_IPeer.md).IPeer

Peer details.

## Table of contents

### Properties

- [alias](models_IPeer.IPeer.md#alias)
- [connected](models_IPeer.IPeer.md#connected)
- [gossip](models_IPeer.IPeer.md#gossip)
- [id](models_IPeer.IPeer.md#id)
- [multiAddresses](models_IPeer.IPeer.md#multiaddresses)
- [relation](models_IPeer.IPeer.md#relation)

## Properties

### alias

• `Optional` **alias**: `string`

The alias of the peer.

___

### connected

• **connected**: `boolean`

Is it connected.

___

### gossip

• `Optional` **gossip**: `Object`

Gossip metrics for the peer.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `heartbeat?` | [`IGossipHeartbeat`](models_IGossipHeartbeat.IGossipHeartbeat.md) | The peer heartbeat. |
| `metrics` | [`IGossipMetrics`](models_IGossipMetrics.IGossipMetrics.md) | The peer metrics. |

___

### id

• **id**: `string`

The id of the peer.

___

### multiAddresses

• **multiAddresses**: `string`[]

The addresses of the peer.

___

### relation

• **relation**: `string`

The relation of the peer.
