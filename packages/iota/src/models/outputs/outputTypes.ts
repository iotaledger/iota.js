// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IAliasOutput } from "./IAliasOutput";
import type { IExtendedOutput } from "./IExtendedOutput";
import type { IFoundryOutput } from "./IFoundryOutput";
import type { INftOutput } from "./INftOutput";
import type { ITreasuryOutput } from "./ITreasuryOutput";

/**
 * All of the output types.
 */
export type OutputTypes =
    | ITreasuryOutput
    | IExtendedOutput
    | IAliasOutput
    | IFoundryOutput
    | INftOutput;
