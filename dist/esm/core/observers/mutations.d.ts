import { ICuiLogger, ICuiComponent, ICuiPluginManager } from "../models/interfaces";
import { CuiUtils } from "../models/utils";
export interface ICuiMutionObserver {
    setPlugins(plugins: ICuiPluginManager): ICuiMutionObserver;
    setComponents(components: ICuiComponent[]): ICuiMutionObserver;
    setAttributes(attributes: string[]): ICuiMutionObserver;
    start(): ICuiMutionObserver;
    stop(): ICuiMutionObserver;
}
export interface ICuiComponentMutationObserver {
    observe(): void;
    unobserve(): void;
    isObserving(): boolean;
    onMutation(callback: (record: MutationRecord[]) => void): void;
    disable(flag: boolean): void;
}
export declare class CuiMutationObserver implements ICuiMutionObserver {
    #private;
    _log: ICuiLogger;
    plugins: ICuiPluginManager | undefined;
    constructor(element: HTMLElement, utils: CuiUtils);
    setPlugins(plugins: ICuiPluginManager): ICuiMutionObserver;
    setComponents(components: ICuiComponent[]): ICuiMutionObserver;
    setAttributes(attributes: string[]): ICuiMutionObserver;
    start(): ICuiMutionObserver;
    stop(): ICuiMutionObserver;
    private mutationCallback;
    private handleChildListMutation;
    private handleAddedNodes;
    private handleRemovedNodes;
    private destroySingleElement;
}
export declare class CuiComponentMutationHandler implements ICuiComponentMutationObserver {
    #private;
    constructor(target: Element);
    observe(): void;
    unobserve(): void;
    isObserving(): boolean;
    disable(flag: boolean): void;
    onMutation(callback: (record: MutationRecord[]) => void): void;
}
