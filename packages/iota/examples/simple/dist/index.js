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
const iota_js_1 = require("@iota/iota.js");
const util_js_1 = require("@iota/util.js");
const API_ENDPOINT = "http://localhost:14265/";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new iota_js_1.SingleNodeClient(API_ENDPOINT);
        const health = yield client.health();
        console.log("Is the node healthy", health ? "Yes" : "No");
        console.log();
        const info = yield client.info();
        console.log("Node Info");
        (0, iota_js_1.logInfo)("", info);
        console.log();
        const tipsResponse = yield client.tips();
        console.log("Tips");
        (0, iota_js_1.logTips)("", tipsResponse);
        console.log();
        const submitMessage = {
            // Parents can be left undefined if you want the node to populate the field
            parentMessageIds: tipsResponse.tipMessageIds.slice(0, iota_js_1.MAX_NUMBER_PARENTS),
            payload: {
                type: iota_js_1.TAGGED_DATA_PAYLOAD_TYPE,
                tag: util_js_1.Converter.utf8ToHex("Foo"),
                data: util_js_1.Converter.utf8ToHex("Bar")
            }
        };
        const messageId = yield client.messageSubmit(submitMessage);
        console.log("Submit Message:");
        console.log("\tMessage Id", messageId);
        console.log();
        const message = yield client.message(messageId);
        console.log("Get Message");
        (0, iota_js_1.logMessage)("", message);
        console.log();
        const messageMetadata = yield client.messageMetadata(messageId);
        console.log("Message Metadata");
        (0, iota_js_1.logMessageMetadata)("", messageMetadata);
        console.log();
        const messageRaw = yield client.messageRaw(messageId);
        console.log("Message Raw");
        console.log("\tRaw:", util_js_1.Converter.bytesToHex(messageRaw));
        console.log();
        const decoded = (0, iota_js_1.deserializeMessage)(new util_js_1.ReadStream(messageRaw));
        console.log("Message Decoded");
        (0, iota_js_1.logMessage)("", decoded);
        console.log();
        const children = yield client.messageChildren(tipsResponse.tipMessageIds[0]);
        console.log("Children");
        console.log("\tMessage Id:", children.messageId);
        console.log("\tMax Results:", children.maxResults);
        console.log("\tCount:", children.count);
        console.log("\tChildren Message Ids:", children.childrenMessageIds);
        console.log();
        const milestone = yield client.milestone(info.status.latestMilestoneIndex);
        console.log("Milestone");
        console.log("\tMilestone Index:", milestone.index);
        console.log("\tMessage Id:", milestone.messageId);
        console.log("\tTimestamp:", milestone.timestamp);
        console.log();
        const output = yield client.output("00000000000000000000000000000000000000000000000000000000000000000000");
        console.log("Output");
        console.log("\tMessage Id:", output.messageId);
        console.log("\tTransaction Id:", output.transactionId);
        console.log("\tOutput Index:", output.outputIndex);
        console.log("\tIs Spent:", output.isSpent);
        (0, iota_js_1.logOutput)("\t", output.output);
        console.log();
    });
}
run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FXdUI7QUFDdkIsMkNBQXNEO0FBRXRELE1BQU0sWUFBWSxHQUFHLHlCQUF5QixDQUFDO0FBRS9DLFNBQWUsR0FBRzs7UUFDZCxNQUFNLE1BQU0sR0FBRyxJQUFJLDBCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWxELE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFELE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVkLE1BQU0sSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekIsSUFBQSxpQkFBTyxFQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsQixPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFZCxNQUFNLFlBQVksR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUEsaUJBQU8sRUFBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDMUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWQsTUFBTSxhQUFhLEdBQWE7WUFDNUIsMkVBQTJFO1lBQzNFLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSw0QkFBa0IsQ0FBQztZQUN6RSxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLGtDQUF3QjtnQkFDOUIs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