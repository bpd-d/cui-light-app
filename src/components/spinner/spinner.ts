import { ICuiComponent, ICuiParsable } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { EVENTS, ICONS } from "../../core/utils/statics";
import { is, replacePrefix } from "../../core/utils/functions";
import { IconBuilder } from "../../core/builders/icon";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiSpinnerEvent } from "../../core/models/events";
import { getEventBusFacade, getCuiHandlerInteractions, ICuiEventBusFacade, ICuiInteractionsFacade } from "../../core/handlers/extensions/facades";
import { eventExtension } from "../extensions/event/event";
import { callbackPerformer } from "../extensions/performers";
import { CuiComponentBaseHook } from "../base";

export class CuiSpinnerArgs extends CuiAutoParseArgs implements ICuiParsable {
    spinner: string;
    scale: number;
    constructor() {
        super({
            main: "spinner"
        });
        this.spinner = "circle";
        this.scale = 1;
    }
}


export function CuiSpinnerComponent(prefix?: string): ICuiComponent {
    ICONS['spinner_circle'] = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 7.800378,1.7908996 A 8.4986862,8.4986862 0 0 1 18.2091,7.8003784 8.4986862,8.4986862 0 0 1 12.199621,18.209101 8.4986862,8.4986862 0 0 1 1.7908995,12.199622 8.4986862,8.4986862 0 0 1 7.800378,1.7908996 Z\"></path></svg>";
    ICONS['spinner_circle_double'] = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 10,1.5000006 A 8.4999997,8.4999997 0 0 1 18.5,10 8.4999997,8.4999997 0 0 1 10,18.499999 8.4999997,8.4999997 0 0 1 1.5000005,10 8.4999997,8.4999997 0 0 1 10,1.5000006 Z\"></path><path d=\"M 10,3.4999997 A 6.5000002,6.5000002 0 0 1 16.5,10 6.5000002,6.5000002 0 0 1 10,16.5 6.5000002,6.5000002 0 0 1 3.5,9.9999993 6.5000002,6.5000002 0 0 1 10,3.4999997 Z\"></path></svg>";
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "spinner",
        create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => {
            return new CuiSpinnerHandler(element, utils, attribute, prefix);
        }
    })
}

export class CuiSpinnerHandler extends CuiHandlerBase<CuiSpinnerArgs> {
    private _animationPauseClass: string;
    private _busFacade: ICuiEventBusFacade;
    private _interactionFacade: ICuiInteractionsFacade;
    constructor(element: HTMLElement, utils: CuiCore, attribute: string, prefix: string) {
        super("CuiSpinnerHandler", element, attribute, new CuiSpinnerArgs(), utils);
        this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
        this._animationPauseClass = replacePrefix("{prefix}-animation-pause", prefix);
        this._interactionFacade = getCuiHandlerInteractions(utils.interactions, this);

        this.extend(eventExtension<boolean>(this._busFacade, {
            eventName: EVENTS.PAUSE,
            type: "pause",
            performer: callbackPerformer(this.onPause.bind(this))
        }))
    }

    async onHandle(): Promise<boolean> {
        this.add()
        return true;
    }
    async onRefresh(): Promise<boolean> {
        if (this.prevArgs && this.args.spinner !== this.prevArgs.spinner) {
            this.add();
        }
        return true;
    }
    async onRemove(): Promise<boolean> {
        this.removeIfAnyExisists();
        return true;
    }

    private addSpinner(iconElement: Element, name: string) {
        this.element.appendChild(iconElement);
        this.element.classList.add(`animation-spinner-${name}`);
    }

    private add() {
        const svgIcon = is(this.args.spinner) ? ICONS[`spinner_${this.args.spinner}`] : null;
        if (!is(svgIcon)) {
            this.log.warning("Incorrect spinner name: " + this.args.spinner);
            return;
        }
        this.removeIfAnyExisists();
        const iconElement = new IconBuilder(svgIcon).setScale(this.args.scale).build();
        this._interactionFacade.mutate(this.addSpinner, iconElement, this.args.spinner);
    }

    private removeIfAnyExisists() {
        let existing = this.element.querySelector("svg");
        if (existing) {
            existing.remove();
        }
    }

    private onPause(flag: boolean) {
        this._interactionFacade.fetch(() => {
            if (flag && !this.classes.hasClass(this._animationPauseClass, this.element)) {
                this.asyncClasses.setClasses(this.element, this._animationPauseClass);
            } else {
                this.asyncClasses.removeClasses(this.element, this._animationPauseClass);
            }
        })
        this._busFacade.emit<CuiSpinnerEvent>(EVENTS.PAUSED, {
            paused: flag
        });
    }


}