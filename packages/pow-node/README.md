# Node PoW

This package provides local proof of work multi-threaded for NodeJS, it is still slow but faster than the default LocalPowProvider.

## Install

```shell
npm install @iota/pow-node.js
```

## Usage

```js
import { SingleNodeClient } from "@iota/iota.js";
import { NodePowProvider } from "@iota/pow-node.js";

const client = new SingleNodeClient("https://chrysalis-nodes.iota.org", { powProvider: new NodePowProvider() });
```
