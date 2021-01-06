// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line no-shadow
export enum ConflictReason {
    /**
     * The message has no conflict.
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
     * The input or output type used is unsupported.
     */
    unsupportedInputOrOutputType = 6,

    /**
     * The address type used is unsupported.
     */
    unsupportedAddressType = 7,

    /**
     * The semantic validation failed.
     */
    semanticValidationFailed = 8
}

