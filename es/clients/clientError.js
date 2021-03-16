"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientError = void 0;
var ClientError = /** @class */ (function (_super) {
    __extends(ClientError, _super);
    /**
     * Create a new instance of ClientError.
     * @param message The message for the error.
     * @param route The route the request was made to.
     * @param httpStatus The http status code.
     * @param code The code in the payload.
     */
    function ClientError(message, route, httpStatus, code) {
        var _this = _super.call(this, message) || this;
        _this.route = route;
        _this.httpStatus = httpStatus;
        _this.code = code;
        return _this;
    }
    return ClientError;
}(Error));
exports.ClientError = ClientError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50RXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xpZW50cy9jbGllbnRFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXRDO0lBQWlDLCtCQUFLO0lBZ0JsQzs7Ozs7O09BTUc7SUFDSCxxQkFBWSxPQUFlLEVBQUUsS0FBYSxFQUFFLFVBQWtCLEVBQUUsSUFBYTtRQUE3RSxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUlqQjtRQUhHLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLEtBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOztJQUNyQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBN0JELENBQWlDLEtBQUssR0E2QnJDO0FBN0JZLGtDQUFXIn0=