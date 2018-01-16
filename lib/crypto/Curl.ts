import * as Converter from './Converter'
import { TritArray } from './types'

/**
 **      Cryptographic related functions to IOTA's Curl (sponge function)
 **/

const NUMBER_OF_ROUNDS = 81
const HASH_LENGTH = 243
const STATE_LENGTH = 3 * HASH_LENGTH
const TRUTH_TABLE = [1, 0, -1, 2, 1, -1, 0, 2, -1, 1, 0]

export default class Curl {
    public static HASH_LENGTH = HASH_LENGTH

    public state: number[]

    constructor(public rounds: number = NUMBER_OF_ROUNDS) {
        this.state = []
    }

    /**
     *   Initializes the state with STATE_LENGTH trits
     *
     *   @method initialize
     **/
    public initialize(state: number[] = []) {
        this.state = state

        for (let i = 0; i < STATE_LENGTH; i++) {
            this.state[i] = 0
        }
    }

    public reset() {
        this.initialize()
    }

    /**
     *   Sponge absorb function
     *
     *   @method absorb
     **/
    public absorb(trits: TritArray, offset: number, length: number) {
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
     *   Sponge squeeze function
     *
     *   @method squeeze
     **/
    public squeeze(trits: TritArray, offset: number, length: number) {
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
     *   Sponge transform function
     *
     *   @method transform
     **/
    public transform() {
        let stateCopy = []
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
