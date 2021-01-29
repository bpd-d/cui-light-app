export interface ICuiTask {
    start(): void;
    stop(): void;
    getId(): any;
    setCallback(callback: () => void): void;
    setTimeout(timeout: number): void;
}
export declare class CuiTaskRunner implements ICuiTask {
    #private;
    constructor(timeout: number, autoRenew: boolean, callback?: () => void);
    start(): void;
    stop(): void;
    getId(): any;
    private canRun;
    setCallback(callback: () => void): void;
    setTimeout(timeout: number): void;
}
