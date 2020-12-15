// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { IPowProvider } from "../models/IPowProvider";

export interface SingleNodeClientOptions {
    /**
     * Base path for API location, defaults to /api/v1/
     */
    basePath?: string;

    /**
     * Use a custom pow provider instead of the one on the node.
     */
    powProvider?: IPowProvider;

    /**
     * The target score required for pow on the network.
     */
    targetScore?: number;

    /**
     * Timeout for API requests.
     */
    timeout?: number;
}
