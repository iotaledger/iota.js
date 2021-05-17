# Node Wasm

This package provides local proof of work multi-threaded for NodeJS implemented in WASM, it is still slow but faster than the default LocalPowProvider.

## Install

```shell
npm install @iota/pow-wasm.js
```

## Usage

```js
import { SingleNodeClient } from "@iota/iota.js";
import { WasmPowProvider } from "@iota/pow-wasm.js";

const client = new SingleNodeClient("https://chrysalis-nodes.iota.org", { powProvider: new WasmPowProvider() });
```