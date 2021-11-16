import { TREASURY_INPUT_TYPE } from "../../models/inputs/ITreasuryInput";
import { SMALL_TYPE_LENGTH, TRANSACTION_ID_LENGTH } from "../commonDataTypes";
/**
 * The minimum length of a treasury input binary representation.
 */
export const MIN_TREASURY_INPUT_LENGTH = SMALL_TYPE_LENGTH + TRANSACTION_ID_LENGTH;
/**
 * Deserialize the treasury input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTreasuryInput(readStream) {
    if (!readStream.hasRemaining(MIN_TREASURY_INPUT_LENGTH)) {
        throw new Error(`Treasury Input data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TREASURY_INPUT_LENGTH}`);
    }
    const type = readStream.readUInt8("treasuryInput.type");
    if (type !== TREASURY_INPUT_TYPE) {
        throw new Error(`Type mismatch in treasuryInput ${type}`);
    }
    const milestoneId = readStream.readFixedHex("treasuryInput.milestoneId", TRANSACTION_ID_LENGTH);
    return {
        type: TREASURY_INPUT_TYPE,
        milestoneId
    };
}
/**
 * Serialize the treasury input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTreasuryInput(writeStream, object) {
    writeStream.writeUInt8("treasuryInput.type", object.type);
    writeStream.writeFixedHex("treasuryInput.milestoneId", TRANSACTION_ID_LENGTH, object.milestoneId);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlYXN1cnlJbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvaW5wdXRzL3RyZWFzdXJ5SW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFrQixtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTlFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQVcsaUJBQWlCLEdBQUcscUJBQXFCLENBQUM7QUFFM0Y7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxVQUFzQjtJQUMzRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1FBQ3JELE1BQU0sSUFBSSxLQUFLLENBQ1gsMEJBQTBCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLHlCQUF5QixFQUFFLENBQzNJLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN4RCxJQUFJLElBQUksS0FBSyxtQkFBbUIsRUFBRTtRQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzdEO0lBRUQsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQywyQkFBMkIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBRWhHLE9BQU87UUFDSCxJQUFJLEVBQUUsbUJBQW1CO1FBQ3pCLFdBQVc7S0FDZCxDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsV0FBd0IsRUFBRSxNQUFzQjtJQUNuRixXQUFXLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRCxXQUFXLENBQUMsYUFBYSxDQUFDLDJCQUEyQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN0RyxDQUFDIn0=