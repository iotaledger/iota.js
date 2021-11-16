import { SIMPLE_TOKEN_SCHEME_TYPE } from "../../models/tokenSchemes/ISimpleTokenScheme";
import { deserializeSimpleTokenScheme, MIN_SIMPLE_TOKEN_SCHEME_LENGTH, serializeSimpleTokenScheme } from "./simpleTokenScheme";
/**
 * The minimum length of a simple token scheme binary representation.
 */
export const MIN_TOKEN_SCHEME_LENGTH = MIN_SIMPLE_TOKEN_SCHEME_LENGTH;
/**
 * Deserialize the token scheme from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTokenScheme(readStream) {
    if (!readStream.hasRemaining(MIN_TOKEN_SCHEME_LENGTH)) {
        throw new Error(`Token Scheme data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TOKEN_SCHEME_LENGTH}`);
    }
    const type = readStream.readUInt8("tokenScheme.type", false);
    let tokenScheme;
    if (type === SIMPLE_TOKEN_SCHEME_TYPE) {
        tokenScheme = deserializeSimpleTokenScheme(readStream);
    }
    else {
        throw new Error(`Unrecognized token scheme type ${type}`);
    }
    return tokenScheme;
}
/**
 * Serialize the token scheme to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTokenScheme(writeStream, object) {
    if (object.type === SIMPLE_TOKEN_SCHEME_TYPE) {
        serializeSimpleTokenScheme(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized simple token scheme type ${object.type}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5TY2hlbWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS90b2tlblNjaGVtZXMvdG9rZW5TY2hlbWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRXhGLE9BQU8sRUFDSCw0QkFBNEIsRUFDNUIsOEJBQThCLEVBQzlCLDBCQUEwQixFQUM3QixNQUFNLHFCQUFxQixDQUFDO0FBRTdCOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQVcsOEJBQThCLENBQUM7QUFFOUU7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxVQUFzQjtJQUN6RCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO1FBQ25ELE1BQU0sSUFBSSxLQUFLLENBQ1gsd0JBQXdCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLHVCQUF1QixFQUFFLENBQ3ZJLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0QsSUFBSSxXQUFXLENBQUM7SUFFaEIsSUFBSSxJQUFJLEtBQUssd0JBQXdCLEVBQUU7UUFDbkMsV0FBVyxHQUFHLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzFEO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzdEO0lBRUQsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsV0FBd0IsRUFBRSxNQUF3QjtJQUNuRixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssd0JBQXdCLEVBQUU7UUFDMUMsMEJBQTBCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ25EO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUMzRTtBQUNMLENBQUMifQ==