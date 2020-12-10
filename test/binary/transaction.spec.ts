import { deserializeTransactionEssence, serializeTransactionEssence } from "../../src/binary/transaction";
import { ITransactionEssence } from "../../src/models/ITransactionEssence";
import { Converter } from "../../src/utils/converter";
import { ReadStream } from "../../src/utils/readStream";
import { WriteStream } from "../../src/utils/writeStream";

describe("Binary Transaction", () => {
    test("Can serialize and deserialize transaction essence with no payload", () => {
        const object: ITransactionEssence = {
            type: 0,
            inputs: [],
            outputs: []
        };

        const serialized = new WriteStream();
        serializeTransactionEssence(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("000000000000000000");
        const deserialized = deserializeTransactionEssence(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.inputs.length).toEqual(0);
        expect(deserialized.outputs.length).toEqual(0);
        expect(deserialized.payload).toBeUndefined();
    });

    test("Can serialize and deserialize transaction essence with indexation payload", () => {
        const object: ITransactionEssence = {
            type: 0,
            inputs: [],
            outputs: [],
            payload: {
                type: 2,
                index: "foo",
                data: Converter.asciiToHex("bar")
            }
        };

        const serialized = new WriteStream();
        serializeTransactionEssence(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("000000000010000000020000000300666f6f03000000626172");
        const deserialized = deserializeTransactionEssence(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.inputs.length).toEqual(0);
        expect(deserialized.outputs.length).toEqual(0);
        expect(deserialized.payload).toBeDefined();
        if (deserialized.payload) {
            expect(deserialized.payload.type).toEqual(2);
            expect(deserialized.payload.index).toEqual("foo");
            expect(Converter.hexToAscii(deserialized.payload.data)).toEqual("bar");
        }
    });
});
