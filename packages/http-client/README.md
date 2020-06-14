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
        * [.createHttpClient([settings])](#module_http-client.createHttpClient)

        * [.send(command, [uri], [apiVersion])](#module_http-client.send)

    * _inner_
        * [~createHttpClient(command)](#module_http-client..createHttpClient)

        * [~setSettings([settings])](#module_http-client..setSettings)


<a name="module_http-client.createHttpClient"></a>

### *http-client*.createHttpClient([settings])
**Summary**: Creates an HTTP client to access the IRI API.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [settings] | <code>Object</code> | <code>{}</code> |  |
| [settings.provider] | <code>String</code> | <code>http://localhost:14265</code> | URI of an IRI node to connect to |
| [settings.apiVersion] | <code>String</code> \| <code>number</code> | <code>1</code> | IOTA API version to be sent in the `X-IOTA-API-Version` header. |
| [settings.requestBatchSize] | <code>number</code> | <code>1000</code> | Number of search values per request |

This method creates an HTTP client that you can use to send requests to the [IRI API endpoints](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference).

## Related methods

To send requests to the IRI node, use the [`send()`](#module_http-client.send) method.

**Returns**: HTTP client object  
**Example**  
```js
let settings = {
 provider: 'http://mynode.eu:14265'
}

let httpClient = HttpClient.createHttpClient(settings);
```
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
<a name="module_http-client..createHttpClient"></a>

### *http-client*~createHttpClient(command)
**Summary**: Sends an API request to the connected IRI node.  
**Fulfil**: <code>Object</code> response - The response from the IRI node  
**Reject**: <code>Object</code> error - The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Object</code> | The request body for the API endpoint |

This method uses the HTTP client to send requests to the [IRI API endpoints](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference).

## Related methods

To create an HTTP client, use the [`createHttpClient()`](#module_http-client.createHttpClient) method.

**Example**  
```js
let httpClient = HttpClient.createHttpClient(settings);
httpClient.send({command:'getNodeInfo'})
.then(response => {
  console.log(response);
})
.catch(error => {
  console.log(error);
})
```
<a name="module_http-client..setSettings"></a>

### *http-client*~setSettings([settings])
**Summary**: Updates the settings of an existing HTTP client.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [settings] | <code>Object</code> | <code>{}</code> |  |
| [settings.provider] | <code>String</code> | <code>http://localhost:14265</code> | URI of an IRI node to connect to |
| [settings.apiVersion] | <code>String</code> \| <code>number</code> | <code>1</code> | IOTA API version to be sent in the `X-IOTA-API-Version` header. |
| [settings.requestBatchSize] | <code>number</code> | <code>1000</code> | Number of search values per request. |

This method updates the settings of an existing HTTP client.

## Related methods

To create an HTTP client, use the [`createHttpClient()`](#module_http-client.createHttpClient) method.

**Example**  
```js
let settings = {
  provider: 'https://nodes.devnet.thetangle.org:443'
  }

let httpClient = http.createHttpClient(settings);
httpClient.send({command:'getNodeInfo'}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
});

httpClient.setSettings({provider:'http://newnode.org:14265'});

httpClient.send({command:'getNodeInfo'}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```
