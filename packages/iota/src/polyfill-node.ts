// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

// Fetch
if (globalThis && !globalThis.fetch) {
    // eslint-disable-next-line unicorn/prefer-top-level-await, wrap-iife, no-void, func-names
    void (async function() {
        // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
        const fetch = require("node-fetch");
        globalThis.Headers = fetch.Headers;
        globalThis.Request = fetch.Request;
        globalThis.Response = fetch.Response;
        globalThis.fetch = fetch;
    })();
}
