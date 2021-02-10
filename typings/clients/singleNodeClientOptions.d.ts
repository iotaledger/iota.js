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
     * Authorization header.
     */
    authorizationHeader?: string;
}
