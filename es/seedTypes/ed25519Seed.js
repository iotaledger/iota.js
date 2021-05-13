"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519Seed = exports.ED25519_SEED_TYPE = void 0;
const bip39_1 = require("../crypto/bip39");
const ed25519_1 = require("../crypto/ed25519");
const slip0010_1 = require("../crypto/slip0010");
/**
 * The global type for the seed.
 */
exports.ED25519_SEED_TYPE = 1;
/**
 * Class to help with seeds.
 */
class Ed25519Seed {
    /**
     * Create a new instance of Ed25519Seed.
     * @param secretKeyBytes The bytes.
     */
    constructor(secretKeyBytes) {
        this._secretKey = secretKeyBytes !== null && secretKeyBytes !== void 0 ? secretKeyBytes : new Uint8Array();
    }
    /**
     * Create the seed from a Bip39 mnemonic.
     * @param mnemonic The mnemonic to create the seed from.
     * @returns A new instance of Ed25519Seed.
     */
    static fromMnemonic(mnemonic) {
        return new Ed25519Seed(bip39_1.Bip39.mnemonicToSeed(mnemonic));
    }
    /**
     * Get the key pair from the seed.
     * @returns The key pair.
     */
    keyPair() {
        const signKeyPair = ed25519_1.Ed25519.keyPairFromSeed(this._secretKey);
        return {
            publicKey: signKeyPair.publicKey,
            privateKey: signKeyPair.privateKey
        };
    }
    /**
     * Generate a new seed from the path.
     * @param path The path to generate the seed for.
     * @returns The generated seed.
     */
    generateSeedFromPath(path) {
        const keys = slip0010_1.Slip0010.derivePath(this._secretKey, path);
        return new Ed25519Seed(keys.privateKey);
    }
    /**
     * Return the key as bytes.
     * @returns The key as bytes.
     */
    toBytes() {
        return this._secretKey;
    }
}
exports.Ed25519Seed = Ed25519Seed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOVNlZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VlZFR5cGVzL2VkMjU1MTlTZWVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDJDQUF3QztBQUN4QywrQ0FBNEM7QUFDNUMsaURBQThDO0FBSTlDOztHQUVHO0FBQ1UsUUFBQSxpQkFBaUIsR0FBVyxDQUFDLENBQUM7QUFFM0M7O0dBRUc7QUFDSCxNQUFhLFdBQVc7SUFPcEI7OztPQUdHO0lBQ0gsWUFBWSxjQUEyQjtRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLGNBQWMsYUFBZCxjQUFjLGNBQWQsY0FBYyxHQUFJLElBQUksVUFBVSxFQUFFLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQWdCO1FBQ3ZDLE9BQU8sSUFBSSxXQUFXLENBQUMsYUFBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDs7O09BR0c7SUFDSSxPQUFPO1FBQ1YsTUFBTSxXQUFXLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTdELE9BQU87WUFDSCxTQUFTLEVBQUUsV0FBVyxDQUFDLFNBQVM7WUFDaEMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxVQUFVO1NBQ3JDLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLG9CQUFvQixDQUFDLElBQWU7UUFDdkMsTUFBTSxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RCxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0NBQ0o7QUF0REQsa0NBc0RDIn0=