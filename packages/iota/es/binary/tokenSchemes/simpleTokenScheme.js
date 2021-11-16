import { SIMPLE_TOKEN_SCHEME_TYPE } from "../../models/tokenSchemes/ISimpleTokenScheme";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
/**
 * The minimum length of an simple token scheme binary representation.
 */
export const MIN_SIMPLE_TOKEN_SCHEME_LENGTH = SMALL_TYPE_LENGTH;
/**
 * Deserialize the simple token scheme from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSimpleTokenScheme(readStream) {
    if (!readStream.hasRemaining(MIN_SIMPLE_TOKEN_SCHEME_LENGTH)) {
        throw new Error(`Simple Token Scheme data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIMPLE_TOKEN_SCHEME_LENGTH}`);
    }
    const type = readStream.readUInt8("simpleTokenScheme.type");
    if (type !== SIMPLE_TOKEN_SCHEME_TYPE) {
        throw new Error(`Type mismatch in simpleTokenScheme ${type}`);
    }
    return {
        type: SIMPLE_TOKEN_SCHEME_TYPE
    };
}
/**
 * Serialize the simple token scheme to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSimpleTokenScheme(writeStream, object) {
    writeStream.writeUInt8("simpleTokenScheme.type", object.type);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlVG9rZW5TY2hlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L3Rva2VuU2NoZW1lcy9zaW1wbGVUb2tlblNjaGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQXNCLHdCQUF3QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDNUcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFdkQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSw4QkFBOEIsR0FBVyxpQkFBaUIsQ0FBQztBQUV4RTs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDRCQUE0QixDQUFDLFVBQXNCO0lBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLDhCQUE4QixDQUFDLEVBQUU7UUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FDWCwrQkFBK0IsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsOEJBQThCLEVBQUUsQ0FDckosQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzVELElBQUksSUFBSSxLQUFLLHdCQUF3QixFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDakU7SUFFRCxPQUFPO1FBQ0gsSUFBSSxFQUFFLHdCQUF3QjtLQUNqQyxDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsMEJBQTBCLENBQUMsV0FBd0IsRUFBRSxNQUEwQjtJQUMzRixXQUFXLENBQUMsVUFBVSxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsRSxDQUFDIn0=