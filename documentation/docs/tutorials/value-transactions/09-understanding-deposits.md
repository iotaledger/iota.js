---
description: "Learn how deposit costs work and how you can minimize them. "
image: /img/client_banner.png
keywords:

- tutorial
- deposits
- smr
- origin address
- address
- balance

---
# Understanding Deposits

You can try executing all the steps described in this tutorial again but using a new output ID corresponding to the
value `999.95 SMR` in the origin address. This time, instead of hard-coding the output ID, you can obtain the output
ID through the [indexation plugin](https://wiki.iota.org/shimmer/inx-indexer/welcome). The indexation plugin keeps the
correspondence between addresses and their associated outputs, so it is easy to obtain the balance of an address.

```typescript
const client = new SingleNodeClient(API_ENDPOINT, {powProvider: new NeonPowProvider()});
const indexerPlugin = new IndexerPluginClient(client);
const outputList = await indexerPlugin.basicOutputs({
    addressBech32: sourceAddressBech32
});

console.log(outputList.items[0]);
```

With that code, you can obtain the new output ID and execute all the to [transfer funds](08-transfer-funds.md). As a
result, the address `rms1qp5kej93urfvrc5lhuay7jgupjwuwvxxunzwp59tvqg7nufqntcpxp26uj8` (our origin address) will end up
with a balance of `999.90 SMR`, while the address `rms1qz7f4y6kje2xyykzxljfazqlc67mmy9apmrpgqu3nqsh9uz6qxcf2zqse0d` will
end up with a balance of `0.10 SMR`.

If you check the balance of the second address, the one with  `0.10 SMR`, the storage deposit now is `85200 Glow`
whereas the storage deposit of the origin address is just `42600 Glow`. This happens because the first address has its
funds scattered into multiple outputs, and each output consumes ledger storage, making its deposit higher. This
drawback can be overcome by [sweeping the two outputs](10-sweep-outputs-to-reduce-deposits.md) into one of
value `100,000 Glow,` i.e. `0.10 SMR`.
