import test from 'ava'
import { generateAddress } from '../../lib/crypto'
import { addresses, addressesWithChecksum, seed } from '../samples/addresses'

test('generateAddress() returns correct address for security level 2', t => {
    t.is(
        generateAddress(seed, 0, 2, false),
        addresses[0],
        'generateAddress() should return correct address for security level 2'
    )
})

test('generateAddress() returns correct address with checksum', t => {
    t.is(
        generateAddress(seed, 0, 2, true),
        addressesWithChecksum[0],
        'generateAddress() should return correnct address with checksum'
    )
})

test('generateAddress() return correct address for arbitrary index', t => {
    t.is(
        generateAddress(seed, 7539182232, 2),
        'LZBZDKQIZVAJIDCAKJXLSBZBBZNKEHJCRUCOPBUQDVFSEMEGNHXHNON9FDNNSLUEHTULH9CVBGQCNDIG9',
        'generateAddress() should return correct address for arbitrary index'
    )
})

test('generateAddress() returns correct address for security level 3', t => {
    t.is(
        generateAddress(seed, 0, 3, false),
        'AYAWNVHDEZEAYPNIJORHS9MPFSO9IEYHITHJDJMUUCOFYQJPRZPQFYIIDA9TASSDHYXYNDEVOSP999NPB',
        'generateAddress() should return correct address for security level 3'
    )
})

test('generateAddress() return correct address for seed of length > 81', t => {
    t.is(
        generateAddress('SPAG99ORNQERGXT9BJOPQJRON9OJODWYWYDVBWBOYDURRLVSZXKMXGCLTFBEQUNMJHWOSXAHSPNXVUUSHSHKQHE9VBJMTWZOOLWVFJOAYUFD9QHETXFZEFBVRLBWZSRHXWNXBJW9CWBEQSLSUZNF', 0, 2, false),
        'ANRUIOLIHMEZEWEMWIRNRMGDNYVOFEBUNUHQX9QNXRPDYNAWEHAURB9XALWEQSUDLZUGQPKLVHJE9CQKA',
        'generateAddress() should return correct address for seed of length > 81'
    )
})
