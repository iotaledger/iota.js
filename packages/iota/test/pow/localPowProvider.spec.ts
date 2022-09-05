// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
// import { Converter, WriteStream } from "@iota/util.js";
// import { serializeBlock } from "../../src/binary/block";
// import type { IBlock } from "../../src/models/IBlock";
// import { ITaggedDataPayload, TAGGED_DATA_PAYLOAD_TYPE } from "../../src/models/payloads/ITaggedDataPayload";
// import { LocalPowProvider } from "../../src/pow/localPowProvider";
// import { PowHelper } from "../../src/utils/powHelper";

describe("LocalPowProvider", () => {
    test("Calculate from an empty block", async () => {
        // const pow = new LocalPowProvider(3);

        // const taggedDataPayload: ITaggedDataPayload = {
        //     type: TAGGED_DATA_PAYLOAD_TYPE,
        //     tag: Converter.utf8ToHex("hello world"),
        //     data: Converter.bytesToHex(Uint8Array.from([1, 2, 3, 4]))
        // };

        // const block: IBlock = {
        //     protocolVersion: 2,
        //     parents: [],
        //     payload: taggedDataPayload,
        //     nonce: ""
        // };

        // const writeStream = new WriteStream();
        // serializeBlock(writeStream, block);
        // const blockBytes = writeStream.finalBytes();

        // const nonce = await pow.pow(blockBytes, 100);
        // expect(nonce).toEqual("12297829382473039080");

        // const score = PowHelper.score(blockBytes);

        // expect(Number.parseInt(nonce, 10)).toBeGreaterThanOrEqual(score);
    });
});
