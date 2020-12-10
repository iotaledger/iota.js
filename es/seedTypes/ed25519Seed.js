"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519Seed = exports.ED25519_SEED_TYPE = void 0;
var ed25519_1 = require("../crypto/ed25519");
var slip0010_1 = require("../crypto/slip0010");
/**
 * The global type for the seed.
 */
exports.ED25519_SEED_TYPE = 1;
/**
 * Class to help with seeds.
 */
var Ed25519Seed = /** @class */ (function () {
    /**
     * Create a new instance of Ed25519Seed.
     * @param secretKeyBytes The bytes.
     */
    function Ed25519Seed(secretKeyBytes) {
        this._secretKey = secretKeyBytes !== null && secretKeyBytes !== void 0 ? secretKeyBytes : new Uint8Array();
    }
    /**
     * Get the key pair from the seed.
     * @returns The key pair.
     */
    Ed25519Seed.prototype.keyPair = function () {
        var signKeyPair = ed25519_1.Ed25519.keyPairFromSeed(this._secretKey);
        return {
            publicKey: signKeyPair.publicKey,
            privateKey: signKeyPair.privateKey
        };
    };
    /**
     * Generate a new seed from the path.
     * @param path The path to generate the seed for.
     * @returns The generated seed.
     */
    Ed25519Seed.prototype.generateSeedFromPath = function (path) {
        var keys = slip0010_1.Slip0010.derivePath(this._secretKey, path);
        return new Ed25519Seed(keys.privateKey);
    };
    /**
     * Return the key as bytes.
     * @returns The key as bytes.
     */
    Ed25519Seed.prototype.toBytes = function () {
        return this._secretKey;
    };
    /**
     * SeedSize is the size, in bytes, of private key seeds.
     * @internal
     */
    Ed25519Seed.SEED_SIZE_BYTES = 32;
    return Ed25519Seed;
}());
exports.Ed25519Seed = Ed25519Seed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOVNlZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VlZFR5cGVzL2VkMjU1MTlTZWVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZDQUE0QztBQUM1QywrQ0FBOEM7QUFJOUM7O0dBRUc7QUFDVSxRQUFBLGlCQUFpQixHQUFXLENBQUMsQ0FBQztBQUUzQzs7R0FFRztBQUNIO0lBYUk7OztPQUdHO0lBQ0gscUJBQVksY0FBMkI7UUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxjQUFjLGFBQWQsY0FBYyxjQUFkLGNBQWMsR0FBSSxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBQ3pELENBQUM7SUFFRDs7O09BR0c7SUFDSSw2QkFBTyxHQUFkO1FBQ0ksSUFBTSxXQUFXLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTdELE9BQU87WUFDSCxTQUFTLEVBQUUsV0FBVyxDQUFDLFNBQVM7WUFDaEMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxVQUFVO1NBQ3JDLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDBDQUFvQixHQUEzQixVQUE0QixJQUFlO1FBQ3ZDLElBQU0sSUFBSSxHQUFHLG1CQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEQsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDZCQUFPLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQWpERDs7O09BR0c7SUFDVywyQkFBZSxHQUFXLEVBQUUsQ0FBQztJQThDL0Msa0JBQUM7Q0FBQSxBQW5ERCxJQW1EQztBQW5EWSxrQ0FBVyJ9