/**
 * Class to represent errors from Client.
 */
export declare class ClientError extends Error {
    /**
     * The route the request was made to.
     */
    route: string;
    /**
     * The HTTP status code returned.
     */
    httpStatus: number;
    /**
     * The code return in the payload.
     */
    code?: string;
    /**
     * Create a new instance of ClientError.
     * @param message The message for the error.
     * @param route The route the request was made to.
     * @param httpStatus The http status code.
     * @param code The code in the payload.
     */
    constructor(message: string, route: string, httpStatus: number, code?: string);
}
