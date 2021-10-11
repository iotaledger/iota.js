# Interface: SingleNodeClientOptions

Options used when constructing SingleNodeClient.

## Table of contents

### Properties

- [basePath](SingleNodeClientOptions.md#basepath)
- [powProvider](SingleNodeClientOptions.md#powprovider)
- [timeout](SingleNodeClientOptions.md#timeout)
- [userName](SingleNodeClientOptions.md#username)
- [password](SingleNodeClientOptions.md#password)
- [headers](SingleNodeClientOptions.md#headers)

## Properties

### basePath

• `Optional` **basePath**: `string`

Base path for API location, defaults to /api/v1/.

___

### powProvider

• `Optional` **powProvider**: [`IPowProvider`](IPowProvider.md)

Use a custom pow provider instead of the one on the node.

___

### timeout

• `Optional` **timeout**: `number`

Timeout for API requests.

___

### userName

• `Optional` **userName**: `string`

Username for the endpoint.

___

### password

• `Optional` **password**: `string`

Password for the endpoint.

___

### headers

• `Optional` **headers**: `Object`

Additional headers to include in the requests.

#### Index signature

▪ [id: `string`]: `string`
