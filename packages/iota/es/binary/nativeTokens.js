import bigInt from "big-integer";
import { MIN_ALIAS_ADDRESS_LENGTH } from "./addresses/aliasAddress";
import { UINT16_SIZE, UINT32_SIZE, UINT8_SIZE } from "./commonDataTypes";
/**
 * The minimum length of a native tokens list.
 */
export const MIN_NATIVE_TOKENS_LENGTH = UINT16_SIZE;
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
 * Deserialize the natovetokens from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeNativeTokens(readStream) {
    const numNativeTokens = readStream.readUInt16("nativeTokens.numNativeTokens");
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
    writeStream.writeUInt16("nativeTokens.numNativeTokens", object.length);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlVG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9uYXRpdmVUb2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBRWpDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXpFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQVcsV0FBVyxDQUFDO0FBRTVEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQVcsRUFBRSxDQUFDO0FBRWxEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQVcsd0JBQXdCLEdBQUcsV0FBVyxHQUFHLFVBQVUsQ0FBQztBQUU3Rjs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFXLGlCQUFpQixHQUFHLHVCQUF1QixDQUFDO0FBRTFGOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsVUFBc0I7SUFDMUQsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQzlFLE1BQU0sWUFBWSxHQUFtQixFQUFFLENBQUM7SUFFeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxZQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7S0FDekQ7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN4QixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxXQUF3QixFQUFFLE1BQXNCO0lBQ2xGLFdBQVcsQ0FBQyxXQUFXLENBQUMsOEJBQThCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNoRDtBQUNMLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHNCQUFzQixDQUFDLFVBQXNCO0lBQ3pELE1BQU0sRUFBRSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztJQUM3RSxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFFNUQsT0FBTztRQUNILEVBQUU7UUFDRixNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRTtLQUM1QixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsV0FBd0IsRUFBRSxNQUFvQjtJQUMvRSxXQUFXLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLHNCQUFzQixFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvRSxXQUFXLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUMxRSxDQUFDIn0=