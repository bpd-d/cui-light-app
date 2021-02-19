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
var _interactions, _inputType, _onMouseListener, _onTouchListener, _onKeyDownListener, _currentCls;
const DEFAULT_FOCUS_VISIBLE = "focus-visible";
const DEFAULT_FOCUS_PRECISE = "focus-precise";
export class CuiLightFocusPlugin {
    constructor(setup) {
        _interactions.set(this, void 0);
        _inputType.set(this, void 0);
        _onMouseListener.set(this, void 0);
        _onTouchListener.set(this, void 0);
        _onKeyDownListener.set(this, void 0);
        _currentCls.set(this, void 0);
        this.setup = Object.assign({ keybordClass: DEFAULT_FOCUS_VISIBLE, mouseClass: DEFAULT_FOCUS_PRECISE, touchClass: DEFAULT_FOCUS_PRECISE }, setup);
        this.description = "CuiLightFocusPlugin";
        this.name = "focus-plugin";
        __classPrivateFieldSet(this, _interactions, undefined);
        __classPrivateFieldSet(this, _onKeyDownListener, this.onKeyDownEvent.bind(this));
        __classPrivateFieldSet(this, _onMouseListener, this.onMouseEvent.bind(this));
        __classPrivateFieldSet(this, _onTouchListener, this.onTouchEvent.bind(this));
        __classPrivateFieldSet(this, _inputType, 'none');
        __classPrivateFieldSet(this, _currentCls, undefined);
    }
    init(utils) {
        __classPrivateFieldSet(this, _interactions, utils.interactions);
        document.body.addEventListener('touchstart', __classPrivateFieldGet(this, _onTouchListener));
        document.body.addEventListener('mousedown', __classPrivateFieldGet(this, _onMouseListener));
        window.addEventListener('keydown', __classPrivateFieldGet(this, _onKeyDownListener));
    }
    onMouseEvent(ev) {
        if (__classPrivateFieldGet(this, _inputType) === 'mouse') {
            return;
        }
        this.update('mouse');
    }
    onKeyDownEvent(ev) {
        if (__classPrivateFieldGet(this, _inputType) === 'keyboard') {
            return;
        }
        this.update('keyboard');
    }
    onTouchEvent(ev) {
        if (__classPrivateFieldGet(this, _inputType) === 'touch') {
            return;
        }
        this.update('touch');
    }
    update(type) {
        let cls = this.getClass(type);
        this.setClasses(cls, __classPrivateFieldGet(this, _currentCls), () => {
            __classPrivateFieldSet(this, _currentCls, cls);
            __classPrivateFieldSet(this, _inputType, type);
        });
    }
    getClass(type) {
        switch (type) {
            case "keyboard":
                return this.setup.keybordClass;
            case "mouse":
                return this.setup.mouseClass;
            case "touch":
                return this.setup.touchClass;
            default:
                return undefined;
        }
    }
    setClasses(cls, prevCls, callback) {
        if (!__classPrivateFieldGet(this, _interactions) || cls === prevCls) {
            return;
        }
        __classPrivateFieldGet(this, _interactions).fetch(() => {
            let hasCls = cls && document.body.classList.contains(cls);
            let hasPrevCls = prevCls && document.body.classList.contains(prevCls);
            // @ts-ignore interactions is set
            __classPrivateFieldGet(this, _interactions).mutate(() => {
                if (!hasCls)
                    // @ts-ignore cls is set
                    document.body.classList.add(cls);
                if (hasPrevCls) {
                    // @ts-ignore prevCls is set
                    document.body.classList.remove(prevCls);
                }
                callback();
            }, null);
        }, null);
    }
    destroy() {
        document.body.removeEventListener('touchstart', __classPrivateFieldGet(this, _onTouchListener));
        document.body.removeEventListener('mousedown', __classPrivateFieldGet(this, _onMouseListener));
        window.removeEventListener('keydown', __classPrivateFieldGet(this, _onKeyDownListener));
    }
}
_interactions = new WeakMap(), _inputType = new WeakMap(), _onMouseListener = new WeakMap(), _onTouchListener = new WeakMap(), _onKeyDownListener = new WeakMap(), _currentCls = new WeakMap();
