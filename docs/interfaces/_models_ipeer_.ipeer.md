**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["models/IPeer"](../modules/_models_ipeer_.md) / IPeer

# Interface: IPeer

Peer details.

## Hierarchy

* **IPeer**

## Index

### Properties

* [alias](_models_ipeer_.ipeer.md#alias)
* [connected](_models_ipeer_.ipeer.md#connected)
* [gossip](_models_ipeer_.ipeer.md#gossip)
* [id](_models_ipeer_.ipeer.md#id)
* [multiAddresses](_models_ipeer_.ipeer.md#multiaddresses)
* [relation](_models_ipeer_.ipeer.md#relation)

## Properties

### alias

• `Optional` **alias**: undefined \| string

The alias of the peer.

___

### connected

•  **connected**: boolean

Is it connected.

___

### gossip

• `Optional` **gossip**: undefined \| { heartbeat?: [IGossipHeartbeat](_models_igossipheartbeat_.igossipheartbeat.md) ; metrics: [IGossipMetrics](_models_igossipmetrics_.igossipmetrics.md)  }

Gossip metrics for the peer.

___

### id

•  **id**: string

The id of the peer.

___

### multiAddresses

•  **multiAddresses**: string[]

The addresses of the peer.

___

### relation

•  **relation**: string

The relation of the peer.
