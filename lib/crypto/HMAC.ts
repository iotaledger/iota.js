import { Transaction } from '../api/types'
import { trits, trytes } from './Converter'
import Curl from './Curl'

const HMAC_ROUNDS = 27

export function addHMAC(transactions: Transaction[], key: Int8Array): Transaction[] {
    const curl = new Curl(HMAC_ROUNDS)
    const bundleHashTrits = trits(transactions[0].bundle)
    const hmac = new Int8Array(Curl.HASH_LENGTH)

    curl.initialize()
    curl.absorb(key, 0, Curl.HASH_LENGTH)
    curl.absorb(bundleHashTrits, 0, Curl.HASH_LENGTH)
    curl.squeeze(hmac, 0, Curl.HASH_LENGTH)

    const hmacTrytes = trytes(hmac)

    return transactions.reduce((acc: Transaction[], transaction) => acc.concat(
        transaction.value > 0
            ?  {
                ...transaction,
                signatureMessageFragment: hmacTrytes + transaction.signatureMessageFragment.substr(81, 2187)
            } 
            : transaction
    ), [])
}
