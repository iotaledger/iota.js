import { Bip32Path } from "../crypto/bip32Path";
/**
 * Definition of address generator state using base path.
 */
export interface IBip32PathAddressGeneratorState {
    /**
     * The base path.
     */
    basePath: Bip32Path;
    /**
     * The address index.
     */
    addressIndex: number;
}
