// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ConflictReason } from "../models/conflictReason.mjs";
/**
 * Conflict reason strings.
 */
export const CONFLICT_REASON_STRINGS = {
    [ConflictReason.none]: "Not conflicting",
    [ConflictReason.inputUTXOAlreadySpent]: "The referenced UTXO was already spent",
    [ConflictReason.inputUTXOAlreadySpentInThisMilestone]: "The referenced UTXO was already spent while confirming this milestone",
    [ConflictReason.inputUTXONotFound]: "The referenced UTXO cannot be found",
    [ConflictReason.inputOutputSumMismatch]: "The sum of the inputs and output values does not match",
    [ConflictReason.invalidSignature]: "The unlock block signature is invalid",
    [ConflictReason.invalidNetworkId]: "The networkId in the essence does not match the nodes configuration",
    [ConflictReason.semanticValidationFailed]: "The semantic validation failed"
};
