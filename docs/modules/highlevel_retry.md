[@iota/iota.js](../README.md) / highLevel/retry

# Module: highLevel/retry

## Table of contents

### Functions

- [retry](highlevel_retry.md#retry)

## Functions

### retry

▸ **retry**(`client`: [*IClient*](../interfaces/models/iclient.iclient.md), `messageId`: *string*): *Promise*<{}\>

Retry an existing message either by promoting or reattaching.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`client` | [*IClient*](../interfaces/models/iclient.iclient.md) | The client to perform the retry with.   |
`messageId` | *string* | The message to retry.   |

**Returns:** *Promise*<{}\>

The id and message that were retried.
