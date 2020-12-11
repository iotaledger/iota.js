// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Units } from "../../src/models/units";
import { UnitsHelper } from "../../src/utils/unitsHelper";

describe("UnitsHelper", () => {
    test("formatBest should calculate the best units with default decimal places", () => {
        const results = [
            { input: 0, output: "0 i" },
            { input: 1, output: "1 i" },
            { input: 10, output: "10 i" },
            { input: 100, output: "100 i" },
            { input: 1000, output: "1.00 Ki" },
            { input: 10000, output: "10.00 Ki" },
            { input: 100000, output: "100.00 Ki" },
            { input: 1000000, output: "1.00 Mi" },
            { input: 10000000, output: "10.00 Mi" },
            { input: 100000000, output: "100.00 Mi" },
            { input: 1000000000, output: "1.00 Gi" },
            { input: 10000000000, output: "10.00 Gi" },
            { input: 100000000000, output: "100.00 Gi" },
            { input: 1000000000000, output: "1.00 Ti" },
            { input: 10000000000000, output: "10.00 Ti" },
            { input: 100000000000000, output: "100.00 Ti" },
            { input: 1000000000000000, output: "1.00 Pi" },
            { input: 10000000000000000, output: "10.00 Pi" },
            { input: 100000000000000000, output: "100.00 Pi" },
            { input: 2779530283277761, output: "2.78 Pi" }
        ];

        for (let i = 0; i < results.length; i++) {
            expect(UnitsHelper.formatBest(results[i].input)).toEqual(results[i].output);
            if (results[i].input !== 0) {
                expect(UnitsHelper.formatBest(-results[i].input)).toEqual(`-${results[i].output}`);
            }
        }
    });

    test("formatBest should calculate the best units with no decimal places", () => {
        const results = [
            { input: 0, output: "0 i" },
            { input: 1, output: "1 i" },
            { input: 10, output: "10 i" },
            { input: 100, output: "100 i" },
            { input: 1000, output: "1 Ki" },
            { input: 10000, output: "10 Ki" },
            { input: 100000, output: "100 Ki" },
            { input: 1000000, output: "1 Mi" },
            { input: 10000000, output: "10 Mi" },
            { input: 100000000, output: "100 Mi" },
            { input: 1000000000, output: "1 Gi" },
            { input: 10000000000, output: "10 Gi" },
            { input: 100000000000, output: "100 Gi" },
            { input: 1000000000000, output: "1 Ti" },
            { input: 10000000000000, output: "10 Ti" },
            { input: 100000000000000, output: "100 Ti" },
            { input: 1000000000000000, output: "1 Pi" },
            { input: 10000000000000000, output: "10 Pi" },
            { input: 100000000000000000, output: "100 Pi" },
            { input: 2779530283277761, output: "3 Pi" }
        ];

        for (let i = 0; i < results.length; i++) {
            expect(UnitsHelper.formatBest(results[i].input, 0)).toEqual(results[i].output);
            if (results[i].input !== 0) {
                expect(UnitsHelper.formatBest(-results[i].input, 0)).toEqual(`-${results[i].output}`);
            }
        }
    });

    test("formatUnits can throw if unrecognised units", () => {
        expect(() => UnitsHelper.formatUnits(10, "ppp" as Units)).toThrow("Unrecognized");
    });

    test("formatUnits can return 0 with no value", () => {
        expect(UnitsHelper.formatUnits(undefined as unknown as number, "Ki")).toEqual("0 Ki");
    });

    test("calculateBest can return i with no value", () => {
        expect(UnitsHelper.calculateBest(undefined as unknown as number)).toEqual("i");
    });

    test("convertUnits can throw if unrecognised from units", () => {
        expect(() => UnitsHelper.convertUnits(10, "ppp" as Units, "i")).toThrow("Unrecognized");
    });

    test("convertUnits can throw if unrecognised to units", () => {
        expect(() => UnitsHelper.convertUnits(10, "i", "ppp" as Units)).toThrow("Unrecognized");
    });

    test("convertUnits can return 0 with no value", () => {
        expect(UnitsHelper.convertUnits(undefined as unknown as number, "i", "Ki")).toEqual(0);
    });

    test("convertUnits should throw with fromUnit i and fractional number", () => {
        expect(() => UnitsHelper.convertUnits(1.23, "i", "Ki")).toThrow("integer");
    });

    test("convertUnits should calculate the value with new units", () => {
        const results: { input: number; from: Units; to: Units; output: number }[] = [
            { input: 1, from: "i", to: "i", output: 1 },
            { input: 1, from: "i", to: "Ki", output: 0.001 },
            { input: 1, from: "i", to: "Mi", output: 0.000001 },
            { input: 1, from: "i", to: "Gi", output: 0.000000001 },
            { input: 1, from: "i", to: "Ti", output: 0.000000000001 },
            { input: 1, from: "i", to: "Pi", output: 0.000000000000001 },
            { input: 1, from: "Ki", to: "i", output: 1000 },
            { input: 1, from: "Mi", to: "i", output: 1000000 },
            { input: 1, from: "Gi", to: "i", output: 1000000000 },
            { input: 1, from: "Ti", to: "i", output: 1000000000000 },
            { input: 1, from: "Pi", to: "i", output: 1000000000000000 },
            { input: 2779530283277761, from: "i", to: "Ki", output: 2779530283277.761 },
            { input: 2779530283277761, from: "i", to: "Mi", output: 2779530283.277761 },
            { input: 2779530283277761, from: "i", to: "Gi", output: 2779530.283277761 },
            { input: 2779530283277761, from: "i", to: "Ti", output: 2779.530283277761 },
            { input: 2779530283277761, from: "i", to: "Pi", output: 2.779530283277761 },
            { input: 2779530283277.761, from: "Ki", to: "i", output: 2779530283277761 },
            { input: 2779530283.277761, from: "Mi", to: "i", output: 2779530283277761 },
            { input: 2779530.283277761, from: "Gi", to: "i", output: 2779530283277761 },
            { input: 2779.530283277761, from: "Ti", to: "i", output: 2779530283277761 },
            { input: 2.779530283277761, from: "Pi", to: "i", output: 2779530283277761 },
            { input: 123.456789, from: "Ki", to: "i", output: 123456 },
            { input: 123.456789, from: "Mi", to: "Ki", output: 123456.789 },
            { input: 123.456789, from: "Gi", to: "Mi", output: 123456.789 },
            { input: 123.456789, from: "Ti", to: "Gi", output: 123456.789 },
            { input: 123.456789, from: "Pi", to: "Ti", output: 123456.789 },
            { input: 123456, from: "i", to: "Ki", output: 123.456 },
            { input: 123456.789, from: "Ki", to: "Mi", output: 123.456789 },
            { input: 123456.789, from: "Mi", to: "Gi", output: 123.456789 },
            { input: 123456.789, from: "Gi", to: "Ti", output: 123.456789 },
            { input: 123456.789, from: "Ti", to: "Pi", output: 123.456789 }
        ];

        for (let i = 0; i < results.length; i++) {
            expect(
                UnitsHelper.convertUnits(
                    results[i].input,
                    results[i].from,
                    results[i].to)
            ).toEqual(results[i].output);

            expect(
                UnitsHelper.convertUnits(
                    -results[i].input,
                    results[i].from,
                    results[i].to)
            ).toEqual(-results[i].output);
        }
    });
});
