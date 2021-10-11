// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

/**
 * Class to help with bip32 paths.
 */
export class Bip32Path {
    /**
     * The path.
     * @internal
     */
    private _path: string[];

    /**
     * Create a new instance of Bip32Path.
     * @param initialPath Initial path to create.
     */
    constructor(initialPath?: string) {
        if (initialPath) {
            this._path = initialPath.split("/");

            if (this._path[0] === "m") {
                this._path.shift();
            }
        } else {
            this._path = [];
        }
    }

    /**
     * Construct a new path by cloning an existing one.
     * @param bip32Path The path to clone.
     * @returns A new instance of Bip32Path.
     */
    public static fromPath(bip32Path: Bip32Path): Bip32Path {
        const p = new Bip32Path();
        p._path = bip32Path._path.slice();
        return p;
    }

    /**
     * Converts the path to a string.
     * @returns The path as a string.
     */
    public toString(): string {
        return this._path.length > 0 ? `m/${this._path.join("/")}` : "m";
    }

    /**
     * Push a new index on to the path.
     * @param index The index to add to the path.
     */
    public push(index: number): void {
        this._path.push(`${index}`);
    }

    /**
     * Push a new hardened index on to the path.
     * @param index The index to add to the path.
     */
    public pushHardened(index: number): void {
        this._path.push(`${index}'`);
    }

    /**
     * Pop an index from the path.
     */
    public pop(): void {
        this._path.pop();
    }

    /**
     * Get the segments.
     * @returns The segments as numbers.
     */
    public numberSegments(): number[] {
        return this._path.map(p => Number.parseInt(p, 10));
    }
}
