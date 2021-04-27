import { sendData, retrieveData, SingleNodeClient, Converter } from "@iota/iota.js";

const API_ENDPOINT = "https://chrysalis-nodes.iota.org";

async function run() {
    const client = new SingleNodeClient(API_ENDPOINT);

    const myIndex = Converter.utf8ToBytes("MY-DATA-INDEX");

    for (let i = 0; i < 10; i++) {
        console.log("Sending Data")
        const sendResult = await sendData(client, myIndex, Converter.utf8ToBytes(`This is data ${i} 🚀`));
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
            console.log("\tIndex: ",  Converter.bytesToUtf8(firstResult.index));
            console.log("\tData: ", firstResult.data ? Converter.bytesToUtf8(firstResult.data) : "None");
        }

    } else {
        console.log("Found no results");
    }
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));