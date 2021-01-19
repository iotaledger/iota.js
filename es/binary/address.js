"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeEd25519Address = exports.deserializeEd25519Address = exports.serializeAddress = exports.deserializeAddress = exports.MIN_ED25519_ADDRESS_LENGTH = exports.MIN_ADDRESS_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var ed25519Address_1 = require("../addressTypes/ed25519Address");
var IEd25519Address_1 = require("../models/IEd25519Address");
var common_1 = require("./common");
/**
 * The minimum length of an address binary representation.
 */
exports.MIN_ADDRESS_LENGTH = common_1.SMALL_TYPE_LENGTH;
/**
 * The minimum length of an ed25519 address binary representation.
 */
exports.MIN_ED25519_ADDRESS_LENGTH = exports.MIN_ADDRESS_LENGTH + ed25519Address_1.Ed25519Address.ADDRESS_LENGTH;
/**
 * Deserialize the address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeAddress(readStream) {
    if (!readStream.hasRemaining(exports.MIN_ADDRESS_LENGTH)) {
        throw new Error("Address data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_ADDRESS_LENGTH);
    }
    var type = readStream.readByte("address.type", false);
    var address;
    if (type === IEd25519Address_1.ED25519_ADDRESS_TYPE) {
        address = deserializeEd25519Address(readStream);
    }
    else {
        throw new Error("Unrecognized address type " + type);
    }
    return address;
}
exports.deserializeAddress = deserializeAddress;
/**
 * Serialize the address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeAddress(writeStream, object) {
    if (object.type === IEd25519Address_1.ED25519_ADDRESS_TYPE) {
        serializeEd25519Address(writeStream, object);
    }
    else {
        throw new Error("Unrecognized address type " + object.type);
    }
}
exports.serializeAddress = serializeAddress;
/**
 * Deserialize the Ed25519 address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeEd25519Address(readStream) {
    if (!readStream.hasRemaining(exports.MIN_ED25519_ADDRESS_LENGTH)) {
        throw new Error("Ed25519 address data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_ED25519_ADDRESS_LENGTH);
    }
    var type = readStream.readByte("ed25519Address.type");
    if (type !== IEd25519Address_1.ED25519_ADDRESS_TYPE) {
        throw new Error("Type mismatch in ed25519Address " + type);
    }
    var address = readStream.readFixedHex("ed25519Address.address", ed25519Address_1.Ed25519Address.ADDRESS_LENGTH);
    return {
        type: IEd25519Address_1.ED25519_ADDRESS_TYPE,
        address: address
    };
}
exports.deserializeEd25519Address = deserializeEd25519Address;
/**
 * Serialize the ed25519 address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeEd25519Address(writeStream, object) {
    writeStream.writeByte("ed25519Address.type", object.type);
    writeStream.writeFixedHex("ed25519Address.address", ed25519Address_1.Ed25519Address.ADDRESS_LENGTH, object.address);
}
exports.serializeEd25519Address = serializeEd25519Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvYWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLGlFQUFnRTtBQUNoRSw2REFBa0Y7QUFHbEYsbUNBQTZDO0FBRTdDOztHQUVHO0FBQ1UsUUFBQSxrQkFBa0IsR0FBVywwQkFBaUIsQ0FBQztBQUU1RDs7R0FFRztBQUNVLFFBQUEsMEJBQTBCLEdBQVcsMEJBQWtCLEdBQUcsK0JBQWMsQ0FBQyxjQUFjLENBQUM7QUFFckc7Ozs7R0FJRztBQUNILFNBQWdCLGtCQUFrQixDQUFDLFVBQXNCO0lBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLDBCQUFrQixDQUFDLEVBQUU7UUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBbUIsVUFBVSxDQUFDLE1BQU0sRUFBRSxxRUFDYywwQkFBb0IsQ0FBQyxDQUFDO0tBQzdGO0lBRUQsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEQsSUFBSSxPQUFPLENBQUM7SUFFWixJQUFJLElBQUksS0FBSyxzQ0FBb0IsRUFBRTtRQUMvQixPQUFPLEdBQUcseUJBQXlCLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbkQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQTZCLElBQU0sQ0FBQyxDQUFDO0tBQ3hEO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQWhCRCxnREFnQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsV0FBd0IsRUFBRSxNQUF1QjtJQUM5RSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssc0NBQW9CLEVBQUU7UUFDdEMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2hEO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUE2QixNQUFNLENBQUMsSUFBTSxDQUFDLENBQUM7S0FDL0Q7QUFDTCxDQUFDO0FBTkQsNENBTUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IseUJBQXlCLENBQUMsVUFBc0I7SUFDNUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsa0NBQTBCLENBQUMsRUFBRTtRQUN0RCxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUEyQixVQUFVLENBQUMsTUFBTSxFQUFFLHFFQUNNLGtDQUE0QixDQUFDLENBQUM7S0FDckc7SUFFRCxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDeEQsSUFBSSxJQUFJLEtBQUssc0NBQW9CLEVBQUU7UUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBbUMsSUFBTSxDQUFDLENBQUM7S0FDOUQ7SUFFRCxJQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLHdCQUF3QixFQUFFLCtCQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFakcsT0FBTztRQUNILElBQUksRUFBRSxzQ0FBb0I7UUFDMUIsT0FBTyxTQUFBO0tBQ1YsQ0FBQztBQUNOLENBQUM7QUFqQkQsOERBaUJDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLHVCQUF1QixDQUFDLFdBQXdCLEVBQUUsTUFBdUI7SUFDckYsV0FBVyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUQsV0FBVyxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsRUFBRSwrQkFBYyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkcsQ0FBQztBQUhELDBEQUdDIn0=