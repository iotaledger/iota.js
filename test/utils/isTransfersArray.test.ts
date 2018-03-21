import test from 'ava'
import { Transfer } from '../../lib/api/types'
import { isTransfersArray } from '../../lib/utils'

test('isTransfersArray() returns true for valid transfer.', t => {
    const transfers = [{
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        value: 1234,
        message: 'AFDSA',
        tag: 'ASDFDSAFDFDSA'
    }]

    t.is(
        isTransfersArray(transfers),
        true,
        'isTransfersArray() should return true for valid transfer.'
    )
})

test('isTransfersArray() returns false for transfer with invalid address.', t => {
    const transfers = [{
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNEFSAF',
        value: 1234,
        message: 'AFDSA',
        tag: 'ASDFDSAFDFDSA'
    }]
    
    t.is(
        isTransfersArray(transfers),
        false,
        'isTransfersArray() should return false for transfer with invalid address.'
    )
})

test('isTransfersArray() returns false for transfer with invalid value.', t => {
    const transfers = [{
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        value: -10,
        message: 'AFDSA',
        tag: 'ASDFDSAFDFDSA'
    }]

    t.is(
        isTransfersArray(transfers),
        false,
        'isTransfersArray() should return false for transfer with invalid value.'
    )
}) 

test('isTransfersArray() returns false for message of invalid trytes.', t => {
    const transfers = [{
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        value: 1234,
        message: 'dffsA',
        tag: 'ASDFDSAFDFDSA'
    }]

    t.is(
        isTransfersArray(transfers),
        false,
        'isTransfersArray() should return false for message of invalid trytes.'
    )
})

test('isTransfersArray() returns false for tag of invalid length.', t => {
    const transfers = [{
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        value: 1234,
        message: 'AFDSA',
        tag: 'ASDFDSAFDFDSAASFSDFSDFSDFSDF'
    }]
    
    t.is(
        isTransfersArray(transfers),
        false,
        'isTransferArray() should return false for tag of invalid length.'
    )
})

test('isTransferArray() returns false for tag of invalid trytes.', t => {
    const transfers = [{
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        value: 1234,
        message: 'AFDSA',
        tag: 'sdfASDF'
    }]
    
    t.is(
        isTransfersArray(transfers),
        false,
        'isTransfersArray() should return false for tag of invalid trytes.'
    )
}) 
