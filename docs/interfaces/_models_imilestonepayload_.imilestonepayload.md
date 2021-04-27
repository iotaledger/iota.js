**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / ["models/IMilestonePayload"](../modules/_models_imilestonepayload_.md) / IMilestonePayload

# Interface: IMilestonePayload

Milestone payload.

## Hierarchy

* [ITypeBase](_models_itypebase_.itypebase.md)<1\>

  ↳ **IMilestonePayload**

## Index

### Properties

* [inclusionMerkleProof](_models_imilestonepayload_.imilestonepayload.md#inclusionmerkleproof)
* [index](_models_imilestonepayload_.imilestonepayload.md#index)
* [nextPoWScore](_models_imilestonepayload_.imilestonepayload.md#nextpowscore)
* [nextPoWScoreMilestoneIndex](_models_imilestonepayload_.imilestonepayload.md#nextpowscoremilestoneindex)
* [parentMessageIds](_models_imilestonepayload_.imilestonepayload.md#parentmessageids)
* [publicKeys](_models_imilestonepayload_.imilestonepayload.md#publickeys)
* [receipt](_models_imilestonepayload_.imilestonepayload.md#receipt)
* [signatures](_models_imilestonepayload_.imilestonepayload.md#signatures)
* [timestamp](_models_imilestonepayload_.imilestonepayload.md#timestamp)
* [type](_models_imilestonepayload_.imilestonepayload.md#type)

## Properties

### inclusionMerkleProof

•  **inclusionMerkleProof**: string

The merkle proof inclusions.

___

### index

•  **index**: number

The index name.

___

### nextPoWScore

•  **nextPoWScore**: number

The next PoW score.

___

### nextPoWScoreMilestoneIndex

•  **nextPoWScoreMilestoneIndex**: number

The milestone at which the next PoW score becomes active.

___

### parentMessageIds

•  **parentMessageIds**: string[]

The parents where this milestone attaches to.

___

### publicKeys

•  **publicKeys**: string[]

The public keys.

___

### receipt

• `Optional` **receipt**: [IReceiptPayload](_models_ireceiptpayload_.ireceiptpayload.md)

Receipt payload.

___

### signatures

•  **signatures**: string[]

The signatures.

___

### timestamp

•  **timestamp**: number

The timestamp of the milestone.

___

### type

•  **type**: 1

*Inherited from [ITypeBase](_models_itypebase_.itypebase.md).[type](_models_itypebase_.itypebase.md#type)*

The type of the object.
