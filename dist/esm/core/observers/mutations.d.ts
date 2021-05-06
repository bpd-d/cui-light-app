import { ICuiComponent, ICuiPluginManager } from "../models/interfaces";
import { CuiCore } from "../models/core";
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
    private _log;
    private _observer;
    private _options;
    private _element;
    private _plugins;
    private _components;
    private _core;
    private _queryString;
    constructor(element: HTMLElement, core: CuiCore);
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
    private _isObserving;
    private _observer;
    private _element;
    private _disabled;
    private _selector;
    private _options;
    private _callback?;
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
