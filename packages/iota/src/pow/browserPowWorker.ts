// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable max-classes-per-file, no-bitwise, no-trailing-spaces, @typescript-eslint/member-ordering, max-len */
/* eslint-disable @typescript-eslint/lines-between-class-members, operator-assignment, jsdoc/check-alignment, no-shadow */
// import type { BigInteger } from "big-integer";
import { PowHelper } from "../index-browser";

declare global {
    interface Window {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        Iota: any;
    }
  }

/**
 * The Browser PoW Worker.
 */
export class BrowserPowWorker {
    /**
     * The number of CPUs to utilise.
     * @internal
     */
    private readonly _numCpus: number;

    /**
     * Create a new instance of the Browser PoW Worker.
     * @param numCpus The number of cpus, defaults to max CPUs.
     */
    constructor(numCpus: number) {
        this._numCpus = numCpus;
    }

    /**
     * Perform pow on the block and return the nonce of at least targetScore.
     * @param powDigest The block pow digest.
     * @param targetZeros The target zeros.
     * @param powInterval The time in seconds that pow should work before aborting.
     * @returns The nonce.
     */
    public async doBrowserPow(powDigest: Uint8Array, targetZeros: number, powInterval?: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const chunkSize = BigInt("18446744073709551615") / BigInt(this._numCpus);
            const workers: Worker[] = [];
            if (window?.document) {
                // works but blocks the main thread
                // const nonce = PowHelper
                // .performPow(
                //     powDigest,
                //     targetZeros,
                //     "0",
                //     powInterval)
                // .toString();
                // console.log("nonce :", nonce);

                for (let i = 0; i < this._numCpus; i++) {
                    const worker = this.createWorker();
                    const scriptURLs = [...window.document.querySelectorAll("script")].map(element => element.src);
                    console.log("IotaPow", PowHelper);

                    worker.postMessage([
                        powDigest,
                        targetZeros,
                        (chunkSize * BigInt(i)).toString(),
                        scriptURLs,
                        powInterval
                    ]);
                    workers.push(worker);

                    worker.addEventListener("message", async (e: MessageEvent) => {
                        for (let j = 0; j < workers.length; j++) {
                            workers[j].terminate();
                        }
                        resolve(e.data as string);
                    });
                    worker.addEventListener("error", async (err: ErrorEvent) => {
                        reject(err.message);
                    });
                }
            }
        });
    }

    /**
     * Create new instance of the Worker.
     * @returns The Worker.
     */
    public createWorker(): Worker {
        const blob = new Blob([
                "(",
                (() => {
                    console.log("init worker");

                    /**
                     * Class implements the b1t6 encoding encoding which uses a group of 6 trits to encode each byte.
                     */
                    class B1T6 {
                        /**
                        * Trytes to trits lookup table.
                        * @internal
                        */
                        private static readonly TRYTE_VALUE_TO_TRITS: number[][] = [
                            [-1, -1, -1],
                            [0, -1, -1],
                            [1, -1, -1],
                            [-1, 0, -1],
                            [0, 0, -1],
                            [1, 0, -1],
                            [-1, 1, -1],
                            [0, 1, -1],
                            [1, 1, -1],
                            [-1, -1, 0],
                            [0, -1, 0],
                            [1, -1, 0],
                            [-1, 0, 0],
                            [0, 0, 0],
                            [1, 0, 0],
                            [-1, 1, 0],
                            [0, 1, 0],
                            [1, 1, 0],
                            [-1, -1, 1],
                            [0, -1, 1],
                            [1, -1, 1],
                            [-1, 0, 1],
                            [0, 0, 1],
                            [1, 0, 1],
                            [-1, 1, 1],
                            [0, 1, 1],
                            [1, 1, 1]
                        ];

                        /**
                        * Trites per tryte.
                        * @internal
                        */
                        private static readonly TRITS_PER_TRYTE: number = 3;

                        /**
                        * The encoded length of the data.
                        * @param data The data.
                        * @returns The encoded length.
                        */
                        public static encodedLen(data: Uint8Array): number {
                            return data.length * B1T6.TRITS_PER_TRYTE;
                        }

                        /**
                        * Encode a byte array into trits.
                        * @param dst The destination array.
                        * @param startIndex The start index to write in the array.
                        * @param src The source data.
                        * @returns The length of the encode.
                        */
                        public static encode(dst: Int8Array, startIndex: number, src: Uint8Array): number {
                            let j = 0;
                            for (let i = 0; i < src.length; i++) {
                                // Convert to signed 8 bit value
                                const v = ((src[i] << 24) >> 24) + 364;

                                const rem = Math.trunc(v % 27);
                                const quo = Math.trunc(v / 27);

                                dst[startIndex + j] = B1T6.TRYTE_VALUE_TO_TRITS[rem][0];
                                dst[startIndex + j + 1] = B1T6.TRYTE_VALUE_TO_TRITS[rem][1];
                                dst[startIndex + j + 2] = B1T6.TRYTE_VALUE_TO_TRITS[rem][2];
                                dst[startIndex + j + 3] = B1T6.TRYTE_VALUE_TO_TRITS[quo][0];
                                dst[startIndex + j + 4] = B1T6.TRYTE_VALUE_TO_TRITS[quo][1];
                                dst[startIndex + j + 5] = B1T6.TRYTE_VALUE_TO_TRITS[quo][2];

                                j += 6;
                            }
                            return j;
                        }
                    }
                    class Curl {
                        /**
                         * The Hash Length.
                         */
                        public static readonly HASH_LENGTH: number = 243;
                    
                        /**
                         * The State Length.
                         */
                        public static readonly STATE_LENGTH: number = 3 * Curl.HASH_LENGTH;
                    
                        /**
                         * The default number of rounds.
                         * @internal
                         */
                        private static readonly NUMBER_OF_ROUNDS: number = 81;
                    
                        /**
                         * Truth Table.
                         * @internal
                         */
                        private static readonly TRUTH_TABLE: number[] = [1, 0, -1, 2, 1, -1, 0, 2, -1, 1, 0];
                    
                        /**
                         * The number of rounds.
                         * @internal
                         */
                        private readonly _rounds: number;
                    
                        /**
                         * The state of the sponge.
                         * @internal
                         */
                        private _state: Int8Array;
                    
                        /**
                         * Create a new instance of Curl.
                         * @param rounds The number of rounds to perform.
                         */
                        constructor(rounds: number = Curl.NUMBER_OF_ROUNDS) {
                            if (rounds !== 27 && rounds !== 81) {
                                throw new Error("Illegal number of rounds. Only `27` and `81` rounds are supported.");
                            }
                    
                            this._state = new Int8Array(Curl.STATE_LENGTH);
                            this._rounds = rounds;
                        }
                    
                        /**
                         * Sponge transform function.
                         * @param curlState The curl state to transform.
                         * @param rounds The number of rounds to use.
                         */
                        public static transform(curlState: Int8Array, rounds: number): void {
                            let stateCopy;
                            let index = 0;
                    
                            for (let round = 0; round < rounds; round++) {
                                stateCopy = curlState.slice();
                    
                                for (let i = 0; i < Curl.STATE_LENGTH; i++) {
                                    const lastVal = stateCopy[index];
                                    if (index < 365) {
                                        index += 364;
                                    } else {
                                        index -= 365;
                                    }
                                    const nextVal = stateCopy[index] << 2;
                                    curlState[i] = Curl.TRUTH_TABLE[lastVal + nextVal + 5];
                                }
                            }
                        }
                    
                        /**
                         * Resets the state.
                         */
                        public reset(): void {
                            this._state = new Int8Array(Curl.STATE_LENGTH);
                        }
                    
                        /**
                         * Get the state of the sponge.
                         * @param len The length of the state to get.
                         * @returns The state.
                         */
                        public rate(len: number = Curl.HASH_LENGTH): Int8Array {
                            return this._state.slice(0, len);
                        }
                    
                        /**
                         * Absorbs trits given an offset and length.
                         * @param trits The trits to absorb.
                         * @param offset The offset to start abororbing from the array.
                         * @param length The length of trits to absorb.
                         */
                        public absorb(trits: Int8Array, offset: number, length: number): void {
                            do {
                                const limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
                    
                                this._state.set(trits.subarray(offset, offset + limit));
                    
                                Curl.transform(this._state, this._rounds);
                                length -= Curl.HASH_LENGTH;
                                offset += limit;
                            } while (length > 0);
                        }
                    
                        /**
                         * Squeezes trits given an offset and length.
                         * @param trits The trits to squeeze.
                         * @param offset The offset to start squeezing from the array.
                         * @param length The length of trits to squeeze.
                         */
                        public squeeze(trits: Int8Array, offset: number, length: number): void {
                            do {
                                const limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
                    
                                trits.set(this._state.subarray(0, limit), offset);
                    
                                Curl.transform(this._state, this._rounds);
                                length -= Curl.HASH_LENGTH;
                                offset += limit;
                            } while (length > 0);
                        }
                    }

                    class Converter {
                        /**
                         * Lookup table for encoding.
                         * @internal
                         */
                        private static ENCODE_LOOKUP: string[] | undefined;
                    
                        /**
                         * Lookup table for decoding.
                         * @internal
                         */
                        private static DECODE_LOOKUP: number[] | undefined;
                  
                        /**
                         * Add the 0x prefix if it does not exist.
                         * @param hex The hex value to add the prefix to.
                         * @returns The hex with the prefix.
                         */
                        private static addPrefix(hex: string): string {
                            return hex.startsWith("0x") ? hex : `0x${hex}`;
                        }

                        /**
                         * Strip the 0x prefix if it exists.
                         * @param hex The hex value to strip.
                         * @returns The stripped hex without the prefix.
                         */
                        public static stripPrefix(hex: string): string {
                            return hex.replace(/^0x/, "");
                        }

                        /**
                         * Decode a hex string to raw array.
                         * @param hex The hex to decode.
                         * @param reverse Store the characters in reverse.
                         * @returns The array.
                         */
                        public static hexToBytes(hex: string, reverse?: boolean): Uint8Array {
                            const strippedHex = this.stripPrefix(hex);
                            const sizeof = strippedHex.length >> 1;
                            const length = sizeof << 1;
                            const array = new Uint8Array(sizeof);

                            this.buildHexLookups();
                            if (Converter.DECODE_LOOKUP) {
                                let i = 0;
                                let n = 0;
                                while (i < length) {
                                    array[n++] =
                                        (Converter.DECODE_LOOKUP[strippedHex.charCodeAt(i++)] << 4) |
                                        Converter.DECODE_LOOKUP[strippedHex.charCodeAt(i++)];
                                }

                                if (reverse) {
                                    array.reverse();
                                }
                            }
                            return array;
                        }

                        /**
                         * Encode a raw array to hex string.
                         * @param array The bytes to encode.
                         * @param includePrefix Include the 0x prefix on the returned hex.
                         * @param startIndex The index to start in the bytes.
                         * @param length The length of bytes to read.
                         * @param reverse Reverse the combine direction.
                         * @returns The array formated as hex.
                         */
                        public static bytesToHex(
                            array: ArrayLike<number>,
                            includePrefix: boolean = false,
                            startIndex?: number,
                            length?: number | undefined,
                            reverse?: boolean
                        ): string {
                            let hex = "";
                            this.buildHexLookups();
                            if (Converter.ENCODE_LOOKUP) {
                                const len = length ?? array.length;
                                const start = startIndex ?? 0;
                                if (reverse) {
                                    for (let i = 0; i < len; i++) {
                                        hex = Converter.ENCODE_LOOKUP[array[start + i]] + hex;
                                    }
                                } else {
                                    for (let i = 0; i < len; i++) {
                                        hex += Converter.ENCODE_LOOKUP[array[start + i]];
                                    }
                                }
                            }
                            return includePrefix ? this.addPrefix(hex) : hex;
                        }
                    
                    
                        /**
                         * Build the static lookup tables.
                         * @internal
                         */
                        private static buildHexLookups(): void {
                            if (!Converter.ENCODE_LOOKUP || !Converter.DECODE_LOOKUP) {
                                const alphabet = "0123456789abcdef";
                                Converter.ENCODE_LOOKUP = [];
                                Converter.DECODE_LOOKUP = [];
                    
                                for (let i = 0; i < 256; i++) {
                                    Converter.ENCODE_LOOKUP[i] = alphabet[(i >> 4) & 0xf] + alphabet[i & 0xf];
                                    if (i < 16) {
                                        if (i < 10) {
                                            Converter.DECODE_LOOKUP[0x30 + i] = i;
                                        } else {
                                            Converter.DECODE_LOOKUP[0x61 - 10 + i] = i;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    class PowHelper {
                        /**
                         * LN3 Const see https://oeis.org/A002391.
                         * 1.098612288668109691395245236922525704647490557822749451734694333 .
                         */
                        public static readonly LN3: number = 1.0986122886681098;
                   
                        /**
                         * Calculate the number of zeros required to get target score.
                         * @param block The block to process.
                         * @param targetScore The target score.
                         * @returns The number of zeros to find.
                         */
                        public static calculateTargetZeros(block: Uint8Array, targetScore: number): number {
                            return Math.ceil(Math.log(block.length * targetScore) / this.LN3);
                        }
                    
                        /**
                         * Convert a big int to bytes.
                         * @param value The bigint.
                         * @param data The buffer to write into.
                         * @param byteOffset The start index to write from.
                         */
                        public static write8(value: bigint, data: Uint8Array, byteOffset: number): void {
                            let hex = value.toString(16);
                            // Hex is twice the length of the bytes for padding
                            hex = hex.padStart(16, "0");
                            // Reverse so little endian
                            const littleEndian = Converter.hexToBytes(hex, true);
                            data.set(littleEndian, byteOffset);
                        }
                        /**
                         * Calculate the trailing zeros.
                         * @param powDigest The pow digest.
                         * @param nonce The nonce.
                         * @returns The trailing zeros.
                         */
                        public static trailingZeros(powDigest: Uint8Array, nonce: bigint): number {
                            const buf = new Int8Array(Curl.HASH_LENGTH);
                            const digestTritsLen = B1T6.encode(buf, 0, powDigest);
                            const biArr = new Uint8Array(8);
                    
                            this.write8(nonce, biArr, 0);
                            B1T6.encode(buf, digestTritsLen, biArr);
                    
                            const curl = new Curl();
                            curl.absorb(buf, 0, Curl.HASH_LENGTH);
                    
                            const hash = new Int8Array(Curl.HASH_LENGTH);
                            curl.squeeze(hash, 0, Curl.HASH_LENGTH);
                    
                            return PowHelper.trinaryTrailingZeros(hash);
                        }
                    
                        /**
                         * Find the number of trailing zeros.
                         * @param trits The trits to look for zeros.
                         * @param endPos The end position to start looking for zeros.
                         * @returns The number of trailing zeros.
                         */
                        public static trinaryTrailingZeros(trits: Int8Array, endPos: number = trits.length): number {
                            let z: number = 0;
                            for (let i = endPos - 1; i >= 0 && trits[i] === 0; i--) {
                                z++;
                            }
                            return z;
                        }

                        /**
                         * Perform the hash on the data until we reach target number of zeros.
                         * @param powDigest The pow digest.
                         * @param targetZeros The target number of zeros.
                         * @param startIndex The index to start looking from.
                         * @param powInterval The time in seconds that pow should work before aborting.
                         *@returns The nonce.
                         */
                        public static performPow(
                            powDigest: Uint8Array,
                            targetZeros: number,
                            startIndex: bigint,
                            powInterval?: number
                            ): string {
                            let nonce = startIndex;
                            let returnNonce;
                    
                            const buf: Int8Array = new Int8Array(Curl.HASH_LENGTH);
                            const digestTritsLen = B1T6.encode(buf, 0, powDigest);
                            const biArr = new Uint8Array(8);
                            let end = Number.POSITIVE_INFINITY;
                            if (powInterval) {
                                end = Date.now() + (powInterval * 1000);
                            }
                            do {
                                this.write8(nonce, biArr, 0);
                                B1T6.encode(buf, digestTritsLen, biArr);
                    
                                const curlState = new Int8Array(Curl.STATE_LENGTH);
                                curlState.set(buf, 0);
                                Curl.transform(curlState, 81);
                    
                                if (this.trinaryTrailingZeros(curlState, Curl.HASH_LENGTH) >= targetZeros) {
                                    returnNonce = nonce;
                                } else {
                                    nonce = nonce + BigInt(1);
                                }
                            } while (returnNonce === undefined && Date.now() <= end);
                    
                            return returnNonce ? returnNonce.toString() : "0";
                        }
                    }
                    addEventListener("message", e => {
                        const [powDigest, targetZeros, startIndex, scripts, powInterval] = [...e.data];
                        // createHTMLDocument(title)
                        console.log("self", scripts);

                        /* eslint-disable @typescript-eslint/no-unsafe-argument */
                        // for (const script of scripts) {
                        //     console.log("script", script);
                        //     if (script) {
                        //         importScripts(script);
                        //     }
                        // }

                        const nonce = PowHelper
                            .performPow(
                                powDigest as Uint8Array,
                                targetZeros as number,
                                startIndex as bigint,
                                powInterval as number)
                            .toString();

                        postMessage(nonce);
                    });
                }).toString(),
                ")()"
            ],
            { type: "application/javascript" }
        );

        const blobURL = URL.createObjectURL(blob);
        const worker = new Worker(blobURL);

        URL.revokeObjectURL(blobURL);

        return worker;
    }
}
