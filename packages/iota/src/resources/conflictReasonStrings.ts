// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ConflictReason } from "../models/conflictReason";

/**
 * Conflict reason strings.
 */
export const CONFLICT_REASON_STRINGS: { [key in ConflictReason]: string } = {
    [ConflictReason.none]: "Not conflicting",
    [ConflictReason.inputUTXOAlreadySpent]: "The referenced UTXO was already spent",
    [ConflictReason.inputUTXOAlreadySpentInThisMilestone]:
        "The referenced UTXO was already spent while confirming this milestone",
    [ConflictReason.inputUTXONotFound]: "The referenced UTXO cannot be found",
    [ConflictReason.inputOutputSumMismatch]: "The sum of the inputs and output values does not match",
    [ConflictReason.invalidSignature]: "The unlock signature is invalid",
    [ConflictReason.invalidTimelock]: "The configured timelock is not yet expired",
    [ConflictReason.invalidNativeTokens]: "The native tokens are invalid",
    [ConflictReason.returnAmountMismatch]: "The return amount in a transaction is not fulfilled by the output side",
    [ConflictReason.invalidInputUnlock]: "The input unlock is invalid",
    [ConflictReason.invalidInputsCommitment]: "The inputs commitment is invalid",
    [ConflictReason.invalidSender]: "The output contains a Sender with an ident (address) which is not unlocked",
    [ConflictReason.invalidChainState]: "The chain state transition is invalid",
    [ConflictReason.semanticValidationFailed]: "The semantic validation failed"
};
