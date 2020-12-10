import fetch from "node-fetch";

if (!globalThis.fetch) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalThis.fetch = fetch as any;
}

export * from "./index";
