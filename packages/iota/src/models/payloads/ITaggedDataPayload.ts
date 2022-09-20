// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { HexEncodedString } from "../hexEncodedString";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the payload.
 */
export const TAGGED_DATA_PAYLOAD_TYPE = 5;

/**
 * Tagged data payload.
 */
export interface ITaggedDataPayload extends ITypeBase<5> {
    /**
     * The tag to use to categorize the data.
     */
    tag: HexEncodedString;

    /**
     * The index data.
     */
    data: string;
}
