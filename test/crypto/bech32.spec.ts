/* eslint-disable max-len */
import { Bech32 } from "../../src/crypto/bech32";
import { Converter } from "../../src/utils/converter";

describe("Bech32", () => {
    test("Can fail to decode if there is no separator", () => {
        expect(() => Bech32.decode("a".repeat(91))).toThrow("no separator");
    });

    test("Can fail to decode if the separator is too early", () => {
        expect(() => Bech32.decode(`1${"a".repeat(89)}`)).toThrow("too early");
    });

    test("Can fail to decode if the separator is too late", () => {
        expect(() => Bech32.decode(`${"a".repeat(84)}1${"a".repeat(5)}`)).toThrow("space for data");
    });

    test("Can fail to decode with non 5 bit characters", () => {
        expect(() => Bech32.decodeTo5BitArray("iot1!aaaaa")).toThrow("not in the charset");
    });

    test("Can fail to decode with invalid checksum", () => {
        const result = Bech32.decode("iot1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp99");

        expect(result).toBeUndefined();
    });

    test("Can encode a string", () => {
        const address = Converter.hexToBytes("0152fdfc072182654f163f5f0f9a621d729566c74d10037c4d7bbb0407d1e2c649");
        expect(Bech32.encode("iot", address)).toEqual("iot1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98");
    });

    test("Can decode a string", () => {
        const result = Bech32.decode("iot1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98");

        expect(result).toBeDefined();
        if (result) {
            expect(result.humanReadablePart).toEqual("iot");
            expect(Converter.bytesToHex(result.data)).toEqual("0152fdfc072182654f163f5f0f9a621d729566c74d10037c4d7bbb0407d1e2c649");
        }
    });

    test("Can fail to match empty address", () => {
        expect(Bech32.matches("iot", "")).toEqual(false);
    });

    test("Can fail to match undefined address", () => {
        expect(Bech32.matches("iot")).toEqual(false);
    });

    test("Can fail to match address too short", () => {
        expect(Bech32.matches("iot", "iot1q9f0m")).toEqual(false);
    });

    test("Can fail to match address hrp mismatch", () => {
        expect(Bech32.matches("iot", "iop1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98")).toEqual(false);
    });

    test("Can fail to match address seprator missing", () => {
        expect(Bech32.matches("iot", "iopq9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98")).toEqual(false);
    });

    test("Can fail to match address invalid chars", () => {
        expect(Bech32.matches("iot", "iot1q9f0mlqZyxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98")).toEqual(false);
    });

    test("Can match address", () => {
        expect(Bech32.matches("iot", "iot1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98")).toEqual(true);
    });
});
