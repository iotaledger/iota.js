import Converter from '../../lib/crypto/converter/converter'
import Kerl from '../../lib/crypto/kerl/kerl'

test('kerl.absorb-multi-squeeze should produce valid hash', () => {
    const hashTrits = []
    
    const trits = Converter.trits('9MIDYNHBWMBCXVDEFOFWINXTERALUKYYPPHKP9JJFGJEIUY9MUDVNFZHMMWZUYUSWAIOWEVTHNWMHANBH')
    const kerl = new Kerl()
     
    kerl.initialize()
    kerl.absorb(trits, 0, trits.length)
    kerl.squeeze(hashTrits, 0, Kerl.HASH_LENGTH * 2)
    
    const hash = Converter.trytes(hashTrits)
    expect('G9JYBOMPUXHYHKSNRNMMSSZCSHOFYOYNZRSZMAAYWDYEIMVVOGKPJBVBM9TDPULSFUNMTVXRKFIDOHUXXVYDLFSZYZTWQYTE9SPYYWYTXJYQ9IFGYOLZXWZBKWZN9QOOTBQMWMUBLEWUEEASRHRTNIQWJQNDWRYLCA').toBe(hash)    
})
