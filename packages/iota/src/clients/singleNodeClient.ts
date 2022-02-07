// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ArrayHelper, Blake2b } from "@iota/crypto.js";
import { BigIntHelper, Converter, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";
import { MAX_MESSAGE_LENGTH, serializeMessage } from "../binary/message";
import type { IChildrenResponse } from "../models/api/IChildrenResponse";
import type { IMessageIdResponse } from "../models/api/IMessageIdResponse";
import type { IMilestoneResponse } from "../models/api/IMilestoneResponse";
import type { IMilestoneUtxoChangesResponse } from "../models/api/IMilestoneUtxoChangesResponse";
import type { IOutputResponse } from "../models/api/IOutputResponse";
import type { IReceiptsResponse } from "../models/api/IReceiptsResponse";
import type { IResponse } from "../models/api/IResponse";
import type { ITipsResponse } from "../models/api/ITipsResponse";
import type { IClient } from "../models/IClient";
import type { IMessage } from "../models/IMessage";
import type { IMessageMetadata } from "../models/IMessageMetadata";
import type { INodeInfo } from "../models/INodeInfo";
import type { INodeInfoProtocol } from "../models/INodeInfoProtocol";
import type { IPeer } from "../models/IPeer";
import type { IPowProvider } from "../models/IPowProvider";
import type { ITreasury } from "../models/ITreasury";
import { ClientError } from "./clientError";
import type { SingleNodeClientOptions } from "./singleNodeClientOptions";

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
     * The base plugin path for the API.
     * @internal
     */
    private readonly _basePluginPath: string;

    /**
     * Optional PoW provider to be used for messages with nonce=0/undefined.
     * @internal
     */
    private readonly _powProvider?: IPowProvider;

    /**
     * The Api request timeout.
     * @internal
     */
    private readonly _timeout?: number;

    /**
     * Username for the endpoint.
     * @internal
     */
    private readonly _userName?: string;

    /**
     * Password for the endpoint.
     * @internal
     */
    private readonly _password?: string;

    /**
     * Additional headers to include in the requests.
     * @internal
     */
    private readonly _headers?: { [id: string]: string };

    /**
     * Cached protocol info.
     * @internal
     */
    private _protocol?: INodeInfoProtocol;

    /**
     * The protocol version for messages.
     * @internal
     */
    private readonly _protocolVersion: number;

    /**
     * Create a new instance of client.
     * @param endpoint The endpoint.
     * @param options Options for the client.
     */
    constructor(endpoint: string, options?: SingleNodeClientOptions) {
        if (!endpoint) {
            throw new Error("The endpoint can not be empty");
        }
        this._endpoint = endpoint.replace(/\/+$/, "");
        this._basePath = options?.basePath ?? "/api/v2/";
        this._basePluginPath = options?.basePluginPath ?? "/api/plugins/";
        this._powProvider = options?.powProvider;
        this._timeout = options?.timeout;
        this._userName = options?.userName;
        this._password = options?.password;
        this._headers = options?.headers;
        this._protocolVersion = options?.protocolVersion ?? 1;

        if (this._userName && this._password && !this._endpoint.startsWith("https")) {
            throw new Error("Basic authentication requires the endpoint to be https");
        }

        if (this._userName && this._password && (this._headers?.authorization || this._headers?.Authorization)) {
            throw new Error("You can not supply both user/pass and authorization header");
        }
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
        return this.fetchJson<never, INodeInfo>(this._basePath, "get", "info");
    }

    /**
     * Get the tips from the node.
     * @returns The tips.
     */
    public async tips(): Promise<ITipsResponse> {
        return this.fetchJson<never, ITipsResponse>(this._basePath, "get", "tips");
    }

    /**
     * Get the message data by id.
     * @param messageId The message to get the data for.
     * @returns The message data.
     */
    public async message(messageId: string): Promise<IMessage> {
        return this.fetchJson<never, IMessage>(this._basePath, "get", `messages/${messageId}`);
    }

    /**
     * Get the message metadata by id.
     * @param messageId The message to get the metadata for.
     * @returns The message metadata.
     */
    public async messageMetadata(messageId: string): Promise<IMessageMetadata> {
        return this.fetchJson<never, IMessageMetadata>(this._basePath, "get", `messages/${messageId}/metadata`);
    }

    /**
     * Get the message raw data by id.
     * @param messageId The message to get the data for.
     * @returns The message raw data.
     */
    public async messageRaw(messageId: string): Promise<Uint8Array> {
        return this.fetchBinary(this._basePath, "get", `messages/${messageId}/raw`);
    }

    /**
     * Submit message.
     * @param message The message to submit.
     * @returns The messageId.
     */
    public async messageSubmit(message: IMessage): Promise<string> {
        message.protocolVersion = this._protocolVersion;

        let minPoWScore = 0;
        if (this._powProvider) {
            // If there is a local pow provider and no networkId or parent message ids
            // we must populate them, so that the they are not filled in by the
            // node causing invalid pow calculation
            if (this._protocol === undefined) {
                await this.populateProtocolInfoCache();
            }
            minPoWScore = this._protocol?.minPoWScore ?? 0;

            if (!message.parentMessageIds || message.parentMessageIds.length === 0) {
                const tips = await this.tips();
                message.parentMessageIds = tips.tipMessageIds;
            }
        }

        const writeStream = new WriteStream();
        serializeMessage(writeStream, message);
        const messageBytes = writeStream.finalBytes();

        if (messageBytes.length > MAX_MESSAGE_LENGTH) {
            throw new Error(
                `The message length is ${messageBytes.length}, which exceeds the maximum size of ${MAX_MESSAGE_LENGTH}`
            );
        }

        if (this._powProvider) {
            const nonce = await this._powProvider.pow(messageBytes, minPoWScore);
            message.nonce = nonce.toString();
        }

        const response = await this.fetchJson<IMessage, IMessageIdResponse>(this._basePath, "post", "messages", message);

        return response.messageId;
    }

    /**
     * Submit message in raw format.
     * @param message The message to submit.
     * @returns The messageId.
     */
    public async messageSubmitRaw(message: Uint8Array): Promise<string> {
        if (message.length > MAX_MESSAGE_LENGTH) {
            throw new Error(
                `The message length is ${message.length}, which exceeds the maximum size of ${MAX_MESSAGE_LENGTH}`
            );
        }

        message[0] = this._protocolVersion;

        if (this._powProvider && ArrayHelper.equal(message.slice(-8), SingleNodeClient.NONCE_ZERO)) {
            if (this._protocol === undefined) {
                await this.populateProtocolInfoCache();
            }
            const nonce = await this._powProvider.pow(message, this._protocol?.minPoWScore ?? 0);
            BigIntHelper.write8(bigInt(nonce), message, message.length - 8);
        }

        const response = await this.fetchBinary<IMessageIdResponse>(this._basePath, "post", "messages", message);

        return (response as IMessageIdResponse).messageId;
    }

    /**
     * Get the children of a message.
     * @param messageId The id of the message to get the children for.
     * @returns The messages children.
     */
    public async messageChildren(messageId: string): Promise<IChildrenResponse> {
        return this.fetchJson<never, IChildrenResponse>(this._basePath, "get", `messages/${messageId}/children`);
    }

    /**
     * Get the message that was included in the ledger for a transaction.
     * @param transactionId The id of the transaction to get the included message for.
     * @returns The message.
     */
    public async transactionIncludedMessage(transactionId: string): Promise<IMessage> {
        return this.fetchJson<never, IMessage>(this._basePath, "get", `transactions/${transactionId}/included-message`);
    }

    /**
     * Find an output by its identifier.
     * @param outputId The id of the output to get.
     * @returns The output details.
     */
    public async output(outputId: string): Promise<IOutputResponse> {
        return this.fetchJson<never, IOutputResponse>(this._basePath, "get", `outputs/${outputId}`);
    }

    /**
     * Get the requested milestone.
     * @param index The index of the milestone to get.
     * @returns The milestone details.
     */
    public async milestone(index: number): Promise<IMilestoneResponse> {
        return this.fetchJson<never, IMilestoneResponse>(this._basePath, "get", `milestones/${index}`);
    }

    /**
     * Get the requested milestone utxo changes.
     * @param index The index of the milestone to request the changes for.
     * @returns The milestone utxo changes details.
     */
    public async milestoneUtxoChanges(index: number): Promise<IMilestoneUtxoChangesResponse> {
        return this.fetchJson<never, IMilestoneUtxoChangesResponse>(this._basePath, "get", `milestones/${index}/utxo-changes`);
    }

    /**
     * Get the current treasury output.
     * @returns The details for the treasury.
     */
    public async treasury(): Promise<ITreasury> {
        return this.fetchJson<never, ITreasury>(this._basePath, "get", "treasury");
    }

    /**
     * Get all the stored receipts or those for a given migrated at index.
     * @param migratedAt The index the receipts were migrated at, if not supplied returns all stored receipts.
     * @returns The stored receipts.
     */
    public async receipts(migratedAt?: number): Promise<IReceiptsResponse> {
        return this.fetchJson<never, IReceiptsResponse>(
            this._basePath,
            "get",
            `receipts${migratedAt !== undefined ? `/${migratedAt}` : ""}`
        );
    }

    /**
     * Get the list of peers.
     * @returns The list of peers.
     */
    public async peers(): Promise<IPeer[]> {
        return this.fetchJson<never, IPeer[]>(this._basePath, "get", "peers");
    }

    /**
     * Add a new peer.
     * @param multiAddress The address of the peer to add.
     * @param alias An optional alias for the peer.
     * @returns The details for the created peer.
     */
    public async peerAdd(multiAddress: string, alias?: string): Promise<IPeer> {
        return this.fetchJson<
            {
                multiAddress: string;
                alias?: string;
            },
            IPeer
        >(this._basePath, "post", "peers", {
            multiAddress,
            alias
        });
    }

    /**
     * Delete a peer.
     * @param peerId The peer to delete.
     * @returns Nothing.
     */
    public async peerDelete(peerId: string): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        return this.fetchJson<never, void>(this._basePath, "delete", `peers/${peerId}`);
    }

    /**
     * Get a peer.
     * @param peerId The peer to delete.
     * @returns The details for the created peer.
     */
    public async peer(peerId: string): Promise<IPeer> {
        return this.fetchJson<never, IPeer>(this._basePath, "get", `peers/${peerId}`);
    }

    /**
     * Get the bech 32 human readable part.
     * @returns The bech 32 human readable part.
     */
    public async bech32Hrp(): Promise<string> {
        if (this._protocol === undefined) {
            await this.populateProtocolInfoCache();
        }

        return this._protocol?.bech32HRP ?? "";
    }

    /**
     * Get the network name.
     * @returns The network name.
     */
    public async networkName(): Promise<string> {
        if (this._protocol === undefined) {
            await this.populateProtocolInfoCache();
        }

        return this._protocol?.networkName ?? "";
    }

    /**
     * Get the network id.
     * @returns The network id as the blake256 bytes.
     */
    public async networkId(): Promise<Uint8Array> {
        if (this._protocol === undefined) {
            await this.populateProtocolInfoCache();
        }

        return Blake2b.sum256(Converter.utf8ToBytes(this._protocol?.networkName ?? ""));
    }

    /**
     * Extension method which provides request methods for plugins.
     * @param basePluginPath The base path for the plugin eg indexer/v1/ .
     * @param method The http method.
     * @param methodPath The path for the plugin request.
     * @param queryParams Additional query params for the request.
     * @param request The request object.
     * @returns The response object.
     */
    public async pluginFetch<T, S>(basePluginPath: string, method: "get" | "post" | "delete", methodPath: string, queryParams?: string[], request?: T): Promise<S> {
        return this.fetchJson<T, S>(this._basePluginPath, method, `${basePluginPath}${methodPath}${this.combineQueryParams(queryParams)}`, request);
    }

    /**
     * Perform a request and just return the status.
     * @param route The route of the request.
     * @returns The response.
     * @internal
     */
    private async fetchStatus(route: string): Promise<number> {
        const response = await this.fetchWithTimeout("get", route);

        return response.status;
    }

    /**
     * Populate the info cached fields.
     * @internal
     */
    private async populateProtocolInfoCache(): Promise<void> {
        if (this._protocol === undefined) {
            const info = await this.info();
            this._protocol = info.protocol;
        }
    }

    /**
     * Perform a request in json format.
     * @param basePath The base path for the request.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    private async fetchJson<T, U>(basePath: string, method: "get" | "post" | "delete", route: string, requestData?: T): Promise<U> {
        const response = await this.fetchWithTimeout(
            method,
            `${basePath}${route}`,
            { "Content-Type": "application/json" },
            requestData ? JSON.stringify(requestData) : undefined
        );

        let errorMessage: string | undefined;
        let errorCode: string | undefined;

        if (response.ok) {
            if (response.status === 204) {
                // No content
                return {} as U;
            }
            try {
                const responseData: U & { error?: { code: string; message: string } } = await response.json();

                if (responseData.error) {
                    errorMessage = responseData.error.message;
                    errorCode = responseData.error.code;
                } else {
                    return responseData;
                }
            } catch { }
        }

        if (!errorMessage) {
            try {
                const json = await response.json();
                if (json.error) {
                    errorMessage = json.error.message;
                    errorCode = json.error.code;
                }
            } catch { }
        }

        if (!errorMessage) {
            try {
                const text = await response.text();
                if (text.length > 0) {
                    const match = /code=(\d+), message=(.*)/.exec(text);
                    if (match?.length === 3) {
                        errorCode = match[1];
                        errorMessage = match[2];
                    } else {
                        errorMessage = text;
                    }
                }
            } catch { }
        }

        throw new ClientError(
            errorMessage ?? response.statusText,
            route,
            response.status,
            errorCode ?? response.status.toString()
        );
    }

    /**
     * Perform a request for binary data.
     * @param basePath The base path for the request.
     * @param method The http method.
     * @param route The route of the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    private async fetchBinary<T>(
        basePath: string,
        method: "get" | "post",
        route: string,
        requestData?: Uint8Array
    ): Promise<Uint8Array | T> {
        const response = await this.fetchWithTimeout(
            method,
            `${basePath}${route}`,
            { "Content-Type": "application/octet-stream" },
            requestData
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

    /**
     * Perform a fetch request.
     * @param method The http method.
     * @param route The route of the request.
     * @param headers The headers for the request.
     * @param requestData Request to send to the endpoint.
     * @returns The response.
     * @internal
     */
    private async fetchWithTimeout(
        method: "get" | "post" | "delete",
        route: string,
        headers?: { [id: string]: string },
        body?: string | Uint8Array
    ): Promise<Response> {
        let controller: AbortController | undefined;
        let timerId: NodeJS.Timeout | undefined;

        if (this._timeout !== undefined) {
            controller = new AbortController();
            timerId = setTimeout(() => {
                if (controller) {
                    controller.abort();
                }
            }, this._timeout);
        }

        const finalHeaders: { [id: string]: string } = {};

        if (this._headers) {
            for (const header in this._headers) {
                finalHeaders[header] = this._headers[header];
            }
        }

        if (headers) {
            for (const header in headers) {
                finalHeaders[header] = headers[header];
            }
        }

        if (this._userName && this._password) {
            const userPass = Converter.bytesToBase64(Converter.utf8ToBytes(`${this._userName}:${this._password}`));
            finalHeaders.Authorization = `Basic ${userPass}`;
        }

        try {
            const response = await fetch(`${this._endpoint}${route}`, {
                method,
                headers: finalHeaders,
                body,
                signal: controller ? controller.signal : undefined
            });

            return response;
        } catch (err) {
            throw err instanceof Error && err.name === "AbortError" ? new Error("Timeout") : err;
        } finally {
            if (timerId) {
                clearTimeout(timerId);
            }
        }
    }

    /**
     * Combine the query params.
     * @param queryParams The quer params to combine.
     * @returns The combined query params.
     */
    private combineQueryParams(queryParams?: string[]): string {
        return queryParams && queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    }
}
