/** @module converter */
export * from './ascii'
export * from './trits'

export const bytesToTrits = (bytes: Buffer) => Int8Array.from(bytes)
export const tritsToBytes = (trits: Int8Array) => Buffer.from(trits.buffer)
