**[@iota/iota.js](../README.md)**

> [Globals](../README.md) / "highLevel/send"

# Module: "highLevel/send"

## Index

### Functions

* [calculateInputs](_highlevel_send_.md#calculateinputs)
* [send](_highlevel_send_.md#send)
* [sendEd25519](_highlevel_send_.md#sended25519)
* [sendMultiple](_highlevel_send_.md#sendmultiple)
* [sendMultipleEd25519](_highlevel_send_.md#sendmultipleed25519)
* [sendWithAddressGenerator](_highlevel_send_.md#sendwithaddressgenerator)

## Functions

### calculateInputs

▸ **calculateInputs**<T\>(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `seed`: [ISeed](../interfaces/_models_iseed_.iseed.md), `initialAddressState`: T, `nextAddressPath`: (addressState: T, isFirst: boolean) => string, `outputs`: { address: string ; addressType: number ; amount: number  }[], `zeroCount?`: number): Promise<{ addressKeyPair: [IKeyPair](../interfaces/_models_ikeypair_.ikeypair.md) ; input: [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md)  }[]\>

Calculate the inputs from the seed and basePath.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | - | The client or node endpoint to calculate the inputs with. |
`seed` | [ISeed](../interfaces/_models_iseed_.iseed.md) | - | The seed to use for address generation. |
`initialAddressState` | T | - | The initial address state for calculating the addresses. |
`nextAddressPath` | (addressState: T, isFirst: boolean) => string | - | Calculate the next address for inputs. |
`outputs` | { address: string ; addressType: number ; amount: number  }[] | - | The outputs to send. |
`zeroCount` | number | 5 | Abort when the number of zero balances is exceeded. |

**Returns:** Promise<{ addressKeyPair: [IKeyPair](../interfaces/_models_ikeypair_.ikeypair.md) ; input: [IUTXOInput](../interfaces/_models_iutxoinput_.iutxoinput.md)  }[]\>

The id of the message created and the contructed message.

___

### send

▸ **send**(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `seed`: [ISeed](../interfaces/_models_iseed_.iseed.md), `accountIndex`: number, `addressBech32`: string, `amount`: number, `indexation?`: undefined \| { data?: Uint8Array \| string ; key: Uint8Array \| string  }, `addressOptions?`: undefined \| { startIndex?: undefined \| number ; zeroCount?: undefined \| number  }): Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

Send a transfer from the balance on the seed to a single output.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | The client or node endpoint to send the transfer with. |
`seed` | [ISeed](../interfaces/_models_iseed_.iseed.md) | The seed to use for address generation. |
`accountIndex` | number | The account index in the wallet. |
`addressBech32` | string | The address to send the funds to in bech32 format. |
`amount` | number | The amount to send. |
`indexation?` | undefined \| { data?: Uint8Array \| string ; key: Uint8Array \| string  } | Optional indexation data to associate with the transaction. |
`addressOptions?` | undefined \| { startIndex?: undefined \| number ; zeroCount?: undefined \| number  } | Optional address configuration for balance address lookups. |

**Returns:** Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

The id of the message created and the contructed message.

___

### sendEd25519

▸ **sendEd25519**(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `seed`: [ISeed](../interfaces/_models_iseed_.iseed.md), `accountIndex`: number, `addressEd25519`: string, `amount`: number, `indexation?`: undefined \| { data?: Uint8Array ; key: Uint8Array  }, `addressOptions?`: undefined \| { startIndex?: undefined \| number ; zeroCount?: undefined \| number  }): Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

Send a transfer from the balance on the seed to a single output.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | The client or node endpoint to send the transfer with. |
`seed` | [ISeed](../interfaces/_models_iseed_.iseed.md) | The seed to use for address generation. |
`accountIndex` | number | The account index in the wallet. |
`addressEd25519` | string | The address to send the funds to in ed25519 format. |
`amount` | number | The amount to send. |
`indexation?` | undefined \| { data?: Uint8Array ; key: Uint8Array  } | Optional indexation data to associate with the transaction. |
`addressOptions?` | undefined \| { startIndex?: undefined \| number ; zeroCount?: undefined \| number  } | Optional address configuration for balance address lookups. |

**Returns:** Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

The id of the message created and the contructed message.

___

### sendMultiple

▸ **sendMultiple**(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `seed`: [ISeed](../interfaces/_models_iseed_.iseed.md), `accountIndex`: number, `outputs`: { addressBech32: string ; amount: number ; isDustAllowance?: undefined \| false \| true  }[], `indexation?`: undefined \| { data?: Uint8Array \| string ; key: Uint8Array \| string  }, `addressOptions?`: undefined \| { startIndex?: undefined \| number ; zeroCount?: undefined \| number  }): Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

Send a transfer from the balance on the seed to multiple outputs.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | The client or node endpoint to send the transfer with. |
`seed` | [ISeed](../interfaces/_models_iseed_.iseed.md) | The seed to use for address generation. |
`accountIndex` | number | The account index in the wallet. |
`outputs` | { addressBech32: string ; amount: number ; isDustAllowance?: undefined \| false \| true  }[] | The address to send the funds to in bech32 format and amounts. |
`indexation?` | undefined \| { data?: Uint8Array \| string ; key: Uint8Array \| string  } | Optional indexation data to associate with the transaction. |
`addressOptions?` | undefined \| { startIndex?: undefined \| number ; zeroCount?: undefined \| number  } | Optional address configuration for balance address lookups. |

**Returns:** Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

The id of the message created and the contructed message.

___

### sendMultipleEd25519

▸ **sendMultipleEd25519**(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `seed`: [ISeed](../interfaces/_models_iseed_.iseed.md), `accountIndex`: number, `outputs`: { addressEd25519: string ; amount: number ; isDustAllowance?: undefined \| false \| true  }[], `indexation?`: undefined \| { data?: Uint8Array ; key: Uint8Array  }, `addressOptions?`: undefined \| { startIndex?: undefined \| number ; zeroCount?: undefined \| number  }): Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

Send a transfer from the balance on the seed.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | The client or node endpoint to send the transfer with. |
`seed` | [ISeed](../interfaces/_models_iseed_.iseed.md) | The seed to use for address generation. |
`accountIndex` | number | The account index in the wallet. |
`outputs` | { addressEd25519: string ; amount: number ; isDustAllowance?: undefined \| false \| true  }[] | The outputs including address to send the funds to in ed25519 format and amount. |
`indexation?` | undefined \| { data?: Uint8Array ; key: Uint8Array  } | Optional indexation data to associate with the transaction. |
`addressOptions?` | undefined \| { startIndex?: undefined \| number ; zeroCount?: undefined \| number  } | Optional address configuration for balance address lookups. |

**Returns:** Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

The id of the message created and the contructed message.

___

### sendWithAddressGenerator

▸ **sendWithAddressGenerator**<T\>(`client`: [IClient](../interfaces/_models_iclient_.iclient.md) \| string, `seed`: [ISeed](../interfaces/_models_iseed_.iseed.md), `initialAddressState`: T, `nextAddressPath`: (addressState: T, isFirst: boolean) => string, `outputs`: { address: string ; addressType: number ; amount: number ; isDustAllowance?: undefined \| false \| true  }[], `indexation?`: undefined \| { data?: Uint8Array \| string ; key: Uint8Array \| string  }, `zeroCount?`: undefined \| number): Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

Send a transfer using account based indexing for the inputs.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [IClient](../interfaces/_models_iclient_.iclient.md) \| string | The client or node endpoint to send the transfer with. |
`seed` | [ISeed](../interfaces/_models_iseed_.iseed.md) | The seed to use for address generation. |
`initialAddressState` | T | The initial address state for calculating the addresses. |
`nextAddressPath` | (addressState: T, isFirst: boolean) => string | Calculate the next address for inputs. |
`outputs` | { address: string ; addressType: number ; amount: number ; isDustAllowance?: undefined \| false \| true  }[] | The address to send the funds to in bech32 format and amounts. |
`indexation?` | undefined \| { data?: Uint8Array \| string ; key: Uint8Array \| string  } | Optional indexation data to associate with the transaction. |
`zeroCount?` | undefined \| number | The number of addresses with 0 balance during lookup before aborting. |

**Returns:** Promise<{ message: [IMessage](../interfaces/_models_imessage_.imessage.md) ; messageId: string  }\>

The id of the message created and the contructed message.
