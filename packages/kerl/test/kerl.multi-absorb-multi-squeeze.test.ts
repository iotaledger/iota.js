import { trits, trytes } from '@iota/converter'
import test from 'ava'
import Kerl from '../src'

test('Kerl: multi-absorb()/multi-squeeze(), Converter: trits()/trytes()', t => {
    const input: string =
        'G9JYBOMPUXHYHKSNRNMMSSZCSHOFYOYNZRSZMAAYWDYEIMVVOGKPJBVBM9TDPULSFUNMTVXRKFIDOHUXXVYDLFSZYZTWQYTE9SPYYWYTXJYQ9IFGYOLZXWZBKWZN9QOOTBQMWMUBLEWUEEASRHRTNIQWJQNDWRYLCA'
    const expected: string =
        'LUCKQVACOGBFYSPPVSSOXJEKNSQQRQKPZC9NXFSMQNRQCGGUL9OHVVKBDSKEQEBKXRNUJSRXYVHJTXBPDWQGNSCDCBAIRHAQCOWZEBSNHIJIGPZQITIBJQ9LNTDIBTCQ9EUWKHFLGFUVGGUWJONK9GBCDUIMAYMMQX'

    const multiAbsorbMultiSqueeze = (inputTrytes: string): string => {
        const inputTrits: Int8Array = trits(inputTrytes)
        const kerl: Kerl = new Kerl()
        kerl.initialize()
        kerl.absorb(inputTrits, 0, inputTrits.length)
        const hashTrits = new Int8Array(Kerl.HASH_LENGTH * 2)
        kerl.squeeze(hashTrits, 0, Kerl.HASH_LENGTH * 2)
        return trytes(hashTrits)
    }

    t.is(
        multiAbsorbMultiSqueeze(input),
        expected,
        'Kerl should produce correct hash for multi-absorb/multi-squeeze case.'
    )
})
