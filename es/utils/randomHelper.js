"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3JhbmRvbUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQTs7R0FFRztBQUNIO0lBQUE7SUFvQkEsQ0FBQztJQW5CRzs7OztPQUlHO0lBQ1cscUJBQVEsR0FBdEIsVUFBdUIsTUFBYzs7UUFDakMsSUFBSSxXQUF1QixDQUFDO1FBQzVCLFVBQUksVUFBVSxDQUFDLE1BQU0sMENBQUUsZUFBZSxFQUFFO1lBQ3BDLFdBQVcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQyxVQUFVLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNsRDthQUFNLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxFQUFFO1lBQ3ZDLG9HQUFvRztZQUNwRyxJQUFNLFFBQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsV0FBVyxHQUFHLFFBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNILE1BQU0sSUFBSSxTQUFTLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUNyRDtRQUNELE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFwQlksb0NBQVkifQ==