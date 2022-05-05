// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { Magnitudes } from "../../src/models/magnitudes";
import { UnitsHelper } from "../../src/utils/unitsHelper";

describe("UnitsHelper", () => {
    test("formatBest should calculate the best units with default decimal places", () => {
        const results = [
            { input: 0, output: "0" },
            { input: 1, output: "1" },
            { input: 10, output: "10" },
            { input: 100, output: "100" },
            { input: 1000, output: "1.00 K" },
            { input: 10000, output: "10.00 K" },
            { input: 100000, output: "100.00 K" },
            { input: 1000000, output: "1.00 M" },
            { input: 10000000, output: "10.00 M" },
            { input: 100000000, output: "100.00 M" },
            { input: 1000000000, output: "1.00 G" },
            { input: 10000000000, output: "10.00 G" },
            { input: 100000000000, output: "100.00 G" },
            { input: 1000000000000, output: "1.00 T" },
            { input: 10000000000000, output: "10.00 T" },
            { input: 100000000000000, output: "100.00 T" },
            { input: 1000000000000000, output: "1.00 P" },
            { input: 10000000000000000, output: "10.00 P" },
            { input: 100000000000000000, output: "100.00 P" },
            { input: 2779530283277761, output: "2.78 P" }
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
            { input: 0, output: "0" },
            { input: 1, output: "1" },
            { input: 10, output: "10" },
            { input: 100, output: "100" },
            { input: 1000, output: "1 K" },
            { input: 10000, output: "10 K" },
            { input: 100000, output: "100 K" },
            { input: 1000000, output: "1 M" },
            { input: 10000000, output: "10 M" },
            { input: 100000000, output: "100 M" },
            { input: 1000000000, output: "1 G" },
            { input: 10000000000, output: "10 G" },
            { input: 100000000000, output: "100 G" },
            { input: 1000000000000, output: "1 T" },
            { input: 10000000000000, output: "10 T" },
            { input: 100000000000000, output: "100 T" },
            { input: 1000000000000000, output: "1 P" },
            { input: 10000000000000000, output: "10 P" },
            { input: 100000000000000000, output: "100 P" },
            { input: 2779530283277761, output: "3 P" }
        ];

        for (let i = 0; i < results.length; i++) {
            expect(UnitsHelper.formatBest(results[i].input, 0)).toEqual(results[i].output);
            if (results[i].input !== 0) {
                expect(UnitsHelper.formatBest(-results[i].input, 0)).toEqual(`-${results[i].output}`);
            }
        }
    });

    test("formatUnits can throw if unrecognised units", () => {
        expect(() => UnitsHelper.formatUnits(10, "ppp" as Magnitudes)).toThrow("Unrecognized");
    });

    test("formatUnits can return 0 with no value", () => {
        expect(UnitsHelper.formatUnits(undefined as unknown as number, "K")).toEqual("0");
    });

    test("calculateBest can return epmty with no value", () => {
        expect(UnitsHelper.calculateBest(undefined as unknown as number)).toEqual("");
    });

    test("convertUnits can throw if unrecognised from units", () => {
        expect(() => UnitsHelper.convertUnits(10, "ppp" as Magnitudes, "")).toThrow("Unrecognized");
    });

    test("convertUnits can throw if unrecognised to units", () => {
        expect(() => UnitsHelper.convertUnits(10, "", "ppp" as Magnitudes)).toThrow("Unrecognized");
    });

    test("convertUnits can return 0 with no value", () => {
        expect(UnitsHelper.convertUnits(undefined as unknown as number, "", "K")).toEqual(0);
    });

    test("convertUnits should calculate the value with new units", () => {
        const results: { input: number; from: Magnitudes; to: Magnitudes; output: number }[] = [
            { input: 1, from: "", to: "", output: 1 },
            { input: 1, from: "", to: "K", output: 0.001 },
            { input: 1, from: "", to: "M", output: 0.000001 },
            { input: 1, from: "", to: "G", output: 0.000000001 },
            { input: 1, from: "", to: "T", output: 0.000000000001 },
            { input: 1, from: "", to: "P", output: 0.000000000000001 },
            { input: 1, from: "K", to: "", output: 1000 },
            { input: 1, from: "M", to: "", output: 1000000 },
            { input: 1, from: "G", to: "", output: 1000000000 },
            { input: 1, from: "T", to: "", output: 1000000000000 },
            { input: 1, from: "P", to: "", output: 1000000000000000 },
            { input: 2779530283277761, from: "", to: "K", output: 2779530283277.761 },
            { input: 2779530283277761, from: "", to: "M", output: 2779530283.277761 },
            { input: 2779530283277761, from: "", to: "G", output: 2779530.283277761 },
            { input: 2779530283277761, from: "", to: "T", output: 2779.530283277761 },
            { input: 2779530283277761, from: "", to: "P", output: 2.779530283277761 },
            { input: 2779530283277.761, from: "K", to: "", output: 2779530283277761 },
            { input: 2779530283.277761, from: "M", to: "", output: 2779530283277761 },
            { input: 2779530.283277761, from: "G", to: "", output: 2779530283277761 },
            { input: 2779.530283277761, from: "T", to: "", output: 2779530283277761 },
            { input: 2.779530283277761, from: "P", to: "", output: 2779530283277761 },
            { input: 123.456789, from: "K", to: "", output: 123456 },
            { input: 123.456789, from: "M", to: "K", output: 123456.789 },
            { input: 123.456789, from: "G", to: "M", output: 123456.789 },
            { input: 123.456789, from: "T", to: "G", output: 123456.789 },
            { input: 123.456789, from: "P", to: "T", output: 123456.789 },
            { input: 123456, from: "", to: "K", output: 123.456 },
            { input: 123456.789, from: "K", to: "M", output: 123.456789 },
            { input: 123456.789, from: "M", to: "G", output: 123.456789 },
            { input: 123456.789, from: "G", to: "T", output: 123.456789 },
            { input: 123456.789, from: "T", to: "P", output: 123.456789 }
        ];

        for (let i = 0; i < results.length; i++) {
            expect(UnitsHelper.convertUnits(results[i].input, results[i].from, results[i].to)).toEqual(
                results[i].output
            );

            expect(UnitsHelper.convertUnits(-results[i].input, results[i].from, results[i].to)).toEqual(
                -results[i].output
            );
        }
    });
});
