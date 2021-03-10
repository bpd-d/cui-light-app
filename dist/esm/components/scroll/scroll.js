var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CuiHandlerBase } from "../../core/handlers/base";
import { EVENTS } from "../../core/utils/statics";
import { is, getOffsetTop, getEnumOrDefault } from "../../core/utils/functions";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiClickModule } from "../modules/click/click";
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
        this.stopPropagation = false;
        this.prevent = false;
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
        this.addModule(new CuiClickModule(this.element, this.args, this.onClick.bind(this)));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
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
            return true;
        });
    }
    onClick(ev) {
        const target = this.getTarget();
        const parent = this.getTargetsParent(target);
        if (!target || !parent) {
            return;
        }
        let to = getOffsetTop(target) - parent.offsetTop;
        let from = parent.scrollTop;
        let by = to - from;
        parent.scrollBy({
            top: by,
            behavior: this.args.behavior
        });
        this.emitEvent(EVENTS.ON_SCROLL, {
            to: to,
            by: by,
            target: target,
            parent: parent
        });
    }
    getTarget() {
        return is(this.args.target) ? document.querySelector(this.args.target) : null;
    }
    getTargetsParent(target) {
        return is(this.args.parent) ? document.querySelector(this.args.parent) : target ? target.parentElement : null;
    }
}
