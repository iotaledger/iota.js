// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Ed25519Address } from "../../addressTypes/ed25519Address";
import { ALIAS_ID_LENGTH } from "../../binary/addresses/aliasAddress";
import { NFT_ID_LENGTH } from "../../binary/addresses/nftAddress";
import type { AddressTypes } from "../../models/addresses/addressTypes";
import { ALIAS_ADDRESS_TYPE, IAliasAddress } from "../../models/addresses/IAliasAddress";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../models/addresses/IEd25519Address";
import { INftAddress, NFT_ADDRESS_TYPE } from "../../models/addresses/INftAddress";
import type { ITypeBase } from "../../models/ITypeBase";
import type { IValidationResult } from "../result";

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
            result = validateEd25519Address(object);
            break;
        case ALIAS_ADDRESS_TYPE:
            result = validateAliasAddress(object);
            break;
        case NFT_ADDRESS_TYPE:
            result = validateNftAddress(object);
            break;
        default:
            throw new Error(`Unrecognized Address type ${(object as ITypeBase<number>).type}`);
    }

    return result;
}

/**
 * Validate Ed25519 Address.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateEd25519Address(object: IEd25519Address): IValidationResult {
    const result: IValidationResult = { isValid: true };
    const errors: string[] = [];

    if (object.type !== ED25519_ADDRESS_TYPE) {
        errors.push(`Type mismatch in ed25519 address ${object.type}`);
    }

    if (object.pubKeyHash.length !== ED25519_ADDRESS_HEX_LENGTH) {
        errors.push(`Ed25519 Address must have ${ED25519_ADDRESS_HEX_LENGTH} charachters.`);
    }

    if (errors.length > 0) {
        result.isValid = false;
        result.errors = errors;
    }

    return result;
}

/**
 * Validate Alias address.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateAliasAddress(object: IAliasAddress): IValidationResult {
    const result: IValidationResult = { isValid: true };
    const errors: string[] = [];

    if (object.type !== ALIAS_ADDRESS_TYPE) {
        errors.push(`Type mismatch in alias address ${object.type}`);
    }

    if (object.aliasId.length !== ALIAS_ID_HEX_LENGTH) {
        errors.push(`Alias id must have ${ALIAS_ID_HEX_LENGTH} charachters.`);
    }

    if (errors.length > 0) {
        result.isValid = false;
        result.errors = errors;
    }

    return result;
}

/**
 * Validate Nft address.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateNftAddress(object: INftAddress): IValidationResult {
    const result: IValidationResult = { isValid: true };
    const errors: string[] = [];

    if (object.type !== NFT_ADDRESS_TYPE) {
        errors.push(`Type mismatch in nft address ${object.type}`);
    }

    if (object.nftId.length !== NFT_ID_HEX_LENGTH) {
        errors.push(`Nft id must have ${NFT_ID_HEX_LENGTH} charachters.`);
    }

    if (errors.length > 0) {
        result.isValid = false;
        result.errors = errors;
    }

    return result;
}
