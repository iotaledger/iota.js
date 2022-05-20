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
            "02030d34993b5485a59c9c54f04068ea2caf9f2f76c58228013f1ad03dd6dfc06829ce68b9feaa6f6df5eed44781a8c6881cd1d8910da905625dc20ca9986e85887bd539f3c16201bd6935a8daaa2e6efc775a5722ca31287e7e7e92842db111454df4010000070000000c5c0000ab1065624b218eb12cc9d8577e092ec9b733da1a97768d7b13b6d005cd9c285305a9175f030d34993b5485a59c9c54f04068ea2caf9f2f76c58228013f1ad03dd6dfc06829ce68b9feaa6f6df5eed44781a8c6881cd1d8910da905625dc20ca9986e85887bd539f3c16201bd6935a8daaa2e6efc775a5722ca31287e7e7e92842db111454d55098ea8442501abf4e084253148e7108c7f3a6fdba1bdd600c790cb404b75d60e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a80000000300d85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c986ef3acfbd83946513d8b3808af4cf57f39aee9a2c1bc6bb67821739e1aecbcfab086907c151e54731101a3de0855ffcb0b08387274bf8ad77f667fe05725ab0c00d9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f2248adadaeb7608fe12d67f09f71ea22c1dc98fad71291e2810d8497847cee7846d3bb149b999fc3514abbbe6be06f09fe27e668962b51bf1d335f68caf2a890500f9d9656a60049083eef61487632187b351294c1fa23d118060d813db6d03e8b6f7550279f8ff401ebb1a743356b2d38e573731a7578b0f99be77098e3ccc821feb781092c57907af78fef7656cb05a6c83518e4bdad0c670d744d4c45b99ca0f3ee65b5555555555";
        const block = deserializeBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(block.protocolVersion).toEqual(2);
        expect(block.parents).toBeDefined();
        if (block.parents) {
            expect(block.parents[0]).toEqual(
                "0x0d34993b5485a59c9c54f04068ea2caf9f2f76c58228013f1ad03dd6dfc06829"
            );
            expect(block.parents[1]).toEqual(
                "0xce68b9feaa6f6df5eed44781a8c6881cd1d8910da905625dc20ca9986e85887b"
            );
            expect(block.parents[2]).toEqual(
                "0xd539f3c16201bd6935a8daaa2e6efc775a5722ca31287e7e7e92842db111454d"
            );
        }
        const payload = block.payload as IMilestonePayload;
        expect(payload.type).toEqual(7);
        expect(payload.index).toEqual(23564);
        expect(payload.timestamp).toEqual(1650790571);
        expect(payload.previousMilestoneId).toEqual("0x4b218eb12cc9d8577e092ec9b733da1a97768d7b13b6d005cd9c285305a9175f");
        expect(payload.parents[0]).toEqual("0x0d34993b5485a59c9c54f04068ea2caf9f2f76c58228013f1ad03dd6dfc06829");
        expect(payload.parents[1]).toEqual("0xce68b9feaa6f6df5eed44781a8c6881cd1d8910da905625dc20ca9986e85887b");
        expect(payload.parents[2]).toEqual("0xd539f3c16201bd6935a8daaa2e6efc775a5722ca31287e7e7e92842db111454d");
        expect(payload.inclusionMerkleRoot).toEqual(
            "0x55098ea8442501abf4e084253148e7108c7f3a6fdba1bdd600c790cb404b75d6"
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
            "0x6ef3acfbd83946513d8b3808af4cf57f39aee9a2c1bc6bb67821739e1aecbcfab086907c151e54731101a3de0855ffcb0b08387274bf8ad77f667fe05725ab0c"
        );
        expect(payload.signatures[1].type).toEqual(0);
        expect(payload.signatures[1].publicKey).toEqual(
            "0xd9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f2"
        );
        expect(payload.signatures[1].signature).toEqual(
            "0x248adadaeb7608fe12d67f09f71ea22c1dc98fad71291e2810d8497847cee7846d3bb149b999fc3514abbbe6be06f09fe27e668962b51bf1d335f68caf2a8905"
        );
        expect(payload.signatures[2].type).toEqual(0);
        expect(payload.signatures[2].publicKey).toEqual(
            "0xf9d9656a60049083eef61487632187b351294c1fa23d118060d813db6d03e8b6"
        );
        expect(payload.signatures[2].signature).toEqual(
            "0xf7550279f8ff401ebb1a743356b2d38e573731a7578b0f99be77098e3ccc821feb781092c57907af78fef7656cb05a6c83518e4bdad0c670d744d4c45b99ca0f"
        );
        expect(block.nonce).toEqual("6148914691236947518");
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
            "020352276f206238fbe2c962d89e5c9d5d996ea41c5da3ab23df13cff892446e3d4a598dafda389e1d3626efab8754dc813e2e672df92f72f1d4b56921add84ff7958d991fb5200a3b9f3405236ef14cd69df76c8fb262bddaa1adc70a3ebe3ef7e4f401000007000000405c0000b3126562dc1da7141899c2c82672c38129a8f82d46b9c3a40e9799efa45186ecff76a1e80352276f206238fbe2c962d89e5c9d5d996ea41c5da3ab23df13cff892446e3d4a598dafda389e1d3626efab8754dc813e2e672df92f72f1d4b56921add84ff7958d991fb5200a3b9f3405236ef14cd69df76c8fb262bddaa1adc70a3ebe3ef7e4c293c3f170fe3b11a21939ec2f30a8a3fae7b3fbed5d6142c68e48b62f33c68a0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a80000000300d85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c98d6ef0fef33441b338044b76d67282356a9e853bdde8cdf02b91e3dcbcfefa01d3e056b0c1930ba8aa917d369a26abd430febcd810ad18cda8a645e7544de6e0300d9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f26aa209ab20aeeb129ebae0f109119aebed54acfc12e66334ab4981fcadc02a65b844b2dcd7f2eb51f36cffe705785f4f686212839e79fbfd2573b2ed3678b90700f9d9656a60049083eef61487632187b351294c1fa23d118060d813db6d03e8b6d69c22cc01423a56b7cd63af8a71398709b097044c7c89c23bc8422eb7cc6d7cd53ded647684300f257aae398af74d2dadf8c6038c8e9f798880cb7b8cec080f6c16795555555555";
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
