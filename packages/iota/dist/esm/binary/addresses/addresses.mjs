import { ALIAS_ADDRESS_TYPE } from "../../models/addresses/IAliasAddress.mjs";
import { BLS_ADDRESS_TYPE } from "../../models/addresses/IBlsAddress.mjs";
import { ED25519_ADDRESS_TYPE } from "../../models/addresses/IEd25519Address.mjs";
import { NFT_ADDRESS_TYPE } from "../../models/addresses/INftAddress.mjs";
import { deserializeAliasAddress, MIN_ALIAS_ADDRESS_LENGTH, serializeAliasAddress } from "./aliasAddress.mjs";
import { deserializeBlsAddress, MIN_BLS_ADDRESS_LENGTH, serializeBlsAddress } from "./blsAddress.mjs";
import { deserializeEd25519Address, MIN_ED25519_ADDRESS_LENGTH, serializeEd25519Address } from "./ed25519Address.mjs";
import { deserializeNftAddress, MIN_NFT_ADDRESS_LENGTH, serializeNftAddress } from "./nftAddress.mjs";
/**
 * The minimum length of an address binary representation.
 */
export const MIN_ADDRESS_LENGTH = Math.min(MIN_ED25519_ADDRESS_LENGTH, MIN_ALIAS_ADDRESS_LENGTH, MIN_BLS_ADDRESS_LENGTH, MIN_NFT_ADDRESS_LENGTH);
/**
 * Deserialize the address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeAddress(readStream) {
    if (!readStream.hasRemaining(MIN_ADDRESS_LENGTH)) {
        throw new Error(`Address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ADDRESS_LENGTH}`);
    }
    const type = readStream.readByte("address.type", false);
    let address;
    if (type === ED25519_ADDRESS_TYPE) {
        address = deserializeEd25519Address(readStream);
    }
    else if (type === ALIAS_ADDRESS_TYPE) {
        address = deserializeAliasAddress(readStream);
    }
    else if (type === BLS_ADDRESS_TYPE) {
        address = deserializeBlsAddress(readStream);
    }
    else if (type === NFT_ADDRESS_TYPE) {
        address = deserializeNftAddress(readStream);
    }
    else {
        throw new Error(`Unrecognized address type ${type}`);
    }
    return address;
}
/**
 * Serialize the address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeAddress(writeStream, object) {
    if (object.type === ED25519_ADDRESS_TYPE) {
        serializeEd25519Address(writeStream, object);
    }
    else if (object.type === ALIAS_ADDRESS_TYPE) {
        serializeAliasAddress(writeStream, object);
    }
    else if (object.type === BLS_ADDRESS_TYPE) {
        serializeBlsAddress(writeStream, object);
    }
    else if (object.type === NFT_ADDRESS_TYPE) {
        serializeNftAddress(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized address type ${object.type}`);
    }
}
