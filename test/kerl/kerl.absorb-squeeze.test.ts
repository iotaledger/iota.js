import test from 'ava'
import Converter from '../../lib/crypto/Converter'
import Kerl from '../../lib/crypto/kerl'

test('Kerl: absorb()/squeeze(), Converter: trits()/trytes()', t => {
    const input = 'GYOMKVTSNHVJNCNFBBAH9AAMXLPLLLROQY99QN9DLSJUHDPBLCFFAIQXZA9BKMBJCYSFHFPXAHDWZFEIZ'
    const expected = 'OXJCNFHUNAHWDLKKPELTBFUCVW9KLXKOGWERKTJXQMXTKFKNWNNXYD9DMJJABSEIONOSJTTEVKVDQEWTW'

    const absorbSqueeze = (trytes: string): string => {
        const trits: Int8Array = Converter.trits(input)
        const kerl: Kerl = new Kerl()
        kerl.initialize()
        kerl.absorb(trits, 0, trits.length)
        const hashTrits = new Int8Array(Kerl.HASH_LENGTH)
        kerl.squeeze(hashTrits, 0, Kerl.HASH_LENGTH)
        return Converter.trytes(hashTrits)
    }

    t.is(
        absorbSqueeze(input),
        expected,
        'Kerl should produce correct hash for absorb/squeeze case.'
    )
})

