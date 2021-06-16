// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { serializeMessage } from "../../src/binary/message";
import { IIndexationPayload, INDEXATION_PAYLOAD_TYPE } from "../../src/models/IIndexationPayload";
import type { IMessage } from "../../src/models/IMessage";
import { LocalPowProvider } from "../../src/pow/localPowProvider";
import { Converter } from "../../src/utils/converter";
import { PowHelper } from "../../src/utils/powHelper";
import { WriteStream } from "../../src/utils/writeStream";

describe("LocalPowProvider", () => {
    test("Calculate from an empty message", async () => {
        const pow = new LocalPowProvider();

        const indexationPayload: IIndexationPayload = {
            type: INDEXATION_PAYLOAD_TYPE,
            index: Converter.utf8ToHex("hello world"),
            data: Converter.bytesToHex(Uint8Array.from([1, 2, 3, 4]))
        };

        const message: IMessage = {
            payload: indexationPayload
        };

        const writeStream = new WriteStream();
        serializeMessage(writeStream, message);
        const messageBytes = writeStream.finalBytes();

        const nonce = await pow.pow(messageBytes, 100);
        expect(nonce).toEqual(BigInt(6569));

        const score = PowHelper.score(messageBytes);

        expect(nonce).toBeGreaterThanOrEqual(score);
    });
});
