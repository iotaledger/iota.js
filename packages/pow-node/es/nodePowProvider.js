// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Blake2b } from "@iota/crypto.js";
import { PowHelper } from "@iota/iota.js";
import os from "os";
import path from "path";
import { Worker } from "worker_threads";
/**
 * Node POW Provider.
 */
export class NodePowProvider {
    /**
     * Create a new instance of NodePowProvider.
     * @param numCpus The number of cpus, defaults to max CPUs.
     */
    constructor(numCpus) {
        this._numCpus = numCpus !== null && numCpus !== void 0 ? numCpus : os.cpus().length;
    }
    /**
     * Perform pow on the message and return the nonce of at least targetScore.
     * @param message The message to process.
     * @param targetScore The target score.
     * @returns The nonce.
     */
    async pow(message, targetScore) {
        const powRelevantData = message.slice(0, -8);
        const powDigest = Blake2b.sum256(powRelevantData);
        const targetZeros = PowHelper.calculateTargetZeros(message, targetScore);
        return new Promise((resolve, reject) => {
            const chunkSize = BigInt("18446744073709551615") / BigInt(this._numCpus);
            const workers = [];
            let hasFinished = false;
            for (let i = 0; i < this._numCpus; i++) {
                const worker = new Worker(path.join(__dirname, "pow-node.js"), {
                    workerData: { powDigest, targetZeros, startIndex: (chunkSize * BigInt(i)).toString() }
                });
                workers.push(worker);
                worker.on("message", async (msg) => {
                    hasFinished = true;
                    for (let j = 0; j < workers.length; j++) {
                        await workers[j].terminate();
                    }
                    resolve(msg);
                });
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZVBvd1Byb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL25vZGVQb3dQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxQyxPQUFPLEVBQWdCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDcEIsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4Qzs7R0FFRztBQUNILE1BQU0sT0FBTyxlQUFlO0lBT3hCOzs7T0FHRztJQUNILFlBQVksT0FBZ0I7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ2hELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBbUIsRUFBRSxXQUFtQjtRQUNyRCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFbEQsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUV6RSxPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekUsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO1lBQzdCLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDcEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLEVBQUU7b0JBQzNELFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2lCQUN6RixDQUFDLENBQUM7Z0JBRUgsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFckIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQVcsRUFBRSxFQUFFO29CQUN2QyxXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDckMsTUFBTSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7cUJBQ2hDO29CQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTt3QkFDNUIsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGlDQUFpQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQzlEO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSiJ9