# Changelog

## v1.7.0

* Update all BigInt calculations to use big-integer lib instead of native, so that when polyfill is used e.g. in React Native the calculations work
* Update IPowProvider interface so that BigInteger nonce is returned as string

## v1.6.3

* Rename TESTNET to DEVNET

## v1.6.2

* Reinstate package.json browser field and add module field to improve packager compatibility

## v1.6.1

* Remove package.json browser entry in favour of exports

## v1.6.0

* Breaking Change - MQTT has moved to its own package @iota/mqtt.js
* Improve ESM Modules format
* ESM distribution is located in dist/esm directory
* Renamed dist/iota.js to dist/cjs/index-node.js
* Renamed dist/iota.browser.js to dist/cjs/index-browser.js
* Improve platform detection for RandomHelper

## v1.5.7

* Embedded Base64 implementation

## v1.5.6

* TypeScript import type

## v1.5.5

* Modernise ES module format

## v1.5.4

* Local PoW autofills parentMessageIds if missing

## v1.5.3

* PoW optimizations

## v1.5.2

* Refactored PoW core functionality to allow use by other PoW providers

## v1.5.1

* Added ChaCha20
* Added Poly1305
* Added ChaCha20Poly1305
* Added `ledgerIndex` to `IAddressOutputsResponse` and `IAddressResponse`

## v1.5.0

* A New Dawn

## v1.5.0-alpha.2

* High level send, getBalance, getUnspentAddress and getUnspentAddresses functions are now passed accountIndex instead of Bip32 base path, the paths are calculated internally using the default path m/44'/4218'/{accountIndex}'/{isInternal}'/{addressIndex}'
* You can perform a send using a custom addressing processs using sendWithAddressGenerator
* Added generateAccountAddress, generateBip32Address which can be used with sendWithAddressGenerator
* Original Bip32 versions are maintained as getBalanceBip32, getUnspentAddressBip32, getUnspentAddressesBip32
* The addresses example has been expanded to demonstrate the changes to address generation
* Ed25519 Address now takes the public key as parameter to constructor and there are also method name changes publicKeyToAdddress => toAddress and verifyAddress => verify

## v1.5.0-alpha.1

* Initial Release
