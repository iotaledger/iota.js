import test from 'ava'
import { isUri } from '../src'

test('isUri() returns true for valid uri.', t => {
    const validUris: string[] = ['udp://8.8.8.8:14265', 'udp://[2001:db8:a0b:12f0::1]', 'udp://domain2.com']

    validUris.forEach((uri: string) => {
        t.is(isUri(uri), true, `isUri() should return true for uri: ${uri}.`)
    })
})

test('isUri() return false for invalid uri', t => {
    const invalidUris: string[] = ['http://8.8.8.8:14256', 'http://9.:14256', 'udp://8.8.8.8.:SDFd']

    invalidUris.forEach((uri: string) => {
        t.is(isUri(uri), false, `isUri() should return false for invalid uri: ${uri}.`)
    })
})
