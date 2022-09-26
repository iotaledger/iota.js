# Node PoW

This package provides local proof of work multi-threaded for NodeJS, it is still slow but faster than the default LocalPowProvider.

## Install

```shell
npm install @iota/pow-node.js@2.0.0-rc.1
```

## Usage

```js
import { SingleNodeClient } from "@iota/iota.js";
import { NodePowProvider } from "@iota/pow-node.js";

const client = new SingleNodeClient("http://localhost:14265/", { powProvider: new NodePowProvider() });
```
