# Neon PoW

This package provides local proof of work multi-threaded for NodeJS, it binds to a native rust binary.

## Pre-requisites

You will need the rust toolchain installed so that the native module can be built on install.

## Install

```shell
npm install @iota/pow-neon.js
```

## Usage

```js
import { SingleNodeClient } from "@iota/iota.js";
import { NeonPowProvider } from "@iota/pow-neon.js";

const client = new SingleNeonClient("https://chrysalis-nodes.iota.org", { powProvider: new NeonPowProvider() });
```
