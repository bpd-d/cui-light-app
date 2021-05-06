var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { replacePrefix } from "../../core/utils/functions";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiHandlerBase } from "../../core/handlers/base";
import { BasePositionCalculator, BaseResizeCalculator, getMoveAction } from "./helpers";
import { CLASSES, EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { moveExtension } from "../extensions/move/move";
import { moveExtensionPerformer } from "../extensions/move/performer";
import { eventExtension } from "../extensions/event/event";
import { getEventBusFacade, CuiStyleHelper, getCuiHandlerInteractions } from "../../core/handlers/extensions/facades";
import { closeActionsPerformer, openActionsPerformer } from "../extensions/performers";
import { getActionsHelper } from "../../core/helpers/helpers";
import { CuiKeysHandlerExtension } from "../extensions/keys/keys";
import { getCuiKeyActionPerformer } from "../extensions/keys/performer";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { getKeyCloseCombos } from "../extensions/helpers/helpers";
import { getCuiKeysComboParser } from "../../core/utils/parsers/keys";
import { CuiComponentBaseHook } from "../base";
const FLOAT_OPEN_ANIMATION_CLASS = '.{prefix}-float-default-in';
const FLOAT_CLOSE_ANIMATION_CLASS = '.{prefix}-float-default-out';
const MOVE = '.{prefix}-float-move';
const RESIZE = '.{prefix}-float-resize';
export class CuiFloatArgs extends CuiAutoParseArgs {
    constructor(prefix, defTimeout) {
        super();
        this.escClose = false;
        this.keyClose = "";
        this.openAct = replacePrefix(FLOAT_OPEN_ANIMATION_CLASS, prefix);
        this.closeAct = replacePrefix(FLOAT_CLOSE_ANIMATION_CLASS, prefix);
        this.timeout = defTimeout !== null && defTimeout !== void 0 ? defTimeout : 300;
    }
}
export function CuiFloatComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "float",
        create: (element, utils, prefix, attribute) => {
            return new CuiFloatHandler(element, utils, attribute, prefix);
        }
    });
}
export class CuiFloatHandler extends CuiHandlerBase {
    constructor(element, utils, attribute, prefix) {
        super("CuiFloatHandler", element, attribute, new CuiFloatArgs(prefix, utils.setup.animationTime), utils);
        this._prevX = 0;
        this._prevY = 0;
        this._positionCalculator = new BasePositionCalculator();
        this._resizeCalculator = new BaseResizeCalculator(element);
        this._prefix = prefix;
        this._moveBtn = null;
        this._resizeBtn = null;
        this._currentAction = undefined;
        this._interactions = getCuiHandlerInteractions(utils.interactions);
        this._styles = new CuiStyleHelper();
        this._busFacade = getEventBusFacade(this.getId(), utils.bus, element);
        this._keysPerformer = getCuiKeyActionPerformer(this.onCloseAction.bind(this));
        this._keyComboParser = getCuiKeysComboParser();
        this._movePerformer = moveExtensionPerformer({
            onDown: this.onMouseDown.bind(this),
            onMove: this.onMouseMove.bind(this),
            onUp: this.onMouseUp.bind(this),
        });
        this._movePerformer.setEnabled(false);
        const actionsHelper = getActionsHelper(utils.interactions);
        this._openActionPerformer = openActionsPerformer(actionsHelper, this._busFacade, {
            isActive: this.isActive.bind(this),
            onFinish: () => {
                this._movePerformer.setEnabled(true);
            }
        }, {
            active: this.activeAction,
            element: element
        });
        this._closeActionPerformer = closeActionsPerformer(actionsHelper, this._busFacade, {
            isActive: this.isActive.bind(this),
            onFinish: () => {
                this._movePerformer.setEnabled(false);
            }
        }, {
            active: this.activeAction,
            element: element
        });
        if (!utils.isPlugin("keys-plugin")) {
            this.logWarning("KeyObserver plugin is not available, escClose and keyClose will not work");
        }
        this.extend(moveExtension({
            performer: this._movePerformer
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.OPEN,
            performer: this._openActionPerformer,
        }));
        this.extend(eventExtension(this._busFacade, {
            eventName: EVENTS.CLOSE,
            performer: this._closeActionPerformer,
        }));
        this.extend(new CuiKeysHandlerExtension(element, this._busFacade, this._keysPerformer));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            AriaAttributes.setAria(this.element, 'aria-modal', "");
            this._moveBtn = this.element.querySelector(replacePrefix(MOVE, this._prefix));
            this._resizeBtn = this.element.querySelector(replacePrefix(RESIZE, this._prefix));
            this.updateSetups();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateSetups();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    updateSetups() {
        this._closeActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: CuiActionsListFactory.get(this.args.closeAct)
        });
        this._openActionPerformer.updateSetup({
            timeout: this.args.timeout,
            actions: CuiActionsListFactory.get(this.args.openAct)
        });
        this._keysPerformer.setKeyCombos(getKeyCloseCombos(this._keyComboParser, this.args.escClose, this.args.keyClose));
    }
    onMouseDown(ev) {
        let type = "";
        let calculator = undefined;
        if (ev.target === this._moveBtn) {
            type = 'move';
            calculator = this._positionCalculator;
        }
        else if (ev.target === this._resizeBtn) {
            type = "resize";
            calculator = this._resizeCalculator;
        }
        else {
            return;
        }
        this._currentAction = getMoveAction(type, calculator, this.element, this._interactions, this._styles);
        if (this._currentAction) {
            this._currentAction.init(ev);
        }
        this._prevX = ev.x;
        this._prevY = ev.y;
        this.asyncClasses.setClasses(document.body, CLASSES.swipingOn);
        // Lock global move handler
        this.core.bus.emit(EVENTS.MOVE_LOCK, null, true);
    }
    onMouseMove(ev) {
        if (this._currentAction) {
            this._currentAction.move(ev.x, ev.y, (ev.x - this._prevX), (ev.y - this._prevY));
        }
        this._prevX = ev.x;
        this._prevY = ev.y;
        ev.event.preventDefault();
    }
    onMouseUp(ev) {
        this._currentAction = undefined;
        this.asyncClasses.removeClasses(document.body, CLASSES.swipingOn);
        // Unlock global handler
        this.core.bus.emit(EVENTS.MOVE_LOCK, null, false);
    }
    onCloseAction() {
        this._closeActionPerformer.perform("keys");
    }
}
