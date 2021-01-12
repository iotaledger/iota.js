"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHelper = void 0;
/**
 * Class to help with text.
 */
var TextHelper = /** @class */ (function () {
    function TextHelper() {
    }
    /**
     * Is the string UTF8.
     * @param value The value to test.
     * @returns True if the value is UTF8.
     */
    TextHelper.isUTF8 = function (value) {
        return value ? !/[\u0080-\uFFFF]/g.test(value) : true;
    };
    return TextHelper;
}());
exports.TextHelper = TextHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy90ZXh0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDOzs7QUFFdEM7O0dBRUc7QUFDSDtJQUFBO0lBU0EsQ0FBQztJQVJHOzs7O09BSUc7SUFDVyxpQkFBTSxHQUFwQixVQUFxQixLQUFjO1FBQy9CLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzFELENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksZ0NBQVUifQ==