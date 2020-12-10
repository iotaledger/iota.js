"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curl = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/**
 * Class to implement Curl sponge.
 */
var Curl = /** @class */ (function () {
    /**
     * Create a new instance of Curl.
     * @param rounds The number of rounds to perform.
     */
    function Curl(rounds) {
        if (rounds === void 0) { rounds = Curl.NUMBER_OF_ROUNDS; }
        if (rounds !== 27 && rounds !== 81) {
            throw new Error("Illegal number of rounds. Only `27` and `81` rounds are supported.");
        }
        this._state = new Int8Array(Curl.STATE_LENGTH);
        this._rounds = rounds;
    }
    /**
     * Resets the state
     */
    Curl.prototype.reset = function () {
        this._state = new Int8Array(Curl.STATE_LENGTH);
    };
    /**
     * Get the state of the sponge.
     * @param len The length of the state to get.
     * @returns The state.
     */
    Curl.prototype.rate = function (len) {
        if (len === void 0) { len = Curl.HASH_LENGTH; }
        return this._state.slice(0, len);
    };
    /**
     * Absorbs trits given an offset and length
     * @param trits The trits to absorb.
     * @param offset The offset to start abororbing from the array.
     * @param length The length of trits to absorb.
     */
    Curl.prototype.absorb = function (trits, offset, length) {
        do {
            var limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
            this._state.set(trits.subarray(offset, offset + limit));
            this.transform();
            length -= Curl.HASH_LENGTH;
            offset += limit;
        } while (length > 0);
    };
    /**
     * Squeezes trits given an offset and length
     * @param trits The trits to squeeze.
     * @param offset The offset to start squeezing from the array.
     * @param length The length of trits to squeeze.
     */
    Curl.prototype.squeeze = function (trits, offset, length) {
        do {
            var limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
            trits.set(this._state.subarray(0, limit), offset);
            this.transform();
            length -= Curl.HASH_LENGTH;
            offset += limit;
        } while (length > 0);
    };
    /**
     * Sponge transform function
     * @internal
     */
    Curl.prototype.transform = function () {
        var stateCopy;
        var index = 0;
        for (var round = 0; round < this._rounds; round++) {
            stateCopy = this._state.slice();
            for (var i = 0; i < Curl.STATE_LENGTH; i++) {
                this._state[i] =
                    Curl.TRUTH_TABLE[stateCopy[index] + (stateCopy[(index += index < 365 ? 364 : -365)] << 2) + 5];
            }
        }
    };
    /**
     * The Hash Length
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
    return Curl;
}());
exports.Curl = Curl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VybC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vY3VybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQjs7R0FFRztBQUNIO0lBbUNJOzs7T0FHRztJQUNILGNBQVksTUFBc0M7UUFBdEMsdUJBQUEsRUFBQSxTQUFpQixJQUFJLENBQUMsZ0JBQWdCO1FBQzlDLElBQUksTUFBTSxLQUFLLEVBQUUsSUFBSSxNQUFNLEtBQUssRUFBRSxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0VBQW9FLENBQUMsQ0FBQztTQUN6RjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNJLG9CQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLG1CQUFJLEdBQVgsVUFBWSxHQUE4QjtRQUE5QixvQkFBQSxFQUFBLE1BQWMsSUFBSSxDQUFDLFdBQVc7UUFDdEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0kscUJBQU0sR0FBYixVQUFjLEtBQWdCLEVBQUUsTUFBYyxFQUFFLE1BQWM7UUFDMUQsR0FBRztZQUNDLElBQU0sS0FBSyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7WUFFcEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFeEQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUM7U0FDbkIsUUFBUSxNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQ3pCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLHNCQUFPLEdBQWQsVUFBZSxLQUFnQixFQUFFLE1BQWMsRUFBRSxNQUFjO1FBQzNELEdBQUc7WUFDQyxJQUFNLEtBQUssR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBRXBFLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRWxELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMzQixNQUFNLElBQUksS0FBSyxDQUFDO1NBQ25CLFFBQVEsTUFBTSxHQUFHLENBQUMsRUFBRTtJQUN6QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssd0JBQVMsR0FBakI7UUFDSSxJQUFJLFNBQVMsQ0FBQztRQUNkLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUVkLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQy9DLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWhDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN0RztTQUNKO0lBQ0wsQ0FBQztJQW5IRDs7T0FFRztJQUNvQixnQkFBVyxHQUFXLEdBQUcsQ0FBQztJQUVqRDs7T0FFRztJQUNvQixpQkFBWSxHQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBRW5FOzs7T0FHRztJQUNxQixxQkFBZ0IsR0FBVyxFQUFFLENBQUM7SUFFdEQ7OztPQUdHO0lBQ3FCLGdCQUFXLEdBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFnR3pGLFdBQUM7Q0FBQSxBQXJIRCxJQXFIQztBQXJIWSxvQkFBSSJ9