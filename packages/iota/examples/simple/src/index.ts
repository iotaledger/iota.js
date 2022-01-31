import {
    deserializeMessage,
    IMessage,
    TAGGED_DATA_PAYLOAD_TYPE,
    logInfo,
    logMessage,
    logMessageMetadata,
    logOutput,
    logTips,
    MAX_NUMBER_PARENTS,
    SingleNodeClient
} from "@iota/iota.js";
import { Converter, ReadStream } from "@iota/util.js";

// const API_ENDPOINT = "https://chrysalis-nodes.iota.org/";
const API_ENDPOINT = "http://localhost:14265/";

async function run() {
    const client = new SingleNodeClient(API_ENDPOINT);

    const health = await client.health();
    console.log("Is the node healthy", health ? "Yes" : "No");
    console.log();

    const info = await client.info();
    console.log("Node Info");
    logInfo("", info);
    console.log();

    const tipsResponse = await client.tips();
    console.log("Tips");
    logTips("", tipsResponse);
    console.log();

    const submitMessage: IMessage = {
        // Parents can be left undefined if you want the node to populate the field
        parentMessageIds: tipsResponse.tipMessageIds.slice(0, MAX_NUMBER_PARENTS),
        payload: {
            type: TAGGED_DATA_PAYLOAD_TYPE,
            tag: Converter.utf8ToHex("Foo"),
            data: Converter.utf8ToHex("Bar")
        }
    };

    const messageId = await client.messageSubmit(submitMessage);
    console.log("Submit Message:");
    console.log("\tMessage Id", messageId);
    console.log();

    const message = await client.message(messageId);
    console.log("Get Message");
    logMessage("", message);
    console.log();

    const messageMetadata = await client.messageMetadata(messageId);
    console.log("Message Metadata");
    logMessageMetadata("", messageMetadata);
    console.log();

    const messageRaw = await client.messageRaw(messageId);
    console.log("Message Raw");
    console.log("\tRaw:", Converter.bytesToHex(messageRaw));
    console.log();
    const decoded = deserializeMessage(new ReadStream(messageRaw));
    console.log("Message Decoded");
    logMessage("", decoded);
    console.log();

    const children = await client.messageChildren(tipsResponse.tipMessageIds[0]);
    console.log("Children");
    console.log("\tMessage Id:", children.messageId);
    console.log("\tMax Results:", children.maxResults);
    console.log("\tCount:", children.count);
    console.log("\tChildren Message Ids:", children.childrenMessageIds);
    console.log();

    const milestone = await client.milestone(info.latestMilestoneIndex);
    console.log("Milestone");
    console.log("\tMilestone Index:", milestone.index);
    console.log("\tMessage Id:", milestone.messageId);
    console.log("\tTimestamp:", milestone.timestamp);
    console.log();

    const output = await client.output("00000000000000000000000000000000000000000000000000000000000000000000");
    console.log("Output");
    console.log("\tMessage Id:", output.messageId);
    console.log("\tTransaction Id:", output.transactionId);
    console.log("\tOutput Index:", output.outputIndex);
    console.log("\tIs Spent:", output.isSpent);
    logOutput("\t", output.output);
    console.log();
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
