var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EVENTS } from "../../core/utils/statics";
import { CuiHandlerBase } from "../../core/handlers/base";
import { getEventBusFacade } from "../../core/handlers/extensions/facades";
import { CuiElementBoxFactory } from "../../core/models/elements";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiComponentBaseHook } from "../base";
import { CuiSwitchExtension } from "../extensions/switch/switch";
import { getScrollHelper } from "./helper";
import { ScrollSwitchPerformers } from "./perform";
import { getCuiElementsBySelector, is } from "../../core/utils/functions";
export class CuiScrollSwitchArgs extends CuiAutoParseArgs {
    constructor() {
        super();
        this.mode = 'auto';
        this.direction = "y";
        this.loop = false;
        this.switch = "";
    }
}
export function CuiScrollSwitchComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "scroll-switch",
        create: (element, core, prefix, attribute) => {
            return new CuiScrollSwitchHandler(element, attribute, core);
        }
    });
}
export class CuiScrollSwitchHandler extends CuiHandlerBase {
    constructor(element, attribute, core) {
        super("CuiScrollSwitchHandler", element, attribute, new CuiScrollSwitchArgs(), core);
        this._busFacade = getEventBusFacade(this.cuid, core.bus, element);
        this._root = CuiElementBoxFactory.get(element);
        this._scrollPerformers = ScrollSwitchPerformers;
        this.setArgs();
        this.extend(new CuiSwitchExtension(this._busFacade, this.switch.bind(this)));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setArgs();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setArgs();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    switch(arg) {
        if (!arg) {
            return;
        }
        const performer = this._scrollPerformers.find(p => p.check(arg));
        if (!performer) {
            this.logWarning("Cannot find matching performer", 'switch');
            return;
        }
        const result = performer.perform(arg, this._helper, {
            behavior: this.args.mode,
            loop: this.args.loop
        });
        if (!result) {
            this.logWarning("Switch " + performer.name + " was not performed", 'switch');
            return;
        }
        this.emitSwitch(arg);
        this._busFacade.emit(EVENTS.SWITCHED, {
            timestamp: Date.now(),
            index: arg
        });
    }
    setArgs() {
        this._helper = getScrollHelper(this.args.direction, this._root, this.args.mode);
    }
    emitSwitch(arg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!is(this.args.switch)) {
                return false;
            }
            const elements = getCuiElementsBySelector(this.args.switch);
            const promises = [];
            elements.forEach(element => {
                promises.push(this.core.bus.emit(EVENTS.SWITCH, element.$cuid, arg));
            });
            yield Promise.all(promises);
            return true;
        });
    }
}
