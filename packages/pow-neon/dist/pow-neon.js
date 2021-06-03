'use strict';

var require$$0 = require('os');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var es = {};

var neonPowProvider = {};

var index$1 = require("./native/index.node");

var native = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': index$1
});

var require$$1 = /*@__PURE__*/getAugmentedNamespace(native);

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
Object.defineProperty(neonPowProvider, "__esModule", { value: true });
neonPowProvider.NeonPowProvider = void 0;
const os_1 = __importDefault(require$$0__default['default']);
const index_1 = __importDefault(require$$1);
/**
 * Neon POW Provider.
 */
class NeonPowProvider {
    /**
     * Create a new instance of NeonPowProvider.
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
            const nonceArr = index_1.default.doPow(powRelevantData.buffer, targetScore, this._numCpus);
            return BigInt(nonceArr[0]) | (BigInt(nonceArr[1]) << BigInt(32));
        });
    }
}
neonPowProvider.NeonPowProvider = NeonPowProvider;

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
__exportStar(neonPowProvider, exports);

}(es));

var index = /*@__PURE__*/getDefaultExportFromCjs(es);

module.exports = index;
