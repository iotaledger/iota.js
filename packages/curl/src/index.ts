// tslint:disable no-conditional-assignment
import '../../typed-array'

const NUMBER_OF_ROUNDS = 81
const HASH_LENGTH = 243
const STATE_LENGTH = 3 * HASH_LENGTH
const TRUTH_TABLE = [1, 0, -1, 2, 1, -1, 0, 2, -1, 1, 0]

/**
 * @class Curl
 * @ignore
 */
export default class Curl {
    public static HASH_LENGTH = HASH_LENGTH
    private state: Int8Array

    /**
     * @constructor
     *
     * @ignore
     *
     * @param rounds
     */
    constructor(public rounds: number = NUMBER_OF_ROUNDS) {
        if (rounds !== 27 && rounds !== 81) {
            throw new Error('Illegal number of rounds. Only `27` and `81` rounds are supported.')
        }

        this.state = new Int8Array(STATE_LENGTH)
    }

    /**
     * Initializes the state with `STATE_LENGTH` trits
     *
     * @method initialize
     *
     * @ignore
     *
     * @param {Int8Array} [state]
     */
    public initialize(state: Int8Array = new Int8Array(STATE_LENGTH)) {
        if (state.length !== STATE_LENGTH) {
            throw new Error('Illegal state length. ')
        }

        this.state = state.slice()

        for (let i = 0; i < STATE_LENGTH; i++) {
            this.state[i] = 0
        }
    }

    /**
     * Resets the state
     *
     * @ignore
     *
     * @method reset
     */
    public reset() {
        this.initialize()
    }

    /**
     * Absorbs trits given an offset and length
     *
     * @method absorb
     *
     * @ignore
     *
     * @param {Int8Array} trits
     * @param {number} offset
     * @param {number} length
     **/
    public absorb(trits: Int8Array, offset: number, length: number) {
        do {
            let i = 0
            const limit = length < HASH_LENGTH ? length : HASH_LENGTH

            while (i < limit) {
                this.state[i++] = trits[offset++]
            }

            this.transform()
        } while ((length -= HASH_LENGTH) > 0)
    }

    /**
     * Squeezes trits given an offset and length
     *
     * @method squeeze
     *
     * @ignore
     *
     * @param {Int8Array} trits
     * @param {number} offset
     * @param {number} length
     **/
    public squeeze(trits: Int8Array, offset: number, length: number) {
        do {
            let i = 0
            const limit = length < HASH_LENGTH ? length : HASH_LENGTH

            while (i < limit) {
                trits[offset++] = this.state[i++]
            }

            this.transform()
        } while ((length -= HASH_LENGTH) > 0)
    }

    /**
     * Sponge transform function
     *
     * @method transform
     *
     * @ignore
     *
     * @private
     */
    private transform() {
        let stateCopy = new Int8Array(STATE_LENGTH)
        let index = 0

        for (let round = 0; round < this.rounds; round++) {
            stateCopy = this.state.slice()

            for (let i = 0; i < STATE_LENGTH; i++) {
                this.state[i] =
                    TRUTH_TABLE[stateCopy[index] + (stateCopy[(index += index < 365 ? 364 : -365)] << 2) + 5]
            }
        }
    }
}
