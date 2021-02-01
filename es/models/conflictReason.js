"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictReason = void 0;
// eslint-disable-next-line no-shadow
var ConflictReason;
(function (ConflictReason) {
    /**
     * The message has no conflict.
     */
    ConflictReason[ConflictReason["none"] = 0] = "none";
    /**
     * The referenced UTXO was already spent.
     */
    ConflictReason[ConflictReason["inputUTXOAlreadySpent"] = 1] = "inputUTXOAlreadySpent";
    /**
     * The referenced UTXO was already spent while confirming this milestone.
     */
    ConflictReason[ConflictReason["inputUTXOAlreadySpentInThisMilestone"] = 2] = "inputUTXOAlreadySpentInThisMilestone";
    /**
     * The referenced UTXO cannot be found.
     */
    ConflictReason[ConflictReason["inputUTXONotFound"] = 3] = "inputUTXONotFound";
    /**
     * The sum of the inputs and output values does not match.
     */
    ConflictReason[ConflictReason["inputOutputSumMismatch"] = 4] = "inputOutputSumMismatch";
    /**
     * The unlock block signature is invalid.
     */
    ConflictReason[ConflictReason["invalidSignature"] = 5] = "invalidSignature";
    /**
     * The dust allowance for the address is invalid.
     */
    ConflictReason[ConflictReason["invalidDustAllowance"] = 6] = "invalidDustAllowance";
    /**
     * The semantic validation failed.
     */
    ConflictReason[ConflictReason["semanticValidationFailed"] = 255] = "semanticValidationFailed";
})(ConflictReason = exports.ConflictReason || (exports.ConflictReason = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmxpY3RSZWFzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL2NvbmZsaWN0UmVhc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDOzs7QUFFdEMscUNBQXFDO0FBQ3JDLElBQVksY0F3Q1g7QUF4Q0QsV0FBWSxjQUFjO0lBQ3RCOztPQUVHO0lBQ0gsbURBQVEsQ0FBQTtJQUVSOztPQUVHO0lBQ0gscUZBQXlCLENBQUE7SUFFekI7O09BRUc7SUFDSCxtSEFBd0MsQ0FBQTtJQUV4Qzs7T0FFRztJQUNILDZFQUFxQixDQUFBO0lBRXJCOztPQUVHO0lBQ0gsdUZBQTBCLENBQUE7SUFFMUI7O09BRUc7SUFDSCwyRUFBb0IsQ0FBQTtJQUVwQjs7T0FFRztJQUNILG1GQUF3QixDQUFBO0lBRXhCOztPQUVHO0lBQ0gsNkZBQThCLENBQUE7QUFDbEMsQ0FBQyxFQXhDVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQXdDekIifQ==