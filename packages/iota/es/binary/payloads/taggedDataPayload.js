import { TAGGED_DATA_PAYLOAD_TYPE } from "../../models/payloads/ITaggedDataPayload";
import { UINT8_SIZE, TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";
/**
 * The minimum length of a tagged data payload binary representation.
 */
export const MIN_TAGGED_DATA_PAYLOAD_LENGTH = TYPE_LENGTH + // min payload
    UINT8_SIZE + // tag length
    UINT32_SIZE; // data length
/**
 * The minimum length of a tag.
 */
export const MIN_TAG_LENGTH = 1;
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
    const tag = readStream.readFixedHex("payloadTaggedData.tag", tagLength);
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
    if (object.tag.length < MIN_TAG_LENGTH) {
        throw new Error(`The tag length is ${object.tag.length / 2}, which is less than the minimum size of ${MIN_TAG_LENGTH}`);
    }
    if (object.tag && object.tag.length / 2 > MAX_TAG_LENGTH) {
        throw new Error(`The tag length is ${object.tag.length / 2}, which exceeds the maximum size of ${MAX_TAG_LENGTH}`);
    }
    writeStream.writeUInt32("payloadTaggedData.type", object.type);
    writeStream.writeUInt8("payloadTaggedData.tagLength", object.tag.length / 2);
    writeStream.writeFixedHex("payloadTaggedData.tag", object.tag.length / 2, object.tag);
    if (object.data) {
        writeStream.writeUInt32("payloadTaggedData.dataLength", object.data.length / 2);
        writeStream.writeFixedHex("payloadTaggedData.data", object.data.length / 2, object.data);
    }
    else {
        writeStream.writeUInt32("payloadTaggedData.dataLength", 0);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VkRGF0YVBheWxvYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L3BheWxvYWRzL3RhZ2dlZERhdGFQYXlsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBc0Isd0JBQXdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUUxRTs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLDhCQUE4QixHQUN2QyxXQUFXLEdBQUcsY0FBYztJQUM1QixVQUFVLEdBQUcsYUFBYTtJQUMxQixXQUFXLENBQUMsQ0FBQyxjQUFjO0FBRS9COztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFXLENBQUMsQ0FBQztBQUV4Qzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBVyxFQUFFLENBQUM7QUFFekM7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxVQUFzQjtJQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFO1FBQzFELE1BQU0sSUFBSSxLQUFLLENBQ1gsK0JBQStCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLDhCQUE4QixFQUFFLENBQ3JKLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUM3RCxJQUFJLElBQUksS0FBSyx3QkFBd0IsRUFBRTtRQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2pFO0lBQ0QsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3RFLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDeEUsSUFBSSxJQUFJLENBQUM7SUFDVCxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDekUsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO1FBQ2hCLElBQUksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLHdCQUF3QixFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ3hFO0lBRUQsT0FBTztRQUNILElBQUksRUFBRSx3QkFBd0I7UUFDOUIsR0FBRztRQUNILElBQUk7S0FDUCxDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsMEJBQTBCLENBQUMsV0FBd0IsRUFBRSxNQUEwQjtJQUMzRixJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLGNBQWMsRUFBRTtRQUNwQyxNQUFNLElBQUksS0FBSyxDQUNYLHFCQUNJLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQ3hCLDRDQUE0QyxjQUFjLEVBQUUsQ0FDL0QsQ0FBQztLQUNMO0lBRUQsSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxjQUFjLEVBQUU7UUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FDWCxxQkFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUN4Qix1Q0FBdUMsY0FBYyxFQUFFLENBQzFELENBQUM7S0FDTDtJQUVELFdBQVcsQ0FBQyxXQUFXLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9ELFdBQVcsQ0FBQyxVQUFVLENBQUMsNkJBQTZCLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0UsV0FBVyxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RGLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtRQUNiLFdBQVcsQ0FBQyxXQUFXLENBQUMsOEJBQThCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEYsV0FBVyxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVGO1NBQU07UUFDSCxXQUFXLENBQUMsV0FBVyxDQUFDLDhCQUE4QixFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzlEO0FBQ0wsQ0FBQyJ9