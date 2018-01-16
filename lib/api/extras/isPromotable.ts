/**
 * Wraps {checkConsistency} in a promise so that its value is returned
 */
function isPromotable(tail: string) {
    // Check if is hash
    if (!inputValidator.isHash(tail)) {
        return Promise.resolve(false)
    }

    const command = apiCommands.checkConsistency([tail])

    return new Promise((res, rej) => {
        this.sendCommand(command, (err, isConsistent) => {
            if (err) {
                rej(err)
            }

            res(isConsistent.state)
        })
    })
}
