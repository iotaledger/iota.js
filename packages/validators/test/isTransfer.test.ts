import test from 'ava'
import { isTransfer } from '../src'

test('isTransfer() returns true for valid transfer.', t => {
    const transfer = {
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        value: 1234,
        message: 'AFDSA',
        tag: 'ASDFDSAFDFDSA',
    }

    t.is(isTransfer(transfer), true, 'isTransfer() should return true for valid transfer.')

    t.is(
        isTransfer({
            ...transfer,
            message: undefined,
            tag: undefined,
        }),
        true,
        'isTransfer() should return true for valid transfer with undefined optional fields.'
    )

    t.is(
        isTransfer({
            ...transfer,
            message: '',
            tag: '',
        }),
        true,
        'isTransfer() should return true for valid transfer with empty optional fields.'
    )
})

test('isTransfer() returns false for transfer with invalid address.', t => {
    const transfer = {
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNEFSAF',
        value: 1234,
        message: 'AFDSA',
        tag: 'ASDFDSAFDFDSA',
    }

    t.is(isTransfer(transfer), false, 'isTransfer() should return false for transfer with invalid address.')
})

test('isTransfer() returns false for transfer with invalid value.', t => {
    const transfer = {
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        value: -10,
        message: 'AFDSA',
        tag: 'ASDFDSAFDFDSA',
    }

    t.is(isTransfer(transfer), false, 'isTransfer() should return false for transfer with invalid value.')
})

test('isTransfer() returns false for message of invalid trytes.', t => {
    const transfer = {
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        value: 1234,
        message: 'dffsA',
        tag: 'ASDFDSAFDFDSA',
    }

    t.is(isTransfer(transfer), false, 'isTransfer() should return false for message of invalid trytes.')
})

test('isTransfer() returns false for tag of invalid length.', t => {
    const transfer = {
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        value: 1234,
        message: 'AFDSA',
        tag: 'ASDFDSAFDFDSAASFSDFSDFSDFSDF',
    }

    t.is(isTransfer(transfer), false, 'isTransfer() should return false for tag of invalid length.')
})

test('isTransfer() returns false for tag of invalid trytes.', t => {
    const transfer = {
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        value: 1234,
        message: 'AFDSA',
        tag: 'sdfASDF',
    }

    t.is(isTransfer(transfer), false, 'isTransfer() should return false for tag of invalid trytes.')
})
