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
import { CuiHandler } from "../../core/handlers/base";
import { EVENTS } from "../../core/utils/statics";
import { is, getOffsetTop, getStringOrDefault, are } from "../../core/utils/functions";
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
export class CuiScrollArgs {
    constructor() {
        this.target = "";
        this.parent = "";
        this.behavior = 'auto';
    }
    parse(val) {
        this.target = getStringOrDefault(val.target, "");
        this.parent = getStringOrDefault(val.parent, "");
        this.behavior = is(val.behavior) && val.behavior.toLowerCase() === 'smooth' ? 'smooth' : 'auto';
    }
}
export class CuiScrollHandler extends CuiHandler {
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
    onInit() {
        this.element.addEventListener('click', __classPrivateFieldGet(this, _onClickBound));
        this.setTargets();
    }
    onUpdate() {
        this.setTargets();
    }
    onDestroy() {
        this.element.removeEventListener('click', __classPrivateFieldGet(this, _onClickBound));
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
