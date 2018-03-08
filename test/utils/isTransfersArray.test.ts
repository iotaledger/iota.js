import test from 'ava'
import { Transfer } from '../../lib/api/types'
import { isTransfersArray } from '../../lib/utils'


test('isTransfersArray', t => {
    const validTransfers: Transfer[] = [{
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        value: 1234,
        message: 'AFDSA',
        tag: 'ASDFDSAFDFDSA'
    }]
    
    const transfersWithInvalidAddress: Transfer[] = [{
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNEFSAF',
        value: 1234,
        message: 'AFDSA',
        tag: 'ASDFDSAFDFDSA'
    }] 
  
    const transfersWithInvalidValue: Transfer[] = [{
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        value: 123.4,
        message: 'AFDSA',
        tag: 'ASDFDSAFDFDSA'
    }]
  
    const transfersWithInvalidMessage: Transfer[] = [{
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        value: 1234,
        message: 'dffsA',
        tag: 'ASDFDSAFDFDSA'
    }]

    const transfersWithInvalidTag: Transfer[] = [{
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        value: 1234,
        message: 'AFDSA',
        tag: 'ASDFDSAFDFDSAASFSDFSDFSDFSDF'
    }]

    t.is(
        isTransfersArray(validTransfers),
        true,
        'isTransfersArray() should return true for valid transfers array.'
    )
    t.is(
        isTransfersArray(transfersWithInvalidAddress),
        false,
        'isTransfersArray() should return true for transfers array with invalid addresses.'
    )
    t.is(
        isTransfersArray(transfersWithInvalidValue),
        false,
        'isTransfersArray() should return true for transfers array with invalid values.'
    )
    t.is(
        isTransfersArray(transfersWithInvalidMessage),
        false,
        'isTransfersArray() should return true for transfers array with invalid messages.'
    )
    t.is(
        isTransfersArray(transfersWithInvalidTag),
        false,
        'isTransfersArray() should return true for transfers array with invalid tags.'
    )
})
