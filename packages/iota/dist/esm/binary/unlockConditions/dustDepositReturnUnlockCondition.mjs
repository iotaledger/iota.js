import bigInt from "big-integer";
import { DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IDustDepositReturnUnlockCondition.mjs";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses.mjs";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes.mjs";
/**
 * The minimum length of an dust deposit return unlock condition binary representation.
 */
export const MIN_DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH +
    MIN_ADDRESS_LENGTH +
    UINT64_SIZE;
/**
 * Deserialize the dust deposit return unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeDustDepositReturnUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`Dust deposit return unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("dustDepositReturnUnlockCondition.type");
    if (type !== DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in dustDepositReturnUnlockCondition ${type}`);
    }
    const returnAddress = deserializeAddress(readStream);
    const amount = readStream.readUInt64("dustDepositReturnUnlockCondition.amount");
    return {
        type: DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
        returnAddress,
        amount: Number(amount)
    };
}
/**
 * Serialize the dust deposit return unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeDustDepositReturnUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("dustDepositReturnUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.returnAddress);
    writeStream.writeUInt64("dustDepositReturnUnlockCondition.amount", bigInt(object.amount));
}
