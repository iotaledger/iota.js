# Browser PoW

This package provides local proof of work multi-threaded for browser.

## Install

```shell
npm install @iota/pow-browser.js@2.0.0-rc.2
```

## Usage

```js
import { SingleNodeClient } from "@iota/iota.js";
import { BrowserPowProvider } from "@iota/pow-browser.js";

const client = new SingleNodeClient("http://localhost:14265/", { powProvider: new BrowserPowProvider() });
```