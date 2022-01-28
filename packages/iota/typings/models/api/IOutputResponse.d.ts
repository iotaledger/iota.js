import type { OutputTypes } from "../outputs/outputTypes";
/**
 * Details of an output.
 */
export interface IOutputResponse {
    /**
     * The message id the output was contained in.
     */
    messageId: string;
    /**
     * The transaction id for the output.
     */
    transactionId: string;
    /**
     * The index for the output.
     */
    outputIndex: number;
    /**
     * Is the output spent.
     */
    isSpent: boolean;
    /**
     * The milestone index at which this output was booked into the ledger.
     */
    milestoneIndex: number;
    /**
     * The milestone timestamp this output was booked in the ledger.
     */
    milestoneTimestamp: number;
    /**
     * The ledger index at which these output was available at.
     */
    ledgerIndex: number;
    /**
     * The output.
     */
    output: OutputTypes;
}
