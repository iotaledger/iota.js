// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * The base token info of the node.
 */
export interface INodeInfoBaseToken {
    /**
     * The base token name.
     */
    name: string;
    /**
     * The base token ticker symbol.
     */
    tickerSymbol: string;
    /**
     * The base token unit.
     */
    unit: string;
    /**
     * The base token decimals.
     */
    decimals: number;
    /**
     * The use metric prefix flag.
     */
    useMetricPrefix: boolean;
}
