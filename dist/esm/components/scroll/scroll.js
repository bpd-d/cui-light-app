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
var _parent, _target, _onClickBound;
import { CuiHandlerBase } from "../../core/handlers/base";
import { EVENTS } from "../../core/utils/statics";
import { is, getOffsetTop, are, getEnumOrDefault } from "../../core/utils/functions";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export class CuiScrollArgs extends CuiAutoParseArgs {
    constructor() {
        super({
            props: {
                "behavior": { corrector: (value) => getEnumOrDefault(value, 'auto', 'smooth') }
            }
        });
        this.target = "";
        this.parent = "";
        this.behavior = 'auto';
    }
}
/**
 * Component scrolls to specified target in the document
 * Arguments:
 * target - selector to target element where page should be scrolled to.
 * parent - set parent selector if parent should be different than html parent
 * behavior - auto/smooth - choose between step and smooth scrolling
 *
 */
export class CuiScrollComponent {
    constructor(prefix) {
        this.attribute = is(prefix) ? prefix + 'scroll' : 'cui-scroll';
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiScrollHandler(element, utils, this.attribute);
    }
}
export class CuiScrollHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiScrollHandler", element, attribute, new CuiScrollArgs(), utils);
        _parent.set(this, void 0);
        _target.set(this, void 0);
        _onClickBound.set(this, void 0);
        this.element = element;
        __classPrivateFieldSet(this, _parent, null);
        __classPrivateFieldSet(this, _target, null);
        __classPrivateFieldSet(this, _onClickBound, this.onClick.bind(this));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.element.addEventListener('click', __classPrivateFieldGet(this, _onClickBound));
            this.setTargets();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setTargets();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this.element.removeEventListener('click', __classPrivateFieldGet(this, _onClickBound));
            return true;
        });
    }
    onClick(ev) {
        if (!are(__classPrivateFieldGet(this, _target), __classPrivateFieldGet(this, _parent))) {
            return;
        }
        //@ts-ignore
        let to = getOffsetTop(__classPrivateFieldGet(this, _target)) - __classPrivateFieldGet(this, _parent).offsetTop;
        //@ts-ignore
        let from = __classPrivateFieldGet(this, _parent).scrollTop;
        let by = to - from;
        //@ts-ignore
        __classPrivateFieldGet(this, _parent).scrollBy({
            top: by,
            behavior: this.args.behavior
        });
        this.emitEvent(EVENTS.ON_SCROLL, {
            to: to,
            by: by,
            //@ts-ignore
            target: __classPrivateFieldGet(this, _target),
            //@ts-ignore
            parent: __classPrivateFieldGet(this, _parent),
            timestamp: Date.now(),
        });
        ev.preventDefault();
    }
    setTargets() {
        __classPrivateFieldSet(this, _target, is(this.args.target) ? document.querySelector(this.args.target) : null);
        if (is(__classPrivateFieldGet(this, _target))) {
            // @ts-ignore target is set
            __classPrivateFieldSet(this, _parent, is(this.args.parent) ? document.querySelector(this.args.parent) : __classPrivateFieldGet(this, _target).parentElement);
        }
    }
}
_parent = new WeakMap(), _target = new WeakMap(), _onClickBound = new WeakMap();
