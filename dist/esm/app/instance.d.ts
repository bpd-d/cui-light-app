import { CuiSetupInit } from "../core/models/setup";
import { ICuiPlugin, ICuiComponent, CuiElement } from "../core/models/interfaces";
import { CuiCore } from "../core/models/core";
import { ElementManager } from "./managers/element";
import { ICuiApiHandler } from "src/core/api/interfaces";
export declare class CuiInstance {
    private _log;
    private _mutationObserver;
    private _core;
    private _plugins;
    private _components;
    private _rootElement;
    private _mutatedAttributes;
    private _api;
    constructor(setup: CuiSetupInit, plugins: ICuiPlugin[], components: ICuiComponent[]);
    init(): Promise<CuiInstance>;
    finish(): void;
    get(selector: string): ElementManager | undefined;
    all(selector: string): Element[] | undefined;
    getUtils(): CuiCore;
    on(event: string, callback: any, element?: CuiElement): string | null;
    detach(event: string, id: string): void;
    detachAll(event: string): void;
    emit(event: string, element: Element | string, ...args: any[]): void;
    getPlugin(name: string): ICuiPlugin | undefined;
    api(): ICuiApiHandler;
    /**
     * Creates cUI element outside of cUI root scope
     * @param element
     * @param arg
     * @param data
     */
    createCuiElement<T extends object>(element: HTMLElement, arg: string, data: T): Promise<boolean>;
}
