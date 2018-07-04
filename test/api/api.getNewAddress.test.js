import API from '../../lib/api/api'

const seed = 'SEED'
const expected = '9DZXPFSVCSSWXXQPFMWLGFKPBAFTHYMKMZCPFHBVHXPFNJEIJIEEPKXAUBKBNNLIKWHJIYQDFWQVELOCB'

var i = 0

test('Should skip spent addresses', () => {
    expect.assertions(1)
    
    const wereAddressesSpentFrom = {
        'FJHSSHBZTAKQNDTIKJYCZBOZDGSZANCZSWCNWUOCZXFADNOQSYAHEJPXRLOVPNOQFQXXGEGVDGICLMOXX': [true],
        '9DZXPFSVCSSWXXQPFMWLGFKPBAFTHYMKMZCPFHBVHXPFNJEIJIEEPKXAUBKBNNLIKWHJIYQDFWQVELOCB': [false]
    }
    
    const api = new API()
    api.findTransactions = jest.fn().mockImplementation((query, cb) => cb(null, []))
    api.wereAddressesSpentFrom = jest.fn().mockImplementation(
        (address, cb) => cb(null, wereAddressesSpentFrom[address]))

    api.getNewAddress(seed, (err, address) => expect(address).toBe(expected))
})

test('Should skip addresses with transactions', () => {
    expect.assertions(1)
    
    const findTransactions = {
        'FJHSSHBZTAKQNDTIKJYCZBOZDGSZANCZSWCNWUOCZXFADNOQSYAHEJPXRLOVPNOQFQXXGEGVDGICLMOXX': ['A'],
        '9DZXPFSVCSSWXXQPFMWLGFKPBAFTHYMKMZCPFHBVHXPFNJEIJIEEPKXAUBKBNNLIKWHJIYQDFWQVELOCB': []
    }
    
    const api = new API()
    api.wereAddressesSpentFrom = jest.fn().mockImplementation((address, cb) => cb(null, [false]))
    api.findTransactions = jest.fn().mockImplementation(
        (query, cb) => cb(null, findTransactions[query.addresses[0]]))

    api.getNewAddress(seed, (err, address) => expect(address).toBe(expected))
})
