declare class IotaClass {

   constructor(settings: {
      provider: string
      sandbox?: boolean
      token?: boolean
   })

   constructor(settings: {
      host: string
      port: number
      sandbox?: boolean
      token?: boolean
   })

   api: IotaApi
   utils: IotaUtils
   multisig: IotaMultisig
   valid: IotaValid

   version: string

}

declare module "iota.lib.js" {
   export = IotaClass
}

/**
*  Types
*/

type Security = 1 | 2 | 3
type IOTAUnit = "i" | "Ki" | "Mi" | "Gi" | "Ti" | "Pi"


/**
*  Objects
*/

interface TransactionObject {
   hash: string
   signatureMessageFragment: string
   address: string
   value: number
   tag: string
   timestamp: number
   currentIndex: number
   lastIndex: number
   bundle: number
   trunkTransaction: string
   branchTransaction: string
   nonce: string
}

interface TransferObject {
   address: string
   balance: number
   keyIndex: number
   security: Security
}

interface NodeInfo {
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

interface Neighbor {
   address: string
   numberOfAllTransactions: number
   numberOfInvalidTransactions: number
   numberOfNewTransactions: number
}

/** 
* 
*  iota.api
* 
**/

interface IriApi {

   getNodeInfo(
      callback: (error: Error, success: NodeInfo) => void
   )

   getNeighbors(
      callback: (error: Error, neighbors: Neighbor[]) => void
   )

   addNeighbors(
      uris: string[],
      callback: (error: Error, addedNeighbors: number) => void
   )

   removeNeighbors(
      uris: string[],
      callback: (error: Error, removedNeighbors: number[]) => void
   )

   getTips(
      callback: (error: Error, hashes: string[]) => void
   )

   findTransactions(
      searchValues: string[],
      callback: (error: Error, hashes: string[]) => void
   )

   getTrytes(
      hashes: string[],
      callback: (error: Error, trytes: string[]) => void
   )

   getInclusionStates(
      transactions: string[],
      tips: string[],
      callback: (error: Error, states: boolean[]) => void
   )

   getBalances(
      addresses: string[],
      treshold: number,
      callback: (error: Error, response: {
         balances: number[]
         milestone: string
         milestoneIndex: number
         duration: number
      }) => void
   )

   getTransactionsToApprove(
      depth: number,
      callback: (error: Error, response: {
         trunkTransaction: string
         branchTransaction: string
         duration: number
      }) => void
   )

   attachToTangle(
      trunkTransaction: string,
      branchTransaction: string,
      minWeightMagnitude: number,
      trytes: string[],
      callback: (error: Error, trytes: string[]) => void
   )

   interruptAttachingToTangle(
      callback: (error: Error, response: {}) => void
   )

   broadcastTransactions(
      trytes: string[],
      callback: (error: Error, response: {}) => void
   )

   storeTransactions(
      trytes: string[],
      callback: (error: Error, response: {}) => void
   )

}

/** 
* 
*  iota.api
* 
**/

interface IotaApi extends IriApi {

   getTransactionsObjects(
      hashes: string[],
      callback?: (error: Error, transactions: TransactionObject[]) => void
   )

   findTransactionObjects(
      searchValues: {
         hashes?: string[]
         bundles?: string[]
         tags?: string[]
         approvees?: string[]
      },
      callback?: (error: Error, transactions: TransactionObject[]) => void
   )

   getLatestInclusion(
      hashes: string[],
      callback?: (error: Error, states: boolean[]) => void
   )

   broadcastAndStore(
      trytes: string[],
      callback?: (error: Error, response: {}) => void
   )

   getNewAddress(
      seed: string,
      options?: {
         index?: number
         checksum?: boolean
         total?: number
         security?: Security
         returnAll?: boolean
      },
      callback?: (error: Error, response: string | string[]) => void
   )

   getInputs(
      seed: string,
      options?: {
         start?: number
         end?: number
         security?: Security
         threshold?: boolean
      },
      callback?: (error: Error, response: {
         inputs: TransferObject[]
      }) => void
   )

   prepareTransfers(
      seed: string,
      transfers: TransferObject[],
      options?: {
         inputs?: string[],
         address?: string,
         security?: Security
      },
      callback?: (error: Error, response: {
         trytes: string[]
      }) => void
   )

