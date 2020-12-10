import { ITypeBase } from "./ITypeBase";
/**
 * The global type for the payload.
 */
export declare const MILESTONE_PAYLOAD_TYPE: number;
/**
 * Milestone payload.
 */
export interface IMilestonePayload extends ITypeBase<1> {
    /**
     * The index name.
     */
    index: number;
    /**
     * The timestamp of the milestone.
     */
    timestamp: number;
    /**
     * The 1st parent where this milestone attaches to.
     */
    parent1MessageId: string;
    /**
     * The 2nd parent where this milestone attaches to.
     */
    parent2MessageId: string;
    /**
     * The merkle proof inclusions.
     */
    inclusionMerkleProof: string;
    /**
     * The public keys.
     */
    publicKeys: string[];
    /**
     * The signatures.
     */
    signatures: string[];
}
