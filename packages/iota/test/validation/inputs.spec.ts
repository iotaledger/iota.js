// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_INPUT_COUNT, MIN_INPUT_COUNT } from "../../src/binary/inputs/inputs";
import { IUTXOInput, UTXO_INPUT_TYPE } from "../../src/models/inputs/IUTXOInput";
import { validateInput, validateInputs } from "../../src/validation/inputs/inputs";

describe("Inputs validation", () => {
    test("should pass with valid inputs", () => {
        const inputs: IUTXOInput[] = [
            {
                type: UTXO_INPUT_TYPE,
                transactionId: "0x729aac27d25a412b51fda98c07dc8a5b68b476a105ad0434389fef4109537eeb",
                transactionOutputIndex: 0
            },
            {
                type: UTXO_INPUT_TYPE,
                transactionId: "0x729aac27d25a412b51fda98c07dc8a5b68b476a105ad0434389fef4109537eeb",
                transactionOutputIndex: 1
            },
            {
                type: UTXO_INPUT_TYPE,
                transactionId: "0x729aac27d25a412b51fda98c07dc8a5b68b476a105ad0434389fef4109537eeb",
                transactionOutputIndex: 2
            },
            {
                type: UTXO_INPUT_TYPE,
                transactionId: "0x729aac27d25a412b51fda98c07dc8a5b68b476a105ad0434389fef4109537bdd",
                transactionOutputIndex: 1
            }
        ];

        expect(() => validateInputs(inputs)).not.toThrowError();
    });

    test("should fail with maximum inputs exceeded", () => {
        const inputs: IUTXOInput[] = [];

        for (let index = 0; index < 129; index++) {
            inputs.push({
                type: UTXO_INPUT_TYPE,
                transactionId: "0x729aac27d25a412b51fda98c07dc8a5b68b476a105ad0434389fef4109537eed",
                transactionOutputIndex: index
            });
        }

        expect(() => validateInputs(inputs)).toThrow(`Inputs count must be between ${MIN_INPUT_COUNT} and ${MAX_INPUT_COUNT}.`);
    });

    test("should fail on duplicate Transaction Id and Transaction Output Index pair", () => {
        const inputs: IUTXOInput[] = [
            {
                type: UTXO_INPUT_TYPE,
                transactionId: "0x729aac27d25a412b51fda98c07dc8a5b68b476a105ad0434389fef4109537eeb",
                transactionOutputIndex: 0
            },
            {
                type: UTXO_INPUT_TYPE,
                transactionId: "0x729aac27d25a412b51fda98c07dc8a5b68b476a105ad0434389fef4109537eeb",
                transactionOutputIndex: 0
            },
            {
                type: UTXO_INPUT_TYPE,
                transactionId: "0x729aac27d25a412b51fda98c07dc8a5b68b476a105ad0434389fef4109537eeb",
                transactionOutputIndex: 2
            },
            {
                type: UTXO_INPUT_TYPE,
                transactionId: "0x729aac27d25a412b51fda98c07dc8a5b68b476a105ad0434389fef4109537bdd",
                transactionOutputIndex: 1
            }
        ];

        expect(() => validateInputs(inputs)).toThrow("Each pair of Transaction Id and Transaction Output Index must be unique in the list of inputs.");
    });

    test("should fail on maximum Transaction Output Index exceeded", () => {
        const input: IUTXOInput = {
            type: UTXO_INPUT_TYPE,
            transactionId: "0x729aac27d25a412b51fda98c07dc8a5b68b476a105ad0434389fef4109537eeb",
            transactionOutputIndex: 128
        };

        expect(() => validateInput(input)).toThrow(`Transaction Output Index must be between 0 and ${MAX_INPUT_COUNT}.`);
    });
});

