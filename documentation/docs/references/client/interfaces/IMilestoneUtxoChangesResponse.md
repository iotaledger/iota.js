---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
# Interface: IMilestoneUtxoChangesResponse

Milestone.

## Table of contents

### Properties

- [index](IMilestoneUtxoChangesResponse.md#index)
- [createdOutputs](IMilestoneUtxoChangesResponse.md#createdoutputs)
- [consumedOutputs](IMilestoneUtxoChangesResponse.md#consumedoutputs)

## Properties

### index

• **index**: `number`

The milestone index.

___

### createdOutputs

• **createdOutputs**: `string`[]

The output IDs (transaction hash + output index) of the newly created outputs.

___

### consumedOutputs

• **consumedOutputs**: `string`[]

The output IDs (transaction hash + output index) of the consumed (spent) outputs.
