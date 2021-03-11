import { ICuiComponent, ICuiPluginManager, CuiHTMLElement } from "../models/interfaces";
import { is, are, joinAttributesForQuery, parseAttribute, measure } from "../utils/functions";
import { CuiUtils } from "../models/utils";
import { ICuiDevelopmentTool } from "../development/interfaces";
import { CuiDevtoolFactory } from "../development/factory";
import { createCuiElement, destroyCuiElement, getMatchingComponents, updateComponent } from "../api/functions";

export interface ICuiMutionObserver {
    // setOptions(options: MutationObserverInit): ICuiMutionObserver;
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


export class CuiMutationObserver implements ICuiMutionObserver {
    _log: ICuiDevelopmentTool;
    #observer: MutationObserver | undefined;
    #options: MutationObserverInit | undefined;
    #element: HTMLElement;
    plugins: ICuiPluginManager | undefined;
    #components: ICuiComponent[];
    #utils: CuiUtils;
    #queryString: string;
    constructor(element: HTMLElement, utils: CuiUtils) {
        this.#observer = undefined;
        this.plugins = undefined;
        this.#options = undefined;
        this.#element = element
        this._log = CuiDevtoolFactory.get('CuiMutationObserver')
        this.#components = [];
        this.#utils = utils;
        this.#queryString = "";

    }

    setPlugins(plugins: ICuiPluginManager): ICuiMutionObserver {
        this.plugins = plugins;
        return this;
    }

    setComponents(components: ICuiComponent[]): ICuiMutionObserver {
        this.#components = components;
        return this;
    }

    setAttributes(attributes: string[]): ICuiMutionObserver {
        this.#options = {
            attributes: true,
            subtree: true,
            childList: true,
            attributeFilter: attributes
        }
        this.#queryString = joinAttributesForQuery(attributes);
        return this;
    }

    start(): ICuiMutionObserver {
        this._log.debug("Starting")
        if (!this.#options) {
            this._log.error("Cannot start - options are not defined")
            return this;
        }
        this.#observer = new MutationObserver(this.mutationCallback.bind(this));
        this.#observer.observe(this.#element, this.#options)
        this._log.debug("Started")
        return this;
    }

    stop(): ICuiMutionObserver {
        this._log.debug("Stopping")
        if (!this.#observer) {
            this._log.debug("Observer not available")
            return this;
        }
        this.#observer.disconnect()
        this.#observer = undefined;
        this._log.debug("Stopped")
        return this;
    }

    private mutationCallback(mutations: MutationRecord[], observer: MutationObserver) {
        mutations.forEach((mutation: MutationRecord) => {
            switch (mutation.type) {
                case 'attributes':
                    const item = mutation.target as CuiHTMLElement;
                    if (!are(mutation.attributeName, item)) {
                        this._log.error("Mutation attribute doesn't not exisist");
                        break;
                    }
                    // @ts-ignore attribute is defined
                    this.handeComponentUpdate(mutation.attributeName, item);
                    break;

                case 'childList':
                    this.handleChildListMutation(mutation);
                    break;
            }
            if (is(this.plugins)) {
                // @ts-ignore plugins is defined here
                this.plugins.onMutation(mutation).then(() => {
                    //
                })
            }
        })
    }

    private handeComponentUpdate(attributeName: string, item: CuiHTMLElement) {
        let args = parseAttribute(item, attributeName);
        updateComponent(item, attributeName, args)
            .then((result) => {
                this._log.debug("Component: " + attributeName + " updated with: " + result, "handeComponentUpdate")
            })
            .catch((e) => {
                this._log.exception(e);
            })
    }

    private handleChildListMutation(mutation: MutationRecord) {
        const addedLen = mutation.addedNodes.length;
        const removedLen = mutation.removedNodes.length;
        if (addedLen > 0) {
            this._log.debug("Registering added nodes: " + addedLen)
            this.handleAddedNodes(mutation.addedNodes).then((result) => {
                this._log.debug("Added nodes: " + addedLen + " with status: " + result)
            }).catch((e) => {
                this._log.exception(e);
            });
        } else if (removedLen > 0) {
            this._log.debug("Removing nodes: " + removedLen);
            this.handleRemovedNodes(mutation.removedNodes).then((result) => {
                this._log.debug("Removed nodes: " + removedLen + " with status: " + result)
            }).catch((e) => {
                this._log.exception(e);
            });
        }
    }

