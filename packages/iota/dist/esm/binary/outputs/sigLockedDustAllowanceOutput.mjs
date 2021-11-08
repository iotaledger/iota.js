import bigInt from "big-integer";
import { SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE } from "../../models/outputs/ISigLockedDustAllowanceOutput.mjs";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses.mjs";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes.mjs";
/**
 * The minimum length of a sig locked dust allowance output binary representation.
 */
export const MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH + UINT64_SIZE;
/**
 * Deserialize the signature locked dust allowance output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSigLockedDustAllowanceOutput(readStream) {
    if (!readStream.hasRemaining(MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH)) {
        throw new Error(`Signature Locked Dust Allowance Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH}`);
    }
    const type = readStream.readByte("sigLockedDustAllowanceOutput.type");
    if (type !== SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in sigLockedDustAllowanceOutput ${type}`);
    }
    const address = deserializeAddress(readStream);
    const amount = readStream.readUInt64("sigLockedDustAllowanceOutput.amount");
    return {
        type: SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE,
        address,
        amount: Number(amount)
    };
}
/**
 * Serialize the signature locked dust allowance output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSigLockedDustAllowanceOutput(writeStream, object) {
    writeStream.writeByte("sigLockedDustAllowanceOutput.type", object.type);
    serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("sigLockedDustAllowanceOutput.amount", bigInt(object.amount));
}
