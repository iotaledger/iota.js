/**
 *   Generates a new address
 *
 *   @method newAddress
 *   @param      {string} seed
 *   @param      {int} index
 *   @param      {int} security      Security level of the private key
 *   @param      {bool} checksum
 *   @returns    {string} address     Transaction objects
 **/
function newAddress(seed: string, index: number, security: number, checksum: boolean) {
    const key = Signing.key(Converter.trits(seed), index, security)
    const digests = Signing.digests(key)
    const addressTrits = Signing.address(digests)
    let address = Converter.trytes(addressTrits)

    if (checksum) {
        address = Utils.addChecksum(address)
    }

    return address
}
