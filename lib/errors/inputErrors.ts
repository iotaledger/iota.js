export default {
    invalidTrytes() {
        return new Error('Invalid Trytes provided')
    },
    invalidSeed() {
        return new Error('Invalid Seed provided')
    },
    invalidIndex() {
        return new Error('Invalid Index option provided')
    },
    invalidSecurity() {
        return new Error('Invalid Security option provided')
    },
    invalidChecksum(address: string) {
        return new Error('Invalid Checksum supplied for address: ' + address)
    },
    invalidAttachedTrytes() {
        return new Error('Invalid attached Trytes provided')
    },
    invalidTransfers() {
        return new Error('Invalid transfers object')
    },
    invalidKey() {
        return new Error('You have provided an invalid key value')
    },
    invalidTrunkOrBranch(hash: string) {
        return new Error('You have provided an invalid hash as a trunk/branch: ' + hash)
    },
    invalidUri(uri: string) {
        return new Error('You have provided an invalid URI for your Neighbor: ' + uri)
    },
    notInt() {
        return new Error('One of your inputs is not an integer')
    },
    invalidInputs(hash?: string) {
        return new Error('Invalid inputs provided')
    },
    inconsistentSubtangle(tail: string) {
        return new Error('Inconsistent subtangle: ' + tail)
    },
    invalidBundleHash() {
        return new Error('Invalid bundle hash provided')
    },
}
