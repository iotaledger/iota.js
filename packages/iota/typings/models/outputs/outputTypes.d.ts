import type { IAliasOutput } from "./IAliasOutput";
import type { IExtendedOutput } from "./IExtendedOutput";
import type { IFoundryOutput } from "./IFoundryOutput";
import type { INftOutput } from "./INftOutput";
import type { ISigLockedDustAllowanceOutput } from "./ISigLockedDustAllowanceOutput";
import type { ISimpleOutput } from "./ISimpleOutput";
import type { ITreasuryOutput } from "./ITreasuryOutput";
/**
 * All of the output types.
 */
export declare type OutputTypes = ISimpleOutput | ISigLockedDustAllowanceOutput | ITreasuryOutput | IExtendedOutput | IAliasOutput | IFoundryOutput | INftOutput;
