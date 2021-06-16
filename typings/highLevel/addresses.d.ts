import { Bip32Path } from "../crypto/bip32Path";
import type { IBip44GeneratorState } from "../models/IBip44GeneratorState";
export declare const IOTA_BIP44_BASE_PATH: string;
/**
 * Generate a bip44 path based on all its parts.
 * @param accountIndex The account index.
 * @param addressIndex The address index.
 * @param isInternal Is this an internal address.
 * @returns The generated address.
 */
export declare function generateBip44Path(accountIndex: number, addressIndex: number, isInternal: boolean): Bip32Path;
/**
 * Generate addresses based on the account indexing style.
 * @param generatorState The address state.
 * @param generatorState.accountIndex The index of the account to calculate.
 * @param generatorState.addressIndex The index of the address to calculate.
 * @param generatorState.isInternal Are we generating an internal address.
 * @param isFirst Is this the first address we are generating.
 * @returns The key pair for the address.
 */
export declare function generateBip44Address(generatorState: IBip44GeneratorState, isFirst: boolean): string;
