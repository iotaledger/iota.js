// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeMessage, serializeMessage } from "../../src/binary/message";
import type { IEd25519Address } from "../../src/models/addresses/IEd25519Address";
import type { IBasicOutput } from "../../src/models/outputs/IBasicOutput";
import type { IMilestonePayload } from "../../src/models/payloads/IMilestonePayload";
import type { ITaggedDataPayload } from "../../src/models/payloads/ITaggedDataPayload";
import type { ITransactionPayload } from "../../src/models/payloads/ITransactionPayload";
import type { ISignatureUnlockBlock } from "../../src/models/unlockBlocks/ISignatureUnlockBlock";
import type { IAddressUnlockCondition } from "../../src/models/unlockConditions/IAddressUnlockCondition";

describe("Binary Message", () => {
    test("Can fail with underflow min", () => {
        const bytes = Uint8Array.from([]);
        expect(() => deserializeMessage(new ReadStream(bytes))).toThrow("less than the minimimum size");
    });

    test("Can fail with underflow max", () => {
        const bytes = new Uint8Array(45);
        expect(() => deserializeMessage(new ReadStream(bytes))).toThrow("less than the minimimum size");
    });

    test("Can succeed with valid data", () => {
        const buffer = Buffer.alloc(87);
        buffer.writeUInt8(1, 0);
        buffer.writeUInt8(2, 1);
        buffer.write("4594267ca0446739d5e4c6dcf060d640aafb68ab929aa2bb8c2bcdce8b3bc89e", 2, "hex");
        buffer.write("6901c7b37adbddfc3fc170773632489f263af4decc9ed5813c849a07319ecd73", 34, "hex");
        buffer.writeUInt32LE(8, 66); // Payload length
        buffer.writeUInt32LE(5, 70); // Payload type
        buffer.writeUInt8(0, 74); // Tag length
        buffer.writeUInt32LE(0, 75); // Data length
        buffer.writeBigUInt64LE(BigInt(0), 79); // Nonce
        const message = deserializeMessage(new ReadStream(buffer));
        expect(message.protocolVersion).toEqual(1);
        expect(message.parentMessageIds).toBeDefined();
        if (message.parentMessageIds) {
            expect(message.parentMessageIds[0]).toEqual(
                "0x4594267ca0446739d5e4c6dcf060d640aafb68ab929aa2bb8c2bcdce8b3bc89e"
            );
            expect(message.parentMessageIds[1]).toEqual(
                "0x6901c7b37adbddfc3fc170773632489f263af4decc9ed5813c849a07319ecd73"
            );
        }
        expect(message.nonce).toEqual("0");
    });

    test("Can fail with additional data", () => {
        const buffer = Buffer.alloc(88);
        buffer.writeUInt8(1, 0);
        buffer.writeUInt8(2, 1);
        buffer.write("4594267ca0446739d5e4c6dcf060d640aafb68ab929aa2bb8c2bcdce8b3bc89e", 2, "hex");
        buffer.write("6901c7b37adbddfc3fc170773632489f263af4decc9ed5813c849a07319ecd73", 34, "hex");
        buffer.writeUInt32LE(8, 66); // Payload length
        buffer.writeUInt32LE(5, 70); // Payload type
        buffer.writeUInt8(0, 74); // Tag length
        buffer.writeUInt32LE(0, 75); // Data length
        buffer.writeBigUInt64LE(BigInt(0), 79); // Nonce
        expect(() => deserializeMessage(new ReadStream(buffer))).toThrow("unused data");
    });

    test("Can succeed with milestone data", () => {
        const hex =
            "02021198a84730ce688bc7494714bed66bda74fe75320b23068a5caa77bf1f302ce1157af2243bdb7666b8ee3e0ebeeed0b0b998cf66735450bc8d63f4304317299eab01000007000000052801005f13506200000000021198a84730ce688bc7494714bed66bda74fe75320b23068a5caa77bf1f302ce1157af2243bdb7666b8ee3e0ebeeed0b0b998cf66735450bc8d63f4304317299e0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8000000000000000008001111111122222222000000000300d85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c9868dbdfa482065390b84e73a64c27ef597963bcf7972a455589615408a82e02ec3ddbe14fe90ab96e2e0ff164659f59b24c1bcf16582c0f3f26d9888880c0a80c00d9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f28b99f9bbee0e9f6326d7ab0b1df219c696991681a843d5e851619e0e9073753b7fa04e591d1abc1c746a21ee74b9b200d4d98a3f34281a84cbceb2fa86ec990500f9d9656a60049083eef61487632187b351294c1fa23d118060d813db6d03e8b6b284cc29e9810a76345bf5c60cc4967d67f1867f4cf51c0b9da1f4ac0b2f7e890ff73063ce46f74068f618cca35a4732c68ef2ee324fa7af940108f8d0e34c0976b6595555555555";
        const message = deserializeMessage(new ReadStream(Converter.hexToBytes(hex)));
        expect(message.protocolVersion).toEqual(2);
        expect(message.parentMessageIds).toBeDefined();
        if (message.parentMessageIds) {
            expect(message.parentMessageIds[0]).toEqual(
                "0x1198a84730ce688bc7494714bed66bda74fe75320b23068a5caa77bf1f302ce1"
            );
            expect(message.parentMessageIds[1]).toEqual(
                "0x157af2243bdb7666b8ee3e0ebeeed0b0b998cf66735450bc8d63f4304317299e"
            );
        }
        const payload = message.payload as IMilestonePayload;
        expect(payload.type).toEqual(7);
        expect(payload.index).toEqual(75781);
        expect(payload.timestamp).toEqual(1649415007);
        expect(payload.parentMessageIds[0]).toEqual("0x1198a84730ce688bc7494714bed66bda74fe75320b23068a5caa77bf1f302ce1");
        expect(payload.parentMessageIds[1]).toEqual("0x157af2243bdb7666b8ee3e0ebeeed0b0b998cf66735450bc8d63f4304317299e");
        expect(payload.inclusionMerkleProof).toEqual(
            "0x0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8"
        );
        expect(payload.nextPoWScore).toEqual(0);
        expect(payload.nextPoWScoreMilestoneIndex).toEqual(0);
        expect(payload.metadata).toEqual(
            "0x1111111122222222"
        );
        expect(payload.signatures.length).toEqual(3);
        expect(payload.signatures[0].type).toEqual(0);
        expect(payload.signatures[0].publicKey).toEqual(
            "0xd85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c98"
        );
        expect(payload.signatures[0].signature).toEqual(
            "0x68dbdfa482065390b84e73a64c27ef597963bcf7972a455589615408a82e02ec3ddbe14fe90ab96e2e0ff164659f59b24c1bcf16582c0f3f26d9888880c0a80c"
        );
        expect(payload.signatures[1].type).toEqual(0);
        expect(payload.signatures[1].publicKey).toEqual(
            "0xd9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f2"
        );
        expect(payload.signatures[1].signature).toEqual(
            "0x8b99f9bbee0e9f6326d7ab0b1df219c696991681a843d5e851619e0e9073753b7fa04e591d1abc1c746a21ee74b9b200d4d98a3f34281a84cbceb2fa86ec9905"
        );
        expect(payload.signatures[2].type).toEqual(0);
        expect(payload.signatures[2].publicKey).toEqual(
            "0xf9d9656a60049083eef61487632187b351294c1fa23d118060d813db6d03e8b6"
        );
        expect(payload.signatures[2].signature).toEqual(
            "0xb284cc29e9810a76345bf5c60cc4967d67f1867f4cf51c0b9da1f4ac0b2f7e890ff73063ce46f74068f618cca35a4732c68ef2ee324fa7af940108f8d0e34c09"
        );
        expect(message.nonce).toEqual("6148914691236804214");
    });

    test("Can succeed with tagged data", () => {
        const hex =
            "010226b9c0077037bf198b35306408e4a9b50430bdf0ea54f722cc4e7ce4f7ffba5e9eca185fb38d44471b0c396c6c147c3a2a4c590dc5dac6431b698c58dcce449a0f0000000500000003666f6f030000004261720000000000000000";
        const message = deserializeMessage(new ReadStream(Converter.hexToBytes(hex)));
        expect(message.protocolVersion).toEqual(1);
        expect(message.parentMessageIds).toBeDefined();
        if (message.parentMessageIds) {
            expect(message.parentMessageIds[0]).toEqual(
                "0x26b9c0077037bf198b35306408e4a9b50430bdf0ea54f722cc4e7ce4f7ffba5e"
            );
            expect(message.parentMessageIds[1]).toEqual(
                "0x9eca185fb38d44471b0c396c6c147c3a2a4c590dc5dac6431b698c58dcce449a"
            );
        }
        const payload = message.payload as ITaggedDataPayload;
        expect(payload.type).toEqual(5);
        expect(payload.tag).toBeDefined();
        if (payload.tag) {
            expect(Converter.hexToUtf8(payload.tag)).toEqual("foo");
        }
        expect(payload.data).toBeDefined();
        if (payload.data) {
            expect(Converter.hexToUtf8(payload.data)).toEqual("Bar");
        }
        expect(message.nonce).toEqual("0");
    });

    test("Can succeed with actual milestone data", () => {
        const hex =
            "02021198a84730ce688bc7494714bed66bda74fe75320b23068a5caa77bf1f302ce1157af2243bdb7666b8ee3e0ebeeed0b0b998cf66735450bc8d63f4304317299eab01000007000000052801005f13506200000000021198a84730ce688bc7494714bed66bda74fe75320b23068a5caa77bf1f302ce1157af2243bdb7666b8ee3e0ebeeed0b0b998cf66735450bc8d63f4304317299e0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8000000000000000008001111111122222222000000000300d85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c9868dbdfa482065390b84e73a64c27ef597963bcf7972a455589615408a82e02ec3ddbe14fe90ab96e2e0ff164659f59b24c1bcf16582c0f3f26d9888880c0a80c00d9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f28b99f9bbee0e9f6326d7ab0b1df219c696991681a843d5e851619e0e9073753b7fa04e591d1abc1c746a21ee74b9b200d4d98a3f34281a84cbceb2fa86ec990500f9d9656a60049083eef61487632187b351294c1fa23d118060d813db6d03e8b6b284cc29e9810a76345bf5c60cc4967d67f1867f4cf51c0b9da1f4ac0b2f7e890ff73063ce46f74068f618cca35a4732c68ef2ee324fa7af940108f8d0e34c0976b6595555555555";
        const message = deserializeMessage(new ReadStream(Converter.hexToBytes(hex)));

        const writeStream = new WriteStream();
        serializeMessage(writeStream, message);

        const finalHex = writeStream.finalHex();
        expect(hex).toEqual(finalHex);
    });

    test("Can succeed with actual transaction data", () => {
        const hex =
            "01024ccb0843016072b0d0d1c4265bc808ef8a80ae4ad70e10d6016e248e4e047235aac2a777c07473522122629124d7df647b2ea712386707e3687dd3a47cbdfa552401000006000000017b000000000000000100002367ec318426c9f5d1115a6ac96f6c3cd2e53443713e0b63f0c266cbda7444740100aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0200036400000000000000000100003eb1ed78d420c8318972b8b0839420f502b25356270a48a430cb55a5e323f7230003f95c2dd3f7df090000010000625d17d4a4b21cd5edeb57544b9d2d66ce22985fb61f17d1d7cae958d0068618000c0000000500000003666f6f000000000100000014fe414a9eccf9589b38c7c89a2fa5921b4b170ebefc04b6a812b3d02068cfd73163a90017ed5fe9530f52fb0d30836a453a37204f4d59e03012d82e0a946f31c930ac54f4a35aef9578b9dec9c12887404be353c5f7ebd88bcbefcc78e29c050000000000000000";
        const message = deserializeMessage(new ReadStream(Converter.hexToBytes(hex)));
        expect(message.protocolVersion).toEqual(1);
        expect(message.parentMessageIds).toBeDefined();
        if (message.parentMessageIds) {
            expect(message.parentMessageIds[0]).toEqual(
                "0x4ccb0843016072b0d0d1c4265bc808ef8a80ae4ad70e10d6016e248e4e047235"
            );
            expect(message.parentMessageIds[1]).toEqual(
                "0xaac2a777c07473522122629124d7df647b2ea712386707e3687dd3a47cbdfa55"
            );
        }
        const payload = message.payload as ITransactionPayload;
        expect(payload.type).toEqual(6);
        expect(payload.essence.type).toEqual(1);
        expect(payload.essence.networkId).toEqual("123");
        expect(payload.essence.inputs.length).toEqual(1);
        expect(payload.essence.inputs[0].type).toEqual(0);
        const utxoInput = payload.essence.inputs[0];
        expect(utxoInput.transactionId).toEqual("0x2367ec318426c9f5d1115a6ac96f6c3cd2e53443713e0b63f0c266cbda744474");
        expect(utxoInput.transactionOutputIndex).toEqual(1);
        expect(payload.essence.inputsCommitment).toEqual("0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        const basicOutput1 = payload.essence.outputs[0] as IBasicOutput;
        expect(payload.essence.outputs.length).toEqual(2);
        expect(basicOutput1.type).toEqual(3);
        expect(basicOutput1.unlockConditions.length).toEqual(1);
        const unlockCondition = basicOutput1.unlockConditions[0] as IAddressUnlockCondition;
        expect(unlockCondition.address.type).toEqual(0);
        expect((unlockCondition.address as IEd25519Address).pubKeyHash).toEqual(
            "0x3eb1ed78d420c8318972b8b0839420f502b25356270a48a430cb55a5e323f723"
        );
        expect(basicOutput1.amount).toEqual("100");

        const basicOutput2 = payload.essence.outputs[1] as IBasicOutput;
        expect(basicOutput2.type).toEqual(3);
        expect(basicOutput2.unlockConditions.length).toEqual(1);
        const unlockCondition2 = basicOutput2.unlockConditions[0] as IAddressUnlockCondition;
        expect(unlockCondition2.address.type).toEqual(0);
        expect((unlockCondition2.address as IEd25519Address).pubKeyHash).toEqual(
            "0x625d17d4a4b21cd5edeb57544b9d2d66ce22985fb61f17d1d7cae958d0068618"
        );
        expect(basicOutput2.amount).toEqual("2779530283277561");

        expect(payload.essence.payload).toBeDefined();
        if (payload.essence.payload) {
            expect(payload.essence.payload.type).toEqual(5);
            expect(payload.essence.payload.tag).toBeDefined();
            if (payload.essence.payload.tag) {
                expect(Converter.hexToUtf8(payload.essence.payload.tag)).toEqual("foo");
            }
        }

        expect(payload.unlockBlocks.length).toEqual(1);

        const sigUnlockBlock = payload.unlockBlocks[0] as ISignatureUnlockBlock;
        expect(sigUnlockBlock.type).toEqual(0);
        expect(sigUnlockBlock.signature.publicKey).toEqual(
            "0x14fe414a9eccf9589b38c7c89a2fa5921b4b170ebefc04b6a812b3d02068cfd7"
        );
        expect(sigUnlockBlock.signature.signature).toEqual(
            "0x3163a90017ed5fe9530f52fb0d30836a453a37204f4d59e03012d82e0a946f31c930ac54f4a35aef9578b9dec9c12887404be353c5f7ebd88bcbefcc78e29c05"
        );
        expect(message.nonce).toEqual("0");
    });
});
