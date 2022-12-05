# Neon PoW

This package provides local proof of work multi-threaded for NodeJS, it binds to a native rust binary.

## Pre-requisites

You will need the rust toolchain installed so that the native module can be built on install.

## Install

```shell
npm install @iota/pow-neon.js@2.0.0-rc.3

```
## Usage

```js
import { SingleNodeClient } from "@iota/iota.js";
import { NeonPowProvider } from "@iota/pow-neon.js";

const client = new SingleNeonClient("http://localhost:14265/", { powProvider: new NeonPowProvider() });
```
