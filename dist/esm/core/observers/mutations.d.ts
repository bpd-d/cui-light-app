import { ICuiComponent, ICuiPluginManager } from "../models/interfaces";
import { CuiUtils } from "../models/utils";
import { ICuiDevelopmentTool } from "../development/interfaces";
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
    setSelector(selector: string): void;
    setAttributes(attributes: string[]): void;
}
export declare class CuiMutationObserver implements ICuiMutionObserver {
    #private;
    _log: ICuiDevelopmentTool;
    plugins: ICuiPluginManager | undefined;
    constructor(element: HTMLElement, utils: CuiUtils);
    setPlugins(plugins: ICuiPluginManager): ICuiMutionObserver;
    setComponents(components: ICuiComponent[]): ICuiMutionObserver;
    setAttributes(attributes: string[]): ICuiMutionObserver;
    start(): ICuiMutionObserver;
    stop(): ICuiMutionObserver;
    private mutationCallback;
    private handeComponentUpdate;
    private handleChildListMutation;
    private handleAddedNodes;
    private handleAddedChildren;
    private handleAddedNode;
    private handleRemovedNodes;
    private handleDestroyChildren;
}
export declare class CuiComponentMutationHandler implements ICuiComponentMutationObserver {
    #private;
    constructor(target: Element, selector?: string);
    observe(): void;
    unobserve(): void;
    setSelector(selector?: string): void;
    setAttributes(attributes: string[]): void;
    isObserving(): boolean;
    disable(flag: boolean): void;
    onMutation(callback: (record: MutationRecord[]) => void): void;
    private mutationCallback;
    private matchesSelector;
    private isAnyItemMatching;
}
