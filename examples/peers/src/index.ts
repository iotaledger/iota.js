import { SingleNodeClient } from "@iota/iota.js";

const API_ENDPOINT = "http://localhost:14265/";

async function run() {
    const client = new SingleNodeClient(API_ENDPOINT);

    const peers = await client.peers();
    console.log("Peers");

    if (peers) {
        for (const peer of peers) {
            console.log("\tId:", peer.id);
            console.log("\tMulti Address:", peer.multiAddresses);
            console.log("\tAlias:", peer.alias);
            console.log("\tRelation:", peer.relation);
            console.log("\tConnected:", peer.connected);
            console.log("\tGossip Metrics");
            console.log("\t\tNew Messages:", peer.gossipMetrics.newMessages);
            console.log("\t\tKnown Messages:", peer.gossipMetrics.knownMessages);
            console.log("\t\tReceived Messages:", peer.gossipMetrics.receivedMessages);
            console.log("\t\tReceived Message Requests:", peer.gossipMetrics.receivedMessageRequests);
            console.log("\t\tReceived Milestone Requests:", peer.gossipMetrics.receivedMilestoneRequests);
            console.log("\t\tReceived Hearbeats:", peer.gossipMetrics.receivedHeartbeats);
            console.log("\t\tSent Messages:", peer.gossipMetrics.sentMessages);
            console.log("\t\tSent Message Requsts:", peer.gossipMetrics.sentMessageRequests);
            console.log("\t\tSent Milestone Requsts:", peer.gossipMetrics.sentMilestoneRequests);
            console.log("\t\tSent Heartbeats:", peer.gossipMetrics.sentHeartbeats);
            console.log("\t\tDropped Packets:", peer.gossipMetrics.droppedPackets);
            console.log();
        }
    } else {
        console.log("\nNo Peers");
    }
    
    const addedPeer = await client.peerAdd('/ip4/127.0.0.1/tcp/15601', "fred");
    console.log("Added Peer")
    console.log("\tId:", addedPeer.id);

    const peer2 = await client.peer(addedPeer.id);
    console.log("Got Peer", peer2.id);

    console.log("Deleted Peer")
    await client.peerDelete(addedPeer.id);

}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));