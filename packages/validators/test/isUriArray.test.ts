import test from 'ava'
import { isUriArray } from '../src'

test('isUri() returns true for valid uri array.', t => {
    const validUris: string[][] = ['udp://8.8.8.8:14265', 'udp://[2001:db8:a0b:12f0::1]', 'udp://domain2.com'].map(
        x => [x]
    )

    validUris.forEach((uri: string[]) => {
        t.deepEqual(isUriArray(uri), true, `isUri() should return true for uri array: ${uri}`)
    })
})

test('isUri() return false for invalid uri array.', t => {
    const invalidUris: string[][] = ['http://8.8.8.8:14256', 'http://9.:14256', 'udp://8.8.8.8.:SDFd'].map(x => [x])

    invalidUris.forEach((uri: string[]) => {
        t.is(isUriArray(uri), false, `isUri() should return false for invalid uri array: ${uri}`)
    })
})
