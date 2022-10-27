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
import { IValidationResult, failValidation } from "../result";

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
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateAddress(object: AddressTypes): IValidationResult {
    let result: IValidationResult = { isValid: true };

    switch (object.type) {
        case ED25519_ADDRESS_TYPE:
            if (object.pubKeyHash.length !== ED25519_ADDRESS_HEX_LENGTH) {
                result = failValidation(result, `Ed25519 Address must have ${ED25519_ADDRESS_HEX_LENGTH} characters.`);
            }
            break;
        case ALIAS_ADDRESS_TYPE:
            if (object.aliasId.length !== ALIAS_ID_HEX_LENGTH) {
                result = failValidation(result, `Alias id must have ${ALIAS_ID_HEX_LENGTH} characters.`);
            }
            break;
        case NFT_ADDRESS_TYPE:
            if (object.nftId.length !== NFT_ID_HEX_LENGTH) {
                result = failValidation(result, `Nft id must have ${NFT_ID_HEX_LENGTH} characters.`);
            }
            break;
        default:
            throw new Error(`Unrecognized Address type ${(object as ITypeBase<number>).type}`);
    }

    return result;
}
