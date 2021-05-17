interface IModule {
    doPow(arrayBuffer: ArrayBuffer, targetScore: number, numCpus: number): number[];
}

declare const mod: IModule;

export default mod;