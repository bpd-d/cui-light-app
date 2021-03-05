import { CuiUtils } from "./utils";

export interface IUIInteractionProvider {
    mutate(callback: any, ctx: any, ...args: any[]): void;
    fetch(callback: any, ctx: any, ...args: any[]): void;
}

export interface ICuiDictionary<T> {
    add(key: string, value: T): void;
    remove(key: string): void;
    get(key: string): T | undefined;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): T[];
    indexOf(key: string): number;
    forEach(callback: (key: string, value: T) => void): void;
    update(key: string, value: T): void;
    clear(): void;
}

export interface ICuiDictionaryItem<T> {
    key: string;
    value: T;
}

export interface ICuiComponentHandler {
    handle(args: any): Promise<boolean>;
    refresh?(args: any): Promise<boolean>;
    destroy(): Promise<boolean>;
}

export interface ICuiElementHandlers {
    [id: string]: ICuiComponentHandler;
}

export interface ICuiOpenable {
    open(args?: any): Promise<boolean>;
}

export interface ICuiSwitchable {
    switch(index: number): Promise<boolean>;
}

export interface ICuiClosable {
    close(args?: any): Promise<boolean>;
}

export interface CuiCachable {
    refresh(): boolean;
}

export interface ICuiParsable {
    parse(val: any): void;
}

export interface ICui {
    getId(): string;
}

export interface ICuiManager<T> {
    put(key: string, element: T): void;
    get(key: string): T | undefined;
    has(key: string): boolean;
    remove(key: string): boolean;
    clear(): void;
}

export interface ICuiPlugin {
    description: string;
    name: string;
    setup: any;
    init(utils: CuiUtils): void;
    destroy(): void;
}

export interface ICuiMutiationPlugin {
    mutation(record: MutationRecord): Promise<boolean>;
}



export interface CuiContext {
    getId(): string;
}

export interface ICuiComponentFactory {
    get(element: Element, sutils: CuiUtils): ICuiComponentHandler;
}

export interface ICuiComponent {
    attribute: string;
    getStyle(): string | null;
    get(element: HTMLElement, sutils: CuiUtils): ICuiComponentHandler;
}

export interface ICuiPluginManager {
    init(utils: CuiUtils): void;
    get(name: string): ICuiPlugin | undefined;
    has(name: string): boolean;
    onMutation(mutation: MutationRecord): Promise<boolean>;
}


export interface ICuiObservableArg {

}
export interface ICuiObservable {
    key: string;
    on(arg: ICuiObservableArg): Promise<boolean>;
}

export interface CuiObservables {
    [key: string]: ICuiObservable;
}

export interface CuiHandlers {
    [id: string]: ICuiComponentHandler;
}


export interface CuiElement {
    $cuid: string | null;
    $handlers?: CuiHandlers;
}

export interface CuiHTMLElement extends HTMLElement, CuiElement {

}

export interface ICuiObserver {
    observe(target: Element): void;
    unobserve(target: Element): void;
    connect(): void;
    disconnect(): void;
}

export interface ICuiEventListener<T> {
    setCallback(callback: (t: T) => void): void;
    isInProgress(): boolean;
    attach(): void;
    detach(): void;
    isAttached(): boolean;
}

export interface ICuiMeasure {
    target: string;
    method: string;
    time: number;

}