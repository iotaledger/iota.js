// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeSigLockedDustAllowanceOutput,
    serializeSigLockedDustAllowanceOutput
} from "../../../src/binary/outputs/sigLockedDustAllowanceOutput";
import { ED25519_ADDRESS_TYPE } from "../../../src/models/addresses/IEd25519Address";
import {
    ISigLockedDustAllowanceOutput,
    SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE
} from "../../../src/models/outputs/ISigLockedDustAllowanceOutput";

describe("Binary Sig Locked Dust Allowance Output", () => {
    test("Can serialize and deserialize sig locked dust allowance output", () => {
        const object: ISigLockedDustAllowanceOutput = {
            type: SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            },
            amount: 123456
        };

        const serialized = new WriteStream();
        serializeSigLockedDustAllowanceOutput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("01006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f9240e2010000000000");
        const deserialized = deserializeSigLockedDustAllowanceOutput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.address.type).toEqual(0);
        expect(deserialized.address.address).toEqual(
            "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        );
        expect(deserialized.amount).toEqual(123456);
    });
});
