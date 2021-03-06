// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
import { promises } from "fs";
import path from "path";
import { parentPort, workerData } from "worker_threads";

/**
 * Perform the hash on the data until we reach target number of zeros.
 * @param powDigest The pow digest.
 * @param targetZeros The target number of zeros.
 * @param startIndex The index to start looking from.
 * @returns The nonce.
 */
export async function doPow(powDigest: Uint8Array, targetZeros: number, startIndex: bigint): Promise<bigint> {
    const wasmData = await promises.readFile(path.join(__dirname, "../wasm/build/release.wasm"));
    const wasmInstance = await WebAssembly.instantiate(wasmData, buildImports());

    const module = wasmInstance.instance.exports as {
        setDigest: (index: number, value: number) => void;
        powWorker: (target: number, startIndexLo: number, startIndexHi: number) => void;
        getNonceLo: () => number;
        getNonceHi: () => number;
    };

    for (let i = 0; i < powDigest.length; i++) {
        module.setDigest(i, powDigest[i]);
    }

    const startIndexLo = startIndex & BigInt(0xFFFFFFFF);
    const startIndexHigh = (startIndex >> BigInt(32)) & BigInt(0xFFFFFFFF);

    module.powWorker(targetZeros, Number(startIndexLo), Number(startIndexHigh));

    const nonceLo = module.getNonceLo();
    const nonceHigh = module.getNonceHi();

    return BigInt(nonceLo) | (BigInt(nonceHigh) << BigInt(32));
}

/**
 * Build the imports needed by AssemblyScript.
 * @returns The imports.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildImports(): any {
    const env = {
        abort: (msg: string, file: string, line: number, colm: number) => {
        },
        trace: (msg: string, n: number, ...args: unknown[]) => {
        },
        seed: Date.now
    };

    return {
        Math,
        Date,
        env
    };
}

if (workerData && parentPort) {
    doPow(workerData.powDigest, workerData.targetZeros, workerData.startIndex)
        .then(nonce => {
            if (parentPort) {
                parentPort.postMessage(nonce.toString());
            }
        })
        .catch(() => {
            process.exit(1);
        });
}
