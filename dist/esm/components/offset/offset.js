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
var _listener, _target, _utils, _matched, _action, _prevX, _prevY, _threshold, _root, _modeHandler;
import { CuiHandlerBase } from "../../core/handlers/base";
import { CuiScrollListener } from "../../core/listeners/scroll";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { are, getRangeValue, is } from "../../core/utils/functions";
import { CuiOffsetModeFactory } from "./modes";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export class CuiOffsetArgs extends CuiAutoParseArgs {
    constructor() {
        super();
        this.offsetX = -1;
        this.offsetY = -1;
        this.target = "";
        this.root = false;
        this.action = "";
        this.mode = 'static';
    }
}
export class CuiOffsetComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : 'cui'}-offset`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiOffsetHandler(element, utils, this.attribute);
    }
}
export class CuiOffsetHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiOffsetHandler", element, attribute, new CuiOffsetArgs(), utils);
        _listener.set(this, void 0);
        _target.set(this, void 0);
        _utils.set(this, void 0);
        _matched.set(this, void 0);
        _action.set(this, void 0);
        _prevX.set(this, void 0);
        _prevY.set(this, void 0);
        _threshold.set(this, void 0);
        _root.set(this, void 0);
        _modeHandler.set(this, void 0);
        this.element = element;
        __classPrivateFieldSet(this, _target, this.element);
        __classPrivateFieldSet(this, _utils, utils);
        __classPrivateFieldSet(this, _matched, false);
        __classPrivateFieldSet(this, _action, []);
        __classPrivateFieldSet(this, _prevX, 0);
        __classPrivateFieldSet(this, _prevY, 0);
        __classPrivateFieldSet(this, _threshold, 20);
        __classPrivateFieldSet(this, _root, this.element);
        __classPrivateFieldSet(this, _modeHandler, null);
        __classPrivateFieldSet(this, _listener, undefined);
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.parseAttribute();
            __classPrivateFieldSet(this, _listener, new CuiScrollListener(this.args.root ? window : this.element, this.utils.setup.scrollThreshold));
            __classPrivateFieldGet(this, _listener).setCallback(this.onScroll.bind(this));
            __classPrivateFieldGet(this, _listener).attach();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.parseAttribute();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _listener))
                __classPrivateFieldGet(this, _listener).detach();
            return true;
        });
    }
    onScroll(ev) {
        this.checkAndPerformActions(ev);
    }
    parseAttribute() {
        __classPrivateFieldSet(this, _root, this.getRoot());
        __classPrivateFieldSet(this, _target, this.getTarget());
        __classPrivateFieldSet(this, _action, CuiActionsListFactory.get(this.args.action));
        __classPrivateFieldSet(this, _modeHandler, CuiOffsetModeFactory.get(this.args.mode));
    }
    checkAndPerformActions(ev) {
        if (!is(__classPrivateFieldGet(this, _modeHandler))) {
            this.logError("Cannot perform - mode handler not initialized", "checkAndPerformActions");
        }
        // @ts-ignore modehandler
        let matchesOffset = __classPrivateFieldGet(this, _modeHandler).matches(ev.top, ev.left, this.args.offsetX, this.args.offsetY);
        /**
         * Act and emit event when offset has been reached
         */
        if (matchesOffset !== __classPrivateFieldGet(this, _matched)) {
            this.act(matchesOffset);
            __classPrivateFieldSet(this, _matched, matchesOffset);
            this.callEvent(__classPrivateFieldGet(this, _matched), ev.left, ev.top, ev.scrolling, ev.source, ...this.calcaRatio(ev.left, ev.top));
            return;
        }
        /**
         * Emit event periodically
         */
        if (this.exceededThreshold(ev.left, ev.top)) {
            this.callEvent(__classPrivateFieldGet(this, _matched), ev.left, ev.top, ev.scrolling, ev.source, ...this.calcaRatio(ev.left, ev.top));
            __classPrivateFieldSet(this, _prevX, ev.left);
            __classPrivateFieldSet(this, _prevY, ev.top);
        }
    }
    act(matching) {
        if (!are(__classPrivateFieldGet(this, _action), __classPrivateFieldGet(this, _target))) {
            return;
        }
        this.isLocked = true;
        __classPrivateFieldGet(this, _action).forEach(action => {
            if (matching) {
                action.add(__classPrivateFieldGet(this, _target), __classPrivateFieldGet(this, _utils));
            }
            else {
                action.remove(__classPrivateFieldGet(this, _target), __classPrivateFieldGet(this, _utils));
            }
        });
        this.isLocked = false;
    }
    callEvent(matches, x, y, scrolling, source, ratioX, ratioY) {
        this.emitEvent(EVENTS.OFFSET, {
            matches: __classPrivateFieldGet(this, _matched),
            offsetX: x,
            offsetY: y,
            ratioX: ratioX,
            ratioY: ratioY,
            scrolling: scrolling,
            source: source,
            timestamp: Date.now()
        });
    }
    getRoot() {
        return this.args.root ? document.body : this.element;
    }
    exceededThreshold(x, y) {
        return Math.abs(x - __classPrivateFieldGet(this, _prevX)) > __classPrivateFieldGet(this, _threshold) || Math.abs(y - __classPrivateFieldGet(this, _prevY)) > __classPrivateFieldGet(this, _threshold);
    }
    calcaRatio(x, y) {
        let ratY = parseFloat(((__classPrivateFieldGet(this, _root).clientHeight + y) / __classPrivateFieldGet(this, _root).scrollHeight).toFixed(2));
        let ratX = parseFloat(((__classPrivateFieldGet(this, _root).clientWidth + x) / __classPrivateFieldGet(this, _root).scrollWidth).toFixed(2));
        return [getRangeValue(ratX, 0, 1), getRangeValue(ratY, 0, 1)];
    }
    getTarget() {
        let target = this.args.target ? __classPrivateFieldGet(this, _root).querySelector(this.args.target) : null;
        return target !== null && target !== void 0 ? target : this.element;
    }
}
_listener = new WeakMap(), _target = new WeakMap(), _utils = new WeakMap(), _matched = new WeakMap(), _action = new WeakMap(), _prevX = new WeakMap(), _prevY = new WeakMap(), _threshold = new WeakMap(), _root = new WeakMap(), _modeHandler = new WeakMap();
