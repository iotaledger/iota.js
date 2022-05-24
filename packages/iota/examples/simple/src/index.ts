import {
    deserializeBlock,
    TAGGED_DATA_PAYLOAD_TYPE,
    logInfo,
    logBlock,
    logBlockMetadata,
    logOutput,
    logTips,
    MAX_NUMBER_PARENTS,
    SingleNodeClient,
    IBlockPartial
} from "@iota/iota.js";
import { Converter, ReadStream } from "@iota/util.js";

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

    const submitBlock: IBlockPartial = {
        // Parents can be left undefined if you want the node to populate the field
        parents: tipsResponse.tips.slice(0, MAX_NUMBER_PARENTS),
        payload: {
            type: TAGGED_DATA_PAYLOAD_TYPE,
            tag: Converter.utf8ToHex("Foo", true),
            data: Converter.utf8ToHex("Bar", true)
        }
    };

    const blockId = await client.blockSubmit(submitBlock);
    console.log("Submit Block:");
    console.log("\tBlock Id", blockId);
    console.log();

    const block = await client.block(blockId);
    console.log("Get Block");
    logBlock("", block);
    console.log();

    const blockMetadata = await client.blockMetadata(blockId);
    console.log("Block Metadata");
    logBlockMetadata("", blockMetadata);
    console.log();

    const blockRaw = await client.blockRaw(blockId);
    console.log("Block Raw");
    console.log("\tRaw:", Converter.bytesToHex(blockRaw, true));
    console.log();
    const decoded = deserializeBlock(new ReadStream(blockRaw));
    console.log("Block Decoded");
    logBlock("", decoded);
    console.log();

    const children = await client.blockChildren(tipsResponse.tips[0]);
    console.log("Children");
    console.log("\tBlock Id:", children.blockId);
    console.log("\tMax Results:", children.maxResults);
    console.log("\tCount:", children.count);
    console.log("\tChildren Block Ids:", children.children);
    console.log();

    const milestone = await client.milestoneByIndex(info.status.latestMilestone.index);
    console.log("Latest Milestone Payload");
    console.log("\tMilestone Index:", milestone.index);
    console.log("\tIncluded Merkel Root", milestone.inclusionMerkleRoot);
    console.log("\tApplied Merkel Root", milestone.appliedMerkleRoot);
    console.log("\tPrevious Milestone Id:", milestone.previousMilestoneId);
    console.log("\tTimestamp:", milestone.timestamp);
    console.log();

    const output = await client.output("0x00000000000000000000000000000000000000000000000000000000000000000000");
    console.log("Output");
    console.log("\tBlock Id:", output.metadata.blockId);
    console.log("\tTransaction Id:", output.metadata.transactionId);
    console.log("\tOutput Index:", output.metadata.outputIndex);
    console.log("\tIs Spent:", output.metadata.isSpent);
    logOutput("\t", output.output);
    console.log();
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
