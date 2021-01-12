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
var textHelper_1 = require("../utils/textHelper");
var writeStream_1 = require("../utils/writeStream");
/**
 * Send a transfer from the balance on the seed.
 * @param client The client to send the transfer with.
 * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
 * @param outputs The outputs to send.
 * @param indexationKey Optional indexation key.
 * @param indexationData Optional index data.
 * @returns The id of the message created and the remainder address if one was needed.
 */
function sendAdvanced(client, inputsAndSignatureKeyPairs, outputs, indexationKey, indexationData) {
    return __awaiter(this, void 0, void 0, function () {
        var transactionPayload, message, messageId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transactionPayload = buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, indexationKey, indexationData);
                    message = {
                        payload: transactionPayload
                    };
                    return [4 /*yield*/, client.messageSubmit(message)];
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
 * @param indexationKey Optional indexation key.
 * @param indexationData Optional index data.
 * @returns The transaction payload.
 */
function buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, indexationKey, indexationData) {
    if (!inputsAndSignatureKeyPairs || inputsAndSignatureKeyPairs.length === 0) {
        throw new Error("You must specify some inputs");
    }
    if (!outputs || outputs.length === 0) {
        throw new Error("You must specify some outputs");
    }
    if (indexationKey) {
        if (indexationKey.length < payload_1.MIN_INDEXATION_KEY_LENGTH) {
            throw new Error("The indexation key length is " + indexationKey.length + ", which is below the minimum size of " + payload_1.MIN_INDEXATION_KEY_LENGTH);
        }
        if (indexationKey.length > payload_1.MAX_INDEXATION_KEY_LENGTH) {
            throw new Error("The indexation key length is " + indexationKey.length + ", which exceeds the maximum size of " + payload_1.MAX_INDEXATION_KEY_LENGTH);
        }
        if (!textHelper_1.TextHelper.isUTF8(indexationKey)) {
            throw new Error("The indexationKey can only contain UTF8 characters");
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
        payload: indexationKey
            ? {
                type: IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE,
                index: indexationKey,
                data: indexationData ? converter_1.Converter.bytesToHex(indexationData) : ""
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEFkdmFuY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9zZW5kQWR2YW5jZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLHlDQUFpRDtBQUNqRCwyQ0FBbUQ7QUFDbkQsNkNBQXlGO0FBQ3pGLHFEQUFvRTtBQUNwRSw2Q0FBNEM7QUFFNUMsNkRBQWlFO0FBQ2pFLGlFQUFxRTtBQUNyRSxtRUFBdUU7QUFHdkUseUVBQXFHO0FBQ3JHLHlGQUErSDtBQUMvSCwyRUFBeUc7QUFDekcseUVBQXFHO0FBQ3JHLHFFQUE4RjtBQUM5RixxRUFBOEY7QUFFOUYsZ0RBQStDO0FBQy9DLGtEQUFpRDtBQUNqRCxvREFBbUQ7QUFFbkQ7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFzQixZQUFZLENBQzlCLE1BQWUsRUFDZiwwQkFHRyxFQUNILE9BS0csRUFDSCxhQUFzQixFQUN0QixjQUEyQjs7Ozs7O29CQUlyQixrQkFBa0IsR0FBRyx1QkFBdUIsQ0FDOUMsMEJBQTBCLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFFbEUsT0FBTyxHQUFhO3dCQUN0QixPQUFPLEVBQUUsa0JBQWtCO3FCQUM5QixDQUFDO29CQUVnQixxQkFBTSxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFBOztvQkFBL0MsU0FBUyxHQUFHLFNBQW1DO29CQUVyRCxzQkFBTzs0QkFDSCxTQUFTLFdBQUE7NEJBQ1QsT0FBTyxTQUFBO3lCQUNWLEVBQUM7Ozs7Q0FDTDtBQTlCRCxvQ0E4QkM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsdUJBQXVCLENBQ25DLDBCQUdHLEVBQ0gsT0FLRyxFQUNILGFBQXNCLEVBQ3RCLGNBQTJCO0lBQzNCLElBQUksQ0FBQywwQkFBMEIs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