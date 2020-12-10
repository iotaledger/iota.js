// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { serializeMessage } from "../../src/binary/message";
import { IMessage } from "../../src/models/IMessage";
import { LocalPowProvider } from "../../src/pow/localPowProvider";
import { Converter } from "../../src/utils/converter";
import { PowHelper } from "../../src/utils/powHelper";
import { RandomHelper } from "../../src/utils/randomHelper";
import { WriteStream } from "../../src/utils/writeStream";

describe("LocalPowProvider", () => {
    test("Calculate from an empty message", async () => {
        const pow = new LocalPowProvider();

        const message: IMessage = {
            parent1MessageId: Converter.bytesToHex(RandomHelper.generate(32)),
            parent2MessageId: Converter.bytesToHex(RandomHelper.generate(32)),
            payload: {
                type: 2,
                index: "hello world",
                data: Converter.bytesToHex(Uint8Array.from([1, 2, 3, 4]))
            }
        };
        const writeStream = new WriteStream();
        serializeMessage(writeStream, message);
        const messageBytes = writeStream.finalBytes();

        const nonce = await pow.pow(messageBytes, 100);

        const score = PowHelper.score(messageBytes);

        expect(nonce).toBeGreaterThanOrEqual(score);
    });
});
