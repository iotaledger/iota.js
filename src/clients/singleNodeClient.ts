// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { serializeMessage } from "../binary/message";
import { IAddressOutputsResponse } from "../models/api/IAddressOutputsResponse";
import { IAddressResponse } from "../models/api/IAddressResponse";
import { IChildrenResponse } from "../models/api/IChildrenResponse";
import { IMessageIdResponse } from "../models/api/IMessageIdResponse";
import { IMessagesResponse } from "../models/api/IMessagesResponse";
import { IMilestoneResponse } from "../models/api/IMilestoneResponse";
import { IOutputResponse } from "../models/api/IOutputResponse";
import { IResponse } from "../models/api/IResponse";
import { ITipsResponse } from "../models/api/ITipsResponse";
import { IClient } from "../models/IClient";
import { IMessage } from "../models/IMessage";
import { IMessageMetadata } from "../models/IMessageMetadata";
import { INodeInfo } from "../models/INodeInfo";
import { IPeer } from "../models/IPeer";
import { IPowProvider } from "../models/IPowProvider";
import { ArrayHelper } from "../utils/arrayHelper";
import { Bech32Helper } from "../utils/bech32Helper";
import { BigIntHelper } from "../utils/bigIntHelper";
import { Converter } from "../utils/converter";
import { WriteStream } from "../utils/writeStream";
import { ClientError } from "./clientError";

/**
 * Client for API communication.
 */
