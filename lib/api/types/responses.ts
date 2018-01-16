export interface GetNodeInfoResponse {
    appName: string
    appVersion: string
    duration: number
    jreAvailableProcessors: number
    jreFreeMemory: number
    jreMaxMemory: number
    jreTotalMemory: number
    latestMilestone: string
    latestMilestoneIndex: number
    latestSolidSubtangleMilestone: string
    latestSolidSubtangleMilestoneIndex: number
    neighbors: number
    packetsQueueSize: number
    time: number
    tips: number
    transactionsToRequest: number
}

export interface Neighbor {
    address: string
    numberOfAllTransactions: number
    numberOfInvalidTransactions: number
    numberOfNewTransactions: number
}

export interface GetNeighborsResponse {
    duration: number
    neighbors: Neighbor[]
}

export interface AddNeighborsResponse {
    addedNeighbors: number
    duration: number
}

export interface RemoveNeighborsResponse {
    removedNeighbors: number
    duration: number
}

export interface GetTipsResponse {
    hashes: string[]
    duration: number
}

export interface FindTransactionsResponse {
    hashes: string[]
}

export interface GetTrytesResponse {
    trytes: string[]
}

export interface GetInclusionStatesResponse {
    states: boolean[]
    duration: number
}

export interface GetBalancesResponse {
    balances: string[]
    duration: number
    milestone: string
    milestoneIndex: number
}

export interface GetTransactionsToApproveResponse {
    trunkTransaction: string
    branchTransaction: string
    duration: number
}

export interface AttachToTangleResponse {
    trytes: string[]
}

export type InterruptAttachToTangleResponse = void
export type BroadcastTransactionsResponse = void
export type StoreTransactionsResponse = void
