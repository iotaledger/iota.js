// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the metadata feature block.
 */
export const METADATA_FEATURE_BLOCK_TYPE = 7;

/**
 * Metadata feature block.
 */
export interface IMetadataFeatureBlock extends ITypeBase<7> {
    /**
     * Defines metadata (arbitrary binary data) that will be stored in the output.
     */
    data: string;
}