export class SingleNodeClient implements IClient {
    /**
     * A zero nonce.
     * @internal
     */
    private static readonly NONCE_ZERO: Uint8Array = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);

    /**
     * The endpoint for the API.
     * @internal
     */
    private readonly _endpoint: string;

    /**
     * The base path for the API.
     * @internal
     */
    private readonly _basePath: string;

    /**
     * Optional POW provider to be used for messages with nonce=0/undefined.
     * @internal
     */
    private readonly _powProvider?: IPowProvider;

    /**
     * Create a new instance of client.
     * @param endpoint The endpoint.
     * @param basePath for the API defaults to /api/v1/
     * @param powProvider Optional local POW provider.
     */
    constructor(endpoint: string, basePath?: string, powProvider?: IPowProvider) {
        if (!endpoint) {
            throw new Error("The endpoint can not be empty");
        }
        this._endpoint = endpoint.replace(/\/+$/, "");
        this._basePath = basePath ?? "/api/v1/";
        this._powProvider = powProvider;
    }

    /**
     * Get the health of the node.
     * @returns True if the node is healthy.
     */
    public async health(): Promise<boolean> {
        const status = await this.fetchStatus("/health");

        if (status === 200) {
            return true;
        } else if (status === 503) {
            return false;
        }

        throw new ClientError("Unexpected response code", "/health", status);
    }

    /**
     * Get the info about the node.
     * @returns The node information.
     */
    public async info(): Promise<INodeInfo> {
        return this.fetchJson<never, INodeInfo>("get", "info");
    }

    /**
     * Get the tips from the node.
     * @returns The tips.
     */
    public async tips(): Promise<ITipsResponse> {
        return this.fetchJson<never, ITipsResponse>("get", "tips");
    }

    /**
     * Get the message data by id.
     * @param messageId The message to get the data for.
     * @returns The message data.
     */
    public async message(messageId: string): Promise<IMessage> {
        return this.fetchJson<never, IMessage>("get", `messages/${messageId}`);
    }

    /**
     * Get the message metadata by id.
     * @param messageId The message to get the metadata for.
     * @returns The message metadata.
     */
    public async messageMetadata(messageId: string): Promise<IMessageMetadata> {
        return this.fetchJson<never, IMessageMetadata>("get", `messages/${messageId}/metadata`);
    }

    /**
     * Get the message raw data by id.
     * @param messageId The message to get the data for.
     * @returns The message raw data.
     */
    public async messageRaw(messageId: string): Promise<Uint8Array> {
        return this.fetchBinary("get", `messages/${messageId}/raw`);
    }

    /**
     * Submit message.
     * @param message The message to submit.
     * @returns The messageId.
     */
    public async messageSubmit(message: IMessage): Promise<string> {
        if (!message.nonce || message.nonce.length === 0) {
            if (this._powProvider) {
                // Get the pow targetscore from node info ?
                const targetScore = 100;
                const writeStream = new WriteStream();
                serializeMessage(writeStream, message);
                const messageBytes = writeStream.finalBytes();
                const nonce = await this._powProvider.pow(messageBytes, targetScore);
                message.nonce = nonce.toString(10);
            } else {
                message.nonce = "0";
            }
        }

        const response = await this.fetchJson<IMessage, IMessageIdResponse>("post", "messages", message);

        return response.messageId;
    }

    /**
     * Submit message in raw format.
     * @param message The message to submit.
     * @returns The messageId.
     */
    public async messageSubmitRaw(message: Uint8Array): Promise<string> {
        if (ArrayHelper.equal(message.slice(-8), SingleNodeClient.NONCE_ZERO) && this._powProvider) {
            // Get the pow targetscore from node info ?
            const targetScore = 100;
            const nonce = await this._powProvider.pow(message, targetScore);
            BigIntHelper.write8(nonce, message, message.length - 8);
        }

        const response = await this.fetchBinary<IMessageIdResponse>("post", "messages", message);

        return (response as IMessageIdResponse).messageId;
    }

    /**
     * Find messages by index.
     * @param indexationKey The index value.
     * @returns The messageId.
     */
    public async messagesFind(indexationKey: string): Promise<IMessagesResponse> {
        return this.fetchJson<unknown, IMessagesResponse>(
            "get",
            `messages?index=${encodeURIComponent(indexationKey)}`
        );
    }

    /**
     * Get the children of a message.
     * @param messageId The id of the message to get the children for.
     * @returns The messages children.
     */
    public async messageChildren(messageId: string): Promise<IChildrenResponse> {
        return this.fetchJson<unknown, IChildrenResponse>(
            "get",
            `messages/${messageId}/children`
        );
    }

    /**
     * Find an output by its identifier.
     * @param outputId The id of the output to get.
     * @returns The output details.
     */
    public async output(outputId: string): Promise<IOutputResponse> {
        return this.fetchJson<unknown, IOutputResponse>(
            "get",
            `outputs/${outputId}`
        );
    }

    /**
     * Get the address details.
     * @param addressBech32 The address to get the details for.
     * @returns The address details.
     */
    public async address(addressBech32: string): Promise<IAddressResponse> {
        if (!Bech32Helper.matches(addressBech32)) {
            throw new Error("The supplied address does not appear to be bech32 format");
        }
        return this.fetchJson<unknown, IAddressResponse>(
            "get",
            `addresses/${addressBech32}`
        );
    }

    /**
     * Get the address outputs.
     * @param addressBech32 The address to get the outputs for.
     * @returns The address outputs.
     */
    public async addressOutputs(addressBech32: string): Promise<IAddressOutputsResponse> {
        if (!Bech32Helper.matches(addressBech32)) {
            throw new Error("The supplied address does not appear to be bech32 format");
        }
        return this.fetchJson<unknown, IAddressOutputsResponse>(
            "get",
            `addresses/${addressBech32}/outputs`
        );
    }

    /**
     * Get the address detail using ed25519 address.
     * @param addressEd25519 The address to get the details for.
     * @returns The address details.
     */
    public async addressEd25519(addressEd25519: string): Promise<IAddressResponse> {
        if (!Converter.isHex(addressEd25519)) {
            throw new Error("The supplied address does not appear to be hex format");
        }
        return this.fetchJson<unknown, IAddressResponse>(
            "get",
            `addresses/ed25519/${addressEd25519}`
        );
    }

    /**
     * Get the address outputs using ed25519 address.
     * @param addressEd25519 The address to get the outputs for.
     * @returns The address outputs.
     */
    public async addressEd25519Outputs(addressEd25519: string): Promise<IAddressOutputsResponse> {
        if (!Converter.isHex(addressEd25519)) {
            throw new Error("The supplied address does not appear to be hex format");
        }
        return this.fetchJson<unknown, IAddressOutputsResponse>(
            "get",
            `addresses/ed25519/${addressEd25519}/outputs`
        );
    }

    /**
     * Get the requested milestone.
     * @param index The index of the milestone to get.
     * @returns The milestone details.
     */
    public async milestone(index: number): Promise<IMilestoneResponse> {
        return this.fetchJson<unknown, IMilestoneResponse>(
            "get",
            `milestones/${index}`
        );
    }

    /**
     * Get the list of peers.
     * @returns The list of peers.
     */
    public async peers(): Promise<IPeer[]> {
        return this.fetchJson<unknown, IPeer[]>(
            "get",
            "peers"
        );
    }

    /**
     * Add a new peer.
     * @param multiAddress The address of the peer to add.
     * @param alias An optional alias for the peer.
     * @returns The details for the created peer.
     */
    public async peerAdd(multiAddress: string, alias?: string): Promise<IPeer> {
        return this.fetchJson<{
            multiAddress: string;
            alias?: string;
        }, IPeer>(
            "post",
            "peers",
            {
                multiAddress,
                alias
            }
        );
    }

    /**
     * Delete a peer.
     * @param peerId The peer to delete.
     * @returns Nothing.
     */
    public async peerDelete(peerId: string): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        return this.fetchJson<unknown, void>(
            "delete",
            `peers/${peerId}`
        );
    }

    /**
     * Get a peer.
     * @param peerId The peer to delete.
     * @returns The details for the created peer.
     */
    public async peer(peerId: string): Promise<IPeer> {
        return this.fetchJson<unknown, IPeer>(
            "get",
            `peers/${peerId}`
        );
    }

    /**
     * Perform a request and just return the status.
     * @param route The route of the request.
     * @returns The response.
     * @internal
     */
    private async fetchStatus(route: string): Promise<number> {
        const response = await fetch(
            `${this._endpoint}${route}`,
            {
                method: "get"
            }
        );

        return response.status;
    }

    /**
     * Perform a request in json format.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    private async fetchJson<T, U>(method: "get" | "post" | "delete", route: string, requestData?: T): Promise<U> {
        const response = await fetch(
            `${this._endpoint}${this._basePath}${route}`,
            {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: requestData ? JSON.stringify(requestData) : undefined
            }
        );

        const responseData: IResponse<U> = await response.json();

        if (response.ok && !responseData.error) {
            return responseData.data;
        }

        throw new ClientError(
            responseData.error?.message ?? response.statusText,
            route,
            response.status,
            responseData.error?.code
        );
    }

    /**
     * Perform a request for binary data.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    private async fetchBinary<T>(
        method: "get" | "post",
        route: string,
        requestData?: Uint8Array): Promise<Uint8Array | T> {
        const response = await fetch(
            `${this._endpoint}${this._basePath}${route}`,
            {
                method,
                headers: {
                    "Content-Type": "application/octet-stream"
                },
                body: requestData
            }
        );

        let responseData: IResponse<T> | undefined;
        if (response.ok) {
            if (method === "get") {
                return new Uint8Array(await response.arrayBuffer());
            }
            responseData = await response.json();

            if (!responseData?.error) {
                return responseData?.data as T;
            }
        }

        if (!responseData) {
            responseData = await response.json();
        }

        throw new ClientError(
            responseData?.error?.message ?? response.statusText,
            route,
            response.status,
            responseData?.error?.code
        );
    }
}
