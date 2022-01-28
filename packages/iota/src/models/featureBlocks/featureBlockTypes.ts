// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IIssuerFeatureBlock } from "./IIssuerFeatureBlock";
import type { IMetadataFeatureBlock } from "./IMetadataFeatureBlock";
import type { ISenderFeatureBlock } from "./ISenderFeatureBlock";
import type { ITagFeatureBlock } from "./ITagFeatureBlock";

/**
 * All of the feature block types.
 */
export type FeatureBlockTypes =
    | ISenderFeatureBlock
    | IIssuerFeatureBlock
    | IMetadataFeatureBlock
    | ITagFeatureBlock;
