import '../../typed-array'
import { Tag, Trytes } from '../../types'

export const padTrytes = (length: number) => (trytes: Trytes) =>
    trytes.length < length ? trytes.concat('9'.repeat(length - trytes.length)) : trytes

export const padTrits = (length: number) => (trits: Int8Array) =>
    trits.length < length ? new Int8Array(length).map((n, i) => trits[i] || 0) : trits

export const padTag = padTrytes(27)

export const padTagArray = (tags: ReadonlyArray<Tag>) => tags.map(padTag)
