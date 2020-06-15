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

    
* [checksum](#module_checksum)

    * [.addChecksum(input, [checksumLength], [isAddress])](#module_checksum.addChecksum)

    * [.removeChecksum(input)](#module_checksum.removeChecksum)

    * [.isValidChecksum(addressWithChecksum)](#module_checksum.isValidChecksum)


<a name="module_checksum.addChecksum"></a>

### *checksum*.addChecksum(input, [checksumLength], [isAddress])
**Summary**: Generates a checksum and appends it to the given trytes.  
**Throws**:

- <code>errors.INVALID\_ADDRESS</code> : Make sure that the given address is 90 trytes long.
- <code>errors.INVALID\_TRYTES</code> : Make sure that the `input` argument contains only [trytes](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary)
- <code>errors.INVALID\_CHECKSUM\_LENGTH</code> : Make sure that the `checksumLength` argument is a number greater than or equal to 3. If the `isAddress` argument is set to true, make sure that the `checksumLength` argument is 9.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> |  | 81 trytes to which to append the checksum |
| [checksumLength] | <code>number</code> | <code>9</code> | Length of the checksum to generate |
| [isAddress] | <code>boolean</code> | <code>true</code> | Whether the input is an address |

This method takes 81 trytes, which could be an address or a seed, generates the [checksum](https://docs.iota.org/docs/getting-started/0.1/clients/checksums) and appends it to the trytes.

To generate a checksum that is less than 9 trytes long, make sure to set the `isAddress` argument to false.

## Related methods

To generate an address, use the [`getNewAddress()`](#module_core.getNewAddress) method.

**Returns**: <code>string</code> - The original trytes with an appended checksum.  
**Example**  
```js
let addressWithChecksum = Checksum.addChecksum('ADDRESS...');
```
<a name="module_checksum.removeChecksum"></a>

### *checksum*.removeChecksum(input)
**Summary**: Removes the checksum from the given address.  
**Throws**:

- <code>errors.INVALID\_ADDRESS</code> : Make sure that the given address is 90 trytes long.


| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | Address from which to remove the checksum |

This method takes an address of 90 trytes, and removes the last 9 trytes to return the address without a checksum.

## Related methods

To generate an address, use the [`getNewAddress()`](#module_core.getNewAddress) method.
To add a checksum to an address, use the [`addChecksum()`](#module_checksum.addChecksum) method.

**Returns**: <code>string</code> - The original address without the appended checksum.  
**Example**  
```js
let addressWithoutChecksum = Checksum.removeChecksum('ADDRESS...');
```
<a name="module_checksum.isValidChecksum"></a>

### *checksum*.isValidChecksum(addressWithChecksum)
**Summary**: Validates the checksum of an address.  
**Throws**:

- <code>errors.INVALID\_ADDRESS</code> : Make sure that the given address is 90 trytes long.


| Param | Type | Description |
| --- | --- | --- |
| addressWithChecksum | <code>string</code> | Address with a checksum |

This method takes an address of 90 trytes, and checks if the checksum is valid.

## Related methods

To generate an address, use the [`getNewAddress()`](#module_core.getNewAddress) method.
To add a checksum to an address, use the [`addChecksum()`](#module_checksum.addChecksum) method.

**Returns**: <code>boolean</code> - Whether the checksum is valid.  
**Example**  
```js
let valid = Checksum.isValidChecksum('ADDRESS...');
```
