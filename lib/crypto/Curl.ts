/**
 ** Cryptographic related functions to IOTA's Curl (sponge function)
 **/

const NUMBER_OF_ROUNDS = 81
const HASH_LENGTH = 243
const STATE_LENGTH = 3 * HASH_LENGTH
const TRUTH_TABLE = [1, 0, -1, 2, 1, -1, 0, 2, -1, 1, 0]

export default class Curl {
    public static HASH_LENGTH = HASH_LENGTH

    public state: Int8Array

    /**
     * @constructor
     * @param {number} rounds - default is 81 rounds
     */
    constructor(public rounds: number = NUMBER_OF_ROUNDS) {
        this.state = new Int8Array(STATE_LENGTH)
    }

    /**
     * Initializes the state with STATE_LENGTH trits
     *
     * @method initialize
     * @param {Int8Array} state
     */
    public initialize(state: Int8Array = new Int8Array(STATE_LENGTH)) {
        this.state = state

        for (let i = 0; i < STATE_LENGTH; i++) {
            this.state[i] = 0
        }
    }

    /**
     * Reset state
     *
     * @method reset
     */
    public reset() {
        this.initialize()
    }

    /**
     * Sponge absorb function
     *
     * @method absorb
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
            // tslint:disable-next-line no-conditional-assignment
        } while ((length -= HASH_LENGTH) > 0)
    }

    /**
     * Sponge squeeze function
     *
     * @method squeeze
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
            // tslint:disable-next-line no-conditional-assignment
        } while ((length -= HASH_LENGTH) > 0)
    }

    /**
     * Sponge transform function
     *
     * @method transform
     */
    public transform() {
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
