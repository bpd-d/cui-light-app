import { ICuiComponent } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import { EVENTS } from "../../core/utils/statics";
import { calcWindowSize, is, isInViewport } from "../../core/utils/functions";
import { CuiIntersectionObserver } from "../../core/observers/intersection";
import { CuiWindowSize } from "../../core/utils/types";
import {
	CuiActionsFactory,
	ICuiComponentAction,
} from "../../core/utils/actions";
import { CuiResizeData } from "../../core/models/events";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiTaskRunner, ICuiTask } from "../../core/utils/task";
import { cuiObserverExtension } from "../extensions/observer/observer";
import { eventExtension } from "../extensions/event/event";
import {
	getEventBusFacade,
	getCuiHandlerInteractions,
	ICuiEventBusFacade,
	ICuiInteractionsFacade,
} from "../../core/handlers/extensions/facades";
import { getResizeCalculator, ICuiResizeCalculator } from "./calculator";
import { callbackPerformer } from "../extensions/performers";
import { CuiComponentBaseHook } from "../base";

type CuiResizeComponentMode = "smart" | "simple";

export interface CuiSizeArgs {
	small?: string;
	medium?: string;
	large?: string;
	xlarge?: string;
	default: string;
}

export class CuiResizeArgs extends CuiAutoParseArgs implements CuiSizeArgs {
	mode: CuiResizeComponentMode;
	default: string;
	small?: string;
	medium?: string;
	large?: string;
	xlarge?: string;
	delay: number;
	constructor() {
		super();
		this.mode = "simple";
		this.default = "";
		this.small = this.medium = this.large = this.xlarge = "";
		this.delay = 1;
	}
}

export function CuiResizeComponent(prefix?: string): ICuiComponent {
	return CuiComponentBaseHook({
		prefix: prefix,
		name: "resize",
		create: (
			element: HTMLElement,
			utils: CuiCore,
			prefix: string,
			attribute: string
		) => {
			return new CuiResizeHandler(element, utils, attribute);
		},
	});
}

export class CuiResizeHandler extends CuiHandlerBase<CuiResizeArgs> {
	private _currentValue: string | undefined;
	private _lastValue: string;
	private _currentAction: ICuiComponentAction | undefined;
	private _isIntersecting: boolean;
	private _task: ICuiTask;
	private _busFacade: ICuiEventBusFacade;
	private _resizeValueCalculator: ICuiResizeCalculator<CuiResizeArgs>;
	private _interactions: ICuiInteractionsFacade;

	constructor(element: HTMLElement, utils: CuiCore, attribute: string) {
		super(
			"CuiResizeHandler",
			element,
			attribute,
			new CuiResizeArgs(),
			utils
		);
		this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
		this._lastValue = "";
		this._currentValue = "";
		this._isIntersecting = false;
		this._currentAction = undefined;
		this._interactions = getCuiHandlerInteractions(utils.interactions);
		this._resizeValueCalculator = getResizeCalculator(this.args.mode);
		this._task = new CuiTaskRunner(
			this.args.delay,
			false,
			this.updateAction.bind(this)
		);
		const intersectionObserver = new CuiIntersectionObserver(
			document.documentElement,
			[0, 0.1]
		);
		intersectionObserver.setCallback(this.onIntersection.bind(this));
		this.extend(
			cuiObserverExtension({
				type: "intersection",
				element: element,
				observer: intersectionObserver,
			})
		);
		this.extend(
			eventExtension(this._busFacade, {
				eventName: EVENTS.RESIZE,
				performer: callbackPerformer(this.resize.bind(this)),
			})
		);
	}

	async onHandle(): Promise<boolean> {
		this.handleUpdate();
		return true;
	}

	async onRefresh(): Promise<boolean> {
		this.handleUpdate();
		return true;
	}

	async onRemove(): Promise<boolean> {
		this._busFacade.detachEmittedEvents();
		return true;
	}

	handleUpdate() {
		this._resizeValueCalculator = getResizeCalculator(this.args.mode);
		this._isIntersecting = isInViewport(this.element);
		this._task.setTimeout(this.args.delay);
		this.setNewValue(calcWindowSize(window.innerWidth));
		this.updateElement();
	}

	private resize(data: CuiResizeData) {
		this.setNewValue(data.current);
		this.updateElement();
	}

	private onIntersection(entries: IntersectionObserverEntry[]) {
		if (entries.length > 0) {
			this._isIntersecting = entries[0].isIntersecting;
		}
		this.updateElement();
	}

	private setNewValue(size: CuiWindowSize) {
		let newValue = this._resizeValueCalculator.get(this.args, size);
		if (newValue !== this._currentValue) {
			this._currentValue = newValue;
		}
	}

	private updateElement() {
		if (this.cannotUpdate()) {
			//this.logInfo("Not intersecting")
			return;
		}
		if (!this._currentValue || this._lastValue === this._currentValue) {
			//this.logWarning("Not eligible to set value: " + this._currentValue)
			return;
		}

		this._lastValue = this._currentValue;
		this._task.start();
	}

	/**
	 * Checks whether element can be updated
	 * @returns
	 */
	private cannotUpdate() {
		return !this._isIntersecting && this.args.mode === "smart";
	}

	/**
	 * Used for task to update action on the element after receiving resize
	 */
	private updateAction() {
		//@ts-ignore already checked
		let newAction = CuiActionsFactory.get(this._currentValue);
		this._interactions.mutate(() => {
			if (this._currentAction) {
				this._currentAction.remove(this.element);
			}
			newAction.add(this.element);
			this._currentAction = newAction;
		});
	}
}
