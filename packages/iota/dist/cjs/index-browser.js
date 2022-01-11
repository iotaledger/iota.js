(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@iota/crypto.js'), require('big-integer'), require('@iota/util.js')) :
    typeof define === 'function' && define.amd ? define(['exports', '@iota/crypto.js', 'big-integer', '@iota/util.js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Iota = {}, global.IotaCrypto, global.bigInt, global.IotaUtil));
})(this, (function (exports, crypto_js, bigInt, util_js) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var bigInt__default = /*#__PURE__*/_interopDefaultLegacy(bigInt);

    // Copyright 2020 IOTA Stiftung
    /**
     * Class to help with Ed25519 Signature scheme.
     */
    class Ed25519Address {
        /**
         * Create a new instance of Ed25519Address.
         * @param publicKey The public key for the address.
         */
        constructor(publicKey) {
            this._publicKey = publicKey;
        }
        /**
         * Convert the public key to an address.
         * @returns The address.
         */
        toAddress() {
            return crypto_js.Blake2b.sum256(this._publicKey);
        }
        /**
         * Use the public key to validate the address.
         * @param address The address to verify.
         * @returns True if the data and address is verified.
         */
        verify(address) {
            return crypto_js.ArrayHelper.equal(this.toAddress(), address);
        }
    }
    /**
     * Address size.
     * @internal
     */
    Ed25519Address.ADDRESS_LENGTH = crypto_js.Blake2b.SIZE_256;

    /**
     * The global type for the alias address type.
     */
    const ALIAS_ADDRESS_TYPE = 8;

    /**
     * The global type for the BLS address type.
     */
    const BLS_ADDRESS_TYPE = 1;

    /**
     * The global type for the ed25519 address type.
     */
    const ED25519_ADDRESS_TYPE = 0;

    /**
     * The global type for the NFT address type.
     */
    const NFT_ADDRESS_TYPE = 16;

    // Copyright 2020 IOTA Stiftung
    /**
     * Byte length for a uint8 field.
     */
    const UINT8_SIZE = 1;
    /**
     * Byte length for a uint16 field.
     */
    const UINT16_SIZE = 2;
    /**
     * Byte length for a uint32 field.
     */
    const UINT32_SIZE = 4;
    /**
     * Byte length for a uint64 field.
     */
    const UINT64_SIZE = 8;
    /**
     * Byte length for a uint256 field.
     */
    const UINT256_SIZE = 32;
    /**
     * Byte length for a message id.
     */
    const MESSAGE_ID_LENGTH = crypto_js.Blake2b.SIZE_256;
    /**
     * Byte length for a transaction id.
     */
    const TRANSACTION_ID_LENGTH = crypto_js.Blake2b.SIZE_256;
    /**
     * Byte length for a merkle prrof.
     */
    const MERKLE_PROOF_LENGTH = crypto_js.Blake2b.SIZE_256;
    /**
     * Byte length for a type length.
     */
    const TYPE_LENGTH = UINT32_SIZE;
    /**
     * Byte length for a small type length.
     */
    const SMALL_TYPE_LENGTH = UINT8_SIZE;
    /**
     * Byte length for a string length.
     */
    const STRING_LENGTH = UINT16_SIZE;
    /**
     * Byte length for an array length.
     */
    const ARRAY_LENGTH = UINT16_SIZE;

    /**
     * The length of an alias address.
     */
    const ALIAS_ADDRESS_LENGTH = 20;
    /**
     * The minimum length of an alias address binary representation.
     */
    const MIN_ALIAS_ADDRESS_LENGTH = SMALL_TYPE_LENGTH + ALIAS_ADDRESS_LENGTH;
    /**
     * Deserialize the alias address from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeAliasAddress(readStream) {
        if (!readStream.hasRemaining(MIN_ALIAS_ADDRESS_LENGTH)) {
            throw new Error(`Alias address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ALIAS_ADDRESS_LENGTH}`);
        }
        const type = readStream.readUInt8("aliasAddress.type");
        if (type !== ALIAS_ADDRESS_TYPE) {
            throw new Error(`Type mismatch in aliasAddress ${type}`);
        }
        const address = readStream.readFixedHex("aliasAddress.address", ALIAS_ADDRESS_LENGTH);
        return {
            type: ALIAS_ADDRESS_TYPE,
            address
        };
    }
    /**
     * Serialize the alias address to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeAliasAddress(writeStream, object) {
        writeStream.writeUInt8("aliasAddress.type", object.type);
        writeStream.writeFixedHex("aliasAddress.address", ALIAS_ADDRESS_LENGTH, object.address);
    }

    /**
     * The length of a BLS address.
     */
    const BLS_ADDRESS_LENGTH = 32;
    /**
     * The minimum length of an bls address binary representation.
     */
    const MIN_BLS_ADDRESS_LENGTH = SMALL_TYPE_LENGTH + BLS_ADDRESS_LENGTH;
    /**
     * Deserialize the bls address from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeBlsAddress(readStream) {
        if (!readStream.hasRemaining(MIN_BLS_ADDRESS_LENGTH)) {
            throw new Error(`BLS address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_BLS_ADDRESS_LENGTH}`);
        }
        const type = readStream.readUInt8("blsAddress.type");
        if (type !== BLS_ADDRESS_TYPE) {
            throw new Error(`Type mismatch in blsAddress ${type}`);
        }
        const address = readStream.readFixedHex("blsAddress.address", BLS_ADDRESS_LENGTH);
        return {
            type: BLS_ADDRESS_TYPE,
            address
        };
    }
    /**
     * Serialize the bls address to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeBlsAddress(writeStream, object) {
        writeStream.writeUInt8("blsAddress.type", object.type);
        writeStream.writeFixedHex("blsAddress.address", BLS_ADDRESS_LENGTH, object.address);
    }

    /**
     * The minimum length of an ed25519 address binary representation.
     */
    const MIN_ED25519_ADDRESS_LENGTH = SMALL_TYPE_LENGTH + Ed25519Address.ADDRESS_LENGTH;
    /**
     * Deserialize the Ed25519 address from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeEd25519Address(readStream) {
        if (!readStream.hasRemaining(MIN_ED25519_ADDRESS_LENGTH)) {
            throw new Error(`Ed25519 address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ED25519_ADDRESS_LENGTH}`);
        }
        const type = readStream.readUInt8("ed25519Address.type");
        if (type !== ED25519_ADDRESS_TYPE) {
            throw new Error(`Type mismatch in ed25519Address ${type}`);
        }
        const address = readStream.readFixedHex("ed25519Address.address", Ed25519Address.ADDRESS_LENGTH);
        return {
            type: ED25519_ADDRESS_TYPE,
            address
        };
    }
    /**
     * Serialize the ed25519 address to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeEd25519Address(writeStream, object) {
        writeStream.writeUInt8("ed25519Address.type", object.type);
        writeStream.writeFixedHex("ed25519Address.address", Ed25519Address.ADDRESS_LENGTH, object.address);
    }

    /**
     * The length of an NFT address.
     */
    const NFT_ADDRESS_LENGTH = 20;
    /**
     * The minimum length of an nft address binary representation.
     */
    const MIN_NFT_ADDRESS_LENGTH = SMALL_TYPE_LENGTH + NFT_ADDRESS_LENGTH;
    /**
     * Deserialize the nft address from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeNftAddress(readStream) {
        if (!readStream.hasRemaining(MIN_NFT_ADDRESS_LENGTH)) {
            throw new Error(`NFT address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_NFT_ADDRESS_LENGTH}`);
        }
        const type = readStream.readUInt8("nftAddress.type");
        if (type !== NFT_ADDRESS_TYPE) {
            throw new Error(`Type mismatch in nftAddress ${type}`);
        }
        const address = readStream.readFixedHex("nftAddress.address", NFT_ADDRESS_LENGTH);
        return {
            type: NFT_ADDRESS_TYPE,
            address
        };
    }
    /**
     * Serialize the nft address to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeNftAddress(writeStream, object) {
        writeStream.writeUInt8("nftAddress.type", object.type);
        writeStream.writeFixedHex("nftAddress.address", NFT_ADDRESS_LENGTH, object.address);
    }

    /**
     * The minimum length of an address binary representation.
     */
    const MIN_ADDRESS_LENGTH = Math.min(MIN_ED25519_ADDRESS_LENGTH, MIN_ALIAS_ADDRESS_LENGTH, MIN_BLS_ADDRESS_LENGTH, MIN_NFT_ADDRESS_LENGTH);
    /**
     * Deserialize the address from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeAddress(readStream) {
        if (!readStream.hasRemaining(MIN_ADDRESS_LENGTH)) {
            throw new Error(`Address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ADDRESS_LENGTH}`);
        }
        const type = readStream.readUInt8("address.type", false);
        let address;
        if (type === ED25519_ADDRESS_TYPE) {
            address = deserializeEd25519Address(readStream);
        }
        else if (type === ALIAS_ADDRESS_TYPE) {
            address = deserializeAliasAddress(readStream);
        }
        else if (type === BLS_ADDRESS_TYPE) {
            address = deserializeBlsAddress(readStream);
        }
        else if (type === NFT_ADDRESS_TYPE) {
            address = deserializeNftAddress(readStream);
        }
        else {
            throw new Error(`Unrecognized address type ${type}`);
        }
        return address;
    }
    /**
     * Serialize the address to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeAddress(writeStream, object) {
        if (object.type === ED25519_ADDRESS_TYPE) {
            serializeEd25519Address(writeStream, object);
        }
        else if (object.type === ALIAS_ADDRESS_TYPE) {
            serializeAliasAddress(writeStream, object);
        }
        else if (object.type === BLS_ADDRESS_TYPE) {
            serializeBlsAddress(writeStream, object);
        }
        else if (object.type === NFT_ADDRESS_TYPE) {
            serializeNftAddress(writeStream, object);
        }
        else {
            throw new Error(`Unrecognized address type ${object.type}`);
        }
    }

    /**
     * The global type for the dust deposit return feature block.
     */
    const DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE = 2;

    /**
     * The minimum length of a return feature block binary representation.
     */
    const MIN_DUST_DEPOSIT_RETURN_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + // Type
        UINT64_SIZE; // Amount
    /**
     * Deserialize the dust deposit return feature block from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeDustDepositReturnFeatureBlock(readStream) {
        if (!readStream.hasRemaining(MIN_DUST_DEPOSIT_RETURN_FEATURE_BLOCK_LENGTH)) {
            throw new Error(`Dust Deposit Return Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_DUST_DEPOSIT_RETURN_FEATURE_BLOCK_LENGTH}`);
        }
        const type = readStream.readUInt8("dustDepositReturnFeatureBlock.type");
        if (type !== DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE) {
            throw new Error(`Type mismatch in dustDepositReturnFeatureBlock ${type}`);
        }
        const amount = readStream.readUInt64("dustDepositReturnFeatureBlock.amount");
        return {
            type: DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE,
            amount: Number(amount)
        };
    }
    /**
     * Serialize the dust deposit return feature block to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeDustDepositReturnFeatureBlock(writeStream, object) {
        writeStream.writeUInt8("dustDepositReturnFeatureBlock.type", object.type);
        writeStream.writeUInt64("dustDepositReturnFeatureBlock.amount", bigInt__default["default"](object.amount));
    }

    /**
     * The global type for the expiration milestone feature block.
     */
    const EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE = 5;

    /**
     * The minimum length of a expiration milestone index feature block binary representation.
     */
    const MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT32_SIZE;
    /**
     * Deserialize the expiration milestone index feature block from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeExpirationMilestoneIndexFeatureBlock(readStream) {
        if (!readStream.hasRemaining(MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH)) {
            throw new Error(`ExpirationMilestoneIndex Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH}`);
        }
        const type = readStream.readUInt8("expirationMilestoneIndexFeatureBlock.type");
        if (type !== EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
            throw new Error(`Type mismatch in expirationMilestoneIndexFeatureBlock ${type}`);
        }
        const milestoneIndex = readStream.readUInt32("expirationMilestoneIndexFeatureBlock.milestoneIndex");
        return {
            type: EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE,
            milestoneIndex
        };
    }
    /**
     * Serialize the expiration milestone index feature block to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeExpirationMilestoneIndexFeatureBlock(writeStream, object) {
        writeStream.writeUInt8("expirationMilestoneIndexFeatureBlock.type", object.type);
        writeStream.writeUInt32("expirationMilestoneIndexFeatureBlock.milestoneIndex", object.milestoneIndex);
    }

    /**
     * The global type for the expiration unix feature block.
     */
    const EXPIRATION_UNIX_FEATURE_BLOCK_TYPE = 6;

    /**
     * The minimum length of a expiration unix feature block binary representation.
     */
    const MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT32_SIZE;
    /**
     * Deserialize the expiration unix feature block from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeExpirationUnixFeatureBlock(readStream) {
        if (!readStream.hasRemaining(MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH)) {
            throw new Error(`ExpirationUnix Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH}`);
        }
        const type = readStream.readUInt8("expirationUnixFeatureBlock.type");
        if (type !== EXPIRATION_UNIX_FEATURE_BLOCK_TYPE) {
            throw new Error(`Type mismatch in expirationUnixFeatureBlock ${type}`);
        }
        const unixTime = readStream.readUInt32("expirationUnixFeatureBlock.unixTime");
        return {
            type: EXPIRATION_UNIX_FEATURE_BLOCK_TYPE,
            unixTime
        };
    }
    /**
     * Serialize the expiration unix feature block to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeExpirationUnixFeatureBlock(writeStream, object) {
        writeStream.writeUInt8("expirationUnixFeatureBlock.type", object.type);
        writeStream.writeUInt32("expirationUnixFeatureBlock.unixTime", object.unixTime);
    }

    /**
     * The global type for the indexation feature block.
     */
    const INDEXATION_FEATURE_BLOCK_TYPE = 8;

    /**
     * The global type for the issuer feature block.
     */
    const ISSUER_FEATURE_BLOCK_TYPE = 1;

    /**
     * The global type for the metadata feature block.
     */
    const METADATA_FEATURE_BLOCK_TYPE = 7;

    /**
     * The global type for the sender feature block.
     */
    const SENDER_FEATURE_BLOCK_TYPE = 0;

    /**
     * The global type for the timelock milestone feature block.
     */
    const TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE = 3;

    /**
     * The global type for the timelock unix feature block.
     */
    const TIMELOCK_UNIX_FEATURE_BLOCK_TYPE = 4;

    /**
     * The minimum length of a indexation feature block binary representation.
     */
    const MIN_INDEXATION_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + // Type
        UINT8_SIZE; // Length
    /**
     * Deserialize the indexation feature block from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeIndexationFeatureBlock(readStream) {
        if (!readStream.hasRemaining(MIN_INDEXATION_FEATURE_BLOCK_LENGTH)) {
            throw new Error(`Indexation Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_INDEXATION_FEATURE_BLOCK_LENGTH}`);
        }
        const type = readStream.readUInt8("indexationFeatureBlock.type");
        if (type !== INDEXATION_FEATURE_BLOCK_TYPE) {
            throw new Error(`Type mismatch in indexationFeatureBlock ${type}`);
        }
        const tagLength = readStream.readUInt8("indexationFeatureBlock.tagLength");
        const tag = readStream.readFixedHex("indexationFeatureBlock.tag", tagLength);
        return {
            type: INDEXATION_FEATURE_BLOCK_TYPE,
            tag
        };
    }
    /**
     * Serialize the indexation feature block to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeIndexationFeatureBlock(writeStream, object) {
        writeStream.writeUInt8("indexationFeatureBlock.type", object.type);
        writeStream.writeUInt8("indexationFeatureBlock.tagLength", object.tag.length / 2);
        writeStream.writeFixedHex("indexationFeatureBlock.tag", object.tag.length / 2, object.tag);
    }

    /**
     * The minimum length of a issuer feature block binary representation.
     */
    const MIN_ISSUER_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;
    /**
     * Deserialize the issuer feature block from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeIssuerFeatureBlock(readStream) {
        if (!readStream.hasRemaining(MIN_ISSUER_FEATURE_BLOCK_LENGTH)) {
            throw new Error(`Issuer Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ISSUER_FEATURE_BLOCK_LENGTH}`);
        }
        const type = readStream.readUInt8("issuerFeatureBlock.type");
        if (type !== ISSUER_FEATURE_BLOCK_TYPE) {
            throw new Error(`Type mismatch in issuerFeatureBlock ${type}`);
        }
        const address = deserializeAddress(readStream);
        return {
            type: ISSUER_FEATURE_BLOCK_TYPE,
            address
        };
    }
    /**
     * Serialize the issuer feature block to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeIssuerFeatureBlock(writeStream, object) {
        writeStream.writeUInt8("issuerFeatureBlock.type", object.type);
        serializeAddress(writeStream, object.address);
    }

    /**
     * The minimum length of a metadata feature block binary representation.
     */
    const MIN_METADATA_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT32_SIZE;
    /**
     * Deserialize the metadata feature block from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeMetadataFeatureBlock(readStream) {
        if (!readStream.hasRemaining(MIN_METADATA_FEATURE_BLOCK_LENGTH)) {
            throw new Error(`Metadata Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_METADATA_FEATURE_BLOCK_LENGTH}`);
        }
        const type = readStream.readUInt8("metadataFeatureBlock.type");
        if (type !== METADATA_FEATURE_BLOCK_TYPE) {
            throw new Error(`Type mismatch in metadataFeatureBlock ${type}`);
        }
        const dataLength = readStream.readUInt32("metadataFeatureBlock.dataLength");
        const data = readStream.readFixedHex("metadataFeatureBlock.data", dataLength);
        return {
            type: METADATA_FEATURE_BLOCK_TYPE,
            data
        };
    }
    /**
     * Serialize the metadata feature block to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeMetadataFeatureBlock(writeStream, object) {
        writeStream.writeUInt8("metadataFeatureBlock.type", object.type);
        writeStream.writeUInt32("metadataFeatureBlock.dataLength", object.data.length / 2);
        writeStream.writeFixedHex("metadataFeatureBlock.data", object.data.length / 2, object.data);
    }

    /**
     * The minimum length of a sender feature block binary representation.
     */
    const MIN_SENDER_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;
    /**
     * Deserialize the sender feature block from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeSenderFeatureBlock(readStream) {
        if (!readStream.hasRemaining(MIN_SENDER_FEATURE_BLOCK_LENGTH)) {
            throw new Error(`Sender Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SENDER_FEATURE_BLOCK_LENGTH}`);
        }
        const type = readStream.readUInt8("senderFeatureBlock.type");
        if (type !== SENDER_FEATURE_BLOCK_TYPE) {
            throw new Error(`Type mismatch in senderFeatureBlock ${type}`);
        }
        const address = deserializeAddress(readStream);
        return {
            type: SENDER_FEATURE_BLOCK_TYPE,
            address
        };
    }
    /**
     * Serialize the sender feature block to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeSenderFeatureBlock(writeStream, object) {
        writeStream.writeUInt8("senderFeatureBlock.type", object.type);
        serializeAddress(writeStream, object.address);
    }

    /**
     * The minimum length of a timelock milestone index feature block binary representation.
     */
    const MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT32_SIZE;
    /**
     * Deserialize the timelock milestone index feature block from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeTimelockMilestoneIndexFeatureBlock(readStream) {
        if (!readStream.hasRemaining(MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH)) {
            throw new Error(`TimelockMilestoneIndex Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH}`);
        }
        const type = readStream.readUInt8("timelockMilestoneIndexFeatureBlock.type");
        if (type !== TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
            throw new Error(`Type mismatch in timelockMilestoneIndexFeatureBlock ${type}`);
        }
        const milestoneIndex = readStream.readUInt32("timelockMilestoneIndexFeatureBlock.milestoneIndex");
        return {
            type: TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE,
            milestoneIndex
        };
    }
    /**
     * Serialize the timelock milestone index feature block to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeTimelockMilestoneIndexFeatureBlock(writeStream, object) {
        writeStream.writeUInt8("timelockMilestoneIndexFeatureBlock.type", object.type);
        writeStream.writeUInt32("timelockMilestoneIndexFeatureBlock.milestoneIndex", object.milestoneIndex);
    }

    /**
     * The minimum length of a timelock unix feature block binary representation.
     */
    const MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT32_SIZE;
    /**
     * Deserialize the timelock unix feature block from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeTimelockUnixFeatureBlock(readStream) {
        if (!readStream.hasRemaining(MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH)) {
            throw new Error(`TimelockUnix Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH}`);
        }
        const type = readStream.readUInt8("timelockUnixFeatureBlock.type");
        if (type !== TIMELOCK_UNIX_FEATURE_BLOCK_TYPE) {
            throw new Error(`Type mismatch in timelockUnixFeatureBlock ${type}`);
        }
        const unixTime = readStream.readUInt32("timelockUnixFeatureBlock.unixTime");
        return {
            type: TIMELOCK_UNIX_FEATURE_BLOCK_TYPE,
            unixTime
        };
    }
    /**
     * Serialize the timelock unix feature block to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeTimelockUnixFeatureBlock(writeStream, object) {
        writeStream.writeUInt8("timelockUnixFeatureBlock.type", object.type);
        writeStream.writeUInt32("timelockUnixFeatureBlock.unixTime", object.unixTime);
    }

    /**
     * The minimum length of a feature blocks tokens list.
     */
    const MIN_FEATURE_BLOCKS_LENGTH = UINT8_SIZE;
    /**
     * The minimum length of a feature block binary representation.
     */
    const MIN_FEATURE_BLOCK_LENGTH = Math.min(MIN_SENDER_FEATURE_BLOCK_LENGTH, MIN_ISSUER_FEATURE_BLOCK_LENGTH, MIN_DUST_DEPOSIT_RETURN_FEATURE_BLOCK_LENGTH, MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH, MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH, MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH, MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH, MIN_METADATA_FEATURE_BLOCK_LENGTH, MIN_INDEXATION_FEATURE_BLOCK_LENGTH);
    /**
     * Deserialize the feature blocks from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeFeatureBlocks(readStream) {
        const numFeatureBlocks = readStream.readUInt8("featureBlocks.numFeatureBlocks");
        const featureBlocks = [];
        for (let i = 0; i < numFeatureBlocks; i++) {
            featureBlocks.push(deserializeFeatureBlock(readStream));
        }
        return featureBlocks;
    }
    /**
     * Serialize the feature blocks to binary.
     * @param writeStream The stream to write the data to.
     * @param objects The objects to serialize.
     */
    function serializeFeatureBlocks(writeStream, objects) {
        writeStream.writeUInt8("featureBlocks.numFeatureBlocks", objects.length);
        for (let i = 0; i < objects.length; i++) {
            serializeFeatureBlock(writeStream, objects[i]);
        }
    }
    /**
     * Deserialize the feature block from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeFeatureBlock(readStream) {
        if (!readStream.hasRemaining(MIN_FEATURE_BLOCK_LENGTH)) {
            throw new Error(`Feature block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_FEATURE_BLOCK_LENGTH}`);
        }
        const type = readStream.readUInt8("featureBlock.type", false);
        let input;
        if (type === SENDER_FEATURE_BLOCK_TYPE) {
            input = deserializeSenderFeatureBlock(readStream);
        }
        else if (type === ISSUER_FEATURE_BLOCK_TYPE) {
            input = deserializeIssuerFeatureBlock(readStream);
        }
        else if (type === DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE) {
            input = deserializeDustDepositReturnFeatureBlock(readStream);
        }
        else if (type === TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
            input = deserializeTimelockMilestoneIndexFeatureBlock(readStream);
        }
        else if (type === TIMELOCK_UNIX_FEATURE_BLOCK_TYPE) {
            input = deserializeTimelockUnixFeatureBlock(readStream);
        }
        else if (type === EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
            input = deserializeExpirationMilestoneIndexFeatureBlock(readStream);
        }
        else if (type === EXPIRATION_UNIX_FEATURE_BLOCK_TYPE) {
            input = deserializeExpirationUnixFeatureBlock(readStream);
        }
        else if (type === METADATA_FEATURE_BLOCK_TYPE) {
            input = deserializeMetadataFeatureBlock(readStream);
        }
        else if (type === INDEXATION_FEATURE_BLOCK_TYPE) {
            input = deserializeIndexationFeatureBlock(readStream);
        }
        else {
            throw new Error(`Unrecognized feature block type ${type}`);
        }
        return input;
    }
    /**
     * Serialize the feature block to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeFeatureBlock(writeStream, object) {
        if (object.type === SENDER_FEATURE_BLOCK_TYPE) {
            serializeSenderFeatureBlock(writeStream, object);
        }
        else if (object.type === ISSUER_FEATURE_BLOCK_TYPE) {
            serializeIssuerFeatureBlock(writeStream, object);
        }
        else if (object.type === DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE) {
            serializeDustDepositReturnFeatureBlock(writeStream, object);
        }
        else if (object.type === TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
            serializeTimelockMilestoneIndexFeatureBlock(writeStream, object);
        }
        else if (object.type === TIMELOCK_UNIX_FEATURE_BLOCK_TYPE) {
            serializeTimelockUnixFeatureBlock(writeStream, object);
        }
        else if (object.type === EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
            serializeExpirationMilestoneIndexFeatureBlock(writeStream, object);
        }
        else if (object.type === EXPIRATION_UNIX_FEATURE_BLOCK_TYPE) {
            serializeExpirationUnixFeatureBlock(writeStream, object);
        }
        else if (object.type === METADATA_FEATURE_BLOCK_TYPE) {
            serializeMetadataFeatureBlock(writeStream, object);
        }
        else if (object.type === INDEXATION_FEATURE_BLOCK_TYPE) {
            serializeIndexationFeatureBlock(writeStream, object);
        }
        else {
            throw new Error(`Unrecognized feature block type ${object.type}`);
        }
    }

    /**
     * The length of the tail hash length in bytes.
     */
    const TAIL_HASH_LENGTH = 49;
    /**
     * The minimum length of a migrated fund binary representation.
     */
    const MIN_MIGRATED_FUNDS_LENGTH = TAIL_HASH_LENGTH + // tailTransactionHash
        MIN_ADDRESS_LENGTH + // address
        UINT64_SIZE; // deposit
    /**
     * The maximum number of funds.
     */
    const MAX_FUNDS_COUNT = 127;
    /**
     * Deserialize the receipt payload funds from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeFunds(readStream) {
        const numFunds = readStream.readUInt16("funds.numFunds");
        const funds = [];
        for (let i = 0; i < numFunds; i++) {
            funds.push(deserializeMigratedFunds(readStream));
        }
        return funds;
    }
    /**
     * Serialize the receipt payload funds to binary.
     * @param writeStream The stream to write the data to.
     * @param objects The objects to serialize.
     */
    function serializeFunds(writeStream, objects) {
        if (objects.length > MAX_FUNDS_COUNT) {
            throw new Error(`The maximum number of funds is ${MAX_FUNDS_COUNT}, you have provided ${objects.length}`);
        }
        writeStream.writeUInt16("funds.numFunds", objects.length);
        for (let i = 0; i < objects.length; i++) {
            serializeMigratedFunds(writeStream, objects[i]);
        }
    }
    /**
     * Deserialize the migrated fund from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeMigratedFunds(readStream) {
        if (!readStream.hasRemaining(MIN_MIGRATED_FUNDS_LENGTH)) {
            throw new Error(`Migrated funds data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_MIGRATED_FUNDS_LENGTH}`);
        }
        const tailTransactionHash = readStream.readFixedHex("migratedFunds.tailTransactionHash", TAIL_HASH_LENGTH);
        const address = deserializeAddress(readStream);
        const deposit = readStream.readUInt64("migratedFunds.deposit");
        return {
            tailTransactionHash,
            address,
            deposit: Number(deposit)
        };
    }
    /**
     * Serialize the migrated funds to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeMigratedFunds(writeStream, object) {
        writeStream.writeFixedHex("migratedFunds.tailTransactionHash", TAIL_HASH_LENGTH, object.tailTransactionHash);
        serializeAddress(writeStream, object.address);
        writeStream.writeUInt64("migratedFunds.deposit", bigInt__default["default"](object.deposit));
    }

    /**
     * The global type for the treasury input.
     */
    const TREASURY_INPUT_TYPE = 1;

    /**
     * The global type for the input.
     */
    const UTXO_INPUT_TYPE = 0;

    /**
     * The minimum length of a treasury input binary representation.
     */
    const MIN_TREASURY_INPUT_LENGTH = SMALL_TYPE_LENGTH + TRANSACTION_ID_LENGTH;
    /**
     * Deserialize the treasury input from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeTreasuryInput(readStream) {
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
    function serializeTreasuryInput(writeStream, object) {
        writeStream.writeUInt8("treasuryInput.type", object.type);
        writeStream.writeFixedHex("treasuryInput.milestoneId", TRANSACTION_ID_LENGTH, object.milestoneId);
    }

    /**
     * The minimum length of a utxo input binary representation.
     */
    const MIN_UTXO_INPUT_LENGTH = SMALL_TYPE_LENGTH + TRANSACTION_ID_LENGTH + UINT16_SIZE;
    /**
     * Deserialize the utxo input from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeUTXOInput(readStream) {
        if (!readStream.hasRemaining(MIN_UTXO_INPUT_LENGTH)) {
            throw new Error(`UTXO Input data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_UTXO_INPUT_LENGTH}`);
        }
        const type = readStream.readUInt8("utxoInput.type");
        if (type !== UTXO_INPUT_TYPE) {
            throw new Error(`Type mismatch in utxoInput ${type}`);
        }
        const transactionId = readStream.readFixedHex("utxoInput.transactionId", TRANSACTION_ID_LENGTH);
        const transactionOutputIndex = readStream.readUInt16("utxoInput.transactionOutputIndex");
        return {
            type: UTXO_INPUT_TYPE,
            transactionId,
            transactionOutputIndex
        };
    }
    /**
     * Serialize the utxo input to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeUTXOInput(writeStream, object) {
        writeStream.writeUInt8("utxoInput.type", object.type);
        writeStream.writeFixedHex("utxoInput.transactionId", TRANSACTION_ID_LENGTH, object.transactionId);
        writeStream.writeUInt16("utxoInput.transactionOutputIndex", object.transactionOutputIndex);
    }

    /**
     * The minimum length of an input binary representation.
     */
    const MIN_INPUT_LENGTH = Math.min(MIN_UTXO_INPUT_LENGTH, MIN_TREASURY_INPUT_LENGTH);
    /**
     * The minimum number of inputs.
     */
    const MIN_INPUT_COUNT = 1;
    /**
     * The maximum number of inputs.
     */
    const MAX_INPUT_COUNT = 127;
    /**
     * Deserialize the inputs from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeInputs(readStream) {
        const numInputs = readStream.readUInt16("inputs.numInputs");
        const inputs = [];
        for (let i = 0; i < numInputs; i++) {
            inputs.push(deserializeInput(readStream));
        }
        return inputs;
    }
    /**
     * Serialize the inputs to binary.
     * @param writeStream The stream to write the data to.
     * @param objects The objects to serialize.
     */
    function serializeInputs(writeStream, objects) {
        if (objects.length < MIN_INPUT_COUNT) {
            throw new Error(`The minimum number of inputs is ${MIN_INPUT_COUNT}, you have provided ${objects.length}`);
        }
        if (objects.length > MAX_INPUT_COUNT) {
            throw new Error(`The maximum number of inputs is ${MAX_INPUT_COUNT}, you have provided ${objects.length}`);
        }
        writeStream.writeUInt16("inputs.numInputs", objects.length);
        for (let i = 0; i < objects.length; i++) {
            serializeInput(writeStream, objects[i]);
        }
    }
    /**
     * Deserialize the input from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeInput(readStream) {
        if (!readStream.hasRemaining(MIN_INPUT_LENGTH)) {
            throw new Error(`Input data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_INPUT_LENGTH}`);
        }
        const type = readStream.readUInt8("input.type", false);
        let input;
        if (type === UTXO_INPUT_TYPE) {
            input = deserializeUTXOInput(readStream);
        }
        else if (type === TREASURY_INPUT_TYPE) {
            input = deserializeTreasuryInput(readStream);
        }
        else {
            throw new Error(`Unrecognized input type ${type}`);
        }
        return input;
    }
    /**
     * Serialize the input to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeInput(writeStream, object) {
        if (object.type === UTXO_INPUT_TYPE) {
            serializeUTXOInput(writeStream, object);
        }
        else if (object.type === TREASURY_INPUT_TYPE) {
            serializeTreasuryInput(writeStream, object);
        }
        else {
            throw new Error(`Unrecognized input type ${object.type}`);
        }
    }

    /**
     * The global type for the payload.
     */
    const INDEXATION_PAYLOAD_TYPE = 2;

    /**
     * The global type for the payload.
     */
    const MILESTONE_PAYLOAD_TYPE = 1;

    /**
     * The global type for the payload.
     */
    const RECEIPT_PAYLOAD_TYPE = 3;

    /**
     * The global type for the payload.
     */
    const TRANSACTION_PAYLOAD_TYPE = 0;

    /**
     * The global type for the payload.
     */
    const TREASURY_TRANSACTION_PAYLOAD_TYPE = 4;

    /**
     * The minimum length of an indexation payload binary representation.
     */
    const MIN_INDEXATION_PAYLOAD_LENGTH = TYPE_LENGTH + // min payload
        STRING_LENGTH + // index length
        1 + // index min 1 byte
        STRING_LENGTH; // data length
    /**
     * The minimum length of a indexation key.
     */
    const MIN_INDEXATION_KEY_LENGTH = 1;
    /**
     * The maximum length of a indexation key.
     */
    const MAX_INDEXATION_KEY_LENGTH = 64;
    /**
     * Deserialize the indexation payload from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeIndexationPayload(readStream) {
        if (!readStream.hasRemaining(MIN_INDEXATION_PAYLOAD_LENGTH)) {
            throw new Error(`Indexation Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_INDEXATION_PAYLOAD_LENGTH}`);
        }
        const type = readStream.readUInt32("payloadIndexation.type");
        if (type !== INDEXATION_PAYLOAD_TYPE) {
            throw new Error(`Type mismatch in payloadIndexation ${type}`);
        }
        const indexLength = readStream.readUInt16("payloadIndexation.indexLength");
        const index = readStream.readFixedHex("payloadIndexation.index", indexLength);
        const dataLength = readStream.readUInt32("payloadIndexation.dataLength");
        const data = readStream.readFixedHex("payloadIndexation.data", dataLength);
        return {
            type: INDEXATION_PAYLOAD_TYPE,
            index,
            data
        };
    }
    /**
     * Serialize the indexation payload to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeIndexationPayload(writeStream, object) {
        if (object.index.length < MIN_INDEXATION_KEY_LENGTH) {
            throw new Error(`The indexation key length is ${object.index.length}, which is below the minimum size of ${MIN_INDEXATION_KEY_LENGTH}`);
        }
        if (object.index.length / 2 > MAX_INDEXATION_KEY_LENGTH) {
            throw new Error(`The indexation key length is ${object.index.length / 2}, which exceeds the maximum size of ${MAX_INDEXATION_KEY_LENGTH}`);
        }
        writeStream.writeUInt32("payloadIndexation.type", object.type);
        writeStream.writeUInt16("payloadIndexation.indexLength", object.index.length / 2);
        writeStream.writeFixedHex("payloadIndexation.index", object.index.length / 2, object.index);
        if (object.data) {
            writeStream.writeUInt32("payloadIndexation.dataLength", object.data.length / 2);
            writeStream.writeFixedHex("payloadIndexation.data", object.data.length / 2, object.data);
        }
        else {
            writeStream.writeUInt32("payloadIndexation.dataLength", 0);
        }
    }

    // Copyright 2020 IOTA Stiftung
    /**
     * The minimum length of a milestone payload binary representation.
     */
    const MIN_MILESTONE_PAYLOAD_LENGTH = TYPE_LENGTH + // min payload
        UINT32_SIZE + // index
        UINT64_SIZE + // timestamp
        MESSAGE_ID_LENGTH + // parent 1
        MESSAGE_ID_LENGTH + // parent 2
        MERKLE_PROOF_LENGTH + // merkle proof
        2 * UINT32_SIZE + // Next pow score and pow score milestone index
        UINT8_SIZE + // publicKeysCount
        crypto_js.Ed25519.PUBLIC_KEY_SIZE + // 1 public key
        UINT8_SIZE + // signatureCount
        crypto_js.Ed25519.SIGNATURE_SIZE; // 1 signature
    /**
     * Deserialize the milestone payload from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeMilestonePayload(readStream) {
        if (!readStream.hasRemaining(MIN_MILESTONE_PAYLOAD_LENGTH)) {
            throw new Error(`Milestone Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_MILESTONE_PAYLOAD_LENGTH}`);
        }
        const type = readStream.readUInt32("payloadMilestone.type");
        if (type !== MILESTONE_PAYLOAD_TYPE) {
            throw new Error(`Type mismatch in payloadMilestone ${type}`);
        }
        const index = readStream.readUInt32("payloadMilestone.index");
        const timestamp = readStream.readUInt64("payloadMilestone.timestamp");
        const numParents = readStream.readUInt8("payloadMilestone.numParents");
        const parentMessageIds = [];
        for (let i = 0; i < numParents; i++) {
            const parentMessageId = readStream.readFixedHex(`payloadMilestone.parentMessageId${i + 1}`, MESSAGE_ID_LENGTH);
            parentMessageIds.push(parentMessageId);
        }
        const inclusionMerkleProof = readStream.readFixedHex("payloadMilestone.inclusionMerkleProof", MERKLE_PROOF_LENGTH);
        const nextPoWScore = readStream.readUInt32("payloadMilestone.nextPoWScore");
        const nextPoWScoreMilestoneIndex = readStream.readUInt32("payloadMilestone.nextPoWScoreMilestoneIndex");
        const publicKeysCount = readStream.readUInt8("payloadMilestone.publicKeysCount");
        const publicKeys = [];
        for (let i = 0; i < publicKeysCount; i++) {
            publicKeys.push(readStream.readFixedHex("payloadMilestone.publicKey", crypto_js.Ed25519.PUBLIC_KEY_SIZE));
        }
        const receipt = deserializePayload(readStream);
        if (receipt && receipt.type !== RECEIPT_PAYLOAD_TYPE) {
            throw new Error("Milestones only support embedded receipt payload type");
        }
        const signaturesCount = readStream.readUInt8("payloadMilestone.signaturesCount");
        const signatures = [];
        for (let i = 0; i < signaturesCount; i++) {
            signatures.push(readStream.readFixedHex("payloadMilestone.signature", crypto_js.Ed25519.SIGNATURE_SIZE));
        }
        return {
            type: MILESTONE_PAYLOAD_TYPE,
            index,
            timestamp: Number(timestamp),
            parentMessageIds,
            inclusionMerkleProof,
            nextPoWScore,
            nextPoWScoreMilestoneIndex,
            publicKeys,
            receipt,
            signatures
        };
    }
    /**
     * Serialize the milestone payload to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeMilestonePayload(writeStream, object) {
        writeStream.writeUInt32("payloadMilestone.type", object.type);
        writeStream.writeUInt32("payloadMilestone.index", object.index);
        writeStream.writeUInt64("payloadMilestone.timestamp", bigInt__default["default"](object.timestamp));
        if (object.parentMessageIds.length < MIN_NUMBER_PARENTS) {
            throw new Error(`A minimum of ${MIN_NUMBER_PARENTS} parents is allowed, you provided ${object.parentMessageIds.length}`);
        }
        if (object.parentMessageIds.length > MAX_NUMBER_PARENTS) {
            throw new Error(`A maximum of ${MAX_NUMBER_PARENTS} parents is allowed, you provided ${object.parentMessageIds.length}`);
        }
        if (new Set(object.parentMessageIds).size !== object.parentMessageIds.length) {
            throw new Error("The milestone parents must be unique");
        }
        const sorted = object.parentMessageIds.slice().sort();
        writeStream.writeUInt8("payloadMilestone.numParents", object.parentMessageIds.length);
        for (let i = 0; i < object.parentMessageIds.length; i++) {
            if (sorted[i] !== object.parentMessageIds[i]) {
                throw new Error("The milestone parents must be lexographically sorted");
            }
            writeStream.writeFixedHex(`payloadMilestone.parentMessageId${i + 1}`, MESSAGE_ID_LENGTH, object.parentMessageIds[i]);
        }
        writeStream.writeFixedHex("payloadMilestone.inclusionMerkleProof", MERKLE_PROOF_LENGTH, object.inclusionMerkleProof);
        writeStream.writeUInt32("payloadMilestone.nextPoWScore", object.nextPoWScore);
        writeStream.writeUInt32("payloadMilestone.nextPoWScoreMilestoneIndex", object.nextPoWScoreMilestoneIndex);
        writeStream.writeUInt8("payloadMilestone.publicKeysCount", object.publicKeys.length);
        for (let i = 0; i < object.publicKeys.length; i++) {
            writeStream.writeFixedHex("payloadMilestone.publicKey", crypto_js.Ed25519.PUBLIC_KEY_SIZE, object.publicKeys[i]);
        }
        serializePayload(writeStream, object.receipt);
        writeStream.writeUInt8("payloadMilestone.signaturesCount", object.signatures.length);
        for (let i = 0; i < object.signatures.length; i++) {
            writeStream.writeFixedHex("payloadMilestone.signature", crypto_js.Ed25519.SIGNATURE_SIZE, object.signatures[i]);
        }
    }

    /**
     * The minimum length of a receipt payload binary representation.
     */
    const MIN_RECEIPT_PAYLOAD_LENGTH = TYPE_LENGTH +
        UINT32_SIZE + // migratedAt
        UINT16_SIZE + // numFunds
        MIN_MIGRATED_FUNDS_LENGTH; // 1 Fund
    /**
     * Deserialize the receipt payload from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeReceiptPayload(readStream) {
        if (!readStream.hasRemaining(MIN_RECEIPT_PAYLOAD_LENGTH)) {
            throw new Error(`Receipt Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_RECEIPT_PAYLOAD_LENGTH}`);
        }
        const type = readStream.readUInt32("payloadReceipt.type");
        if (type !== RECEIPT_PAYLOAD_TYPE) {
            throw new Error(`Type mismatch in payloadReceipt ${type}`);
        }
        const migratedAt = readStream.readUInt32("payloadReceipt.migratedAt");
        const final = readStream.readBoolean("payloadReceipt.final");
        const funds = deserializeFunds(readStream);
        const treasuryTransactionPayload = deserializePayload(readStream);
        if (!treasuryTransactionPayload || treasuryTransactionPayload.type !== TREASURY_TRANSACTION_PAYLOAD_TYPE) {
            throw new Error(`payloadReceipts can only contain treasury payloads ${type}`);
        }
        return {
            type: RECEIPT_PAYLOAD_TYPE,
            migratedAt,
            final,
            funds,
            transaction: treasuryTransactionPayload
        };
    }
    /**
     * Serialize the receipt payload to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeReceiptPayload(writeStream, object) {
        writeStream.writeUInt32("payloadReceipt.type", object.type);
        writeStream.writeUInt32("payloadReceipt.migratedAt", object.migratedAt);
        writeStream.writeBoolean("payloadReceipt.final", object.final);
        serializeFunds(writeStream, object.funds);
        serializePayload(writeStream, object.transaction);
    }

    /**
     * The global type for the transaction essence.
     */
    const TRANSACTION_ESSENCE_TYPE = 0;

    /**
     * The global type for the sig locked dust allowance output.
     * @deprecated
     */
    const SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE = 1;

    /**
     * The global type for the simple output.
     */
    const SIMPLE_OUTPUT_TYPE = 0;

    /**
     * The global type for the alias output.
     */
    const ALIAS_OUTPUT_TYPE = 4;

    /**
     * The global type for the extended output.
     */
    const EXTENDED_OUTPUT_TYPE = 3;

    /**
     * The global type for the foundry output.
     */
    const FOUNDRY_OUTPUT_TYPE = 5;

    /**
     * The global type for the NFT output.
     */
    const NFT_OUTPUT_TYPE = 6;

    /**
     * The global type for the treasury output.
     */
    const TREASURY_OUTPUT_TYPE = 2;

    /**
     * The minimum length of a native tokens list.
     */
    const MIN_NATIVE_TOKENS_LENGTH = UINT16_SIZE;
    /**
     * The length of a native token tag.
     */
    const NATIVE_TOKEN_TAG_LENGTH = 12;
    /**
     * The length of a foundry id.
     */
    const FOUNDRY_ID_LENGTH = MIN_ALIAS_ADDRESS_LENGTH + UINT32_SIZE + UINT8_SIZE;
    /**
     * The length of a native token id.
     */
    const NATIVE_TOKEN_ID_LENGTH = FOUNDRY_ID_LENGTH + NATIVE_TOKEN_TAG_LENGTH;
    /**
     * Deserialize the natovetokens from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeNativeTokens(readStream) {
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
    function serializeNativeTokens(writeStream, object) {
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
    function deserializeNativeToken(readStream) {
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
    function serializeNativeToken(writeStream, object) {
        writeStream.writeFixedHex("nativeToken.id", NATIVE_TOKEN_ID_LENGTH, object.id);
        writeStream.writeUInt256("nativeToken.amount", bigInt__default["default"](object.amount));
    }

    /**
     * The length of an alias id.
     */
    const ALIAS_ID_LENGTH = 20;
    /**
     * The minimum length of a alias output binary representation.
     */
    const MIN_ALIAS_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
        UINT64_SIZE + // Amount
        MIN_NATIVE_TOKENS_LENGTH + // Native Tokens
        ALIAS_ID_LENGTH + // Alias Id
        MIN_ADDRESS_LENGTH + // State Controller
        MIN_ADDRESS_LENGTH + // Governance Controller
        UINT32_SIZE + // State Index
        UINT32_SIZE + // State Metatata Length
        UINT32_SIZE + // Foundry counter
        MIN_FEATURE_BLOCKS_LENGTH; // Feature Blocks
    /**
     * Deserialize the alias output from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeAliasOutput(readStream) {
        if (!readStream.hasRemaining(MIN_ALIAS_OUTPUT_LENGTH)) {
            throw new Error(`Alias Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ALIAS_OUTPUT_LENGTH}`);
        }
        const type = readStream.readUInt8("aliasOutput.type");
        if (type !== ALIAS_OUTPUT_TYPE) {
            throw new Error(`Type mismatch in aliasOutput ${type}`);
        }
        const amount = readStream.readUInt64("aliasOutput.amount");
        const nativeTokens = deserializeNativeTokens(readStream);
        const aliasId = readStream.readFixedHex("aliasOutput.aliasId", ALIAS_ID_LENGTH);
        const stateController = deserializeAddress(readStream);
        const governanceController = deserializeAddress(readStream);
        const stateIndex = readStream.readUInt32("aliasOutput.stateIndex");
        const stateMetadataLength = readStream.readUInt32("aliasOutput.stateMetadataLength");
        const stateMetadata = readStream.readFixedHex("aliasOutput.stateMetadata", stateMetadataLength);
        const foundryCounter = readStream.readUInt32("aliasOutput.foundryCounter");
        const featureBlocks = deserializeFeatureBlocks(readStream);
        return {
            type: ALIAS_OUTPUT_TYPE,
            amount: Number(amount),
            nativeTokens,
            aliasId,
            stateController,
            governanceController,
            stateIndex,
            stateMetadata,
            foundryCounter,
            blocks: featureBlocks
        };
    }
    /**
     * Serialize the alias output to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeAliasOutput(writeStream, object) {
        writeStream.writeUInt8("aliasOutput.type", object.type);
        writeStream.writeUInt64("aliasOutput.amount", bigInt__default["default"](object.amount));
        serializeNativeTokens(writeStream, object.nativeTokens);
        writeStream.writeFixedHex("aliasOutput.aliasId", ALIAS_ID_LENGTH, object.aliasId);
        serializeAddress(writeStream, object.stateController);
        serializeAddress(writeStream, object.governanceController);
        writeStream.writeUInt32("aliasOutput.stateIndex", object.stateIndex);
        writeStream.writeUInt32("aliasOutput.stateMetadataLength", object.stateMetadata.length / 2);
        writeStream.writeFixedHex("aliasOutput.stateMetadata", object.stateMetadata.length / 2, object.stateMetadata);
        writeStream.writeUInt32("aliasOutput.foundryCounter", object.foundryCounter);
        serializeFeatureBlocks(writeStream, object.blocks);
    }

    /**
     * The minimum length of a extended output binary representation.
     */
    const MIN_EXTENDED_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
        MIN_ADDRESS_LENGTH + // Address
        UINT64_SIZE + // Amount
        MIN_NATIVE_TOKENS_LENGTH + // Native Tokens
        MIN_FEATURE_BLOCKS_LENGTH; // Feature Blocks
    /**
     * Deserialize the extended output from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeExtendedOutput(readStream) {
        if (!readStream.hasRemaining(MIN_EXTENDED_OUTPUT_LENGTH)) {
            throw new Error(`Extended Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_EXTENDED_OUTPUT_LENGTH}`);
        }
        const type = readStream.readUInt8("extendedOutput.type");
        if (type !== EXTENDED_OUTPUT_TYPE) {
            throw new Error(`Type mismatch in extendedOutput ${type}`);
        }
        const address = deserializeAddress(readStream);
        const amount = readStream.readUInt64("extendedOutput.amount");
        const nativeTokens = deserializeNativeTokens(readStream);
        const featureBlocks = deserializeFeatureBlocks(readStream);
        return {
            type: EXTENDED_OUTPUT_TYPE,
            amount: Number(amount),
            address,
            nativeTokens,
            blocks: featureBlocks
        };
    }
    /**
     * Serialize the extended output to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeExtendedOutput(writeStream, object) {
        writeStream.writeUInt8("extendedOutput.type", object.type);
        serializeAddress(writeStream, object.address);
        writeStream.writeUInt64("extendedOutput.amount", bigInt__default["default"](object.amount));
        serializeNativeTokens(writeStream, object.nativeTokens);
        serializeFeatureBlocks(writeStream, object.blocks);
    }

    /**
     * The global type for the simple token scheme.
     */
    const SIMPLE_TOKEN_SCHEME_TYPE = 0;

    /**
     * The minimum length of an simple token scheme binary representation.
     */
    const MIN_SIMPLE_TOKEN_SCHEME_LENGTH = SMALL_TYPE_LENGTH;
    /**
     * Deserialize the simple token scheme from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeSimpleTokenScheme(readStream) {
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
    function serializeSimpleTokenScheme(writeStream, object) {
        writeStream.writeUInt8("simpleTokenScheme.type", object.type);
    }

    /**
     * The minimum length of a simple token scheme binary representation.
     */
    const MIN_TOKEN_SCHEME_LENGTH = MIN_SIMPLE_TOKEN_SCHEME_LENGTH;
    /**
     * Deserialize the token scheme from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeTokenScheme(readStream) {
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
    function serializeTokenScheme(writeStream, object) {
        if (object.type === SIMPLE_TOKEN_SCHEME_TYPE) {
            serializeSimpleTokenScheme(writeStream, object);
        }
        else {
            throw new Error(`Unrecognized simple token scheme type ${object.type}`);
        }
    }

    /**
     * The minimum length of a foundry output binary representation.
     */
    const MIN_FOUNDRY_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
        MIN_ADDRESS_LENGTH + // Address
        UINT64_SIZE + // Amount
        MIN_NATIVE_TOKENS_LENGTH + // Native tokens
        UINT32_SIZE + // Serial Number
        NATIVE_TOKEN_TAG_LENGTH + // Token Tag
        UINT256_SIZE + // Circulating Supply
        UINT256_SIZE + // Maximum Supply
        MIN_TOKEN_SCHEME_LENGTH + // Token scheme length
        MIN_FEATURE_BLOCKS_LENGTH;
    /**
     * Deserialize the foundry output from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeFoundryOutput(readStream) {
        if (!readStream.hasRemaining(MIN_FOUNDRY_OUTPUT_LENGTH)) {
            throw new Error(`Foundry Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_FOUNDRY_OUTPUT_LENGTH}`);
        }
        const type = readStream.readUInt8("foundryOutput.type");
        if (type !== FOUNDRY_OUTPUT_TYPE) {
            throw new Error(`Type mismatch in foundryOutput ${type}`);
        }
        const address = deserializeAddress(readStream);
        const amount = readStream.readUInt64("foundryOutput.amount");
        const nativeTokens = deserializeNativeTokens(readStream);
        const serialNumber = readStream.readUInt32("foundryOutput.serialNumber");
        const tokenTag = readStream.readFixedHex("foundryOutput.tokenTag", NATIVE_TOKEN_TAG_LENGTH);
        const circulatingSupply = readStream.readUInt256("foundryOutput.circulatingSupply");
        const maximumSupply = readStream.readUInt256("foundryOutput.maximumSupply");
        const tokenScheme = deserializeTokenScheme(readStream);
        const featureBlocks = deserializeFeatureBlocks(readStream);
        return {
            type: FOUNDRY_OUTPUT_TYPE,
            amount: Number(amount),
            nativeTokens,
            address,
            serialNumber,
            tokenTag,
            circulatingSupply: circulatingSupply.toString(),
            maximumSupply: maximumSupply.toString(),
            tokenScheme,
            blocks: featureBlocks
        };
    }
    /**
     * Serialize the foundry output to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeFoundryOutput(writeStream, object) {
        writeStream.writeUInt8("foundryOutput.type", object.type);
        serializeAddress(writeStream, object.address);
        writeStream.writeUInt64("foundryOutput.amount", bigInt__default["default"](object.amount));
        serializeNativeTokens(writeStream, object.nativeTokens);
        writeStream.writeUInt32("foundryOutput.serialNumber", object.serialNumber);
        writeStream.writeFixedHex("foundryOutput.tokenTag", NATIVE_TOKEN_TAG_LENGTH, object.tokenTag);
        writeStream.writeUInt256("foundryOutput.circulatingSupply", bigInt__default["default"](object.circulatingSupply));
        writeStream.writeUInt256("foundryOutput.maximumSupply", bigInt__default["default"](object.maximumSupply));
        serializeTokenScheme(writeStream, object.tokenScheme);
        serializeFeatureBlocks(writeStream, object.blocks);
    }

    /**
     * The length of an NFT Id.
     */
    const NFT_ID_LENGTH = 20;
    /**
     * The minimum length of a nft output binary representation.
     */
    const MIN_NFT_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
        MIN_ADDRESS_LENGTH + // Address
        UINT64_SIZE + // Amount
        MIN_NATIVE_TOKENS_LENGTH + // Native tokens
        NFT_ID_LENGTH + // Nft Id
        UINT32_SIZE + // Immutable data length
        MIN_FEATURE_BLOCKS_LENGTH; // Feature Blocks
    /**
     * Deserialize the nft output from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeNftOutput(readStream) {
        if (!readStream.hasRemaining(MIN_NFT_OUTPUT_LENGTH)) {
            throw new Error(`NFT Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_NFT_OUTPUT_LENGTH}`);
        }
        const type = readStream.readUInt8("nftOutput.type");
        if (type !== NFT_OUTPUT_TYPE) {
            throw new Error(`Type mismatch in nftOutput ${type}`);
        }
        const address = deserializeAddress(readStream);
        const amount = readStream.readUInt64("nftOutput.amount");
        const nativeTokens = deserializeNativeTokens(readStream);
        const nftId = readStream.readFixedHex("nftOutput.nftId", NFT_ID_LENGTH);
        const immutableMetadataLength = readStream.readUInt32("nftOutput.immutableMetadataLength");
        const immutableData = readStream.readFixedHex("nftOutput.immutableMetadata", immutableMetadataLength);
        const featureBlocks = deserializeFeatureBlocks(readStream);
        return {
            type: NFT_OUTPUT_TYPE,
            amount: Number(amount),
            nativeTokens,
            address,
            nftId,
            immutableData,
            blocks: featureBlocks
        };
    }
    /**
     * Serialize the nft output to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeNftOutput(writeStream, object) {
        writeStream.writeUInt8("nftOutput.type", object.type);
        serializeAddress(writeStream, object.address);
        writeStream.writeUInt64("nftOutput.amount", bigInt__default["default"](object.amount));
        serializeNativeTokens(writeStream, object.nativeTokens);
        writeStream.writeFixedHex("nftOutput.nftId", NFT_ID_LENGTH, object.nftId);
        writeStream.writeUInt32("nftOutput.immutableMetadataLength", object.immutableData.length / 2);
        writeStream.writeFixedHex("nftOutput.immutableMetadata", object.immutableData.length / 2, object.immutableData);
        serializeFeatureBlocks(writeStream, object.blocks);
    }

    /**
     * The minimum length of a sig locked dust allowance output binary representation.
     */
    const MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
        MIN_ADDRESS_LENGTH + // Address
        UINT64_SIZE; // Amount
    /**
     * Deserialize the signature locked dust allowance output from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeSigLockedDustAllowanceOutput(readStream) {
        if (!readStream.hasRemaining(MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH)) {
            throw new Error(`Signature Locked Dust Allowance Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH}`);
        }
        const type = readStream.readUInt8("sigLockedDustAllowanceOutput.type");
        if (type !== SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
            throw new Error(`Type mismatch in sigLockedDustAllowanceOutput ${type}`);
        }
        const address = deserializeAddress(readStream);
        const amount = readStream.readUInt64("sigLockedDustAllowanceOutput.amount");
        return {
            type: SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE,
            address,
            amount: Number(amount)
        };
    }
    /**
     * Serialize the signature locked dust allowance output to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeSigLockedDustAllowanceOutput(writeStream, object) {
        writeStream.writeUInt8("sigLockedDustAllowanceOutput.type", object.type);
        serializeAddress(writeStream, object.address);
        writeStream.writeUInt64("sigLockedDustAllowanceOutput.amount", bigInt__default["default"](object.amount));
    }

    /**
     * The minimum length of a simple output binary representation.
     */
    const MIN_SIMPLE_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
        MIN_ADDRESS_LENGTH + // Address
        UINT64_SIZE; // Amount
    /**
     * Deserialize the simple output from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeSimpleOutput(readStream) {
        if (!readStream.hasRemaining(MIN_SIMPLE_OUTPUT_LENGTH)) {
            throw new Error(`Simple Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIMPLE_OUTPUT_LENGTH}`);
        }
        const type = readStream.readUInt8("simpleOutput.type");
        if (type !== SIMPLE_OUTPUT_TYPE) {
            throw new Error(`Type mismatch in simpleOutput ${type}`);
        }
        const address = deserializeAddress(readStream);
        const amount = readStream.readUInt64("simpleOutput.amount");
        return {
            type: SIMPLE_OUTPUT_TYPE,
            address,
            amount: Number(amount)
        };
    }
    /**
     * Serialize the simple output to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeSimpleOutput(writeStream, object) {
        writeStream.writeUInt8("simpleOutput.type", object.type);
        serializeAddress(writeStream, object.address);
        writeStream.writeUInt64("simpleOutput.amount", bigInt__default["default"](object.amount));
    }

    /**
     * The minimum length of a treasury output binary representation.
     */
    const MIN_TREASURY_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
        UINT64_SIZE; // Amount
    /**
     * Deserialize the treasury output from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeTreasuryOutput(readStream) {
        if (!readStream.hasRemaining(MIN_TREASURY_OUTPUT_LENGTH)) {
            throw new Error(`Treasury Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TREASURY_OUTPUT_LENGTH}`);
        }
        const type = readStream.readUInt8("treasuryOutput.type");
        if (type !== TREASURY_OUTPUT_TYPE) {
            throw new Error(`Type mismatch in treasuryOutput ${type}`);
        }
        const amount = readStream.readUInt64("treasuryOutput.amount");
        return {
            type: TREASURY_OUTPUT_TYPE,
            amount: Number(amount)
        };
    }
    /**
     * Serialize the treasury output to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeTreasuryOutput(writeStream, object) {
        writeStream.writeUInt8("treasuryOutput.type", object.type);
        writeStream.writeUInt64("treasuryOutput.amount", bigInt__default["default"](object.amount));
    }

    /**
     * The minimum length of an output binary representation.
     */
    const MIN_OUTPUT_LENGTH = Math.min(MIN_SIMPLE_OUTPUT_LENGTH, MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH, MIN_TREASURY_OUTPUT_LENGTH, MIN_FOUNDRY_OUTPUT_LENGTH, MIN_EXTENDED_OUTPUT_LENGTH, MIN_NFT_OUTPUT_LENGTH, MIN_ALIAS_OUTPUT_LENGTH);
    /**
     * The minimum number of outputs.
     */
    const MIN_OUTPUT_COUNT = 1;
    /**
     * The maximum number of outputs.
     */
    const MAX_OUTPUT_COUNT = 127;
    /**
     * Deserialize the outputs from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeOutputs(readStream) {
        const numOutputs = readStream.readUInt16("outputs.numOutputs");
        const outputs = [];
        for (let i = 0; i < numOutputs; i++) {
            outputs.push(deserializeOutput(readStream));
        }
        return outputs;
    }
    /**
     * Serialize the outputs to binary.
     * @param writeStream The stream to write the data to.
     * @param objects The objects to serialize.
     */
    function serializeOutputs(writeStream, objects) {
        if (objects.length < MIN_OUTPUT_COUNT) {
            throw new Error(`The minimum number of outputs is ${MIN_OUTPUT_COUNT}, you have provided ${objects.length}`);
        }
        if (objects.length > MAX_OUTPUT_COUNT) {
            throw new Error(`The maximum number of outputs is ${MAX_OUTPUT_COUNT}, you have provided ${objects.length}`);
        }
        writeStream.writeUInt16("outputs.numOutputs", objects.length);
        for (let i = 0; i < objects.length; i++) {
            serializeOutput(writeStream, objects[i]);
        }
    }
    /**
     * Deserialize the output from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeOutput(readStream) {
        if (!readStream.hasRemaining(MIN_OUTPUT_LENGTH)) {
            throw new Error(`Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_OUTPUT_LENGTH}`);
        }
        const type = readStream.readUInt8("output.type", false);
        let output;
        if (type === SIMPLE_OUTPUT_TYPE) {
            output = deserializeSimpleOutput(readStream);
        }
        else if (type === SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
            output = deserializeSigLockedDustAllowanceOutput(readStream);
        }
        else if (type === TREASURY_OUTPUT_TYPE) {
            output = deserializeTreasuryOutput(readStream);
        }
        else if (type === EXTENDED_OUTPUT_TYPE) {
            output = deserializeExtendedOutput(readStream);
        }
        else if (type === FOUNDRY_OUTPUT_TYPE) {
            output = deserializeFoundryOutput(readStream);
        }
        else if (type === NFT_OUTPUT_TYPE) {
            output = deserializeNftOutput(readStream);
        }
        else if (type === ALIAS_OUTPUT_TYPE) {
            output = deserializeAliasOutput(readStream);
        }
        else {
            throw new Error(`Unrecognized output type ${type}`);
        }
        return output;
    }
    /**
     * Serialize the output to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeOutput(writeStream, object) {
        if (object.type === SIMPLE_OUTPUT_TYPE) {
            serializeSimpleOutput(writeStream, object);
        }
        else if (object.type === SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
            serializeSigLockedDustAllowanceOutput(writeStream, object);
        }
        else if (object.type === TREASURY_OUTPUT_TYPE) {
            serializeTreasuryOutput(writeStream, object);
        }
        else if (object.type === EXTENDED_OUTPUT_TYPE) {
            serializeExtendedOutput(writeStream, object);
        }
        else if (object.type === FOUNDRY_OUTPUT_TYPE) {
            serializeFoundryOutput(writeStream, object);
        }
        else if (object.type === NFT_OUTPUT_TYPE) {
            serializeNftOutput(writeStream, object);
        }
        else if (object.type === ALIAS_OUTPUT_TYPE) {
            serializeAliasOutput(writeStream, object);
        }
        else {
            throw new Error(`Unrecognized output type ${object.type}`);
        }
    }

    /**
     * The minimum length of a transaction essence binary representation.
     */
    const MIN_TRANSACTION_ESSENCE_LENGTH = SMALL_TYPE_LENGTH + 2 * ARRAY_LENGTH + UINT32_SIZE;
    /**
     * Deserialize the transaction essence from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeTransactionEssence(readStream) {
        if (!readStream.hasRemaining(MIN_TRANSACTION_ESSENCE_LENGTH)) {
            throw new Error(`Transaction essence data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TRANSACTION_ESSENCE_LENGTH}`);
        }
        const type = readStream.readUInt8("transactionEssence.type");
        if (type !== TRANSACTION_ESSENCE_TYPE) {
            throw new Error(`Type mismatch in transactionEssence ${type}`);
        }
        const inputs = deserializeInputs(readStream);
        const outputs = deserializeOutputs(readStream);
        const payload = deserializePayload(readStream);
        if (payload && payload.type !== INDEXATION_PAYLOAD_TYPE) {
            throw new Error("Transaction essence can only contain embedded Indexation Payload");
        }
        for (const input of inputs) {
            if (input.type !== UTXO_INPUT_TYPE) {
                throw new Error("Transaction essence can only contain UTXO Inputs");
            }
        }
        for (const output of outputs) {
            if (output.type !== SIMPLE_OUTPUT_TYPE) {
                throw new Error("Transaction essence can only contain simple outputs");
            }
        }
        return {
            type: TRANSACTION_ESSENCE_TYPE,
            inputs: inputs,
            outputs,
            payload
        };
    }
    /**
     * Serialize the transaction essence to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeTransactionEssence(writeStream, object) {
        writeStream.writeUInt8("transactionEssence.type", object.type);
        for (const input of object.inputs) {
            if (input.type !== UTXO_INPUT_TYPE) {
                throw new Error("Transaction essence can only contain UTXO Inputs");
            }
        }
        serializeInputs(writeStream, object.inputs);
        for (const output of object.outputs) {
            if (output.type !== SIMPLE_OUTPUT_TYPE && output.type !== SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
                throw new Error("Transaction essence can only contain sig locked single input or sig locked dust allowance outputs");
            }
        }
        serializeOutputs(writeStream, object.outputs);
        serializePayload(writeStream, object.payload);
    }

    /**
     * The global type for the reference unlock block.
     */
    const REFERENCE_UNLOCK_BLOCK_TYPE = 1;

    /**
     * The global type for the unlock block.
     */
    const SIGNATURE_UNLOCK_BLOCK_TYPE = 0;

    /**
     * The minimum length of a reference unlock block binary representation.
     */
    const MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT16_SIZE;
    /**
     * Deserialize the reference unlock block from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeReferenceUnlockBlock(readStream) {
        if (!readStream.hasRemaining(MIN_REFERENCE_UNLOCK_BLOCK_LENGTH)) {
            throw new Error(`Reference Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_REFERENCE_UNLOCK_BLOCK_LENGTH}`);
        }
        const type = readStream.readUInt8("referenceUnlockBlock.type");
        if (type !== REFERENCE_UNLOCK_BLOCK_TYPE) {
            throw new Error(`Type mismatch in referenceUnlockBlock ${type}`);
        }
        const reference = readStream.readUInt16("referenceUnlockBlock.reference");
        return {
            type: REFERENCE_UNLOCK_BLOCK_TYPE,
            reference
        };
    }
    /**
     * Serialize the reference unlock block to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeReferenceUnlockBlock(writeStream, object) {
        writeStream.writeUInt8("referenceUnlockBlock.type", object.type);
        writeStream.writeUInt16("referenceUnlockBlock.reference", object.reference);
    }

    /**
     * The global type for the signature type.
     */
    const ED25519_SIGNATURE_TYPE = 0;

    // Copyright 2020 IOTA Stiftung
    /**
     * The minimum length of an ed25519 signature binary representation.
     */
    const MIN_ED25519_SIGNATURE_LENGTH = SMALL_TYPE_LENGTH + crypto_js.Ed25519.SIGNATURE_SIZE + crypto_js.Ed25519.PUBLIC_KEY_SIZE;
    /**
     * Deserialize the Ed25519 signature from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeEd25519Signature(readStream) {
        if (!readStream.hasRemaining(MIN_ED25519_SIGNATURE_LENGTH)) {
            throw new Error(`Ed25519 signature data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ED25519_SIGNATURE_LENGTH}`);
        }
        const type = readStream.readUInt8("ed25519Signature.type");
        if (type !== ED25519_SIGNATURE_TYPE) {
            throw new Error(`Type mismatch in ed25519Signature ${type}`);
        }
        const publicKey = readStream.readFixedHex("ed25519Signature.publicKey", crypto_js.Ed25519.PUBLIC_KEY_SIZE);
        const signature = readStream.readFixedHex("ed25519Signature.signature", crypto_js.Ed25519.SIGNATURE_SIZE);
        return {
            type: ED25519_SIGNATURE_TYPE,
            publicKey,
            signature
        };
    }
    /**
     * Serialize the Ed25519 signature to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeEd25519Signature(writeStream, object) {
        writeStream.writeUInt8("ed25519Signature.type", object.type);
        writeStream.writeFixedHex("ed25519Signature.publicKey", crypto_js.Ed25519.PUBLIC_KEY_SIZE, object.publicKey);
        writeStream.writeFixedHex("ed25519Signature.signature", crypto_js.Ed25519.SIGNATURE_SIZE, object.signature);
    }

    /**
     * The minimum length of a signature binary representation.
     */
    const MIN_SIGNATURE_LENGTH = MIN_ED25519_SIGNATURE_LENGTH;
    /**
     * Deserialize the signature from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeSignature(readStream) {
        if (!readStream.hasRemaining(MIN_SIGNATURE_LENGTH)) {
            throw new Error(`Signature data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIGNATURE_LENGTH}`);
        }
        const type = readStream.readUInt8("signature.type", false);
        let signature;
        if (type === ED25519_SIGNATURE_TYPE) {
            signature = deserializeEd25519Signature(readStream);
        }
        else {
            throw new Error(`Unrecognized signature type ${type}`);
        }
        return signature;
    }
    /**
     * Serialize the signature to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeSignature(writeStream, object) {
        if (object.type === ED25519_SIGNATURE_TYPE) {
            serializeEd25519Signature(writeStream, object);
        }
        else {
            throw new Error(`Unrecognized signature type ${object.type}`);
        }
    }

    /**
     * The minimum length of a signature unlock block binary representation.
     */
    const MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = SMALL_TYPE_LENGTH + MIN_SIGNATURE_LENGTH;
    /**
     * Deserialize the signature unlock block from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeSignatureUnlockBlock(readStream) {
        if (!readStream.hasRemaining(MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH)) {
            throw new Error(`Signature Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH}`);
        }
        const type = readStream.readUInt8("signatureUnlockBlock.type");
        if (type !== SIGNATURE_UNLOCK_BLOCK_TYPE) {
            throw new Error(`Type mismatch in signatureUnlockBlock ${type}`);
        }
        const signature = deserializeSignature(readStream);
        return {
            type: SIGNATURE_UNLOCK_BLOCK_TYPE,
            signature
        };
    }
    /**
     * Serialize the signature unlock block to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeSignatureUnlockBlock(writeStream, object) {
        writeStream.writeUInt8("signatureUnlockBlock.type", object.type);
        serializeSignature(writeStream, object.signature);
    }

    /**
     * The minimum length of an unlock block binary representation.
     */
    const MIN_UNLOCK_BLOCK_LENGTH = Math.min(MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH, MIN_REFERENCE_UNLOCK_BLOCK_LENGTH);
    /**
     * Deserialize the unlock blocks from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeUnlockBlocks(readStream) {
        const numUnlockBlocks = readStream.readUInt16("transactionEssence.numUnlockBlocks");
        const unlockBlocks = [];
        for (let i = 0; i < numUnlockBlocks; i++) {
            unlockBlocks.push(deserializeUnlockBlock(readStream));
        }
        return unlockBlocks;
    }
    /**
     * Serialize the unlock blocks to binary.
     * @param writeStream The stream to write the data to.
     * @param objects The objects to serialize.
     */
    function serializeUnlockBlocks(writeStream, objects) {
        writeStream.writeUInt16("transactionEssence.numUnlockBlocks", objects.length);
        for (let i = 0; i < objects.length; i++) {
            serializeUnlockBlock(writeStream, objects[i]);
        }
    }
    /**
     * Deserialize the unlock block from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeUnlockBlock(readStream) {
        if (!readStream.hasRemaining(MIN_UNLOCK_BLOCK_LENGTH)) {
            throw new Error(`Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_UNLOCK_BLOCK_LENGTH}`);
        }
        const type = readStream.readUInt8("unlockBlock.type", false);
        let unlockBlock;
        if (type === SIGNATURE_UNLOCK_BLOCK_TYPE) {
            unlockBlock = deserializeSignatureUnlockBlock(readStream);
        }
        else if (type === REFERENCE_UNLOCK_BLOCK_TYPE) {
            unlockBlock = deserializeReferenceUnlockBlock(readStream);
        }
        else {
            throw new Error(`Unrecognized unlock block type ${type}`);
        }
        return unlockBlock;
    }
    /**
     * Serialize the unlock block to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeUnlockBlock(writeStream, object) {
        if (object.type === SIGNATURE_UNLOCK_BLOCK_TYPE) {
            serializeSignatureUnlockBlock(writeStream, object);
        }
        else if (object.type === REFERENCE_UNLOCK_BLOCK_TYPE) {
            serializeReferenceUnlockBlock(writeStream, object);
        }
        else {
            throw new Error(`Unrecognized unlock block type ${object.type}`);
        }
    }

    /**
     * The minimum length of a transaction payload binary representation.
     */
    const MIN_TRANSACTION_PAYLOAD_LENGTH = TYPE_LENGTH + // min payload
        UINT32_SIZE; // essence type
    /**
     * Deserialize the transaction payload from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeTransactionPayload(readStream) {
        if (!readStream.hasRemaining(MIN_TRANSACTION_PAYLOAD_LENGTH)) {
            throw new Error(`Transaction Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TRANSACTION_PAYLOAD_LENGTH}`);
        }
        const type = readStream.readUInt32("payloadTransaction.type");
        if (type !== TRANSACTION_PAYLOAD_TYPE) {
            throw new Error(`Type mismatch in payloadTransaction ${type}`);
        }
        const essenceType = readStream.readUInt8("payloadTransaction.essenceType", false);
        let essence;
        let unlockBlocks;
        if (essenceType === TRANSACTION_ESSENCE_TYPE) {
            essence = deserializeTransactionEssence(readStream);
            unlockBlocks = deserializeUnlockBlocks(readStream);
        }
        else {
            throw new Error(`Unrecognized transaction essence type ${type}`);
        }
        return {
            type: TRANSACTION_PAYLOAD_TYPE,
            essence,
            unlockBlocks
        };
    }
    /**
     * Serialize the transaction payload to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeTransactionPayload(writeStream, object) {
        writeStream.writeUInt32("payloadMilestone.type", object.type);
        if (object.type === TRANSACTION_PAYLOAD_TYPE) {
            serializeTransactionEssence(writeStream, object.essence);
            serializeUnlockBlocks(writeStream, object.unlockBlocks);
        }
        else {
            throw new Error(`Unrecognized transaction type ${object.type}`);
        }
    }

    /**
     * The minimum length of a treasury transaction payload binary representation.
     */
    const MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH = TYPE_LENGTH + MIN_TREASURY_INPUT_LENGTH + MIN_TREASURY_OUTPUT_LENGTH;
    /**
     * Deserialize the treasury transaction payload from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeTreasuryTransactionPayload(readStream) {
        if (!readStream.hasRemaining(MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH)) {
            throw new Error(`Treasury Transaction Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH}`);
        }
        const type = readStream.readUInt32("payloadTreasuryTransaction.type");
        if (type !== TREASURY_TRANSACTION_PAYLOAD_TYPE) {
            throw new Error(`Type mismatch in payloadTreasuryTransaction ${type}`);
        }
        const input = deserializeTreasuryInput(readStream);
        const output = deserializeTreasuryOutput(readStream);
        return {
            type: TREASURY_TRANSACTION_PAYLOAD_TYPE,
            input,
            output
        };
    }
    /**
     * Serialize the treasury transaction payload to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeTreasuryTransactionPayload(writeStream, object) {
        writeStream.writeUInt32("payloadTreasuryTransaction.type", object.type);
        serializeTreasuryInput(writeStream, object.input);
        serializeTreasuryOutput(writeStream, object.output);
    }

    /**
     * The minimum length of a payload binary representation.
     */
    const MIN_PAYLOAD_LENGTH = Math.min(MIN_TRANSACTION_PAYLOAD_LENGTH, MIN_MILESTONE_PAYLOAD_LENGTH, MIN_INDEXATION_PAYLOAD_LENGTH, MIN_RECEIPT_PAYLOAD_LENGTH, MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH);
    /**
     * Deserialize the payload from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializePayload(readStream) {
        const payloadLength = readStream.readUInt32("payload.length");
        if (!readStream.hasRemaining(payloadLength)) {
            throw new Error(`Payload length ${payloadLength} exceeds the remaining data ${readStream.unused()}`);
        }
        let payload;
        if (payloadLength > 0) {
            const payloadType = readStream.readUInt32("payload.type", false);
            if (payloadType === TRANSACTION_PAYLOAD_TYPE) {
                payload = deserializeTransactionPayload(readStream);
            }
            else if (payloadType === MILESTONE_PAYLOAD_TYPE) {
                payload = deserializeMilestonePayload(readStream);
            }
            else if (payloadType === INDEXATION_PAYLOAD_TYPE) {
                payload = deserializeIndexationPayload(readStream);
            }
            else if (payloadType === RECEIPT_PAYLOAD_TYPE) {
                payload = deserializeReceiptPayload(readStream);
            }
            else if (payloadType === TREASURY_TRANSACTION_PAYLOAD_TYPE) {
                payload = deserializeTreasuryTransactionPayload(readStream);
            }
            else {
                throw new Error(`Unrecognized payload type ${payloadType}`);
            }
        }
        return payload;
    }
    /**
     * Serialize the payload essence to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializePayload(writeStream, object) {
        // Store the location for the payload length and write 0
        // we will rewind and fill in once the size of the payload is known
        const payloadLengthWriteIndex = writeStream.getWriteIndex();
        writeStream.writeUInt32("payload.length", 0);
        if (!object) ;
        else if (object.type === TRANSACTION_PAYLOAD_TYPE) {
            serializeTransactionPayload(writeStream, object);
        }
        else if (object.type === MILESTONE_PAYLOAD_TYPE) {
            serializeMilestonePayload(writeStream, object);
        }
        else if (object.type === INDEXATION_PAYLOAD_TYPE) {
            serializeIndexationPayload(writeStream, object);
        }
        else if (object.type === RECEIPT_PAYLOAD_TYPE) {
            serializeReceiptPayload(writeStream, object);
        }
        else if (object.type === TREASURY_TRANSACTION_PAYLOAD_TYPE) {
            serializeTreasuryTransactionPayload(writeStream, object);
        }
        else {
            throw new Error(`Unrecognized transaction type ${object.type}`);
        }
        const endOfPayloadWriteIndex = writeStream.getWriteIndex();
        writeStream.setWriteIndex(payloadLengthWriteIndex);
        writeStream.writeUInt32("payload.length", endOfPayloadWriteIndex - payloadLengthWriteIndex - UINT32_SIZE);
        writeStream.setWriteIndex(endOfPayloadWriteIndex);
    }

    /**
     * The minimum length of a message binary representation.
     */
    const MIN_MESSAGE_LENGTH = UINT64_SIZE + // Network id
        UINT8_SIZE + // Parent count
        MESSAGE_ID_LENGTH + // Single parent
        MIN_PAYLOAD_LENGTH + // Min payload length
        UINT64_SIZE; // Nonce
    /**
     * The maximum length of a message.
     */
    const MAX_MESSAGE_LENGTH = 32768;
    /**
     * The maximum number of parents.
     */
    const MAX_NUMBER_PARENTS = 8;
    /**
     * The minimum number of parents.
     */
    const MIN_NUMBER_PARENTS = 1;
    /**
     * Deserialize the message from binary.
     * @param readStream The message to deserialize.
     * @returns The deserialized message.
     */
    function deserializeMessage(readStream) {
        if (!readStream.hasRemaining(MIN_MESSAGE_LENGTH)) {
            throw new Error(`Message data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_MESSAGE_LENGTH}`);
        }
        const networkId = readStream.readUInt64("message.networkId");
        const numParents = readStream.readUInt8("message.numParents");
        const parents = [];
        for (let i = 0; i < numParents; i++) {
            const parentMessageId = readStream.readFixedHex(`message.parentMessageId${i}`, MESSAGE_ID_LENGTH);
            parents.push(parentMessageId);
        }
        const payload = deserializePayload(readStream);
        if (payload && (payload.type === RECEIPT_PAYLOAD_TYPE || payload.type === TREASURY_TRANSACTION_PAYLOAD_TYPE)) {
            throw new Error("Messages can not contain receipt or treasury transaction payloads");
        }
        const nonce = readStream.readUInt64("message.nonce");
        const unused = readStream.unused();
        if (unused !== 0) {
            throw new Error(`Message data length ${readStream.length()} has unused data ${unused}`);
        }
        return {
            networkId: networkId.toString(10),
            parentMessageIds: parents,
            payload,
            nonce: nonce.toString(10)
        };
    }
    /**
     * Serialize the message essence to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeMessage(writeStream, object) {
        var _a, _b, _c, _d;
        writeStream.writeUInt64("message.networkId", bigInt__default["default"]((_a = object.networkId) !== null && _a !== void 0 ? _a : "0"));
        const numParents = (_c = (_b = object.parentMessageIds) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
        writeStream.writeUInt8("message.numParents", numParents);
        if (object.parentMessageIds) {
            if (numParents > MAX_NUMBER_PARENTS) {
                throw new Error(`A maximum of ${MAX_NUMBER_PARENTS} parents is allowed, you provided ${numParents}`);
            }
            if (new Set(object.parentMessageIds).size !== numParents) {
                throw new Error("The message parents must be unique");
            }
            const sorted = object.parentMessageIds.slice().sort();
            for (let i = 0; i < numParents; i++) {
                if (sorted[i] !== object.parentMessageIds[i]) {
                    throw new Error("The message parents must be lexographically sorted");
                }
                writeStream.writeFixedHex(`message.parentMessageId${i + 1}`, MESSAGE_ID_LENGTH, object.parentMessageIds[i]);
            }
        }
        if (object.payload &&
            object.payload.type !== TRANSACTION_PAYLOAD_TYPE &&
            object.payload.type !== INDEXATION_PAYLOAD_TYPE &&
            object.payload.type !== MILESTONE_PAYLOAD_TYPE) {
            throw new Error("Messages can only contain transaction, indexation or milestone payloads");
        }
        serializePayload(writeStream, object.payload);
        writeStream.writeUInt64("message.nonce", bigInt__default["default"]((_d = object.nonce) !== null && _d !== void 0 ? _d : "0"));
    }

    /**
     * The global type for the alias unlock block.
     */
    const ALIAS_UNLOCK_BLOCK_TYPE = 2;

    /**
     * The minimum length of a alias unlock block binary representation.
     */
    const MIN_ALIAS_UNLOCK_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT16_SIZE;
    /**
     * Deserialize the alias unlock block from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeAliasUnlockBlock(readStream) {
        if (!readStream.hasRemaining(MIN_ALIAS_UNLOCK_BLOCK_LENGTH)) {
            throw new Error(`Alias Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ALIAS_UNLOCK_BLOCK_LENGTH}`);
        }
        const type = readStream.readUInt8("aliasUnlockBlock.type");
        if (type !== ALIAS_UNLOCK_BLOCK_TYPE) {
            throw new Error(`Type mismatch in aliasUnlockBlock ${type}`);
        }
        const reference = readStream.readUInt16("aliasUnlockBlock.reference");
        return {
            type: ALIAS_UNLOCK_BLOCK_TYPE,
            reference
        };
    }
    /**
     * Serialize the alias unlock block to binary.
     * @param writeStream The stream to write the data to.
     * @param object The object to serialize.
     */
    function serializeAliasUnlockBlock(writeStream, object) {
        writeStream.writeUInt8("aliasUnlockBlock.type", object.type);
        writeStream.writeUInt16("aliasUnlockBlock.reference", object.reference);
    }

    /**
     * The global type for the NFT unlock block.
     */
    const NFT_UNLOCK_BLOCK_TYPE = 3;

    /**
     * The minimum length of a nft unlock block binary representation.
     */
    const MIN_NFT_UNLOCK_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT16_SIZE;
    /**
     * Deserialize the nft unlock block from binary.
     * @param readStream The stream to read the data from.
     * @returns The deserialized object.
     */
    function deserializeNftUnlockBlock(readStream) {
        if (!readStream.hasRemaining(MIN_NFT_UNLOCK_BLOCK_LENGTH)) {
            throw new Error(`Nft Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_NFT_UNLOCK_BLOCK_LENGTH}`);
        }
        const type = readStream.readUInt8("nftUnlockBlock.type");
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
    function serializeNftUnlockBlock(writeStream, object) {
        writeStream.writeUInt8("nftUnlockBlock.type", object.type);
        writeStream.writeUInt16("nftUnlockBlock.reference", object.reference);
    }

    // Copyright 2020 IOTA Stiftung
    // SPDX-License-Identifier: Apache-2.0
    /**
     * Class to represent errors from Client.
     */
    class ClientError extends Error {
        /**
         * Create a new instance of ClientError.
         * @param message The message for the error.
         * @param route The route the request was made to.
         * @param httpStatus The http status code.
         * @param code The code in the payload.
         */
        constructor(message, route, httpStatus, code) {
            super(message);
            this.route = route;
            this.httpStatus = httpStatus;
            this.code = code;
        }
    }

    // Copyright 2020 IOTA Stiftung
    /**
     * Client for API communication.
     */
    class SingleNodeClient {
        /**
         * Create a new instance of client.
         * @param endpoint The endpoint.
         * @param options Options for the client.
         */
        constructor(endpoint, options) {
            var _a, _b, _c;
            if (!endpoint) {
                throw new Error("The endpoint can not be empty");
            }
            this._endpoint = endpoint.replace(/\/+$/, "");
            this._basePath = (_a = options === null || options === void 0 ? void 0 : options.basePath) !== null && _a !== void 0 ? _a : "/api/v1/";
            this._powProvider = options === null || options === void 0 ? void 0 : options.powProvider;
            this._timeout = options === null || options === void 0 ? void 0 : options.timeout;
            this._userName = options === null || options === void 0 ? void 0 : options.userName;
            this._password = options === null || options === void 0 ? void 0 : options.password;
            this._headers = options === null || options === void 0 ? void 0 : options.headers;
            if (this._userName && this._password && !this._endpoint.startsWith("https")) {
                throw new Error("Basic authentication requires the endpoint to be https");
            }
            if (this._userName && this._password && (((_b = this._headers) === null || _b === void 0 ? void 0 : _b.authorization) || ((_c = this._headers) === null || _c === void 0 ? void 0 : _c.Authorization))) {
                throw new Error("You can not supply both user/pass and authorization header");
            }
        }
        /**
         * Get the health of the node.
         * @returns True if the node is healthy.
         */
        async health() {
            const status = await this.fetchStatus("/health");
            if (status === 200) {
                return true;
            }
            else if (status === 503) {
                return false;
            }
            throw new ClientError("Unexpected response code", "/health", status);
        }
        /**
         * Get the info about the node.
         * @returns The node information.
         */
        async info() {
            return this.fetchJson("get", "info");
        }
        /**
         * Get the tips from the node.
         * @returns The tips.
         */
        async tips() {
            return this.fetchJson("get", "tips");
        }
        /**
         * Get the message data by id.
         * @param messageId The message to get the data for.
         * @returns The message data.
         */
        async message(messageId) {
            return this.fetchJson("get", `messages/${messageId}`);
        }
        /**
         * Get the message metadata by id.
         * @param messageId The message to get the metadata for.
         * @returns The message metadata.
         */
        async messageMetadata(messageId) {
            return this.fetchJson("get", `messages/${messageId}/metadata`);
        }
        /**
         * Get the message raw data by id.
         * @param messageId The message to get the data for.
         * @returns The message raw data.
         */
        async messageRaw(messageId) {
            return this.fetchBinary("get", `messages/${messageId}/raw`);
        }
        /**
         * Submit message.
         * @param message The message to submit.
         * @returns The messageId.
         */
        async messageSubmit(message) {
            let minPoWScore = 0;
            if (this._powProvider) {
                // If there is a local pow provider and no networkId or parent message ids
                // we must populate them, so that the they are not filled in by the
                // node causing invalid pow calculation
                const powInfo = await this.getPoWInfo();
                minPoWScore = powInfo.minPoWScore;
                if (!message.parentMessageIds || message.parentMessageIds.length === 0) {
                    const tips = await this.tips();
                    message.parentMessageIds = tips.tipMessageIds;
                }
                if (!message.networkId || message.networkId.length === 0) {
                    message.networkId = powInfo.networkId.toString();
                }
            }
            const writeStream = new util_js.WriteStream();
            serializeMessage(writeStream, message);
            const messageBytes = writeStream.finalBytes();
            if (messageBytes.length > MAX_MESSAGE_LENGTH) {
                throw new Error(`The message length is ${messageBytes.length}, which exceeds the maximum size of ${MAX_MESSAGE_LENGTH}`);
            }
            if (this._powProvider) {
                const nonce = await this._powProvider.pow(messageBytes, minPoWScore);
                message.nonce = nonce.toString();
            }
            const response = await this.fetchJson("post", "messages", message);
            return response.messageId;
        }
        /**
         * Submit message in raw format.
         * @param message The message to submit.
         * @returns The messageId.
         */
        async messageSubmitRaw(message) {
            if (message.length > MAX_MESSAGE_LENGTH) {
                throw new Error(`The message length is ${message.length}, which exceeds the maximum size of ${MAX_MESSAGE_LENGTH}`);
            }
            if (this._powProvider && crypto_js.ArrayHelper.equal(message.slice(-8), SingleNodeClient.NONCE_ZERO)) {
                const { networkId, minPoWScore } = await this.getPoWInfo();
                util_js.BigIntHelper.write8(networkId, message, 0);
                const nonce = await this._powProvider.pow(message, minPoWScore);
                util_js.BigIntHelper.write8(bigInt__default["default"](nonce), message, message.length - 8);
            }
            const response = await this.fetchBinary("post", "messages", message);
            return response.messageId;
        }
        /**
         * Find messages by index.
         * @param indexationKey The index value as a byte array or UTF8 string.
         * @returns The messageId.
         */
        async messagesFind(indexationKey) {
            return this.fetchJson("get", `messages?index=${typeof indexationKey === "string"
            ? util_js.Converter.utf8ToHex(indexationKey)
            : util_js.Converter.bytesToHex(indexationKey)}`);
        }
        /**
         * Get the children of a message.
         * @param messageId The id of the message to get the children for.
         * @returns The messages children.
         */
        async messageChildren(messageId) {
            return this.fetchJson("get", `messages/${messageId}/children`);
        }
        /**
         * Get the message that was included in the ledger for a transaction.
         * @param transactionId The id of the transaction to get the included message for.
         * @returns The message.
         */
        async transactionIncludedMessage(transactionId) {
            return this.fetchJson("get", `transactions/${transactionId}/included-message`);
        }
        /**
         * Find an output by its identifier.
         * @param outputId The id of the output to get.
         * @returns The output details.
         */
        async output(outputId) {
            return this.fetchJson("get", `outputs/${outputId}`);
        }
        /**
         * Find outputs by type.
         * @param type The type of the output to get.
         * @param issuer The issuer of the output.
         * @param sender The sender of the output.
         * @param index The index associated with the output.
         * @returns The outputs with the requested parameters.
         */
        async outputs(type, issuer, sender, index) {
            const queryParams = [];
            if (type !== undefined) {
                queryParams.push(`type=${type}`);
            }
            if (issuer !== undefined) {
                queryParams.push(`issuer=${issuer}`);
            }
            if (sender !== undefined) {
                queryParams.push(`sender=${sender}`);
            }
            if (index !== undefined) {
                queryParams.push(`index=${index}`);
            }
            return this.fetchJson("get", `outputs${this.combineQueryParams(queryParams)}`);
        }
        /**
         * Get the address details.
         * @param addressBech32 The address to get the details for.
         * @returns The address details.
         */
        async address(addressBech32) {
            return this.fetchJson("get", `addresses/${addressBech32}`);
        }
        /**
         * Get the address outputs.
         * @param addressBech32 The address to get the outputs for.
         * @param type Filter the type of outputs you are looking up, defaults to all.
         * @returns The address outputs.
         */
        async addressOutputs(addressBech32, type) {
            const queryParams = [];
            if (type !== undefined) {
                queryParams.push(`type=${type}`);
            }
            return this.fetchJson("get", `addresses/${addressBech32}/outputs${this.combineQueryParams(queryParams)}`);
        }
        /**
         * Get the address detail using ed25519 address.
         * @param addressEd25519 The address to get the details for.
         * @returns The address details.
         */
        async addressEd25519(addressEd25519) {
            if (!util_js.Converter.isHex(addressEd25519)) {
                throw new Error("The supplied address does not appear to be hex format");
            }
            return this.fetchJson("get", `addresses/ed25519/${addressEd25519}`);
        }
        /**
         * Get the address outputs using ed25519 address.
         * @param addressEd25519 The address to get the outputs for.
         * @param type Filter the type of outputs you are looking up, defaults to all.
         * @returns The address outputs.
         */
        async addressEd25519Outputs(addressEd25519, type) {
            if (!util_js.Converter.isHex(addressEd25519)) {
                throw new Error("The supplied address does not appear to be hex format");
            }
            const queryParams = [];
            if (type !== undefined) {
                queryParams.push(`type=${type}`);
            }
            return this.fetchJson("get", `addresses/ed25519/${addressEd25519}/outputs${this.combineQueryParams(queryParams)}`);
        }
        /**
         * Get the address outputs for an alias address.
         * @param addressAlias The address to get the outputs for.
         * @param type Filter the type of outputs you are looking up, defaults to all.
         * @returns The address outputs.
         */
        async addressAliasOutputs(addressAlias, type) {
            if (!util_js.Converter.isHex(addressAlias)) {
                throw new Error("The supplied address does not appear to be hex format");
            }
            const queryParams = [];
            if (type !== undefined) {
                queryParams.push(`type=${type}`);
            }
            return this.fetchJson("get", `addresses/alias/${addressAlias}/outputs${this.combineQueryParams(queryParams)}`);
        }
        /**
         * Get the address outputs for an NFT address.
         * @param addressNft The address to get the outputs for.
         * @param type Filter the type of outputs you are looking up, defaults to all.
         * @returns The address outputs.
         */
        async addressNftOutputs(addressNft, type) {
            if (!util_js.Converter.isHex(addressNft)) {
                throw new Error("The supplied address does not appear to be hex format");
            }
            const queryParams = [];
            if (type !== undefined) {
                queryParams.push(`type=${type}`);
            }
            return this.fetchJson("get", `addresses/nft/${addressNft}/outputs${this.combineQueryParams(queryParams)}`);
        }
        /**
         * Get the outputs for an alias.
         * @param aliasId The alias to get the outputs for.
         * @returns The outputs.
         */
        async alias(aliasId) {
            return this.fetchJson("get", `aliases/${aliasId}`);
        }
        /**
         * Get the outputs for an NFT.
         * @param nftId The NFT to get the outputs for.
         * @returns The outputs.
         */
        async nft(nftId) {
            return this.fetchJson("get", `nft/${nftId}`);
        }
        /**
         * Get the outputs for a foundry.
         * @param foundryId The foundry to get the outputs for.
         * @returns The outputs.
         */
        async foundry(foundryId) {
            return this.fetchJson("get", `foundries/${foundryId}`);
        }
        /**
         * Get the requested milestone.
         * @param index The index of the milestone to get.
         * @returns The milestone details.
         */
        async milestone(index) {
            return this.fetchJson("get", `milestones/${index}`);
        }
        /**
         * Get the requested milestone utxo changes.
         * @param index The index of the milestone to request the changes for.
         * @returns The milestone utxo changes details.
         */
        async milestoneUtxoChanges(index) {
            return this.fetchJson("get", `milestones/${index}/utxo-changes`);
        }
        /**
         * Get the current treasury output.
         * @returns The details for the treasury.
         */
        async treasury() {
            return this.fetchJson("get", "treasury");
        }
        /**
         * Get all the stored receipts or those for a given migrated at index.
         * @param migratedAt The index the receipts were migrated at, if not supplied returns all stored receipts.
         * @returns The stored receipts.
         */
        async receipts(migratedAt) {
            return this.fetchJson("get", `receipts${migratedAt !== undefined ? `/${migratedAt}` : ""}`);
        }
        /**
         * Get the list of peers.
         * @returns The list of peers.
         */
        async peers() {
            return this.fetchJson("get", "peers");
        }
        /**
         * Add a new peer.
         * @param multiAddress The address of the peer to add.
         * @param alias An optional alias for the peer.
         * @returns The details for the created peer.
         */
        async peerAdd(multiAddress, alias) {
            return this.fetchJson("post", "peers", {
                multiAddress,
                alias
            });
        }
        /**
         * Delete a peer.
         * @param peerId The peer to delete.
         * @returns Nothing.
         */
        async peerDelete(peerId) {
            // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
            return this.fetchJson("delete", `peers/${peerId}`);
        }
        /**
         * Get a peer.
         * @param peerId The peer to delete.
         * @returns The details for the created peer.
         */
        async peer(peerId) {
            return this.fetchJson("get", `peers/${peerId}`);
        }
        /**
         * Perform a request and just return the status.
         * @param route The route of the request.
         * @returns The response.
         */
        async fetchStatus(route) {
            const response = await this.fetchWithTimeout("get", route);
            return response.status;
        }
        /**
         * Perform a request in json format.
         * @param method The http method.
         * @param route The route of the request.
         * @param requestData Request to send to the endpoint.
         * @returns The response.
         */
        async fetchJson(method, route, requestData) {
            const response = await this.fetchWithTimeout(method, `${this._basePath}${route}`, { "Content-Type": "application/json" }, requestData ? JSON.stringify(requestData) : undefined);
            let errorMessage;
            let errorCode;
            if (response.ok) {
                if (response.status === 204) {
                    // No content
                    return {};
                }
                try {
                    const responseData = await response.json();
                    if (responseData.error) {
                        errorMessage = responseData.error.message;
                        errorCode = responseData.error.code;
                    }
                    else {
                        return responseData.data;
                    }
                }
                catch { }
            }
            if (!errorMessage) {
                try {
                    const json = await response.json();
                    if (json.error) {
                        errorMessage = json.error.message;
                        errorCode = json.error.code;
                    }
                }
                catch { }
            }
            if (!errorMessage) {
                try {
                    const text = await response.text();
                    if (text.length > 0) {
                        const match = /code=(\d+), message=(.*)/.exec(text);
                        if ((match === null || match === void 0 ? void 0 : match.length) === 3) {
                            errorCode = match[1];
                            errorMessage = match[2];
                        }
                        else {
                            errorMessage = text;
                        }
                    }
                }
                catch { }
            }
            throw new ClientError(errorMessage !== null && errorMessage !== void 0 ? errorMessage : response.statusText, route, response.status, errorCode !== null && errorCode !== void 0 ? errorCode : response.status.toString());
        }
        /**
         * Perform a request for binary data.
         * @param method The http method.
         * @param route The route of the request.
         * @param requestData Request to send to the endpoint.
         * @returns The response.
         */
        async fetchBinary(method, route, requestData) {
            var _a, _b, _c;
            const response = await this.fetchWithTimeout(method, `${this._basePath}${route}`, { "Content-Type": "application/octet-stream" }, requestData);
            let responseData;
            if (response.ok) {
                if (method === "get") {
                    return new Uint8Array(await response.arrayBuffer());
                }
                responseData = await response.json();
                if (!(responseData === null || responseData === void 0 ? void 0 : responseData.error)) {
                    return responseData === null || responseData === void 0 ? void 0 : responseData.data;
                }
            }
            if (!responseData) {
                responseData = await response.json();
            }
            throw new ClientError((_b = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : response.statusText, route, response.status, (_c = responseData === null || responseData === void 0 ? void 0 : responseData.error) === null || _c === void 0 ? void 0 : _c.code);
        }
        /**
         * Perform a fetch request.
         * @param method The http method.
         * @param route The route of the request.
         * @param headers The headers for the request.
         * @param requestData Request to send to the endpoint.
         * @returns The response.
         * @internal
         */
        async fetchWithTimeout(method, route, headers, body) {
            let controller;
            let timerId;
            if (this._timeout !== undefined) {
                controller = new AbortController();
                timerId = setTimeout(() => {
                    if (controller) {
                        controller.abort();
                    }
                }, this._timeout);
            }
            const finalHeaders = {};
            if (this._headers) {
                for (const header in this._headers) {
                    finalHeaders[header] = this._headers[header];
                }
            }
            if (headers) {
                for (const header in headers) {
                    finalHeaders[header] = headers[header];
                }
            }
            if (this._userName && this._password) {
                const userPass = util_js.Converter.bytesToBase64(util_js.Converter.utf8ToBytes(`${this._userName}:${this._password}`));
                finalHeaders.Authorization = `Basic ${userPass}`;
            }
            try {
                const response = await fetch(`${this._endpoint}${route}`, {
                    method,
                    headers: finalHeaders,
                    body,
                    signal: controller ? controller.signal : undefined
                });
                return response;
            }
            catch (err) {
                throw err instanceof Error && err.name === "AbortError" ? new Error("Timeout") : err;
            }
            finally {
                if (timerId) {
                    clearTimeout(timerId);
                }
            }
        }
        /**
         * Combine the query params.
         * @param queryParams The quer params to combine.
         * @returns The combined query params.
         */
        combineQueryParams(queryParams) {
            return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
        }
        /**
         * Get the pow info from the node.
         * @returns The networkId and the minPoWScore.
         * @internal
         */
        async getPoWInfo() {
            const nodeInfo = await this.info();
            const networkIdBytes = crypto_js.Blake2b.sum256(util_js.Converter.utf8ToBytes(nodeInfo.networkId));
            return {
                networkId: util_js.BigIntHelper.read8(networkIdBytes, 0),
                minPoWScore: nodeInfo.minPoWScore
            };
        }
    }
    /**
     * A zero nonce.
     * @internal
     */
    SingleNodeClient.NONCE_ZERO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);

    // Copyright 2020 IOTA Stiftung
    // SPDX-License-Identifier: Apache-2.0
    /* eslint-disable no-bitwise */
    /**
     * Class implements the b1t6 encoding encoding which uses a group of 6 trits to encode each byte.
     */
    class B1T6 {
        /**
         * The encoded length of the data.
         * @param data The data.
         * @returns The encoded length.
         */
        static encodedLen(data) {
            return data.length * B1T6.TRITS_PER_TRYTE;
        }
        /**
         * Encode a byte array into trits.
         * @param dst The destination array.
         * @param startIndex The start index to write in the array.
         * @param src The source data.
         * @returns The length of the encode.
         */
        static encode(dst, startIndex, src) {
            let j = 0;
            for (let i = 0; i < src.length; i++) {
                // Convert to signed 8 bit value
                const v = ((src[i] << 24) >> 24) + 364;
                const rem = Math.trunc(v % 27);
                const quo = Math.trunc(v / 27);
                dst[startIndex + j] = B1T6.TRYTE_VALUE_TO_TRITS[rem][0];
                dst[startIndex + j + 1] = B1T6.TRYTE_VALUE_TO_TRITS[rem][1];
                dst[startIndex + j + 2] = B1T6.TRYTE_VALUE_TO_TRITS[rem][2];
                dst[startIndex + j + 3] = B1T6.TRYTE_VALUE_TO_TRITS[quo][0];
                dst[startIndex + j + 4] = B1T6.TRYTE_VALUE_TO_TRITS[quo][1];
                dst[startIndex + j + 5] = B1T6.TRYTE_VALUE_TO_TRITS[quo][2];
                j += 6;
            }
            return j;
        }
    }
    /**
     * Trytes to trits lookup table.
     * @internal
     */
    B1T6.TRYTE_VALUE_TO_TRITS = [
        [-1, -1, -1],
        [0, -1, -1],
        [1, -1, -1],
        [-1, 0, -1],
        [0, 0, -1],
        [1, 0, -1],
        [-1, 1, -1],
        [0, 1, -1],
        [1, 1, -1],
        [-1, -1, 0],
        [0, -1, 0],
        [1, -1, 0],
        [-1, 0, 0],
        [0, 0, 0],
        [1, 0, 0],
        [-1, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
        [-1, -1, 1],
        [0, -1, 1],
        [1, -1, 1],
        [-1, 0, 1],
        [0, 0, 1],
        [1, 0, 1],
        [-1, 1, 1],
        [0, 1, 1],
        [1, 1, 1]
    ];
    /**
     * Trites per tryte.
     * @internal
     */
    B1T6.TRITS_PER_TRYTE = 3;

    // Copyright 2020 IOTA Stiftung
    const IOTA_BIP44_BASE_PATH = "m/44'/4218'";
    /**
     * Generate a bip44 path based on all its parts.
     * @param accountIndex The account index.
     * @param addressIndex The address index.
     * @param isInternal Is this an internal address.
     * @returns The generated address.
     */
    function generateBip44Path(accountIndex, addressIndex, isInternal) {
        const bip32Path = new crypto_js.Bip32Path(IOTA_BIP44_BASE_PATH);
        bip32Path.pushHardened(accountIndex);
        bip32Path.pushHardened(isInternal ? 1 : 0);
        bip32Path.pushHardened(addressIndex);
        return bip32Path;
    }
    /**
     * Generate addresses based on the account indexing style.
     * @param generatorState The address state.
     * @param generatorState.accountIndex The index of the account to calculate.
     * @param generatorState.addressIndex The index of the address to calculate.
     * @param generatorState.isInternal Are we generating an internal address.
     * @returns The key pair for the address.
     */
    function generateBip44Address(generatorState) {
        const path = new crypto_js.Bip32Path(IOTA_BIP44_BASE_PATH);
        path.pushHardened(generatorState.accountIndex);
        path.pushHardened(generatorState.isInternal ? 1 : 0);
        path.pushHardened(generatorState.addressIndex);
        // Flip-flop between internal and external
        // and then increment the address Index
        if (!generatorState.isInternal) {
            generatorState.isInternal = true;
        }
        else {
            generatorState.isInternal = false;
            generatorState.addressIndex++;
        }
        return path.toString();
    }

    // Copyright 2020 IOTA Stiftung
    /**
     * Convert address to bech32.
     */
    class Bech32Helper {
        /**
         * Encode an address to bech32.
         * @param addressType The address type to encode.
         * @param addressBytes The address bytes to encode.
         * @param humanReadablePart The human readable part to use.
         * @returns The array formated as hex.
         */
        static toBech32(addressType, addressBytes, humanReadablePart) {
            const addressData = new Uint8Array(1 + addressBytes.length);
            addressData[0] = addressType;
            addressData.set(addressBytes, 1);
            return crypto_js.Bech32.encode(humanReadablePart, addressData);
        }
        /**
         * Decode an address from bech32.
         * @param bech32Text The bech32 text to decode.
         * @param humanReadablePart The human readable part to use.
         * @returns The address type and address bytes or undefined if it cannot be decoded.
         */
        static fromBech32(bech32Text, humanReadablePart) {
            const decoded = crypto_js.Bech32.decode(bech32Text);
            if (decoded) {
                if (decoded.humanReadablePart !== humanReadablePart) {
                    throw new Error(`The hrp part of the address should be ${humanReadablePart}, it is ${decoded.humanReadablePart}`);
                }
                if (decoded.data.length === 0) {
                    throw new Error("The data part of the address should be at least length 1, it is 0");
                }
                const addressType = decoded.data[0];
                const addressBytes = decoded.data.slice(1);
                return {
                    addressType,
                    addressBytes
                };
            }
        }
        /**
         * Does the provided string look like it might be an bech32 address with matching hrp.
         * @param bech32Text The bech32 text to text.
         * @param humanReadablePart The human readable part to match.
         * @returns True if the passed address matches the pattern for a bech32 address.
         */
        static matches(bech32Text, humanReadablePart) {
            return crypto_js.Bech32.matches(humanReadablePart, bech32Text);
        }
    }
    /**
     * The default human readable part of the bech32 addresses for mainnet, currently 'iota'.
     */
    Bech32Helper.BECH32_DEFAULT_HRP_MAIN = "iota";
    /**
     * The default human readable part of the bech32 addresses for devnet, currently 'atoi'.
     */
    Bech32Helper.BECH32_DEFAULT_HRP_DEV = "atoi";

    // Copyright 2020 IOTA Stiftung
    /**
     * Get all the unspent addresses.
     * @param client The client or node endpoint to send the transfer with.
     * @param seed The seed to use for address generation.
     * @param accountIndex The account index in the wallet.
     * @param addressOptions Optional address configuration for balance address lookups.
     * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
     * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
     * @param addressOptions.requiredCount The max number of addresses to find.
     * @returns All the unspent addresses.
     */
    async function getUnspentAddresses(client, seed, accountIndex, addressOptions) {
        var _a;
        return getUnspentAddressesWithAddressGenerator(client, seed, {
            accountIndex,
            addressIndex: (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex) !== null && _a !== void 0 ? _a : 0,
            isInternal: false
        }, generateBip44Address, addressOptions);
    }
    /**
     * Get all the unspent addresses using an address generator.
     * @param client The client or node endpoint to get the addresses from.
     * @param seed The seed to use for address generation.
     * @param initialAddressState The initial address state for calculating the addresses.
     * @param nextAddressPath Calculate the next address for inputs.
     * @param addressOptions Optional address configuration for balance address lookups.
     * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
     * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
     * @param addressOptions.requiredCount The max number of addresses to find.
     * @returns All the unspent addresses.
     */
    async function getUnspentAddressesWithAddressGenerator(client, seed, initialAddressState, nextAddressPath, addressOptions) {
        var _a, _b;
        const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
        const nodeInfo = await localClient.info();
        const localRequiredLimit = (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.requiredCount) !== null && _a !== void 0 ? _a : Number.MAX_SAFE_INTEGER;
        const localZeroCount = (_b = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount) !== null && _b !== void 0 ? _b : 20;
        let finished = false;
        const allUnspent = [];
        let zeroBalance = 0;
        do {
            const path = nextAddressPath(initialAddressState);
            const addressSeed = seed.generateSeedFromPath(new crypto_js.Bip32Path(path));
            const ed25519Address = new Ed25519Address(addressSeed.keyPair().publicKey);
            const addressBytes = ed25519Address.toAddress();
            const addressHex = util_js.Converter.bytesToHex(addressBytes);
            const addressResponse = await localClient.addressEd25519(addressHex);
            // If there is no balance we increment the counter and end
            // the text when we have reached the count
            if (addressResponse.balance === 0) {
                zeroBalance++;
                if (zeroBalance >= localZeroCount) {
                    finished = true;
                }
            }
            else {
                allUnspent.push({
                    address: Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, addressBytes, nodeInfo.bech32HRP),
                    path,
                    balance: addressResponse.balance
                });
                if (allUnspent.length === localRequiredLimit) {
                    finished = true;
                }
            }
        } while (!finished);
        return allUnspent;
    }

    /**
     * Get the balance for a list of addresses.
     * @param client The client or node endpoint to send the transfer with.
     * @param seed The seed.
     * @param accountIndex The account index in the wallet.
     * @param addressOptions Optional address configuration for balance address lookups.
     * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
     * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
     * @returns The balance.
     */
    async function getBalance(client, seed, accountIndex, addressOptions) {
        const allUnspent = await getUnspentAddresses(client, seed, accountIndex, addressOptions);
        let total = 0;
        for (const output of allUnspent) {
            total += output.balance;
        }
        return total;
    }

    /**
     * Get the first unspent address.
     * @param client The client or node endpoint to send the transfer with.
     * @param seed The seed to use for address generation.
     * @param accountIndex The account index in the wallet.
     * @param addressOptions Optional address configuration for balance address lookups.
     * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
     * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
     * @returns The first unspent address.
     */
    async function getUnspentAddress(client, seed, accountIndex, addressOptions) {
        const allUnspent = await getUnspentAddresses(client, seed, accountIndex, {
            startIndex: addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex,
            zeroCount: addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount,
            requiredCount: 1
        });
        return allUnspent.length > 0 ? allUnspent[0] : undefined;
    }

    // Copyright 2020 IOTA Stiftung
    /**
     * Promote an existing message.
     * @param client The clientor node endpoint to perform the promote with.
     * @param messageId The message to promote.
     * @returns The id and message that were promoted.
     */
    async function promote(client, messageId) {
        const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
        const message = await localClient.message(messageId);
        if (!message) {
            throw new Error("The message does not exist.");
        }
        const tipsResponse = await localClient.tips();
        // Parents must be unique and lexicographically sorted
        // so don't add the messageId if it is already one of the tips
        if (!tipsResponse.tipMessageIds.includes(messageId)) {
            tipsResponse.tipMessageIds.unshift(messageId);
        }
        // If we now exceed the max parents remove as many as we need
        if (tipsResponse.tipMessageIds.length > MAX_NUMBER_PARENTS) {
            tipsResponse.tipMessageIds = tipsResponse.tipMessageIds.slice(0, MAX_NUMBER_PARENTS);
        }
        // Finally sort the list
        tipsResponse.tipMessageIds.sort();
        const promoteMessage = {
            parentMessageIds: tipsResponse.tipMessageIds
        };
        const promoteMessageId = await localClient.messageSubmit(promoteMessage);
        return {
            message,
            messageId: promoteMessageId
        };
    }

    // Copyright 2020 IOTA Stiftung
    /**
     * Reattach an existing message.
     * @param client The client or node endpoint to perform the reattach with.
     * @param messageId The message to reattach.
     * @returns The id and message that were reattached.
     */
    async function reattach(client, messageId) {
        const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
        const message = await localClient.message(messageId);
        if (!message) {
            throw new Error("The message does not exist.");
        }
        const reattachMessage = {
            payload: message.payload
        };
        const reattachedMessageId = await localClient.messageSubmit(reattachMessage);
        return {
            message,
            messageId: reattachedMessageId
        };
    }

    // Copyright 2020 IOTA Stiftung
    /**
     * Retrieve a data message.
     * @param client The client or node endpoint to retrieve the data with.
     * @param messageId The message id of the data to get.
     * @returns The message index and data.
     */
    async function retrieveData(client, messageId) {
        const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
        const message = await localClient.message(messageId);
        if (message === null || message === void 0 ? void 0 : message.payload) {
            let indexationPayload;
            if (message.payload.type === TRANSACTION_PAYLOAD_TYPE) {
                indexationPayload = message.payload.essence.payload;
            }
            else if (message.payload.type === INDEXATION_PAYLOAD_TYPE) {
                indexationPayload = message.payload;
            }
            if (indexationPayload) {
                return {
                    index: util_js.Converter.hexToBytes(indexationPayload.index),
                    data: indexationPayload.data ? util_js.Converter.hexToBytes(indexationPayload.data) : undefined
                };
            }
        }
    }

    // Copyright 2020 IOTA Stiftung
    /**
     * Retry an existing message either by promoting or reattaching.
     * @param client The client or node endpoint to perform the retry with.
     * @param messageId The message to retry.
     * @returns The id and message that were retried.
     */
    async function retry(client, messageId) {
        const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
        const metadata = await localClient.messageMetadata(messageId);
        if (!metadata) {
            throw new Error("The message does not exist.");
        }
        if (metadata.shouldPromote) {
            return promote(client, messageId);
        }
        else if (metadata.shouldReattach) {
            return reattach(client, messageId);
        }
        throw new Error("The message should not be promoted or reattached.");
    }

    // Copyright 2020 IOTA Stiftung
    /**
     * Send a transfer from the balance on the seed.
     * @param client The client or node endpoint to send the transfer with.
     * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
     * @param outputs The outputs to send.
     * @param indexation Optional indexation data to associate with the transaction.
     * @param indexation.key Indexation key.
     * @param indexation.data Optional index data.
     * @returns The id of the message created and the remainder address if one was needed.
     */
    async function sendAdvanced(client, inputsAndSignatureKeyPairs, outputs, indexation) {
        const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
        const transactionPayload = buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, indexation);
        const message = {
            payload: transactionPayload
        };
        const messageId = await localClient.messageSubmit(message);
        return {
            messageId,
            message
        };
    }
    /**
     * Build a transaction payload.
     * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
     * @param outputs The outputs to send.
     * @param indexation Optional indexation data to associate with the transaction.
     * @param indexation.key Indexation key.
     * @param indexation.data Optional index data.
     * @returns The transaction payload.
     */
    function buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, indexation) {
        if (!inputsAndSignatureKeyPairs || inputsAndSignatureKeyPairs.length === 0) {
            throw new Error("You must specify some inputs");
        }
        if (!outputs || outputs.length === 0) {
            throw new Error("You must specify some outputs");
        }
        let localIndexationKeyHex;
        if (indexation === null || indexation === void 0 ? void 0 : indexation.key) {
            localIndexationKeyHex =
                typeof indexation.key === "string"
                    ? util_js.Converter.utf8ToHex(indexation.key)
                    : util_js.Converter.bytesToHex(indexation.key);
            if (localIndexationKeyHex.length / 2 < MIN_INDEXATION_KEY_LENGTH) {
                throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2}, which is below the minimum size of ${MIN_INDEXATION_KEY_LENGTH}`);
            }
            if (localIndexationKeyHex.length / 2 > MAX_INDEXATION_KEY_LENGTH) {
                throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2}, which exceeds the maximum size of ${MAX_INDEXATION_KEY_LENGTH}`);
            }
        }
        const outputsWithSerialization = [];
        for (const output of outputs) {
            if (output.addressType === ED25519_ADDRESS_TYPE) {
                const o = {
                    type: SIMPLE_OUTPUT_TYPE,
                    address: {
                        type: output.addressType,
                        address: output.address
                    },
                    amount: output.amount
                };
                const writeStream = new util_js.WriteStream();
                serializeOutput(writeStream, o);
                outputsWithSerialization.push({
                    output: o,
                    serialized: writeStream.finalHex()
                });
            }
            else {
                throw new Error(`Unrecognized output address type ${output.addressType}`);
            }
        }
        const inputsAndSignatureKeyPairsSerialized = inputsAndSignatureKeyPairs.map(i => {
            const writeStream = new util_js.WriteStream();
            serializeInput(writeStream, i.input);
            return {
                ...i,
                serialized: writeStream.finalHex()
            };
        });
        // Lexicographically sort the inputs and outputs
        const sortedInputs = inputsAndSignatureKeyPairsSerialized.sort((a, b) => a.serialized.localeCompare(b.serialized));
        const sortedOutputs = outputsWithSerialization.sort((a, b) => a.serialized.localeCompare(b.serialized));
        const transactionEssence = {
            type: TRANSACTION_ESSENCE_TYPE,
            inputs: sortedInputs.map(i => i.input),
            outputs: sortedOutputs.map(o => o.output),
            payload: localIndexationKeyHex
                ? {
                    type: INDEXATION_PAYLOAD_TYPE,
                    index: localIndexationKeyHex,
                    data: (indexation === null || indexation === void 0 ? void 0 : indexation.data)
                        ? typeof indexation.data === "string"
                            ? util_js.Converter.utf8ToHex(indexation.data)
                            : util_js.Converter.bytesToHex(indexation.data)
                        : undefined
                }
                : undefined
        };
        const binaryEssence = new util_js.WriteStream();
        serializeTransactionEssence(binaryEssence, transactionEssence);
        const essenceFinal = binaryEssence.finalBytes();
        const essenceHash = crypto_js.Blake2b.sum256(essenceFinal);
        // Create the unlock blocks
        const unlockBlocks = [];
        const addressToUnlockBlock = {};
        for (const input of sortedInputs) {
            const hexInputAddressPublic = util_js.Converter.bytesToHex(input.addressKeyPair.publicKey);
            if (addressToUnlockBlock[hexInputAddressPublic]) {
                unlockBlocks.push({
                    type: REFERENCE_UNLOCK_BLOCK_TYPE,
                    reference: addressToUnlockBlock[hexInputAddressPublic].unlockIndex
                });
            }
            else {
                unlockBlocks.push({
                    type: SIGNATURE_UNLOCK_BLOCK_TYPE,
                    signature: {
                        type: ED25519_SIGNATURE_TYPE,
                        publicKey: hexInputAddressPublic,
                        signature: util_js.Converter.bytesToHex(crypto_js.Ed25519.sign(input.addressKeyPair.privateKey, essenceHash))
                    }
                });
                addressToUnlockBlock[hexInputAddressPublic] = {
                    keyPair: input.addressKeyPair,
                    unlockIndex: unlockBlocks.length - 1
                };
            }
        }
        const transactionPayload = {
            type: TRANSACTION_PAYLOAD_TYPE,
            essence: transactionEssence,
            unlockBlocks
        };
        return transactionPayload;
    }

    // Copyright 2020 IOTA Stiftung
    /**
     * Send a transfer from the balance on the seed to a single output.
     * @param client The client or node endpoint to send the transfer with.
     * @param seed The seed to use for address generation.
     * @param accountIndex The account index in the wallet.
     * @param addressBech32 The address to send the funds to in bech32 format.
     * @param amount The amount to send.
     * @param indexation Optional indexation data to associate with the transaction.
     * @param indexation.key Indexation key.
     * @param indexation.data Optional index data.
     * @param addressOptions Optional address configuration for balance address lookups.
     * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
     * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
     * @returns The id of the message created and the contructed message.
     */
    async function send(client, seed, accountIndex, addressBech32, amount, indexation, addressOptions) {
        return sendMultiple(client, seed, accountIndex, [{ addressBech32, amount }], indexation, addressOptions);
    }
    /**
     * Send a transfer from the balance on the seed to a single output.
     * @param client The client or node endpoint to send the transfer with.
     * @param seed The seed to use for address generation.
     * @param accountIndex The account index in the wallet.
     * @param addressEd25519 The address to send the funds to in ed25519 format.
     * @param amount The amount to send.
     * @param indexation Optional indexation data to associate with the transaction.
     * @param indexation.key Indexation key.
     * @param indexation.data Optional index data.
     * @param addressOptions Optional address configuration for balance address lookups.
     * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
     * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
     * @returns The id of the message created and the contructed message.
     */
    async function sendEd25519(client, seed, accountIndex, addressEd25519, amount, indexation, addressOptions) {
        return sendMultipleEd25519(client, seed, accountIndex, [{ addressEd25519, amount }], indexation, addressOptions);
    }
    /**
     * Send a transfer from the balance on the seed to multiple outputs.
     * @param client The client or node endpoint to send the transfer with.
     * @param seed The seed to use for address generation.
     * @param accountIndex The account index in the wallet.
     * @param outputs The address to send the funds to in bech32 format and amounts.
     * @param indexation Optional indexation data to associate with the transaction.
     * @param indexation.key Indexation key.
     * @param indexation.data Optional index data.
     * @param addressOptions Optional address configuration for balance address lookups.
     * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
     * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
     * @returns The id of the message created and the contructed message.
     */
    async function sendMultiple(client, seed, accountIndex, outputs, indexation, addressOptions) {
        var _a;
        const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
        const nodeInfo = await localClient.info();
        const hexOutputs = outputs.map(output => {
            const bech32Details = Bech32Helper.fromBech32(output.addressBech32, nodeInfo.bech32HRP);
            if (!bech32Details) {
                throw new Error("Unable to decode bech32 address");
            }
            return {
                address: util_js.Converter.bytesToHex(bech32Details.addressBytes),
                addressType: bech32Details.addressType,
                amount: output.amount
            };
        });
        return sendWithAddressGenerator(client, seed, {
            accountIndex,
            addressIndex: (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex) !== null && _a !== void 0 ? _a : 0,
            isInternal: false
        }, generateBip44Address, hexOutputs, indexation, addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount);
    }
    /**
     * Send a transfer from the balance on the seed.
     * @param client The client or node endpoint to send the transfer with.
     * @param seed The seed to use for address generation.
     * @param accountIndex The account index in the wallet.
     * @param outputs The outputs including address to send the funds to in ed25519 format and amount.
     * @param indexation Optional indexation data to associate with the transaction.
     * @param indexation.key Indexation key.
     * @param indexation.data Optional index data.
     * @param addressOptions Optional address configuration for balance address lookups.
     * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
     * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
     * @returns The id of the message created and the contructed message.
     */
    async function sendMultipleEd25519(client, seed, accountIndex, outputs, indexation, addressOptions) {
        var _a;
        const hexOutputs = outputs.map(output => ({
            address: output.addressEd25519,
            addressType: ED25519_ADDRESS_TYPE,
            amount: output.amount
        }));
        return sendWithAddressGenerator(client, seed, {
            accountIndex,
            addressIndex: (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex) !== null && _a !== void 0 ? _a : 0,
            isInternal: false
        }, generateBip44Address, hexOutputs, indexation, addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount);
    }
    /**
     * Send a transfer using account based indexing for the inputs.
     * @param client The client or node endpoint to send the transfer with.
     * @param seed The seed to use for address generation.
     * @param initialAddressState The initial address state for calculating the addresses.
     * @param nextAddressPath Calculate the next address for inputs.
     * @param outputs The address to send the funds to in bech32 format and amounts.
     * @param indexation Optional indexation data to associate with the transaction.
     * @param indexation.key Indexation key.
     * @param indexation.data Optional index data.
     * @param zeroCount The number of addresses with 0 balance during lookup before aborting.
     * @returns The id of the message created and the contructed message.
     */
    async function sendWithAddressGenerator(client, seed, initialAddressState, nextAddressPath, outputs, indexation, zeroCount) {
        const inputsAndKeys = await calculateInputs(client, seed, initialAddressState, nextAddressPath, outputs, zeroCount);
        const response = await sendAdvanced(client, inputsAndKeys, outputs, indexation);
        return {
            messageId: response.messageId,
            message: response.message
        };
    }
    /**
     * Calculate the inputs from the seed and basePath.
     * @param client The client or node endpoint to calculate the inputs with.
     * @param seed The seed to use for address generation.
     * @param initialAddressState The initial address state for calculating the addresses.
     * @param nextAddressPath Calculate the next address for inputs.
     * @param outputs The outputs to send.
     * @param zeroCount Abort when the number of zero balances is exceeded.
     * @returns The id of the message created and the contructed message.
     */
    async function calculateInputs(client, seed, initialAddressState, nextAddressPath, outputs, zeroCount = 5) {
        const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
        let requiredBalance = 0;
        for (const output of outputs) {
            requiredBalance += output.amount;
        }
        let consumedBalance = 0;
        const inputsAndSignatureKeyPairs = [];
        let finished = false;
        let zeroBalance = 0;
        do {
            const path = nextAddressPath(initialAddressState);
            const addressSeed = seed.generateSeedFromPath(new crypto_js.Bip32Path(path));
            const addressKeyPair = addressSeed.keyPair();
            const ed25519Address = new Ed25519Address(addressKeyPair.publicKey);
            const address = util_js.Converter.bytesToHex(ed25519Address.toAddress());
            const addressOutputIds = await localClient.addressEd25519Outputs(address);
            if (addressOutputIds.count === 0) {
                zeroBalance++;
                if (zeroBalance >= zeroCount) {
                    finished = true;
                }
            }
            else {
                for (const addressOutputId of addressOutputIds.outputIds) {
                    const addressOutput = await localClient.output(addressOutputId);
                    if (!addressOutput.isSpent && consumedBalance < requiredBalance) {
                        if (addressOutput.output.amount === 0) {
                            zeroBalance++;
                            if (zeroBalance >= zeroCount) {
                                finished = true;
                            }
                        }
                        else {
                            consumedBalance += addressOutput.output.amount;
                            const input = {
                                type: UTXO_INPUT_TYPE,
                                transactionId: addressOutput.transactionId,
                                transactionOutputIndex: addressOutput.outputIndex
                            };
                            inputsAndSignatureKeyPairs.push({
                                input,
                                addressKeyPair
                            });
                            if (consumedBalance >= requiredBalance) {
                                // We didn't use all the balance from the last input
                                // so return the rest to the same address.
                                if (consumedBalance - requiredBalance > 0 &&
                                    addressOutput.output.type === SIMPLE_OUTPUT_TYPE) {
                                    outputs.push({
                                        amount: consumedBalance - requiredBalance,
                                        address: addressOutput.output.address.address,
                                        addressType: addressOutput.output.address.type
                                    });
                                }
                                finished = true;
                            }
                        }
                    }
                }
            }
        } while (!finished);
        if (consumedBalance < requiredBalance) {
            throw new Error("There are not enough funds in the inputs for the required balance");
        }
        return inputsAndSignatureKeyPairs;
    }

    // Copyright 2020 IOTA Stiftung
    /**
     * Send a data message.
     * @param client The client or node endpoint to send the data with.
     * @param indexationKey The index name.
     * @param indexationData The index data as either UTF8 text or Uint8Array bytes.
     * @returns The id of the message created and the message.
     */
    async function sendData(client, indexationKey, indexationData) {
        const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
        if (!indexationKey) {
            throw new Error("indexationKey must not be empty");
        }
        const localIndexationKeyHex = typeof indexationKey === "string" ? util_js.Converter.utf8ToHex(indexationKey) : util_js.Converter.bytesToHex(indexationKey);
        if (localIndexationKeyHex.length / 2 < MIN_INDEXATION_KEY_LENGTH) {
            throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2}, which is below the minimum size of ${MIN_INDEXATION_KEY_LENGTH}`);
        }
        if (localIndexationKeyHex.length / 2 > MAX_INDEXATION_KEY_LENGTH) {
            throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2}, which exceeds the maximum size of ${MAX_INDEXATION_KEY_LENGTH}`);
        }
        const indexationPayload = {
            type: INDEXATION_PAYLOAD_TYPE,
            index: localIndexationKeyHex,
            data: indexationData
                ? typeof indexationData === "string"
                    ? util_js.Converter.utf8ToHex(indexationData)
                    : util_js.Converter.bytesToHex(indexationData)
                : undefined
        };
        const message = {
            payload: indexationPayload
        };
        const messageId = await localClient.messageSubmit(message);
        return {
            message,
            messageId
        };
    }

    // Copyright 2020 IOTA Stiftung
    // SPDX-License-Identifier: Apache-2.0
    /**
     * Reason for message conflicts.
     */
    // eslint-disable-next-line no-shadow
    exports.ConflictReason = void 0;
    (function (ConflictReason) {
        /**
         * The message has no conflict.
         */
        ConflictReason[ConflictReason["none"] = 0] = "none";
        /**
         * The referenced UTXO was already spent.
         */
        ConflictReason[ConflictReason["inputUTXOAlreadySpent"] = 1] = "inputUTXOAlreadySpent";
        /**
         * The referenced UTXO was already spent while confirming this milestone.
         */
        ConflictReason[ConflictReason["inputUTXOAlreadySpentInThisMilestone"] = 2] = "inputUTXOAlreadySpentInThisMilestone";
        /**
         * The referenced UTXO cannot be found.
         */
        ConflictReason[ConflictReason["inputUTXONotFound"] = 3] = "inputUTXONotFound";
        /**
         * The sum of the inputs and output values does not match.
         */
        ConflictReason[ConflictReason["inputOutputSumMismatch"] = 4] = "inputOutputSumMismatch";
        /**
         * The unlock block signature is invalid.
         */
        ConflictReason[ConflictReason["invalidSignature"] = 5] = "invalidSignature";
        /**
         * The dust allowance for the address is invalid.
         */
        ConflictReason[ConflictReason["invalidDustAllowance"] = 6] = "invalidDustAllowance";
        /**
         * The semantic validation failed.
         */
        ConflictReason[ConflictReason["semanticValidationFailed"] = 255] = "semanticValidationFailed";
    })(exports.ConflictReason || (exports.ConflictReason = {}));

    // Copyright 2020 IOTA Stiftung
    /**
     * Helper methods for POW.
     */
    class PowHelper {
        /**
         * Perform the score calculation.
         * @param message The data to perform the score on.
         * @returns The score for the data.
         */
        static score(message) {
            // the PoW digest is the hash of msg without the nonce
            const powRelevantData = message.slice(0, -8);
            const powDigest = crypto_js.Blake2b.sum256(powRelevantData);
            const nonce = util_js.BigIntHelper.read8(message, message.length - 8);
            const zeros = PowHelper.trailingZeros(powDigest, nonce);
            return Math.pow(3, zeros) / message.length;
        }
        /**
         * Calculate the number of zeros required to get target score.
         * @param message The message to process.
         * @param targetScore The target score.
         * @returns The number of zeros to find.
         */
        static calculateTargetZeros(message, targetScore) {
            return Math.ceil(Math.log(message.length * targetScore) / this.LN3);
        }
        /**
         * Calculate the trailing zeros.
         * @param powDigest The pow digest.
         * @param nonce The nonce.
         * @returns The trailing zeros.
         */
        static trailingZeros(powDigest, nonce) {
            const buf = new Int8Array(crypto_js.Curl.HASH_LENGTH);
            const digestTritsLen = B1T6.encode(buf, 0, powDigest);
            const biArr = new Uint8Array(8);
            util_js.BigIntHelper.write8(nonce, biArr, 0);
            B1T6.encode(buf, digestTritsLen, biArr);
            const curl = new crypto_js.Curl();
            curl.absorb(buf, 0, crypto_js.Curl.HASH_LENGTH);
            const hash = new Int8Array(crypto_js.Curl.HASH_LENGTH);
            curl.squeeze(hash, 0, crypto_js.Curl.HASH_LENGTH);
            return PowHelper.trinaryTrailingZeros(hash);
        }
        /**
         * Find the number of trailing zeros.
         * @param trits The trits to look for zeros.
         * @param endPos The end position to start looking for zeros.
         * @returns The number of trailing zeros.
         */
        static trinaryTrailingZeros(trits, endPos = trits.length) {
            let z = 0;
            for (let i = endPos - 1; i >= 0 && trits[i] === 0; i--) {
                z++;
            }
            return z;
        }
        /**
         * Perform the hash on the data until we reach target number of zeros.
         * @param powDigest The pow digest.
         * @param targetZeros The target number of zeros.
         * @param startIndex The index to start looking from.
         * @returns The nonce.
         */
        static performPow(powDigest, targetZeros, startIndex) {
            let nonce = bigInt__default["default"](startIndex);
            let returnNonce;
            const buf = new Int8Array(crypto_js.Curl.HASH_LENGTH);
            const digestTritsLen = B1T6.encode(buf, 0, powDigest);
            const biArr = new Uint8Array(8);
            do {
                util_js.BigIntHelper.write8(nonce, biArr, 0);
                B1T6.encode(buf, digestTritsLen, biArr);
                const curlState = new Int8Array(crypto_js.Curl.STATE_LENGTH);
                curlState.set(buf, 0);
                crypto_js.Curl.transform(curlState, 81);
                if (PowHelper.trinaryTrailingZeros(curlState, crypto_js.Curl.HASH_LENGTH) >= targetZeros) {
                    returnNonce = nonce;
                }
                else {
                    nonce = nonce.plus(1);
                }
            } while (returnNonce === undefined);
            return returnNonce ? returnNonce.toString() : "0";
        }
    }
    /**
     * LN3 Const see https://oeis.org/A002391.
     * 1.098612288668109691395245236922525704647490557822749451734694333 .
     */
    PowHelper.LN3 = 1.0986122886681098;

    // Copyright 2020 IOTA Stiftung
    /**
     * Local POW Provider.
     * WARNING - This is really slow.
     */
    class LocalPowProvider {
        /**
         * Perform pow on the message and return the nonce of at least targetScore.
         * @param message The message to process.
         * @param targetScore The target score.
         * @returns The nonce.
         */
        async pow(message, targetScore) {
            const powRelevantData = message.slice(0, -8);
            const powDigest = crypto_js.Blake2b.sum256(powRelevantData);
            const targetZeros = PowHelper.calculateTargetZeros(message, targetScore);
            return PowHelper.performPow(powDigest, targetZeros, "0").toString();
        }
    }

    // Copyright 2020 IOTA Stiftung
    /**
     * Conflict reason strings.
     */
    const CONFLICT_REASON_STRINGS = {
        [exports.ConflictReason.none]: "Not conflicting",
        [exports.ConflictReason.inputUTXOAlreadySpent]: "The referenced UTXO was already spent",
        [exports.ConflictReason.inputUTXOAlreadySpentInThisMilestone]: "The referenced UTXO was already spent while confirming this milestone",
        [exports.ConflictReason.inputUTXONotFound]: "The referenced UTXO cannot be found",
        [exports.ConflictReason.inputOutputSumMismatch]: "The sum of the inputs and output values does not match",
        [exports.ConflictReason.invalidSignature]: "The unlock block signature is invalid",
        [exports.ConflictReason.invalidDustAllowance]: "The dust allowance for the address is invalid",
        [exports.ConflictReason.semanticValidationFailed]: "The semantic validation failed"
    };

    /**
     * The global type for the seed.
     */
    const ED25519_SEED_TYPE = 1;
    /**
     * Class to help with seeds.
     */
    class Ed25519Seed {
        /**
         * Create a new instance of Ed25519Seed.
         * @param secretKeyBytes The bytes.
         */
        constructor(secretKeyBytes) {
            this._secretKey = secretKeyBytes !== null && secretKeyBytes !== void 0 ? secretKeyBytes : new Uint8Array();
        }
        /**
         * Create the seed from a Bip39 mnemonic.
         * @param mnemonic The mnemonic to create the seed from.
         * @returns A new instance of Ed25519Seed.
         */
        static fromMnemonic(mnemonic) {
            return new Ed25519Seed(crypto_js.Bip39.mnemonicToSeed(mnemonic));
        }
        /**
         * Get the key pair from the seed.
         * @returns The key pair.
         */
        keyPair() {
            const signKeyPair = crypto_js.Ed25519.keyPairFromSeed(this._secretKey);
            return {
                publicKey: signKeyPair.publicKey,
                privateKey: signKeyPair.privateKey
            };
        }
        /**
         * Generate a new seed from the path.
         * @param path The path to generate the seed for.
         * @returns The generated seed.
         */
        generateSeedFromPath(path) {
            const keys = crypto_js.Slip0010.derivePath(this._secretKey, path);
            return new Ed25519Seed(keys.privateKey);
        }
        /**
         * Return the key as bytes.
         * @returns The key as bytes.
         */
        toBytes() {
            return this._secretKey;
        }
    }

    // Copyright 2020 IOTA Stiftung
    /**
     * The logger used by the log methods.
     * @param message The message to output.
     * @param data The data to output.
     * @returns Nothing.
     */
    // eslint-disable-next-line no-confusing-arrow
    let logger = (message, data) => data !== undefined ? console.log(message, data) : console.log(message);
    /**
     * Set the logger for output.
     * @param log The logger.
     */
    function setLogger(log) {
        logger = log;
    }
    /**
     * Log the node information.
     * @param prefix The prefix for the output.
     * @param info The info to log.
     */
    function logInfo(prefix, info) {
        logger(`${prefix}\tName:`, info.name);
        logger(`${prefix}\tVersion:`, info.version);
        logger(`${prefix}\tNetwork Id:`, info.networkId);
        logger(`${prefix}\tIs Healthy:`, info.isHealthy);
        logger(`${prefix}\tMin PoW Score:`, info.minPoWScore);
        logger(`${prefix}\tBech32 HRP:`, info.bech32HRP);
        logger(`${prefix}\tLatest Milestone Index:`, info.latestMilestoneIndex);
        logger(`${prefix}\tLatest Milestone Timestamp:`, info.latestMilestoneTimestamp);
        logger(`${prefix}\tConfirmed Milestone Index:`, info.confirmedMilestoneIndex);
        logger(`${prefix}\tMessages Per Second:`, info.messagesPerSecond);
        logger(`${prefix}\tReferenced Messages Per Second:`, info.referencedMessagesPerSecond);
        logger(`${prefix}\tReferenced Rate:`, info.referencedRate);
        logger(`${prefix}\tPruning Index:`, info.pruningIndex);
        logger(`${prefix}\tFeatures:`, info.features);
    }
    /**
     * Log the tips information.
     * @param prefix The prefix for the output.
     * @param tipsResponse The tips to log.
     */
    function logTips(prefix, tipsResponse) {
        if (tipsResponse.tipMessageIds) {
            for (let i = 0; i < tipsResponse.tipMessageIds.length; i++) {
                logger(`${prefix}\tTip ${i + 1} Message Id:`, tipsResponse.tipMessageIds[i]);
            }
        }
    }
    /**
     * Log a message to the console.
     * @param prefix The prefix for the output.
     * @param message The message to log.
     */
    function logMessage(prefix, message) {
        logger(`${prefix}\tNetwork Id:`, message.networkId);
        if (message.parentMessageIds) {
            for (let i = 0; i < message.parentMessageIds.length; i++) {
                logger(`${prefix}\tParent ${i + 1} Message Id:`, message.parentMessageIds[i]);
            }
        }
        logPayload(`${prefix}\t`, message.payload);
        if (message.nonce !== undefined) {
            logger(`${prefix}\tNonce:`, message.nonce);
        }
    }
    /**
     * Log the message metadata to the console.
     * @param prefix The prefix for the output.
     * @param messageMetadata The messageMetadata to log.
     */
    function logMessageMetadata(prefix, messageMetadata) {
        logger(`${prefix}\tMessage Id:`, messageMetadata.messageId);
        if (messageMetadata.parentMessageIds) {
            for (let i = 0; i < messageMetadata.parentMessageIds.length; i++) {
                logger(`${prefix}\tParent ${i + 1} Message Id:`, messageMetadata.parentMessageIds[i]);
            }
        }
        if (messageMetadata.isSolid !== undefined) {
            logger(`${prefix}\tIs Solid:`, messageMetadata.isSolid);
        }
        if (messageMetadata.milestoneIndex !== undefined) {
            logger(`${prefix}\tMilestone Index:`, messageMetadata.milestoneIndex);
        }
        if (messageMetadata.referencedByMilestoneIndex !== undefined) {
            logger(`${prefix}\tReferenced By Milestone Index:`, messageMetadata.referencedByMilestoneIndex);
        }
        logger(`${prefix}\tLedger Inclusion State:`, messageMetadata.ledgerInclusionState);
        if (messageMetadata.conflictReason !== undefined) {
            logger(`${prefix}\tConflict Reason:`, messageMetadata.conflictReason);
        }
        if (messageMetadata.shouldPromote !== undefined) {
            logger(`${prefix}\tShould Promote:`, messageMetadata.shouldPromote);
        }
        if (messageMetadata.shouldReattach !== undefined) {
            logger(`${prefix}\tShould Reattach:`, messageMetadata.shouldReattach);
        }
    }
    /**
     * Log a message to the console.
     * @param prefix The prefix for the output.
     * @param payload The payload.
     */
    function logPayload(prefix, payload) {
        if (payload) {
            if (payload.type === TRANSACTION_PAYLOAD_TYPE) {
                logTransactionPayload(prefix, payload);
            }
            else if (payload.type === MILESTONE_PAYLOAD_TYPE) {
                logMilestonePayload(prefix, payload);
            }
            else if (payload.type === INDEXATION_PAYLOAD_TYPE) {
                logIndexationPayload(prefix, payload);
            }
            else if (payload.type === RECEIPT_PAYLOAD_TYPE) {
                logReceiptPayload(prefix, payload);
            }
            else if (payload.type === TREASURY_TRANSACTION_PAYLOAD_TYPE) {
                logTreasuryTransactionPayload(prefix, payload);
            }
        }
    }
    /**
     * Log a transaction payload to the console.
     * @param prefix The prefix for the output.
     * @param payload The payload.
     */
    function logTransactionPayload(prefix, payload) {
        if (payload) {
            logger(`${prefix}Transaction Payload`);
            if (payload.essence.type === TRANSACTION_ESSENCE_TYPE) {
                if (payload.essence.inputs) {
                    logger(`${prefix}\tInputs:`, payload.essence.inputs.length);
                    for (const input of payload.essence.inputs) {
                        logInput(`${prefix}\t\t`, input);
                    }
                }
                if (payload.essence.outputs) {
                    logger(`${prefix}\tOutputs:`, payload.essence.outputs.length);
                    for (const output of payload.essence.outputs) {
                        logOutput(`${prefix}\t\t`, output);
                    }
                }
            }
            if (payload.unlockBlocks) {
                logger(`${prefix}\tUnlock Blocks:`, payload.unlockBlocks.length);
                for (const unlockBlock of payload.unlockBlocks) {
                    logUnlockBlock(`${prefix}\t\t`, unlockBlock);
                }
            }
        }
    }
    /**
     * Log a indexation payload to the console.
     * @param prefix The prefix for the output.
     * @param payload The payload.
     */
    function logIndexationPayload(prefix, payload) {
        if (payload) {
            logger(`${prefix}Indexation Payload`);
            logger(`${prefix}\tIndex:`, util_js.Converter.hexToUtf8(payload.index));
            logger(`${prefix}\tData:`, payload.data ? util_js.Converter.hexToUtf8(payload.data) : "None");
        }
    }
    /**
     * Log a milestone payload to the console.
     * @param prefix The prefix for the output.
     * @param payload The payload.
     */
    function logMilestonePayload(prefix, payload) {
        if (payload) {
            logger(`${prefix}Milestone Payload`);
            logger(`${prefix}\tIndex:`, payload.index);
            logger(`${prefix}\tTimestamp:`, payload.timestamp);
            for (let i = 0; i < payload.parentMessageIds.length; i++) {
                logger(`${prefix}\tParent ${i + 1}:`, payload.parentMessageIds[i]);
            }
            logger(`${prefix}\tInclusion Merkle Proof:`, payload.inclusionMerkleProof);
            if (payload.nextPoWScore) {
                logger(`${prefix}\tNext PoW Score:`, payload.nextPoWScore);
            }
            if (payload.nextPoWScoreMilestoneIndex) {
                logger(`${prefix}\tNext PoW Score Milestone Index:`, payload.nextPoWScoreMilestoneIndex);
            }
            logger(`${prefix}\tPublic Keys:`, payload.publicKeys);
            logger(`${prefix}\tSignatures:`, payload.signatures);
            logReceiptPayload(`${prefix}\t`, payload.receipt);
        }
    }
    /**
     * Log a receipt payload to the console.
     * @param prefix The prefix for the output.
     * @param payload The payload.
     */
    function logReceiptPayload(prefix, payload) {
        if (payload) {
            logger(`${prefix}Receipt Payload`);
            logger(`${prefix}\tMigrated At:`, payload.migratedAt);
            logger(`${prefix}\tFinal:`, payload.final);
            logger(`${prefix}\tFunds:`, payload.funds.length);
            for (const funds of payload.funds) {
                logFunds(`${prefix}\t\t`, funds);
            }
            logTreasuryTransactionPayload(`${prefix}\t\t`, payload.transaction);
        }
    }
    /**
     * Log a treasury transaction payload to the console.
     * @param prefix The prefix for the output.
     * @param payload The payload.
     */
    function logTreasuryTransactionPayload(prefix, payload) {
        if (payload) {
            logger(`${prefix}Treasury Transaction Payload`);
            logInput(prefix, payload.input);
            logOutput(prefix, payload.output);
        }
    }
    /**
     * Log an address to the console.
     * @param prefix The prefix for the output.
     * @param address The address to log.
     */
    function logAddress(prefix, address) {
        if ((address === null || address === void 0 ? void 0 : address.type) === ED25519_ADDRESS_TYPE) {
            logger(`${prefix}Ed25519 Address`);
            logger(`${prefix}\tAddress:`, address.address);
        }
        else if ((address === null || address === void 0 ? void 0 : address.type) === BLS_ADDRESS_TYPE) {
            logger(`${prefix}BLS Address`);
            logger(`${prefix}\tAddress:`, address.address);
        }
        else if ((address === null || address === void 0 ? void 0 : address.type) === ALIAS_ADDRESS_TYPE) {
            logger(`${prefix}Alias Address`);
            logger(`${prefix}\tAddress:`, address.address);
        }
        else if ((address === null || address === void 0 ? void 0 : address.type) === NFT_ADDRESS_TYPE) {
            logger(`${prefix}NFT Address`);
            logger(`${prefix}\tAddress:`, address.address);
        }
    }
    /**
     * Log signature to the console.
     * @param prefix The prefix for the output.
     * @param signature The signature to log.
     */
    function logSignature(prefix, signature) {
        if ((signature === null || signature === void 0 ? void 0 : signature.type) === ED25519_SIGNATURE_TYPE) {
            logger(`${prefix}Ed25519 Signature`);
            logger(`${prefix}\tPublic Key:`, signature.publicKey);
            logger(`${prefix}\tSignature:`, signature.signature);
        }
    }
    /**
     * Log input to the console.
     * @param prefix The prefix for the output.
     * @param input The input to log.
     */
    function logInput(prefix, input) {
        if (input) {
            if (input.type === UTXO_INPUT_TYPE) {
                logger(`${prefix}UTXO Input`);
                logger(`${prefix}\tTransaction Id:`, input.transactionId);
                logger(`${prefix}\tTransaction Output Index:`, input.transactionOutputIndex);
            }
            else if (input.type === TREASURY_INPUT_TYPE) {
                logger(`${prefix}Treasury Input`);
                logger(`${prefix}\tMilestone Hash:`, input.milestoneId);
            }
        }
    }
    /**
     * Log output to the console.
     * @param prefix The prefix for the output.
     * @param output The output to log.
     */
    function logOutput(prefix, output) {
        if (output) {
            if (output.type === SIMPLE_OUTPUT_TYPE) {
                logger(`${prefix}Signature Locked Single Output`);
                logAddress(`${prefix}\t\t`, output.address);
                logger(`${prefix}\t\tAmount:`, output.amount);
            }
            else if (output.type === SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE) {
                logger(`${prefix}Signature Locked Dust Allowance Output`);
                logAddress(`${prefix}\t\t`, output.address);
                logger(`${prefix}\t\tAmount:`, output.amount);
            }
            else if (output.type === TREASURY_OUTPUT_TYPE) {
                logger(`${prefix}Treasury Output`);
                logger(`${prefix}\t\tAmount:`, output.amount);
            }
            else if (output.type === EXTENDED_OUTPUT_TYPE) {
                logger(`${prefix}Extended Output`);
                logAddress(`${prefix}\t\tS`, output.address);
                logger(`${prefix}\t\tAmount:`, output.amount);
                logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
                logFeatureBlocks(`${prefix}\t\t`, output.blocks);
            }
            else if (output.type === ALIAS_OUTPUT_TYPE) {
                logger(`${prefix}Alias Output`);
                logger(`${prefix}\t\tAmount:`, output.amount);
                logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
                logger(`${prefix}\t\tAlias Id:`, output.aliasId);
                logger(`${prefix}State Controller`);
                logAddress(`${prefix}\t\t`, output.stateController);
                logger(`${prefix}Governance Controller`);
                logAddress(`${prefix}\t\t`, output.governanceController);
                logger(`${prefix}\t\tState Index:`, output.stateIndex);
                logger(`${prefix}\t\tState Metadata:`, output.stateMetadata);
                logger(`${prefix}\t\tFoundry Counter:`, output.foundryCounter);
                logFeatureBlocks(`${prefix}\t\t`, output.blocks);
            }
            else if (output.type === FOUNDRY_OUTPUT_TYPE) {
                logger(`${prefix}Foundry Output`);
                logger(`${prefix}\t\tAmount:`, output.amount);
                logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
                logAddress(`${prefix}\t\tS`, output.address);
                logger(`${prefix}\t\tSerial Number:`, output.serialNumber);
                logger(`${prefix}\t\tToken Tag:`, output.tokenTag);
                logger(`${prefix}\t\tCirculating Supply:`, output.circulatingSupply);
                logger(`${prefix}\t\tMaximum Supply:`, output.maximumSupply);
                logger(`${prefix}State Controller`);
                logTokenScheme(`${prefix}\t\t`, output.tokenScheme);
                logFeatureBlocks(`${prefix}\t\t`, output.blocks);
            }
            else if (output.type === NFT_OUTPUT_TYPE) {
                logger(`${prefix}NFT Output`);
                logAddress(`${prefix}\t\tS`, output.address);
                logger(`${prefix}\t\tAmount:`, output.amount);
                logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
                logger(`${prefix}\t\tNFT Id:`, output.nftId);
                logger(`${prefix}\t\tImmutable Data:`, output.immutableData);
                logFeatureBlocks(`${prefix}\t\t`, output.blocks);
            }
        }
    }
    /**
     * Log unlock block to the console.
     * @param prefix The prefix for the output.
     * @param unlockBlock The unlock block to log.
     */
    function logUnlockBlock(prefix, unlockBlock) {
        if (unlockBlock) {
            if (unlockBlock.type === SIGNATURE_UNLOCK_BLOCK_TYPE) {
                logger(`${prefix}\tSignature Unlock Block`);
                logSignature(`${prefix}\t\t`, unlockBlock.signature);
            }
            else if (unlockBlock.type === REFERENCE_UNLOCK_BLOCK_TYPE) {
                logger(`${prefix}\tReference Unlock Block`);
                logger(`${prefix}\t\tReference:`, unlockBlock.reference);
            }
            else if (unlockBlock.type === ALIAS_UNLOCK_BLOCK_TYPE) {
                logger(`${prefix}\tAlias Unlock Block`);
                logger(`${prefix}\t\tReference:`, unlockBlock.reference);
            }
            else if (unlockBlock.type === NFT_UNLOCK_BLOCK_TYPE) {
                logger(`${prefix}\tNFT Unlock Block`);
                logger(`${prefix}\t\tReference:`, unlockBlock.reference);
            }
        }
    }
    /**
     * Log fund to the console.
     * @param prefix The prefix for the output.
     * @param fund The fund to log.
     */
    function logFunds(prefix, fund) {
        if (fund) {
            logger(`${prefix}\tFund`);
            logger(`${prefix}\t\tTail Transaction Hash:`, fund.tailTransactionHash);
            logAddress(`${prefix}\t\t`, fund.address);
            logger(`${prefix}\t\tDeposit:`, fund.deposit);
        }
    }
    /**
     * Log native tokens to the console.
     * @param prefix The prefix for the output.
     * @param nativeTokens The native tokens.
     */
    function logNativeTokens(prefix, nativeTokens) {
        logger(`${prefix}Native Tokens`);
        for (const nativeToken of nativeTokens) {
            logger(`${prefix}\t\tId:`, nativeToken.id);
            logger(`${prefix}\t\tAmount:`, nativeToken.amount);
        }
    }
    /**
     * Log token scheme to the console.
     * @param prefix The prefix for the output.
     * @param tokenScheme The native tokens.
     */
    function logTokenScheme(prefix, tokenScheme) {
        if (tokenScheme.type === SIMPLE_TOKEN_SCHEME_TYPE) {
            logger(`${prefix}\tSimple Token Scheme`);
        }
    }
    /**
     * Log feature blocks to the console.
     * @param prefix The prefix for the output.
     * @param featureBlocks The native tokens.
     */
    function logFeatureBlocks(prefix, featureBlocks) {
        logger(`${prefix}Native Tokens`);
        for (const featureBlock of featureBlocks) {
            logFeatureBlock(`${prefix}\t\t`, featureBlock);
        }
    }
    /**
     * Log feature block to the console.
     * @param prefix The prefix for the output.
     * @param featureBlock The native tokens.
     */
    function logFeatureBlock(prefix, featureBlock) {
        if (featureBlock.type === SENDER_FEATURE_BLOCK_TYPE) {
            logger(`${prefix}\tSender Feature Block`);
            logAddress(`${prefix}\t\t`, featureBlock.address);
        }
        else if (featureBlock.type === ISSUER_FEATURE_BLOCK_TYPE) {
            logger(`${prefix}\tIssuer Feature Block`);
            logAddress(`${prefix}\t\t`, featureBlock.address);
        }
        else if (featureBlock.type === DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE) {
            logger(`${prefix}\tDust Deposit Return Feature Block`);
            logger(`${prefix}\t\tAmount:`, featureBlock.amount);
        }
        else if (featureBlock.type === TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
            logger(`${prefix}\tTimelock Milestone Index Feature Block`);
            logger(`${prefix}\t\tMilestone Index:`, featureBlock.milestoneIndex);
        }
        else if (featureBlock.type === TIMELOCK_UNIX_FEATURE_BLOCK_TYPE) {
            logger(`${prefix}\tTimelock Unix Feature Block`);
            logger(`${prefix}\t\tUnix Time:`, featureBlock.unixTime);
        }
        else if (featureBlock.type === EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
            logger(`${prefix}\tExpiration Milestone Index Feature Block`);
            logger(`${prefix}\t\tMilestone Index:`, featureBlock.milestoneIndex);
        }
        else if (featureBlock.type === EXPIRATION_UNIX_FEATURE_BLOCK_TYPE) {
            logger(`${prefix}\tExpiration Unix Feature Block`);
            logger(`${prefix}\t\tUnix Time:`, featureBlock.unixTime);
        }
        else if (featureBlock.type === METADATA_FEATURE_BLOCK_TYPE) {
            logger(`${prefix}\tMetadata Feature Block`);
            logger(`${prefix}\t\tData:`, featureBlock.data);
        }
        else if (featureBlock.type === INDEXATION_FEATURE_BLOCK_TYPE) {
            logger(`${prefix}\tIndexation Feature Block`);
            logger(`${prefix}\t\tIndexation Tag:`, featureBlock.tag);
        }
    }

    /**
     * Class to help with units formatting.
     */
    class UnitsHelper {
        /**
         * Format the value in the best units.
         * @param value The value to format.
         * @param decimalPlaces The number of decimal places to display.
         * @returns The formated value.
         */
        static formatBest(value, decimalPlaces = 2) {
            return UnitsHelper.formatUnits(value, UnitsHelper.calculateBest(value), decimalPlaces);
        }
        /**
         * Format the value in the best units.
         * @param value The value to format.
         * @param unit The unit to format with.
         * @param decimalPlaces The number of decimal places to display.
         * @returns The formated value.
         */
        static formatUnits(value, unit, decimalPlaces = 2) {
            if (!UnitsHelper.UNIT_MAP[unit]) {
                throw new Error(`Unrecognized unit ${unit}`);
            }
            if (!value) {
                return `0 ${unit}`;
            }
            return unit === "i"
                ? `${value} i`
                : `${UnitsHelper.convertUnits(value, "i", unit).toFixed(decimalPlaces)} ${unit}`;
        }
        /**
         * Format the value in the best units.
         * @param value The value to format.
         * @returns The best units for the value.
         */
        static calculateBest(value) {
            let bestUnits = "i";
            if (!value) {
                return bestUnits;
            }
            const checkLength = Math.abs(value).toString().length;
            if (checkLength > UnitsHelper.UNIT_MAP.Pi.dp) {
                bestUnits = "Pi";
            }
            else if (checkLength > UnitsHelper.UNIT_MAP.Ti.dp) {
                bestUnits = "Ti";
            }
            else if (checkLength > UnitsHelper.UNIT_MAP.Gi.dp) {
                bestUnits = "Gi";
            }
            else if (checkLength > UnitsHelper.UNIT_MAP.Mi.dp) {
                bestUnits = "Mi";
            }
            else if (checkLength > UnitsHelper.UNIT_MAP.Ki.dp) {
                bestUnits = "Ki";
            }
            return bestUnits;
        }
        /**
         * Convert the value to different units.
         * @param value The value to convert.
         * @param fromUnit The form unit.
         * @param toUnit The to unit.
         * @returns The formatted unit.
         */
        static convertUnits(value, fromUnit, toUnit) {
            if (!value) {
                return 0;
            }
            if (!UnitsHelper.UNIT_MAP[fromUnit]) {
                throw new Error(`Unrecognized fromUnit ${fromUnit}`);
            }
            if (!UnitsHelper.UNIT_MAP[toUnit]) {
                throw new Error(`Unrecognized toUnit ${toUnit}`);
            }
            if (fromUnit === "i" && value % 1 !== 0) {
                throw new Error("If fromUnit is 'i' the value must be an integer value");
            }
            if (fromUnit === toUnit) {
                return Number(value);
            }
            const multiplier = value < 0 ? -1 : 1;
            const scaledValue = (Math.abs(Number(value)) * UnitsHelper.UNIT_MAP[fromUnit].val) / UnitsHelper.UNIT_MAP[toUnit].val;
            const numDecimals = UnitsHelper.UNIT_MAP[toUnit].dp;
            // We cant use toFixed to just convert the new value to a string with
            // fixed decimal places as it will round, which we don't want
            // instead we want to convert the value to a string and manually
            // truncate the number of digits after the decimal
            // Unfortunately large numbers end up in scientific notation with
            // the regular toString() so we use a custom conversion.
            let fixed = scaledValue.toString();
            if (fixed.includes("e")) {
                fixed = scaledValue.toFixed(Number.parseInt(fixed.split("-")[1], 10));
            }
            // Now we have the number as a full string we can split it into
            // whole and decimals parts
            const parts = fixed.split(".");
            if (parts.length === 1) {
                parts.push("0");
            }
            // Now truncate the decimals by the number allowed on the toUnit
            parts[1] = parts[1].slice(0, numDecimals);
            // Finally join the parts and convert back to a real number
            return Number.parseFloat(`${parts[0]}.${parts[1]}`) * multiplier;
        }
    }
    /**
     * Map units.
     */
    UnitsHelper.UNIT_MAP = {
        i: { val: 1, dp: 0 },
        Ki: { val: 1000, dp: 3 },
        Mi: { val: 1000000, dp: 6 },
        Gi: { val: 1000000000, dp: 9 },
        Ti: { val: 1000000000000, dp: 12 },
        Pi: { val: 1000000000000000, dp: 15 }
    };

    exports.ALIAS_ADDRESS_LENGTH = ALIAS_ADDRESS_LENGTH;
    exports.ALIAS_ADDRESS_TYPE = ALIAS_ADDRESS_TYPE;
    exports.ALIAS_ID_LENGTH = ALIAS_ID_LENGTH;
    exports.ALIAS_OUTPUT_TYPE = ALIAS_OUTPUT_TYPE;
    exports.ALIAS_UNLOCK_BLOCK_TYPE = ALIAS_UNLOCK_BLOCK_TYPE;
    exports.ARRAY_LENGTH = ARRAY_LENGTH;
    exports.B1T6 = B1T6;
    exports.BLS_ADDRESS_LENGTH = BLS_ADDRESS_LENGTH;
    exports.BLS_ADDRESS_TYPE = BLS_ADDRESS_TYPE;
    exports.Bech32Helper = Bech32Helper;
    exports.CONFLICT_REASON_STRINGS = CONFLICT_REASON_STRINGS;
    exports.ClientError = ClientError;
    exports.DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE = DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE;
    exports.ED25519_ADDRESS_TYPE = ED25519_ADDRESS_TYPE;
    exports.ED25519_SEED_TYPE = ED25519_SEED_TYPE;
    exports.ED25519_SIGNATURE_TYPE = ED25519_SIGNATURE_TYPE;
    exports.EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE = EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE;
    exports.EXPIRATION_UNIX_FEATURE_BLOCK_TYPE = EXPIRATION_UNIX_FEATURE_BLOCK_TYPE;
    exports.EXTENDED_OUTPUT_TYPE = EXTENDED_OUTPUT_TYPE;
    exports.Ed25519Address = Ed25519Address;
    exports.Ed25519Seed = Ed25519Seed;
    exports.FOUNDRY_OUTPUT_TYPE = FOUNDRY_OUTPUT_TYPE;
    exports.INDEXATION_FEATURE_BLOCK_TYPE = INDEXATION_FEATURE_BLOCK_TYPE;
    exports.INDEXATION_PAYLOAD_TYPE = INDEXATION_PAYLOAD_TYPE;
    exports.IOTA_BIP44_BASE_PATH = IOTA_BIP44_BASE_PATH;
    exports.ISSUER_FEATURE_BLOCK_TYPE = ISSUER_FEATURE_BLOCK_TYPE;
    exports.LocalPowProvider = LocalPowProvider;
    exports.MAX_FUNDS_COUNT = MAX_FUNDS_COUNT;
    exports.MAX_INPUT_COUNT = MAX_INPUT_COUNT;
    exports.MAX_MESSAGE_LENGTH = MAX_MESSAGE_LENGTH;
    exports.MAX_NUMBER_PARENTS = MAX_NUMBER_PARENTS;
    exports.MAX_OUTPUT_COUNT = MAX_OUTPUT_COUNT;
    exports.MERKLE_PROOF_LENGTH = MERKLE_PROOF_LENGTH;
    exports.MESSAGE_ID_LENGTH = MESSAGE_ID_LENGTH;
    exports.METADATA_FEATURE_BLOCK_TYPE = METADATA_FEATURE_BLOCK_TYPE;
    exports.MILESTONE_PAYLOAD_TYPE = MILESTONE_PAYLOAD_TYPE;
    exports.MIN_ADDRESS_LENGTH = MIN_ADDRESS_LENGTH;
    exports.MIN_ALIAS_ADDRESS_LENGTH = MIN_ALIAS_ADDRESS_LENGTH;
    exports.MIN_ALIAS_OUTPUT_LENGTH = MIN_ALIAS_OUTPUT_LENGTH;
    exports.MIN_ALIAS_UNLOCK_BLOCK_LENGTH = MIN_ALIAS_UNLOCK_BLOCK_LENGTH;
    exports.MIN_BLS_ADDRESS_LENGTH = MIN_BLS_ADDRESS_LENGTH;
    exports.MIN_DUST_DEPOSIT_RETURN_FEATURE_BLOCK_LENGTH = MIN_DUST_DEPOSIT_RETURN_FEATURE_BLOCK_LENGTH;
    exports.MIN_ED25519_ADDRESS_LENGTH = MIN_ED25519_ADDRESS_LENGTH;
    exports.MIN_ED25519_SIGNATURE_LENGTH = MIN_ED25519_SIGNATURE_LENGTH;
    exports.MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH = MIN_EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH;
    exports.MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH = MIN_EXPIRATION_UNIX_FEATURE_BLOCK_LENGTH;
    exports.MIN_EXTENDED_OUTPUT_LENGTH = MIN_EXTENDED_OUTPUT_LENGTH;
    exports.MIN_FEATURE_BLOCKS_LENGTH = MIN_FEATURE_BLOCKS_LENGTH;
    exports.MIN_FEATURE_BLOCK_LENGTH = MIN_FEATURE_BLOCK_LENGTH;
    exports.MIN_FOUNDRY_OUTPUT_LENGTH = MIN_FOUNDRY_OUTPUT_LENGTH;
    exports.MIN_INDEXATION_FEATURE_BLOCK_LENGTH = MIN_INDEXATION_FEATURE_BLOCK_LENGTH;
    exports.MIN_INPUT_COUNT = MIN_INPUT_COUNT;
    exports.MIN_INPUT_LENGTH = MIN_INPUT_LENGTH;
    exports.MIN_ISSUER_FEATURE_BLOCK_LENGTH = MIN_ISSUER_FEATURE_BLOCK_LENGTH;
    exports.MIN_METADATA_FEATURE_BLOCK_LENGTH = MIN_METADATA_FEATURE_BLOCK_LENGTH;
    exports.MIN_MIGRATED_FUNDS_LENGTH = MIN_MIGRATED_FUNDS_LENGTH;
    exports.MIN_NFT_ADDRESS_LENGTH = MIN_NFT_ADDRESS_LENGTH;
    exports.MIN_NFT_OUTPUT_LENGTH = MIN_NFT_OUTPUT_LENGTH;
    exports.MIN_NFT_UNLOCK_BLOCK_LENGTH = MIN_NFT_UNLOCK_BLOCK_LENGTH;
    exports.MIN_NUMBER_PARENTS = MIN_NUMBER_PARENTS;
    exports.MIN_OUTPUT_COUNT = MIN_OUTPUT_COUNT;
    exports.MIN_OUTPUT_LENGTH = MIN_OUTPUT_LENGTH;
    exports.MIN_PAYLOAD_LENGTH = MIN_PAYLOAD_LENGTH;
    exports.MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = MIN_REFERENCE_UNLOCK_BLOCK_LENGTH;
    exports.MIN_SENDER_FEATURE_BLOCK_LENGTH = MIN_SENDER_FEATURE_BLOCK_LENGTH;
    exports.MIN_SIGNATURE_LENGTH = MIN_SIGNATURE_LENGTH;
    exports.MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH;
    exports.MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH = MIN_SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_LENGTH;
    exports.MIN_SIMPLE_OUTPUT_LENGTH = MIN_SIMPLE_OUTPUT_LENGTH;
    exports.MIN_SIMPLE_TOKEN_SCHEME_LENGTH = MIN_SIMPLE_TOKEN_SCHEME_LENGTH;
    exports.MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH = MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH;
    exports.MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH = MIN_TIMELOCK_UNIX_FEATURE_BLOCK_LENGTH;
    exports.MIN_TOKEN_SCHEME_LENGTH = MIN_TOKEN_SCHEME_LENGTH;
    exports.MIN_TRANSACTION_ESSENCE_LENGTH = MIN_TRANSACTION_ESSENCE_LENGTH;
    exports.MIN_TREASURY_INPUT_LENGTH = MIN_TREASURY_INPUT_LENGTH;
    exports.MIN_TREASURY_OUTPUT_LENGTH = MIN_TREASURY_OUTPUT_LENGTH;
    exports.MIN_UNLOCK_BLOCK_LENGTH = MIN_UNLOCK_BLOCK_LENGTH;
    exports.MIN_UTXO_INPUT_LENGTH = MIN_UTXO_INPUT_LENGTH;
    exports.NFT_ADDRESS_LENGTH = NFT_ADDRESS_LENGTH;
    exports.NFT_ADDRESS_TYPE = NFT_ADDRESS_TYPE;
    exports.NFT_ID_LENGTH = NFT_ID_LENGTH;
    exports.NFT_OUTPUT_TYPE = NFT_OUTPUT_TYPE;
    exports.NFT_UNLOCK_BLOCK_TYPE = NFT_UNLOCK_BLOCK_TYPE;
    exports.PowHelper = PowHelper;
    exports.RECEIPT_PAYLOAD_TYPE = RECEIPT_PAYLOAD_TYPE;
    exports.REFERENCE_UNLOCK_BLOCK_TYPE = REFERENCE_UNLOCK_BLOCK_TYPE;
    exports.SENDER_FEATURE_BLOCK_TYPE = SENDER_FEATURE_BLOCK_TYPE;
    exports.SIGNATURE_UNLOCK_BLOCK_TYPE = SIGNATURE_UNLOCK_BLOCK_TYPE;
    exports.SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE = SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE;
    exports.SIMPLE_OUTPUT_TYPE = SIMPLE_OUTPUT_TYPE;
    exports.SIMPLE_TOKEN_SCHEME_TYPE = SIMPLE_TOKEN_SCHEME_TYPE;
    exports.SMALL_TYPE_LENGTH = SMALL_TYPE_LENGTH;
    exports.STRING_LENGTH = STRING_LENGTH;
    exports.SingleNodeClient = SingleNodeClient;
    exports.TAIL_HASH_LENGTH = TAIL_HASH_LENGTH;
    exports.TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE = TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE;
    exports.TIMELOCK_UNIX_FEATURE_BLOCK_TYPE = TIMELOCK_UNIX_FEATURE_BLOCK_TYPE;
    exports.TRANSACTION_ESSENCE_TYPE = TRANSACTION_ESSENCE_TYPE;
    exports.TRANSACTION_ID_LENGTH = TRANSACTION_ID_LENGTH;
    exports.TRANSACTION_PAYLOAD_TYPE = TRANSACTION_PAYLOAD_TYPE;
    exports.TREASURY_INPUT_TYPE = TREASURY_INPUT_TYPE;
    exports.TREASURY_OUTPUT_TYPE = TREASURY_OUTPUT_TYPE;
    exports.TREASURY_TRANSACTION_PAYLOAD_TYPE = TREASURY_TRANSACTION_PAYLOAD_TYPE;
    exports.TYPE_LENGTH = TYPE_LENGTH;
    exports.UINT16_SIZE = UINT16_SIZE;
    exports.UINT256_SIZE = UINT256_SIZE;
    exports.UINT32_SIZE = UINT32_SIZE;
    exports.UINT64_SIZE = UINT64_SIZE;
    exports.UINT8_SIZE = UINT8_SIZE;
    exports.UTXO_INPUT_TYPE = UTXO_INPUT_TYPE;
    exports.UnitsHelper = UnitsHelper;
    exports.buildTransactionPayload = buildTransactionPayload;
    exports.calculateInputs = calculateInputs;
    exports.deserializeAddress = deserializeAddress;
    exports.deserializeAliasAddress = deserializeAliasAddress;
    exports.deserializeAliasOutput = deserializeAliasOutput;
    exports.deserializeAliasUnlockBlock = deserializeAliasUnlockBlock;
    exports.deserializeBlsAddress = deserializeBlsAddress;
    exports.deserializeDustDepositReturnFeatureBlock = deserializeDustDepositReturnFeatureBlock;
    exports.deserializeEd25519Address = deserializeEd25519Address;
    exports.deserializeEd25519Signature = deserializeEd25519Signature;
    exports.deserializeExpirationMilestoneIndexFeatureBlock = deserializeExpirationMilestoneIndexFeatureBlock;
    exports.deserializeExpirationUnixFeatureBlock = deserializeExpirationUnixFeatureBlock;
    exports.deserializeExtendedOutput = deserializeExtendedOutput;
    exports.deserializeFeatureBlock = deserializeFeatureBlock;
    exports.deserializeFeatureBlocks = deserializeFeatureBlocks;
    exports.deserializeFoundryOutput = deserializeFoundryOutput;
    exports.deserializeFunds = deserializeFunds;
    exports.deserializeIndexationFeatureBlock = deserializeIndexationFeatureBlock;
    exports.deserializeInput = deserializeInput;
    exports.deserializeInputs = deserializeInputs;
    exports.deserializeIssuerFeatureBlock = deserializeIssuerFeatureBlock;
    exports.deserializeMessage = deserializeMessage;
    exports.deserializeMetadataFeatureBlock = deserializeMetadataFeatureBlock;
    exports.deserializeMigratedFunds = deserializeMigratedFunds;
    exports.deserializeNftAddress = deserializeNftAddress;
    exports.deserializeNftOutput = deserializeNftOutput;
    exports.deserializeNftUnlockBlock = deserializeNftUnlockBlock;
    exports.deserializeOutput = deserializeOutput;
    exports.deserializeOutputs = deserializeOutputs;
    exports.deserializePayload = deserializePayload;
    exports.deserializeReferenceUnlockBlock = deserializeReferenceUnlockBlock;
    exports.deserializeSenderFeatureBlock = deserializeSenderFeatureBlock;
    exports.deserializeSigLockedDustAllowanceOutput = deserializeSigLockedDustAllowanceOutput;
    exports.deserializeSignature = deserializeSignature;
    exports.deserializeSignatureUnlockBlock = deserializeSignatureUnlockBlock;
    exports.deserializeSimpleOutput = deserializeSimpleOutput;
    exports.deserializeSimpleTokenScheme = deserializeSimpleTokenScheme;
    exports.deserializeTimelockMilestoneIndexFeatureBlock = deserializeTimelockMilestoneIndexFeatureBlock;
    exports.deserializeTimelockUnixFeatureBlock = deserializeTimelockUnixFeatureBlock;
    exports.deserializeTokenScheme = deserializeTokenScheme;
    exports.deserializeTransactionEssence = deserializeTransactionEssence;
    exports.deserializeTreasuryInput = deserializeTreasuryInput;
    exports.deserializeTreasuryOutput = deserializeTreasuryOutput;
    exports.deserializeUTXOInput = deserializeUTXOInput;
    exports.deserializeUnlockBlock = deserializeUnlockBlock;
    exports.deserializeUnlockBlocks = deserializeUnlockBlocks;
    exports.generateBip44Address = generateBip44Address;
    exports.generateBip44Path = generateBip44Path;
    exports.getBalance = getBalance;
    exports.getUnspentAddress = getUnspentAddress;
    exports.getUnspentAddresses = getUnspentAddresses;
    exports.getUnspentAddressesWithAddressGenerator = getUnspentAddressesWithAddressGenerator;
    exports.logAddress = logAddress;
    exports.logFeatureBlock = logFeatureBlock;
    exports.logFeatureBlocks = logFeatureBlocks;
    exports.logFunds = logFunds;
    exports.logIndexationPayload = logIndexationPayload;
    exports.logInfo = logInfo;
    exports.logInput = logInput;
    exports.logMessage = logMessage;
    exports.logMessageMetadata = logMessageMetadata;
    exports.logMilestonePayload = logMilestonePayload;
    exports.logNativeTokens = logNativeTokens;
    exports.logOutput = logOutput;
    exports.logPayload = logPayload;
    exports.logReceiptPayload = logReceiptPayload;
    exports.logSignature = logSignature;
    exports.logTips = logTips;
    exports.logTokenScheme = logTokenScheme;
    exports.logTransactionPayload = logTransactionPayload;
    exports.logTreasuryTransactionPayload = logTreasuryTransactionPayload;
    exports.logUnlockBlock = logUnlockBlock;
    exports.promote = promote;
    exports.reattach = reattach;
    exports.retrieveData = retrieveData;
    exports.retry = retry;
    exports.send = send;
    exports.sendAdvanced = sendAdvanced;
    exports.sendData = sendData;
    exports.sendEd25519 = sendEd25519;
    exports.sendMultiple = sendMultiple;
    exports.sendMultipleEd25519 = sendMultipleEd25519;
    exports.sendWithAddressGenerator = sendWithAddressGenerator;
    exports.serializeAddress = serializeAddress;
    exports.serializeAliasAddress = serializeAliasAddress;
    exports.serializeAliasOutput = serializeAliasOutput;
    exports.serializeAliasUnlockBlock = serializeAliasUnlockBlock;
    exports.serializeBlsAddress = serializeBlsAddress;
    exports.serializeDustDepositReturnFeatureBlock = serializeDustDepositReturnFeatureBlock;
    exports.serializeEd25519Address = serializeEd25519Address;
    exports.serializeEd25519Signature = serializeEd25519Signature;
    exports.serializeExpirationMilestoneIndexFeatureBlock = serializeExpirationMilestoneIndexFeatureBlock;
    exports.serializeExpirationUnixFeatureBlock = serializeExpirationUnixFeatureBlock;
    exports.serializeExtendedOutput = serializeExtendedOutput;
    exports.serializeFeatureBlock = serializeFeatureBlock;
    exports.serializeFeatureBlocks = serializeFeatureBlocks;
    exports.serializeFoundryOutput = serializeFoundryOutput;
    exports.serializeFunds = serializeFunds;
    exports.serializeIndexationFeatureBlock = serializeIndexationFeatureBlock;
    exports.serializeInput = serializeInput;
    exports.serializeInputs = serializeInputs;
    exports.serializeIssuerFeatureBlock = serializeIssuerFeatureBlock;
    exports.serializeMessage = serializeMessage;
    exports.serializeMetadataFeatureBlock = serializeMetadataFeatureBlock;
    exports.serializeMigratedFunds = serializeMigratedFunds;
    exports.serializeNftAddress = serializeNftAddress;
    exports.serializeNftOutput = serializeNftOutput;
    exports.serializeNftUnlockBlock = serializeNftUnlockBlock;
    exports.serializeOutput = serializeOutput;
    exports.serializeOutputs = serializeOutputs;
    exports.serializePayload = serializePayload;
    exports.serializeReferenceUnlockBlock = serializeReferenceUnlockBlock;
    exports.serializeSenderFeatureBlock = serializeSenderFeatureBlock;
    exports.serializeSigLockedDustAllowanceOutput = serializeSigLockedDustAllowanceOutput;
    exports.serializeSignature = serializeSignature;
    exports.serializeSignatureUnlockBlock = serializeSignatureUnlockBlock;
    exports.serializeSimpleOutput = serializeSimpleOutput;
    exports.serializeSimpleTokenScheme = serializeSimpleTokenScheme;
    exports.serializeTimelockMilestoneIndexFeatureBlock = serializeTimelockMilestoneIndexFeatureBlock;
    exports.serializeTimelockUnixFeatureBlock = serializeTimelockUnixFeatureBlock;
    exports.serializeTokenScheme = serializeTokenScheme;
    exports.serializeTransactionEssence = serializeTransactionEssence;
    exports.serializeTreasuryInput = serializeTreasuryInput;
    exports.serializeTreasuryOutput = serializeTreasuryOutput;
    exports.serializeUTXOInput = serializeUTXOInput;
    exports.serializeUnlockBlock = serializeUnlockBlock;
    exports.serializeUnlockBlocks = serializeUnlockBlocks;
    exports.setLogger = setLogger;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
