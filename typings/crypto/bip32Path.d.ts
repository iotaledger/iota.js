/**
 * Class to help with bip32 paths.
 */
export declare class Bip32Path {
    /**
     * Create a new instance of Bip32Path.
     * @param initialPath Initial path to create.
     */
    constructor(initialPath?: string);
    /**
     * Construct a new path by cloning an existing one.
     * @param bip32Path The path to clone.
     * @returns A new instance of Bip32Path.
     */
    static fromPath(bip32Path: Bip32Path): Bip32Path;
    /**
     * Converts the path to a string.
     * @returns The path as a string.
     */
    toString(): string;
    /**
     * Push a new index on to the path.
     * @param index The index to add to the path.
     */
    push(index: number): void;
    /**
     * Push a new hardened index on to the path.
     * @param index The index to add to the path.
     */
    pushHardened(index: number): void;
    /**
     * Pop an index from the path.
     */
    pop(): void;
    /**
     * Get the segments.
     * @returns The segments as numbers.
     */
    numberSegments(): number[];
}
