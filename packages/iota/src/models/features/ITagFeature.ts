// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { HexEncodedString } from "../hexEncodedTypes";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the tag feature.
 */
export const TAG_FEATURE_TYPE = 3;

/**
 * Tag feature.
 */
export interface ITagFeature extends ITypeBase<3> {
    /**
     * Defines a tag for the data.
     */
    tag: HexEncodedString;
}
