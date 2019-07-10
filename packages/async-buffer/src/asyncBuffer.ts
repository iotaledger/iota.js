import * as Promise from 'bluebird'

export interface AsyncBuffer<T> {
    read: () => Promise<T>
    write: (value: T) => void
    dump: () => ReadonlyArray<T>
    inboundLength: () => number
    outboundLength: () => number
}

export const asyncBuffer = <T>(length = Number.POSITIVE_INFINITY): AsyncBuffer<T> => {
    type Resolver<R> = (value?: R | PromiseLike<R> | undefined) => void

    if (length !== Number.POSITIVE_INFINITY && !Number.isInteger(length)) {
        throw new TypeError('Illegal buffer length.')
    }

    if (length <= 0) {
        throw new RangeError('Illegal buffer length.')
    }

    // A buffer consists of 2 asynchrounous queues.
    // Writer resolves future values of the outbound queue.
    // Reader resolves past values of the inbound queue.
    // This means that we can start reading values from async buffers before those are written to it.
    const inboundQueue: T[] = []
    const outboundQueue: Array<Resolver<T>> = []

    const lengthExceeded = `Buffer can not exceed specified length of ${length} items.`

    return {
        write: (value: T) => {
            if (outboundQueue.length !== 0) {
                ;(outboundQueue.shift() as Resolver<T>)(value)
            }
            // A buffer has length indicating how many values can be queued.
            // If buffer is to exceed specified length, an error is thrown.
            else if (inboundQueue.length < length) {
                inboundQueue.push(value)
            } else {
                throw new Error(lengthExceeded)
            }
        },

        read: () => {
            if (outboundQueue.length === length) {
                throw new RangeError(lengthExceeded)
            }
            return new Promise(resolve => {
                if (inboundQueue.length !== 0) {
                    resolve(inboundQueue.shift())
                } else {
                    outboundQueue.push(resolve)
                }
            })
        },

        dump: () => [...inboundQueue],

        inboundLength: (): number => inboundQueue.length,
        outboundLength: (): number => outboundQueue.length,
    }
}
