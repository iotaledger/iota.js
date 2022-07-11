---
description: iota.js API reference
keywords:
- references
- api references
- typescript
image: /img/client_banner.png
---
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
- [invalidNetworkId](ConflictReason.md#invalidnetworkid)
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

The unlock block signature is invalid.

___

### invalidNetworkId

• **invalidNetworkId**

The networkId in the essence does not match the nodes configuration.

___

### semanticValidationFailed

• **semanticValidationFailed**

The semantic validation failed.
