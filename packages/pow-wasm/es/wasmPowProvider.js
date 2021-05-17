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
exports.WasmPowProvider = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
const iota_js_1 = require("@iota/iota.js");
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const worker_threads_1 = require("worker_threads");
/**
 * Wasm POW Provider.
 */
class WasmPowProvider {
    /**
     * Create a new instance of NodePowProvider.
     * @param numCpus The number of cpus, defaults to max CPUs.
     */
    constructor(numCpus) {
        this._numCpus = numCpus !== null && numCpus !== void 0 ? numCpus : os_1.default.cpus().length;
    }
    /**
     * Perform pow on the message and return the nonce of at least targetScore.
     * @param message The message to process.
     * @param targetScore the target score.
     * @returns The nonce.
     */
    pow(message, targetScore) {
        return __awaiter(this, void 0, void 0, function* () {
            const powRelevantData = message.slice(0, -8);
            const powDigest = iota_js_1.Blake2b.sum256(powRelevantData);
            const targetZeros = iota_js_1.PowHelper.calculateTargetZeros(message, targetScore);
            return new Promise((resolve, reject) => {
                const chunkSize = BigInt(18446744073709551615) / BigInt(this._numCpus);
                const workers = [];
                let hasFinished = false;
                for (let i = 0; i < this._numCpus; i++) {
                    const worker = new worker_threads_1.Worker(path_1.default.join(__dirname, "pow-wasm.js"), {
                        workerData: { powDigest, targetZeros, startIndex: chunkSize * BigInt(i) }
                    });
                    workers.push(worker);
                    worker.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
                        hasFinished = true;
                        for (let j = 0; j < workers.length; j++) {
                            yield workers[j].terminate();
                        }
                        resolve(BigInt(msg));
                    }));
                    worker.on("error", err => {
                        reject(err);
                    });
                    worker.on("exit", code => {
                        if (!hasFinished && code !== 0) {
                            reject(new Error(`Worker stopped with exit code ${code}`));
                        }
                    });
                }
            });
        });
    }
}
exports.WasmPowProvider = WasmPowProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FzbVBvd1Byb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dhc21Qb3dQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQiwyQ0FBaUU7QUFDakUsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUN4QixtREFBd0M7QUFFeEM7O0dBRUc7QUFDSCxNQUFhLGVBQWU7SUFPeEI7OztPQUdHO0lBQ0gsWUFBWSxPQUFnQjtRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLFlBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1UsR0FBRyxDQUFDLE9BQW1CLEVBQUUsV0FBbUI7O1lBQ3JELE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0MsTUFBTSxTQUFTLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFbEQsTUFBTSxXQUFXLEdBQUcsbUJBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFFekUsT0FBTyxJQUFJLE9BQU8sQ0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDM0MsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdkUsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO2dCQUM3QixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNwQyxNQUFNLE1BQU0sR0FBRyxJQUFJLHVCQUFNLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLEVBQUU7d0JBQzNELFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7cUJBQzVFLENBQUMsQ0FBQztvQkFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUVyQixNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFNLEdBQUcsRUFBQyxFQUFFO3dCQUM3QixXQUFXLEdBQUcsSUFBSSxDQUFDO3dCQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDckMsTUFBTSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7eUJBQ2hDO3dCQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDekIsQ0FBQyxDQUFBLENBQUMsQ0FBQztvQkFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTt3QkFDckIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixDQUFDLENBQUMsQ0FBQztvQkFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTt3QkFDckIsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFOzRCQUM1QixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsaUNBQWlDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDOUQ7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtDQUNKO0FBM0RELDBDQTJEQyJ9