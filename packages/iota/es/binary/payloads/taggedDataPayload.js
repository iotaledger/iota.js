import { TAGGED_DATA_PAYLOAD_TYPE } from "../../models/payloads/ITaggedDataPayload";
import { UINT8_SIZE, TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";
/**
 * The minimum length of a tagged data payload binary representation.
 */
export const MIN_TAGGED_DATA_PAYLOAD_LENGTH = TYPE_LENGTH + // min payload
    UINT8_SIZE + // tag length
    UINT32_SIZE; // data length
/**
 * The maximum length of a tag.
 */
export const MAX_TAG_LENGTH = 64;
/**
 * Deserialize the tagged data payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTaggedDataPayload(readStream) {
    if (!readStream.hasRemaining(MIN_TAGGED_DATA_PAYLOAD_LENGTH)) {
        throw new Error(`Tagged Data Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TAGGED_DATA_PAYLOAD_LENGTH}`);
    }
    const type = readStream.readUInt32("payloadTaggedData.type");
    if (type !== TAGGED_DATA_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadTaggedData ${type}`);
    }
    const tagLength = readStream.readUInt8("payloadTaggedData.tagLength");
    let tag;
    if (tagLength > 0) {
        tag = readStream.readFixedHex("payloadTaggedData.tag", tagLength);
    }
    let data;
    const dataLength = readStream.readUInt32("payloadTaggedData.dataLength");
    if (dataLength > 0) {
        data = readStream.readFixedHex("payloadTaggedData.data", dataLength);
    }
    return {
        type: TAGGED_DATA_PAYLOAD_TYPE,
        tag,
        data
    };
}
/**
 * Serialize the tagged data payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTaggedDataPayload(writeStream, object) {
    if (object.tag && object.tag.length / 2 > MAX_TAG_LENGTH) {
        throw new Error(`The tag length is ${object.tag.length / 2}, which exceeds the maximum size of ${MAX_TAG_LENGTH}`);
    }
    writeStream.writeUInt32("payloadTaggedData.type", object.type);
    if (object.tag) {
        writeStream.writeUInt8("payloadTaggedData.tagLength", object.tag.length / 2);
        writeStream.writeFixedHex("payloadTaggedData.tag", object.tag.length / 2, object.tag);
    }
    else {
        writeStream.writeUInt8("payloadTaggedData.tagLength", 0);
    }
    if (object.data) {
        writeStream.writeUInt32("payloadTaggedData.dataLength", object.data.length / 2);
        writeStream.writeFixedHex("payloadTaggedData.data", object.data.length / 2, object.data);
    }
    else {
        writeStream.writeUInt32("payloadTaggedData.dataLength", 0);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VkRGF0YVBheWxvYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L3BheWxvYWRzL3RhZ2dlZERhdGFQYXlsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBc0Isd0JBQXdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUUxRTs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLDhCQUE4QixHQUN2QyxXQUFXLEdBQUcsY0FBYztJQUM1QixVQUFVLEdBQUcsYUFBYTtJQUMxQixXQUFXLENBQUMsQ0FBQyxjQUFjO0FBRS9COztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFXLEVBQUUsQ0FBQztBQUV6Qzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDRCQUE0QixDQUFDLFVBQXNCO0lBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLDhCQUE4QixDQUFDLEVBQUU7UUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FDWCwrQkFBK0IsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsOEJBQThCLEVBQUUsQ0FDckosQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzdELElBQUksSUFBSSxLQUFLLHdCQUF3QixFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDakU7SUFDRCxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDdEUsSUFBSSxHQUFHLENBQUM7SUFDUixJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7UUFDZixHQUFHLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxTQUFTLENBQUMsQ0FBQztLQUNyRTtJQUNELElBQUksSUFBSSxDQUFDO0lBQ1QsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ3pFLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtRQUNoQixJQUFJLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUN4RTtJQUVELE9BQU87UUFDSCxJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLEdBQUc7UUFDSCxJQUFJO0tBQ1AsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDBCQUEwQixDQUFDLFdBQXdCLEVBQUUsTUFBMEI7SUFDM0YsSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxjQUFjLEVBQUU7UUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FDWCxxQkFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUN4Qix1Q0FBdUMsY0FBYyxFQUFFLENBQzFELENBQUM7S0FDTDtJQUVELFdBQVcsQ0FBQyxXQUFXLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9ELElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUNaLFdBQVcsQ0FBQyxVQUFVLENBQUMsNkJBQTZCLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0UsV0FBVyxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3pGO1NBQU07UUFDSCxXQUFXLENBQUMsVUFBVSxDQUFDLDZCQUE2QixFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzVEO0lBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ2IsV0FBVyxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoRixXQUFXLENBQUMsYUFBYSxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUY7U0FBTTtRQUNILFdBQVcsQ0FBQyxXQUFXLENBQUMsOEJBQThCLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDOUQ7QUFDTCxDQUFDIn0=