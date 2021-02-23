import { CuiSetupInit } from "../core/models/setup";
import { ICuiPlugin, ICuiComponent, CuiElement } from "../core/models/interfaces";
import { CuiUtils } from "../core/models/utils";
import { ElementManager } from "./managers/element";
import { CollectionManager } from "./managers/collection";
export declare class CuiInstance {
    #private;
    constructor(setup: CuiSetupInit, plugins: ICuiPlugin[], components: ICuiComponent[]);
    init(): Promise<CuiInstance>;
    finish(): void;
    get(selector: string): ElementManager | undefined;
    collection(selector: string): CollectionManager | undefined;
    select(selector: string): Element | null;
    all(selector: string): Element[] | undefined;
    getUtils(): CuiUtils;
    on(event: string, callback: any, element?: CuiElement): string | null;
    detach(event: string, id: string): void;
    detachAll(event: string): void;
    emit(event: string, element: Element | string, ...args: any[]): void;
    getPlugin(name: string): ICuiPlugin | undefined;
    /**
     * Creates cUI element outside of cUI root scope
     * @param element
     * @param arg
     * @param data
     */
    createCuiElement<T extends object>(element: HTMLElement, arg: string, data: T): Promise<boolean>;
}
