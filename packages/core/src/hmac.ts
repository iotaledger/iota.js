import { tritsToValue } from '@iota/converter'
import Curl from '@iota/curl'
import { bundle, SIGNATURE_OR_MESSAGE_OFFSET, TRANSACTION_LENGTH, value } from '@iota/transaction'

const HMAC_ROUNDS = 27

export default function addHMAC(transactions: Int8Array, key: Int8Array): Int8Array {
    const curl = new Curl(HMAC_ROUNDS)
    const hmac = new Int8Array(Curl.HASH_LENGTH)

    curl.initialize()
    curl.absorb(key, 0, Curl.HASH_LENGTH)
    curl.absorb(bundle(transactions), 0, Curl.HASH_LENGTH)
    curl.squeeze(hmac, 0, Curl.HASH_LENGTH)

    const transactionsCopy = transactions.slice()

    for (let offset = 0; offset < transactionsCopy.length; offset += TRANSACTION_LENGTH) {
        if (tritsToValue(value(transactions, offset)) > 0) {
            transactionsCopy.set(hmac, offset + SIGNATURE_OR_MESSAGE_OFFSET)
        }
    }

    return transactionsCopy
}
