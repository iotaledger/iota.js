"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTransactionPayload = exports.sendAdvanced = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var input_1 = require("../binary/input");
var output_1 = require("../binary/output");
var payload_1 = require("../binary/payload");
var transaction_1 = require("../binary/transaction");
var singleNodeClient_1 = require("../clients/singleNodeClient");
var ed25519_1 = require("../crypto/ed25519");
var IEd25519Address_1 = require("../models/IEd25519Address");
var IEd25519Signature_1 = require("../models/IEd25519Signature");
var IIndexationPayload_1 = require("../models/IIndexationPayload");
var IReferenceUnlockBlock_1 = require("../models/IReferenceUnlockBlock");
var ISigLockedDustAllowanceOutput_1 = require("../models/ISigLockedDustAllowanceOutput");
var ISigLockedSingleOutput_1 = require("../models/ISigLockedSingleOutput");
var ISignatureUnlockBlock_1 = require("../models/ISignatureUnlockBlock");
var ITransactionEssence_1 = require("../models/ITransactionEssence");
var ITransactionPayload_1 = require("../models/ITransactionPayload");
var converter_1 = require("../utils/converter");
var writeStream_1 = require("../utils/writeStream");
/**
 * Send a transfer from the balance on the seed.
 * @param client The client or node endpoint to send the transfer with.
 * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
 * @param outputs The outputs to send.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @returns The id of the message created and the remainder address if one was needed.
 */
function sendAdvanced(client, inputsAndSignatureKeyPairs, outputs, indexation) {
    return __awaiter(this, void 0, void 0, function () {
        var localClient, transactionPayload, message, messageId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
                    transactionPayload = buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, indexation);
                    message = {
                        payload: transactionPayload
                    };
                    return [4 /*yield*/, localClient.messageSubmit(message)];
                case 1:
                    messageId = _a.sent();
                    return [2 /*return*/, {
                            messageId: messageId,
                            message: message
                        }];
            }
        });
    });
}
exports.sendAdvanced = sendAdvanced;
/**
 * Build a transaction payload.
 * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
 * @param outputs The outputs to send.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @returns The transaction payload.
 */
function buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, indexation) {
    if (!inputsAndSignatureKeyPairs || inputsAndSignatureKeyPairs.length === 0) {
        throw new Error("You must specify some inputs");
    }
    if (!outputs || outputs.length === 0) {
        throw new Error("You must specify some outputs");
    }
    if (indexation === null || indexation === void 0 ? void 0 : indexation.key) {
        if (indexation.key.length < payload_1.MIN_INDEXATION_KEY_LENGTH) {
            throw new Error("The indexation key length is " + indexation.key.length + ", which is below the minimum size of " + payload_1.MIN_INDEXATION_KEY_LENGTH);
        }
        if (indexation.key.length > payload_1.MAX_INDEXATION_KEY_LENGTH) {
            throw new Error("The indexation key length is " + indexation.key.length + ", which exceeds the maximum size of " + payload_1.MAX_INDEXATION_KEY_LENGTH);
        }
    }
    var outputsWithSerialization = [];
    for (var _i = 0, outputs_1 = outputs; _i < outputs_1.length; _i++) {
        var output = outputs_1[_i];
        if (output.addressType === IEd25519Address_1.ED25519_ADDRESS_TYPE) {
            var o = {
                type: output.isDustAllowance ? ISigLockedDustAllowanceOutput_1.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE : ISigLockedSingleOutput_1.SIG_LOCKED_SINGLE_OUTPUT_TYPE,
                address: {
                    type: output.addressType,
                    address: output.address
                },
                amount: output.amount
            };
            var writeStream = new writeStream_1.WriteStream();
            output_1.serializeOutput(writeStream, o);
            outputsWithSerialization.push({
                output: o,
                serialized: writeStream.finalHex()
            });
        }
        else {
            throw new Error("Unrecognized output address type " + output.addressType);
        }
    }
    var inputsAndSignatureKeyPairsSerialized = inputsAndSignatureKeyPairs.map(function (i) {
        var writeStream = new writeStream_1.WriteStream();
        input_1.serializeInput(writeStream, i.input);
        return __assign(__assign({}, i), { serialized: writeStream.finalHex() });
    });
    // Lexigraphically sort the inputs and outputs
    var sortedInputs = inputsAndSignatureKeyPairsSerialized.sort(function (a, b) { return a.serialized.localeCompare(b.serialized); });
    var sortedOutputs = outputsWithSerialization.sort(function (a, b) { return a.serialized.localeCompare(b.serialized); });
    var transactionEssence = {
        type: ITransactionEssence_1.TRANSACTION_ESSENCE_TYPE,
        inputs: sortedInputs.map(function (i) { return i.input; }),
        outputs: sortedOutputs.map(function (o) { return o.output; }),
        payload: indexation
            ? {
                type: IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE,
                index: indexation.key,
                data: indexation.data ? converter_1.Converter.bytesToHex(indexation.data) : ""
            }
            : undefined
    };
    var binaryEssence = new writeStream_1.WriteStream();
    transaction_1.serializeTransactionEssence(binaryEssence, transactionEssence);
    var essenceFinal = binaryEssence.finalBytes();
    // Create the unlock blocks
    var unlockBlocks = [];
    var addressToUnlockBlock = {};
    for (var _a = 0, sortedInputs_1 = sortedInputs; _a < sortedInputs_1.length; _a++) {
        var input = sortedInputs_1[_a];
        var hexInputAddressPublic = converter_1.Converter.bytesToHex(input.addressKeyPair.publicKey);
        if (addressToUnlockBlock[hexInputAddressPublic]) {
            unlockBlocks.push({
                type: IReferenceUnlockBlock_1.REFERENCE_UNLOCK_BLOCK_TYPE,
                reference: addressToUnlockBlock[hexInputAddressPublic].unlockIndex
            });
        }
        else {
            unlockBlocks.push({
                type: ISignatureUnlockBlock_1.SIGNATURE_UNLOCK_BLOCK_TYPE,
                signature: {
                    type: IEd25519Signature_1.ED25519_SIGNATURE_TYPE,
                    publicKey: hexInputAddressPublic,
                    signature: converter_1.Converter.bytesToHex(ed25519_1.Ed25519.sign(input.addressKeyPair.privateKey, essenceFinal))
                }
            });
            addressToUnlockBlock[hexInputAddressPublic] = {
                keyPair: input.addressKeyPair,
                unlockIndex: unlockBlocks.length - 1
            };
        }
    }
    var transactionPayload = {
        type: ITransactionPayload_1.TRANSACTION_PAYLOAD_TYPE,
        essence: transactionEssence,
        unlockBlocks: unlockBlocks
    };
    return transactionPayload;
}
exports.buildTransactionPayload = buildTransactionPayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEFkdmFuY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9zZW5kQWR2YW5jZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLHlDQUFpRDtBQUNqRCwyQ0FBbUQ7QUFDbkQsNkNBQXlGO0FBQ3pGLHFEQUFvRTtBQUNwRSxnRUFBK0Q7QUFDL0QsNkNBQTRDO0FBRTVDLDZEQUFpRTtBQUNqRSxpRUFBcUU7QUFDckUsbUVBQXVFO0FBR3ZFLHlFQUFxRztBQUNyRyx5RkFBK0g7QUFDL0gsMkVBQXlHO0FBQ3pHLHlFQUFxRztBQUNyRyxxRUFBOEY7QUFDOUYscUVBQThGO0FBRTlGLGdEQUErQztBQUMvQyxvREFBbUQ7QUFFbkQ7Ozs7Ozs7OztHQVNHO0FBQ0gsU0FBc0IsWUFBWSxDQUM5QixNQUF3QixFQUN4QiwwQkFHRyxFQUNILE9BS0csRUFDSCxVQUdDOzs7Ozs7b0JBSUssV0FBVyxHQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO29CQUVqRixrQkFBa0IsR0FBRyx1QkFBdUIsQ0FDOUMsMEJBQTBCLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUUvQyxPQUFPLEdBQWE7d0JBQ3RCLE9BQU8sRUFBRSxrQkFBa0I7cUJBQzlCLENBQUM7b0JBRWdCLHFCQUFNLFdBQVcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUE7O29CQUFwRCxTQUFTLEdBQUcsU0FBd0M7b0JBRTFELHNCQUFPOzRCQUNILFNBQVMsV0FBQTs0QkFDVCxPQUFPLFNBQUE7eUJBQ1YsRUFBQzs7OztDQUNMO0FBbENELG9DQWtDQztBQUVEOzs7Ozs7OztHQVFHO0FB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