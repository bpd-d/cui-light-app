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
var _resizeObserver;
import { CuiSetup } from "./setup";
import { CuiInteractionsFactory } from "../factories/interactions";
import { CuiCacheManager } from "../managers/cache";
import { CuiEventBusFactory } from "../bus/bus";
import { are, getName, replacePrefix } from "../utils/functions";
import { CLASSES } from "../utils/statics";
import { CuiDocumentStyleAppender } from "../styles/appender";
import { CuiInstanceColorHandler } from "../handlers/colors";
import { CuiResizeObserver } from "../observers/resize";
import { CSSVariableError } from "./errors";
import { CuiDevelopmentToolManager } from "../managers/development";
export class CuiUtils {
    constructor(initialSetup) {
        _resizeObserver.set(this, void 0);
        this.setup = new CuiSetup().fromInit(initialSetup);
        this.interactions = CuiInteractionsFactory.get(initialSetup.interaction, this.onInteractionError.bind(this));
        this.cache = new CuiCacheManager(this.setup.cacheSize);
        this.bus = CuiEventBusFactory.get(initialSetup.busSetup);
        this.colors = new CuiInstanceColorHandler(this.interactions);
        this.development = new CuiDevelopmentToolManager(initialSetup.development);
        this.styleAppender = new CuiDocumentStyleAppender(this.interactions);
        __classPrivateFieldSet(this, _resizeObserver, new CuiResizeObserver(this.bus, this.setup.resizeThreshold));
        __classPrivateFieldGet(this, _resizeObserver).connect();
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
        document.documentElement.style.setProperty(prop, value);
    }
    onInteractionError(e) {
        console.error("An error has been captured from interactions");
        console.error(e);
    }
}
_resizeObserver = new WeakMap();
