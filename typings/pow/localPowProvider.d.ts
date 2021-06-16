import type { IPowProvider } from "../models/IPowProvider";
/**
 * Local POW Provider.
 * WARNING - This is really slow.
 */
export declare class LocalPowProvider implements IPowProvider {
    /**
     * Perform pow on the message and return the nonce of at least targetScore.
     * @param message The message to process.
     * @param targetScore The target score.
     * @returns The nonce.
     */
    pow(message: Uint8Array, targetScore: number): Promise<bigint>;
}
