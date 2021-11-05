import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the indexation feature block.
 */
export declare const INDEXATION_FEATURE_BLOCK_TYPE = 8;
/**
 * Indexation feature block.
 */
export interface IIndexationFeatureBlock extends ITypeBase<8> {
    /**
     * Defines an indexation tag to which the Metadata Block will be indexed. Creates an indexation lookup in nodes.
     */
    tag: string;
}
