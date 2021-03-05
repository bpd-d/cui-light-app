var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _plugins;
import { CuiSetup } from "./setup";
import { CuiInteractionsFactory } from "../factories/interactions";
import { CuiEventBusFactory } from "../bus/bus";
import { are, getName, is, replacePrefix } from "../utils/functions";
import { CLASSES } from "../utils/statics";
import { CuiDocumentStyleAppender } from "../styles/appender";
//import { CuiInstanceColorHandler } from "../handlers/colors";
import { CSSVariableError } from "./errors";
export class CuiUtils {
    constructor(initialSetup, plugins) {
        _plugins.set(this, void 0);
        this.setup = new CuiSetup().fromInit(initialSetup);
        this.interactions = CuiInteractionsFactory.get(initialSetup.interaction, this.onInteractionError.bind(this));
        // this.cache = new CuiCacheManager(this.setup.cacheSize);
        this.bus = CuiEventBusFactory.get(initialSetup.busSetup);
        // this.colors = new CuiInstanceColorHandler(this.interactions);
        this.styleAppender = new CuiDocumentStyleAppender(this.interactions);
        __classPrivateFieldSet(this, _plugins, plugins !== null && plugins !== void 0 ? plugins : []);
    }
    setLightMode(mode) {
        const name = getName(this.setup.prefix, CLASSES.dark);
        const classes = document.body.classList;
        if (mode === 'dark' && !classes.contains(name)) {
            this.interactions.mutate(() => {
                classes.add(name);
            }, this);
        }
        else if (mode === 'light' && classes.contains(name)) {
            this.interactions.mutate(() => {
                classes.remove(name);
            }, this);
        }
    }
    getLightMode() {
        const name = getName(this.setup.prefix, CLASSES.dark);
        return document.body.classList.contains(name) ? 'dark' : 'light';
    }
    setPrintMode(flag) {
        const name = getName(this.setup.prefix, CLASSES.print);
        const classes = document.body.classList;
        if (flag && !classes.contains(name)) {
            classes.add(name);
        }
        else if (!flag && classes.contains(name)) {
            classes.remove(name);
        }
    }
    isPrintMode() {
        const name = getName(this.setup.prefix, CLASSES.print);
        return document.body.classList.contains(name);
    }
    setProperty(name, value) {
        if (!are(name, value)) {
            throw new CSSVariableError("Property or value was not provided");
        }
        let prop = replacePrefix(name, this.setup.prefix);
        this.interactions.mutate(() => {
            document.documentElement.style.setProperty(prop, value);
        }, null);
    }
    isPlugin(name) {
        return is(name) && __classPrivateFieldGet(this, _plugins).find(plugin => plugin === name);
    }
    onInteractionError(e) {
        console.error("An error has been captured from interactions");
        console.error(e);
    }
}
_plugins = new WeakMap();
