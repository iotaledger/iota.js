import { SIMPLE_TOKEN_SCHEME_TYPE } from "../../models/tokenSchemes/ISimpleTokenScheme.mjs";
import { deserializeSimpleTokenScheme, MIN_SIMPLE_TOKEN_SCHEME_LENGTH, serializeSimpleTokenScheme } from "./simpleTokenScheme.mjs";
/**
 * The minimum length of a simple token scheme binary representation.
 */
export const MIN_TOKEN_SCHEME_LENGTH = MIN_SIMPLE_TOKEN_SCHEME_LENGTH;
/**
 * Deserialize the token scheme from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTokenScheme(readStream) {
    if (!readStream.hasRemaining(MIN_TOKEN_SCHEME_LENGTH)) {
        throw new Error(`Token Scheme data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TOKEN_SCHEME_LENGTH}`);
    }
    const type = readStream.readByte("tokenScheme.type", false);
    let tokenScheme;
    if (type === SIMPLE_TOKEN_SCHEME_TYPE) {
        tokenScheme = deserializeSimpleTokenScheme(readStream);
    }
    else {
        throw new Error(`Unrecognized token scheme type ${type}`);
    }
    return tokenScheme;
}
/**
 * Serialize the token scheme to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTokenScheme(writeStream, object) {
    if (object.type === SIMPLE_TOKEN_SCHEME_TYPE) {
        serializeSimpleTokenScheme(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized simple token scheme type ${object.type}`);
    }
}
