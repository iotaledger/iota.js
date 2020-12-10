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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlwMzJQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyeXB0by9iaXAzMlBhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7OztBQUV0Qzs7R0FFRztBQUNIO0lBT0k7OztPQUdHO0lBQ0gsbUJBQVksV0FBb0I7UUFDNUIsSUFBSSxXQUFXLEVBQUU7WUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFcEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN0QjtTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSw0QkFBUSxHQUFmO1FBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksd0JBQUksR0FBWCxVQUFZLEtBQWE7UUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBRyxLQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksZ0NBQVksR0FBbkIsVUFBb0IsS0FBYTtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBSSxLQUFLLE1BQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUNJLHVCQUFHLEdBQVY7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxrQ0FBYyxHQUFyQjtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUE3REQsSUE2REM7QUE3RFksOEJBQVMifQ==