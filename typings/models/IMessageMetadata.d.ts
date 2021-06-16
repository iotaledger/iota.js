import type { ConflictReason } from "./conflictReason";
import type { LedgerInclusionState } from "./ledgerInclusionState";
/**
 * Response from the metadata endpoint.
 */
export interface IMessageMetadata {
    /**
     * The message id.
     */
    messageId: string;
    /**
     * The parent message ids.
     */
    parentMessageIds?: string[];
    /**
     * Is the message solid.
     */
    isSolid: boolean;
    /**
     * Is the message referenced by a milestone.
     */
    referencedByMilestoneIndex?: number;
    /**
     * Is this message a valid milestone.
     */
    milestoneIndex?: number;
    /**
     * The ledger inclusion state.
     */
    ledgerInclusionState?: LedgerInclusionState;
    /**
     * The conflict reason.
     */
    conflictReason?: ConflictReason;
    /**
     * Should the message be promoted.
     */
    shouldPromote?: boolean;
    /**
     * Should the message be reattached.
     */
    shouldReattach?: boolean;
}
