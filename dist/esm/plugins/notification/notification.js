var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ElementBuilder } from "../../core/builders/element";
import { replacePrefix } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiActionsHelper } from "../../core/helpers/helpers";
import { CuiClassAction } from "../../core/utils/actions";
import { validateNotificationData } from "./helpers";
import getNotification from "./builder";
import { CuiPlugin, getPluginEventExtension } from "../base";
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
export function CuiNotificationPluginFn(setup) {
    const pluginName = 'notification-plugin';
    function createCache(prefix) {
        return {
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
        };
    }
    return new CuiPlugin({
        name: pluginName,
        description: "CuiNotificationPlugin",
        setup: setup,
        callback: (core, setup) => {
            var _a;
            const _cache = createCache(core.setup.prefix);
            const _actionsHelper = new CuiActionsHelper(core.interactions);
            const _timeout = (_a = setup.timeout) !== null && _a !== void 0 ? _a : 5000;
            let _holder = {};
            let _container = null;
            function getOrCreateContainer(core, root) {
                _container = document.getElementById(CONTAINER_ID);
                if (!_container) {
                    _container = new ElementBuilder('div').setClasses(replacePrefix(CONTAINER_CLS, core.setup.prefix)).build();
                    root.appendChild(_container);
                }
            }
            function setAutoClose(data) {
                return setTimeout(() => {
                    onNotificationClose(data, true, false);
                }, _timeout);
            }
            function addNotificationToTree(notifiactionElement) {
                //@ts-ignore utils is defined
                core.interactions.mutate(() => {
                    // Add to DOM treee
                    //@ts-ignore container is defined
                    if (_container.children.length === 0) {
                        //@ts-ignore container is defined
                        _container.appendChild(notifiactionElement);
                    }
                    else {
                        //@ts-ignore container is defined
                        _container.insertBefore(notifiactionElement, _container.firstChild);
                    }
                }, null);
            }
            function onNotificationClose(notification, fromTimeout, dissmissed) {
                if (!notification) {
                    return;
                }
                const holder = _holder[notification.id];
                if (!holder) {
                    return;
                }
                if (!fromTimeout) {
                    clearTimeout(holder.timeoutId);
                }
                act(holder.element, _cache.NOTIFICATION_ANIMATION_OUT).then(() => {
                    // @ts-ignore utils is defined
                    core.bus.emit(EVENTS.NOTIFIED, null, Object.assign(Object.assign({}, notification), { dissmissed: dissmissed }));
                    holder.element.remove();
                    delete _holder[notification.id];
                });
            }
            function act(element, animationClass, timeout) {
                return __awaiter(this, void 0, void 0, function* () {
                    //@ts-ignore utils is ignored
                    const delay = timeout !== null && timeout !== void 0 ? timeout : core.setup.animationTime;
                    const action = new CuiClassAction(animationClass);
                    //@ts-ignore actionsHelper is defined
                    return _actionsHelper.performAction(element, action, delay !== null && delay !== void 0 ? delay : 0);
                });
            }
            function onEvent(data) {
                if (!validateNotificationData(data) || !_container) {
                    return;
                }
                if (_holder[data.id]) {
                    return;
                }
                // Create element
                getNotification(data, core, _cache, () => {
                    onNotificationClose(data, false, true);
                }).then(notificationEl => {
                    if (!notificationEl) {
                        return;
                    }
                    addNotificationToTree(notificationEl);
                    // Set timeout function
                    let timeoutId = null;
                    //  If auto option is not specifically set to false
                    if (!(data.auto === false)) {
                        timeoutId = setAutoClose(data);
                    }
                    // Setup holder
                    _holder[data.id] = {
                        element: notificationEl,
                        timeoutId: timeoutId
                    };
                    // Call open
                    act(notificationEl, _cache.NOTIFICATION_ANIMATION_IN).then(() => {
                        notificationEl.classList.add(_cache.NOTIFICATION_ACTIVE_CLS);
                    });
                });
            }
            getOrCreateContainer(core, document.body);
            return [
                [getPluginEventExtension({
                        name: EVENTS.NOTIFY,
                        id: pluginName,
                        callback: onEvent
                    })],
                () => {
                    if (_container)
                        _container.remove();
                }
            ];
        }
    });
}
// export class CuiNotificationPlugin implements ICuiPlugin {
//     description: string;
//     name: string = 'notification-plugin';
//     setup: any;
//     private _utils: CuiUtils | undefined;
//     private _container: HTMLElement | null;
//     private _handleId: string | null;
//     private _cache: any;
//     private _holder: ElementsHolder;
//     private _actionsHelper: CuiActionsHelper | undefined;
//     private _timeout: number;
//     constructor(setup: ICuiNotificationPluginSetup) {
//         this.description = "CuiNotificationPlugin";
//         this._container = null;
//         this._utils = undefined;
//         this._handleId = null;
//         this._cache = {};
//         this._holder = {};
//         this._actionsHelper = undefined;
//         this._timeout = setup.timeout ?? 5000;
//     }
//     init(utils: CuiUtils): void {
//         this.createCache(utils.setup.prefix);
//         this.getOrCreateContainer(utils, document.body);
//         this._actionsHelper = new CuiActionsHelper(utils.interactions);
//         this._utils = utils
//         this._handleId = this._utils.bus.on(EVENTS.NOTIFY, this.onEvent.bind(this), { $cuid: this.name });
//     }
//     destroy(): void {
//         if (this._container)
//             this._container.remove();
//         if (this._handleId && this._utils) {
//             this._utils.bus.detach(EVENTS.NOTIFY, this._handleId);
//         }
//     }
//     private onEvent(data: ICuiNotification) {
//         if (!validateNotificationData(data) || !this._utils || !this._actionsHelper || !this._container) {
//             return;
//         }
//         if (this._holder[data.id]) {
//             return;
//         }
//         // Create element
//         getNotification(data, this._utils, this._cache, () => {
//             this.onNotificationClose(data, false, true);
//         }).then(notificationEl => {
//             if (!notificationEl) {
//                 return;
//             }
//             this.addNotificationToTree(notificationEl)
//             // Set timeout function
//             let timeoutId = null;
//             //  If auto option is not specifically set to false
//             if (!(data.auto === false)) {
//                 timeoutId = this.setAutoClose(data);
//             }
//             // Setup holder
//             this._holder[data.id] = {
//                 element: notificationEl,
//                 timeoutId: timeoutId
//             }
//             // Call open
//             this.act(notificationEl, this._cache.NOTIFICATION_ANIMATION_IN).then(() => {
//                 notificationEl.classList.add(this._cache.NOTIFICATION_ACTIVE_CLS);
//             });
//         });
//     }
//     private setAutoClose(data: ICuiNotification): any {
//         return setTimeout(() => {
//             this.onNotificationClose(data, true, false);
//         }, this._timeout);
//     }
//     private addNotificationToTree(notifiactionElement: HTMLElement) {
//         //@ts-ignore utils is defined
//         this._utils.interactions.mutate(() => {
//             // Add to DOM treee
//             //@ts-ignore container is defined
//             if (this._container.children.length === 0) {
//                 //@ts-ignore container is defined
//                 this._container.appendChild(notifiactionElement)
//             } else {
//                 //@ts-ignore container is defined
//                 this._container.insertBefore(notifiactionElement, this._container.firstChild);
//             }
//         }, null)
//     }
//     private onNotificationClose(notification: ICuiNotification, fromTimeout: boolean, dissmissed: boolean) {
//         if (!notification || !this._actionsHelper || !this._utils) {
//             return;
//         }
//         const holder = this._holder[notification.id];
//         if (!holder) {
//             return;
//         }
//         if (!fromTimeout) {
//             clearTimeout(holder.timeoutId);
//         }
//         this.act(holder.element, this._cache.NOTIFICATION_ANIMATION_OUT).then(() => {
//             // @ts-ignore utils is defined
//             this._utils.bus.emit(EVENTS.NOTIFIED, null, { ...notification, dissmissed: dissmissed })
//             holder.element.remove();
//             delete this._holder[notification.id];
//         })
//     }
//     private getOrCreateContainer(utils: CuiUtils, root: HTMLElement) {
//         this._container = document.getElementById(CONTAINER_ID);
//         if (!this._container) {
//             this._container = new ElementBuilder('div').setClasses(replacePrefix(CONTAINER_CLS, utils.setup.prefix)).build();
//             root.appendChild(this._container);
//         }
//     }
//     private createCache(prefix: string) {
//         this._cache = {
//             "NOTIFICATION_CLS": replacePrefix(NOTIFICATION_CLS, prefix),
//             "NOTIFICATION_HEADER_CLS": replacePrefix(NOTIFICATION_HEADER_CLS, prefix),
//             "NOTIFICATION_TITLE_CLS": replacePrefix(NOTIFICATION_TITLE_CLS, prefix),
//             "NOTIFICATION_BODY_CLS": replacePrefix(NOTIFICATION_BODY_CLS, prefix),
//             "NOTIFICATION_FOOTER_CLS": replacePrefix(NOTIFICATION_FOOTER_CLS, prefix),
//             "NOTIFICATION_ACTIVE_CLS": replacePrefix(NOTIFICATION_ACTIVE_CLS, prefix),
//             "NOTIFICATION_ANIMATION_IN": replacePrefix(NOTIFICATION_ANIMATION_IN, prefix),
//             "NOTIFICATION_ANIMATION_OUT": replacePrefix(NOTIFICATION_ANIMATION_OUT, prefix),
//             "NOTIFICATION_ICON_CLS": replacePrefix(NOTIFICATION_ICON_CLS, prefix),
//             "NOTIFICATION_CLOSE_CLS": replacePrefix(NOTIFICATION_CLOSE_CLS, prefix),
//             "ICON_CLS": replacePrefix(ICON_CLS, prefix),
//             "MARGIN_SMALL_VERTICAL": replacePrefix(MARGIN_SMALL_VERTICAL, prefix),
//         }
//     }
//     async act(element: HTMLElement, animationClass: string, timeout?: number): Promise<boolean> {
//         //@ts-ignore utils is ignored
//         const delay = timeout ?? this._utils.setup.animationTime;
//         const action = new CuiClassAction(animationClass);
//         //@ts-ignore actionsHelper is defined
//         return this._actionsHelper.performAction(element, action, delay ?? 0);
//     }
// }
