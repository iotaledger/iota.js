import bigInt from "big-integer";
import { STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStorageDepositReturnUnlockCondition.mjs";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses.mjs";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes.mjs";
/**
 * The minimum length of an storage deposit return unlock condition binary representation.
 */
export const MIN_STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH +
    MIN_ADDRESS_LENGTH +
    UINT64_SIZE;
/**
 * Deserialize the storage deposit return unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeStorageDepositReturnUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`Storage deposit return unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("storageDepositReturnUnlockCondition.type");
    if (type !== STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in storagDepositReturnUnlockCondition ${type}`);
    }
    const returnAddress = deserializeAddress(readStream);
    const amount = readStream.readUInt64("storageDepositReturnUnlockCondition.amount");
    return {
        type: STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
        returnAddress,
        amount: Number(amount)
    };
}
/**
 * Serialize the storage deposit return unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeStorageDepositReturnUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("storageDepositReturnUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.returnAddress);
    writeStream.writeUInt64("storageDepositReturnUnlockCondition.amount", bigInt(object.amount));
}
