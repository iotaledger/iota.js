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

    <a name="module_extract-json..extractJson"></a>

### *extract-json*~extractJson(bundle)

| Param | Type |
| --- | --- |
| bundle | <code>array</code> | 

Takes a bundle as input and from the signatureMessageFragments extracts the correct JSON
data which was encoded and sent with the transaction.
Supports the following forms of JSON encoded values:
- `"{ \"message\": \"hello\" }"`
- `"[1, 2, 3]"`
- `"true"`, `"false"` & `"null"`
- `"\"hello\""`
- `123`

**Example**  
```js
try {
  const msg = JSON.parse(extractJson(bundle))
} catch (err) {
  err.msg == errors.INVALID_BUNDLE
  // Invalid bundle or invalid encoded JSON
}
```
**Example**  
Example with `getBundle`:

```js
getBundle(tailHash)
  .then(bundle => {
     const msg = JSON.parse(extractJson(bundle))
     // ...
  })
  .catch((err) => {
     // Handle network & extraction errors
  })
```
