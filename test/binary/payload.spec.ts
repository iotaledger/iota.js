/* eslint-disable max-len */
import { deserializeIndexationPayload, deserializePayload, serializeIndexationPayload, serializeMilestonePayload, deserializeMilestonePayload } from "../../src/binary/payload";
import { IIndexationPayload } from "../../src/models/IIndexationPayload";
import { IMilestonePayload } from "../../src/models/IMilestonePayload";
import { Converter } from "../../src/utils/converter";
import { ReadStream } from "../../src/utils/readStream";
import { WriteStream } from "../../src/utils/writeStream";

describe("Binary Payload", () => {
    test("Can fail with underflow min", () => {
        const bytes = new Uint8Array();
        expect(() => deserializePayload(new ReadStream(bytes))).toThrow("is less");
    });

    test("Can fail with underflow max", () => {
        const bytes = new Uint8Array(3);
        expect(() => deserializePayload(new ReadStream(bytes))).toThrow("is less");
    });

    test("Can fail with undersize payload length", () => {
        const bytes = Buffer.alloc(12);
        bytes.writeUInt32LE(1000, 0); // Payload length
        expect(() => deserializePayload(new ReadStream(bytes))).toThrow("exceeds the remaining");
    });

    test("Can fail with unrecognised payload", () => {
        const buffer = Buffer.alloc(12);
        buffer.writeUInt32LE(8, 0); // Payload length
        buffer.writeUInt32LE(99, 4); // Payload type
        expect(() => deserializePayload(new ReadStream(buffer))).toThrow("Unrecognized payload");
    });

    test("Can fail with indexation payload too small", () => {
        const buffer = Buffer.alloc(8);
        buffer.writeUInt32LE(4, 0); // Payload length
        buffer.writeUInt32LE(2, 4); // Payload type
        expect(() => deserializePayload(new ReadStream(buffer))).toThrow("minimimum size");
    });

    test("Can fail with milestone payload too small", () => {
        const buffer = Buffer.alloc(8);
        buffer.writeUInt32LE(4, 0); // Payload length
        buffer.writeUInt32LE(1, 4); // Payload type
        expect(() => deserializePayload(new ReadStream(buffer))).toThrow("minimimum size");
    });

    test("Can succeed with valid indexation data", () => {
        const buffer = Buffer.alloc(14);
        buffer.writeUInt32LE(8, 0); // Payload length
        buffer.writeUInt32LE(2, 4); // Payload type
        buffer.writeUInt16LE(0, 8); // Indexation index length
        buffer.writeUInt16LE(0, 10); // Indexation data length
        const payload = deserializePayload(new ReadStream(buffer)) as IIndexationPayload;
        expect(payload.type).toEqual(2);
        expect(payload.index).toEqual("");
        expect(payload.data).toEqual("");
    });

    test("Can succeed with valid milestone data", () => {
        const buffer = Buffer.alloc(346);
        buffer.writeUInt32LE(342, 0); // Payload length
        buffer.writeUInt32LE(1, 4); // Payload type
        buffer.writeUInt32LE(1087, 8); // Milestone index
        buffer.writeBigUInt64LE(BigInt(1605190003), 12); // Milestone timestamp
        buffer.write("c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3", 20, "hex"); // Parent 1
        buffer.write("04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02", 52, "hex"); // Parent 2
        buffer.write("786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419", 84, "hex"); // Inclusion Merkle proof
        buffer.writeUInt8(2, 116); // Public Key count
        buffer.write("ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248c", 117, "hex"); // Public Key
        buffer.write("f6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c", 149, "hex"); // Public Key
        buffer.writeUInt8(2, 181); // Signature count
        buffer.write("f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01", 182, "hex"); // Signature
        buffer.write("fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060c", 246, "hex"); // Signature
        const payload = deserializePayload(new ReadStream(buffer)) as IMilestonePayload;
        expect(payload.type).toEqual(1);
        expect(payload.index).toEqual(1087);
        expect(payload.timestamp).toEqual(1605190003);
        expect(payload.parent1MessageId).toEqual("c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3");
        expect(payload.parent2MessageId).toEqual("04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02");
        expect(payload.inclusionMerkleProof).toEqual("786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419");
        expect(payload.publicKeys.length).toEqual(2);
        expect(payload.publicKeys[0]).toEqual("ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248c");
        expect(payload.publicKeys[1]).toEqual("f6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c");
        expect(payload.signatures.length).toEqual(2);
        expect(payload.signatures[0]).toEqual("f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01");
        expect(payload.signatures[1]).toEqual("fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060c");
    });

    test("Can serialize and deserialize indexation payload", () => {
        const payload: IIndexationPayload = {
            type: 2,
            index: "foo",
            data: Converter.asciiToHex("bar")
        };

        const serialized = new WriteStream();
        serializeIndexationPayload(serialized, payload);
        const hex = serialized.finalHex();
        expect(hex).toEqual("020000000300666f6f03000000626172");
        const deserialized = deserializeIndexationPayload(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(2);
        expect(deserialized.index).toEqual("foo");
        expect(Converter.hexToAscii(deserialized.data)).toEqual("bar");
    });

    test("Can serialize and deserialize milestone payload", () => {
        const payload: IMilestonePayload = {
            type: 1,
            index: 1087,
            timestamp: 1605190003,
            parent1MessageId: "c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3",
            parent2MessageId: "04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02",
            inclusionMerkleProof: "786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419",
            publicKeys: [
                "ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248c",
                "f6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c"
            ],
            signatures: [
                "f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01",
                "fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060c"
            ]
        };

        const serialized = new WriteStream();
        serializeMilestonePayload(serialized, payload);
        const hex = serialized.finalHex();
        expect(hex).toEqual("010000003f0400007341ad5f00000000c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe304ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f541902ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248cf6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c02f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060c");
        const deserialized = deserializeMilestonePayload(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.index).toEqual(1087);
        expect(deserialized.timestamp).toEqual(1605190003);
        expect(deserialized.parent1MessageId).toEqual("c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3");
        expect(deserialized.parent2MessageId).toEqual("04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02");
        expect(deserialized.inclusionMerkleProof).toEqual("786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419");
        expect(deserialized.publicKeys.length).toEqual(2);
        expect(deserialized.publicKeys[0]).toEqual("ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248c");
        expect(deserialized.publicKeys[1]).toEqual("f6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c");
        expect(deserialized.signatures.length).toEqual(2);
        expect(deserialized.signatures[0]).toEqual("f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01");
        expect(deserialized.signatures[1]).toEqual("fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060c");
    });
});
