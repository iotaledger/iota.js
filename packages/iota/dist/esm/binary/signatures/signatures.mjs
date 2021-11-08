import { ED25519_SIGNATURE_TYPE } from "../../models/signatures/IEd25519Signature.mjs";
import { deserializeEd25519Signature, MIN_ED25519_SIGNATURE_LENGTH, serializeEd25519Signature } from "./ed25519Signature.mjs";
/**
 * The minimum length of a signature binary representation.
 */
export const MIN_SIGNATURE_LENGTH = MIN_ED25519_SIGNATURE_LENGTH;
/**
 * Deserialize the signature from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSignature(readStream) {
    if (!readStream.hasRemaining(MIN_SIGNATURE_LENGTH)) {
        throw new Error(`Signature data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIGNATURE_LENGTH}`);
    }
    const type = readStream.readByte("signature.type", false);
    let input;
    if (type === ED25519_SIGNATURE_TYPE) {
        input = deserializeEd25519Signature(readStream);
    }
    else {
        throw new Error(`Unrecognized signature type ${type}`);
    }
    return input;
}
/**
 * Serialize the signature to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSignature(writeStream, object) {
    if (object.type === ED25519_SIGNATURE_TYPE) {
        serializeEd25519Signature(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized signature type ${object.type}`);
    }
}
