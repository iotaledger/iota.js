# @iota/http-client

Sends commands to [`IRI`](https://github.com/iotaledger/iri) over `HTTP`.
Allows to create a network provider compatible with functions in [`@iota/core`](../core).

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @iota/http-client
```

or using [yarn](https://yarnpkg.com/):

```
yarn add @iota/http-client
```

## API Reference

    
* [http-client](#module_http-client)

    * _static_
        * [.send(command, [uri], [apiVersion])](#module_http-client.send)

    * _inner_
        * [~send](#module_http-client..send)

        * [~setSettings](#module_http-client..setSettings)

        * [~createHttpClient([settings])](#module_http-client..createHttpClient)


<a name="module_http-client.send"></a>

### *http-client*.send(command, [uri], [apiVersion])
**Fulil**: <code>Object</code> - Response  
**Reject**: <code>Error</code> - Request error  

| Param | Type | Default |
| --- | --- | --- |
| command | <code>Command</code> |  | 
| [uri] | <code>String</code> | <code>http://localhost:14265</code> | 
| [apiVersion] | <code>String</code> \| <code>Number</code> | <code>1</code> | 

Sends an http request to a specified host.

**Returns**: Promise  
<a name="module_http-client..send"></a>

### *http-client*~send

| Param | Type |
| --- | --- |
| command | <code>object</code> | 

**Returns**: <code>object</code> - response  
<a name="module_http-client..setSettings"></a>

### *http-client*~setSettings

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [settings] | <code>object</code> | <code>{}</code> |  |
| [settings.provider] | <code>string</code> | <code>&quot;http://localhost:14265&quot;</code> | Uri of IRI node |
| [settings.apiVersion] | <code>string</code> \| <code>number</code> | <code>1</code> | IOTA Api version to be sent as `X-IOTA-API-Version` header. |
| [settings.requestBatchSize] | <code>number</code> | <code>1000</code> | Number of search values per request. |

<a name="module_http-client..createHttpClient"></a>

### *http-client*~createHttpClient([settings])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [settings] | <code>object</code> | <code>{}</code> |  |
| [settings.provider] | <code>string</code> | <code>&quot;http://localhost:14265&quot;</code> | Uri of IRI node |
| [settings.apiVersion] | <code>string</code> \| <code>number</code> | <code>1</code> | IOTA Api version to be sent as `X-IOTA-API-Version` header. |
| [settings.requestBatchSize] | <code>number</code> | <code>1000</code> | Number of search values per request. |

Create an http client to access IRI http API.

**Returns**: Object  
