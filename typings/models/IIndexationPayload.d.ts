import type { ITypeBase } from "./ITypeBase";
/**
 * The global type for the payload.
 */
export declare const INDEXATION_PAYLOAD_TYPE = 2;
/**
 * Indexation payload.
 */
export interface IIndexationPayload extends ITypeBase<2> {
    /**
     * The index name.
     */
    index: string;
    /**
     * The index data.
     */
    data?: string;
}
