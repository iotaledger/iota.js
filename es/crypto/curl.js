"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curl = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VybC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vY3VybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0I7O0dBRUc7QUFDSDtJQW1DSTs7O09BR0c7SUFDSCxjQUFZLE1BQXNDO1FBQXRDLHVCQUFBLEVBQUEsU0FBaUIsSUFBSSxDQUFDLGdCQUFnQjtRQUM5QyxJQUFJLE1BQU0sS0FBSyxFQUFFLElBQUksTUFBTSxLQUFLLEVBQUUsRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLG9FQUFvRSxDQUFDLENBQUM7U0FDekY7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxvQkFBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxtQkFBSSxHQUFYLFVBQVksR0FBOEI7UUFBOUIsb0JBQUEsRUFBQSxNQUFjLElBQUksQ0FBQyxXQUFXO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLHFCQUFNLEdBQWIsVUFBYyxLQUFnQixFQUFFLE1BQWMsRUFBRSxNQUFjO1FBQzFELEdBQUc7WUFDQyxJQUFNLEtBQUssR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBRXBFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXhELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMzQixNQUFNLElBQUksS0FBSyxDQUFDO1NBQ25CLFFBQVEsTUFBTSxHQUFHLENBQUMsRUFBRTtJQUN6QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxzQkFBTyxHQUFkLFVBQWUsS0FBZ0IsRUFBRSxNQUFjLEVBQUUsTUFBYztRQUMzRCxHQUFHO1lBQ0MsSUFBTSxLQUFLLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUVwRSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUVsRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQztTQUNuQixRQUFRLE1BQU0sR0FBRyxDQUFDLEVBQUU7SUFDekIsQ0FBQztJQUVEOzs7T0FHRztJQUNLLHdCQUFTLEdBQWpCO1FBQ0ksSUFBSSxTQUFTLENBQUM7UUFDZCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFZCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUMvQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDdEc7U0FDSjtJQUNMLENBQUM7SUFuSEQ7O09BRUc7SUFDb0IsZ0JBQVcsR0FBVyxHQUFHLENBQUM7SUFFakQ7O09BRUc7SUFDb0IsaUJBQVksR0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUVuRTs7O09BR0c7SUFDcUIscUJBQWdCLEdBQVcsRUFBRSxDQUFDO0lBRXREOzs7T0FHRztJQUNxQixnQkFBVyxHQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBZ0d6RixXQUFDO0NBQUEsQUFySEQsSUFxSEM7QUFySFksb0JBQUkifQ==