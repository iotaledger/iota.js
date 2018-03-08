import test from 'ava'
import Converter from '../../lib/crypto/Converter'
import Kerl from '../../lib/crypto/kerl'

test('Kerl: absorb()/multi-squeeze(), Converter: trits()/trytes()', t => {
    const input = '9MIDYNHBWMBCXVDEFOFWINXTERALUKYYPPHKP9JJFGJEIUY9MUDVNFZHMMWZUYUSWAIOWEVTHNWMHANBH'
    const expected = 'G9JYBOMPUXHYHKSNRNMMSSZCSHOFYOYNZRSZMAAYWDYEIMVVOGKPJBVBM9TDPULSFUNMTVXRKFIDOHUXXVYDLFSZYZTWQYTE9SPYYWYTXJYQ9IFGYOLZXWZBKWZN9QOOTBQMWMUBLEWUEEASRHRTNIQWJQNDWRYLCA'

    const absorbMultiSqueeze = (trytes: string): string => {
        const trits: Int8Array = Converter.trits(input)
        const kerl: Kerl = new Kerl()
        kerl.initialize()
        kerl.absorb(trits, 0, trits.length)
        const hashTrits: Int8Array = new Int8Array(Kerl.HASH_LENGTH * 2)
        kerl.squeeze(hashTrits, 0, Kerl.HASH_LENGTH * 2)
        return Converter.trytes(hashTrits)
    }

    t.is(
        absorbMultiSqueeze(input),
        expected,
        'Kerl should produce correct hash for absorb/multi-squeeze case.'
    )
})

