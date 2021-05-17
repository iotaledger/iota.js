import { IPowProvider, LocalPowProvider, PowHelper, RandomHelper, BigIntHelper } from "@iota/iota.js";
import { NodePowProvider } from "@iota/pow-node.js";
import { WasmPowProvider } from "@iota/pow-wasm.js";
import { NeonPowProvider } from "@iota/pow-neon.js";

async function run() {
    const dataLength = 500;
    const targetScore = 100;
    const iterations = 1;

    await doPow("Neon Pow", dataLength, targetScore, iterations, new NeonPowProvider())
    await doPow("Node Pow", dataLength, targetScore, iterations, new NodePowProvider())
    await doPow("Wasm Pow", dataLength, targetScore, iterations, new WasmPowProvider())
    await doPow("Local Pow", dataLength, targetScore, iterations, new LocalPowProvider())
}

async function doPow(name: string, dataLength: number, targetScore: number, iterations: number, powProvider: IPowProvider) {
    console.log(name);
    console.log("Target Score", targetScore);
    console.log("Data Length", dataLength);
    console.log("Iterations", iterations);

    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
        const data = new Uint8Array(dataLength).fill(1);
        BigIntHelper.write8(BigInt(0), data, data.length - 8);
        console.log("\tIteration", i + 1)
        const startTime = Date.now();
        const nonce = await powProvider.pow(data, targetScore)
        console.log("\tNonce", nonce);
        BigIntHelper.write8(nonce, data, data.length - 8);
        const score = PowHelper.score(data);
        console.log("\tScore", score);
        totalTime += Date.now() - startTime;
    }

    console.log("Average Time (s)", (totalTime / iterations/ 1000).toFixed(2));
    console.log();
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));