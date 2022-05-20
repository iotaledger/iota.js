import { retrieveData, sendData, SingleNodeClient } from "@iota/iota.js";
import { Converter } from "@iota/util.js";

const API_ENDPOINT = "http://localhost:14265/";

async function run() {
    const client = new SingleNodeClient(API_ENDPOINT);

    const myTag = Converter.utf8ToBytes("MY-DATA-TAG");

    const blockIds = [];

    for (let i = 0; i < 10; i++) {
        console.log("Sending Data");
        const sendResult = await sendData(client, myTag, Converter.utf8ToBytes(`This is data ${i} 🚀`));
        console.log("Received Block Id", sendResult.blockId);
        // console.log(`https://explorer.iota.org/mainnet/block/${sendResult.blockId}`);
        blockIds.push(sendResult.blockId);
    }

    console.log();

    for (let i = 0; i < blockIds.length; i++) {
        console.log("Retrieveing Data");

        const firstResult = await retrieveData(client, blockIds[i]);
        if (firstResult) {
            console.log("Block");
            console.log("\tTag: ", firstResult.tag ? Converter.bytesToUtf8(firstResult.tag) : "None");
            console.log("\tData: ", firstResult.data ? Converter.bytesToUtf8(firstResult.data) : "None");
        }
    }
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
