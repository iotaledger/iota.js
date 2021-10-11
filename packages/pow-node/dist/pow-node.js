'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var crypto_js = require('@iota/crypto.js');
var iota_js = require('@iota/iota.js');
var os = require('os');
var path = require('path');
var worker_threads = require('worker_threads');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

// Copyright 2020 IOTA Stiftung
/**
 * Node POW Provider.
 */
class NodePowProvider {
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
        const powDigest = crypto_js.Blake2b.sum256(powRelevantData);
        const targetZeros = iota_js.PowHelper.calculateTargetZeros(message, targetScore);
        return new Promise((resolve, reject) => {
            const chunkSize = BigInt(18446744073709551615) / BigInt(this._numCpus);
            const workers = [];
            let hasFinished = false;
            for (let i = 0; i < this._numCpus; i++) {
                const worker = new worker_threads.Worker(path__default["default"].join(__dirname, "pow-node.js"), {
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
function doPow(powDigest, targetZeros, startIndex) {
    return iota_js.PowHelper.performPow(powDigest, targetZeros, startIndex);
}
if (worker_threads.workerData && worker_threads.parentPort) {
    const nonce = doPow(worker_threads.workerData.powDigest, worker_threads.workerData.targetZeros, worker_threads.workerData.startIndex);
    worker_threads.parentPort.postMessage(nonce);
}

exports.NodePowProvider = NodePowProvider;
exports.doPow = doPow;
