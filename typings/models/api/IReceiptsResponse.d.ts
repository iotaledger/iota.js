import { IReceiptPayload } from "../IReceiptPayload";
/**
 * Receipts response details.
 */
export interface IReceiptsResponse {
    /**
     * The receipts.
     */
    receipts: IReceiptPayload[];
}
