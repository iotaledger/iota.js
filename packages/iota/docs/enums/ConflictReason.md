# Enumeration: ConflictReason

Reason for block conflicts.

## Table of contents

### Enumeration Members

- [none](ConflictReason.md#none)
- [inputUTXOAlreadySpent](ConflictReason.md#inpututxoalreadyspent)
- [inputUTXOAlreadySpentInThisMilestone](ConflictReason.md#inpututxoalreadyspentinthismilestone)
- [inputUTXONotFound](ConflictReason.md#inpututxonotfound)
- [inputOutputSumMismatch](ConflictReason.md#inputoutputsummismatch)
- [invalidSignature](ConflictReason.md#invalidsignature)
- [invalidTimelock](ConflictReason.md#invalidtimelock)
- [invalidNativeTokens](ConflictReason.md#invalidnativetokens)
- [returnAmountMismatch](ConflictReason.md#returnamountmismatch)
- [invalidInputUnlock](ConflictReason.md#invalidinputunlock)
- [invalidInputsCommitment](ConflictReason.md#invalidinputscommitment)
- [invalidSender](ConflictReason.md#invalidsender)
- [invalidChainState](ConflictReason.md#invalidchainstate)
- [semanticValidationFailed](ConflictReason.md#semanticvalidationfailed)

## Enumeration Members

### none

• **none** = ``0``

The block has no conflict.

___

### inputUTXOAlreadySpent

• **inputUTXOAlreadySpent** = ``1``

The referenced UTXO was already spent.

___

### inputUTXOAlreadySpentInThisMilestone

• **inputUTXOAlreadySpentInThisMilestone** = ``2``

The referenced UTXO was already spent while confirming this milestone.

___

### inputUTXONotFound

• **inputUTXONotFound** = ``3``

The referenced UTXO cannot be found.

___

### inputOutputSumMismatch

• **inputOutputSumMismatch** = ``4``

The sum of the inputs and output values does not match.

___

### invalidSignature

• **invalidSignature** = ``5``

The unlock signature is invalid.

___

### invalidTimelock

• **invalidTimelock** = ``6``

The configured timelock is not yet expired.

___

### invalidNativeTokens

• **invalidNativeTokens** = ``7``

The native tokens are invalid.

___

### returnAmountMismatch

• **returnAmountMismatch** = ``8``

The return amount in a transaction is not fulfilled by the output side.

___

### invalidInputUnlock

• **invalidInputUnlock** = ``9``

The input unlock is invalid.

___

### invalidInputsCommitment

• **invalidInputsCommitment** = ``10``

The inputs commitment is invalid.

___

### invalidSender

• **invalidSender** = ``11``

The output contains a Sender with an ident (address) which is not unlocked.

___

### invalidChainState

• **invalidChainState** = ``12``

The chain state transition is invalid.

___

### semanticValidationFailed

• **semanticValidationFailed** = ``255``

The semantic validation failed.
