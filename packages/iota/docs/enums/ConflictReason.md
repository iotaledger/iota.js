# Enumeration: ConflictReason

Reason for message conflicts.

## Table of contents

### Enumeration members

- [none](ConflictReason.md#none)
- [inputUTXOAlreadySpent](ConflictReason.md#inpututxoalreadyspent)
- [inputUTXOAlreadySpentInThisMilestone](ConflictReason.md#inpututxoalreadyspentinthismilestone)
- [inputUTXONotFound](ConflictReason.md#inpututxonotfound)
- [inputOutputSumMismatch](ConflictReason.md#inputoutputsummismatch)
- [invalidSignature](ConflictReason.md#invalidsignature)
- [invalidNetworkId](ConflictReason.md#invalidnetworkid)
- [semanticValidationFailed](ConflictReason.md#semanticvalidationfailed)

## Enumeration members

### none

• **none** = `0`

The message has no conflict.

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

### inputOutputSumMismatch

• **inputOutputSumMismatch** = `4`

The sum of the inputs and output values does not match.

___

### invalidSignature

• **invalidSignature** = `5`

The unlock block signature is invalid.

___

### invalidNetworkId

• **invalidNetworkId** = `6`

The networkId in the essence does not match the nodes configuration.

___

### semanticValidationFailed

• **semanticValidationFailed** = `255`

The semantic validation failed.
