// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Response from the tips endpoint.
 */
export interface ITipsResponse {
    /**
     * The message id of tip 1.
     */
    tip1MessageId: string;

    /**
     * The message id of tip 2.
     */
    tip2MessageId: string;
}
