/* eslint-disable max-len */
import { Converter } from "../../src/utils/converter";

describe("Converter", () => {
    test("Can convert from bytes to hex", () => {
        const bytes = Uint8Array.from([97, 98, 99, 100]);
        expect(Converter.bytesToHex(bytes)).toEqual("61626364");
    });

    test("Can convert from bytes to hex reverse", () => {
        const bytes = Uint8Array.from([97, 98, 99, 100]);
        expect(Converter.bytesToHex(bytes, undefined, undefined, true)).toEqual("64636261");
    });

    test("Can convert from hex to bytes", () => {
        const bytes = Uint8Array.from([97, 98, 99, 100]);
        expect(Converter.hexToBytes("61626364")).toEqual(bytes);
    });

    test("Can convert from hex to bytes reverse", () => {
        const bytes = Uint8Array.from([97, 98, 99, 100]);
        expect(Converter.hexToBytes("64636261", true)).toEqual(bytes);
    });

    test("Can convert from bytes to ascii", () => {
        const bytes = Uint8Array.from([97, 98, 99, 100]);
        expect(Converter.bytesToAscii(bytes)).toEqual("abcd");
    });

    test("Can convert from ascii to bytes", () => {
        const bytes = Uint8Array.from([97, 98, 99, 100]);
        expect(Converter.asciiToBytes("abcd")).toEqual(bytes);
    });

    test("Can convert from bytes to ascii", () => {
        const bytes = Uint8Array.from([97, 98, 99, 100]);
        expect(Converter.bytesToAscii(bytes)).toEqual("abcd");
    });

    test("Can convert from ascii to hex", () => {
        expect(Converter.asciiToHex("abcd")).toEqual("61626364");
    });

    test("Can convert from hex to ascii", () => {
        expect(Converter.hexToAscii("61626364")).toEqual("abcd");
    });
});
