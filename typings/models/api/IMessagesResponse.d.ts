/**
 * List of messages found.
 */
export interface IMessagesResponse {
    /**
     * The index where the message were found.
     */
    index: string;
    /**
     * The max number of results returned.
     */
    maxResults: number;
    /**
     * The number of items returned.
     */
    count: number;
    /**
     * The ids of the messages returned.
     */
    messageIds: string[];
}
