'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var os = require('os');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var os__default = /*#__PURE__*/_interopDefaultLegacy(os);

var module$1 = require("./native/index.node");

/**
 * Neon POW Provider.
 */
class NeonPowProvider {
    /**
     * Create a new instance of NeonPowProvider.
     * @param numCpus The number of cpus, defaults to max CPUs.
     */
    constructor(numCpus) {
        this._numCpus = numCpus !== null && numCpus !== void 0 ? numCpus : os__default['default'].cpus().length;
    }
    /**
     * Perform pow on the message and return the nonce of at least targetScore.
     * @param message The message to process.
     * @param targetScore The target score.
     * @returns The nonce.
     */
    async pow(message, targetScore) {
        const powRelevantData = message.slice(0, -8);
        const nonceArr = module$1.doPow(powRelevantData.buffer, targetScore, this._numCpus);
        return BigInt(nonceArr[0]) | (BigInt(nonceArr[1]) << BigInt(32));
    }
}

exports.NeonPowProvider = NeonPowProvider;
