"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomHelper = void 0;
/**
 * Class to help with random generation.
 */
var RandomHelper = /** @class */ (function () {
    function RandomHelper() {
    }
    /**
     * Generate a new random array.
     * @param length The length of buffer to create.
     * @returns The random array.
     */
    RandomHelper.generate = function (length) {
        var _a;
        var randomBytes;
        if ((_a = globalThis.crypto) === null || _a === void 0 ? void 0 : _a.getRandomValues) {
            randomBytes = new Uint8Array(length);
            globalThis.crypto.getRandomValues(randomBytes);
        }
        else if (typeof require !== "undefined") {
            // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
            var crypto_1 = require("crypto");
            randomBytes = crypto_1.randomBytes(length);
        }
        else {
            throw new TypeError("No random method available");
        }
        return randomBytes;
    };
    return RandomHelper;
}());
exports.RandomHelper = RandomHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3JhbmRvbUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQzs7O0FBRXRDOztHQUVHO0FBQ0g7SUFBQTtJQW9CQSxDQUFDO0lBbkJHOzs7O09BSUc7SUFDVyxxQkFBUSxHQUF0QixVQUF1QixNQUFjOztRQUNqQyxJQUFJLFdBQXVCLENBQUM7UUFDNUIsVUFBSSxVQUFVLENBQUMsTUFBTSwwQ0FBRSxlQUFlLEVBQUU7WUFDcEMsV0FBVyxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2xEO2FBQU0sSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLEVBQUU7WUFDdkMsb0dBQW9HO1lBQ3BHLElBQU0sUUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqQyxXQUFXLEdBQUcsUUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0gsTUFBTSxJQUFJLFNBQVMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQXBCWSxvQ0FBWSJ9