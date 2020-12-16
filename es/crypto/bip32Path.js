"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
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
     * Construct a new path by cloning an existing one.
     * @param bip32Path The path to clone.
     * @returns A new instance of Bip32Path.
     */
    Bip32Path.fromPath = function (bip32Path) {
        var p = new Bip32Path();
        p._path = bip32Path._path.slice();
        return p;
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlwMzJQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyeXB0by9iaXAzMlBhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7OztBQUV0Qzs7R0FFRztBQUNIO0lBT0k7OztPQUdHO0lBQ0gsbUJBQVksV0FBb0I7UUFDNUIsSUFBSSxXQUFXLEVBQUU7WUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFcEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN0QjtTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ1csa0JBQVEsR0FBdEIsVUFBdUIsU0FBb0I7UUFDdkMsSUFBTSxDQUFDLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEMsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksNEJBQVEsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDckUsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHdCQUFJLEdBQVgsVUFBWSxLQUFhO1FBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUcsS0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGdDQUFZLEdBQW5CLFVBQW9CLEtBQWE7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUksS0FBSyxNQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSx1QkFBRyxHQUFWO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksa0NBQWMsR0FBckI7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBeEVELElBd0VDO0FBeEVZLDhCQUFTIn0=