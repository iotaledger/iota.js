# Generate Addresses

## Deterministic Address Paths (BIP32)

You can use the [Ed25519 master seed](./03-generate-a-seed.md#generate-an-ed25519-master-seed) to generate addresses in
a deterministic manner.
These addresses will be Ed25519 key pairs generated through
the [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
method and structured as per the [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) logical
hierarchy.

The `iota.js` library provides a method [`generateBip44Address`](../../references/client/api_ref#generatebip44address)
that creates these BIP32 paths using a state object that it is updated on each call, as shown in the following snippet:

```typescript
const NUM_ADDR = 6;
const addressGeneratorAccountState = {
    accountIndex: 0,
    addressIndex: 0,
    isInternal: false
};
const paths: string[] = [];
for (let i = 0; i < NUM_ADDR; i++) {
    const path = generateBip44Address(addressGeneratorAccountState);
    paths.put(path);

    console.log(`${path}`);
}
```

The script above will generate the following BIP32 paths:

```text
m/44'/4218'/0'/0'/0'
m/44'/4218'/0'/1'/0'
m/44'/4218'/0'/0'/1'
m/44'/4218'/0'/1'/1'
m/44'/4218'/0'/0'/2'
m/44'/4218'/0'/1'/2'
```

**Where**:

* `44` is a constant that denotes *purpose*, (`0x8000002C`) following
  the [BIP43](https://github.com/bitcoin/bips/blob/master/bip-0043.mediawiki) recommendation.
* `4218` is the *coin type* defined for Shimmer
* The three following numbers are:
    * The **account index**. Users can use these accounts to organize the funds in the same fashion as bank accounts;
      for
      donation purposes (where all addresses are considered public), for saving purposes, for common expenses, etc..
    * The **change index**. Allows to separate addresses used for external operations (i.e. receive funds) or for
      internal operations (i.e. generate change).
    * The **address index** that increments sequentially

In the example above generated 6 address paths for the account `0`. One address for external operations and another for
internal operations for each index from `0` to `2`.

## Ed25519 Key Pairs for the Addresses

Before you can generate an Ed25519 key pair, you will need to generate a subsequent Ed25519 seed from a BIP32 path
before.

```typescript
const keyPairs: IKeyPair[] = [];

for (const path of paths) {
    // Master seed was generated previously
    const addressSeed = masterSeed.generateSeedFromPath(new Bip32Path(path));
    const addressKeyPair = addressSeed.keyPair();
    keyPairs.push(addressKeyPair);

    console.log(Converter.bytesToHex(addressKeyPair.privateKey, true));
    console.log(Converter.bytesToHex(addressKeyPair.publicKey, true));
}
```

As the keys are generated as byte arrays (`UInt8Array`) it is necessary to encode them using displayable characters. In
this case, hexadecimal characters using
the [`Converter.bytesToHex()`](../../references/util/classes/Converter#bytestohex)
function. The trailing `true` parameter indicates that the `0x` prefix will be included in the representation.
You can revert the result to bytes (`UInt8Array`)  using
the [`Converter.hexToBytes()`](../../references/util/classes/Converter#hextobytes)

The generated key pairs are should look like the following:

* `0x6f0fa2f7a9d5fbd221c20f54d944378acb871dcdeafc3761e73d7f0aa05c75356f8eeee559daa287ec40a3a7113e88df2fc27bc77819e6d3d146a7dc7a4e939c`
* `0x6f8eeee559daa287ec40a3a7113e88df2fc27bc77819e6d3d146a7dc7a4e939c`

The Ed25519 private key contains `128` hex chars that corresponds to `64` bytes. The public key can be represented
using `64` hex chars i.e. `32` bytes.

You now have your asymmetric cryptography set, but you still need to
generate [public addresses](05-public-addresses.md) that will be used in the Shimmer network.