    private async handleAddedNodes(nodes: NodeList): Promise<boolean> {
        for (let node of nodes) {
            await this.handleAddedNode(node);
            let element = node as Element
            let children = element.hasChildNodes() ? element.querySelectorAll(this.#queryString) : null;
            if (is(children)) {
                // @ts-ignore children is defined
                this._log.debug("Additional nodes to add: " + children.length);
                // @ts-ignore children is defined
                await this.handleAddedChildren(children);
            }
        }
        return true;
    }


    private async handleAddedChildren(nodes: NodeList): Promise<boolean[]> {
        let result: boolean[] = [];
        for (let node of nodes) {
            result.push(await this.handleAddedNode(node));
        }
        return result;
    }

    private async handleAddedNode(node: any): Promise<boolean> {
        let matchingComponents = getMatchingComponents(node, this.#components)
        return createCuiElement(node, matchingComponents, this.#utils);
    }

    private async handleRemovedNodes(nodes: NodeList): Promise<boolean> {
        for (let node of nodes) {
            await destroyCuiElement(node);
            let element = node as Element;
            let children = node.hasChildNodes() ? element.querySelectorAll(this.#queryString) : null;
            if (is(children)) {
                // @ts-ignore children is defined
                this._log.debug("Additional nodes to remove: " + children.length)
                // @ts-ignore children is defined
                await this.handleDestroyChildren(children);
            }

        }
        return true;
    }

    private async handleDestroyChildren(nodes: NodeList): Promise<boolean[]> {
        let result = [];
        for (let child of nodes) {
            result.push(await destroyCuiElement(child));
        }
        return result;
    }
}


export class CuiComponentMutationHandler implements ICuiComponentMutationObserver {
    #isObserving: boolean;
    #observer: MutationObserver;
    #element: Element;
    #disabled: boolean;
    #selector: string | undefined;
    #options: MutationObserverInit = {
        childList: true,
        subtree: true,
    }

    #callback?: (record: MutationRecord[]) => void;
    constructor(target: Element, selector?: string) {
        this.#disabled = false;
        this.#isObserving = false;
        this.#element = target;
        this.#selector = selector;
        this.#callback = undefined;
        this.#observer = new MutationObserver(this.mutationCallback.bind(this));
    }

    observe(): void {
        if (!this.#isObserving && !this.#disabled) {
            this.#observer.observe(this.#element, this.#options);
            this.#isObserving = true;
        }
    }

    unobserve(): void {
        if (this.#isObserving) {
            this.#observer.disconnect();
            this.#isObserving = false;
        }
    }

    setSelector(selector?: string) {
        this.#selector = selector;
    }

    setAttributes(attributes: string[]) {
        if (attributes && attributes.length > 0) {
            this.#options = {
                ...this.#options,
                attributes: true,
                attributeFilter: attributes
            }
        }
        this.#options = {
            childList: true,
            subtree: true,
        }

        this.unobserve();
    }

    isObserving(): boolean {
        return this.#isObserving;
    }

    disable(flag: boolean): void {
        this.#disabled = flag;
        if (this.#disabled) {
            this.unobserve();
        }
    }

    onMutation(callback: (record: MutationRecord[]) => void): void {
        this.#callback = callback;
    }

    private mutationCallback(record: MutationRecord[]) {
        let records: MutationRecord[] = record.reduce<MutationRecord[]>((result, record) => {
            if (this.#selector && record.type === 'childList') {
                if (this.matchesSelector(record)) {
                    result.push(record)
                }
            } else {
                result.push(record)
            }
            return result;
        }, [])
        if (this.#callback) {
            this.#callback(records);
        }
    }

    private matchesSelector(record: MutationRecord): boolean {
        if (record.addedNodes.length > 0) {
            return this.isAnyItemMatching([...record.addedNodes] as HTMLElement[]);
        }
        if (record.removedNodes.length > 0) {
            return this.isAnyItemMatching([...record.removedNodes] as HTMLElement[]);
        }
        return false;
    }

    private isAnyItemMatching(array: HTMLElement[]): boolean {
        //@ts-ignore
        return (array.find((node) => (<HTMLElement>node).matches(this.#selector)) !== null);
    }
}