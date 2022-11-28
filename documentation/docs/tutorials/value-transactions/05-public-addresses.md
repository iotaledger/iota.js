---
description: "Derive a public address from an Ed25519 public key."
image: /img/client_banner.png
keywords:
- public key
- ed25519
- different address format
- hash
- bech32
- rms
- shimmer testnet
---
# Public Addresses

As it usually happens in Blockchain, public addresses are derived from a public key by hashing it. In the Stardust
protocol, they are derived from the [Ed25519 public key](03-generate-a-seed.md#generate-an-ed25519-master-seed).

There are two different address formats:

* `Ed25519`: A hash of the Ed25519 public key.
* `Bech32`: An easily identified and error-resistant format that complies
  with [BECH32](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki).

  In the case of the [Shimmer mainnet](https://explorer.shimmer.network), the BECH32 human-readable part (HRP) is `smr`,
  and `rms` is used for the Shimmer testnet. Those HRPs are also provided as [metadata elements of the `info`
  primitive of the protocol](07-query-output-details.md).

```typescript
const publicAddresses: { ed25519: string, bech32: string }[] = [];

for (const keyPair of keyPairs) {
    const ed25519Address = new Ed25519Address(keyPair.publicKey);
    // Address in bytes
    const ed25519AddressBytes = ed25519Address.toAddress();
    // Conversion to BECH32
    const bech32Addr = Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, ed25519AddressBytes, "rms");

    const publicAddress = {
        ed25519: Converter.bytesToHex(ed25519AddressBytes, true),
        bech32: bech32Addr
    };
    publicAddresses.push(publicAddress);

    console.log(publicAddress);
}
```

As you can see, the BECH32 address is generated from the Ed25519 address, which it is a hash of the public key.

This results in the following:

```text
{
  ed25519: '0x1696e3735e8871ce7086af6a9920e1a3b83cdf8b265adf449fc4bda86b91e2bb',
  bech32: 'rms1qqtfdcmnt6y8rnnss6hk4xfqux3ms0xl3vn94h6ynlztm2rtj83tk9qkzrx'
}
```

The Ed25519 format has a length of `64` hex chars (32 bytes) as the Ed25519 public key. On the other hand, the BECH32
address starts with `rms` or `smr` and continues with a `1` character.

You can now transform the BECH32 address into an Ed25519 address using
the [`Bech32Helper.fromBech32()`](../../references/client/classes/Bech32Helper#frombech32) function, as shown in the
following snippet:

```typescript
const ed25519Addr = Bech32Helper.fromBech32(bech32Address, "rms").addressBytes;
```

However, you cannot derive your Ed25519 public key, as it is a hash of a public key, and hashes are irreversible
functions.

## Putting It All Together

By this point in the tutorial, your `generate-addresses.ts` file should look something like this:

```typescript
import {Bip32Path, Bip39} from "@iota/crypto.js";
import {
    Bech32Helper,
    ED25519_ADDRESS_TYPE,
    Ed25519Address,
    Ed25519Seed,
    generateBip44Address,
    IKeyPair
} from "@iota/iota.js";
import {Converter} from "@iota/util.js";

// Default entropy length is 256
const randomMnemonic = Bip39.randomMnemonic();

console.log("Seed phrase:", randomMnemonic);

const masterSeed = Ed25519Seed.fromMnemonic(randomMnemonic);

const NUM_ADDR = 6;
const addressGeneratorAccountState = {
    accountIndex: 0,
    addressIndex: 0,
    isInternal: false
};
const paths: string[] = [];
for (let i = 0; i < NUM_ADDR; i++) {
    const path = generateBip44Address(addressGeneratorAccountState);
    paths.push(path);

    console.log(`${path}`);
}


const keyPairs: IKeyPair[] = [];

for (const path of paths) {
    // Master seed was generated previously
    const addressSeed = masterSeed.generateSeedFromPath(new Bip32Path(path));
    const addressKeyPair = addressSeed.keyPair();
    keyPairs.push(addressKeyPair);

    console.log(Converter.bytesToHex(addressKeyPair.privateKey, true));
    console.log(Converter.bytesToHex(addressKeyPair.publicKey, true));
}

const publicAddresses: { ed25519: string, bech32: string }[] = [];

for (const keyPair of keyPairs) {
    const ed25519Address = new Ed25519Address(keyPair.publicKey);
    // Address in bytes
    const ed25519AddressBytes = ed25519Address.toAddress();
    // Conversion to BECH32
    const bech32Addr = Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, ed25519AddressBytes, "rms");

    const publicAddress = {
        ed25519: Converter.bytesToHex(ed25519AddressBytes, true),
        bech32: bech32Addr
    };
    publicAddresses.push(publicAddress);

    console.log(publicAddress);
}
```