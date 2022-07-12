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

• **none**

The block has no conflict.

___

### inputUTXOAlreadySpent

• **inputUTXOAlreadySpent**

The referenced UTXO was already spent.

___

### inputUTXOAlreadySpentInThisMilestone

• **inputUTXOAlreadySpentInThisMilestone**

The referenced UTXO was already spent while confirming this milestone.

___

### inputUTXONotFound

• **inputUTXONotFound**

The referenced UTXO cannot be found.

___

### inputOutputSumMismatch

• **inputOutputSumMismatch**

The sum of the inputs and output values does not match.

___

### invalidSignature

• **invalidSignature**

The unlock signature is invalid.

___

### invalidTimelock

• **invalidTimelock**

The configured timelock is not yet expired.

___

### invalidNativeTokens

• **invalidNativeTokens**

The native tokens are invalid.

___

### returnAmountMismatch

• **returnAmountMismatch**

The return amount in a transaction is not fulfilled by the output side.

___

### invalidInputUnlock

• **invalidInputUnlock**

The input unlock is invalid.

___

### invalidInputsCommitment

• **invalidInputsCommitment**

The inputs commitment is invalid.

___

### invalidSender

• **invalidSender**

The output contains a Sender with an ident (address) which is not unlocked.

___

### invalidChainState

• **invalidChainState**

The chain state transition is invalid.

___

### semanticValidationFailed

• **semanticValidationFailed**

The semantic validation failed.
