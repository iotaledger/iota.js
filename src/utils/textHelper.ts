// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

/**
 * Class to help with text.
 */
export class TextHelper {
    /**
     * Is the string UTF8.
     * @param value The value to test.
     * @returns True if the value is UTF8.
     */
    public static isUTF8(value?: string): boolean {
        return value ? !/[\u0080-\uFFFF]/g.test(value) : true;
    }
}
