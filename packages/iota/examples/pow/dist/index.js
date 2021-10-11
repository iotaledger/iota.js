"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bigInt = require("big-integer");
const util_js_1 = require("@iota/util.js");
const iota_js_1 = require("@iota/iota.js");
const pow_node_js_1 = require("@iota/pow-node.js");
const pow_wasm_js_1 = require("@iota/pow-wasm.js");
const pow_neon_js_1 = require("@iota/pow-neon.js");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataLength = 500;
        const targetScore = 100;
        const iterations = 1;
        yield doPow("Neon Pow", dataLength, targetScore, iterations, new pow_neon_js_1.NeonPowProvider(1));
        yield doPow("Node Pow", dataLength, targetScore, iterations, new pow_node_js_1.NodePowProvider(1));
        yield doPow("Wasm Pow", dataLength, targetScore, iterations, new pow_wasm_js_1.WasmPowProvider(1));
        yield doPow("Local Pow", dataLength, targetScore, iterations, new iota_js_1.LocalPowProvider());
    });
}
function doPow(name, dataLength, targetScore, iterations, powProvider) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(name);
        console.log("Target Score", targetScore);
        console.log("Data Length", dataLength);
        console.log("Iterations", iterations);
        let totalTime = 0;
        for (let i = 0; i < iterations; i++) {
            const data = new Uint8Array(dataLength).fill(1);
            util_js_1.BigIntHelper.write8(bigInt(0), data, data.length - 8);
            console.log("\tIteration", i + 1);
            const startTime = Date.now();
            const nonce = yield powProvider.pow(data, targetScore);
            console.log("\tNonce", nonce);
            util_js_1.BigIntHelper.write8(bigInt(nonce), data, data.length - 8);
            const score = iota_js_1.PowHelper.score(data);
            console.log("\tScore", score);
            totalTime += Date.now() - startTime;
        }
        console.log("Average Time (s)", (totalTime / iterations / 1000).toFixed(2));
        console.log();
    });
}
run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsMkNBQTZDO0FBQzdDLDJDQUEwRTtBQUMxRSxtREFBb0Q7QUFDcEQsbURBQW9EO0FBQ3BELG1EQUFvRDtBQUVwRCxTQUFlLEdBQUc7O1FBQ2QsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN4QixNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFFckIsTUFBTSxLQUFLLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLElBQUksNkJBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLE1BQU0sS0FBSyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxJQUFJLDZCQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRixNQUFNLEtBQUssQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsSUFBSSw2QkFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckYsTUFBTSxLQUFLLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLElBQUksMEJBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQzFGLENBQUM7Q0FBQTtBQUVELFNBQWUsS0FBSyxDQUNoQixJQUFZLEVBQ1osVUFBa0IsRUFDbEIsV0FBbUIsRUFDbkIsVUFBa0IsRUFDbEIsV0FBeUI7O1FBRXpCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFdEMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsTUFBTSxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELHNCQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzdCLE1BQU0sS0FBSyxHQUFHLE1BQU0sV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDOUIsc0JBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFELE1BQU0sS0FBSyxHQUFHLG1CQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlCLFNBQVMsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO1NBQ3ZDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFNBQVMsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FBQTtBQUVELEdBQUcsRUFBRTtLQUNBLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQy9CLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyJ9