import { createHttpClient } from '@iota/http-client'
import { bundle } from '@iota/samples'
import test from 'ava'
import { INVALID_TRANSACTION_TRYTES } from '../../../errors'
import { stringify } from '../../../guards'
import { createSendTrytes } from '../../src'
import { attachToTangleCommand } from './nocks/attachToTangle'
import './nocks/broadcastTransactions'
import { getTransactionsToApproveCommand } from './nocks/getTransactionsToApprove'
import './nocks/storeTransactions'

const { minWeightMagnitude, trytes } = attachToTangleCommand
const { depth } = getTransactionsToApproveCommand

const sendTrytes = createSendTrytes(createHttpClient())

test('sendTrytes() attaches to tangle, broadcasts, stores and resolves to transaction objects.', async t => {
    t.deepEqual(
        await sendTrytes(trytes, depth, minWeightMagnitude),
        bundle,
        'sendTrytes() should attach to tangle, broadcast, store and resolve to transaction objects.'
    )
})

test('sendTrytes() does not mutate original trytes.', async t => {
    const trytesCopy = [...trytes]

    await sendTrytes(trytesCopy, depth, minWeightMagnitude)

    t.deepEqual(trytesCopy, trytes, 'sendTrytes() should not mutate original trytes.')
})

test('sendTrytes() rejects with correct errors for invalid input.', async t => {
  const invalidTrytes = ['asdasDSFDAFD']
  let errorMessage = ''

  try {
      await sendTrytes(invalidTrytes, depth, minWeightMagnitude)
  } catch (error) {
      errorMessage = error.message
  }

  t.is(
      errorMessage,
      `${INVALID_TRANSACTION_TRYTES}: ${stringify(invalidTrytes)}`,
      'sendTrytes() should throw correct error for invalid trytes.'
  )
})

test.cb('sendTrytes() invokes callback', t => {
    sendTrytes(trytes, depth, minWeightMagnitude, undefined, t.end)
})

test.cb('sendTrytes() passes correct arguments to callback', t => {
    sendTrytes(trytes, depth, minWeightMagnitude, undefined, (err, res) => {
        t.is(err, null, 'sendTrytes() should pass null as first argument in callback for successuful requests')

        t.deepEqual(res, bundle, 'sendTrytes() should pass the correct response as second argument in callback')

        t.end()
    })
})
