"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFLICT_REASON_STRINGS = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var conflictReason_1 = require("../models/conflictReason");
/**
 * Conflict reason strings.
 */
exports.CONFLICT_REASON_STRINGS = (_a = {},
    _a[conflictReason_1.ConflictReason.none] = "Not conflicting",
    _a[conflictReason_1.ConflictReason.inputUTXOAlreadySpent] = "The referenced UTXO was already spent",
    _a[conflictReason_1.ConflictReason.inputUTXOAlreadySpentInThisMilestone] = "The referenced UTXO was already spent while confirming this milestone",
    _a[conflictReason_1.ConflictReason.inputUTXONotFound] = "The referenced UTXO cannot be found",
    _a[conflictReason_1.ConflictReason.inputOutputSumMismatch] = "The sum of the inputs and output values does not match",
    _a[conflictReason_1.ConflictReason.invalidSignature] = "The unlock block signature is invalid",
    _a[conflictReason_1.ConflictReason.unsupportedInputOrOutputType] = "The input or output type used is unsupported",
    _a[conflictReason_1.ConflictReason.unsupportedAddressType] = "The address type used is unsupported",
    _a[conflictReason_1.ConflictReason.semanticValidationFailed] = "The semantic validation failed",
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmxpY3RSZWFzb25TdHJpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Jlc291cmNlcy9jb25mbGljdFJlYXNvblN0cmluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsMkRBQTBEO0FBRTFEOztHQUVHO0FBQ1UsUUFBQSx1QkFBdUI7SUFDaEMsR0FBQywrQkFBYyxDQUFDLElBQUksSUFBRyxpQkFBaUI7SUFDeEMsR0FBQywrQkFBYyxDQUFDLHFCQUFxQixJQUFHLHVDQUF1QztJQUMvRSxHQUFDLCtCQUFjLENBQUMsb0NBQW9DLElBQ2hELHVFQUF1RTtJQUMzRSxHQUFDLCtCQUFjLENBQUMsaUJBQWlCLElBQUcscUNBQXFDO0lBQ3pFLEdBQUMsK0JBQWMsQ0FBQyxzQkFBc0IsSUFBRyx3REFBd0Q7SUFDakcsR0FBQywrQkFBYyxDQUFDLGdCQUFnQixJQUFHLHVDQUF1QztJQUMxRSxHQUFDLCtCQUFjLENBQUMsNEJBQTRCLElBQUcsOENBQThDO0lBQzdGLEdBQUMsK0JBQWMsQ0FBQyxzQkFBc0IsSUFBRyxzQ0FBc0M7SUFDL0UsR0FBQywrQkFBYyxDQUFDLHdCQUF3QixJQUFHLGdDQUFnQztRQUM3RSJ9