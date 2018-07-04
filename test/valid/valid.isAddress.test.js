import valid from '../../lib/utils/inputValidator'

const tests = [
    [true, 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE'],
    [true, 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLS'],
    [false, 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSASD'],
    [false, '123adfdsafLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLASD'],
    [false, 1432432]
]

tests.forEach(([isValid, address]) => {
    test('should be ' + (isValid ? '' : 'in') + 'valid address: ' + address, () => {
        const isAddress = valid.isAddress(address)
        expect(isAddress).toBe(isValid)
    })
})