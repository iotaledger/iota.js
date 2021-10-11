import type { ISigLockedDustAllowanceOutput } from "../ISigLockedDustAllowanceOutput";
import type { ISigLockedSingleOutput } from "../ISigLockedSingleOutput";
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
     * The output.
     */
    output: ISigLockedSingleOutput | ISigLockedDustAllowanceOutput;
}
