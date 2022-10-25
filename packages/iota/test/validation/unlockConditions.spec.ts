// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../../src";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IAddressUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IExpirationUnlockCondition";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IGovernorAddressUnlockCondition";
import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IImmutableAliasUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStateControllerAddressUnlockCondition";
import { STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/ITimelockUnlockCondition";
import type { UnlockConditionTypes } from "../../src/models/unlockConditions/unlockConditionTypes";
import type { IStorageDepositReturnUnlockCondition } from "../../src/models/unlockConditions/IStorageDepositReturnUnlockCondition";
import type { INodeInfoProtocol } from "../../src/models/info/INodeInfoProtocol";
import { validateStorageDepositReturnUnlockCondition, validateUnlockConditions } from "../../src/validation/unlockConditions/unlockConditions";


describe("Unlock Conditions", () => {
    test("Can validate unlock conditions", () => {
        const unlockConditions: UnlockConditionTypes[] = [
            {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            },
            {
                type: TIMELOCK_UNLOCK_CONDITION_TYPE,
                unixTime: 1561616
            },
            {
                type: EXPIRATION_UNLOCK_CONDITION_TYPE,
                returnAddress: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                },
                unixTime: 1561616 
            },
            {
                type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            },
            {
                type: GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            },
            {
                type: IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                } 
            }
        ];

        const result = validateUnlockConditions(unlockConditions, );
        expect(result.isValid).toEqual(true);
    });
    
    test("Can validate storage deposit return unlock condition", () => {
        const protocolInfo: INodeInfoProtocol = {
            "version": 2,
            "networkName": "testnet",
            "bech32Hrp": "rms",
            "minPowScore": 1500,
            "rentStructure": {
              "vByteCost": 100,
              "vByteFactorData": 1,
              "vByteFactorKey": 10
            },
            "tokenSupply": "1450896407249092"
          };

        const output: IBasicOutput = {
            type: BASIC_OUTPUT_TYPE,
            amount: '455655655',
            unlockConditions: [
                {   
                    type: 0, 
                    address: {
                        type: ADDRESS_UNLOCK_CONDITION_TYPE,
                        pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                    } 
                },
                {
                    type: STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
                    amount: "46000",
                    returnAddress: {
                        type: ADDRESS_UNLOCK_CONDITION_TYPE,
                        pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                    } 
                }
            ]
        };

        const unlockCondition: IStorageDepositReturnUnlockCondition =  {
            type: STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
            amount: "46000",
            returnAddress: {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            } 
        }

        const result = validateStorageDepositReturnUnlockCondition(unlockCondition, output, protocolInfo);
        expect(result.isValid).toEqual(true);
    });

    test("Fail validate unlock conditions", () => {
        const unlockConditions: UnlockConditionTypes[] = [
            {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f5b3393af80f74c7c3db78198147d5f1f92"
                }
            },
            {
                type: TIMELOCK_UNLOCK_CONDITION_TYPE,
                unixTime: 0
            },
            {
                type: EXPIRATION_UNLOCK_CONDITION_TYPE,
                returnAddress: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb33f80f74c7c3db78198147d5f1f92"
                },
                unixTime: 0 
            },
            {
                type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be5968fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            },
            {
                type: GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb339f80f74c7c3db78198147d5f1f92"
                }
            },
            {
                type: IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb33af80f74c7c3db78198147d5f1f92"
                } 
            },
            {
                type: IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb33af80f74c7c3db78198147d5f1f92"
                } 
            }
        ];

        const result = validateUnlockConditions(unlockConditions, );
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining([
            "Ed25519 Address must have 66 charachters.",
            "Expiration unlock condition must be greater than zero.",
            "Time unlock condition must be greater than zero."
        ]));
    });

    test("Fail validate storage deposit return unlock condition", () => {
        const protocolInfo: INodeInfoProtocol = {
            "version": 2,
            "networkName": "testnet",
            "bech32Hrp": "rms",
            "minPowScore": 1500,
            "rentStructure": {
              "vByteCost": 100,
              "vByteFactorData": 1,
              "vByteFactorKey": 10
            },
            "tokenSupply": "1450896407249092"
          };

        const output: IBasicOutput = {
            type: BASIC_OUTPUT_TYPE,
            amount: '455655655',
            unlockConditions: [
                {   
                    type: 0, 
                    address: {
                        type: ADDRESS_UNLOCK_CONDITION_TYPE,
                        pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                    } 
                },
                {
                    type: STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
                    amount: "0",
                    returnAddress: {
                        type: ADDRESS_UNLOCK_CONDITION_TYPE,
                        pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                    } 
                }
            ]
        };

        const unlockCondition: IStorageDepositReturnUnlockCondition =  {
            type: STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
            amount: "0",
            returnAddress: {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            } 
        }

        const result = validateStorageDepositReturnUnlockCondition(unlockCondition, output, protocolInfo);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining([
            "Storage deposit amount must be larger than zero.",
            "Storage deposit return amount is less than the min storage deposit.",
        ]));
    });
});
