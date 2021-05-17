"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doPow = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
const iota_js_1 = require("@iota/iota.js");
const worker_threads_1 = require("worker_threads");
/**
 * Perform the hash on the data until we reach target number of zeros.
 * @param powDigest The pow digest.
 * @param target The target number of zeros.
 * @param startIndex The index to start looking from.
 * @returns The nonce.
 */
function doPow(powDigest, target, startIndex) {
    return iota_js_1.PowHelper.performPow(powDigest, target, startIndex);
}
exports.doPow = doPow;
if (worker_threads_1.workerData && worker_threads_1.parentPort) {
    const nonce = doPow(worker_threads_1.workerData.powDigest, worker_threads_1.workerData.targetZeros, worker_threads_1.workerData.startIndex);
    worker_threads_1.parentPort.postMessage(nonce.toString());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZVBvd1dvcmtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ub2RlUG93V29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLDJDQUEwQztBQUMxQyxtREFBd0Q7QUFFeEQ7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsS0FBSyxDQUFDLFNBQXFCLEVBQUUsTUFBYyxFQUFFLFVBQWtCO0lBQzNFLE9BQU8sbUJBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUMvRCxDQUFDO0FBRkQsc0JBRUM7QUFFRCxJQUFJLDJCQUFVLElBQUksMkJBQVUsRUFBRTtJQUMxQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsMkJBQVUsQ0FBQyxTQUFTLEVBQUUsMkJBQVUsQ0FBQyxXQUFXLEVBQUUsMkJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RiwyQkFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztDQUM1QyJ9