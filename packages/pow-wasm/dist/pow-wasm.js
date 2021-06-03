'use strict';

var require$$0 = require('@iota/iota.js');
var require$$1 = require('os');
var require$$2 = require('path');
var require$$3 = require('worker_threads');
var require$$0$1 = require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var es = {};

var wasmPowProvider = {};

var __awaiter$1 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault$1 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(wasmPowProvider, "__esModule", { value: true });
wasmPowProvider.WasmPowProvider = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
const iota_js_1 = require$$0__default['default'];
const os_1 = __importDefault$1(require$$1__default['default']);
const path_1$1 = __importDefault$1(require$$2__default['default']);
const worker_threads_1$1 = require$$3__default['default'];
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
        return __awaiter$1(this, void 0, void 0, function* () {
            const powRelevantData = message.slice(0, -8);
            const powDigest = iota_js_1.Blake2b.sum256(powRelevantData);
            const targetZeros = iota_js_1.PowHelper.calculateTargetZeros(message, targetScore);
            return new Promise((resolve, reject) => {
                const chunkSize = BigInt(18446744073709551615) / BigInt(this._numCpus);
                const workers = [];
                let hasFinished = false;
                for (let i = 0; i < this._numCpus; i++) {
                    const worker = new worker_threads_1$1.Worker(path_1$1.default.join(__dirname, "pow-wasm.js"), {
                        workerData: { powDigest, targetZeros, startIndex: chunkSize * BigInt(i) }
                    });
                    workers.push(worker);
                    worker.on("message", (msg) => __awaiter$1(this, void 0, void 0, function* () {
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
wasmPowProvider.WasmPowProvider = WasmPowProvider;

var wasmPowWorker = {};

var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(wasmPowWorker, "__esModule", { value: true });
wasmPowWorker.doPow = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
const fs_1 = require$$0__default$1['default'];
const path_1 = __importDefault(require$$2__default['default']);
const worker_threads_1 = require$$3__default['default'];
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
wasmPowWorker.doPow = doPow;
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

(function (exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
__exportStar(wasmPowProvider, exports);
__exportStar(wasmPowWorker, exports);

}(es));

var index = /*@__PURE__*/getDefaultExportFromCjs(es);

module.exports = index;
