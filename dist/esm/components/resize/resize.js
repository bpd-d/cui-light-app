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
var _prefix, _eventId, _intersectionObserver, _currentSize, _currentValue, _lastValue, _currentAction, _isIntersecting, _timeoutToken;
import { CuiHandler } from "../../core/handlers/base";
import { EVENTS } from "../../core/utils/statics";
import { calcWindowSize, getIntOrDefault, getStringOrDefault, is } from "../../core/utils/functions";
import { CuiIntersectionObserver } from "../../core/observers/intersection";
import { CuiActionsFatory } from "../../core/utils/actions";
export class CuiResizeArgs {
    constructor() {
        this.mode = "simple";
        this.default = "";
        this.small = this.medium = this.large = this.xlarge = undefined;
        this.delay = 0;
    }
    parse(args) {
        var _a, _b, _c, _d;
        this.default = getStringOrDefault(args.default, "");
        this.small = (_a = args.small) !== null && _a !== void 0 ? _a : args.s;
        this.medium = (_b = args.medium) !== null && _b !== void 0 ? _b : args.m;
        this.large = (_c = args.large) !== null && _c !== void 0 ? _c : args.l;
        this.xlarge = (_d = args.xlarge) !== null && _d !== void 0 ? _d : args.xl;
        this.mode = args.mode === 'smart' ? "smart" : "simple";
        this.delay = getIntOrDefault(args.delay, 0);
    }
}
export class CuiResizeComponent {
    constructor(prefix) {
        _prefix.set(this, void 0);
        __classPrivateFieldSet(this, _prefix, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${__classPrivateFieldGet(this, _prefix)}-resize`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiResizeHandler(element, utils, this.attribute);
    }
}
_prefix = new WeakMap();
export class CuiResizeHandler extends CuiHandler {
    constructor(element, utils, attribute) {
        super("CuiResizeHandler", element, attribute, new CuiResizeArgs(), utils);
        _eventId.set(this, void 0);
        _intersectionObserver.set(this, void 0);
        _currentSize.set(this, void 0);
        _currentValue.set(this, void 0);
        _lastValue.set(this, void 0);
        _currentAction.set(this, void 0);
        _isIntersecting.set(this, void 0);
        _timeoutToken.set(this, void 0);
        __classPrivateFieldSet(this, _eventId, null);
        __classPrivateFieldSet(this, _intersectionObserver, new CuiIntersectionObserver(document.documentElement, [0, 0.1]));
        __classPrivateFieldGet(this, _intersectionObserver).setCallback(this.onIntersection.bind(this));
        __classPrivateFieldSet(this, _lastValue, "");
        __classPrivateFieldSet(this, _currentValue, "");
        __classPrivateFieldSet(this, _currentSize, "none");
        __classPrivateFieldSet(this, _isIntersecting, false);
        __classPrivateFieldSet(this, _timeoutToken, undefined);
        __classPrivateFieldSet(this, _currentAction, undefined);
    }
    onInit() {
        __classPrivateFieldSet(this, _eventId, this.utils.bus.on(EVENTS.RESIZE, this.resize.bind(this)));
        __classPrivateFieldGet(this, _intersectionObserver).connect();
        __classPrivateFieldGet(this, _intersectionObserver).observe(this.element);
        __classPrivateFieldSet(this, _currentSize, calcWindowSize(window.innerWidth));
        __classPrivateFieldSet(this, _isIntersecting, this.isInViewport(this.element));
        this.setNewValue();
        this.updateElement();
    }
    onUpdate() {
        this.setNewValue();
        this.updateElement();
    }
    onDestroy() {
        if (__classPrivateFieldGet(this, _eventId) !== null) {
            this.utils.bus.detach(EVENTS.RESIZE, __classPrivateFieldGet(this, _eventId));
            __classPrivateFieldSet(this, _eventId, null);
        }
        __classPrivateFieldGet(this, _intersectionObserver).unobserve(this.element);
        __classPrivateFieldGet(this, _intersectionObserver).disconnect();
    }
    resize(data) {
        __classPrivateFieldSet(this, _currentSize, data.current);
        this.setNewValue();
        this.updateElement();
    }
    onIntersection(entries) {
        if (entries.length > 0) {
            __classPrivateFieldSet(this, _isIntersecting, entries[0].isIntersecting);
        }
        this.updateElement();
    }
    setNewValue() {
        let newValue = this.isSmartMode() ? this.getSmartValue(__classPrivateFieldGet(this, _currentSize)) : this.getValue(__classPrivateFieldGet(this, _currentSize), true);
        if (newValue && newValue !== __classPrivateFieldGet(this, _currentValue)) {
            __classPrivateFieldSet(this, _currentValue, newValue);
        }
    }
    getValue(size, replace) {
        let value = undefined;
        switch (size) {
            case "xlarge":
                value = this.args.xlarge;
                break;
            case "large":
                value = this.args.large;
                break;
            case "medium":
                value = this.args.medium;
                break;
            case "small":
                value = this.args.small;
                break;
            default:
                value = this.args.default;
        }
        return (replace && !value) ? this.args.default : value;
    }
    getSmartValue(size) {
        var _a, _b, _c, _d;
        let value = this.args.default;
        if (size === 'none') {
            return value;
        }
        value = (_a = this.args.small) !== null && _a !== void 0 ? _a : value;
        if (size === 'small') {
            return value;
        }
        value = (_b = this.args.medium) !== null && _b !== void 0 ? _b : value;
        if (size === 'medium') {
            return value;
        }
        value = (_c = this.args.large) !== null && _c !== void 0 ? _c : value;
        if (size === 'large') {
            return value;
        }
        return (_d = this.args.xlarge) !== null && _d !== void 0 ? _d : value;
    }
    updateElement() {
        if (!__classPrivateFieldGet(this, _isIntersecting) && this.isSmartMode()) {
            this.logInfo("Not intersecting");
            return;
        }
        if (!is(__classPrivateFieldGet(this, _currentValue))) {
            this.logWarning("Not eligible to set value: " + __classPrivateFieldGet(this, _currentValue));
            return;
        }
        if (__classPrivateFieldGet(this, _lastValue) !== __classPrivateFieldGet(this, _currentValue)) {
            this.run(() => {
                //@ts-ignore already checked
                let newAction = CuiActionsFatory.get(__classPrivateFieldGet(this, _currentValue));
                this.mutate(() => {
                    if (__classPrivateFieldGet(this, _currentAction)) {
                        __classPrivateFieldGet(this, _currentAction).remove(this.element);
                    }
                    newAction.add(this.element);
                    //@ts-ignore already checked
                    __classPrivateFieldSet(this, _lastValue, __classPrivateFieldGet(this, _currentValue));
                    __classPrivateFieldSet(this, _currentAction, newAction);
                });
            });
        }
    }
    isSmartMode() {
        return this.args.mode === 'smart';
    }
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth));
    }
    run(callback) {
        if (__classPrivateFieldGet(this, _timeoutToken)) {
            clearTimeout(__classPrivateFieldGet(this, _timeoutToken));
            __classPrivateFieldSet(this, _timeoutToken, undefined);
        }
        __classPrivateFieldSet(this, _timeoutToken, setTimeout(() => {
            callback();
            __classPrivateFieldSet(this, _timeoutToken, undefined);
        }, this.args.delay));
    }
}
_eventId = new WeakMap(), _intersectionObserver = new WeakMap(), _currentSize = new WeakMap(), _currentValue = new WeakMap(), _lastValue = new WeakMap(), _currentAction = new WeakMap(), _isIntersecting = new WeakMap(), _timeoutToken = new WeakMap();
