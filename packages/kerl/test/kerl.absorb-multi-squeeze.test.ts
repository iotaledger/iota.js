import { trits, trytes } from '@iota/converter'
import test from 'ava'
import Kerl from '../src'

test('Kerl: absorb()/multi-squeeze(), Converter: trits()/trytes()', t => {
    const input = '9MIDYNHBWMBCXVDEFOFWINXTERALUKYYPPHKP9JJFGJEIUY9MUDVNFZHMMWZUYUSWAIOWEVTHNWMHANBH'
    const expected =
        'G9JYBOMPUXHYHKSNRNMMSSZCSHOFYOYNZRSZMAAYWDYEIMVVOGKPJBVBM9TDPULSFUNMTVXRKFIDOHUXXVYDLFSZYZTWQYTE9SPYYWYTXJYQ9IFGYOLZXWZBKWZN9QOOTBQMWMUBLEWUEEASRHRTNIQWJQNDWRYLCA'

    const absorbMultiSqueeze = (inputTrytes: string): string => {
        const inputTrits: Int8Array = trits(inputTrytes)
        const kerl: Kerl = new Kerl()
        kerl.initialize()
        kerl.absorb(inputTrits, 0, inputTrits.length)
        const hashTrits: Int8Array = new Int8Array(Kerl.HASH_LENGTH * 2)
        kerl.squeeze(hashTrits, 0, Kerl.HASH_LENGTH * 2)
        return trytes(hashTrits)
    }

    t.is(absorbMultiSqueeze(input), expected, 'Kerl should produce correct hash for absorb/multi-squeeze case.')
})
