// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import fetch from "node-fetch";

if (!globalThis.fetch) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalThis.fetch = fetch as any;
}

export * from "./index";
