import { Bip32Path } from "../crypto/bip32Path";
import { IAccountAddressGeneratorState } from "../models/IAccountAddressGeneratorState";
import { IBip32PathAddressGeneratorState } from "../models/IBip32PathAddressGeneratorState";
export declare const DEFAULT_BIP32_ACCOUNT_PATH: string;
/**
 * Generate an account path based on all its parts.
 * @param accountIndex The account index.
 * @param addressIndex The address index.
 * @param isInternal Is this an internal address.
 * @returns The generated address.
 */
export declare function generateAccountPath(accountIndex: number, addressIndex: number, isInternal: boolean): Bip32Path;
/**
 * Generate addresses based on the account indexing style.
 * @param addressState The address state.
 * @param addressState.seed The seed to generate the address for.
 * @param addressState.accountIndex The index of the account to calculate.
 * @param addressState.addressIndex The index of the address to calculate.
 * @param addressState.isInternal Are we generating an internal address.
 * @param isFirst Is this the first address we are generating.
 * @returns The key pair for the address.
 */
export declare function generateAccountAddress(addressState: IAccountAddressGeneratorState, isFirst: boolean): string;
/**
 * Generate a bip32 path based on all its parts.
 * @param basePath The base path for the address.
 * @param addressIndex The address index.
 * @returns The generated address.
 */
export declare function generateBip32Path(basePath: Bip32Path, addressIndex: number): Bip32Path;
/**
 * Generate addresses based on a bip32 path increment.
 * @param addressState The address state.
 * @param addressState.seed The seed to generate the address for.
 * @param addressState.basePath The base path to start building from.
 * @param addressState.addressIndex The index of the address to calculate.
 * @param isFirst Is this the first address we are generating.
 * @returns The key pair for the address.
 */
export declare function generateBip32Address(addressState: IBip32PathAddressGeneratorState, isFirst: boolean): string;
