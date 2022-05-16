// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IIssuerFeature } from "./IIssuerFeature";
import type { IMetadataFeature } from "./IMetadataFeature";
import type { ISenderFeature } from "./ISenderFeature";
import type { ITagFeature } from "./ITagFeature";

/**
 * All of the feature block types.
 */
export type FeatureTypes =
    | ISenderFeature
    | IIssuerFeature
    | IMetadataFeature
    | ITagFeature;
