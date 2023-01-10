---
description: "Get acquainted with the structure and functionality of the IOTA's Stardust protocol in the
Shimmer network using iota.js primitives to mint new Digital Assets (user-defined native tokens) and issue transactions involving them."
image: /img/client_banner.png
keywords:

- tutorial
- UTXO
- native
- token
- foundry
- digital
- asset
- mint
- melt
- shimmer
- ledger
- outputs
- inputs
---

# Stardust for iota.js: Digital Assets

This tutorial will get you acquainted with the structure and functionality of the
IOTA's [Stardust protocol](https://wiki.iota.org/shimmer/introduction/welcome) in
the [Shimmer network](https://shimmer.network) using [iota.js](https://github.com/iotaledger/iota.js) primitives to
deal with Digital Assets (user-defined native tokens).

## Introduction

Starting from [Chrysalis](https://wiki.iota.org/introduction/welcome), IOTA is
a [UTXO-based (Unspent Transaction Output)](https://wiki.iota.org/introduction/reference/details#unspent-transaction-output-utxo)
Ledger. Each UTXO, also known as **output**, has an associated number of tokens, protocol-defined Tokens (SMR) and, optionally, user-defined native tokens) that determines its value.
Thus, the permanent data on the ledger is composed of a set of records (*Outputs*) that can be unlocked by the owner of
its associated address, i.e., the one who knows the address' private key.

There are different [Output types](https://wiki.iota.org/shimmer/learn/outputs). This tutorial series will focus on
outputs that involve digital assets (user-defined native tokens). Apart from the already covered [Alias Outputs](), in this tutorial we will also focus on [Foundry Outputs](https://github.com/iotaledger/tips/blob/main/tips/TIP-0018/tip-0018.md#foundry-output). A *Foundry Output* is an Output that controls the supply of user-defined, custom tokens, also known as  *native tokens*. Last but not least you will learn how to define UTXOs to transfer such native tokens among addresses. For Non-Fungible Tokens (NFTs) you can check out this [howto](https://wiki.iota.org/shimmer/iotajs/how_tos/mint_nft/).

## Storage Costs and Deposits

You need to take into account that Alias or Foundry Output as any other UTXOs need to be stored by [Hornet Nodes](https://wiki.iota.org/shimmer/hornet/welcome), so there is a [storage cost](https://wiki.iota.org/shimmer/iotajs/tutorials/value-transactions/introduction/#storage-costs-and-deposits).
