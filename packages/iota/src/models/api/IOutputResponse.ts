// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { OutputTypes } from "../outputs/outputTypes";
import type { IOutputMetadataResponse } from "./IOutputMetadataResponse";

/**
 * Details of an output.
 */
export interface IOutputResponse {
    /**
     * The metadata about the output.
     */
    metadata: IOutputMetadataResponse;

    /**
     * The output.
     */
    output: OutputTypes;
}
