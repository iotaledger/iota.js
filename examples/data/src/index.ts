import { sendData, retrieveData, SingleNodeClient, Converter } from "@iota/iota.js";

const API_ENDPOINT = "http://localhost:14265";

async function run() {
    const client = new SingleNodeClient(API_ENDPOINT);

    const myIndex = "MY-DATA-INDEX";

    for (let i = 0; i < 10; i++) {
        console.log("Sending Data")
        const sendResult = await sendData(client, myIndex, Converter.asciiToBytes(`This is data ${i}`));
        console.log("Received Message Id", sendResult.messageId);
    }

    console.log();
    console.log("Finding messages with index");

    const found = await client.messagesFind(myIndex);

    if (found && found.messageIds.length > 0) {
        console.log(`Found: ${found.count} of ${found.maxResults}`);

        const firstResult = await retrieveData(client, found.messageIds[0]);
        if (firstResult) {
            console.log("First Result");
            console.log("\tIndex: ", firstResult.index);
            console.log("\tData: ", Converter.bytesToAscii(firstResult.data));
        }

    } else {
        console.log("Found no results");
    }
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));