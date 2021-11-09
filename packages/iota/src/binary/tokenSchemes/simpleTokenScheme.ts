// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { ISimpleTokenScheme, SIMPLE_TOKEN_SCHEME_TYPE } from "../../models/tokenSchemes/ISimpleTokenScheme";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";

/**
 * The minimum length of an simple token scheme binary representation.
 */
export const MIN_SIMPLE_TOKEN_SCHEME_LENGTH: number = SMALL_TYPE_LENGTH;

/**
 * Deserialize the simple token scheme from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSimpleTokenScheme(readStream: ReadStream): ISimpleTokenScheme {
    if (!readStream.hasRemaining(MIN_SIMPLE_TOKEN_SCHEME_LENGTH)) {
        throw new Error(
            `Simple Token Scheme data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIMPLE_TOKEN_SCHEME_LENGTH}`
        );
    }

    const type = readStream.readByte("simpleTokenScheme.type");
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
export function serializeSimpleTokenScheme(writeStream: WriteStream, object: ISimpleTokenScheme): void {
    writeStream.writeByte("simpleTokenScheme.type", object.type);
}
