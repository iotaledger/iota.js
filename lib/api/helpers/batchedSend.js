/**
*   Simply batches the requested command and then aggregates the results
*   This API call is only meant for the following Core API calls:
*           - getTrytes
*           - getInclusionStates
*           - getBalances
*
*   @method batchedSend
*   @param {object} command
*   @param {function} callback
*   @returns {object} success
**/
api.prototype.batchedSend = function(command, callback) {

    var self = this;

    var availableKeys = [
        'addresses',
        'hashes',
        'transactions'
    ];

    // Basic key mapping to know the results that we need to modify
    var keyMapping = {
        'getTrytes': 'trytes',
        'getInclusionStates': 'inclusionStates',
        'getBalances': 'balances'
    }

    var searchKeys = Object.keys(command);
    var thisCommand = command.command;

    // If invalid command provided, simply forward to sendCommand
    if (!keyMapping[thisCommand]) {
        return self.sendCommand(command, callback);
    }

    searchKeys.forEach(function(key) {

        if (availableKeys.indexOf(key) > -1) {

            var batchSize = 50;

            // If the requested command has more than 50 items, batch them
            if (command[key].length > batchSize) {

                var aggregatedResults = [];
                var latestResponse;
                var currentIndex = 0;
                // Do whilst loop to basically create and iterate over the batches
                // get the results from sendCommand function and aggregate the results
                async.doWhilst(function(cb) {
                    // Iteratee function

                    var newBatch = command[key].slice(currentIndex, currentIndex + batchSize);

                    // re-assign the batches values
                    var newCommand = command;
                    newCommand[key] = newBatch;

                    self.sendCommand(newCommand, function(error, results) {

                        if (error) {
                            return cb(error);
                        }

                        cb(null, newBatch.length, results)
                    })

                }, function(address, batchLength, transactions) {
                    // Test function with validity check

                    latestResponse = results;
                    // Get the correct key value pair of the search command
                    aggregatedResults.push(results[keyMapping[thisCommand]]);

                    currentIndex += batchSize;

                    // Validity check
                    return batchLength > batchSize;

                }, function(err) {
                    // Final callback

                    if (err) {
                        return callback(err);
                    } else {

                        latestResponse[keyMapping[thisCommand]] = aggregatedResults;

                        return callback(null, latestResponse);
                    }
                })
            } else {

                self.sendCommand(command, callback);
            }
        }

    })
}
