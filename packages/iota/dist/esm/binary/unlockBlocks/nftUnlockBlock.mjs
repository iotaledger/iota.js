import { NFT_UNLOCK_BLOCK_TYPE } from "../../models/unlockBlocks/INftUnlockBlock.mjs";
import { SMALL_TYPE_LENGTH, UINT16_SIZE } from "../commonDataTypes.mjs";
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
