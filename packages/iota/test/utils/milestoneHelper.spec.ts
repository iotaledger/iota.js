// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IMilestonePayload } from "../../src";
import { messageIdFromMilestonePayload, milestoneIdFromMilestonePayload } from "../../src/utils/milestoneHelper";

const milestonePayload: IMilestonePayload = {
    "type": 7,
    "index": 30946,
    "timestamp": 1651565954,
    "previousMilestoneId": "0xa64113d2aab54a3aa2387c743685acf503b09877343576a6d7c14adae2299ca0",
    "parentBlockIds": [
        "0x2ae4b5a514d9c412a0b5c8bb1fbbe7d7a1c542ba7ff67e2ff66137a308b5633e",
        "0xfa956ae69781430af3d31b70279eabeb801f44d91087525e609e95d577e40fd2"
    ],
    "confirmedMerkleRoot": "0xc9de50a367606c4984100ab71aa84a17c25cd14ba06793451500ef4df5faa793",
    "appliedMerkleRoot": "0x0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8",
    "signatures": [
        {
            "type": 0,
            "publicKey": "0xd85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c98",
            "signature": "0xd5615474b18e3d1e493d761274b2531bda4b1f1f05f6ada46414e96e9f37431d4e068f690fbda532f2b04e5a58226e80e0713c93086159020e8ef8d2054a8908"
        },
        {
            "type": 0,
            "publicKey": "0xd9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f2",
            "signature": "0x87345667e92467e7af7b39542842fdff31fc7f277bbae968756e28cc9899806e213d9042025361e52fedd4d87e6e434d8d90071592761cbcf1fee04f5f8f0602"
        },
        {
            "type": 0,
            "publicKey": "0xf9d9656a60049083eef61487632187b351294c1fa23d118060d813db6d03e8b6",
            "signature": "0x998d3971f351800500285fe235b0b79c0040174decc0e3c9af9f9ff81e27935f4898ce2d6023b1a80bbc387476142df6c1ff27d1586270a4035bef54e86d7c02"
        }
    ]
};

describe("MilestoneHelper", () => {
    test("Can compute milestonId from milestone payload", () => {
        const expectedMilestoneId = "0xadcba83eeb91c9e929e42c99fd5954e2b57fca7b2246b8c6cfa8043b9765e379";
        const milestoneId = milestoneIdFromMilestonePayload(milestonePayload);
        expect(milestoneId).toEqual(expectedMilestoneId);
    });

    test("Can compute messageId from milestone payload", () => {
        const expectedMessageId = "0x4a3cf7cf91c08ab790b5232d5523f811b6ace33adedb21180deb653adaea581e";
        const messageId = messageIdFromMilestonePayload(2, milestonePayload);
        expect(messageId).toEqual(expectedMessageId);
    });
});