   sendTrytes(
      trytes: string[],
      depth: number,
      minWeightMagnitude: number,
      callback?: (error: Error, response: {
         inputs: TransactionObject[]
      }) => void
   )

   sendTransfer(
      seed: string,
      depth: number,
      minWeightMagnitude: number,
      transfers: TransferObject[],
      options?: {
         inputs: string[],
         address: string
      },
      callback?: (error: Error, response: {
         inputs: TransactionObject[]
      }) => void
   )

   replayBundle(
      transactionHash: string,
      depth: number,
      minWeightMagnitude: number,
      callback?: (error: Error, response: {}) => void
   )

   broadcastBundle(
      transactionHash: string,
      callback?: (error: Error, response: {}) => void
   )

   getBundle(
      transactionHash: string,
      callback?: (error: Error, bundle: TransactionObject[]) => void
   )

   getTransfers(
      seed: string,
      options?: {
         start?: number
         end?: number
         security?: Security
         inclusionStates?: boolean
      },
      callback?: (error: Error, transfers: TransactionObject[][]) => void
   )

   getAccountData(
      seed: string,
      options?: {
         start: number
         end: number
         security?: Security
      },
      callback?: (error: Error, response: {
         latestAddress: string
         addresses: string[]
         transfers: string[]
         inputs: TransferObject[]
         balance: number
      }) => void
   )

   isReattachable(
      address: string | string[],
      callback?: (error: Error, response: boolean | boolean[]) => void
   )

}

/** 
* 
*  iota.utils
* 
**/

interface IotaUtils {

   convertUnits(
      value: number,
      fromUnit: IOTAUnit,
      toUnit: IOTAUnit
   ): number

   addChecksum(
      inputValue: string,
      checksumLength: number,
      isAddress: boolean
   ): string

   addChecksum(
      inputValue: string[],
      checksumLength: number,
      isAddress: boolean
   ): string[]

   noChecksum(
      address: string
   ): string

   noChecksum(
      address: string[]
   ): string[]

   isValidChecksum(
      addressWithChecksum: string
   ): boolean

   transactionObject(
      trytes: string
   ): TransactionObject

   transactionTrytes(
      transaction: TransactionObject
   ): string

   categorizeTransfers(
      transfers: TransactionObject[],
      addresses: string[]
   ): {
         sent: TransactionObject[]
         received: TransactionObject[]
      }

   toTrytes(
      input: string
   ): string

   fromTrytes(
      trytes: string
   ): string

   extractJson(
      bundle: string[]
   ): string

   validateSignatures(
      signedBundle: string[],
      inputAddress: string
   ): boolean

   isBundle(
      bundle: TransactionObject[]
   ): boolean

}

/** 
* 
*  iota.multisig
* 
**/

interface IotaMultisig {

   getKey(
      seed: string,
      index: number,
      security: Security
   ): string

   getDigest(
      seed: string,
      index: number,
      security: Security
   ): string

   address(
      digestTrytes: string | string[]
   ): MultisigAddress

   validateAddress(
      multisigAddress: string,
      digests: string[]
   ): boolean

   initiateTransfer(
      securitySum: number,
      inputAddress: string,
      remainderAddress: string,
      transfers: TransferObject[],
      callback?: (error: Error, bundle: TransactionObject[]) => void
   )

   addSignature(
      bundleToSign: TransactionObject[],
      inputAddress: string,
      key: string,
      callback?: (error: Error, bundle: TransactionObject[]) => void
   )

}

interface MultisigAddress {

   absorb(
      digest: string | string[]
   ): MultisigAddress

   finalize(): string

}

/** 
* 
*  iota.valid
* 
**/

interface IotaValid {

   isAddress(address: string): boolean

   isTrytes(trytes: string, length?: number): boolean

   isValue(value: any): boolean

   isNum(value: any): boolean

   isHash(hash: any): boolean

   isTransfersArray(transfers: any): boolean

   isArrayOfHashes(hashes: any): boolean

   isArrayOfTrytes(trytes: any): boolean

   isArrayOfAttachedTrytes(trytes: any): boolean

   isArrayOfTxObjects(transactions: any): boolean

   isInputs(inputs: any): boolean

   isString(string: any): boolean

   isArray(array: any): boolean

   isObject(object: any): boolean

   isUri(uri: any): boolean

}