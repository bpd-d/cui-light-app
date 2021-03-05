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
var _prefix, _pauseEventId, _animationPauseClass;
import { CuiHandlerBase } from "../../core/handlers/base";
import { EVENTS, ICONS } from "../../core/utils/statics";
import { is, replacePrefix } from "../../core/utils/functions";
import { IconBuilder } from "../../core/builders/icon";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export class CuiSpinnerArgs extends CuiAutoParseArgs {
    constructor() {
        super({
            main: "spinner"
        });
        this.spinner = "circle";
        this.scale = 1;
    }
}
export class CuiSpinnerComponent {
    constructor(prefix) {
        _prefix.set(this, void 0);
        __classPrivateFieldSet(this, _prefix, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${__classPrivateFieldGet(this, _prefix)}-spinner`;
        ICONS['spinner_circle'] = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 7.800378,1.7908996 A 8.4986862,8.4986862 0 0 1 18.2091,7.8003784 8.4986862,8.4986862 0 0 1 12.199621,18.209101 8.4986862,8.4986862 0 0 1 1.7908995,12.199622 8.4986862,8.4986862 0 0 1 7.800378,1.7908996 Z\"></path></svg>";
        ICONS['spinner_circle_double'] = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 10,1.5000006 A 8.4999997,8.4999997 0 0 1 18.5,10 8.4999997,8.4999997 0 0 1 10,18.499999 8.4999997,8.4999997 0 0 1 1.5000005,10 8.4999997,8.4999997 0 0 1 10,1.5000006 Z\"></path><path d=\"M 10,3.4999997 A 6.5000002,6.5000002 0 0 1 16.5,10 6.5000002,6.5000002 0 0 1 10,16.5 6.5000002,6.5000002 0 0 1 3.5,9.9999993 6.5000002,6.5000002 0 0 1 10,3.4999997 Z\"></path></svg>";
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiSpinnerHandler(element, utils, this.attribute, __classPrivateFieldGet(this, _prefix));
    }
}
_prefix = new WeakMap();
export class CuiSpinnerHandler extends CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiSpinnerHandler", element, attribute, new CuiSpinnerArgs(), utils);
        _pauseEventId.set(this, void 0);
        _animationPauseClass.set(this, void 0);
        __classPrivateFieldSet(this, _pauseEventId, null);
        __classPrivateFieldSet(this, _animationPauseClass, replacePrefix("{prefix}-animation-pause", prefix));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _pauseEventId, this.onEvent(EVENTS.PAUSE, this.onPause.bind(this)));
            this.add();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.prevArgs && this.args.spinner !== this.prevArgs.spinner) {
                this.add();
            }
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this.removeIfAnyExisists();
            this.detachEvent(EVENTS.PAUSE, __classPrivateFieldGet(this, _pauseEventId));
            return true;
        });
    }
    addSpinner(iconElement, name) {
        this.element.appendChild(iconElement);
        this.element.classList.add(`animation-spinner-${name}`);
    }
    add() {
        const svgIcon = is(this.args.spinner) ? ICONS[`spinner_${this.args.spinner}`] : null;
        if (!is(svgIcon)) {
            this._log.warning("Incorrect spinner name: " + this.args.spinner);
            return;
        }
        this.removeIfAnyExisists();
        const iconElement = new IconBuilder(svgIcon).setScale(this.args.scale).build();
        this.mutate(this.addSpinner, iconElement, this.args.spinner);
    }
    removeIfAnyExisists() {
        let existing = this.element.querySelector("svg");
        if (existing) {
            existing.remove();
        }
    }
    onPause(flag) {
        this.fetch(() => {
            if (flag && !this.helper.hasClass(__classPrivateFieldGet(this, _animationPauseClass), this.element)) {
                this.helper.setClassesAs(this.element, __classPrivateFieldGet(this, _animationPauseClass));
            }
            else {
                this.helper.removeClassesAs(this.element, __classPrivateFieldGet(this, _animationPauseClass));
            }
        });
        this.emitEvent(EVENTS.PAUSED, flag);
    }
}
_pauseEventId = new WeakMap(), _animationPauseClass = new WeakMap();
