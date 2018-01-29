/**
 * Conversion of ascii encoded bytes to trytes.
 * Input is a string (can be stringified JSON object), return value is Trytes
 *
 * How the conversion works:
 *   2 Trytes === 1 Byte
 *   There are a total of 27 different tryte values: 9ABCDEFGHIJKLMNOPQRSTUVWXYZ
 *
 *   1. We get the decimal value of an individual ASCII character
 *   2. From the decimal value, we then derive the two tryte values by basically calculating the tryte equivalent (e.g. 100 === 19 + 3 * 27)
 *     a. The first tryte value is the decimal value modulo 27 (27 trytes)
 *     b. The second value is the remainder (decimal value - first value), divided by 27
 *   3. The two values returned from Step 2. are then input as indices into the available values list ('9ABCDEFGHIJKLMNOPQRSTUVWXYZ') to get the correct tryte value
 *
 *   EXAMPLE:
 *     Lets say we want to convert the ASCII character "Z".
 *     1. 'Z' has a decimal value of 90.
 *     2. 90 can be represented as 9 + 3 * 27. To make it simpler:
 *       a. First value: 90 modulo 27 is 9. This is now our first value
 *       b. Second value: (90 - 9) / 27 is 3. This is our second value.
 *     3. Our two values are now 9 and 3. To get the tryte value now we simply insert it as indices into '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'
 *       a. The first tryte value is '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'[9] === "I"
 *       b. The second tryte value is '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'[3] === "C"
 *       Our tryte pair is "IC"
 *
 *     RESULT:
 *       The ASCII char "Z" is represented as "IC" in trytes.
 * 
 * @method toTrytes
 * @param {string} input - ascii input
 * @return {string | null} string of trytes or null
 */
function toTrytes(input: string): string | null {
    // If input is not a string, return null
    if (typeof input !== 'string') {
        return null
    }

    const TRYTE_VALUES = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let trytes = ''

    for (let i = 0; i < input.length; i++) {
        const char = input[i]
        const asciiValue = char.charCodeAt(0)

        // If not recognizable ASCII character, return null
        if (asciiValue > 255) {
            // asciiValue = 32
            return null
        }

        const firstValue = asciiValue % 27
        const secondValue = (asciiValue - firstValue) / 27

        const trytesValue = TRYTE_VALUES[firstValue] + TRYTE_VALUES[secondValue]

        trytes += trytesValue
    }

    return trytes
}

/**
 * Trytes to bytes
 * Reverse operation from the byteToTrytes function in send.js
 * 2 Trytes == 1 Byte
 * We assume that the trytes are a JSON encoded object thus for our encoding:
 *   First character = {
 *   Last character = }
 *   Everything after that is 9's padding
 *
 * @method fromTrytes
 * @param {string} inputTrytes trytes
 * @return {string | null} string in ascii or null
 */
function fromTrytes(inputTrytes: string): string | null {
    // If input is not a string, return null
    if (typeof inputTrytes !== 'string') {
        return null
    }

    // If input length is odd, return null
    if (inputTrytes.length % 2) {
        return null
    }

    const TRYTE_VALUES = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let outputString = ''

    for (let i = 0; i < inputTrytes.length; i += 2) {
        // get a trytes pair
        const trytes = inputTrytes[i] + inputTrytes[i + 1]

        const firstValue = TRYTE_VALUES.indexOf(trytes[0])
        const secondValue = TRYTE_VALUES.indexOf(trytes[1])

        const decimalValue = firstValue + secondValue * 27

        const character = String.fromCharCode(decimalValue)

        outputString += character
    }

    return outputString
}

export default {
    toTrytes,
    fromTrytes,
}
