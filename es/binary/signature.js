"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeEd25519Signature = exports.deserializeEd25519Signature = exports.serializeSignature = exports.deserializeSignature = exports.MIN_ED25519_SIGNATURE_LENGTH = exports.MIN_SIGNATURE_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var ed25519_1 = require("../crypto/ed25519");
var IEd25519Signature_1 = require("../models/IEd25519Signature");
var common_1 = require("./common");
exports.MIN_SIGNATURE_LENGTH = common_1.SMALL_TYPE_LENGTH;
exports.MIN_ED25519_SIGNATURE_LENGTH = exports.MIN_SIGNATURE_LENGTH + ed25519_1.Ed25519.SIGNATURE_SIZE + ed25519_1.Ed25519.PUBLIC_KEY_SIZE;
/**
 * Deserialize the signature from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeSignature(readStream) {
    if (!readStream.hasRemaining(exports.MIN_SIGNATURE_LENGTH)) {
        throw new Error("Signature data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_SIGNATURE_LENGTH);
    }
    var type = readStream.readByte("signature.type", false);
    var input;
    if (type === IEd25519Signature_1.ED25519_SIGNATURE_TYPE) {
        input = deserializeEd25519Signature(readStream);
    }
    else {
        throw new Error("Unrecognized signature type " + type);
    }
    return input;
}
exports.deserializeSignature = deserializeSignature;
/**
 * Serialize the signature to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeSignature(writeStream, object) {
    if (object.type === IEd25519Signature_1.ED25519_SIGNATURE_TYPE) {
        serializeEd25519Signature(writeStream, object);
    }
    else {
        throw new Error("Unrecognized signature type " + object.type);
    }
}
exports.serializeSignature = serializeSignature;
/**
 * Deserialize the Ed25519 signature from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeEd25519Signature(readStream) {
    if (!readStream.hasRemaining(exports.MIN_ED25519_SIGNATURE_LENGTH)) {
        throw new Error("Ed25519 signature data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_ED25519_SIGNATURE_LENGTH);
    }
    var type = readStream.readByte("ed25519Signature.type");
    if (type !== IEd25519Signature_1.ED25519_SIGNATURE_TYPE) {
        throw new Error("Type mismatch in ed25519Signature " + type);
    }
    var publicKey = readStream.readFixedHex("ed25519Signature.publicKey", ed25519_1.Ed25519.PUBLIC_KEY_SIZE);
    var signature = readStream.readFixedHex("ed25519Signature.signature", ed25519_1.Ed25519.SIGNATURE_SIZE);
    return {
        type: 1,
        publicKey: publicKey,
        signature: signature
    };
}
exports.deserializeEd25519Signature = deserializeEd25519Signature;
/**
 * Serialize the Ed25519 signature to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeEd25519Signature(writeStream, object) {
    writeStream.writeByte("ed25519Signature.type", object.type);
    writeStream.writeFixedHex("ed25519Signature.publicKey", ed25519_1.Ed25519.PUBLIC_KEY_SIZE, object.publicKey);
    writeStream.writeFixedHex("ed25519Signature.signature", ed25519_1.Ed25519.SIGNATURE_SIZE, object.signature);
}
exports.serializeEd25519Signature = serializeEd25519Signature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9zaWduYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyw2Q0FBNEM7QUFDNUMsaUVBQXdGO0FBR3hGLG1DQUE2QztBQUVoQyxRQUFBLG9CQUFvQixHQUFXLDBCQUFpQixDQUFDO0FBQ2pELFFBQUEsNEJBQTRCLEdBQ3JDLDRCQUFvQixHQUFHLGlCQUFPLENBQUMsY0FBYyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDO0FBRTVFOzs7O0dBSUc7QUFDSCxTQUFnQixvQkFBb0IsQ0FBQyxVQUFzQjtJQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBb0IsQ0FBQyxFQUFFO1FBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXFCLFVBQVUsQ0FBQyxNQUFNLEVBQUUscUVBQ1ksNEJBQXNCLENBQUMsQ0FBQztLQUMvRjtJQUVELElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUQsSUFBSSxLQUFLLENBQUM7SUFFVixJQUFJLElBQUksS0FBSywwQ0FBc0IsRUFBRTtRQUNqQyxLQUFLLEdBQUcsMkJBQTJCLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbkQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQStCLElBQU0sQ0FBQyxDQUFDO0tBQzFEO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQWhCRCxvREFnQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsV0FBd0IsRUFDdkQsTUFBeUI7SUFDekIsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLDBDQUFzQixFQUFFO1FBQ3hDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNsRDtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBK0IsTUFBTSxDQUFDLElBQU0sQ0FBQyxDQUFDO0tBQ2pFO0FBQ0wsQ0FBQztBQVBELGdEQU9DO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLDJCQUEyQixDQUFDLFVBQXNCO0lBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLG9DQUE0QixDQUFDLEVBQUU7UUFDeEQsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBNkIsVUFBVSxDQUFDLE1BQU0sRUFBRSxxRUFDSSxvQ0FBOEIsQ0FBQyxDQUFDO0tBQ3ZHO0lBRUQsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQzFELElBQUksSUFBSSxLQUFLLDBDQUFzQixFQUFFO1FBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXFDLElBQU0sQ0FBQyxDQUFDO0tBQ2hFO0lBRUQsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pHLElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsNEJBQTRCLEVBQUUsaUJBQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVoRyxPQUFPO1FBQ0gsSUFBSSxFQUFFLENBQUM7UUFDUCxTQUFTLFdBQUE7UUFDVCxTQUFTLFdBQUE7S0FDWixDQUFDO0FBQ04sQ0FBQztBQW5CRCxrRUFtQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IseUJBQXlCLENBQUMsV0FBd0IsRUFDOUQsTUFBeUI7SUFDekIsV0FBVyxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsV0FBVyxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsRUFBRSxpQkFBTyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkcsV0FBVyxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsRUFBRSxpQkFBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdEcsQ0FBQztBQUxELDhEQUtDIn0=