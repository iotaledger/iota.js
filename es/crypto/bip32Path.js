"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bip32Path = void 0;
/**
 * Class to help with bip32 paths.
 */
var Bip32Path = /** @class */ (function () {
    /**
     * Create a new instance of Bip32Path.
     * @param initialPath Initial path to create.
     */
    function Bip32Path(initialPath) {
        if (initialPath) {
            this._path = initialPath.split("/");
            if (this._path[0] === "m") {
                this._path.shift();
            }
        }
        else {
            this._path = [];
        }
    }
    /**
     * Converts the path to a string.
     * @returns The path as a string.
     */
    Bip32Path.prototype.toString = function () {
        return this._path.length > 0 ? "m/" + this._path.join("/") : "m";
    };
    /**
     * Push a new index on to the path.
     * @param index The index to add to the path.
     */
    Bip32Path.prototype.push = function (index) {
        this._path.push("" + index);
    };
    /**
     * Push a new hardened index on to the path.
     * @param index The index to add to the path.
     */
    Bip32Path.prototype.pushHardened = function (index) {
        this._path.push(index + "'");
    };
    /**
     * Pop an index from the path.
     */
    Bip32Path.prototype.pop = function () {
        this._path.pop();
    };
    /**
     * Get the segments.
     * @returns The segments as numbers.
     */
    Bip32Path.prototype.numberSegments = function () {
        return this._path.map(function (p) { return Number.parseInt(p, 10); });
    };
    return Bip32Path;
}());
exports.Bip32Path = Bip32Path;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlwMzJQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyeXB0by9iaXAzMlBhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7O0dBRUc7QUFDSDtJQU9JOzs7T0FHRztJQUNILG1CQUFZLFdBQW9CO1FBQzVCLElBQUksV0FBVyxFQUFFO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXBDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDdEI7U0FDSjthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksNEJBQVEsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDckUsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHdCQUFJLEdBQVgsVUFBWSxLQUFhO1FBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUcsS0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGdDQUFZLEdBQW5CLFVBQW9CLEtBQWE7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUksS0FBSyxNQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSx1QkFBRyxHQUFWO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksa0NBQWMsR0FBckI7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBN0RELElBNkRDO0FBN0RZLDhCQUFTIn0=