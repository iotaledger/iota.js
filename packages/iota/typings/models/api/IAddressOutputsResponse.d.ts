import type { IOutputsResponse } from "./IOutputsResponse";
/**
 * List of outputs for an address.
 */
export interface IAddressOutputsResponse extends IOutputsResponse {
    /**
     * The type for the address.
     */
    addressType: number;
    /**
     * The address that the outputs are for.
     */
    address: string;
}
