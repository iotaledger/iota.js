import test from 'ava'
import { isTransactionHash } from '../src'

test('isTransactionHash() returns true for valid transaction hash.', t => {
    const hash = 'OZQCYCGHUJHNLDUOKXUPEDCDJCPEWEDXFAFPCGKKDVHVTGUEKBW9VUYDUVEAPZZGPHYMVHABOWZHA9999'
    t.is(isTransactionHash(hash), true, 'isTransactionHash() should return true for valid transaction hash.')
})

test('isTransactionHash() returns false for invalid transaction hash.', t => {
    const invalidLength = 'OZQCYCGHUJHNLDUOKXUPEDCDJCPEWEDXFAFPCGKKDVHVTGUEKBW9VUYDUVEAPZZGPHYMVHABOWZHA9999ASDFASDFA'
    const invalidTrytes = 'sadfYCGHUJHNLDUOKXUPEDCDJCPEWEDXFAFPCGKKDVHVTGUEKBW9VUYDUVEAPZZGPHYMVHABOWZHA9999'

    t.is(
        isTransactionHash(invalidLength),
        false,
        'isTransactionHash() should return false for input of invalid length.'
    )

    t.is(isTransactionHash(invalidTrytes), false, 'isTransactionHash() should return fasle for invalid trytes.')
})
