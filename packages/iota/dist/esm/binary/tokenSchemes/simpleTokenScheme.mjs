import { SIMPLE_TOKEN_SCHEME_TYPE } from "../../models/tokenSchemes/ISimpleTokenScheme.mjs";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes.mjs";
/**
 * The minimum length of an simple token scheme binary representation.
 */
export const MIN_SIMPLE_TOKEN_SCHEME_LENGTH = SMALL_TYPE_LENGTH;
/**
 * Deserialize the simple token scheme from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSimpleTokenScheme(readStream) {
    if (!readStream.hasRemaining(MIN_SIMPLE_TOKEN_SCHEME_LENGTH)) {
        throw new Error(`Simple Token Scheme data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIMPLE_TOKEN_SCHEME_LENGTH}`);
    }
    const type = readStream.readUInt8("simpleTokenScheme.type");
    if (type !== SIMPLE_TOKEN_SCHEME_TYPE) {
        throw new Error(`Type mismatch in simpleTokenScheme ${type}`);
    }
    return {
        type: SIMPLE_TOKEN_SCHEME_TYPE
    };
}
/**
 * Serialize the simple token scheme to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSimpleTokenScheme(writeStream, object) {
    writeStream.writeUInt8("simpleTokenScheme.type", object.type);
}
