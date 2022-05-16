// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { IIssuerFeature, ISSUER_FEATURE_TYPE } from "../../models/features/IIssuerFeature";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";

/**
 * The minimum length of a issuer feature binary representation.
 */
export const MIN_ISSUER_FEATURE_LENGTH: number = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;

/**
 * Deserialize the issuer feature from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeIssuerFeature(readStream: ReadStream): IIssuerFeature {
    if (!readStream.hasRemaining(MIN_ISSUER_FEATURE_LENGTH)) {
        throw new Error(
            `Issuer Feature data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ISSUER_FEATURE_LENGTH}`
        );
    }

    const type = readStream.readUInt8("issuerFeature.type");
    if (type !== ISSUER_FEATURE_TYPE) {
        throw new Error(`Type mismatch in issuerFeature ${type}`);
    }

    const address = deserializeAddress(readStream);

    return {
        type: ISSUER_FEATURE_TYPE,
        address
    };
}

/**
 * Serialize the issuer feature to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeIssuerFeature(writeStream: WriteStream, object: IIssuerFeature): void {
    writeStream.writeUInt8("issuerFeature.type", object.type);
    serializeAddress(writeStream, object.address);
}
