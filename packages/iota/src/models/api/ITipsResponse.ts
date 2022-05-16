// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Response from the tips endpoint.
 */
export interface ITipsResponse {
    /**
     * The block ids of the tip.
     */
    tipBlockIds: string[];
}
