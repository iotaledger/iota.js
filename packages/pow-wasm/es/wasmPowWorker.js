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
export async function doPow(powDigest, targetZeros, startIndex) {
    const wasmData = await promises.readFile(path.join(__dirname, "../wasm/build/release.wasm"));
    const wasmInstance = await WebAssembly.instantiate(wasmData, buildImports());
    const module = wasmInstance.instance.exports;
    for (let i = 0; i < powDigest.length; i++) {
        module.setDigest(i, powDigest[i]);
    }
    const startIndexNum = BigInt(startIndex);
    const startIndexLo = startIndexNum & BigInt(0xFFFFFFFF);
    const startIndexHigh = (startIndexNum >> BigInt(32)) & BigInt(0xFFFFFFFF);
    module.powWorker(targetZeros, Number(startIndexLo), Number(startIndexHigh));
    const nonceLo = module.getNonceLo();
    const nonceHigh = module.getNonceHi();
    return (BigInt(nonceLo) | (BigInt(nonceHigh) << BigInt(32))).toString();
}
/**
 * Build the imports needed by AssemblyScript.
 * @returns The imports.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildImports() {
    const env = {
        abort: (msg, file, line, colm) => {
        },
        trace: (msg, n, ...args) => {
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
            parentPort.postMessage(nonce);
        }
    })
        .catch(() => {
        process.exit(1);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FzbVBvd1dvcmtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy93YXNtUG93V29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDOUIsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxLQUFLLENBQUMsU0FBcUIsRUFBRSxXQUFtQixFQUFFLFVBQWtCO0lBQ3RGLE1BQU0sUUFBUSxHQUFHLE1BQU0sUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7SUFDN0YsTUFBTSxZQUFZLEdBQUcsTUFBTSxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBRTdFLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FLcEMsQ0FBQztJQUVGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JDO0lBRUQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sWUFBWSxHQUFHLGFBQWEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEQsTUFBTSxjQUFjLEdBQUcsQ0FBQyxhQUFhLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRTFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUU1RSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBRXRDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUM1RSxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsOERBQThEO0FBQzlELFNBQVMsWUFBWTtJQUNqQixNQUFNLEdBQUcsR0FBRztRQUNSLEtBQUssRUFBRSxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxFQUFFO1FBQ2pFLENBQUM7UUFDRCxLQUFLLEVBQUUsQ0FBQyxHQUFXLEVBQUUsQ0FBUyxFQUFFLEdBQUcsSUFBZSxFQUFFLEVBQUU7UUFDdEQsQ0FBQztRQUNELElBQUksRUFBRSxJQUFJLENBQUMsR0FBRztLQUNqQixDQUFDO0lBRUYsT0FBTztRQUNILElBQUk7UUFDSixJQUFJO1FBQ0osR0FBRztLQUNOLENBQUM7QUFDTixDQUFDO0FBRUQsSUFBSSxVQUFVLElBQUksVUFBVSxFQUFFO0lBQzFCLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQztTQUNyRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDVixJQUFJLFVBQVUsRUFBRTtZQUNaLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsR0FBRyxFQUFFO1FBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztDQUNWIn0=