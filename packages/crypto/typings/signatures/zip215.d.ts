/**
 * Implementation of Zip215.
 */
export declare class Zip215 {
    /**
     * Verify reports whether sig is a valid signature of message by
     * publicKey, using precisely-specified validation criteria (ZIP 215) suitable
     * for use in consensus-critical contexts.
     * @param publicKey The public key for the message.
     * @param message The message content to validate.
     * @param sig The signature to verify.
     * @returns True if the signature is valid.
     */
    static verify(publicKey: Uint8Array, message: Uint8Array, sig: Uint8Array): boolean;
}
