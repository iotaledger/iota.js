import { retrieveData, sendData, SingleNodeClient } from "@iota/iota.js";
import { Converter } from "@iota/util.js";

// const API_ENDPOINT = "https://chrysalis-nodes.iota.org/";
const API_ENDPOINT = "http://localhost:14265/";

async function run() {
    const client = new SingleNodeClient(API_ENDPOINT);

    const myTag = Converter.utf8ToBytes("MY-DATA-TAG");

    const messageIds = [];

    for (let i = 0; i < 10; i++) {
        console.log("Sending Data");
        const sendResult = await sendData(client, myTag, Converter.utf8ToBytes(`This is data ${i} 🚀`));
        console.log("Received Message Id", sendResult.messageId);
        // console.log(`https://explorer.iota.org/mainnet/message/${sendResult.messageId}`);
        messageIds.push(sendResult.messageId);
    }

    console.log();

    for (let i = 0; i < messageIds.length; i++) {
        console.log("Retrieveing Data");

        const firstResult = await retrieveData(client, messageIds[i]);
        if (firstResult) {
            console.log("Message");
            console.log("\tTag: ", Converter.bytesToUtf8(firstResult.tag));
            console.log("\tData: ", firstResult.data ? Converter.bytesToUtf8(firstResult.data) : "None");
        }
    }
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
