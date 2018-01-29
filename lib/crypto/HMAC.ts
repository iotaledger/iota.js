import Converter from './Converter'
import Curl from './Curl'

const HMAC_ROUNDS = 27

export default class HMAC {
    constructor(private key: Int8Array) {}

    public addHMAC(bundle: any) {
        const curl = new Curl(HMAC_ROUNDS)
        const key = this.key

        /* tslint:disable prefer-for-of */
        for (let i = 0; i < bundle.bundle.length; i++) {
            if (bundle.bundle[i].value > 0) {
                const bundleHashTrits = Converter.trits(bundle.bundle[i].bundle)
                const hmac = new Int8Array(243)

                curl.initialize()
                curl.absorb(key, 0, 243)
                curl.absorb(bundleHashTrits, 0, 243)
                curl.squeeze(hmac, 0, 243)

                const hmacTrytes = Converter.trytes(hmac)
                bundle.bundle[i].signatureMessageFragment =
                    hmacTrytes + bundle.bundle[i].signatureMessageFragment.substring(81, 2187)
            }
        }
    }
}
