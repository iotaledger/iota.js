# @iota/crypto.js

The code in the package is provides crypto implementations used by other packages.

## Install

```shell
npm install @iota/crypto.js
```

## Usage

```js
import { Converter } from "@iota/util.js";
import { Blake2b } from "@iota/crypto.js";

const sum = Blake2b.sum512(Converter.utf8ToBytes("abc"));

console.log(Converter.bytesToHex(sum));
```

## API

The class and method documentation can be found in [./docs/API.md](./docs/API.md)
