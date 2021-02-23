var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { IconBuilder } from "../../core/builders/icon";
import { ElementBuilder } from "../../core/builders/element";
import { are, is } from "../../core/utils/functions";
import { CuiDevtoolFactory } from "../../core/development/factory";
const closeIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 3,3 17,17\"></path><path d=\"M 17,3 3,17\"></path></svg>";
export default function getNotification(data, utils, cache, onClose) {
    return __awaiter(this, void 0, void 0, function* () {
        let prefix = utils.setup.prefix;
        if (!are(data.title, data.id)) {
            return undefined;
        }
        const parts = [getHeader(data.title, cache, onClose)];
        if (is(data.message)) {
            //@ts-ignore message is defined
            parts.push(getBody(data.message, cache));
        }
        if (is(data.actions)) {
            //@ts-ignore actions is defined
            parts.push(getFooter(data.actions, cache, onClose));
        }
        return new ElementBuilder('div').setClasses(cache.NOTIFICATION_CLS, cache.MARGIN_SMALL_VERTICAL, getClassByType(prefix, data.type)).setId(data.id).setRawChildren(...parts).build();
    });
}
function getHeader(title, cache, onClose) {
    const titleElement = new ElementBuilder('span').setClasses(cache.NOTIFICATION_TITLE_CLS).setTextContent(title);
    const iconCloseElement = new IconBuilder(closeIcon).build();
    const closeElement = new ElementBuilder('a').setClasses(cache.ICON_CLS, cache.NOTIFICATION_CLOSE_CLS).onEvent('click', onClose);
    if (iconCloseElement) {
        closeElement.setChildren(iconCloseElement);
    }
    const header = new ElementBuilder('div').setClasses(cache.NOTIFICATION_HEADER_CLS).setRawChildren(titleElement, closeElement);
    return header;
}
function getBody(message, cache) {
    return new ElementBuilder('div').setClasses(cache.NOTIFICATION_BODY_CLS).setRawChildren(new ElementBuilder('div').setTextContent(message));
}
function getFooter(actions, cache, onClose) {
    return new ElementBuilder('div').setClasses(cache.NOTIFICATION_FOOTER_CLS).setRawChildren(getActionsList(actions, onClose));
}
function getActionsList(actions, onClose) {
    return new ElementBuilder('ul').setRawChildren(...actions.map(action => {
        return new ElementBuilder('li').setRawChildren(new ElementBuilder('a').onEvent('click', () => {
            try {
                action.callback();
            }
            catch (e) {
                const log = CuiDevtoolFactory.get("Notifications");
                log.exception(e, "OnActionClick");
            }
            finally {
                onClose();
            }
        }).setTextContent(action.name));
    }));
}
function getClassByType(prefix, type) {
    return `${prefix}-${type !== null && type !== void 0 ? type : 'default'}`;
}
