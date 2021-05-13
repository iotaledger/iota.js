"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeMigratedFunds = exports.deserializeMigratedFunds = exports.serializeFunds = exports.deserializeFunds = exports.MAX_FUNDS_COUNT = exports.MIN_MIGRATED_FUNDS_LENGTH = exports.TAIL_HASH_LENGTH = void 0;
const address_1 = require("./address");
const common_1 = require("./common");
/**
 * The length of the tail hash length in bytes.
 */
exports.TAIL_HASH_LENGTH = 49;
/**
 * The minimum length of a migrated fund binary representation.
 */
exports.MIN_MIGRATED_FUNDS_LENGTH = exports.TAIL_HASH_LENGTH + // tailTransactionHash
    address_1.MIN_ED25519_ADDRESS_LENGTH + // address
    common_1.UINT64_SIZE; // deposit
/**
 * The maximum number of funds.
 */
exports.MAX_FUNDS_COUNT = 127;
/**
 * Deserialize the receipt payload funds from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeFunds(readStream) {
    const numFunds = readStream.readUInt16("funds.numFunds");
    const funds = [];
    for (let i = 0; i < numFunds; i++) {
        funds.push(deserializeMigratedFunds(readStream));
    }
    return funds;
}
exports.deserializeFunds = deserializeFunds;
/**
 * Serialize the receipt payload funds to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
function serializeFunds(writeStream, objects) {
    if (objects.length > exports.MAX_FUNDS_COUNT) {
        throw new Error(`The maximum number of funds is ${exports.MAX_FUNDS_COUNT}, you have provided ${objects.length}`);
    }
    writeStream.writeUInt16("funds.numFunds", objects.length);
    for (let i = 0; i < objects.length; i++) {
        serializeMigratedFunds(writeStream, objects[i]);
    }
}
exports.serializeFunds = serializeFunds;
/**
 * Deserialize the migrated fund from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeMigratedFunds(readStream) {
    if (!readStream.hasRemaining(exports.MIN_MIGRATED_FUNDS_LENGTH)) {
        throw new Error(`Migrated funds data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_MIGRATED_FUNDS_LENGTH}`);
    }
    const tailTransactionHash = readStream.readFixedHex("migratedFunds.tailTransactionHash", exports.TAIL_HASH_LENGTH);
    const address = address_1.deserializeAddress(readStream);
    const deposit = readStream.readUInt64("migratedFunds.deposit");
    return {
        tailTransactionHash,
        address,
        deposit: Number(deposit)
    };
}
exports.deserializeMigratedFunds = deserializeMigratedFunds;
/**
 * Serialize the migrated funds to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeMigratedFunds(writeStream, object) {
    writeStream.writeFixedHex("migratedFunds.tailTransactionHash", exports.TAIL_HASH_LENGTH, object.tailTransactionHash);
    address_1.serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("migratedFunds.deposit", BigInt(object.deposit));
}
exports.serializeMigratedFunds = serializeMigratedFunds;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L2Z1bmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLHVDQUE2RjtBQUM3RixxQ0FBdUM7QUFFdkM7O0dBRUc7QUFDVSxRQUFBLGdCQUFnQixHQUFXLEVBQUUsQ0FBQztBQUUzQzs7R0FFRztBQUNVLFFBQUEseUJBQXlCLEdBQ2xDLHdCQUFnQixHQUFHLHNCQUFzQjtJQUN6QyxvQ0FBMEIsR0FBRyxVQUFVO0lBQ3ZDLG9CQUFXLENBQUMsQ0FBQyxVQUFVO0FBRTNCOztHQUVHO0FBQ1UsUUFBQSxlQUFlLEdBQVcsR0FBRyxDQUFDO0FBRTNDOzs7O0dBSUc7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxVQUFzQjtJQUNuRCxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFekQsTUFBTSxLQUFLLEdBQXFCLEVBQUUsQ0FBQztJQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQy9CLEtBQUssQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUNwRDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFURCw0Q0FTQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixjQUFjLENBQUMsV0FBd0IsRUFDbkQsT0FBeUI7SUFDekIsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLHVCQUFlLEVBQUU7UUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsdUJBQWUsdUJBQXVCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0tBQzdHO0lBQ0QsV0FBVyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFMUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25EO0FBQ0wsQ0FBQztBQVZELHdDQVVDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLHdCQUF3QixDQUFDLFVBQXNCO0lBQzNELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGlDQUF5QixDQUFDLEVBQUU7UUFDckQsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsVUFBVSxDQUFDLE1BQU0sRUFDdkQsZ0VBQWdFLGlDQUF5QixFQUFFLENBQUMsQ0FBQztLQUNwRztJQUVELE1BQU0sbUJBQW1CLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxtQ0FBbUMsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0lBQzNHLE1BQU0sT0FBTyxHQUFHLDRCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUUvRCxPQUFPO1FBQ0gsbUJBQW1CO1FBQ25CLE9BQU87UUFDUCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUMzQixDQUFDO0FBQ04sQ0FBQztBQWZELDREQWVDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLHNCQUFzQixDQUFDLFdBQXdCLEVBQzNELE1BQXNCO0lBQ3RCLFdBQVcsQ0FBQyxhQUFhLENBQUMsbUNBQW1DLEVBQUUsd0JBQWdCLEVBQUUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDN0csMEJBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxXQUFXLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUM3RSxDQUFDO0FBTEQsd0RBS0MifQ==