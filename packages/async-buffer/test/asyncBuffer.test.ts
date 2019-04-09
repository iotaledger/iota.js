import * as BluebirdPromise from 'bluebird'
import { describe, Try } from 'riteway'
import { asyncBuffer } from '../src/asyncBuffer'

describe('asyncBuffer(length?: number)', async assert => {
    const letter = 'hi'
    const delay = (t: number) => new BluebirdPromise(resolve => setTimeout(resolve, t))

    assert({
        given: 'a past letter',
        should: 'read it',
        actual: await (() => {
            const buffer = asyncBuffer<typeof letter>()
            buffer.write(letter)
            return buffer.read()
        })(),
        expected: letter,
    })

    assert({
        given: 'a future letter',
        should: 'read it',
        actual: await (() => {
            const buffer = asyncBuffer<typeof letter>()
            const future = buffer.read()
            delay(100).then(() => buffer.write(letter))
            return future
        })(),
        expected: letter,
    })

    const numberOfActions = 10000

    assert({
        given: '',
        should: 'read/write atomically',
        actual: await (() => {
            const buffer = asyncBuffer<number>()
            const delayLowerBound = 1
            const delayUpperBound = 10
            const g = (j: number) => ++j
            const f = () =>
                buffer
                    .read()
                    .then(g)
                    .tap(buffer.write)

            buffer.write(-1)

            return BluebirdPromise.all(
                new Array(numberOfActions)
                    .fill(undefined)
                    .map(() => delay(Math.floor(Math.random() * delayUpperBound) + delayLowerBound).then(f))
            ).then(results => results.sort((a: number, b: number) => a - b))
        })(),
        expected: new Array(numberOfActions).fill(0).map((_, i) => i),
    })

    assert({
        given: 'length < 0',
        should: 'throw RangeError',
        actual: Try(asyncBuffer, -1),
        expected: new RangeError('Illegal buffer length.'),
    })

    assert({
        given: 'length = -Infinity',
        should: 'throw RangeError',
        actual: Try(asyncBuffer, -Infinity),
        expected: new RangeError('Illegal buffer length.'),
    })

    assert({
        given: 'length = 0',
        should: 'throw RangeError',
        actual: Try(asyncBuffer, 0),
        expected: new RangeError('Illegal buffer length.'),
    })

    assert({
        given: 'length = -0.5',
        should: 'throw TypeError',
        actual: Try(asyncBuffer, -0.5),
        expected: new TypeError('Illegal buffer length.'),
    })

    assert({
        given: 'length = 0.5',
        should: 'throw TypeError',
        actual: Try(asyncBuffer, 0.5),
        expected: new TypeError('Illegal buffer length.'),
    })

    assert({
        given: 'length = NaN',
        should: 'throw TypeError',
        actual: Try(asyncBuffer, NaN as any),
        expected: new TypeError('Illegal buffer length.'),
    })

    assert({
        given: 'length = null',
        should: 'throw TypeError',
        actual: Try(asyncBuffer, null as any),
        expected: new TypeError('Illegal buffer length.'),
    })

    assert({
        given: 'length = "1"',
        should: 'throw TypeError',
        actual: Try(asyncBuffer, '1' as any),
        expected: new TypeError('Illegal buffer length.'),
    })

    assert({
        given: 'length = 2',
        should: 'throw Error once inbound queue length is exceeded',
        actual: (() => {
            const length = 2
            const buffer = asyncBuffer(length)

            for (let i = 0; i < length; i++) {
                buffer.write('')
            }

            return Try(buffer.write, '')
        })(),
        expected: Error('Buffer cannot exceed specified length of 2 items.'),
    })

    assert({
        given: 'length = 2',
        should: 'throw Error once outbound queue length is exceeded',
        actual: (() => {
            const length = 2
            const buffer = asyncBuffer(length)

            for (let i = 0; i < length; i++) {
                buffer.read()
            }

            // release one value from outbound queue
            buffer.write('')
            buffer.read()

            return Try(buffer.read)
        })(),
        expected: Error('Buffer cannot exceed specified length of 2 items.'),
    })

    assert({
        given: '1 write',
        should: 'return inbound length of 1 & outbound length of 0',
        actual: (() => {
            const buffer = asyncBuffer<number>()
            buffer.write(1)
            return [buffer.inboundLength(), buffer.outboundLength()]
        })(),
        expected: [1, 0],
    })

    assert({
        given: '1 read',
        should: 'return inbound length of 1 & outbound length of 0',
        actual: (() => {
            const buffer = asyncBuffer<number>()
            buffer.read()
            return [buffer.inboundLength(), buffer.outboundLength()]
        })(),
        expected: [0, 1],
    })

    assert({
        given: '1 write and then 1 read',
        should: 'return inbound length of 0 & outbound length of 0',
        actual: (() => {
            const buffer = asyncBuffer<number>()
            buffer.read()
            buffer.write(1)
            return [buffer.inboundLength(), buffer.outboundLength()]
        })(),
        expected: [0, 0],
    })

    assert({
        given: '1 read and then 1 write',
        should: 'return inbound length of 0 & outbound length of 0',
        actual: (() => {
            const buffer = asyncBuffer<number>()
            buffer.read()
            buffer.write(1)
            return [buffer.inboundLength(), buffer.outboundLength()]
        })(),
        expected: [0, 0],
    })

    assert({
        given: '1 read, then 1 write and then 1 read',
        should: 'return inbound length of 0 & outbound length of 1',
        actual: (() => {
            const buffer = asyncBuffer<number>()
            buffer.read()
            buffer.write(1)
            buffer.read()
            return [buffer.inboundLength(), buffer.outboundLength()]
        })(),
        expected: [0, 1],
    })
})
