import { ICuiLogger, ICuiComponent, ICuiPluginManager, CuiElement } from "../models/interfaces";
import { CuiLoggerFactory } from "../factories/logger";
import { is, are, registerCuiElement, joinAttributesForQuery, parseAttribute } from "../utils/functions";
import { CuiUtils } from "../models/utils";

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
}


export class CuiMutationObserver implements ICuiMutionObserver {
    _log: ICuiLogger;
    #observer: MutationObserver | undefined;
    #options: MutationObserverInit | undefined;
    #element: HTMLElement;
    plugins: ICuiPluginManager | undefined;
    #components: ICuiComponent[];
    #attributes: string[];
    #utils: CuiUtils;
    #queryString: string;
    constructor(element: HTMLElement, utils: CuiUtils) {
        this.#observer = undefined;
        this.plugins = undefined;
        this.#options = undefined;
        this.#element = element
        this._log = CuiLoggerFactory.get('CuiMutationObserver')
        this.#components = [];
        this.#attributes = [];
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
        this.#attributes = attributes;
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
                    const item = mutation.target as any;
                    if (are(mutation.attributeName, item)) {
                        // @ts-ignore - attribute name is checked
                        if (are(item.$handlers, item.$handlers[mutation.attributeName])) {
                            // @ts-ignore - attribute name is checked
                            item.$handlers[mutation.attributeName].refresh(parseAttribute(item, mutation.attributeName));
                        }
                    } else {
                        this._log.error("Mutation attribute doesn't not exisist");
                    }
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

    private handleChildListMutation(mutation: MutationRecord) {
        const addedLen = mutation.addedNodes.length;
        const removedLen = mutation.removedNodes.length;
        if (addedLen > 0) {
            this._log.debug("Registering added nodes: " + addedLen)
            this.handleAddedNodes(mutation.addedNodes);
        } else if (removedLen > 0) {
            this._log.debug("Removing nodes: " + removedLen);
            this.handleRemovedNodes(mutation.removedNodes);
        }
    }

    private handleAddedNodes(nodes: NodeList) {
        nodes.forEach((node: any) => {
            try {
                registerCuiElement(node, this.#components, this.#attributes, this.#utils);
                let childrens = node.hasChildNodes() ? node.querySelectorAll(this.#queryString) : null;
                if (is(childrens)) {
                    childrens.forEach((child: any) => {
                        registerCuiElement(child, this.#components, this.#attributes, this.#utils);
                    })
                }
            } catch (e) {
                this._log.exception(e);
            }
        })
    }

    private handleRemovedNodes(nodes: NodeList) {
        nodes.forEach((node: any) => {
            this.destroySingleElement(node);
            let childrens = node.hasChildNodes() ? node.querySelectorAll(this.#queryString) : null;
            if (is(childrens)) {
                childrens.forEach((child: any) => {
                    this.destroySingleElement(child);
                })
            }
        })
    }

    private destroySingleElement(node: any) {
        let element = node as CuiElement;
        if (element.$handlers) {
            for (let name in element.$handlers) {
                if (element.$handlers.hasOwnProperty(name)) {
                    try {
                        element.$handlers[name].destroy();
                    } catch (e) {
                        this._log.exception(e, 'remove - ' + name)
                    }
                }
            }
        }
    }
}


export class CuiComponentMutationHandler implements ICuiComponentMutationObserver {
    #isObserving: boolean;
    #observer: MutationObserver | undefined;
    #element: Element;
    #disabled: boolean;
    #options: MutationObserverInit = {
        childList: true,
        subtree: true
    }
    constructor(target: Element) {
        this.#observer = undefined;
        this.#disabled = false;
        this.#isObserving = false;
        this.#element = target;
    }

    observe(): void {
        if (!this.#isObserving && !this.#disabled && this.#observer) {
            this.#observer.observe(this.#element, this.#options);
            this.#isObserving = true;
        }
    }
    unobserve(): void {
        if (this.#isObserving && this.#observer) {
            this.#observer.disconnect();
            this.#isObserving = false;
        }
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
        if (this.#isObserving)
            this.unobserve();
        this.#observer = new MutationObserver(callback)
    }

}