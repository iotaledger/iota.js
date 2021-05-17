const assert = require("assert");
const myModule = require("..");

const start = Date.now();
for (let i = 0; i < 32; i++) {
    myModule.setDigest(i, 1);
}
myModule.powWorker(8, 0, 0);
const end = Date.now();
const lo = myModule.getNonceLo();
const hi = myModule.getNonceHi();
const nonce = BigInt(lo) | (BigInt(hi) << BigInt(32));
console.log("nonce", nonce)
console.log("duration", end - start);
assert(nonce, BigInt(4936));
