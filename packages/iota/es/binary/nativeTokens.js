import bigInt from "big-integer";
import { MIN_ALIAS_ADDRESS_LENGTH } from "./addresses/aliasAddress";
import { UINT32_SIZE, UINT8_SIZE } from "./commonDataTypes";
/**
 * The minimum length of a native tokens list.
 */
export const MIN_NATIVE_TOKENS_LENGTH = UINT8_SIZE;
/**
 * The length of a native token tag.
 */
export const NATIVE_TOKEN_TAG_LENGTH = 12;
/**
 * The length of a foundry id.
 */
export const FOUNDRY_ID_LENGTH = MIN_ALIAS_ADDRESS_LENGTH + UINT32_SIZE + UINT8_SIZE;
/**
 * The length of a native token id.
 */
export const NATIVE_TOKEN_ID_LENGTH = FOUNDRY_ID_LENGTH + NATIVE_TOKEN_TAG_LENGTH;
/**
 * The maximum number of native tokens.
 */
export const MAX_NATIVE_TOKEN_COUNT = 64;
/**
 * Deserialize the natovetokens from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeNativeTokens(readStream) {
    const numNativeTokens = readStream.readUInt8("nativeTokens.numNativeTokens");
    const nativeTokens = [];
    for (let i = 0; i < numNativeTokens; i++) {
        nativeTokens.push(deserializeNativeToken(readStream));
    }
    return nativeTokens;
}
/**
 * Serialize the natove tokens to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeNativeTokens(writeStream, object) {
    writeStream.writeUInt8("nativeTokens.numNativeTokens", object.length);
    for (let i = 0; i < object.length; i++) {
        serializeNativeToken(writeStream, object[i]);
    }
}
/**
 * Deserialize the native token from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeNativeToken(readStream) {
    const id = readStream.readFixedHex("nativeToken.id", NATIVE_TOKEN_ID_LENGTH);
    const amount = readStream.readUInt256("nativeToken.amount");
    return {
        id,
        amount: amount.toString()
    };
}
/**
 * Serialize the native token to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeNativeToken(writeStream, object) {
    writeStream.writeFixedHex("nativeToken.id", NATIVE_TOKEN_ID_LENGTH, object.id);
    writeStream.writeUInt256("nativeToken.amount", bigInt(object.amount));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlVG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9uYXRpdmVUb2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBRWpDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFNUQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBVyxVQUFVLENBQUM7QUFFM0Q7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBVyxFQUFFLENBQUM7QUFFbEQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBVyx3QkFBd0IsR0FBRyxXQUFXLEdBQUcsVUFBVSxDQUFDO0FBRTdGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQVcsaUJBQWlCLEdBQUcsdUJBQXVCLENBQUM7QUFFMUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBVyxFQUFFLENBQUM7QUFFakQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxVQUFzQjtJQUMxRCxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDN0UsTUFBTSxZQUFZLEdBQW1CLEVBQUUsQ0FBQztJQUV4QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLFlBQVksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUN6RDtJQUVELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQixDQUFDLFdBQXdCLEVBQUUsTUFBc0I7SUFDbEYsV0FBVyxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2hEO0FBQ0wsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsVUFBc0I7SUFDekQsTUFBTSxFQUFFLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0lBQzdFLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUU1RCxPQUFPO1FBQ0gsRUFBRTtRQUNGLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFO0tBQzVCLENBQUM7QUFDTixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxXQUF3QixFQUFFLE1BQW9CO0lBQy9FLFdBQVcsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLFdBQVcsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzFFLENBQUMifQ==