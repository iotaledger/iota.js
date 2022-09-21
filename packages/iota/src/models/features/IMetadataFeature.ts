// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { HexEncodedString } from "../hexEncodedTypes";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the metadata feature.
 */
export const METADATA_FEATURE_TYPE = 2;

/**
 * Metadata feature.
 */
export interface IMetadataFeature extends ITypeBase<2> {
    /**
     * Defines metadata (arbitrary binary data) that will be stored in the output.
     */
    data: HexEncodedString;
}
