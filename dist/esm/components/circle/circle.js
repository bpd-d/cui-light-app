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
var _factor, _full, _path, _attr, _progressEventId;
import { CuiHandlerBase } from "../../core/handlers/base";
import { is, getRangeValue } from "../../core/utils/functions";
import { ICONS, EVENTS } from "../../core/utils/statics";
import { IconBuilder } from "../../core/builders/icon";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
export class CuiCircleArgs extends CuiAutoParseArgs {
    constructor() {
        super();
        this.progress = 0;
    }
}
export class CuiCircleComponent {
    constructor(prefix) {
        this.attribute = (prefix !== null && prefix !== void 0 ? prefix : 'cui') + '-circle-progress';
        ICONS['special_circle_progress'] = "<svg xmlns=\"http://www.w3.org/2000/svg\"  class=\"circle-progress\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle-progress-path\" d=\"M 50,5.3660047 A 44.867708,44.633994 0 0 1 94.867709,49.999997 44.867708,44.633994 0 0 1 50,94.633995 44.867708,44.633994 0 0 1 5.1322908,50.000001 44.867708,44.633994 0 0 1 50,5.3660047\"></path></svg>";
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiCircleHandler(element, utils, this.attribute);
    }
}
export class CuiCircleHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiCircleHandler", element, attribute, new CuiCircleArgs(), utils);
        _factor.set(this, void 0);
        _full.set(this, void 0);
        _path.set(this, void 0);
        _attr.set(this, void 0);
        _progressEventId.set(this, void 0);
        __classPrivateFieldSet(this, _factor, __classPrivateFieldSet(this, _full, 0));
        __classPrivateFieldSet(this, _path, null);
        __classPrivateFieldSet(this, _attr, attribute);
        __classPrivateFieldSet(this, _progressEventId, null);
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            const iconSvg = new IconBuilder(ICONS['special_circle_progress']).build();
            if (!is(iconSvg)) {
                this.logError("SVG circle was not created", "onInit");
                return false;
            }
            const svg = this.element.querySelector('svg');
            if (is(svg)) {
                //@ts-ignore svg checked
                svg.remove();
            }
            //@ts-ignore iconSvg checked
            this.element.appendChild(iconSvg);
            __classPrivateFieldSet(this, _path, this.element.querySelector('.circle-progress-path'));
            __classPrivateFieldSet(this, _full, __classPrivateFieldGet(this, _path).getTotalLength());
            __classPrivateFieldSet(this, _factor, __classPrivateFieldGet(this, _full) / 100);
            this.fetch(this.readStyle);
            __classPrivateFieldSet(this, _progressEventId, this.onEvent(EVENTS.PROGRESS_CHANGE, this.onSetProgress.bind(this)));
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.fetch(this.readStyle);
            this.emitEvent(EVENTS.PROGRESS_CHANGED, {
                timestamp: Date.now(),
                progress: this.args.progress
            });
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this.detachEvent(EVENTS.PROGRESS_CHANGE, __classPrivateFieldGet(this, _progressEventId));
            return true;
        });
    }
    onSetProgress(val) {
        if (is(val)) {
            this.element.setAttribute(__classPrivateFieldGet(this, _attr), val);
        }
    }
    updateStyle(value) {
        __classPrivateFieldGet(this, _path).style.strokeDashoffset = value;
    }
    readStyle() {
        if (this.prevArgs && this.args.progress === this.prevArgs.progress) {
            return;
        }
        const progress = getRangeValue(this.args.progress, 0, 100);
        this.mutate(this.updateStyle, __classPrivateFieldGet(this, _full) - __classPrivateFieldGet(this, _factor) * progress);
    }
}
_factor = new WeakMap(), _full = new WeakMap(), _path = new WeakMap(), _attr = new WeakMap(), _progressEventId = new WeakMap();
