**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "highLevel/sendAdvanced"

# Module: "highLevel/sendAdvanced"

## Index

### Functions

* [buildTransactionPayload](_highlevel_sendadvanced_.md#buildtransactionpayload)
* [sendAdvanced](_highlevel_sendadvanced_.md#sendadvanced)

## Functions

### buildTransactionPayload

▸ **buildTransactionPayload**(`inputsAndSignatureKeyPairs`: { addressKeyPair: [IKeyPair](../interfaces/_models_ikeypair_.ikeypair.md) ; input: [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md)  }[], `outputs`: { address: string ; addressType: number ; amount: number ; isDustAllowance?: undefined \| false \| true  }[], `indexation?`: undefined \| { data?: Uint8Array \| string ; key: Uint8Array \| string  }): [ITransactionPayload](../interfaces/_models_itransactionpayload_.itransactionpayload.md)

Build a transaction payload.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`inputsAndSignatureKeyPairs` | { addressKeyPair: [IKeyPair](../interfaces/_models_ikeypair_.ikeypair.md) ; input: [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md)  }[] | The inputs with the signature key pairs needed to sign transfers. |
`outputs` | { address: string ; addressType: number ; amount: number ; isDustAllowance?: undefined \| false \| true  }[] | The outputs to send. |
`indexation?` | undefined \| { data?: Uint8Array \| string ; key: Uint8Array \| string  } | Optional indexation data to associate with the transaction. |

**Returns:** [ITransactionPayload](../interfaces/_models_itransactionpayload_.itransactionpayload.md)

The transaction payload.

___

### sendAdvanced

▸ **sendAdvanced**(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `inputsAndSignatureKeyPairs`: { addressKeyPair: [IKeyPair](../interfaces/_models_ikeypair_.ikeypair.md) ; input: [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md)  }[], `outputs`: { address: string ; addressType: number ; amount: number ; isDustAllowance?: undefined \| false \| true  }[], `indexation?`: undefined \| { data?: Uint8Array \| string ; key: Uint8Array \| string  }): Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

Send a transfer from the balance on the seed.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | The client or node endpoint to send the transfer with. |
`inputsAndSignatureKeyPairs` | { addressKeyPair: [IKeyPair](../interfaces/_models_ikeypair_.ikeypair.md) ; input: [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md)  }[] | The inputs with the signature key pairs needed to sign transfers. |
`outputs` | { address: string ; addressType: number ; amount: number ; isDustAllowance?: undefined \| false \| true  }[] | The outputs to send. |
`indexation?` | undefined \| { data?: Uint8Array \| string ; key: Uint8Array \| string  } | Optional indexation data to associate with the transaction. |

**Returns:** Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

The id of the message created and the remainder address if one was needed.
