// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { RandomHelper } from "./utils/randomHelper";

// Random
if (!RandomHelper.randomPolyfill) {
    RandomHelper.randomPolyfill = length => {
        const randomBytes = new Uint8Array(length);
        window.crypto.getRandomValues(randomBytes);
        return randomBytes;
    };
}
