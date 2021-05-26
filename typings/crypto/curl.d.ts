/**
 * Class to implement Curl sponge.
 */
export declare class Curl {
    /**
     * The Hash Length.
     */
    static readonly HASH_LENGTH: number;
    /**
     * The State Length.
     */
    static readonly STATE_LENGTH: number;
    /**
     * Create a new instance of Curl.
     * @param rounds The number of rounds to perform.
     */
    constructor(rounds?: number);
    /**
     * Resets the state.
     */
    reset(): void;
    /**
     * Get the state of the sponge.
     * @param len The length of the state to get.
     * @returns The state.
     */
    rate(len?: number): Int8Array;
    /**
     * Absorbs trits given an offset and length.
     * @param trits The trits to absorb.
     * @param offset The offset to start abororbing from the array.
     * @param length The length of trits to absorb.
     */
    absorb(trits: Int8Array, offset: number, length: number): void;
    /**
     * Squeezes trits given an offset and length.
     * @param trits The trits to squeeze.
     * @param offset The offset to start squeezing from the array.
     * @param length The length of trits to squeeze.
     */
    squeeze(trits: Int8Array, offset: number, length: number): void;
}
