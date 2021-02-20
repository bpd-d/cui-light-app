import { CuiSetupInit } from "../core/models/setup";
import { is, joinAttributesForQuery, are } from "../core/utils/functions";
import { STATICS, EVENTS, CSS_VARIABLES } from "../core/utils/statics";
import { ICuiLogger, ICuiPlugin, ICuiComponent, ICuiPluginManager, CuiElement } from "../core/models/interfaces";
import { ICuiMutionObserver, CuiMutationObserver } from "../core/observers/mutations";
import { CuiLoggerFactory } from "../core/factories/logger";
import { CuiUtils } from "../core/models/utils";
import { CuiInstanceInitError } from "../core/models/errors";
import { ElementManager } from "./managers/element";
import { CollectionManager } from "./managers/collection";
import { CuiPluginManager } from "./managers/plugins";
import { addCuiArgument, createCuiElement, getMatchingComponents } from "../core/utils/api";


export class CuiInstance {
    #log: ICuiLogger;
    #mutationObserver: ICuiMutionObserver | undefined;
    #utils: CuiUtils;
    #plugins: ICuiPluginManager;
    #components: ICuiComponent[];
    #rootElement: HTMLElement;
    #mutatedAttributes: string[];
    constructor(setup: CuiSetupInit, plugins: ICuiPlugin[], components: ICuiComponent[]) {
        STATICS.prefix = setup.prefix;
        STATICS.logLevel = setup.logLevel;
        this.#log = CuiLoggerFactory.get('CuiInstance')
        this.#plugins = new CuiPluginManager(plugins);
        this.#components = components ?? [];
        this.#utils = new CuiUtils(setup, plugins.map(plugin => { return plugin.name; }));
        this.#rootElement = setup.root;
        this.#mutationObserver = undefined;
        this.#mutatedAttributes = [];
    }

    async init(): Promise<CuiInstance> {
        this.#log.debug("Instance started", "init")
        // Init elements
        if (!is(window.MutationObserver)) {
            throw new CuiInstanceInitError("Mutation observer does not exists");
        }
        this.#mutatedAttributes = this.#components.map(x => { return x.attribute }); // MUTATED_ATTRIBUTES; 
        const initElements = is(this.#mutatedAttributes) ? this.#rootElement.querySelectorAll(joinAttributesForQuery(this.#mutatedAttributes)) : null;
        if (is(initElements)) {
            //@ts-ignore initElements already checked
            this.#log.debug(`Initiating ${initElements.length} elements`)
            let promises = [];
            //@ts-ignore initElements already checked
            for (let element of initElements) {
                try {
                    let matchingComponents = getMatchingComponents(element, this.#components)
                    promises.push(createCuiElement(element, matchingComponents, this.#utils));
                } catch (e) {
                    this.#log.exception(e);
                }
            }
            await Promise.all(promises);
        }
        this.#log.debug("Init plugins", "init")
        // Init plugins
        this.#plugins.init(this.#utils);

        if (are(this.#components, this.#mutatedAttributes)) {
            this.#log.debug("Init mutation observer", "init")
            this.#mutationObserver = new CuiMutationObserver(this.#rootElement, this.#utils)
            this.#mutationObserver.setComponents(this.#components).setAttributes(this.#mutatedAttributes)
            this.#mutationObserver.setPlugins(this.#plugins);
            this.#mutationObserver.start();
        }

        this.#log.debug("Setting CSS globals", 'init')
        this.#utils.interactions.mutate(() => {
            this.#utils.setProperty(CSS_VARIABLES.animationTimeLong, `${this.#utils.setup.animationTimeLong}ms`)
            this.#utils.setProperty(CSS_VARIABLES.animationTime, `${this.#utils.setup.animationTime}ms`);
            this.#utils.setProperty(CSS_VARIABLES.animationTimeShort, `${this.#utils.setup.animationTimeShort}ms`);
        }, null)

        this.#utils.bus.emit(EVENTS.INSTANCE_INITIALIZED, null)
        return this;
    }

    finish(): void {
        if (this.#mutationObserver)
            this.#mutationObserver.stop();
        this.#utils.bus.emit(EVENTS.INSTANCE_FINISHED, null)
    }

    get(selector: string): ElementManager | undefined {
        const elements = this.all(selector);
        if (!elements) {
            return undefined;
        }
        const newElement = new ElementManager(elements, this.#utils);
        return newElement
    }

    collection(selector: string): CollectionManager | undefined {
        const elements = this.all(selector);
        if (!is(elements)) {
            return undefined;
        }
        // @ts-ignore already checked
        let manager = new CollectionManager(elements, this.#utils.interactions);
        return manager;
    }

    select(selector: string): Element | null {
        return document.querySelector(selector)
    }

    all(selector: string): Element[] | undefined {
        const nodes: NodeListOf<Element> = document.querySelectorAll(selector);
        if (!is(nodes)) {
            return undefined;
        }
        return [...nodes];
    }

    getUtils(): CuiUtils {
        return this.#utils;
    }

    on(event: string, callback: any, element?: CuiElement): void {
        if (!are(event, callback)) {
            this.#log.error("Incorrect arguments", "on")
        }
        this.#utils.bus.on(event, callback, element);
    }

    detach(event: string, id: string): void {
        if (!are(event, id)) {
            this.#log.error("Incorrect arguments", "detach")
        }
        this.#utils.bus.detach(event, id);
    }

    detachAll(event: string): void {
        if (!is(event)) {
            this.#log.error("Incorrect arguments", "detachAll")
        }
        this.#utils.bus.detachAll(event);
    }

    emit(event: string, element: Element | string, ...args: any[]): void {
        if (!are(event, element)) {
            this.#log.warning("Not enough data to emit event", "emit")
            return;
        }
        let cuid = null
        if (typeof element === 'string' && element.startsWith('~')) {
            cuid = element.substring(1);
        } else {
            let el = typeof element === 'string' ? document.querySelector(element) : element;
            cuid = (<CuiElement>(el as any)).$cuid;
        }
        if (!is(cuid)) {
            this.#log.warning("Element is not a cUI element", "emit")
            return
        }
        this.#utils.bus.emit(event, cuid, ...args);
    }

    getPlugin(name: string): ICuiPlugin | undefined {
        return this.#plugins.get(name);
    }


    /**
     * Creates cUI element outside of cUI root scope
     * @param element 
     * @param arg 
     * @param data 
     */
    async createCuiElement<T extends object>(element: HTMLElement, arg: string, data: T): Promise<boolean> {
        if (!is(arg) || !this.#mutatedAttributes.includes(arg)) {
            this.#log.error("Element cannot be created: Unknown attribute")
            return false;
        }
        let component = this.#components.find(component => component.attribute === arg);

        if (!component)
            return false;

        if (addCuiArgument(element, arg, data)) {
            return createCuiElement(element, [component], this.#utils);
        }

        return false;
    }
}