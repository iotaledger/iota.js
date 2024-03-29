// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeMessage, serializeMessage } from "../../src/binary/message";
import type { IIndexationPayload } from "../../src/models/IIndexationPayload";
import type { IMilestonePayload } from "../../src/models/IMilestonePayload";
import type { ISigLockedSingleOutput } from "../../src/models/ISigLockedSingleOutput";
import type { ISignatureUnlockBlock } from "../../src/models/ISignatureUnlockBlock";
import type { ITransactionPayload } from "../../src/models/ITransactionPayload";

describe("Binary Message", () => {
    test("Can fail with underflow min", () => {
        const bytes = Uint8Array.from([]);
        expect(() => deserializeMessage(new ReadStream(bytes))).toThrow("less than the minimimum size");
    });

    test("Can fail with underflow max", () => {
        const bytes = new Uint8Array(52);
        expect(() => deserializeMessage(new ReadStream(bytes))).toThrow("less than the minimimum size");
    });

    test("Can succeed with valid data", () => {
        const buffer = Buffer.alloc(95);
        buffer.writeBigUInt64LE(BigInt(123), 0);
        buffer.writeUInt8(2, 8);
        buffer.write("4594267ca0446739d5e4c6dcf060d640aafb68ab929aa2bb8c2bcdce8b3bc89e", 9, "hex");
        buffer.write("6901c7b37adbddfc3fc170773632489f263af4decc9ed5813c849a07319ecd73", 41, "hex");
        buffer.writeUInt32LE(8, 73); // Payload length
        buffer.writeUInt32LE(2, 77); // Payload type
        buffer.writeUInt16LE(0, 81); // Indexation index length
        buffer.writeUInt32LE(0, 83); // Indexation data length
        buffer.writeBigUInt64LE(BigInt(0), 87); // Nonce
        const message = deserializeMessage(new ReadStream(buffer));
        expect(message.networkId).toEqual("123");
        expect(message.parentMessageIds).toBeDefined();
        if (message.parentMessageIds) {
            expect(message.parentMessageIds[0]).toEqual(
                "4594267ca0446739d5e4c6dcf060d640aafb68ab929aa2bb8c2bcdce8b3bc89e"
            );
            expect(message.parentMessageIds[1]).toEqual(
                "6901c7b37adbddfc3fc170773632489f263af4decc9ed5813c849a07319ecd73"
            );
        }
        expect(message.nonce).toEqual("0");
    });

    test("Can fail with additional data", () => {
        const buffer = Buffer.alloc(96);
        buffer.writeBigUInt64LE(BigInt(123), 0);
        buffer.writeUInt8(2, 8);
        buffer.write("4594267ca0446739d5e4c6dcf060d640aafb68ab929aa2bb8c2bcdce8b3bc89e", 9, "hex");
        buffer.write("6901c7b37adbddfc3fc170773632489f263af4decc9ed5813c849a07319ecd73", 41, "hex");
        buffer.writeUInt32LE(8, 73); // Payload length
        buffer.writeUInt32LE(2, 77); // Payload type
        buffer.writeUInt16LE(0, 81); // Indexation index length
        buffer.writeUInt32LE(0, 83); // Indexation data length
        buffer.writeBigUInt64LE(BigInt(0), 87); // Nonce
        expect(() => deserializeMessage(new ReadStream(buffer))).toThrow("unused data");
    });

    test("Can succeed with milestone data", () => {
        const hex =
            "7b000000000000000204ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe33f010000010000003f0400007341ad5f000000000204ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419000000000000000002ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248cf6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c0000000002f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060cdd2f000000000000";
        const message = deserializeMessage(new ReadStream(Converter.hexToBytes(hex)));
        expect(message.networkId).toEqual("123");
        expect(message.parentMessageIds).toBeDefined();
        if (message.parentMessageIds) {
            expect(message.parentMessageIds[0]).toEqual(
                "04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02"
            );
            expect(message.parentMessageIds[1]).toEqual(
                "c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
            );
        }
        const payload = message.payload as IMilestonePayload;
        expect(payload.type).toEqual(1);
        expect(payload.index).toEqual(1087);
        expect(payload.timestamp).toEqual(1605190003);
        expect(payload.parentMessageIds[0]).toEqual("04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02");
        expect(payload.parentMessageIds[1]).toEqual("c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3");
        expect(payload.inclusionMerkleProof).toEqual(
            "786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419"
        );
        expect(payload.nextPoWScore).toEqual(0);
        expect(payload.nextPoWScoreMilestoneIndex).toEqual(0);
        expect(payload.publicKeys.length).toEqual(2);
        expect(payload.publicKeys[0]).toEqual("ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248c");
        expect(payload.publicKeys[1]).toEqual("f6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c");
        expect(payload.signatures.length).toEqual(2);
        expect(payload.signatures[0]).toEqual(
            "f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01"
        );
        expect(payload.signatures[1]).toEqual(
            "fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060c"
        );
        expect(message.nonce).toEqual("12253");
    });

    test("Can succeed with indexation data", () => {
        const hex =
            "7b00000000000000029eca185fb38d44471b0c396c6c147c3a2a4c590dc5dac6431b698c58dcce449a26b9c0077037bf198b35306408e4a9b50430bdf0ea54f722cc4e7ce4f7ffba5e10000000020000000300666f6f030000004261720000000000000000";
        const message = deserializeMessage(new ReadStream(Converter.hexToBytes(hex)));
        expect(message.networkId).toEqual("123");
        expect(message.parentMessageIds).toBeDefined();
        if (message.parentMessageIds) {
            expect(message.parentMessageIds[0]).toEqual(
                "9eca185fb38d44471b0c396c6c147c3a2a4c590dc5dac6431b698c58dcce449a"
            );
            expect(message.parentMessageIds[1]).toEqual(
                "26b9c0077037bf198b35306408e4a9b50430bdf0ea54f722cc4e7ce4f7ffba5e"
            );
        }
        const payload = message.payload as IIndexationPayload;
        expect(payload.type).toEqual(2);
        expect(Converter.hexToUtf8(payload.index)).toEqual("foo");
        expect(payload.data).toBeDefined();
        if (payload.data) {
            expect(Converter.hexToUtf8(payload.data)).toEqual("Bar");
        }
        expect(message.nonce).toEqual("0");
    });

    test("Can succeed with actual milestone data", () => {
        const hex =
            "7b000000000000000204ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe33f010000010000003f0400007341ad5f000000000204ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419000000000100000002ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248cf6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c0000000002f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060cdd2f000000000000";
        const message = deserializeMessage(new ReadStream(Converter.hexToBytes(hex)));

        const writeStream = new WriteStream();
        serializeMessage(writeStream, message);

        const finalHex = writeStream.finalHex();
        expect(hex).toEqual(finalHex);
    });

    test("Can succeed with actual indexation data", () => {
        const hex =
            "7b00000000000000029eca185fb38d44471b0c396c6c147c3a2a4c590dc5dac6431b698c58dcce449a26b9c0077037bf198b35306408e4a9b50430bdf0ea54f722cc4e7ce4f7ffba5e10000000020000000300666f6f030000004261720000000000000000";
        const message = deserializeMessage(new ReadStream(Converter.hexToBytes(hex)));
        expect(message.networkId).toEqual("123");
        expect(message.parentMessageIds).toBeDefined();
        if (message.parentMessageIds) {
            expect(message.parentMessageIds[0]).toEqual(
                "9eca185fb38d44471b0c396c6c147c3a2a4c590dc5dac6431b698c58dcce449a"
            );
            expect(message.parentMessageIds[1]).toEqual(
                "26b9c0077037bf198b35306408e4a9b50430bdf0ea54f722cc4e7ce4f7ffba5e"
            );
        }
        const payload = message.payload as IIndexationPayload;
        expect(payload.type).toEqual(2);
        expect(Converter.hexToUtf8(payload.index)).toEqual("foo");
        expect(payload.data).toBeDefined();
        if (payload.data) {
            expect(Converter.hexToUtf8(payload.data)).toEqual("Bar");
        }
        expect(message.nonce).toEqual("0");
    });

    test("Can succeed with actual transaction data", () => {
        const hex =
            "7b00000000000000024ccb0843016072b0d0d1c4265bc808ef8a80ae4ad70e10d6016e248e4e047235aac2a777c07473522122629124d7df647b2ea712386707e3687dd3a47cbdfa55f800000000000000000100002367ec318426c9f5d1115a6ac96f6c3cd2e53443713e0b63f0c266cbda7444740100020000003eb1ed78d420c8318972b8b0839420f502b25356270a48a430cb55a5e323f72364000000000000000000625d17d4a4b21cd5edeb57544b9d2d66ce22985fb61f17d1d7cae958d0068618f95c2dd3f7df090010000000020000000300666f6f030000006261720100000014fe414a9eccf9589b38c7c89a2fa5921b4b170ebefc04b6a812b3d02068cfd73163a90017ed5fe9530f52fb0d30836a453a37204f4d59e03012d82e0a946f31c930ac54f4a35aef9578b9dec9c12887404be353c5f7ebd88bcbefcc78e29c050000000000000000";
        const message = deserializeMessage(new ReadStream(Converter.hexToBytes(hex)));
        expect(message.networkId).toEqual("123");
        expect(message.parentMessageIds).toBeDefined();
        if (message.parentMessageIds) {
            expect(message.parentMessageIds[0]).toEqual(
                "4ccb0843016072b0d0d1c4265bc808ef8a80ae4ad70e10d6016e248e4e047235"
            );
            expect(message.parentMessageIds[1]).toEqual(
                "aac2a777c07473522122629124d7df647b2ea712386707e3687dd3a47cbdfa55"
            );
        }
        const payload = message.payload as ITransactionPayload;
        expect(payload.type).toEqual(0);
        expect(payload.essence.type).toEqual(0);
        expect(payload.essence.inputs.length).toEqual(1);
        expect(payload.essence.inputs[0].type).toEqual(0);
        const utxoInput = payload.essence.inputs[0];
        expect(utxoInput.transactionId).toEqual("2367ec318426c9f5d1115a6ac96f6c3cd2e53443713e0b63f0c266cbda744474");
        expect(utxoInput.transactionOutputIndex).toEqual(1);

        const sigLockedOutput1 = payload.essence.outputs[0] as ISigLockedSingleOutput;
        expect(payload.essence.outputs.length).toEqual(2);
        expect(sigLockedOutput1.type).toEqual(0);
        expect(sigLockedOutput1.address.type).toEqual(0);
        expect(sigLockedOutput1.address.address).toEqual(
            "3eb1ed78d420c8318972b8b0839420f502b25356270a48a430cb55a5e323f723"
        );
        expect(sigLockedOutput1.amount).toEqual(100);

        const sigLockedOutput2 = payload.essence.outputs[1] as ISigLockedSingleOutput;
        expect(sigLockedOutput2.type).toEqual(0);
        expect(sigLockedOutput2.address.type).toEqual(0);
        expect(sigLockedOutput2.address.address).toEqual(
            "625d17d4a4b21cd5edeb57544b9d2d66ce22985fb61f17d1d7cae958d0068618"
        );
        expect(sigLockedOutput2.amount).toEqual(2779530283277561);

        expect(payload.unlockBlocks.length).toEqual(1);

        const sigUnlockBlock = payload.unlockBlocks[0] as ISignatureUnlockBlock;
        expect(sigUnlockBlock.type).toEqual(0);
        expect(sigUnlockBlock.signature.publicKey).toEqual(
            "14fe414a9eccf9589b38c7c89a2fa5921b4b170ebefc04b6a812b3d02068cfd7"
        );
        expect(sigUnlockBlock.signature.signature).toEqual(
            "3163a90017ed5fe9530f52fb0d30836a453a37204f4d59e03012d82e0a946f31c930ac54f4a35aef9578b9dec9c12887404be353c5f7ebd88bcbefcc78e29c05"
        );
        expect(message.nonce).toEqual("0");
    });
});
