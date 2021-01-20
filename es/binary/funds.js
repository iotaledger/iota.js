"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeMigratedFunds = exports.deserializeMigratedFunds = exports.serializeFunds = exports.deserializeFunds = exports.MAX_FUNDS_COUNT = exports.MIN_MIGRATED_FUNDS_LENGTH = exports.TAIL_HASH_LENGTH = void 0;
var address_1 = require("./address");
var common_1 = require("./common");
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
    var numFunds = readStream.readUInt16("funds.numFunds");
    var funds = [];
    for (var i = 0; i < numFunds; i++) {
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
        throw new Error("The maximum number of funds is " + exports.MAX_FUNDS_COUNT + ", you have provided " + objects.length);
    }
    writeStream.writeUInt16("funds.numFunds", objects.length);
    for (var i = 0; i < objects.length; i++) {
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
        throw new Error("Migrated funds data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_MIGRATED_FUNDS_LENGTH);
    }
    var tailTransactionHash = readStream.readFixedHex("migratedFunds.tailTransactionHash", exports.TAIL_HASH_LENGTH);
    var address = address_1.deserializeAddress(readStream);
    var deposit = readStream.readUInt64("migratedFunds.deposit");
    return {
        tailTransactionHash: tailTransactionHash,
        address: address,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L2Z1bmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLHFDQUE2RjtBQUM3RixtQ0FBdUM7QUFFdkM7O0dBRUc7QUFDVSxRQUFBLGdCQUFnQixHQUFXLEVBQUUsQ0FBQztBQUUzQzs7R0FFRztBQUNVLFFBQUEseUJBQXlCLEdBQ2xDLHdCQUFnQixHQUFHLHNCQUFzQjtJQUN6QyxvQ0FBMEIsR0FBRyxVQUFVO0lBQ3ZDLG9CQUFXLENBQUMsQ0FBQyxVQUFVO0FBRTNCOztHQUVHO0FBQ1UsUUFBQSxlQUFlLEdBQVcsR0FBRyxDQUFDO0FBRTNDOzs7O0dBSUc7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxVQUFzQjtJQUNuRCxJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFekQsSUFBTSxLQUFLLEdBQXFCLEVBQUUsQ0FBQztJQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQy9CLEtBQUssQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUNwRDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFURCw0Q0FTQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixjQUFjLENBQUMsV0FBd0IsRUFDbkQsT0FBeUI7SUFDekIsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLHVCQUFlLEVBQUU7UUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBa0MsdUJBQWUsNEJBQXVCLE9BQU8sQ0FBQyxNQUFRLENBQUMsQ0FBQztLQUM3RztJQUNELFdBQVcsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTFELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuRDtBQUNMLENBQUM7QUFWRCx3Q0FVQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQix3QkFBd0IsQ0FBQyxVQUFzQjtJQUMzRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxpQ0FBeUIsQ0FBQyxFQUFFO1FBQ3JELE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTBCLFVBQVUsQ0FBQyxNQUFNLEVBQUUscUVBQ08saUNBQTJCLENBQUMsQ0FBQztLQUNwRztJQUVELElBQU0sbUJBQW1CLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxtQ0FBbUMsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0lBQzNHLElBQU0sT0FBTyxHQUFHLDRCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLElBQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUUvRCxPQUFPO1FBQ0gsbUJBQW1CLHFCQUFBO1FBQ25CLE9BQU8sU0FBQTtRQUNQLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDO0tBQzNCLENBQUM7QUFDTixDQUFDO0FBZkQsNERBZUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0Isc0JBQXNCLENBQUMsV0FBd0IsRUFDM0QsTUFBc0I7SUFDdEIsV0FBVyxDQUFDLGFBQWEsQ0FBQyxtQ0FBbUMsRUFBRSx3QkFBZ0IsRUFBRSxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUM3RywwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLFdBQVcsQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzdFLENBQUM7QUFMRCx3REFLQyJ9