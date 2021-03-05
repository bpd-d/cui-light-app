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
var _observer, _targets, _actions;
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiIntersectionObserver } from "../../core/observers/intersection";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { is, getRangeValueOrDefault, joinWithScopeSelector } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
const DEFAULT_SELCTOR = "> *";
/**
 * Intersection
 * Toggles action in/out when target is intersecting with the screen
 *
 * Set this on scrollable element
 * target - children selector
 * offset - 0...1 - tells how much target must intersecting with the screen
 * action - action to trigger
 */
export class CuiIntersectionAttributes extends CuiAutoParseArgs {
    constructor() {
        super({
            props: {
                offset: { corrector: (value) => { return getRangeValueOrDefault(value, 0, 1, 0); } },
                target: { corrector: joinWithScopeSelector }
            }
        });
        this.target = joinWithScopeSelector(DEFAULT_SELCTOR);
        this.action = "";
        this.offset = 0;
        this.isRoot = false;
    }
}
export class CuiIntersectionComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : 'cui'}-intersection`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiIntersectionHandler(element, utils, this.attribute);
    }
}
export class CuiIntersectionHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiIntersectionHandler", element, attribute, new CuiIntersectionAttributes(), utils);
        _observer.set(this, void 0);
        _targets.set(this, void 0);
        _actions.set(this, void 0);
        __classPrivateFieldSet(this, _observer, new CuiIntersectionObserver(this.element));
        __classPrivateFieldSet(this, _targets, []);
        __classPrivateFieldSet(this, _actions, []);
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.parseArguments();
            __classPrivateFieldGet(this, _observer).setCallback(this.onIntersection.bind(this));
            __classPrivateFieldGet(this, _observer).connect();
            __classPrivateFieldGet(this, _targets).forEach(target => {
                __classPrivateFieldGet(this, _observer).observe(target);
            });
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.parseArguments();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _observer).disconnect();
            return true;
        });
    }
    parseArguments() {
        // @ts-ignore prevArgs is correct
        if (!is(this.prevArgs) || (this.prevArgs.target !== this.args.target)) {
            let el = this.args.isRoot ? document.body : this.element;
            __classPrivateFieldSet(this, _targets, [...el.querySelectorAll(this.args.target)]);
        }
        __classPrivateFieldSet(this, _actions, CuiActionsListFactory.get(this.args.action));
    }
    onIntersection(entries, observer) {
        if (!is(__classPrivateFieldGet(this, _targets))) {
            return;
        }
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= this.args.offset) {
                this.addActions(entry.target);
            }
            else {
                this.removeActions(entry.target);
            }
            this.emitIntersection(entry);
        });
    }
    emitIntersection(entry) {
        this.emitEvent(EVENTS.INTERSECTION, {
            entry: entry,
            offset: this.args.offset,
            timestamp: Date.now()
        });
    }
    addActions(element) {
        __classPrivateFieldGet(this, _actions).forEach(action => action.add(element));
    }
    removeActions(element) {
        __classPrivateFieldGet(this, _actions).forEach(action => action.remove(element));
    }
}
_observer = new WeakMap(), _targets = new WeakMap(), _actions = new WeakMap();
