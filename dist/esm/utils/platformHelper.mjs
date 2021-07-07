// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Class to help with random generation.
 */
export class PlatformHelper {
}
/**
 * Is this the browser.
 * @returns True if running in browser.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
PlatformHelper.isNodeJs = globalThis && globalThis.process && globalThis.process.version;
