"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARRAY_LENGTH = exports.STRING_LENGTH = exports.SMALL_TYPE_LENGTH = exports.TYPE_LENGTH = exports.MERKLE_PROOF_LENGTH = exports.TRANSACTION_ID_LENGTH = exports.MESSAGE_ID_LENGTH = exports.UINT64_SIZE = exports.UINT32_SIZE = exports.UINT16_SIZE = exports.BYTE_SIZE = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var blake2b_1 = require("../crypto/blake2b");
/**
 * Byte length for a byte field.
 */
exports.BYTE_SIZE = 1;
/**
 * Byte length for a uint16 field.
 */
exports.UINT16_SIZE = 2;
/**
 * Byte length for a uint32 field.
 */
exports.UINT32_SIZE = 4;
/**
 * Byte length for a uint64 field.
 */
exports.UINT64_SIZE = 8;
/**
 * Byte length for a message id.
 */
exports.MESSAGE_ID_LENGTH = blake2b_1.Blake2b.SIZE_256;
/**
 * Byte length for a transaction id.
 */
exports.TRANSACTION_ID_LENGTH = blake2b_1.Blake2b.SIZE_256;
/**
 * Byte length for a merkle prrof.
 */
exports.MERKLE_PROOF_LENGTH = blake2b_1.Blake2b.SIZE_256;
/**
 * Byte length for a type length.
 */
exports.TYPE_LENGTH = exports.UINT32_SIZE;
/**
 * Byte length for a small type length.
 */
exports.SMALL_TYPE_LENGTH = exports.BYTE_SIZE;
/**
 * Byte length for a string length.
 */
exports.STRING_LENGTH = exports.UINT16_SIZE;
/**
 * Byte length for an array length.
 */
exports.ARRAY_LENGTH = exports.UINT16_SIZE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyw2Q0FBNEM7QUFFNUM7O0dBRUc7QUFDVSxRQUFBLFNBQVMsR0FBVyxDQUFDLENBQUM7QUFFbkM7O0dBRUc7QUFDVSxRQUFBLFdBQVcsR0FBVyxDQUFDLENBQUM7QUFFckM7O0dBRUc7QUFDVSxRQUFBLFdBQVcsR0FBVyxDQUFDLENBQUM7QUFFckM7O0dBRUc7QUFDVSxRQUFBLFdBQVcsR0FBVyxDQUFDLENBQUM7QUFFckM7O0dBRUc7QUFDVSxRQUFBLGlCQUFpQixHQUFXLGlCQUFPLENBQUMsUUFBUSxDQUFDO0FBRTFEOztHQUVHO0FBQ1UsUUFBQSxxQkFBcUIsR0FBVyxpQkFBTyxDQUFDLFFBQVEsQ0FBQztBQUU5RDs7R0FFRztBQUNVLFFBQUEsbUJBQW1CLEdBQVcsaUJBQU8sQ0FBQyxRQUFRLENBQUM7QUFFNUQ7O0dBRUc7QUFDVSxRQUFBLFdBQVcsR0FBVyxtQkFBVyxDQUFDO0FBRS9DOztHQUVHO0FBQ1UsUUFBQSxpQkFBaUIsR0FBVyxpQkFBUyxDQUFDO0FBRW5EOztHQUVHO0FBQ1UsUUFBQSxhQUFhLEdBQVcsbUJBQVcsQ0FBQztBQUVqRDs7R0FFRztBQUNVLFFBQUEsWUFBWSxHQUFXLG1CQUFXLENBQUMifQ==