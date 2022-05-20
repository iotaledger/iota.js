// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeIssuerFeature,
    serializeIssuerFeature
} from "../../../src/binary/features/issuerFeature";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../../src/models/addresses/IEd25519Address";
import { IIssuerFeature, ISSUER_FEATURE_TYPE } from "../../../src/models/features/IIssuerFeature";

describe("Binary Issuer Feature", () => {
    test("Can serialize and deserialize issuer feature", () => {
        const object: IIssuerFeature = {
            type: ISSUER_FEATURE_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        };

        const serialized = new WriteStream();
        serializeIssuerFeature(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("01006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        const deserialized = deserializeIssuerFeature(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.address.type).toEqual(0);
        expect((deserialized.address as IEd25519Address).pubKeyHash).toEqual(
            "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        );
    });
});
