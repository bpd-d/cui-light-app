var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var _prefix, _eventId;
import { CuiHandlerBase } from "../../core/handlers/base";
import { is, are, getParentCuiElement } from "../../core/utils/functions";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickModule } from "../modules/click/click";
export class CuiOpenArgs extends CuiAutoParseArgs {
    constructor(timeout) {
        super({
            main: "target"
        });
        this.target = "";
        this.action = "";
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
        this.prevent = false;
        this.stopPropagation = false;
        this.state = "";
    }
}
export class CuiOpenComponent {
    constructor(prefix) {
        _prefix.set(this, void 0);
        __classPrivateFieldSet(this, _prefix, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${__classPrivateFieldGet(this, _prefix)}-open`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiOpenHandler(element, utils, this.attribute, __classPrivateFieldGet(this, _prefix));
    }
}
_prefix = new WeakMap();
export class CuiOpenHandler extends CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiOpenHandler", element, attribute, new CuiOpenArgs(utils.setup.animationTime), utils);
        _eventId.set(this, void 0);
        __classPrivateFieldSet(this, _eventId, null);
        this.addModule(new CuiClickModule(this.element, this.args, this.onOpen.bind(this)));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _eventId, this.onEvent(EVENTS.OPEN, this.onOpen.bind(this)));
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this.detachEvent(EVENTS.OPEN, __classPrivateFieldGet(this, _eventId));
            return true;
        });
    }
    onOpen(ev) {
        if (this.isLocked) {
            return;
        }
        const target = this.getTarget();
        if (!is(target)) {
            this._log.warning(`Target ${this.args.target} not found`, 'onClick');
            return;
        }
        this.isLocked = true;
        //@ts-ignore - target checked
        this.run(target).then((result) => {
            //@ts-ignore - target checked
            if (result)
                this.emitOpen(ev);
        }).catch((e) => {
            this._log.exception(e);
        }).finally(() => {
            this.isLocked = false;
        });
    }
    /**
     * Emits open event or performs an opening action
     * @param target target element
     * @returns whether event opened shall be emitted
     */
    run(target) {
        return __awaiter(this, void 0, void 0, function* () {
            let cuiId = target.$cuid;
            if (is(cuiId)) {
                this.handleClickCui(cuiId);
                return false;
            }
            else {
                this._log.debug("Open html component");
                if (are(this.args.timeout, this.args.action)) {
                    this._log.debug("Perfrom an action");
                    let actions = CuiActionsListFactory.get(this.args.action);
                    return this.actionsHelper.performActions(target, actions, this.args.timeout, () => {
                        this.helper.setClass(this.activeClassName, target);
                    });
                }
                this.helper.setClassesAs(target, this.activeClassName);
                return true;
            }
        });
    }
    handleClickCui(cuid) {
        this._log.debug("Open cUI component");
        this.utils.bus.emit(EVENTS.OPEN, cuid, this.args.state);
        return false;
    }
    emitOpen(ev) {
        this.emitEvent(EVENTS.OPENED, {
            event: ev,
            state: this.args.state
        });
    }
    // private getTarget(target: string) {
    //     if (is(target)) {
    //         //@ts-ignore - target checked
    //         return document.querySelector(target);
    //     }
    //     let parent = this.element.parentElement;
    //     //@ts-ignore - parent checked
    //     let result = is(parent) ? parent.querySelectorAll(`[${CUID_ATTRIBUTE}]`) : undefined;
    //     if (!result || result.length < 2) {
    //         return undefined;
    //     }
    //     return getFirstMatching([...result], (el: Element) => {
    //         return el !== this.element;
    //     })
    // }
    getTarget() {
        var _a;
        if (!is(this.args.target)) {
            return getParentCuiElement(this.element);
        }
        return (_a = document.querySelector(this.args.target)) !== null && _a !== void 0 ? _a : getParentCuiElement(this.element);
    }
}
_eventId = new WeakMap();
