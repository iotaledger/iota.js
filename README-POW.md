# Proof of Work

The proof of work provider is abstracted, so that you can pass any implementation you want to the `SingleNodeClient`. By default no provider is used by the client, which means it will use remote PoW on the node you are connecting to.

As you will see from the benchmarks provided below, the only viable option on current mainnet is the NeonPowProvider which uses a native rust library. The others are provided mainly as reference for anyone wishing to implements their own provider.

## Benchmarks

Speeds for the PoW providers with a data length of 500 and target score of 400 are:

* LocalPowProvider: 275s - Extremely slow
* WasmPowProvider: 44s - Slow
* NodePowProvider: 10s - Faster
* NeonPowProvider: 0.1s - Fastest

Speeds for the PoW providers with a data length of 500 and target score of 4000 (mainnet) are:

* LocalPowProvider: xxxs - Didn't wait to find out
* WasmPowProvider: 44s - Didn't wait to find out
* NodePowProvider: 670s - Faster
* NeonPowProvider: 4s - Fastest

## LocalPowProvider

A very simple local proof of work provider [LocalPowProvider](./src/pow/localPowProvider.ts) is included in the main library.
The example is included for reference purposes to demonstrate the calculations it needs to perofrm, but should not be used as it is very slow.

```js
import { LocalPowProvider } from "@iota/iota.js";

const client = new SingleNodeClient("https://chrysalis-nodes.iota.org", { powProvider: new LocalPowProvider() });
```

## WasmPowProvider

The [WasmPowProvider](./packages/pow-wasm/) can be installed from the `@iota/pow-wasm.js` package.
It is multi-threaded for use with NodeJs built from TypeScript and converted to wasm using AssemblyScript.

You can specify the number of threads to run the provider on by passing a number to the constructor, this defaults to the number of CPUs on the machine it is running.

```js
import { WasmPowProvider } from "@iota/pow-wasm.js";

const client = new SingleNodeClient("https://chrysalis-nodes.iota.org", { powProvider: new WasmPowProvider() });
```

## NodePowProvider

The [NodePowProvider](./packages/pow-node/) can be installed from the `@iota/pow-node.js` package.
It is multi-threaded for use with NodeJs built from TypeScript.

You can specify the number of threads to run the provider on by passing a number to the constructor, this defaults to the number of CPUs on the machine it is running.

```js
import { NodePowProvider } from "@iota/pow-node.js";

const client = new SingleNodeClient("https://chrysalis-nodes.iota.org", { powProvider: new NodePowProvider() });
```


## NeonPowProvider

The [NeonPowProvider](./packages/pow-neon/) can be installed from the `@iota/pow-neon.js` package.
It is multi-threaded and uses neon-bindings to run a native library built from rust.

You can specify the number of threads to run the provider on by passing a number to the constructor, this defaults to the number of CPUs on the machine it is running.

```js
import { NeonPowProvider } from "@iota/pow-wasm.js";

const client = new SingleNodeClient("https://chrysalis-nodes.iota.org", { powProvider: new NeonPowProvider() });
```

## Example

You can see an example of the providers usage in [./examples/pow](./examples/pow) which also can be used to benchmark the different providers.