"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayHelper = void 0;
/**
 * Array helper methods.
 */
class ArrayHelper {
    /**
     * Are the two array equals.
     * @param array1 The first array.
     * @param array2 The second array.
     * @returns True if the arrays are equal.
     */
    static equal(array1, array2) {
        if (!array1 || !array2 || array1.length !== array2.length) {
            return false;
        }
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    }
}
exports.ArrayHelper = ArrayHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvYXJyYXlIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7OztBQUV0Qzs7R0FFRztBQUNILE1BQWEsV0FBVztJQUNwQjs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQ2YsTUFBc0MsRUFDdEMsTUFBc0M7UUFDdEMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDdkQsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pCLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUF0QkQsa0NBc0JDIn0=