---
description: "Generate a Seed Phrase and Ed25519 Master Seed with iota.js."
image: /img/client_banner.png
keywords:
- tutorial
- addresses
- seed
- seed phrase
- ed25519 master seed
- mnemonic seed phrase
---

# Generate Seeds

The first thing you will need to send or receive a transaction is a valid address that can unlock outputs or receive new
outputs. Addresses are derived from a public key, and their associated outputs can be unlocked with the corresponding
private key. As with Firefly wallets, you can generate multiple addresses from an initial master secret (seed phrase),
and, from that point on, use a hierarchical deterministic method to derive multiple addresses.

## Generate a Seed Phrase and Ed25519 Master Seed

### Generate a Random Mnemonic Seed Phrase

The seed phrase is generated in accordance with
the [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) specification and is composed of a set of
words represented as a whitespace-separated string. You can generate a random mnemonic seed phrase using the
[`Bip39.randomMnemonic()`](../../references/crypto/classes/Bip39#randommnemonic) function as shown in the code snippet
below:

```typescript
// Default entropy length is 256
const randomMnemonic = Bip39.randomMnemonic();

console.log("Seed phrase:", randomMnemonic);
```

### Generate an Ed25519 Master Seed

Once you have the seed phrase, also known as BIP39 random mnemonic, the next step is to obtain an *Ed25519 master seed*
from the seed phrase. You can use the
[`Ed25519Seed.fromMnemonic(randomMnemonic)`](../../references/client/classes/Ed25519Seed#frommnemonic) function as shown
in the following snippet:

```typescript
const masterSeed = Ed25519Seed.fromMnemonic(randomMnemonic);
```

You can later use this Ed25519 master seed will be used later to generate as many Ed25519 key pairs as you may need
through the BIP32 deterministic method.

## Putting It All Together

By this point in the tutorial, your `generate-addresses.ts`file should look something like this:

```typescript
import {Bip39} from "@iota/crypto.js";
import {Ed25519Seed} from "@iota/iota.js";

// Default entropy length is 256
const randomMnemonic = Bip39.randomMnemonic();

console.log("Seed phrase:", randomMnemonic);

const masterSeed = Ed25519Seed.fromMnemonic(randomMnemonic);
```