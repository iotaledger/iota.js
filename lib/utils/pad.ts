import { Tag, Trytes } from '../api/types'

export const padTrytes = (length: number) => (trytes: Trytes) =>
    trytes.length > length
        ? trytes
        : trytes.concat('9'.repeat(length - trytes.length))

export const padTrits = (length: number) => (trits: Int8Array) =>
    trits.length > length
        ? trits
        : new Int8Array(length).map((n, i) => trits[i] || 0)

export const padTag = padTrytes(27)

export const padTagArray = (tags: Tag[]) => tags.map(padTag)
