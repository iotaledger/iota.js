// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ALIAS_ADDRESS_TYPE, IAliasAddress } from "../../src/models/addresses/IAliasAddress";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../src/models/addresses/IEd25519Address";
import { INftAddress, NFT_ADDRESS_TYPE } from "../../src/models/addresses/INftAddress";
import { validateAddress } from "../../src/validation/addresses/addresses";

describe("Address validation", () => {
    test("should pass on a valid ed25519 address", () => {
        const ed25519Address: IEd25519Address = {
            type: ED25519_ADDRESS_TYPE,
            pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        };

        expect(() => validateAddress(ed25519Address)).not.toThrowError();
    });

    test("should pass on a valid alias address", () => {
        const aliasAddress: IAliasAddress = {
            type: ALIAS_ADDRESS_TYPE,
            aliasId: "0x6920b176f613ec7be59e68fc68f597eb3393af80b176f613ec7be59e68fc68f5"
        };

        expect(() => validateAddress(aliasAddress)).not.toThrowError();
    });

    test("should pass on a valid nft address", () => {
        const nftAddress: INftAddress = {
            type: NFT_ADDRESS_TYPE,
            nftId: "0x6920b176f613ec7be59e68fc68f597eb3393af80e68fc68f597eb3393af80120"
        };

        expect(() => validateAddress(nftAddress)).not.toThrowError();
    });

    test("should fail on invalid ed25519 address", () => {
        const ed25519Address: IEd25519Address = {
            type: ED25519_ADDRESS_TYPE,
            pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d"
        };

        expect(() => validateAddress(ed25519Address)).toThrow("Ed25519 Address must have 66 characters.");
    });

    test("should fail on invalid alias address", () => {
        const aliasAddress: IAliasAddress = {
            type: ALIAS_ADDRESS_TYPE,
            aliasId: "0x6920b176f613ec7be59e68fc68f597eb3393af9e68fc68f5"
        };

        expect(() => validateAddress(aliasAddress)).toThrow("Alias id must have 66 characters.");
    });

    test("should fail on invalid nft address", () => {
        const nftAddress: INftAddress = {
            type: NFT_ADDRESS_TYPE,
            nftId: "0x6920b176f613ec7be59e68fc68f59780e68fc68f597eb3393af80120"
        };

        expect(() => validateAddress(nftAddress)).toThrow("Nft id must have 66 characters.");
    });
});
