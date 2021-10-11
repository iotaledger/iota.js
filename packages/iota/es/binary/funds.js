import bigInt from "big-integer";
import { deserializeAddress, MIN_ED25519_ADDRESS_LENGTH, serializeAddress } from "./address";
import { UINT64_SIZE } from "./common";
/**
 * The length of the tail hash length in bytes.
 */
export const TAIL_HASH_LENGTH = 49;
/**
 * The minimum length of a migrated fund binary representation.
 */
export const MIN_MIGRATED_FUNDS_LENGTH = TAIL_HASH_LENGTH + // tailTransactionHash
    MIN_ED25519_ADDRESS_LENGTH + // address
    UINT64_SIZE; // deposit
/**
 * The maximum number of funds.
 */
export const MAX_FUNDS_COUNT = 127;
/**
 * Deserialize the receipt payload funds from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeFunds(readStream) {
    const numFunds = readStream.readUInt16("funds.numFunds");
    const funds = [];
    for (let i = 0; i < numFunds; i++) {
        funds.push(deserializeMigratedFunds(readStream));
    }
    return funds;
}
/**
 * Serialize the receipt payload funds to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeFunds(writeStream, objects) {
    if (objects.length > MAX_FUNDS_COUNT) {
        throw new Error(`The maximum number of funds is ${MAX_FUNDS_COUNT}, you have provided ${objects.length}`);
    }
    writeStream.writeUInt16("funds.numFunds", objects.length);
    for (let i = 0; i < objects.length; i++) {
        serializeMigratedFunds(writeStream, objects[i]);
    }
}
/**
 * Deserialize the migrated fund from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeMigratedFunds(readStream) {
    if (!readStream.hasRemaining(MIN_MIGRATED_FUNDS_LENGTH)) {
        throw new Error(`Migrated funds data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_MIGRATED_FUNDS_LENGTH}`);
    }
    const tailTransactionHash = readStream.readFixedHex("migratedFunds.tailTransactionHash", TAIL_HASH_LENGTH);
    const address = deserializeAddress(readStream);
    const deposit = readStream.readUInt64("migratedFunds.deposit");
    return {
        tailTransactionHash,
        address,
        deposit: Number(deposit)
    };
}
/**
 * Serialize the migrated funds to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeMigratedFunds(writeStream, object) {
    writeStream.writeFixedHex("migratedFunds.tailTransactionHash", TAIL_HASH_LENGTH, object.tailTransactionHash);
    serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("migratedFunds.deposit", bigInt(object.deposit));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L2Z1bmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUVqQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsMEJBQTBCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDN0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV2Qzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFXLEVBQUUsQ0FBQztBQUUzQzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUNsQyxnQkFBZ0IsR0FBRyxzQkFBc0I7SUFDekMsMEJBQTBCLEdBQUcsVUFBVTtJQUN2QyxXQUFXLENBQUMsQ0FBQyxVQUFVO0FBRTNCOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFXLEdBQUcsQ0FBQztBQUUzQzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLFVBQXNCO0lBQ25ELE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUV6RCxNQUFNLEtBQUssR0FBcUIsRUFBRSxDQUFDO0lBQ25DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0tBQ3BEO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFDLFdBQXdCLEVBQUUsT0FBeUI7SUFDOUUsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLGVBQWUsRUFBRTtRQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxlQUFlLHVCQUF1QixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztLQUM3RztJQUNELFdBQVcsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTFELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuRDtBQUNMLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHdCQUF3QixDQUFDLFVBQXNCO0lBQzNELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7UUFDckQsTUFBTSxJQUFJLEtBQUssQ0FDWCwwQkFBMEIsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UseUJBQXlCLEVBQUUsQ0FDM0ksQ0FBQztLQUNMO0lBRUQsTUFBTSxtQkFBbUIsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLG1DQUFtQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDM0csTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBRS9ELE9BQU87UUFDSCxtQkFBbUI7UUFDbkIsT0FBTztRQUNQLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDO0tBQzNCLENBQUM7QUFDTixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxXQUF3QixFQUFFLE1BQXNCO0lBQ25GLFdBQVcsQ0FBQyxhQUFhLENBQUMsbUNBQW1DLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDN0csZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxXQUFXLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUM3RSxDQUFDIn0=