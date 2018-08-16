import test from 'ava'
import { isTransactionHashArray } from '../src'

test('isTransactionHashArray() returns true for valid transaction hashes.', t => {
    const hashes = ['OZQCYCGHUJHNLDUOKXUPEDCDJCPEWEDXFAFPCGKKDVHVTGUEKBW9VUYDUVEAPZZGPHYMVHABOWZHA9999']
    t.is(
        isTransactionHashArray(hashes),
        true,
        'isTransactionHashArray() should return true for valid transaction hashes.'
    )
})

test('isTransactionHash() returns false for invalid transaction hashes.', t => {
    const invalidLength = ['OZQCYCGHUJHNLDUOKXUPEDCDJCPEWEDXFAFPCGKKDVHVTGUEKBW9VUYDUVEAPZZGPHYMVHABOWZHA9999ASDFASDFA']
    const invalidTrytes = ['sadfYCGHUJHNLDUOKXUPEDCDJCPEWEDXFAFPCGKKDVHVTGUEKBW9VUYDUVEAPZZGPHYMVHABOWZHA9999']

    t.is(
        isTransactionHashArray(invalidLength),
        false,
        'isTransactionHashArray() should return false for input of invalid length.'
    )

    t.is(
        isTransactionHashArray(invalidTrytes),
        false,
        'isTransactionHashArray() should return fasle for invalid trytes.'
    )
})
