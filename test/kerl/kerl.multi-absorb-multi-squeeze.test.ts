import test from 'ava'
import Converter from '../../lib/crypto/converter'
import Kerl from '../../lib/crypto/kerl'

test('Kerl: multi-absorb()/multi-squeeze(), Converter: trits()/trytes()', t => {
    const input: string = 'G9JYBOMPUXHYHKSNRNMMSSZCSHOFYOYNZRSZMAAYWDYEIMVVOGKPJBVBM9TDPULSFUNMTVXRKFIDOHUXXVYDLFSZYZTWQYTE9SPYYWYTXJYQ9IFGYOLZXWZBKWZN9QOOTBQMWMUBLEWUEEASRHRTNIQWJQNDWRYLCA'
    const expected: string = 'LUCKQVACOGBFYSPPVSSOXJEKNSQQRQKPZC9NXFSMQNRQCGGUL9OHVVKBDSKEQEBKXRNUJSRXYVHJTXBPDWQGNSCDCBAIRHAQCOWZEBSNHIJIGPZQITIBJQ9LNTDIBTCQ9EUWKHFLGFUVGGUWJONK9GBCDUIMAYMMQX'

    const multiAbsorbMultiSqueeze = (trytes: string): string => {
        const trits: Int8Array = Converter.trits(trytes)
        const kerl: Kerl = new Kerl()
        kerl.initialize()
        kerl.absorb(trits, 0, trits.length)
        const hashTrits = new Int8Array(Kerl.HASH_LENGTH * 2)
        kerl.squeeze(hashTrits, 0, Kerl.HASH_LENGTH * 2)
        return Converter.trytes(hashTrits)
    } 

    t.is(
        multiAbsorbMultiSqueeze(input),
        expected,
        'Kerl should produce correct hash for multi-absorb/multi-squeeze case.'
    )
})
