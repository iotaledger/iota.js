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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const wasmInstance = await WebAssembly.instantiate(wasmData, buildImports());
    const module = wasmInstance.instance.exports;
    for (let i = 0; i < powDigest.length; i++) {
        module.setDigest(i, powDigest[i]);
    }
    const startIndexNum = BigInt(startIndex);
    const startIndexLo = startIndexNum & BigInt(0xffffffff);
    const startIndexHigh = (startIndexNum >> BigInt(32)) & BigInt(0xffffffff);
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
        abort: (msg, file, line, colm) => { },
        trace: (msg, n, ...args) => { },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FzbVBvd1dvcmtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy93YXNtUG93V29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDOUIsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxLQUFLLENBQUMsU0FBcUIsRUFBRSxXQUFtQixFQUFFLFVBQWtCO0lBQ3RGLE1BQU0sUUFBUSxHQUFHLE1BQU0sUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7SUFDN0YsaUVBQWlFO0lBQ2pFLE1BQU0sWUFBWSxHQUFHLE1BQU0sV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUU3RSxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BS3BDLENBQUM7SUFFRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN2QyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNyQztJQUVELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QyxNQUFNLFlBQVksR0FBRyxhQUFhLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hELE1BQU0sY0FBYyxHQUFHLENBQUMsYUFBYSxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUxRSxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFFNUUsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUV0QyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDNUUsQ0FBQztBQUVEOzs7R0FHRztBQUNILDhEQUE4RDtBQUM5RCxTQUFTLFlBQVk7SUFDakIsTUFBTSxHQUFHLEdBQUc7UUFDUixLQUFLLEVBQUUsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsRUFBRSxHQUFFLENBQUM7UUFDcEUsS0FBSyxFQUFFLENBQUMsR0FBVyxFQUFFLENBQVMsRUFBRSxHQUFHLElBQWUsRUFBRSxFQUFFLEdBQUUsQ0FBQztRQUN6RCxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUc7S0FDakIsQ0FBQztJQUVGLE9BQU87UUFDSCxJQUFJO1FBQ0osSUFBSTtRQUNKLEdBQUc7S0FDTixDQUFDO0FBQ04sQ0FBQztBQUVELElBQUksVUFBVSxJQUFJLFVBQVUsRUFBRTtJQUMxQixLQUFLLENBQUMsVUFBVSxDQUFDLFNBQXVCLEVBQUUsVUFBVSxDQUFDLFdBQXFCLEVBQUUsVUFBVSxDQUFDLFVBQW9CLENBQUM7U0FDdkcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ1YsSUFBSSxVQUFVLEVBQUU7WUFDWixVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQyxDQUFDO1NBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7Q0FDViJ9