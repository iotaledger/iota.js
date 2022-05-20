// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeBlock, serializeBlock } from "../../src/binary/block";
import type { IEd25519Address } from "../../src/models/addresses/IEd25519Address";
import type { IBasicOutput } from "../../src/models/outputs/IBasicOutput";
import type { IMilestonePayload } from "../../src/models/payloads/IMilestonePayload";
import type { ITaggedDataPayload } from "../../src/models/payloads/ITaggedDataPayload";
import type { ITransactionPayload } from "../../src/models/payloads/ITransactionPayload";
import type { IAddressUnlockCondition } from "../../src/models/unlockConditions/IAddressUnlockCondition";
import type { ISignatureUnlock } from "../../src/models/unlocks/ISignatureUnlock";

describe("Binary Block", () => {
    test("Can fail with underflow min", () => {
        const bytes = Uint8Array.from([]);
        expect(() => deserializeBlock(new ReadStream(bytes))).toThrow("less than the minimimum size");
    });

    test("Can fail with underflow max", () => {
        const bytes = new Uint8Array(45);
        expect(() => deserializeBlock(new ReadStream(bytes))).toThrow("less than the minimimum size");
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
        const block = deserializeBlock(new ReadStream(buffer));
        expect(block.protocolVersion).toEqual(1);
        expect(block.parents).toBeDefined();
        if (block.parents) {
            expect(block.parents[0]).toEqual(
                "0x4594267ca0446739d5e4c6dcf060d640aafb68ab929aa2bb8c2bcdce8b3bc89e"
            );
            expect(block.parents[1]).toEqual(
                "0x6901c7b37adbddfc3fc170773632489f263af4decc9ed5813c849a07319ecd73"
            );
        }
        expect(block.nonce).toEqual("0");
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
        expect(() => deserializeBlock(new ReadStream(buffer))).toThrow("unused data");
    });

    test("Can succeed with milestone data", () => {
        const hex =
            "02026f06ca57be7b1d73ed1e663ab49b5291719bc128ea8f1e0b33f6584fe8be7f1cb2173cb608ac318c525f26ca5086f328dd123d9fc2d2ce09096191ff0d5700bbd5010000070000008b12000012888762027f00a2c19c2844ee776620172e4cb259140ef2781fc00fc500d4435accbd7a99026f06ca57be7b1d73ed1e663ab49b5291719bc128ea8f1e0b33f6584fe8be7f1cb2173cb608ac318c525f26ca5086f328dd123d9fc2d2ce09096191ff0d5700bbc411a029623bbc3271d2f256c23454ca66228aa6f14ad2a12e5f7688ebb4a2fd0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a80000000300d85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c988c96ebefea8f73e31403fcf0b92a99f197b06b24de83afd2b1f0622f2f81e729d6120eb7f2104c197c79a442b7c92f3d449e3f98257a8d76c4510d5fe286380000d9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f2b0787e398db0582855b9b157ec5298b705a2b1dde8682bf0c55020ece4c4734073c83db8d9983606684f539ecee9e74aff6e7aee52d7d267535b1ed733e96f0600f9d9656a60049083eef61487632187b351294c1fa23d118060d813db6d03e8b6a0f944e2a81f7b7c758fc7d9b8af9962181cbc02a334b3e2121bc1799fd20270046e5062a04a30b6f6278abe31c30bf5e372f6ae9bd9c72525f42d36a865cf0c0000000000000000";
        const block = deserializeBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(block.protocolVersion).toEqual(2);
        expect(block.parents).toBeDefined();
        if (block.parents) {
            expect(block.parents[0]).toEqual(
                "0x6f06ca57be7b1d73ed1e663ab49b5291719bc128ea8f1e0b33f6584fe8be7f1c"
            );
            expect(block.parents[1]).toEqual(
                "0xb2173cb608ac318c525f26ca5086f328dd123d9fc2d2ce09096191ff0d5700bb"
            );
        }
        const payload = block.payload as IMilestonePayload;
        expect(payload.type).toEqual(7);
        expect(payload.index).toEqual(4747);
        expect(payload.timestamp).toEqual(1653049362);
        expect(payload.protocolVersion).toEqual(2);
        expect(payload.previousMilestoneId).toEqual("0x7f00a2c19c2844ee776620172e4cb259140ef2781fc00fc500d4435accbd7a99");
        expect(payload.parents[0]).toEqual("0x6f06ca57be7b1d73ed1e663ab49b5291719bc128ea8f1e0b33f6584fe8be7f1c");
        expect(payload.parents[1]).toEqual("0xb2173cb608ac318c525f26ca5086f328dd123d9fc2d2ce09096191ff0d5700bb");
        expect(payload.inclusionMerkleRoot).toEqual(
            "0xc411a029623bbc3271d2f256c23454ca66228aa6f14ad2a12e5f7688ebb4a2fd"
        );
        expect(payload.appliedMerkleRoot).toEqual(
            "0x0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8"
        );
        expect(payload.signatures.length).toEqual(3);
        expect(payload.signatures[0].type).toEqual(0);
        expect(payload.signatures[0].publicKey).toEqual(
            "0xd85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c98"
        );
        expect(payload.signatures[0].signature).toEqual(
            "0x8c96ebefea8f73e31403fcf0b92a99f197b06b24de83afd2b1f0622f2f81e729d6120eb7f2104c197c79a442b7c92f3d449e3f98257a8d76c4510d5fe2863800"
        );
        expect(payload.signatures[1].type).toEqual(0);
        expect(payload.signatures[1].publicKey).toEqual(
            "0xd9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f2"
        );
        expect(payload.signatures[1].signature).toEqual(
            "0xb0787e398db0582855b9b157ec5298b705a2b1dde8682bf0c55020ece4c4734073c83db8d9983606684f539ecee9e74aff6e7aee52d7d267535b1ed733e96f06"
        );
        expect(payload.signatures[2].type).toEqual(0);
        expect(payload.signatures[2].publicKey).toEqual(
            "0xf9d9656a60049083eef61487632187b351294c1fa23d118060d813db6d03e8b6"
        );
        expect(payload.signatures[2].signature).toEqual(
            "0xa0f944e2a81f7b7c758fc7d9b8af9962181cbc02a334b3e2121bc1799fd20270046e5062a04a30b6f6278abe31c30bf5e372f6ae9bd9c72525f42d36a865cf0c"
        );
        expect(block.nonce).toEqual("0");
    });

    test("Can succeed with tagged data", () => {
        const hex =
            "010226b9c0077037bf198b35306408e4a9b50430bdf0ea54f722cc4e7ce4f7ffba5e9eca185fb38d44471b0c396c6c147c3a2a4c590dc5dac6431b698c58dcce449a0f0000000500000003666f6f030000004261720000000000000000";
        const block = deserializeBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(block.protocolVersion).toEqual(1);
        expect(block.parents).toBeDefined();
        if (block.parents) {
            expect(block.parents[0]).toEqual(
                "0x26b9c0077037bf198b35306408e4a9b50430bdf0ea54f722cc4e7ce4f7ffba5e"
            );
            expect(block.parents[1]).toEqual(
                "0x9eca185fb38d44471b0c396c6c147c3a2a4c590dc5dac6431b698c58dcce449a"
            );
        }
        const payload = block.payload as ITaggedDataPayload;
        expect(payload.type).toEqual(5);
        expect(payload.tag).toBeDefined();
        if (payload.tag) {
            expect(Converter.hexToUtf8(payload.tag)).toEqual("foo");
        }
        expect(payload.data).toBeDefined();
        if (payload.data) {
            expect(Converter.hexToUtf8(payload.data)).toEqual("Bar");
        }
        expect(block.nonce).toEqual("0");
    });

    test("Can succeed with actual milestone data", () => {
        const hex =
            "0202aba1a6dc812edf935aaf4e5d00772452a38804476e3d4b6c8e9efd3b82739540d2ca8db3eb6b54f6235f4abb769b1a3348d69e9d2b1deb5b11ad412cf2aacb31d5010000070000008e1200002188876202c88d137acf6dd337dadb1c9b1cdc79f205695e2a2ed1bc561ff63aee9276504702aba1a6dc812edf935aaf4e5d00772452a38804476e3d4b6c8e9efd3b82739540d2ca8db3eb6b54f6235f4abb769b1a3348d69e9d2b1deb5b11ad412cf2aacb31e5095a6c92bbba4dfde17064b6a9dc2a3915394c17cc2f0b5598ae4067e6777b0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a80000000300d85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c9835f6053a0ce4b0f33bf4586c1693c41dc875ecd2f9f133ba8ba4abdf036a0e7298a7f26207fcdfa413e134e31780dbdb44a0a1b0c33d974ec44d567b2fb1cf0500d9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f267b19149cbdc54e35c4c1658b11963b1fb28a343ef1f9b9360921c7b29d14b0cb13cb07c60a396154c9fcf398f3da9225a0faf73507e6cecb899112ff1f42a0100f9d9656a60049083eef61487632187b351294c1fa23d118060d813db6d03e8b6bfde3bc87645f17c42398121c9c1c4cdf115e6b9a07792f6650fc207f835e123dd394a6bc181ea7303ef3dacad4da2b68caf740192d0e59794886530875d22050000000000000000";
        const block = deserializeBlock(new ReadStream(Converter.hexToBytes(hex)));

        const writeStream = new WriteStream();
        serializeBlock(writeStream, block);

        const finalHex = writeStream.finalHex();
        expect(hex).toEqual(finalHex);
    });

    test("Can succeed with actual transaction data", () => {
        const hex =
            "01024ccb0843016072b0d0d1c4265bc808ef8a80ae4ad70e10d6016e248e4e047235aac2a777c07473522122629124d7df647b2ea712386707e3687dd3a47cbdfa552401000006000000017b000000000000000100002367ec318426c9f5d1115a6ac96f6c3cd2e53443713e0b63f0c266cbda7444740100aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0200036400000000000000000100003eb1ed78d420c8318972b8b0839420f502b25356270a48a430cb55a5e323f7230003f95c2dd3f7df090000010000625d17d4a4b21cd5edeb57544b9d2d66ce22985fb61f17d1d7cae958d0068618000c0000000500000003666f6f000000000100000014fe414a9eccf9589b38c7c89a2fa5921b4b170ebefc04b6a812b3d02068cfd73163a90017ed5fe9530f52fb0d30836a453a37204f4d59e03012d82e0a946f31c930ac54f4a35aef9578b9dec9c12887404be353c5f7ebd88bcbefcc78e29c050000000000000000";
        const block = deserializeBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(block.protocolVersion).toEqual(1);
        expect(block.parents).toBeDefined();
        if (block.parents) {
            expect(block.parents[0]).toEqual(
                "0x4ccb0843016072b0d0d1c4265bc808ef8a80ae4ad70e10d6016e248e4e047235"
            );
            expect(block.parents[1]).toEqual(
                "0xaac2a777c07473522122629124d7df647b2ea712386707e3687dd3a47cbdfa55"
            );
        }
        const payload = block.payload as ITransactionPayload;
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

        expect(payload.unlocks.length).toEqual(1);

        const sigUnlockBlock = payload.unlocks[0] as ISignatureUnlock;
        expect(sigUnlockBlock.type).toEqual(0);
        expect(sigUnlockBlock.signature.publicKey).toEqual(
            "0x14fe414a9eccf9589b38c7c89a2fa5921b4b170ebefc04b6a812b3d02068cfd7"
        );
        expect(sigUnlockBlock.signature.signature).toEqual(
            "0x3163a90017ed5fe9530f52fb0d30836a453a37204f4d59e03012d82e0a946f31c930ac54f4a35aef9578b9dec9c12887404be353c5f7ebd88bcbefcc78e29c05"
        );
        expect(block.nonce).toEqual("0");
    });
});
