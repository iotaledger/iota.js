"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zip215 = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */
const sha512_1 = require("../crypto/sha512");
const ed25519_1 = require("./ed25519");
const extendedGroupElement_1 = require("./edwards25519/extendedGroupElement");
const projectiveGroupElement_1 = require("./edwards25519/projectiveGroupElement");
const scalar_1 = require("./edwards25519/scalar");
class Zip215 {
    /**
     * Verify reports whether sig is a valid signature of message by
     * publicKey, using precisely-specified validation criteria (ZIP 215) suitable
     * for use in consensus-critical contexts.
     * @param publicKey The public key for the message.
     * @param message The message content to validate.
     * @param sig The signature to verify.
     * @returns True if the signature is valid.
     */
    static verify(publicKey, message, sig) {
        if (!publicKey || publicKey.length !== ed25519_1.Ed25519.PUBLIC_KEY_SIZE) {
            return false;
        }
        if (!sig || sig.length !== ed25519_1.Ed25519.SIGNATURE_SIZE || ((sig[63] & 224) !== 0)) {
            return false;
        }
        const A = new extendedGroupElement_1.ExtendedGroupElement();
        // ZIP215: this works because FromBytes does not check that encodings are canonical.
        if (!A.fromBytes(publicKey)) {
            return false;
        }
        A.X.neg();
        A.T.neg();
        const h = new sha512_1.Sha512();
        h.update(sig.subarray(0, 32));
        h.update(publicKey);
        h.update(message);
        const digest = h.digest();
        const hReduced = new Uint8Array(32);
        scalar_1.scalarReduce(hReduced, digest);
        const r = new Uint8Array(sig.subarray(0, 32));
        const checkR = new extendedGroupElement_1.ExtendedGroupElement();
        // ZIP215: this works because FromBytes does not check that encodings are canonical.
        if (!checkR.fromBytes(r)) {
            return false;
        }
        const s = new Uint8Array(sig.subarray(32));
        // https://tools.ietf.org/html/rfc8032#section-5.1.7 requires that s be in
        // the range [0, order) in order to prevent signature malleability.
        // ZIP215: This is also required by ZIP215.
        if (!scalar_1.scalarMinimal(s)) {
            return false;
        }
        const rProj = new projectiveGroupElement_1.ProjectiveGroupElement();
        const R = new extendedGroupElement_1.ExtendedGroupElement();
        rProj.doubleScalarMultVartime(hReduced, A, s);
        rProj.toExtended(R);
        // ZIP215: We want to check [8](R - R') == 0
        return R.cofactorEqual(checkR);
    }
}
exports.Zip215 = Zip215;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemlwMjE1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyeXB0by96aXAyMTUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywrQkFBK0I7QUFDL0I7Ozs7R0FJRztBQUNILDZDQUEwQztBQUMxQyx1Q0FBb0M7QUFDcEMsOEVBQTJFO0FBQzNFLGtGQUErRTtBQUMvRSxrREFBb0U7QUFFcEUsTUFBYSxNQUFNO0lBQ2Y7Ozs7Ozs7O09BUUc7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQXFCLEVBQUUsT0FBbUIsRUFBRSxHQUFlO1FBQzVFLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxpQkFBTyxDQUFDLGVBQWUsRUFBRTtZQUM1RCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxpQkFBTyxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzFFLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsTUFBTSxDQUFDLEdBQUcsSUFBSSwyQ0FBb0IsRUFBRSxDQUFDO1FBRXJDLG9GQUFvRjtRQUNwRixJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN6QixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDVixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRVYsTUFBTSxDQUFDLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxCLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUUxQixNQUFNLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxxQkFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUUvQixNQUFNLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTlDLE1BQU0sTUFBTSxHQUFHLElBQUksMkNBQW9CLEVBQUUsQ0FBQztRQUMxQyxvRkFBb0Y7UUFDcEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxNQUFNLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsMEVBQTBFO1FBQzFFLG1FQUFtRTtRQUNuRSwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLHNCQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLCtDQUFzQixFQUFFLENBQUM7UUFDM0MsTUFBTSxDQUFDLEdBQUcsSUFBSSwyQ0FBb0IsRUFBRSxDQUFDO1FBRXJDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEIsNENBQTRDO1FBQzVDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0o7QUEvREQsd0JBK0RDIn0=