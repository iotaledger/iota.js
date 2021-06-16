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
            parentPort.postMessage(nonce.toString());
        }
    })
        .catch(() => {
        process.exit(1);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FzbVBvd1dvcmtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy93YXNtUG93V29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDOUIsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxLQUFLLENBQUMsU0FBcUIsRUFBRSxXQUFtQixFQUFFLFVBQWtCO0lBQ3RGLE1BQU0sUUFBUSxHQUFHLE1BQU0sUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7SUFDN0YsTUFBTSxZQUFZLEdBQUcsTUFBTSxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBRTdFLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FLcEMsQ0FBQztJQUVGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JDO0lBRUQsTUFBTSxZQUFZLEdBQUcsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyRCxNQUFNLGNBQWMsR0FBRyxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFdkUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBRTVFLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7SUFFdEMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUVEOzs7R0FHRztBQUNILDhEQUE4RDtBQUM5RCxTQUFTLFlBQVk7SUFDakIsTUFBTSxHQUFHLEdBQUc7UUFDUixLQUFLLEVBQUUsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsRUFBRTtRQUNqRSxDQUFDO1FBQ0QsS0FBSyxFQUFFLENBQUMsR0FBVyxFQUFFLENBQVMsRUFBRSxHQUFHLElBQWUsRUFBRSxFQUFFO1FBQ3RELENBQUM7UUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUc7S0FDakIsQ0FBQztJQUVGLE9BQU87UUFDSCxJQUFJO1FBQ0osSUFBSTtRQUNKLEdBQUc7S0FDTixDQUFDO0FBQ04sQ0FBQztBQUVELElBQUksVUFBVSxJQUFJLFVBQVUsRUFBRTtJQUMxQixLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUM7U0FDckUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ1YsSUFBSSxVQUFVLEVBQUU7WUFDWixVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQyxDQUFDO1NBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7Q0FDViJ9