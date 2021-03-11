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
var _listener, _links, _actions, _linkActions, _root, _rootBox, _modeHandler;
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { getRangeValueOrDefault, getEnumOrDefault, joinWithScopeSelector } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiIntersectionListener } from "../../core/intersection/intersection";
import { CuiElementBoxFactory } from "../../core/models/elements";
import { CuiScrollSpyModeHandlerFactory } from "./mode";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
const DEFAULT_SELECTOR = "> *";
export class CuiScrollSpyArgs extends CuiAutoParseArgs {
    constructor() {
        super({
            props: {
                "selector": { corrector: joinWithScopeSelector },
                "ratio": { corrector: (value) => getRangeValueOrDefault(value, 0, 1, 0) },
                'mode': { corrector: (value) => getEnumOrDefault(value, 'single', "multi") }
            }
        });
        this.ratio = 0;
        this.mode = "single";
        this.threshold = -1;
        this.selector = joinWithScopeSelector(DEFAULT_SELECTOR);
        this.action = "";
        this.isRoot = false;
        this.link = "";
        this.linkAction = "";
    }
}
export class CuiScrollspyComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : 'cui'}-scrollspy`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiScrollspyHandler(element, utils, this.attribute);
    }
}
export class CuiScrollspyHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiScrollspyHandler", element, attribute, new CuiScrollSpyArgs(), utils);
        _listener.set(this, void 0);
        _links.set(this, void 0);
        _actions.set(this, void 0);
        _linkActions.set(this, void 0);
        _root.set(this, void 0);
        _rootBox.set(this, void 0);
        _modeHandler.set(this, void 0);
        this.element = element;
        __classPrivateFieldSet(this, _listener, new CuiIntersectionListener(this.element, { threshold: this.utils.setup.scrollThreshold }));
        __classPrivateFieldSet(this, _links, []);
        __classPrivateFieldSet(this, _actions, []);
        __classPrivateFieldSet(this, _linkActions, []);
        __classPrivateFieldSet(this, _root, undefined);
        __classPrivateFieldSet(this, _rootBox, undefined);
        __classPrivateFieldSet(this, _modeHandler, undefined);
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.init();
            __classPrivateFieldGet(this, _listener).setCallback(this.onIntersection.bind(this));
            __classPrivateFieldGet(this, _listener).attach();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.update();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _listener).detach();
            return true;
        });
    }
    onIntersection(ev) {
        if (!__classPrivateFieldGet(this, _modeHandler)) {
            this.logError("Cannot perform - mode handler not initialized", "OnIntersection");
            return;
        }
        let timestamp = Date.now();
        this.mutate(() => {
            //@ts-ignore - modeHandler checked
            let updateResult = __classPrivateFieldGet(this, _modeHandler).update(ev.items, this.args.ratio, __classPrivateFieldGet(this, _actions), __classPrivateFieldGet(this, _links), __classPrivateFieldGet(this, _linkActions));
            if (updateResult.changed) {
                this.emitEvent(EVENTS.TARGET_CHANGE, {
                    intersecting: updateResult.intersecting,
                    timestamp: timestamp
                });
            }
        });
        this.emitEvent(EVENTS.ON_SCROLL, {
            top: ev.top,
            left: ev.left,
            scrolling: ev.scrolling,
            initial: ev.initial
        });
    }
    init() {
        __classPrivateFieldSet(this, _root, this.args.isRoot ? window : this.element);
        __classPrivateFieldSet(this, _rootBox, CuiElementBoxFactory.get(__classPrivateFieldGet(this, _root)));
        let targets = this.args.selector ? __classPrivateFieldGet(this, _rootBox).queryAll(this.args.selector) : [];
        __classPrivateFieldGet(this, _listener).setChildren(targets);
        __classPrivateFieldGet(this, _listener).setThreshold(this.args.threshold);
        __classPrivateFieldSet(this, _links, this.args.link ? [...document.querySelectorAll(this.args.link)] : []);
        __classPrivateFieldSet(this, _actions, CuiActionsListFactory.get(this.args.action));
        __classPrivateFieldSet(this, _linkActions, CuiActionsListFactory.get(this.args.linkAction));
        __classPrivateFieldSet(this, _modeHandler, CuiScrollSpyModeHandlerFactory.get(this.args.mode));
    }
    update() {
        if (this.prevArgs && this.args.isRoot !== this.prevArgs.isRoot) {
            __classPrivateFieldSet(this, _root, this.args.isRoot ? window : this.element);
            __classPrivateFieldSet(this, _rootBox, CuiElementBoxFactory.get(__classPrivateFieldGet(this, _root)));
            __classPrivateFieldGet(this, _listener).setParent(__classPrivateFieldGet(this, _root));
        }
        if (this.prevArgs && __classPrivateFieldGet(this, _rootBox) && this.args.selector !== this.prevArgs.selector) {
            let targets = this.args.selector ? __classPrivateFieldGet(this, _rootBox).queryAll(this.args.selector) : [];
            __classPrivateFieldGet(this, _listener).setChildren(targets);
        }
        __classPrivateFieldGet(this, _listener).setThreshold(this.args.threshold);
        __classPrivateFieldSet(this, _links, this.args.link ? [...document.querySelectorAll(this.args.link)] : []);
        __classPrivateFieldSet(this, _actions, CuiActionsListFactory.get(this.args.action));
        __classPrivateFieldSet(this, _linkActions, CuiActionsListFactory.get(this.args.linkAction));
        __classPrivateFieldSet(this, _modeHandler, CuiScrollSpyModeHandlerFactory.get(this.args.mode));
    }
}
_listener = new WeakMap(), _links = new WeakMap(), _actions = new WeakMap(), _linkActions = new WeakMap(), _root = new WeakMap(), _rootBox = new WeakMap(), _modeHandler = new WeakMap();
