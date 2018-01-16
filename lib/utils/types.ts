export interface Input {
    balance?: number
    security: number
    keyIndex: number
    address: string
}

export interface Transfer {
    address: string
    value: number
    message: string
    tag: string
    obsoleteTag: string
}

export interface Transaction {
    hash: string
    signatureMessageFragment: string
    address: string
    value: number
    obsoleteTag: string
    timestamp: number
    currentIndex: number
    lastIndex: number
    bundle: string
    trunkTransaction: string
    branchTransaction: string
    tag: string
    attachmentTimestamp: number
    attachmentTimestampLowerBound: number
    attachmentTimestampUpperBound: number
    nonce: string
}
