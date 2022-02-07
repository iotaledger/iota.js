import bigInt from "big-integer";
import { MIN_ALIAS_ADDRESS_LENGTH } from "./addresses/aliasAddress.mjs";
import { UINT32_SIZE, UINT8_SIZE } from "./commonDataTypes.mjs";
/**
 * The minimum length of a native tokens list.
 */
export const MIN_NATIVE_TOKENS_LENGTH = UINT8_SIZE;
/**
 * The length of a native token tag.
 */
export const NATIVE_TOKEN_TAG_LENGTH = 12;
/**
 * The length of a foundry id.
 */
export const FOUNDRY_ID_LENGTH = MIN_ALIAS_ADDRESS_LENGTH + UINT32_SIZE + UINT8_SIZE;
/**
 * The length of a native token id.
 */
export const NATIVE_TOKEN_ID_LENGTH = FOUNDRY_ID_LENGTH + NATIVE_TOKEN_TAG_LENGTH;
/**
 * The maximum number of native tokens.
 */
export const MAX_NATIVE_TOKEN_COUNT = 64;
/**
 * Deserialize the natovetokens from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeNativeTokens(readStream) {
    const numNativeTokens = readStream.readUInt8("nativeTokens.numNativeTokens");
    const nativeTokens = [];
    for (let i = 0; i < numNativeTokens; i++) {
        nativeTokens.push(deserializeNativeToken(readStream));
    }
    return nativeTokens;
}
/**
 * Serialize the natove tokens to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeNativeTokens(writeStream, object) {
    writeStream.writeUInt8("nativeTokens.numNativeTokens", object.length);
    for (let i = 0; i < object.length; i++) {
        serializeNativeToken(writeStream, object[i]);
    }
}
/**
 * Deserialize the native token from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeNativeToken(readStream) {
    const id = readStream.readFixedHex("nativeToken.id", NATIVE_TOKEN_ID_LENGTH);
    const amount = readStream.readUInt256("nativeToken.amount");
    return {
        id,
        amount: amount.toString()
    };
}
/**
 * Serialize the native token to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeNativeToken(writeStream, object) {
    writeStream.writeFixedHex("nativeToken.id", NATIVE_TOKEN_ID_LENGTH, object.id);
    writeStream.writeUInt256("nativeToken.amount", bigInt(object.amount));
}
