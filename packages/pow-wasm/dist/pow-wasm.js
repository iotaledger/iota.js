'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var iota_js = require('@iota/iota.js');
var os = require('os');
var path = require('path');
var worker_threads = require('worker_threads');
var fs = require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

// Copyright 2020 IOTA Stiftung
/**
 * Wasm POW Provider.
 */
class WasmPowProvider {
    /**
     * Create a new instance of NodePowProvider.
     * @param numCpus The number of cpus, defaults to max CPUs.
     */
    constructor(numCpus) {
        this._numCpus = numCpus !== null && numCpus !== void 0 ? numCpus : os__default["default"].cpus().length;
    }
    /**
     * Perform pow on the message and return the nonce of at least targetScore.
     * @param message The message to process.
     * @param targetScore The target score.
     * @returns The nonce.
     */
    async pow(message, targetScore) {
        const powRelevantData = message.slice(0, -8);
        const powDigest = iota_js.Blake2b.sum256(powRelevantData);
        const targetZeros = iota_js.PowHelper.calculateTargetZeros(message, targetScore);
        return new Promise((resolve, reject) => {
            const chunkSize = BigInt(18446744073709551615) / BigInt(this._numCpus);
            const workers = [];
            let hasFinished = false;
            for (let i = 0; i < this._numCpus; i++) {
                const worker = new worker_threads.Worker(path__default["default"].join(__dirname, "pow-wasm.js"), {
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

// Copyright 2020 IOTA Stiftung
/**
 * Perform the hash on the data until we reach target number of zeros.
 * @param powDigest The pow digest.
 * @param targetZeros The target number of zeros.
 * @param startIndex The index to start looking from.
 * @returns The nonce.
 */
async function doPow(powDigest, targetZeros, startIndex) {
    const wasmData = await fs.promises.readFile(path__default["default"].join(__dirname, "../wasm/build/release.wasm"));
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
if (worker_threads.workerData && worker_threads.parentPort) {
    doPow(worker_threads.workerData.powDigest, worker_threads.workerData.targetZeros, worker_threads.workerData.startIndex)
        .then(nonce => {
        if (worker_threads.parentPort) {
            worker_threads.parentPort.postMessage(nonce);
        }
    })
        .catch(() => {
        process.exit(1);
    });
}

exports.WasmPowProvider = WasmPowProvider;
exports.doPow = doPow;
