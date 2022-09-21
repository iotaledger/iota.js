// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Base response data.
 */
export interface IResponse {
    /**
     * Optional error in the response.
     */
    error?: {
        /**
         * The code for the error response.
         */
        code: string;

        /**
         * A more descriptive version of the error.
         */
        message: string;
    };
}
