import { IconBuilder } from "../../core/builders/icon";
import { ElementBuilder } from "../../core/builders/element";
import { CuiUtils } from "../../core/models/utils";
import { are, is } from "../../core/utils/functions";
import { CuiNotificationType, ICuiNotification, ICuiNotificationAction } from "./interfaces";
import { CuiDevtoolFactory } from "../../core/development/factory";



const closeIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 3,3 17,17\"></path><path d=\"M 17,3 3,17\"></path></svg>";


export default async function getNotification(data: ICuiNotification, utils: CuiUtils, cache: any, onClose: () => void): Promise<HTMLElement | undefined> {
    let prefix = utils.setup.prefix;

    if (!are(data.title, data.id)) {
        return undefined;
    }
    const parts: ElementBuilder[] = [getHeader(data.title, cache, onClose)];
    if (is(data.message)) {
        //@ts-ignore message is defined
        parts.push(getBody(data.message, cache))
    }
    if (is(data.actions)) {
        //@ts-ignore actions is defined
        parts.push(getFooter(data.actions, cache, onClose));
    }

    return new ElementBuilder('div').setClasses(cache.NOTIFICATION_CLS, cache.MARGIN_SMALL_VERTICAL, getClassByType(prefix, data.type)).setId(data.id).setRawChildren(...parts).build();

}

function getHeader(title: string, cache: any, onClose: () => void): ElementBuilder {
    const titleElement = new ElementBuilder('span').setClasses(cache.NOTIFICATION_TITLE_CLS).setTextContent(title);
    const iconCloseElement = new IconBuilder(closeIcon).build();
    const closeElement = new ElementBuilder('a').setClasses(cache.ICON_CLS, cache.NOTIFICATION_CLOSE_CLS).onEvent('click', onClose);
    if (iconCloseElement) {
        closeElement.setChildren(iconCloseElement)
    }
    const header = new ElementBuilder('div').setClasses(cache.NOTIFICATION_HEADER_CLS).setRawChildren(titleElement, closeElement);
    return header;
}

function getBody(message: string, cache: any): ElementBuilder {
    return new ElementBuilder('div').setClasses(cache.NOTIFICATION_BODY_CLS).setRawChildren(new ElementBuilder('div').setTextContent(message));
}

function getFooter(actions: ICuiNotificationAction[], cache: any, onClose: () => void): ElementBuilder {
    return new ElementBuilder('div').setClasses(cache.NOTIFICATION_FOOTER_CLS).setRawChildren(getActionsList(actions, onClose));
}

function getActionsList(actions: ICuiNotificationAction[], onClose: () => void): ElementBuilder {
    return new ElementBuilder('ul').setRawChildren(...actions.map(action => {
        return new ElementBuilder('li').setRawChildren(new ElementBuilder('a').onEvent('click', () => {
            try {
                action.callback();
            } catch (e) {
                const log = CuiDevtoolFactory.get("Notifications");
                log.exception(e, "OnActionClick");
            } finally {
                onClose();
            }
        }).setTextContent(action.name))
    }));
}

function getClassByType(prefix: string, type?: CuiNotificationType) {
    return `${prefix}-${type ?? 'default'}`;
}