import { IUIInteractionProvider } from "./interfaces";
import { CuiSetup, CuiSetupInit } from "./setup";
import { CuiLightMode } from "../utils/types";
import { CuiInteractionsFactory } from "../factories/interactions";
import { CuiEventBusFactory } from "../bus/bus";
import { are, getName, is, replacePrefix } from "../utils/functions";
import { CLASSES } from "../utils/statics";
import { ICuiDocumentStyleAppender, CuiDocumentStyleAppender } from "../styles/appender";
import { CSSVariableError } from "./errors";
import { ICuiEventBus } from "../bus/interfaces";

export class CuiCore {
    interactions: IUIInteractionProvider;
    bus: ICuiEventBus;
    setup: CuiSetup;
    styleAppender: ICuiDocumentStyleAppender;
    #plugins: string[];
    constructor(initialSetup: CuiSetupInit, plugins?: string[]) {
        this.setup = new CuiSetup().fromInit(initialSetup);
        this.interactions = CuiInteractionsFactory.get(initialSetup.interaction, this.onInteractionError.bind(this));
        // this.cache = new CuiCacheManager(this.setup.cacheSize);
        this.bus = CuiEventBusFactory.get(initialSetup.busSetup);
        // this.colors = new CuiInstanceColorHandler(this.interactions);

        this.styleAppender = new CuiDocumentStyleAppender(this.interactions);
        this.#plugins = plugins ?? [];
    }

    setLightMode(mode: CuiLightMode) {
        const name: string = getName(this.setup.prefix, CLASSES.dark);
        const classes = document.body.classList;
        if (mode === 'dark' && !classes.contains(name)) {
            this.interactions.mutate(() => {
                classes.add(name);
            }, this)

        } else if (mode === 'light' && classes.contains(name)) {
            this.interactions.mutate(() => {
                classes.remove(name);
            }, this)
        }
    }

    getLightMode(): CuiLightMode {
        const name: string = getName(this.setup.prefix, CLASSES.dark);
        return document.body.classList.contains(name) ? 'dark' : 'light';
    }

    setPrintMode(flag: boolean) {
        const name: string = getName(this.setup.prefix, CLASSES.print);
        const classes = document.body.classList;
        if (flag && !classes.contains(name)) {
            classes.add(name);

        } else if (!flag && classes.contains(name)) {
            classes.remove(name);
        }
    }

    isPrintMode(): boolean {
        const name: string = getName(this.setup.prefix, CLASSES.print);
        return document.body.classList.contains(name);
    }

    setProperty(name: string, value: string) {
        if (!are(name, value)) {
            throw new CSSVariableError("Property or value was not provided");
        }
        let prop = replacePrefix(name, this.setup.prefix);
        this.interactions.mutate(() => {
            document.documentElement.style.setProperty(prop, value);
        }, null)

    }

    isPlugin(name: string) {
        return is(name) && this.#plugins.find(plugin => plugin === name);
    }

    private onInteractionError(e: Error) {
        console.error("An error has been captured from interactions");
        console.error(e);
    }
}