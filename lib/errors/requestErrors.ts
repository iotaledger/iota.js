export const invalidResponse = (response: string) => new Error(`Invalid Response: ${response}`)

export const noConnection = (host: string) => new Error(`No connection to host: ${host}`)

export const requestError = (error: string) => new Error(`Request Error: ${error}`)
