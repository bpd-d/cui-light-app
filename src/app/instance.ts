import { CuiSetupInit } from "../core/models/setup";
import { is, joinAttributesForQuery, are } from "../core/utils/functions";
import { STATICS, EVENTS, CSS_VARIABLES } from "../core/utils/statics";
import { ICuiPlugin, ICuiComponent, ICuiPluginManager, CuiElement } from "../core/models/interfaces";
import { ICuiMutionObserver, CuiMutationObserver } from "../core/observers/mutations";
import { CuiCore } from "../core/models/core";
import { CuiInstanceInitError } from "../core/models/errors";
import { ElementManager } from "./managers/element";
import { CuiPluginManager } from "./managers/plugins";
import { CuiDevtoolFactory } from "../core/development/factory";
import { ICuiDevelopmentTool } from "../core/development/interfaces";
import { ICuiApiHandler } from "src/core/api/interfaces";
import { CuiApiHandler } from "../core/api/handler";
import { getMatchingComponents, createCuiElement, addCuiArgument } from "../core/api/functions";

export class CuiInstance {
    private _log: ICuiDevelopmentTool;
    private _mutationObserver: ICuiMutionObserver | undefined;
    private _core: CuiCore;
    private _plugins: ICuiPluginManager;
    private _components: ICuiComponent[];
    private _rootElement: HTMLElement;
    private _mutatedAttributes: string[];
    private _api: ICuiApiHandler;
    constructor(setup: CuiSetupInit, plugins: ICuiPlugin[], components: ICuiComponent[]) {
        STATICS.prefix = setup.prefix;
        STATICS.logLevel = setup.logLevel;
        if (setup.development)
            STATICS.devTool = setup.development;
        this._plugins = new CuiPluginManager(plugins);
        this._components = components ?? [];
        this._core = new CuiCore(setup, plugins.map(plugin => { return plugin.name; }));
        this._log = CuiDevtoolFactory.get("CuiInstance");
        this._rootElement = setup.root;
        this._mutationObserver = undefined;
        this._mutatedAttributes = [];
        this._api = new CuiApiHandler(this._components, this._core);
    }

    async init(): Promise<CuiInstance> {
        this._log.debug("Instance started", "init")
        // Init elements
        if (!is(window.MutationObserver)) {
            throw new CuiInstanceInitError("Mutation observer does not exists");
        }
        this._mutatedAttributes = this._components.map(x => { return x.attribute }); // MUTATED_ATTRIBUTES; 
        const initElements = is(this._mutatedAttributes) ? this._rootElement.querySelectorAll(joinAttributesForQuery(this._mutatedAttributes)) : null;
        if (is(initElements)) {
            //@ts-ignore initElements already checked
            this._log.debug(`Initiating ${initElements.length} elements`)
            let promises = [];
            //@ts-ignore initElements already checked
            for (let element of initElements) {
                try {
                    let matchingComponents = getMatchingComponents(element, this._components)
                    promises.push(createCuiElement(element, matchingComponents, this._core));
                } catch (e) {
                    this._log.exception(e);
                }
            }
            await Promise.all(promises);
        }
        this._log.debug("Init plugins", "init")
        // Init plugins
        this._plugins.init(this._core);

        if (are(this._components, this._mutatedAttributes)) {
            this._log.debug("Init mutation observer", "init")
            this._mutationObserver = new CuiMutationObserver(this._rootElement, this._core)
            this._mutationObserver.setComponents(this._components).setAttributes(this._mutatedAttributes)
            this._mutationObserver.setPlugins(this._plugins);
            this._mutationObserver.start();
        }

        this._log.debug("Setting CSS globals", 'init')
        this._core.interactions.mutate(() => {
            this._core.setProperty(CSS_VARIABLES.animationTimeLong, `${this._core.setup.animationTimeLong}ms`)
            this._core.setProperty(CSS_VARIABLES.animationTime, `${this._core.setup.animationTime}ms`);
            this._core.setProperty(CSS_VARIABLES.animationTimeShort, `${this._core.setup.animationTimeShort}ms`);
        }, null)

        this._core.bus.emit(EVENTS.INSTANCE_INITIALIZED, null)
        return this;
    }

    finish(): void {
        if (this._mutationObserver)
            this._mutationObserver.stop();
        this._core.bus.emit(EVENTS.INSTANCE_FINISHED, null)
    }

    get(selector: string): ElementManager | undefined {
        const elements = this.all(selector);
        if (!elements) {
            return undefined;
        }
        const newElement = new ElementManager(elements, this._core);
        return newElement
    }

    all(selector: string): Element[] | undefined {
        const nodes: NodeListOf<Element> = document.querySelectorAll(selector);
        if (!is(nodes)) {
            return undefined;
        }
        return [...nodes];
    }

    getUtils(): CuiCore {
        return this._core//;
    }

    on(event: string, callback: any, element?: CuiElement): string | null {
        if (!are(event, callback)) {
            this._log.error("Incorrect arguments", "on")
            return null;
        }
        return this._core.bus.on(event, callback, element);
    }

    detach(event: string, id: string): void {
        if (!are(event, id)) {
            this._log.error("Incorrect arguments", "detach")
        }
        this._core.bus.detach(event, id);
    }

    detachAll(event: string): void {
        if (!is(event)) {
            this._log.error("Incorrect arguments", "detachAll")
        }
        this._core.bus.detachAll(event);
    }

    emit(event: string, element: Element | string, ...args: any[]): void {
        if (!are(event, element)) {
            this._log.warning("Not enough data to emit event", "emit")
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
            this._log.warning("Element is not a cUI element", "emit")
            return
        }
        this._core.bus.emit(event, cuid, ...args);
    }

    getPlugin(name: string): ICuiPlugin | undefined {
        return this._plugins.get(name);
    }

    api(): ICuiApiHandler {
        return this._api;
    }


    /**
     * Creates cUI element outside of cUI root scope
     * @param element 
     * @param arg 
     * @param data 
     */
    async createCuiElement<T extends object>(element: HTMLElement, arg: string, data: T): Promise<boolean> {
        if (!is(arg) || !this._mutatedAttributes.includes(arg)) {
            this._log.error("Element cannot be created: Unknown attribute")
            return false;
        }
        let component = this._components.find(component => component.attribute === arg);

        if (!component)
            return false;

        if (addCuiArgument(element, arg, data)) {
            return createCuiElement(element, [component], this._core);
        }

        return false;
    }
}