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
            if (peer.gossip) {
                if (peer.gossip.heartbeat) {
                    console.log("\tGossip Heartbeat");
                    console.log("\t\tLatest Milestone Index:", peer.gossip.heartbeat.latestMilestoneIndex);
                    console.log("\t\tPruned Milestone Index:", peer.gossip.heartbeat.prunedMilestoneIndex);
                    console.log("\t\tSolid Milestone Index:", peer.gossip.heartbeat.solidMilestoneIndex);
                    console.log("\t\tConnected Peers:", peer.gossip.heartbeat.connectedPeers);
                    console.log("\t\tSynced Peers:", peer.gossip.heartbeat.syncedPeers);
                }
                console.log("\tGossip Metrics");
                console.log("\t\tNew Blocks:", peer.gossip.metrics.newBlocks);
                console.log("\t\tKnown Blocks:", peer.gossip.metrics.knownBlocks);
                console.log("\t\tReceived Blocks:", peer.gossip.metrics.receivedBlocks);
                console.log("\t\tReceived Block Requests:", peer.gossip.metrics.receivedBlockRequests);
                console.log("\t\tReceived Milestone Requests:", peer.gossip.metrics.receivedMilestoneRequests);
                console.log("\t\tReceived Hearbeats:", peer.gossip.metrics.receivedHeartbeats);
                console.log("\t\tSent Blocks:", peer.gossip.metrics.sentBlocks);
                console.log("\t\tSent Block Requests:", peer.gossip.metrics.sentBlockRequests);
                console.log("\t\tSent Milestone Requests:", peer.gossip.metrics.sentMilestoneRequests);
                console.log("\t\tSent Heartbeats:", peer.gossip.metrics.sentHeartbeats);
                console.log("\t\tDropped Packets:", peer.gossip.metrics.droppedPackets);
                console.log();
            }
        }
    } else {
        console.log("\nNo Peers");
    }

    const address = "/ip4/127.0.0.1/tcp/15601";
    const peerId = "djhgkdjfghkdfjhdfkjghkdfgh";
    const addedPeer = await client.peerAdd(`${address}/p2p/${peerId}`, "fred");
    console.log("Added Peer");
    console.log("\tId:", addedPeer.id);

    const peer2 = await client.peer(addedPeer.id);
    console.log("Got Peer", peer2.id);

    console.log("Deleted Peer");
    await client.peerDelete(addedPeer.id);
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
