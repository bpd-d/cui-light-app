import { EVENTS } from "../../core/utils/statics";
import { CuiHandlerBase } from "../../core/handlers/base";
import { getEventBusFacade, ICuiEventBusFacade } from "../../core/handlers/extensions/facades";
import { CuiCore } from "../../core/models/core";
import { CuiElementBoxFactory, ICuiElementBox } from "../../core/models/elements";
import { ICuiComponent } from "../../core/models/interfaces";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiComponentBaseHook } from "../base";
import { CuiSwitchExtension } from "../extensions/switch/switch";
import { getScrollHelper } from "./helper";
import { ScrollDirection, ICuiScrollSwitchPerformer, ScrollPerformerHelper } from "./interfaces";
import { ScrollSwitchPerformers } from "./perform";
import { getCuiElementsBySelector, is } from "../../core/utils/functions";

export class CuiScrollSwitchArgs extends CuiAutoParseArgs {
    mode: ScrollBehavior;
    direction: ScrollDirection;
    loop: boolean;
    switch: string;
    constructor() {
        super();
        this.mode = 'auto';
        this.direction = "y";
        this.loop = false;
        this.switch = "";
    }
}

export function CuiScrollSwitchComponent(prefix?: string): ICuiComponent {
    return CuiComponentBaseHook({
        prefix: prefix,
        name: "scroll-switch",
        create: (element: HTMLElement, core: CuiCore, prefix: string, attribute: string) => {
            return new CuiScrollSwitchHandler(element, attribute, core);
        }
    })
}

export class CuiScrollSwitchHandler extends CuiHandlerBase<CuiScrollSwitchArgs> {
    private _busFacade: ICuiEventBusFacade;
    private _root: ICuiElementBox;
    private _scrollPerformers: ICuiScrollSwitchPerformer[];
    // @ts-ignore helper is assigned be setArgs in the construcor
    private _helper: ScrollPerformerHelper;

    constructor(element: HTMLElement, attribute: string, core: CuiCore) {
        super("CuiScrollSwitchHandler", element, attribute, new CuiScrollSwitchArgs(), core);

        this._busFacade = getEventBusFacade(this.cuid, core.bus, element);
        this._root = CuiElementBoxFactory.get(element);
        this._scrollPerformers = ScrollSwitchPerformers;
        this.setArgs();
        this.extend(new CuiSwitchExtension(this._busFacade, this.switch.bind(this)))
    }

    async onHandle(): Promise<boolean> {
        this.setArgs();
        return true;
    }

    async onRefresh(): Promise<boolean> {
        this.setArgs();
        return true;
    }

    async onRemove(): Promise<boolean> {
        this._busFacade.detachEmittedEvents();
        return true;
    }

    private switch(arg: any) {
        if (!arg) {
            return;
        }

        const performer = this._scrollPerformers.find(p => p.check(arg));
        if (!performer) {
            this.logWarning("Cannot find matching performer", 'switch');
            return;
        }

        const result = performer.perform(arg, this._helper, {
            behavior: this.args.mode,
            loop: this.args.loop
        })

        if (!result) {
            this.logWarning("Switch " + performer.name + " was not performed", 'switch');
            return;
        }

        this.emitSwitch(arg);

        this._busFacade.emit(EVENTS.SWITCHED, {
            timestamp: Date.now(),
            index: arg
        })

    }

    private setArgs() {
        this._helper = getScrollHelper(this.args.direction, this._root, this.args.mode)
    }

    private async emitSwitch(arg: any): Promise<boolean> {
        if (!is(this.args.switch)) {
            return false;
        }

        const elements = getCuiElementsBySelector(this.args.switch);
        const promises: Promise<boolean>[] = [];
        elements.forEach(element => {
            promises.push(this.core.bus.emit(EVENTS.SWITCH, element.$cuid, arg));
        })
        await Promise.all(promises);
        return true;

    }

}