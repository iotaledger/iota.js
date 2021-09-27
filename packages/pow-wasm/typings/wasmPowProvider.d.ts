import { IPowProvider } from "@iota/iota.js";
/**
 * Wasm POW Provider.
 */
export declare class WasmPowProvider implements IPowProvider {
    /**
     * Create a new instance of NodePowProvider.
     * @param numCpus The number of cpus, defaults to max CPUs.
     */
    constructor(numCpus?: number);
    /**
     * Perform pow on the message and return the nonce of at least targetScore.
     * @param message The message to process.
     * @param targetScore The target score.
     * @returns The nonce.
     */
    pow(message: Uint8Array, targetScore: number): Promise<string>;
}
