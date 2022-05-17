// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

/**
 * Reason for block conflicts.
 */
// eslint-disable-next-line no-shadow
export enum ConflictReason {
    /**
     * The block has no conflict.
     */
    none = 0,

    /**
     * The referenced UTXO was already spent.
     */
    inputUTXOAlreadySpent = 1,

    /**
     * The referenced UTXO was already spent while confirming this milestone.
     */
    inputUTXOAlreadySpentInThisMilestone = 2,

    /**
     * The referenced UTXO cannot be found.
     */
    inputUTXONotFound = 3,

    /**
     * The sum of the inputs and output values does not match.
     */
    inputOutputSumMismatch = 4,

    /**
     * The unlock block signature is invalid.
     */
    invalidSignature = 5,

    /**
     * The networkId in the essence does not match the nodes configuration.
     */
    invalidNetworkId = 6,

    /**
     * The semantic validation failed.
     */
    semanticValidationFailed = 255
}
