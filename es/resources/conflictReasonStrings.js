"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFLICT_REASON_STRINGS = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const conflictReason_1 = require("../models/conflictReason");
/**
 * Conflict reason strings.
 */
exports.CONFLICT_REASON_STRINGS = {
    [conflictReason_1.ConflictReason.none]: "Not conflicting",
    [conflictReason_1.ConflictReason.inputUTXOAlreadySpent]: "The referenced UTXO was already spent",
    [conflictReason_1.ConflictReason.inputUTXOAlreadySpentInThisMilestone]: "The referenced UTXO was already spent while confirming this milestone",
    [conflictReason_1.ConflictReason.inputUTXONotFound]: "The referenced UTXO cannot be found",
    [conflictReason_1.ConflictReason.inputOutputSumMismatch]: "The sum of the inputs and output values does not match",
    [conflictReason_1.ConflictReason.invalidSignature]: "The unlock block signature is invalid",
    [conflictReason_1.ConflictReason.invalidDustAllowance]: "The dust allowance for the address is invalid",
    [conflictReason_1.ConflictReason.semanticValidationFailed]: "The semantic validation failed"
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmxpY3RSZWFzb25TdHJpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Jlc291cmNlcy9jb25mbGljdFJlYXNvblN0cmluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyw2REFBMEQ7QUFFMUQ7O0dBRUc7QUFDVSxRQUFBLHVCQUF1QixHQUF3QztJQUN4RSxDQUFDLCtCQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsaUJBQWlCO0lBQ3hDLENBQUMsK0JBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLHVDQUF1QztJQUMvRSxDQUFDLCtCQUFjLENBQUMsb0NBQW9DLENBQUMsRUFDakQsdUVBQXVFO0lBQzNFLENBQUMsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLHFDQUFxQztJQUN6RSxDQUFDLCtCQUFjLENBQUMsc0JBQXNCLENBQUMsRUFBRSx3REFBd0Q7SUFDakcsQ0FBQywrQkFBYyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsdUNBQXVDO0lBQzFFLENBQUMsK0JBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLCtDQUErQztJQUN0RixDQUFDLCtCQUFjLENBQUMsd0JBQXdCLENBQUMsRUFBRSxnQ0FBZ0M7Q0FDOUUsQ0FBQyJ9