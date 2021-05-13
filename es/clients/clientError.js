"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientError = void 0;
class ClientError extends Error {
    /**
     * Create a new instance of ClientError.
     * @param message The message for the error.
     * @param route The route the request was made to.
     * @param httpStatus The http status code.
     * @param code The code in the payload.
     */
    constructor(message, route, httpStatus, code) {
        super(message);
        this.route = route;
        this.httpStatus = httpStatus;
        this.code = code;
    }
}
exports.ClientError = ClientError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50RXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xpZW50cy9jbGllbnRFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQzs7O0FBRXRDLE1BQWEsV0FBWSxTQUFRLEtBQUs7SUFnQmxDOzs7Ozs7T0FNRztJQUNILFlBQVksT0FBZSxFQUFFLEtBQWEsRUFBRSxVQUFrQixFQUFFLElBQWE7UUFDekUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztDQUNKO0FBN0JELGtDQTZCQyJ9