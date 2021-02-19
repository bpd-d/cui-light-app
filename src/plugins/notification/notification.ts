import { ElementBuilder } from "../../core/builders/element";
import { are, replacePrefix } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiActionsHelper } from "../../core/helpers/helpers";
import { CuiClassAction } from "../../core/utils/actions";
import { ElementsHolder, ICuiNotification, ICuiNotificationPluginSetup } from "./interfaces";
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





export class CuiNotificationPlugin implements ICuiPlugin {
    description: string;
    name: string = 'notification-plugin';
    setup: any;
    #utils: CuiUtils | undefined;
    #container: HTMLElement | null;
    #handleId: string | null;
    #cache: any;
    #holder: ElementsHolder;
    #actionsHelper: CuiActionsHelper | undefined;
    #timeout: number;

    constructor(setup: ICuiNotificationPluginSetup) {
        this.description = "CuiNotificationPlugin";
        this.#container = null;
        this.#utils = undefined;
        this.#handleId = null;
        this.#cache = {};
        this.#holder = {};
        this.#actionsHelper = undefined;
        this.#timeout = setup.timeout ?? 5000;
    }

    init(utils: CuiUtils): void {
        this.createCache(utils.setup.prefix);
        this.getOrCreateContainer(utils, document.body);
        this.#actionsHelper = new CuiActionsHelper(utils.interactions);
        this.#utils = utils
        this.#handleId = this.#utils.bus.on(EVENTS.NOTIFY, this.onEvent.bind(this), { $cuid: this.name });
    }

    destroy(): void {
        if (this.#container)
            this.#container.remove();
        if (this.#handleId && this.#utils) {
            this.#utils.bus.detach(EVENTS.NOTIFY, this.#handleId);
        }
    }

    private onEvent(data: ICuiNotification) {
        if (!validateNotificationData(data) || !this.#utils || !this.#actionsHelper || !this.#container) {
            return;
        }

        if (this.#holder[data.id]) {
            return;
        }
        // Create element
        getNotification(data, this.#utils, this.#cache, () => {
            this.onNotificationClose(data, false, true);
        }).then(notificationEl => {
            if (!notificationEl) {
                return;
            }
            this.addNotificationToTree(notificationEl)
            // Set timeout function
            let timeoutId = null;
            //  If auto option is not specifically set to false
            if (!(data.auto === false)) {
                timeoutId = this.setAutoClose(data);
            }
            // Setup holder
            this.#holder[data.id] = {
                element: notificationEl,
                timeoutId: timeoutId
            }
            // Call open
            this.act(notificationEl, this.#cache.NOTIFICATION_ANIMATION_IN).then(() => {
                notificationEl.classList.add(this.#cache.NOTIFICATION_ACTIVE_CLS);
            });
        });
    }

    private setAutoClose(data: ICuiNotification): any {
        return setTimeout(() => {
            this.onNotificationClose(data, true, false);
        }, this.#timeout);
    }

    private addNotificationToTree(notifiactionElement: HTMLElement) {
        //@ts-ignore utils is defined
        this.#utils.interactions.mutate(() => {
            // Add to DOM treee
            //@ts-ignore container is defined
            if (this.#container.children.length === 0) {
                //@ts-ignore container is defined
                this.#container.appendChild(notifiactionElement)
            } else {
                //@ts-ignore container is defined
                this.#container.insertBefore(notifiactionElement, this.#container.firstChild);
            }
        }, null)
    }

    private onNotificationClose(notification: ICuiNotification, fromTimeout: boolean, dissmissed: boolean) {
        if (!notification || !this.#actionsHelper || !this.#utils) {
            return;
        }
        const holder = this.#holder[notification.id];
        if (!holder) {
            return;
        }

        if (!fromTimeout) {
            clearTimeout(holder.timeoutId);
        }

        this.act(holder.element, this.#cache.NOTIFICATION_ANIMATION_OUT).then(() => {
            // @ts-ignore utils is defined
            this.#utils.bus.emit(EVENTS.NOTIFIED, null, { ...notification, dissmissed: dissmissed })
            holder.element.remove();
            delete this.#holder[notification.id];
        })
    }

    private getOrCreateContainer(utils: CuiUtils, root: HTMLElement) {
        this.#container = document.getElementById(CONTAINER_ID);
        if (!this.#container) {
            this.#container = new ElementBuilder('div').setClasses(replacePrefix(CONTAINER_CLS, utils.setup.prefix)).build();
            root.appendChild(this.#container);
        }
    }

    private createCache(prefix: string) {
        this.#cache = {
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
        }
    }

    async act(element: HTMLElement, animationClass: string, timeout?: number): Promise<boolean> {
        //@ts-ignore utils is ignored
        const delay = timeout ?? this.#utils.setup.animationTime;
        const action = new CuiClassAction(animationClass);
        //@ts-ignore actionsHelper is defined
        return this.#actionsHelper.performAction(element, action, delay ?? 0);
    }

}