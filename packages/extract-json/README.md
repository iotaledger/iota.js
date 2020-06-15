# @iota/extract-json

Extracts JSON encoded messages from signature message fragments.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @iota/extract-json
```

or using [yarn](https://yarnpkg.com/):

```
yarn add @iota/extract-json
```

## API Reference

    
* [extract-json](#module_extract-json)

    * [.extractJson(bundle)](#module_extract-json.extractJson)


<a name="module_extract-json.extractJson"></a>

### *extract-json*.extractJson(bundle)
**Summary**: Extracts JSON from transactions.  
**Throws**:

- <code>errors.INVALID\_BUNDLE</code> : Make sure that the `bundle` argument is an array of transaction trytes.
- <code>errors.INVALID\_JSON</code> : Make sure that the transactions' `signatureMessageFragment` fields contain valid JSON.


| Param | Type | Description |
| --- | --- | --- |
| bundle | <code>array</code> | Transaction trytes |

This method takes the `signatureMessageFragment` fields of all the given transaction trytes, and tries to extract any JSON data that's in them.

The following forms of JSON-encoded values are supported:
- `"{ \"message\": \"hello\" }"`
- `"[1, 2, 3]"`
- `"true"`, `"false"` & `"null"`
- `"\"hello\""`
- `123`

## Related methods

To get a bundle's transaction trytes from the Tangle, use the [`getBundle()`](#module_core.getBundle) method.

**Returns**: <code>string</code> \| <code>number</code> \| <code>null</code> - The JSON data in the transactions  
**Example**  
```js
try {
  const json = JSON.parse(extractJson(bundle))
} catch (error) {
  console.log(error);
}
```
