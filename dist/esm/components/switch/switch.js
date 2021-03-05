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
var _targets, _currentIdx, _links, _switches, _task, _switchEventId, _actionsIn, _actionsOut;
import { CuiMutableHandler } from "../../core/handlers/base";
import { CuiTaskRunner } from "../../core/utils/task";
import { CuiActionsListFactory } from "../../core/utils/actions";
import { is, replacePrefix, calculateNextIndex, getChildrenHeight, isInRange, joinWithScopeSelector } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
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
    }
}
export class CuiSwitchComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : 'cui'}-switch`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new CuiSwitchHandler(element, utils, this.attribute);
    }
}
export class CuiSwitchHandler extends CuiMutableHandler {
    constructor(element, utils, attribute) {
        super("CuiSwitchHandler", element, attribute, new CuiSwitchArgs(utils.setup.prefix, utils.setup.animationTime), utils);
        _targets.set(this, void 0);
        _currentIdx.set(this, void 0);
        _links.set(this, void 0);
        _switches.set(this, void 0);
        _task.set(this, void 0);
        _switchEventId.set(this, void 0);
        _actionsIn.set(this, void 0);
        _actionsOut.set(this, void 0);
        __classPrivateFieldSet(this, _targets, []);
        __classPrivateFieldSet(this, _currentIdx, -1);
        __classPrivateFieldSet(this, _links, []);
        __classPrivateFieldSet(this, _switches, []);
        __classPrivateFieldSet(this, _switchEventId, null);
        __classPrivateFieldSet(this, _actionsIn, __classPrivateFieldSet(this, _actionsOut, []));
        __classPrivateFieldSet(this, _task, new CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next')));
    }
    onInit() {
        __classPrivateFieldSet(this, _switchEventId, this.onEvent(EVENTS.SWITCH, this.onPushSwitch.bind(this)));
        this.parseArguments();
        this.getTargets();
        this.getActiveIndex();
        this.getSwitches();
        this.setSwitchesActive(__classPrivateFieldGet(this, _currentIdx));
        this.setLinkActive(-1, __classPrivateFieldGet(this, _currentIdx));
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(__classPrivateFieldGet(this, _targets)[__classPrivateFieldGet(this, _currentIdx)]));
        });
        __classPrivateFieldSet(this, _task, new CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next')));
        this.startTask();
    }
    onUpdate() {
        this.parseArguments();
        this.getTargets();
        this.getSwitches();
        this.setSwitchesActive(__classPrivateFieldGet(this, _currentIdx));
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(__classPrivateFieldGet(this, _targets)[__classPrivateFieldGet(this, _currentIdx)]));
        });
        this.startTask();
    }
    onDestroy() {
        __classPrivateFieldGet(this, _task).stop();
        this.detachEvent(EVENTS.SWITCH, __classPrivateFieldGet(this, _switchEventId));
    }
    onMutation(record) {
        this.getTargets();
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(__classPrivateFieldGet(this, _targets)[__classPrivateFieldGet(this, _currentIdx)]));
        });
    }
    switch(index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isLocked) {
                return false;
            }
            this.getSwitches();
            this.getActiveIndex();
            let nextIdx = calculateNextIndex(index, __classPrivateFieldGet(this, _currentIdx), __classPrivateFieldGet(this, _targets).length);
            if (!this.args.loop && ((index === "next" && nextIdx === 0) || (index === 'prev' && __classPrivateFieldGet(this, _currentIdx) === 0))) {
                this.logInfo("Switch blocked by loop settings", "switch");
                return false;
            }
            if (nextIdx == __classPrivateFieldGet(this, _currentIdx) || nextIdx < 0 || nextIdx >= __classPrivateFieldGet(this, _targets).length) {
                this.logWarning(`Index ${index} is not within the suitable range`, "switch");
                return false;
            }
            this.isLocked = true;
            this.setSwitchesActive(nextIdx);
            let nextItem = __classPrivateFieldGet(this, _targets)[nextIdx];
            yield this.actionsHelper.performSwitchAction(nextItem, __classPrivateFieldGet(this, _currentIdx) > -1 ? __classPrivateFieldGet(this, _targets)[__classPrivateFieldGet(this, _currentIdx)] : null, __classPrivateFieldGet(this, _actionsIn), __classPrivateFieldGet(this, _actionsOut), () => {
                // Set next element active
                nextItem.classList.add(this.activeClassName);
                // Remove active from current element (if current exists)
                if (__classPrivateFieldGet(this, _currentIdx) > -1)
                    __classPrivateFieldGet(this, _targets)[__classPrivateFieldGet(this, _currentIdx)].classList.remove(this.activeClassName);
                // Update linked items
                this.setLinkActive(__classPrivateFieldGet(this, _currentIdx), nextIdx);
                // Update element height - it must be done a parent get height based on current child
                this.helper.setStyle(this.element, 'height', this.getElementHeight(nextItem));
                this.startTask();
                this.isLocked = false;
            }, this.args.timeout);
            this.emitEvent(EVENTS.SWITCHED, {
                timestamp: Date.now(),
                index: nextIdx
            });
            return true;
        });
    }
    onPushSwitch(index) {
        this.switch(index);
    }
    getActiveIndex() {
        __classPrivateFieldSet(this, _currentIdx, is(__classPrivateFieldGet(this, _targets)) ? __classPrivateFieldGet(this, _targets).findIndex(target => this.helper.hasClass(this.activeClassName, target)) : -1);
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
        __classPrivateFieldSet(this, _actionsIn, CuiActionsListFactory.get(this.args.in));
        __classPrivateFieldSet(this, _actionsOut, CuiActionsListFactory.get(this.args.out));
        __classPrivateFieldSet(this, _links, is(this.args.links) ? [...document.querySelectorAll(this.args.links)] : []);
    }
    /**
     * Query target elements
     */
    getTargets() {
        let t = this.element.querySelectorAll(this.args.targets);
        __classPrivateFieldSet(this, _targets, t.length > 0 ? [...t] : []);
    }
    getSwitches() {
        let switches = is(this.args.switch) ? document.querySelectorAll(this.args.switch) : null;
        __classPrivateFieldSet(this, _switches, []);
        if (switches) {
            switches.forEach(sw => {
                __classPrivateFieldGet(this, _switches).push(sw);
            });
        }
    }
    setLinkActive(current, next) {
        if (!is(__classPrivateFieldGet(this, _links))) {
            return;
        }
        if (isInRange(current, 0, __classPrivateFieldGet(this, _links).length - 1)) {
            this.helper.removeClass(this.activeClassName, __classPrivateFieldGet(this, _links)[current]);
        }
        if (isInRange(next, 0, __classPrivateFieldGet(this, _links).length - 1)) {
            this.helper.setClass(this.activeClassName, __classPrivateFieldGet(this, _links)[next]);
        }
    }
    /**
     * Sets propers active state on attached switches
     * @param index
     */
    setSwitchesActive(index) {
        __classPrivateFieldGet(this, _switches).forEach(sw => {
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
            this.utils.bus.emit(EVENTS.SWITCH, id, index);
    }
    /**
     * Runs task if arguments setup allows for it - auto flag must be set to true
     */
    startTask() {
        __classPrivateFieldGet(this, _task).stop();
        if (this.args.autoTimeout) {
            __classPrivateFieldGet(this, _task).start();
        }
    }
}
_targets = new WeakMap(), _currentIdx = new WeakMap(), _links = new WeakMap(), _switches = new WeakMap(), _task = new WeakMap(), _switchEventId = new WeakMap(), _actionsIn = new WeakMap(), _actionsOut = new WeakMap();
