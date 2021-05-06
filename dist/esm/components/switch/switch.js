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
import { CuiTaskRunner } from "../../core/utils/task";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { is, replacePrefix, calculateNextIndex, getChildrenHeight, isInRange, joinWithScopeSelector, getCuiElementsBySelector } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiKeysHandlerExtension } from "../extensions/keys/keys";
import { getCuiKeyActionPerformer } from "../extensions/keys/performer";
import { CuiSwitchExtension } from "../extensions/switch/switch";
import { CuiStyleAsyncHelper, CuiStyleHelper, getEventBusFacade } from "../../core/handlers/extensions/facades";
import { CuiActionsHelper } from "../../core/helpers/helpers";
import { CuiComponentBaseHook } from "../base";
import { getCuiMutationPerformer } from "../extensions/mutations/performer";
import { CuiComponentMutationExtension } from "../extensions/mutations/mutations";
const SWITCH_DEFAULT_ACTION_IN = ".{prefix}-switch-animation-default-in";
const SWITCH_DEFAULT_ACTION_OUT = ".{prefix}-switch-animation-default-out";
const SWITCH_DEFAULT_TARGETS = " > *";
export class CuiSwitchArgs extends CuiAutoParseArgs {
    constructor(prefix, timeout) {
        super({
            props: {
                "targets": { corrector: joinWithScopeSelector }
            }
        });
        this.targets = joinWithScopeSelector(SWITCH_DEFAULT_TARGETS);
        this.in = replacePrefix(SWITCH_DEFAULT_ACTION_IN, prefix);
        this.out = replacePrefix(SWITCH_DEFAULT_ACTION_OUT, prefix);
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : 300;
        this.links = "";
        this.switch = "";
        this.autoTimeout = -1;
        this.height = "auto";
        this.loop = false;
        this.keyChange = false;
    }
}
export function CuiSwitchComponent(prefix) {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "switch",
        create: (element, utils, prefix, attribute) => {
            return new CuiSwitchHandler(element, utils, attribute);
        }
    });
}
export class CuiSwitchHandler extends CuiHandlerBase {
    constructor(element, utils, attribute) {
        super("CuiSwitchHandler", element, attribute, new CuiSwitchArgs(utils.setup.prefix, utils.setup.animationTime), utils);
        this._targets = [];
        this._actionsHelper = new CuiActionsHelper(utils.interactions);
        this._asyncStyles = new CuiStyleAsyncHelper(utils.interactions, new CuiStyleHelper());
        this._task = new CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next'));
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, this.element);
        this._switchPerformer = getCuiKeyActionPerformer(this.switch.bind(this));
        this._mutationPerformer = getCuiMutationPerformer(this.onMutation.bind(this));
        this.extend(new CuiKeysHandlerExtension(this.element, this._busFacade, this._switchPerformer));
        this.extend(new CuiSwitchExtension(this._busFacade, this.switch.bind(this)));
        this.extend(new CuiComponentMutationExtension(element, this._mutationPerformer));
    }
    onHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.handleUpdate();
            return true;
        });
    }
    onRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.handleUpdate();
            return true;
        });
    }
    onRemove() {
        return __awaiter(this, void 0, void 0, function* () {
            this._task.stop();
            this._busFacade.detachEmittedEvents();
            return true;
        });
    }
    handleUpdate() {
        this.parseArguments();
        this.getTargets();
        const currentIndex = this.getActiveIndex();
        this.setSwitchesActive(currentIndex);
        this.setLinkActive(-1, currentIndex);
        this.setTargetHeight(currentIndex);
        this.startTask();
    }
    onMutation(record) {
        this.getTargets();
        const currentIndex = this.getActiveIndex();
        this.setTargetHeight(currentIndex);
    }
    switch(index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lock()) {
                return false;
            }
            const actionsIn = CuiActionsListFactory.get(this.args.in);
            const actionsOut = CuiActionsListFactory.get(this.args.out);
            const activeIndex = this.getActiveIndex();
            const nextIdx = calculateNextIndex(index, activeIndex, this._targets.length);
            if (nextIdx < 0) {
                this.logWarning(`Index ${index} is not within the suitable range`, "switch");
                return false;
            }
            if (!this.args.loop && ((index === "next" && nextIdx === 0) || (index === 'prev' && activeIndex === 0))) {
                this.logInfo("Switch blocked by loop settings", "switch");
                return false;
            }
            this.setSwitchesActive(nextIdx);
            let nextItem = this._targets[nextIdx];
            yield this._actionsHelper.performSwitchAction(nextItem, activeIndex > -1 ? this._targets[activeIndex] : null, actionsIn, actionsOut, () => {
                // Set next element active
                nextItem.classList.add(this.activeClassName);
                // Remove active from current element (if current exists)
                if (activeIndex > -1)
                    this._targets[activeIndex].classList.remove(this.activeClassName);
                // Update linked items
                this.setLinkActive(activeIndex, nextIdx);
                // Update element height - it must be done a parent get height based on current child
                this.setTargetHeight(activeIndex);
                this.startTask();
                this.unlock();
            }, this.args.timeout);
            this._busFacade.emit(EVENTS.SWITCHED, {
                timestamp: Date.now(),
                index: nextIdx
            });
            return true;
        });
    }
    getActiveIndex() {
        return is(this._targets) ? this._targets.findIndex(target => this.classes.hasClass(this.activeClassName, target)) : -1;
    }
    getElementHeight(current) {
        if (!is(this.args.height) || this.args.height === 'auto') {
            return getChildrenHeight(current) + "px";
        }
        else {
            return this.args.height;
        }
    }
    /**
     * Gets attributes value and prepares properties
     */
    parseArguments() {
        this._task.setTimeout(this.args.autoTimeout);
        if (this.args.keyChange) {
            this._switchPerformer.setKeyCombos([{
                    key: 'next',
                    value: { isCtrl: true, isAlt: true, isShift: false, key: "ArrowRight" }
                }, {
                    key: 'prev',
                    value: { isCtrl: true, isAlt: true, isShift: false, key: "ArrowLeft" }
                }]);
        }
        else {
            this._switchPerformer.setKeyCombos([]);
        }
    }
    /**
     * Query target elements
     */
    getTargets() {
        this._targets = is(this.args.targets) ? [...this.element.querySelectorAll(this.args.targets)] : [];
    }
    setLinkActive(current, next) {
        const links = is(this.args.links) ? [...document.querySelectorAll(this.args.links)] : null;
        if (!links) {
            return;
        }
        const linksLen = links.length - 1;
        if (isInRange(current, 0, linksLen)) {
            //@ts-ignore already checked above
            this.classes.removeClass(this.activeClassName, links[current]);
        }
        if (isInRange(next, 0, linksLen)) {
            //@ts-ignore already checked above
            this.classes.setClass(this.activeClassName, links[next]);
        }
    }
    /**
     * Sets propers active state on attached switches
     * @param index
     */
    setSwitchesActive(index) {
        const switches = getCuiElementsBySelector(this.args.switch);
        switches.forEach(sw => {
            this.emitLinkSwitch(sw.$cuid, index);
        });
    }
    /**
     * Emits push event to attached switch to set proper index
     * @param id - cuid of element
     * @param index - index to be set on element
     */
    emitLinkSwitch(id, index) {
        if (is(id))
            this.core.bus.emit(EVENTS.SWITCH, id, index);
    }
    /**
     * Runs task if arguments setup allows for it - auto flag must be set to true
     */
    startTask() {
        this._task.stop();
        if (this.args.autoTimeout) {
            this._task.start();
        }
    }
    setTargetHeight(targetIndex) {
        this._asyncStyles.setStyle('height', this.getElementHeight(this._targets[targetIndex]), this.element);
    }
}
