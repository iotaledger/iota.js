import { Transaction } from '../api/types'
import ascii from './asciiToTrytes'

/**
 * Takes a bundle as input and from the signatureMessageFragments extracts the correct JSON
 * data which was encoded and sent with the transaction.
 *
 * @method extractJson
 * @param {array} bundle
 * @returns {Object}
 */
export default function extractJson(bundle: Transaction[]): string | null {
    // if wrong input return null
    if (!Array.isArray(bundle) || bundle[0] === undefined) {
        return null
    }

    // Sanity check: if the first tryte pair is not opening bracket, it's not a message
    const firstTrytePair = bundle[0].signatureMessageFragment[0] + bundle[0].signatureMessageFragment[1]

    if (firstTrytePair !== 'OD') {
        return null
    }

    let index = 0
    let notEnded = true
    let trytesChunk = ''
    let trytesChecked = 0
    let preliminaryStop = false
    let finalJson = ''

    while (index < bundle.length && notEnded) {
        const messageChunk = bundle[index].signatureMessageFragment

        // We iterate over the message chunk, reading 9 trytes at a time
        for (let i = 0; i < messageChunk.length; i += 9) {
            // get 9 trytes
            const trytes = messageChunk.slice(i, i + 9)
            trytesChunk += trytes

            // Get the upper limit of the tytes that need to be checked
            // because we only check 2 trytes at a time, there is sometimes a leftover
            const upperLimit = trytesChunk.length - trytesChunk.length % 2

            const trytesToCheck = trytesChunk.slice(trytesChecked, upperLimit)

            // We read 2 trytes at a time and check if it equals the closing bracket character
            for (let j = 0; j < trytesToCheck.length; j += 2) {
                const trytePair = trytesToCheck[j] + trytesToCheck[j + 1]

                // If closing bracket char was found, and there are only trailing 9's
                // we quit and remove the 9's from the trytesChunk.
                if (preliminaryStop && trytePair === '99') {
                    notEnded = false
                    // TODO: Remove the trailing 9's from trytesChunk
                    // var closingBracket = trytesToCheck.indexOf('QD') + 1;

                    // trytesChunk = trytesChunk.slice( 0, ( trytesChunk.length - trytesToCheck.length ) + ( closingBracket % 2 === 0 ? closingBracket : closingBracket + 1 ) );

                    break
                }

                finalJson += ascii.fromTrytes(trytePair)

                // If tryte pair equals closing bracket char, we set a preliminary stop
                // the preliminaryStop is useful when we have a nested JSON object
                if (trytePair === 'QD') {
                    preliminaryStop = true
                }
            }

            if (!notEnded) {
                break
            }

            trytesChecked += trytesToCheck.length
        }

        // If we have not reached the end of the message yet, we continue with the next
        // transaction in the bundle
        index += 1
    }

    // If we did not find any JSON, return null
    if (notEnded) {
        return null
    } else {
        return finalJson
    }
}
