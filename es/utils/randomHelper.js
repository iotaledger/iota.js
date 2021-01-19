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
        if (process.env.BROWSER) {
            var randomBytes = new Uint8Array(length);
            window.crypto.getRandomValues(randomBytes);
            return randomBytes;
            // eslint-disable-next-line no-else-return
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
            var crypto_1 = require("crypto");
            return crypto_1.randomBytes(length);
        }
    };
    return RandomHelper;
}());
exports.RandomHelper = RandomHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3JhbmRvbUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQzs7O0FBRXRDOztHQUVHO0FBQ0g7SUFBQTtJQWtCQSxDQUFDO0lBakJHOzs7O09BSUc7SUFDVyxxQkFBUSxHQUF0QixVQUF1QixNQUFjO1FBQ2pDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDckIsSUFBTSxXQUFXLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDM0MsT0FBTyxXQUFXLENBQUM7WUFDdkIsMENBQTBDO1NBQ3pDO2FBQU07WUFDSCxvR0FBb0c7WUFDcEcsSUFBTSxRQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sUUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQWUsQ0FBQztTQUNuRDtJQUNMLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7QUFsQlksb0NBQVkifQ==