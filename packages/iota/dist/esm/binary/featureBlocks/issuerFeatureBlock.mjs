import { ISSUER_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IIssuerFeatureBlock.mjs";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses.mjs";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes.mjs";
/**
 * The minimum length of a issuer feature block binary representation.
 */
export const MIN_ISSUER_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;
/**
 * Deserialize the issuer feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeIssuerFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_ISSUER_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`Issuer Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ISSUER_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("issuerFeatureBlock.type");
    if (type !== ISSUER_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in issuerFeatureBlock ${type}`);
    }
    const address = deserializeAddress(readStream);
    return {
        type: ISSUER_FEATURE_BLOCK_TYPE,
        address
    };
}
/**
 * Serialize the issuer feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeIssuerFeatureBlock(writeStream, object) {
    writeStream.writeByte("issuerFeatureBlock.type", object.type);
    serializeAddress(writeStream, object.address);
}
