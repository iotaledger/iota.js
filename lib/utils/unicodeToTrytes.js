//
//  Conversion of unicode encoded bytes to trytes.
//  Input is a string (can be stringified JSON object), return value is Trytes
//
//  How the conversion works:
//    One Unicode takes 2 Bytes, can be converted to four trytes.
//    There are a total of 27 different tryte values: 9ABCDEFGHIJKLMNOPQRSTUVWXYZ
//
//    1. We get the decimal unicode value of an individual character
//    2. From the decimal value, we then derive the four tryte values by basically calculating the tryte equivalent (e.g. 25615 === 19 + 3*27 + 8*27^2 + 1*27^3)
//      a. The fourth tryte value is the floor integer of decimal value divide 27^3
//      b. The third tryte value is the floor integer of (decimal value - fourth value * 27^3) divide 27^2
//      c. The second tryte value is the floor integer of (decimal value - fourth value * 27^3 - third value * 27^2) divide 27
//      d. The first tryte value is the reminder of decimal value modulo 27 (27 trytes)
//    3. The four values returned from Step 2 are then input as indices into the available values list ('9ABCDEFGHIJKLMNOPQRSTUVWXYZ') to get the correct tryte value
//
//   EXAMPLES
//      Lets say we want to convert the Unicode character "中".
//        1. '中' has a decimal value of 20013.
//        2. 20013 can be represented as 6 + 12 * 27 + 0 * 27^2 + 1 * 27^3. To make it simpler:
//           a. Fourth value: 20013 / 27^3, then get the floor is 1. This is our fourth value.
//           b. Third value: (20013 - 1 * 27^3) / 27^2, then get the floor is 0. This is our third value.
//           c. Second value: (20013 - 1 * 27^3 - 0 * 27^2) / 27, then get the floor is 12. This is our second value.
//           d. First value: 20013 modulo 27 is 6. This is now our first value
//        3. Our two values are now 6, 12, 0 and 1. To get the tryte value now we simply insert it as indices into '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'
//           a. The first tryte value is '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'[6] === "F"
//           b. The second tryte value is '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'[12] === "L"
//           c. The third tryte value is '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'[0] === "9"
//           b. The fourth tryte value is '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'[1] === "A"
//        Our tryte tetrad is "FL9A"
//
//      RESULT:
//        The Unicode char "中" is represented as "FL9A" in trytes.
//
function unicodeToTrytes(input) {

  // If input is not a string, return null
  if ( typeof input !== 'string' ) return null

  var TRYTE_VALUES = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var trytes = "";

  for (var i = 0; i < input.length; i++) {
    var char = input[i];
    var unicodeValue = char.charCodeAt(0);

    var fourthValue = Math.floor(
      unicodeValue / Math.pow(27, 3)
    )
    var thirdValue = Math.floor(
      (unicodeValue - fourthValue * Math.pow(27, 3)) / Math.pow(27, 2)
    )
    var secondValue = Math.floor(
      (unicodeValue - fourthValue * Math.pow(27, 3) - thirdValue * Math.pow(27, 2)) / 27
    )
    var firstValue = unicodeValue % 27
    var trytesValue = TRYTE_VALUES[firstValue] + TRYTE_VALUES[secondValue] + TRYTE_VALUES[thirdValue] + TRYTE_VALUES[fourthValue];

    trytes += trytesValue;
  }

  return trytes;
}


//
//  Trytes to bytes
//  4 Trytes == 1 Unicode character
//  We assume that the trytes are a JSON encoded object thus for our encoding:
//    First character = {
//    Last character = }
//    Everything after that is 9's padding
//
function unicodeFromTrytes(inputTrytes) {

  // If input is not a string, return null
  if ( typeof inputTrytes !== 'string' ) return null

  // If input length is not a multiple of 4, return null
  if ( inputTrytes.length % 4 ) return null

  var TRYTE_VALUES = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var outputString = "";

  for (var i = 0; i < inputTrytes.length; i += 4) {
    // get a trytes tetrad
    var trytes = inputTrytes[i] + inputTrytes[i+1] + inputTrytes[i+2] + inputTrytes[i+3];

    var firstValue = TRYTE_VALUES.indexOf(trytes[0]);
    var secondValue = TRYTE_VALUES.indexOf(trytes[1]);
    var thirdValue = TRYTE_VALUES.indexOf(trytes[2]);
    var fourthValue = TRYTE_VALUES.indexOf(trytes[3])
    var decimalValue = firstValue + secondValue * 27 + thirdValue * Math.pow(27, 2) + fourthValue * Math.pow(27, 3);

    var character = String.fromCharCode(decimalValue);

    outputString += character;
  }

  return outputString;
}

module.exports = {
    unicodeToTrytes: unicodeToTrytes,
    unicodeFromTrytes: unicodeFromTrytes
}
