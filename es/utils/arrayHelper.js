"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayHelper = void 0;
/* eslint-disable no-bitwise */
/**
 * Array helper methods.
 */
var ArrayHelper = /** @class */ (function () {
    function ArrayHelper() {
    }
    /**
     * Are the two array equals.
     * @param array1 The first array.
     * @param array2 The second arry.
     * @returns True if the arrays are equal.
     */
    ArrayHelper.equal = function (array1, array2) {
        if (!array1 || !array2 || array1.length !== array2.length) {
            return false;
        }
        for (var i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    };
    return ArrayHelper;
}());
exports.ArrayHelper = ArrayHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvYXJyYXlIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9COztHQUVHO0FBQ0g7SUFBQTtJQXNCQSxDQUFDO0lBckJHOzs7OztPQUtHO0lBQ1csaUJBQUssR0FBbkIsVUFDSSxNQUFzQyxFQUN0QyxNQUFzQztRQUN0QyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUN2RCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDekIsT0FBTyxLQUFLLENBQUM7YUFDaEI7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUF0QkQsSUFzQkM7QUF0Qlksa0NBQVcifQ==