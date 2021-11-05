import type { IExpirationMilestoneIndexFeatureBlock } from "./IExpirationMilestoneIndexFeatureBlock";
import type { IExpirationUnixFeatureBlock } from "./IExpirationUnixFeatureBlock";
import type { IIndexationFeatureBlock } from "./IIndexationFeatureBlock";
import type { IIssuerFeatureBlock } from "./IIssuerFeatureBlock";
import type { IMetadataFeatureBlock } from "./IMetadataFeatureBlock";
import type { IReturnFeatureBlock } from "./IReturnFeatureBlock";
import type { ISenderFeatureBlock } from "./ISenderFeatureBlock";
import type { ITimelockMilestoneIndexFeatureBlock } from "./ITimelockMilestoneIndexFeatureBlock";
import type { ITimelockUnixFeatureBlock } from "./ITimelockUnixFeatureBlock";
/**
 * All of the feature block types.
 */
export declare type FeatureBlockTypes = ISenderFeatureBlock | IIssuerFeatureBlock | IReturnFeatureBlock | ITimelockMilestoneIndexFeatureBlock | ITimelockUnixFeatureBlock | IExpirationMilestoneIndexFeatureBlock | IExpirationUnixFeatureBlock | IMetadataFeatureBlock | IIndexationFeatureBlock;
