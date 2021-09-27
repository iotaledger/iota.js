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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var big_integer_1 = __importDefault(require("big-integer"));
var iota_js_1 = require("@iota/iota.js");
var pow_node_js_1 = require("@iota/pow-node.js");
var pow_wasm_js_1 = require("@iota/pow-wasm.js");
var pow_neon_js_1 = require("@iota/pow-neon.js");
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var dataLength, targetScore, iterations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dataLength = 500;
                    targetScore = 100;
                    iterations = 1;
                    return [4 /*yield*/, doPow("Neon Pow", dataLength, targetScore, iterations, new pow_neon_js_1.NeonPowProvider(1))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, doPow("Node Pow", dataLength, targetScore, iterations, new pow_node_js_1.NodePowProvider(1))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, doPow("Wasm Pow", dataLength, targetScore, iterations, new pow_wasm_js_1.WasmPowProvider(1))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, doPow("Local Pow", dataLength, targetScore, iterations, new iota_js_1.LocalPowProvider())];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function doPow(name, dataLength, targetScore, iterations, powProvider) {
    return __awaiter(this, void 0, void 0, function () {
        var totalTime, i, data, startTime, nonce, score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(name);
                    console.log("Target Score", targetScore);
                    console.log("Data Length", dataLength);
                    console.log("Iterations", iterations);
                    totalTime = 0;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < iterations)) return [3 /*break*/, 4];
                    data = new Uint8Array(dataLength).fill(1);
                    iota_js_1.BigIntHelper.write8(big_integer_1.default(0), data, data.length - 8);
                    console.log("\tIteration", i + 1);
                    startTime = Date.now();
                    return [4 /*yield*/, powProvider.pow(data, targetScore)];
                case 2:
                    nonce = _a.sent();
                    console.log("\tNonce", nonce);
                    iota_js_1.BigIntHelper.write8(big_integer_1.default(nonce), data, data.length - 8);
                    score = iota_js_1.PowHelper.score(data);
                    console.log("\tScore", score);
                    totalTime += Date.now() - startTime;
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("Average Time (s)", (totalTime / iterations / 1000).toFixed(2));
                    console.log();
                    return [2 /*return*/];
            }
        });
    });
}
run()
    .then(function () { return console.log("Done"); })
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBaUM7QUFDakMseUNBQXdGO0FBQ3hGLGlEQUFvRDtBQUNwRCxpREFBb0Q7QUFDcEQsaURBQW9EO0FBRXBELFNBQWUsR0FBRzs7Ozs7O29CQUNSLFVBQVUsR0FBRyxHQUFHLENBQUM7b0JBQ2pCLFdBQVcsR0FBRyxHQUFHLENBQUM7b0JBQ2xCLFVBQVUsR0FBRyxDQUFDLENBQUM7b0JBRXJCLHFCQUFNLEtBQUssQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsSUFBSSw2QkFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUE7O29CQUFwRixTQUFvRixDQUFBO29CQUNwRixxQkFBTSxLQUFLLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLElBQUksNkJBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFBOztvQkFBcEYsU0FBb0YsQ0FBQTtvQkFDcEYscUJBQU0sS0FBSyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxJQUFJLDZCQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQTs7b0JBQXBGLFNBQW9GLENBQUE7b0JBQ3BGLHFCQUFNLEtBQUssQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsSUFBSSwwQkFBZ0IsRUFBRSxDQUFDLEVBQUE7O29CQUFyRixTQUFxRixDQUFBOzs7OztDQUN4RjtBQUVELFNBQWUsS0FBSyxDQUFDLElBQVksRUFBRSxVQUFrQixFQUFFLFdBQW1CLEVBQUUsVUFBa0IsRUFBRSxXQUF5Qjs7Ozs7O29CQUNySCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUVsQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO29CQUNULENBQUMsR0FBRyxDQUFDOzs7eUJBQUUsQ0FBQSxDQUFDLEdBQUcsVUFBVSxDQUFBO29CQUNwQixJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRCxzQkFBWSxDQUFDLE1BQU0sQ0FBQyxxQkFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7b0JBQzNCLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ2YscUJBQU0sV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLEVBQUE7O29CQUFoRCxLQUFLLEdBQUcsU0FBd0M7b0JBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUM5QixzQkFBWSxDQUFDLE1BQU0sQ0FBQyxxQkFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxLQUFLLEdBQUcsbUJBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUM5QixTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQzs7O29CQVZSLENBQUMsRUFBRSxDQUFBOzs7b0JBYW5DLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxTQUFTLEdBQUcsVUFBVSxHQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzRSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7Ozs7O0NBQ2pCO0FBRUQsR0FBRyxFQUFFO0tBQ0EsSUFBSSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFuQixDQUFtQixDQUFDO0tBQy9CLEtBQUssQ0FBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQyJ9