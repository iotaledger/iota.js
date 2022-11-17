// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Ed25519Address } from "../../addressTypes/ed25519Address";
import { ALIAS_ID_LENGTH } from "../../binary/addresses/aliasAddress";
import { NFT_ID_LENGTH } from "../../binary/addresses/nftAddress";
import type { AddressTypes } from "../../models/addresses/addressTypes";
import { ALIAS_ADDRESS_TYPE } from "../../models/addresses/IAliasAddress";
import { ED25519_ADDRESS_TYPE } from "../../models/addresses/IEd25519Address";
import { NFT_ADDRESS_TYPE } from "../../models/addresses/INftAddress";
import type { ITypeBase } from "../../models/ITypeBase";
import { failValidation } from "../result";

/**
 * The length of an hex encode ed25519 address string with prefix 0x.
 */
const ED25519_ADDRESS_HEX_LENGTH: number = (Ed25519Address.ADDRESS_LENGTH * 2) + 2;

/**
 * The length of an hex encode alias id string with prefix 0x.
 */
const ALIAS_ID_HEX_LENGTH: number = (ALIAS_ID_LENGTH * 2) + 2;

/**
 * The length of an hex encode nft id string with prefix 0x.
 */
const NFT_ID_HEX_LENGTH: number = (NFT_ID_LENGTH * 2) + 2;

/**
 * Validate address.
 * @param address The Address to validate.
 * @throws Error if the validation fails.
 */
export function validateAddress(address: AddressTypes) {
    switch (address.type) {
        case ED25519_ADDRESS_TYPE:
            if (address.pubKeyHash.length !== ED25519_ADDRESS_HEX_LENGTH) {
                failValidation(`Ed25519 Address must have ${ED25519_ADDRESS_HEX_LENGTH} characters.`);
            }
            break;
        case ALIAS_ADDRESS_TYPE:
            if (address.aliasId.length !== ALIAS_ID_HEX_LENGTH) {
                failValidation(`Alias id must have ${ALIAS_ID_HEX_LENGTH} characters.`);
            }
            break;
        case NFT_ADDRESS_TYPE:
            if (address.nftId.length !== NFT_ID_HEX_LENGTH) {
                failValidation(`Nft id must have ${NFT_ID_HEX_LENGTH} characters.`);
            }
            break;
        default:
            failValidation(`Unrecognized Address type ${(address as ITypeBase<number>).type}`);
    }
}
