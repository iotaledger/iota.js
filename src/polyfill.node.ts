// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

// Fetch
if (!globalThis.fetch) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    globalThis.fetch = require("node-fetch");
}

// Base 64 Conversion
if (!globalThis.btoa) {
    globalThis.btoa = a => Buffer.from(a).toString("base64");
    globalThis.atob = a => Buffer.from(a, "base64").toString();
}
