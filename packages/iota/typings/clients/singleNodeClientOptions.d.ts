import type { IPowProvider } from "../models/IPowProvider";
/**
 * Options used when constructing SingleNodeClient.
 */
export interface SingleNodeClientOptions {
    /**
     * Base path for API location, defaults to /api/v2/.
     */
    basePath?: string;
    /**
     * Base path for API plugin location, defaults to /api/plugins/.
     */
    basePluginPath?: string;
    /**
     * Use a custom pow provider instead of the one on the node.
     */
    powProvider?: IPowProvider;
    /**
     * Timeout for API requests.
     */
    timeout?: number;
    /**
     * Username for the endpoint.
     */
    userName?: string;
    /**
     * Password for the endpoint.
     */
    password?: string;
    /**
     * Additional headers to include in the requests.
     */
    headers?: {
        [id: string]: string;
    };
}
