"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doPow = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const worker_threads_1 = require("worker_threads");
/**
 * Perform the hash on the data until we reach target number of zeros.
 * @param powDigest The pow digest.
 * @param targetZeros The target number of zeros.
 * @param startIndex The index to start looking from.
 * @returns The nonce.
 */
function doPow(powDigest, targetZeros, startIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        const wasmData = yield fs_1.promises.readFile(path_1.default.join(__dirname, "../wasm/build/release.wasm"));
        const wasmInstance = yield WebAssembly.instantiate(wasmData, buildImports());
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
    });
}
exports.doPow = doPow;
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
if (worker_threads_1.workerData && worker_threads_1.parentPort) {
    doPow(worker_threads_1.workerData.powDigest, worker_threads_1.workerData.targetZeros, worker_threads_1.workerData.startIndex)
        .then(nonce => {
        if (worker_threads_1.parentPort) {
            worker_threads_1.parentPort.postMessage(nonce.toString());
        }
    })
        .catch(() => {
        process.exit(1);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FzbVBvd1dvcmtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy93YXNtUG93V29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLDJCQUE4QjtBQUM5QixnREFBd0I7QUFDeEIsbURBQXdEO0FBRXhEOzs7Ozs7R0FNRztBQUNILFNBQXNCLEtBQUssQ0FBQyxTQUFxQixFQUFFLFdBQW1CLEVBQUUsVUFBa0I7O1FBQ3RGLE1BQU0sUUFBUSxHQUFHLE1BQU0sYUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7UUFDN0YsTUFBTSxZQUFZLEdBQUcsTUFBTSxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRTdFLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FLcEMsQ0FBQztRQUVGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsTUFBTSxZQUFZLEdBQUcsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRCxNQUFNLGNBQWMsR0FBRyxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdkUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBRTVFLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFdEMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUFBO0FBeEJELHNCQXdCQztBQUVEOzs7R0FHRztBQUNILDhEQUE4RDtBQUM5RCxTQUFTLFlBQVk7SUFDakIsTUFBTSxHQUFHLEdBQUc7UUFDUixLQUFLLEVBQUUsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsRUFBRTtRQUNqRSxDQUFDO1FBQ0QsS0FBSyxFQUFFLENBQUMsR0FBVyxFQUFFLENBQVMsRUFBRSxHQUFHLElBQWUsRUFBRSxFQUFFO1FBQ3RELENBQUM7UUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUc7S0FDakIsQ0FBQztJQUVGLE9BQU87UUFDSCxJQUFJO1FBQ0osSUFBSTtRQUNKLEdBQUc7S0FDTixDQUFDO0FBQ04sQ0FBQztBQUVELElBQUksMkJBQVUsSUFBSSwyQkFBVSxFQUFFO0lBQzFCLEtBQUssQ0FBQywyQkFBVSxDQUFDLFNBQVMsRUFBRSwyQkFBVSxDQUFDLFdBQVcsRUFBRSwyQkFBVSxDQUFDLFVBQVUsQ0FBQztTQUNyRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDVixJQUFJLDJCQUFVLEVBQUU7WUFDWiwyQkFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxHQUFHLEVBQUU7UUFDUixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0NBQ1YifQ==