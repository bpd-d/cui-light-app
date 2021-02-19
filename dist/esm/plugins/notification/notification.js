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
var _utils, _container, _handleId, _cache, _holder, _actionsHelper, _timeout;
import { ElementBuilder } from "../../core/builders/element";
import { replacePrefix } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiActionsHelper } from "../../core/helpers/helpers";
import { CuiClassAction } from "../../core/utils/actions";
import { validateNotificationData } from "./helpers";
import getNotification from "./builder";
const CONTAINER_ID = "notifications-container";
const CONTAINER_CLS = "{prefix}-notification-container";
const NOTIFICATION_CLS = '{prefix}-notification';
const NOTIFICATION_HEADER_CLS = '{prefix}-notification-header';
const NOTIFICATION_TITLE_CLS = '{prefix}-notification-title';
const NOTIFICATION_BODY_CLS = '{prefix}-notification-body';
const NOTIFICATION_FOOTER_CLS = '{prefix}-notification-footer';
const NOTIFICATION_ACTIVE_CLS = '{prefix}-active';
const NOTIFICATION_ICON_CLS = "{prefix}-notification-icon";
const NOTIFICATION_CLOSE_CLS = "{prefix}-notification-close";
const ICON_CLS = "{prefix}-icon";
const NOTIFICATION_ANIMATION_IN = "{prefix}-notification-animation-in";
const NOTIFICATION_ANIMATION_OUT = "{prefix}-notification-animation-out";
const MARGIN_SMALL_VERTICAL = "{prefix}-margin-small-vertical";
export class CuiNotificationPlugin {
    constructor(setup) {
        var _a;
        this.name = 'notification-plugin';
        _utils.set(this, void 0);
        _container.set(this, void 0);
        _handleId.set(this, void 0);
        _cache.set(this, void 0);
        _holder.set(this, void 0);
        _actionsHelper.set(this, void 0);
        _timeout.set(this, void 0);
        this.description = "CuiNotificationPlugin";
        __classPrivateFieldSet(this, _container, null);
        __classPrivateFieldSet(this, _utils, undefined);
        __classPrivateFieldSet(this, _handleId, null);
        __classPrivateFieldSet(this, _cache, {});
        __classPrivateFieldSet(this, _holder, {});
        __classPrivateFieldSet(this, _actionsHelper, undefined);
        __classPrivateFieldSet(this, _timeout, (_a = setup.timeout) !== null && _a !== void 0 ? _a : 5000);
    }
    init(utils) {
        this.createCache(utils.setup.prefix);
        this.getOrCreateContainer(utils, document.body);
        __classPrivateFieldSet(this, _actionsHelper, new CuiActionsHelper(utils.interactions));
        __classPrivateFieldSet(this, _utils, utils);
        __classPrivateFieldSet(this, _handleId, __classPrivateFieldGet(this, _utils).bus.on(EVENTS.NOTIFY, this.onEvent.bind(this), { $cuid: this.name }));
    }
    destroy() {
        if (__classPrivateFieldGet(this, _container))
            __classPrivateFieldGet(this, _container).remove();
        if (__classPrivateFieldGet(this, _handleId) && __classPrivateFieldGet(this, _utils)) {
            __classPrivateFieldGet(this, _utils).bus.detach(EVENTS.NOTIFY, __classPrivateFieldGet(this, _handleId));
        }
    }
    onEvent(data) {
        if (!validateNotificationData(data) || !__classPrivateFieldGet(this, _utils) || !__classPrivateFieldGet(this, _actionsHelper) || !__classPrivateFieldGet(this, _container)) {
            return;
        }
        if (__classPrivateFieldGet(this, _holder)[data.id]) {
            return;
        }
        // Create element
        getNotification(data, __classPrivateFieldGet(this, _utils), __classPrivateFieldGet(this, _cache), () => {
            this.onNotificationClose(data, false, true);
        }).then(notificationEl => {
            if (!notificationEl) {
                return;
            }
            this.addNotificationToTree(notificationEl);
            // Set timeout function
            let timeoutId = null;
            //  If auto option is not specifically set to false
            if (!(data.auto === false)) {
                timeoutId = this.setAutoClose(data);
            }
            // Setup holder
            __classPrivateFieldGet(this, _holder)[data.id] = {
                element: notificationEl,
                timeoutId: timeoutId
            };
            // Call open
            this.act(notificationEl, __classPrivateFieldGet(this, _cache).NOTIFICATION_ANIMATION_IN).then(() => {
                notificationEl.classList.add(__classPrivateFieldGet(this, _cache).NOTIFICATION_ACTIVE_CLS);
            });
        });
    }
    setAutoClose(data) {
        return setTimeout(() => {
            this.onNotificationClose(data, true, false);
        }, __classPrivateFieldGet(this, _timeout));
    }
    addNotificationToTree(notifiactionElement) {
        //@ts-ignore utils is defined
        __classPrivateFieldGet(this, _utils).interactions.mutate(() => {
            // Add to DOM treee
            //@ts-ignore container is defined
            if (__classPrivateFieldGet(this, _container).children.length === 0) {
                //@ts-ignore container is defined
                __classPrivateFieldGet(this, _container).appendChild(notifiactionElement);
            }
            else {
                //@ts-ignore container is defined
                __classPrivateFieldGet(this, _container).insertBefore(notifiactionElement, __classPrivateFieldGet(this, _container).firstChild);
            }
        }, null);
    }
    onNotificationClose(notification, fromTimeout, dissmissed) {
        if (!notification || !__classPrivateFieldGet(this, _actionsHelper) || !__classPrivateFieldGet(this, _utils)) {
            return;
        }
        const holder = __classPrivateFieldGet(this, _holder)[notification.id];
        if (!holder) {
            return;
        }
        if (!fromTimeout) {
            clearTimeout(holder.timeoutId);
        }
        this.act(holder.element, __classPrivateFieldGet(this, _cache).NOTIFICATION_ANIMATION_OUT).then(() => {
            // @ts-ignore utils is defined
            __classPrivateFieldGet(this, _utils).bus.emit(EVENTS.NOTIFIED, null, Object.assign(Object.assign({}, notification), { dissmissed: dissmissed }));
            holder.element.remove();
            delete __classPrivateFieldGet(this, _holder)[notification.id];
        });
    }
    getOrCreateContainer(utils, root) {
        __classPrivateFieldSet(this, _container, document.getElementById(CONTAINER_ID));
        if (!__classPrivateFieldGet(this, _container)) {
            __classPrivateFieldSet(this, _container, new ElementBuilder('div').setClasses(replacePrefix(CONTAINER_CLS, utils.setup.prefix)).build());
            root.appendChild(__classPrivateFieldGet(this, _container));
        }
    }
    createCache(prefix) {
        __classPrivateFieldSet(this, _cache, {
            "NOTIFICATION_CLS": replacePrefix(NOTIFICATION_CLS, prefix),
            "NOTIFICATION_HEADER_CLS": replacePrefix(NOTIFICATION_HEADER_CLS, prefix),
            "NOTIFICATION_TITLE_CLS": replacePrefix(NOTIFICATION_TITLE_CLS, prefix),
            "NOTIFICATION_BODY_CLS": replacePrefix(NOTIFICATION_BODY_CLS, prefix),
            "NOTIFICATION_FOOTER_CLS": replacePrefix(NOTIFICATION_FOOTER_CLS, prefix),
            "NOTIFICATION_ACTIVE_CLS": replacePrefix(NOTIFICATION_ACTIVE_CLS, prefix),
            "NOTIFICATION_ANIMATION_IN": replacePrefix(NOTIFICATION_ANIMATION_IN, prefix),
            "NOTIFICATION_ANIMATION_OUT": replacePrefix(NOTIFICATION_ANIMATION_OUT, prefix),
            "NOTIFICATION_ICON_CLS": replacePrefix(NOTIFICATION_ICON_CLS, prefix),
            "NOTIFICATION_CLOSE_CLS": replacePrefix(NOTIFICATION_CLOSE_CLS, prefix),
            "ICON_CLS": replacePrefix(ICON_CLS, prefix),
            "MARGIN_SMALL_VERTICAL": replacePrefix(MARGIN_SMALL_VERTICAL, prefix),
        });
    }
    act(element, animationClass, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore utils is ignored
            const delay = timeout !== null && timeout !== void 0 ? timeout : __classPrivateFieldGet(this, _utils).setup.animationTime;
            const action = new CuiClassAction(animationClass);
            //@ts-ignore actionsHelper is defined
            return __classPrivateFieldGet(this, _actionsHelper).performAction(element, action, delay !== null && delay !== void 0 ? delay : 0);
        });
    }
}
_utils = new WeakMap(), _container = new WeakMap(), _handleId = new WeakMap(), _cache = new WeakMap(), _holder = new WeakMap(), _actionsHelper = new WeakMap(), _timeout = new WeakMap();
