// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import { Bip32Path } from "../../src/keys/bip32Path";
import { Slip0010 } from "../../src/keys/slip0010";

describe("Slip0010", () => {
    // https://github.com/satoshilabs/slips/blob/master/slip-0010.md
    test("Can generate a master key and chain code from seed", () => {
        const { privateKey, chainCode } = Slip0010.getMasterKeyFromSeed(
            Converter.hexToBytes("000102030405060708090a0b0c0d0e0f")
        );
        expect(Converter.bytesToHex(privateKey)).toEqual(
            "2b4be7f19ee27bbf30c667b642d5f4aa69fd169872f8fc3059c08ebae2eb19e7"
        );
        expect(Converter.bytesToHex(chainCode)).toEqual(
            "90046a93de5380a72b5e45010748567d5ea02bbf6522f979e05c0d8d8ca9fffb"
        );

        const publicKey = Slip0010.getPublicKey(privateKey);
        expect(Converter.bytesToHex(publicKey)).toEqual(
            "00a4b2856bfec510abab89753fac1ac0e1112364e7d250545963f135f2a33188ed"
        );
    });

    test("Can generate a key and chain code from seed and path m/0H", () => {
        const { privateKey, chainCode } = Slip0010.derivePath(
            Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
            new Bip32Path("m/0")
        );
        expect(Converter.bytesToHex(privateKey)).toEqual(
            "68e0fe46dfb67e368c75379acec591dad19df3cde26e63b93a8e704f1dade7a3"
        );
        expect(Converter.bytesToHex(chainCode)).toEqual(
            "8b59aa11380b624e81507a27fedda59fea6d0b779a778918a2fd3590e16e9c69"
        );

        const publicKey = Slip0010.getPublicKey(privateKey);
        expect(Converter.bytesToHex(publicKey)).toEqual(
            "008c8a13df77a28f3445213a0f432fde644acaa215fc72dcdf300d5efaa85d350c"
        );
    });

    test("Can generate a key and chain code from seed and path m/0H/1H", () => {
        const { privateKey, chainCode } = Slip0010.derivePath(
            Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
            new Bip32Path("m/0/1")
        );
        expect(Converter.bytesToHex(privateKey)).toEqual(
            "b1d0bad404bf35da785a64ca1ac54b2617211d2777696fbffaf208f746ae84f2"
        );
        expect(Converter.bytesToHex(chainCode)).toEqual(
            "a320425f77d1b5c2505a6b1b27382b37368ee640e3557c315416801243552f14"
        );

        const publicKey = Slip0010.getPublicKey(privateKey);
        expect(Converter.bytesToHex(publicKey)).toEqual(
            "001932a5270f335bed617d5b935c80aedb1a35bd9fc1e31acafd5372c30f5c1187"
        );
    });

    test("Can generate a key and chain code from seed and path m/0H/1H/2H", () => {
        const { privateKey, chainCode } = Slip0010.derivePath(
            Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
            new Bip32Path("m/0/1/2")
        );
        expect(Converter.bytesToHex(privateKey)).toEqual(
            "92a5b23c0b8a99e37d07df3fb9966917f5d06e02ddbd909c7e184371463e9fc9"
        );
        expect(Converter.bytesToHex(chainCode)).toEqual(
            "2e69929e00b5ab250f49c3fb1c12f252de4fed2c1db88387094a0f8c4c9ccd6c"
        );

        const publicKey = Slip0010.getPublicKey(privateKey);
        expect(Converter.bytesToHex(publicKey)).toEqual(
            "00ae98736566d30ed0e9d2f4486a64bc95740d89c7db33f52121f8ea8f76ff0fc1"
        );
    });

    test("Can generate a key and chain code from seed and path m/0H/1H/2H/2H", () => {
        const { privateKey, chainCode } = Slip0010.derivePath(
            Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
            new Bip32Path("m/0/1/2/2")
        );
        expect(Converter.bytesToHex(privateKey)).toEqual(
            "30d1dc7e5fc04c31219ab25a27ae00b50f6fd66622f6e9c913253d6511d1e662"
        );
        expect(Converter.bytesToHex(chainCode)).toEqual(
            "8f6d87f93d750e0efccda017d662a1b31a266e4a6f5993b15f5c1f07f74dd5cc"
        );

        const publicKey = Slip0010.getPublicKey(privateKey);
        expect(Converter.bytesToHex(publicKey)).toEqual(
            "008abae2d66361c879b900d204ad2cc4984fa2aa344dd7ddc46007329ac76c429c"
        );
    });

    test("Can generate a key and chain code from seed and path m/0H/1H/2H/2H/1000000000H", () => {
        const { privateKey, chainCode } = Slip0010.derivePath(
            Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
            new Bip32Path("m/0/1/2/2/1000000000H")
        );
        expect(Converter.bytesToHex(privateKey)).toEqual(
            "8f94d394a8e8fd6b1bc2f3f49f5c47e385281d5c17e65324b0f62483e37e8793"
        );
        expect(Converter.bytesToHex(chainCode)).toEqual(
            "68789923a0cac2cd5a29172a475fe9e0fb14cd6adb5ad98a3fa70333e7afa230"
        );

        const publicKey = Slip0010.getPublicKey(privateKey);
        expect(Converter.bytesToHex(publicKey)).toEqual(
            "003c24da049451555d51a7014a37337aa4e12d41e485abccfa46b47dfb2af54b7a"
        );
    });
});
