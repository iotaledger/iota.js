# @iota/checksum

Add, remove and validate checksums.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @iota/checksum
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @iota/checksum
```

## API Reference

    <a name="module_checksum..addChecksum"></a>

### *checksum*~addChecksum(input, [checksumLength], [isAddress])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> |  | Input trytes |
| [checksumLength] | <code>number</code> | <code>9</code> | Checksum trytes length |
| [isAddress] | <code>boolean</code> | <code>true</code> | Flag to denote if given input is address. Defaults to `true`. |

Generates and appends the 9-tryte checksum of the given trytes, usually an address.

**Returns**: <code>string</code> - Address (with checksum)  
<a name="module_checksum..removeChecksum"></a>

### *checksum*~removeChecksum(input)

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | Input trytes |

Removes the 9-trytes checksum of the given input.

**Returns**: <code>string</code> - Trytes without checksum  
<a name="module_checksum..isValidChecksum"></a>

### *checksum*~isValidChecksum(addressWithChecksum)

| Param | Type |
| --- | --- |
| addressWithChecksum | <code>string</code> | 

Validates the checksum of the given address trytes.

