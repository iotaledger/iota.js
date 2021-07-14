[@iota/iota.js](../README.md) / [clients/singleNodeClientOptions](../modules/clients_singleNodeClientOptions.md) / SingleNodeClientOptions

# Interface: SingleNodeClientOptions

[clients/singleNodeClientOptions](../modules/clients_singleNodeClientOptions.md).SingleNodeClientOptions

Options used when constructing SingleNodeClient.

## Table of contents

### Properties

- [basePath](clients_singleNodeClientOptions.SingleNodeClientOptions.md#basepath)
- [headers](clients_singleNodeClientOptions.SingleNodeClientOptions.md#headers)
- [password](clients_singleNodeClientOptions.SingleNodeClientOptions.md#password)
- [powProvider](clients_singleNodeClientOptions.SingleNodeClientOptions.md#powprovider)
- [timeout](clients_singleNodeClientOptions.SingleNodeClientOptions.md#timeout)
- [userName](clients_singleNodeClientOptions.SingleNodeClientOptions.md#username)

## Properties

### basePath

• `Optional` **basePath**: `string`

Base path for API location, defaults to /api/v1/.

___

### headers

• `Optional` **headers**: `Object`

Additional headers to include in the requests.

#### Index signature

▪ [id: `string`]: `string`

___

### password

• `Optional` **password**: `string`

Password for the endpoint.

___

### powProvider

• `Optional` **powProvider**: [`IPowProvider`](models_IPowProvider.IPowProvider.md)

Use a custom pow provider instead of the one on the node.

___

### timeout

• `Optional` **timeout**: `number`

Timeout for API requests.

___

### userName

• `Optional` **userName**: `string`

Username for the endpoint.
