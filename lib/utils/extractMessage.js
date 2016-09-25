
var extractMessage = function() {



  // Sanity check: if the first tryte pair is not opening bracket, it's not a message
  var firstTrytePair = data.transactions[0].signatureMessageChunk[0] + data.transactions[0].signatureMessageChunk[1];
  if (firstTrytePair !== "OD") {
    console.log("Not a message!");
    processedTxs += 1;
    return
  }


  var index = 0;
  var notEnded = true;
  var tryteChunk = '';
  var trytesChecked = 0;
  var preliminaryStop = false;

  do {

    var messageChunk = data.transactions[index].signatureMessageChunk;

    // We iterate over the message chunk, readying 9 trytes at a time
    for (var i = 0; i < messageChunk.length; i += 9) {
      var trytes = messageChunk.slice(i, i + 9);
      tryteChunk += trytes;

      var upperLimit = tryteChunk.length - tryteChunk.length % 2;

      // Get the trytes to check if we have reached the end of our data
      // The end of the data stream is determined by a closing bracket char
      var trytesToCheck = tryteChunk.slice(trytesChecked, upperLimit);

      // We read 2 trytes at a time and check if it equals the closing bracket char
      for (var j = 0; j < trytesToCheck.length; j += 2) {

        var trytePair = trytesToCheck[j] + trytesToCheck[j + 1];

        // If closing bracket char was found, and there are only trailing 9's
        // we quit and remove the 9's from the tryteChunk.
        if (preliminaryStop && trytePair === "99") {
          notEnded = false;

          // Remove the trailing 9's from tryte data chunk .
          tryteChunk = tryteChunk.slice(0, tryteChunk.length - (trytesToCheck.length - (j + 1)))
          break;
        }

        // If tryte pair equals closing bracket char, we set a preliminary stop
        if (trytePair === "QD") {
          preliminaryStop = true;
        }
      }

      if (!notEnded)
        break;

      trytesChecked = trytesToCheck.length;
    }

    index += 1;

  } while (notEnded);

}


module.exports = extractMessage;
