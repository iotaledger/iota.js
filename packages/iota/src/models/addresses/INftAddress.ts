// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { HexEncodedString } from "../hexEncodedTypes";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the NFT address type.
 */
export const NFT_ADDRESS_TYPE = 16;

/**
 * NFT address.
 */
export interface INftAddress extends ITypeBase<16> {
    /**
     * The NFT Id.
     */
    nftId: HexEncodedString;
}
