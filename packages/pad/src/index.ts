import * as errors from '../../errors'
import '../../typed-array'
import { Tag, Trytes } from '../../types'

export const padTrytes = (length: number) => (trytes: Trytes) =>
    trytes.length < length ? trytes.concat('9'.repeat(length - trytes.length)) : trytes

export const padTrits = (length: number) => (trits: Int8Array) => {
    if (trits.length > length) {
        throw new Error(errors.ILLEGAL_PADDING_LENGTH)
    }
    const tritsCopy = new Int8Array(length)
    tritsCopy.set(trits, 0)
    return tritsCopy
}

export const padTag = padTrytes(27)

export const padTagArray = (tags: ReadonlyArray<Tag>) => tags.map(padTag)
