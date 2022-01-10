// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { randomBytes } from "crypto";
import { RandomHelper } from "./utils/randomHelper.mjs";
// Random
if (!RandomHelper.randomPolyfill) {
    RandomHelper.randomPolyfill = length => randomBytes(length);
}
