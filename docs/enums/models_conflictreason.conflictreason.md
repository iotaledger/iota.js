[@iota/iota.js](../README.md) / [models/conflictReason](../modules/models_conflictReason.md) / ConflictReason

# Enumeration: ConflictReason

[models/conflictReason](../modules/models_conflictReason.md).ConflictReason

Reason for message conflicts.

## Table of contents

### Enumeration members

- [inputOutputSumMismatch](models_conflictReason.ConflictReason.md#inputoutputsummismatch)
- [inputUTXOAlreadySpent](models_conflictReason.ConflictReason.md#inpututxoalreadyspent)
- [inputUTXOAlreadySpentInThisMilestone](models_conflictReason.ConflictReason.md#inpututxoalreadyspentinthismilestone)
- [inputUTXONotFound](models_conflictReason.ConflictReason.md#inpututxonotfound)
- [invalidDustAllowance](models_conflictReason.ConflictReason.md#invaliddustallowance)
- [invalidSignature](models_conflictReason.ConflictReason.md#invalidsignature)
- [none](models_conflictReason.ConflictReason.md#none)
- [semanticValidationFailed](models_conflictReason.ConflictReason.md#semanticvalidationfailed)

## Enumeration members

### inputOutputSumMismatch

• **inputOutputSumMismatch** = `4`

The sum of the inputs and output values does not match.

___

### inputUTXOAlreadySpent

• **inputUTXOAlreadySpent** = `1`

The referenced UTXO was already spent.

___

### inputUTXOAlreadySpentInThisMilestone

• **inputUTXOAlreadySpentInThisMilestone** = `2`

The referenced UTXO was already spent while confirming this milestone.

___

### inputUTXONotFound

• **inputUTXONotFound** = `3`

The referenced UTXO cannot be found.

___

### invalidDustAllowance

• **invalidDustAllowance** = `6`

The dust allowance for the address is invalid.

___

### invalidSignature

• **invalidSignature** = `5`

The unlock block signature is invalid.

___

### none

• **none** = `0`

The message has no conflict.

___

### semanticValidationFailed

• **semanticValidationFailed** = `255`

The semantic validation failed.
