import { NFT_UNLOCK_BLOCK_TYPE } from "../../models/unlockBlocks/INftUnlockBlock";
import { SMALL_TYPE_LENGTH, UINT16_SIZE } from "../commonDataTypes";
/**
 * The minimum length of a nft unlock block binary representation.
 */
export const MIN_NFT_UNLOCK_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT16_SIZE;
/**
 * Deserialize the nft unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeNftUnlockBlock(readStream) {
    if (!readStream.hasRemaining(MIN_NFT_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Nft Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_NFT_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("nftUnlockBlock.type");
    if (type !== NFT_UNLOCK_BLOCK_TYPE) {
        throw new Error(`Type mismatch in nftUnlockBlock ${type}`);
    }
    const reference = readStream.readUInt16("nftUnlockBlock.reference");
    return {
        type: NFT_UNLOCK_BLOCK_TYPE,
        reference
    };
}
/**
 * Serialize the nft unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeNftUnlockBlock(writeStream, object) {
    writeStream.writeByte("nftUnlockBlock.type", object.type);
    writeStream.writeUInt16("nftUnlockBlock.reference", object.reference);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0VW5sb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L3VubG9ja0Jsb2Nrcy9uZnRVbmxvY2tCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQW1CLHFCQUFxQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQVcsaUJBQWlCLEdBQUcsV0FBVyxDQUFDO0FBRW5GOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUseUJBQXlCLENBQUMsVUFBc0I7SUFDNUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsMkJBQTJCLENBQUMsRUFBRTtRQUN2RCxNQUFNLElBQUksS0FBSyxDQUNYLDRCQUE0QixVQUFVLENBQUMsTUFBTSxFQUFFLGdFQUFnRSwyQkFBMkIsRUFBRSxDQUMvSSxDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDeEQsSUFBSSxJQUFJLEtBQUsscUJBQXFCLEVBQUU7UUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUM5RDtJQUVELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUVwRSxPQUFPO1FBQ0gsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixTQUFTO0tBQ1osQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHVCQUF1QixDQUFDLFdBQXdCLEVBQUUsTUFBdUI7SUFDckYsV0FBVyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUQsV0FBVyxDQUFDLFdBQVcsQ0FBQywwQkFBMEIsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDMUUsQ0FBQyJ9