import { trits, trytes } from '@iota/converter'
import test from 'ava'
import Kerl from '../src'

test('Kerl: absorb()/squeeze(), Converter: trits()/trytes()', t => {
    const input = 'GYOMKVTSNHVJNCNFBBAH9AAMXLPLLLROQY99QN9DLSJUHDPBLCFFAIQXZA9BKMBJCYSFHFPXAHDWZFEIZ'
    const expected = 'OXJCNFHUNAHWDLKKPELTBFUCVW9KLXKOGWERKTJXQMXTKFKNWNNXYD9DMJJABSEIONOSJTTEVKVDQEWTW'

    const absorbSqueeze = (inputTrytes: string): string => {
        const inputTrits: Int8Array = trits(inputTrytes)
        const kerl: Kerl = new Kerl()
        kerl.initialize()
        kerl.absorb(inputTrits, 0, inputTrits.length)
        const hashTrits = new Int8Array(Kerl.HASH_LENGTH)
        kerl.squeeze(hashTrits, 0, Kerl.HASH_LENGTH)
        return trytes(hashTrits)
    }

    t.is(absorbSqueeze(input), expected, 'Kerl should produce correct hash for absorb/squeeze case.')
})
