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
exports.NodePowProvider = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const iota_js_1 = require("@iota/iota.js");
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const worker_threads_1 = require("worker_threads");
/**
 * Node POW Provider.
 */
class NodePowProvider {
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
                    const worker = new worker_threads_1.Worker(path_1.default.join(__dirname, "pow-node.js"), {
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
exports.NodePowProvider = NodePowProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZVBvd1Byb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL25vZGVQb3dQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLDJDQUFpRTtBQUNqRSw0Q0FBb0I7QUFDcEIsZ0RBQXdCO0FBQ3hCLG1EQUF3QztBQUV4Qzs7R0FFRztBQUNILE1BQWEsZUFBZTtJQU94Qjs7O09BR0c7SUFDSCxZQUFZLE9BQWdCO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksWUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxHQUFHLENBQUMsT0FBbUIsRUFBRSxXQUFtQjs7WUFDckQsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU3QyxNQUFNLFNBQVMsR0FBRyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUVsRCxNQUFNLFdBQVcsR0FBRyxtQkFBUyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztZQUV6RSxPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUMzQyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN2RSxNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7Z0JBQzdCLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUksdUJBQU0sQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsRUFBRTt3QkFDM0QsVUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtxQkFDNUUsQ0FBQyxDQUFDO29CQUVILE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRXJCLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQU0sR0FBRyxFQUFDLEVBQUU7d0JBQzdCLFdBQVcsR0FBRyxJQUFJLENBQUM7d0JBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUNyQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQzt5QkFDaEM7d0JBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN6QixDQUFDLENBQUEsQ0FBQyxDQUFDO29CQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO3dCQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hCLENBQUMsQ0FBQyxDQUFDO29CQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO3dCQUNyQixJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7NEJBQzVCLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUM5RDtvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDTjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0NBQ0o7QUEzREQsMENBMkRDIn0=