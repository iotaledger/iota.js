import bigInt from "big-integer";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "./addresses/addresses";
import { UINT64_SIZE } from "./commonDataTypes";
/**
 * The length of the tail hash length in bytes.
 */
export const TAIL_HASH_LENGTH = 49;
/**
 * The minimum length of a migrated fund binary representation.
 */
export const MIN_MIGRATED_FUNDS_LENGTH = TAIL_HASH_LENGTH + // tailTransactionHash
    MIN_ADDRESS_LENGTH + // address
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L2Z1bmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUVqQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFaEQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBVyxFQUFFLENBQUM7QUFFM0M7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FDbEMsZ0JBQWdCLEdBQUcsc0JBQXNCO0lBQ3pDLGtCQUFrQixHQUFHLFVBQVU7SUFDL0IsV0FBVyxDQUFDLENBQUMsVUFBVTtBQUUzQjs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBVyxHQUFHLENBQUM7QUFFM0M7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxVQUFzQjtJQUNuRCxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFekQsTUFBTSxLQUFLLEdBQXFCLEVBQUUsQ0FBQztJQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQy9CLEtBQUssQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUNwRDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGNBQWMsQ0FBQyxXQUF3QixFQUFFLE9BQXlCO0lBQzlFLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxlQUFlLEVBQUU7UUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsZUFBZSx1QkFBdUIsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7S0FDN0c7SUFDRCxXQUFXLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUxRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkQ7QUFDTCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxVQUFzQjtJQUMzRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1FBQ3JELE1BQU0sSUFBSSxLQUFLLENBQ1gsMEJBQTBCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLHlCQUF5QixFQUFFLENBQzNJLENBQUM7S0FDTDtJQUVELE1BQU0sbUJBQW1CLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxtQ0FBbUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNHLE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUUvRCxPQUFPO1FBQ0gsbUJBQW1CO1FBQ25CLE9BQU87UUFDUCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUMzQixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsV0FBd0IsRUFBRSxNQUFzQjtJQUNuRixXQUFXLENBQUMsYUFBYSxDQUFDLG1DQUFtQyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzdHLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDN0UsQ0FBQyJ9