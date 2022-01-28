import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the metadata feature block.
 */
export declare const METADATA_FEATURE_BLOCK_TYPE = 2;
/**
 * Metadata feature block.
 */
export interface IMetadataFeatureBlock extends ITypeBase<2> {
    /**
     * Defines metadata (arbitrary binary data) that will be stored in the output.
     */
    data: string;
}
