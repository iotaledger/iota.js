// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ArrayHelper, Blake2b } from "@iota/crypto.js";
import { BigIntHelper, Converter, WriteStream } from "@iota/util.js";
import bigInt from "big-integer";
import { MAX_BLOCK_LENGTH, serializeBlock } from "../binary/block";
import type { IMilestonePayload } from "../index-browser";
import type { IBlockIdResponse } from "../models/api/IBlockIdResponse";
import type { IMilestoneUtxoChangesResponse } from "../models/api/IMilestoneUtxoChangesResponse";
import type { IOutputMetadataResponse } from "../models/api/IOutputMetadataResponse";
import type { IOutputResponse } from "../models/api/IOutputResponse";
import type { IReceiptsResponse } from "../models/api/IReceiptsResponse";
import type { IResponse } from "../models/api/IResponse";
import type { ITipsResponse } from "../models/api/ITipsResponse";
import { DEFAULT_PROTOCOL_VERSION, IBlock } from "../models/IBlock";
import type { IBlockMetadata } from "../models/IBlockMetadata";
import type { IClient } from "../models/IClient";
import type { INodeInfo } from "../models/info/INodeInfo";
import type { IRoutesResponse } from "../models/info/IRoutesResponse";
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
     * Optional PoW provider to be used for blocks with nonce=0/undefined.
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
    private _protocol?: {
        /**
         * The human friendly name of the network on which the node operates on.
         */
        networkName: string;

        /**
         * The network id as a hex encoded 64 bit number.
         */
        networkId: string;

        /**
         * The human readable part of bech32 addresses.
         */
        bech32HRP: string;

        /**
         * The minimum score required for PoW.
         */
        minPoWScore: number;
    };

    /**
     * The protocol version for blocks.
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
        this._basePath = options?.basePath ?? "/api/";
        this._powProvider = options?.powProvider;
        this._timeout = options?.timeout;
        this._userName = options?.userName;
        this._password = options?.password;
        this._headers = options?.headers;
        this._protocolVersion = options?.protocolVersion ?? DEFAULT_PROTOCOL_VERSION;

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
     * Get the routes the node exposes.
     * @returns The routes.
     */
    public async routes(): Promise<IRoutesResponse> {
        return this.fetchJson<never, IRoutesResponse>(this._basePath, "get", "routes");
    }

    /**
     * Get the info about the node.
     * @returns The node information.
     */
    public async info(): Promise<INodeInfo> {
        return this.fetchJson<never, INodeInfo>(this.coreApiPath(), "get", "info");
    }

    /**
     * Get the tips from the node.
     * @returns The tips.
     */
    public async tips(): Promise<ITipsResponse> {
        return this.fetchJson<never, ITipsResponse>(this.coreApiPath(), "get", "tips");
    }

    /**
     * Get the block data by id.
     * @param blockId The block to get the data for.
     * @returns The block data.
     */
    public async block(blockId: string): Promise<IBlock> {
        return this.fetchJson<never, IBlock>(this.coreApiPath(), "get", `blocks/${blockId}`);
    }

    /**
     * Get the block metadata by id.
     * @param blockId The block to get the metadata for.
     * @returns The block metadata.
     */
    public async blockMetadata(blockId: string): Promise<IBlockMetadata> {
        return this.fetchJson<never, IBlockMetadata>(this.coreApiPath(), "get", `blocks/${blockId}/metadata`);
    }

    /**
     * Get the block raw data by id.
     * @param blockId The block to get the data for.
     * @returns The block raw data.
     */
    public async blockRaw(blockId: string): Promise<Uint8Array> {
        return this.fetchBinary(this.coreApiPath(), "get", `blocks/${blockId}`);
    }

    /**
     * Submit block.
     * @param blockPartial The block to submit (possibly contains only partial block data).
     * @param blockPartial.protocolVersion The protocol version under which this block operates.
     * @param blockPartial.parents The parent block ids.
     * @param blockPartial.payload The payload contents.
     * @param blockPartial.nonce The nonce for the block.
     * @returns The blockId.
     */
    public async blockSubmit(
        blockPartial: {
            protocolVersion?: number;
            parents?: string[];
            payload?: IBlock["payload"];
            nonce?: string;
        }
    ): Promise<string> {
        blockPartial.protocolVersion = this._protocolVersion;

        let minPoWScore = 0;
        if (this._powProvider) {
            // If there is a local pow provider and no networkId or parent block ids
            // we must populate them, so that the they are not filled in by the
            // node causing invalid pow calculation
            if (this._protocol === undefined) {
                await this.populateProtocolInfoCache();
            }
            minPoWScore = this._protocol?.minPoWScore ?? 0;

            if (!blockPartial.parents || blockPartial.parents.length === 0) {
                const tips = await this.tips();
                blockPartial.parents = tips.tips;
            }
        }

        const block: IBlock = {
            protocolVersion: blockPartial.protocolVersion ?? DEFAULT_PROTOCOL_VERSION,
            parents: blockPartial.parents ?? [],
            payload: blockPartial.payload,
            nonce: blockPartial.nonce ?? "0"
        };

        const writeStream = new WriteStream();
        serializeBlock(writeStream, block);
        const blockBytes = writeStream.finalBytes();

        if (blockBytes.length > MAX_BLOCK_LENGTH) {
            throw new Error(
                `The block length is ${blockBytes.length}, which exceeds the maximum size of ${MAX_BLOCK_LENGTH}`
            );
        }

        if (this._powProvider) {
            const nonce = await this._powProvider.pow(blockBytes, minPoWScore);
            block.nonce = nonce.toString();
        }

        const response = await this.fetchJson<IBlock, IBlockIdResponse>(this.coreApiPath(), "post", "blocks", block);

        return response.blockId;
    }

    /**
     * Submit block in raw format.
     * @param block The block to submit.
     * @returns The blockId.
     */
    public async blockSubmitRaw(block: Uint8Array): Promise<string> {
        if (block.length > MAX_BLOCK_LENGTH) {
            throw new Error(
                `The block length is ${block.length}, which exceeds the maximum size of ${MAX_BLOCK_LENGTH}`
            );
        }

        block[0] = this._protocolVersion;

        if (this._powProvider && ArrayHelper.equal(block.slice(-8), SingleNodeClient.NONCE_ZERO)) {
            if (this._protocol === undefined) {
                await this.populateProtocolInfoCache();
            }
            const nonce = await this._powProvider.pow(block, this._protocol?.minPoWScore ?? 0);
            BigIntHelper.write8(bigInt(nonce), block, block.length - 8);
        }

        const response = await this.fetchBinary<IBlockIdResponse>(this.coreApiPath(), "post", "blocks", block);

        return (response as IBlockIdResponse).blockId;
    }

    /**
     * Get the block that was included in the ledger for a transaction.
     * @param transactionId The id of the transaction to get the included block for.
     * @returns The block.
     */
    public async transactionIncludedBlock(transactionId: string): Promise<IBlock> {
        return this.fetchJson<never, IBlock>(this.coreApiPath(), "get", `transactions/${transactionId}/included-block`);
    }

    /**
     * Get raw block that was included in the ledger for a transaction.
     * @param transactionId The id of the transaction to get the included block for.
     * @returns The block.
     */
    public async transactionIncludedBlockRaw(transactionId: string): Promise<Uint8Array> {
        return this.fetchBinary(this.coreApiPath(), "get", `transactions/${transactionId}/included-block`);
    }

    /**
     * Get an output by its identifier.
     * @param outputId The id of the output to get.
     * @returns The output details.
     */
    public async output(outputId: string): Promise<IOutputResponse> {
        return this.fetchJson<never, IOutputResponse>(this.coreApiPath(), "get", `outputs/${outputId}`);
    }

    /**
     * Get an outputs metadata by its identifier.
     * @param outputId The id of the output to get the metadata for.
     * @returns The output metadata.
     */
    public async outputMetadata(outputId: string): Promise<IOutputMetadataResponse> {
        return this.fetchJson<never, IOutputMetadataResponse>(this.coreApiPath(), "get", `outputs/${outputId}/metadata`);
    }

    /**
     * Get an outputs raw data.
     * @param outputId The id of the output to get the raw data for.
     * @returns The output raw bytes.
     */
    public async outputRaw(outputId: string): Promise<Uint8Array> {
        return this.fetchBinary(this.coreApiPath(), "get", `outputs/${outputId}`);
    }

    /**
     * Get the requested milestone.
     * @param index The index of the milestone to look up.
     * @returns The milestone payload.
     */
    public async milestoneByIndex(index: number): Promise<IMilestonePayload> {
        return this.fetchJson<never, IMilestonePayload>(this.coreApiPath(), "get", `milestones/by-index/${index}`);
    }

    /**
     * Get the requested milestone raw.
     * @param index The index of the milestone to look up.
     * @returns The milestone payload raw.
     */
    public async milestoneByIndexRaw(index: number): Promise<Uint8Array> {
        return this.fetchBinary(this.coreApiPath(), "get", `milestones/by-index/${index}`);
    }

    /**
     * Get the requested milestone utxo changes.
     * @param index The index of the milestone to request the changes for.
     * @returns The milestone utxo changes details.
     */
    public async milestoneUtxoChangesByIndex(index: number): Promise<IMilestoneUtxoChangesResponse> {
        return this.fetchJson<never, IMilestoneUtxoChangesResponse>(this.coreApiPath(), "get", `milestones/by-index/${index}/utxo-changes`);
    }

    /**
     * Get the requested milestone.
     * @param milestoneId The id of the milestone to look up.
     * @returns The milestone payload.
     */
    public async milestoneById(milestoneId: string): Promise<IMilestonePayload> {
        return this.fetchJson<never, IMilestonePayload>(this.coreApiPath(), "get", `milestones/${milestoneId}`);
    }

    /**
     * Get the requested milestone raw.
     * @param milestoneId The id of the milestone to look up.
     * @returns The milestone payload raw.
     */
    public async milestoneByIdRaw(milestoneId: string): Promise<Uint8Array> {
        return this.fetchBinary(this.coreApiPath(), "get", `milestones/${milestoneId}`);
    }

    /**
     * Get the requested milestone utxo changes.
     * @param milestoneId The id of the milestone to request the changes for.
     * @returns The milestone utxo changes details.
     */
    public async milestoneUtxoChangesById(milestoneId: string): Promise<IMilestoneUtxoChangesResponse> {
        return this.fetchJson<never, IMilestoneUtxoChangesResponse>(this.coreApiPath(), "get", `milestones/${milestoneId}/utxo-changes`);
    }

    /**
     * Get the current treasury output.
     * @returns The details for the treasury.
     */
    public async treasury(): Promise<ITreasury> {
        return this.fetchJson<never, ITreasury>(this.coreApiPath(), "get", "treasury");
    }

    /**
     * Get all the stored receipts or those for a given migrated at index.
     * @param migratedAt The index the receipts were migrated at, if not supplied returns all stored receipts.
     * @returns The stored receipts.
     */
    public async receipts(migratedAt?: number): Promise<IReceiptsResponse> {
        return this.fetchJson<never, IReceiptsResponse>(
            this.coreApiPath(),
            "get",
            `receipts${migratedAt !== undefined ? `/${migratedAt}` : ""}`
        );
    }

    /**
     * Get the list of peers.
     * @returns The list of peers.
     */
    public async peers(): Promise<IPeer[]> {
        return this.fetchJson<never, IPeer[]>(this.coreApiPath(), "get", "peers");
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
        >(this.coreApiPath(), "post", "peers", {
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
        return this.fetchJson<never, void>(this.coreApiPath(), "delete", `peers/${peerId}`);
    }

    /**
     * Get a peer.
     * @param peerId The peer to delete.
     * @returns The details for the created peer.
     */
    public async peer(peerId: string): Promise<IPeer> {
        return this.fetchJson<never, IPeer>(this.coreApiPath(), "get", `peers/${peerId}`);
    }

    /**
     * Get the protocol info from the node.
     * @returns The protocol info.
     */
    public async protocolInfo(): Promise<{
        networkName: string;
        networkId: string;
        bech32HRP: string;
        minPoWScore: number;
    }> {
        if (this._protocol === undefined) {
            await this.populateProtocolInfoCache();
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this._protocol!;
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
        return this.fetchJson<T, S>(this.coreApiPath(), method, `${basePluginPath}${methodPath}${this.combineQueryParams(queryParams)}`, request);
    }

    /**
     * Get the core API route.
     * @returns The core api route.
     */
    private coreApiPath(): string {
        return `${this._basePath}core/v2/`;
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

            const networkIdBytes = Blake2b.sum256(Converter.utf8ToBytes(info.protocol.networkName));

            this._protocol = {
                networkName: info.protocol.networkName,
                networkId: BigIntHelper.read8(networkIdBytes, 0).toString(),
                bech32HRP: info.protocol.bech32HRP,
                minPoWScore: info.protocol.minPoWScore
            };
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
            { "Accept": "application/vnd.iota.serializer-v1" },
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
