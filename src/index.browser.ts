// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

// Polyfills for Browser

// BigInt
if (!window.BigInt) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    window.BigInt = require("big-integer");
}

export * from "./index";

