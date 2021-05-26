"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curl = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/**
 * Class to implement Curl sponge.
 */
class Curl {
    /**
     * Create a new instance of Curl.
     * @param rounds The number of rounds to perform.
     */
    constructor(rounds = Curl.NUMBER_OF_ROUNDS) {
        if (rounds !== 27 && rounds !== 81) {
            throw new Error("Illegal number of rounds. Only `27` and `81` rounds are supported.");
        }
        this._state = new Int8Array(Curl.STATE_LENGTH);
        this._rounds = rounds;
    }
    /**
     * Sponge transform function
     * @param curlState The curl state to transform.
     * @param round The number of rounds to use.
     * @internal
     */
    static transform(curlState, rounds) {
        let stateCopy;
        let index = 0;
        for (let round = 0; round < rounds; round++) {
            stateCopy = curlState.slice();
            for (let i = 0; i < Curl.STATE_LENGTH; i++) {
                const lastVal = stateCopy[index];
                if (index < 365) {
                    index += 364;
                }
                else {
                    index -= 365;
                }
                const nextVal = stateCopy[index] << 2;
                curlState[i] = Curl.TRUTH_TABLE[lastVal + nextVal + 5];
            }
        }
    }
    /**
     * Resets the state.
     */
    reset() {
        this._state = new Int8Array(Curl.STATE_LENGTH);
    }
    /**
     * Get the state of the sponge.
     * @param len The length of the state to get.
     * @returns The state.
     */
    rate(len = Curl.HASH_LENGTH) {
        return this._state.slice(0, len);
    }
    /**
     * Absorbs trits given an offset and length.
     * @param trits The trits to absorb.
     * @param offset The offset to start abororbing from the array.
     * @param length The length of trits to absorb.
     */
    absorb(trits, offset, length) {
        do {
            const limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
            this._state.set(trits.subarray(offset, offset + limit));
            Curl.transform(this._state, this._rounds);
            length -= Curl.HASH_LENGTH;
            offset += limit;
        } while (length > 0);
    }
    /**
     * Squeezes trits given an offset and length.
     * @param trits The trits to squeeze.
     * @param offset The offset to start squeezing from the array.
     * @param length The length of trits to squeeze.
     */
    squeeze(trits, offset, length) {
        do {
            const limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
            trits.set(this._state.subarray(0, limit), offset);
            Curl.transform(this._state, this._rounds);
            length -= Curl.HASH_LENGTH;
            offset += limit;
        } while (length > 0);
    }
}
exports.Curl = Curl;
/**
 * The Hash Length.
 */
Curl.HASH_LENGTH = 243;
/**
 * The State Length.
 */
Curl.STATE_LENGTH = 3 * Curl.HASH_LENGTH;
/**
 * The default number of rounds.
 * @internal
 */
Curl.NUMBER_OF_ROUNDS = 81;
/**
 * Truth Table.
 * @internal
 */
Curl.TRUTH_TABLE = [1, 0, -1, 2, 1, -1, 0, 2, -1, 1, 0];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VybC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vY3VybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQjs7R0FFRztBQUNILE1BQWEsSUFBSTtJQW1DYjs7O09BR0c7SUFDSCxZQUFZLFNBQWlCLElBQUksQ0FBQyxnQkFBZ0I7UUFDOUMsSUFBSSxNQUFNLEtBQUssRUFBRSxJQUFJLE1BQU0sS0FBSyxFQUFFLEVBQUU7WUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO1NBQ3pGO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFvQixFQUFFLE1BQWM7UUFDeEQsSUFBSSxTQUFTLENBQUM7UUFDZCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFZCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3pDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakMsSUFBSSxLQUFLLEdBQUcsR0FBRyxFQUFFO29CQUNiLEtBQUssSUFBSSxHQUFHLENBQUM7aUJBQ2hCO3FCQUFNO29CQUNILEtBQUssSUFBSSxHQUFHLENBQUM7aUJBQ2hCO2dCQUNELE1BQU0sT0FBTyxH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