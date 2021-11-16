import type { IDustDepositReturnFeatureBlock } from "./IDustDepositReturnFeatureBlock";
import type { IExpirationMilestoneIndexFeatureBlock } from "./IExpirationMilestoneIndexFeatureBlock";
import type { IExpirationUnixFeatureBlock } from "./IExpirationUnixFeatureBlock";
import type { IIndexationFeatureBlock } from "./IIndexationFeatureBlock";
import type { IIssuerFeatureBlock } from "./IIssuerFeatureBlock";
import type { IMetadataFeatureBlock } from "./IMetadataFeatureBlock";
import type { ISenderFeatureBlock } from "./ISenderFeatureBlock";
import type { ITimelockMilestoneIndexFeatureBlock } from "./ITimelockMilestoneIndexFeatureBlock";
import type { ITimelockUnixFeatureBlock } from "./ITimelockUnixFeatureBlock";
/**
 * All of the feature block types.
 */
export declare type FeatureBlockTypes = ISenderFeatureBlock | IIssuerFeatureBlock | IDustDepositReturnFeatureBlock | ITimelockMilestoneIndexFeatureBlock | ITimelockUnixFeatureBlock | IExpirationMilestoneIndexFeatureBlock | IExpirationUnixFeatureBlock | IMetadataFeatureBlock | IIndexationFeatureBlock;
