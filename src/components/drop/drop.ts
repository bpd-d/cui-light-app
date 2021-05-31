import {
	ICuiComponent,
	ICuiOpenable,
	ICuiClosable,
	CuiElement,
} from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiHandlerBase } from "../../core/handlers/base";
import {
	is,
	joinWithScopeSelector,
	replacePrefix,
} from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiHoverListener, CuiHoverEvent } from "../../core/listeners/hover";
import { ICuiPositionCalculator } from "../../core/position/interfaces";
import { CuiBasePositionCalculator } from "../../core/position/calculator";
import { CuiTaskRunner, ICuiTask } from "../../core/utils/task";
import {
	ICuiComponentAction,
	CuiActionsListFactory,
} from "../../core/utils/actions";
import { CuiAutoParseArgs } from "../../core/utils/arguments";
import { CuiHoverModule } from "../extensions/hover/hover";
import { CuiComponentBaseHook } from "../base";
import {
	getAdvancedCuiWindowClickPerformer,
	ICuiWindowClickPerformer,
} from "../extensions/window/performer";
import { eventExtension } from "../extensions/event/event";
import {
	getEventBusFacade,
	getCuiHandlerInteractions,
	ICuiEventBusFacade,
	ICuiInteractionsFacade,
} from "../../core/handlers/extensions/facades";
import { callbackPerformer } from "../extensions/performers";

const bodyClass = "{prefix}-drop-open";
const DROP_POSITION = "{prefix}-drop-position-";
const DROP_TRIGGER = "{prefix}-drop-trigger";
const DROP_DEFAULT_TRIGGER = "> a, button";
const DROP_DEFAULT_ANIMATION_CLS = "{prefix}-drop-animation-in";

export interface CuiDropEvent {
	timestamp: number;
}

export class CuiDropArgs extends CuiAutoParseArgs {
	mode: "click" | "hover";
	trigger: string;
	prevent: boolean;
	autoClose: boolean;
	outClose: boolean;
	pos: string;
	action: string;
	timeout: number;
	margin: number;

	constructor(prefix: string) {
		super({
			props: {
				trigger: { corrector: joinWithScopeSelector },
			},
		});
		this.mode = "click";
		this.trigger = joinWithScopeSelector(DROP_DEFAULT_TRIGGER);
		this.autoClose = false;
		this.outClose = true;
		this.prevent = false;
		this.pos = "";
		this.action = replacePrefix(DROP_DEFAULT_ANIMATION_CLS, prefix);
		this.timeout = 3000;
		this.margin = 8;
	}
}

export function CuiDropComponent(prefix?: string): ICuiComponent {
	return CuiComponentBaseHook({
		prefix: prefix,
		name: "drop",
		create: (
			element: HTMLElement,
			utils: CuiCore,
			prefix: string,
			attribute: string
		) => {
			return new CuiDropHandler(element, utils, attribute, prefix);
		},
	});
}

export class CuiDropHandler
	extends CuiHandlerBase<CuiDropArgs>
	implements ICuiOpenable, ICuiClosable
{
	private _prefix: string;
	private _bodyClass: string;
	private _triggerHoverListener: CuiHoverListener | undefined;
	private _trigger: Element;
	private _positionCalculator: ICuiPositionCalculator;
	private _posClass: string;
	private _autoTask: ICuiTask;
	private _actions: ICuiComponentAction[];

	private _busFacade: ICuiEventBusFacade;
	private _interactions: ICuiInteractionsFacade;
	private _windowClickPerformer: ICuiWindowClickPerformer;
	constructor(
		element: HTMLElement,
		utils: CuiCore,
		attribute: string,
		prefix: string
	) {
		super(
			"CuiDropHandler",
			element,
			attribute,
			new CuiDropArgs(prefix),
			utils
		);
		this._prefix = prefix;
		this._bodyClass = replacePrefix(bodyClass, prefix);
		this.onTriggerClick = this.onTriggerClick.bind(this);
		this._positionCalculator = new CuiBasePositionCalculator();
		this._positionCalculator.setMargin(8);
		this._positionCalculator.setPreferred("bottom-left");
		this._posClass = "";
		this._triggerHoverListener = undefined;
		this._trigger = this.element;
		this._actions = [];
		this._autoTask = new CuiTaskRunner(
			this.args.timeout,
			false,
			this.close.bind(this)
		);
		this._windowClickPerformer = getAdvancedCuiWindowClickPerformer(
			this.close.bind(this),
			element
		);
		this._busFacade = getEventBusFacade(this.cuid, utils.bus, element);
		this._interactions = getCuiHandlerInteractions(utils.interactions);

		if (!utils.isPlugin("click-plugin")) {
			this.logWarning(
				"Window click plugin is not available: outClose will not work"
			);
		}

		this.extend(
			new CuiHoverModule(this.element, this.onElementHover.bind(this))
		);
		this.extend(
			eventExtension(this._busFacade, {
				eventName: EVENTS.WINDOW_CLICK,
				performer: this._windowClickPerformer,
			})
		);
		this.extend(
			eventExtension(this._busFacade, {
				eventName: EVENTS.OPEN,
				performer: callbackPerformer(this.open.bind(this)),
			})
		);
		this.extend(
			eventExtension(this._busFacade, {
				eventName: EVENTS.CLOSE,
				performer: callbackPerformer(this.close.bind(this)),
			})
		);
	}

	async onHandle(): Promise<boolean> {
		this._trigger = this.acquireTrigger();
		this._triggerHoverListener = new CuiHoverListener(this._trigger);
		this._triggerHoverListener.setCallback(this.onHoverEvent.bind(this));
		this._triggerHoverListener.attach();
		//@ts-ignore
		this._trigger.addEventListener("click", this.onTriggerClick);
		// this.setTriggerEvent();

		this.setDataFromArgs();

		this._interactions.mutate(() => {
			AriaAttributes.setAria(this.element, "aria-dropdown", "");
		});

		return true;
	}

	async onRefresh(): Promise<boolean> {
		if (this.prevArgs && this.args.trigger !== this.prevArgs.trigger) {
			if (
				this._triggerHoverListener &&
				this._triggerHoverListener.isAttached()
			) {
				this._triggerHoverListener.detach();
			} else if (this.prevArgs && this.prevArgs.mode === "click") {
				//@ts-ignore
				this._trigger.removeEventListener("click", this.onTriggerClick);
			}
			this._trigger = this.acquireTrigger();
			this._triggerHoverListener = new CuiHoverListener(this._trigger);
			this._triggerHoverListener.setCallback(
				this.onHoverEvent.bind(this)
			);
			this._triggerHoverListener.attach();
			//@ts-ignore
			this._trigger.addEventListener("click", this.onTriggerClick);
		}

		this.setDataFromArgs();
		return true;
	}
	async onRemove(): Promise<boolean> {
		this._busFacade.detachEmittedEvents();
		return true;
	}

	private setDataFromArgs() {
		this._positionCalculator.setStatic(this.args.pos);
		this._positionCalculator.setMargin(this.args.margin);
		this._autoTask.setTimeout(this.args.timeout);
		this._actions = CuiActionsListFactory.get(this.args.action);
		this._windowClickPerformer.setEnabled(this.args.outClose);
	}
	/**
	 * Api Method open
	 */
	async open(): Promise<boolean> {
		if (this.isActive()) {
			return this.close();
		}
		if (this.isAnyActive()) {
			await this.findAndCloseOpenedDrop();
		}

		if (!this.lock("open")) {
			return false;
		}

		this.log.debug(`Drop ${this.cuid}`, "open");
		this.onOpen();

		return true;
	}

	/**
	 * Api Method close
	 */
	async close(): Promise<boolean> {
		if (!this.isActive()) {
			return false;
		}
		if (!this.lock("close")) {
			return false;
		}
		this.logInfo(`Drop ${this.cuid}`, "close");
		this.onClose();
		this._busFacade.emit(EVENTS.CLOSED, {
			timestamp: Date.now(),
		});
		return true;
	}

	/**
	 * Set of actions performed during drop open
	 */
	onOpen() {
		this.classes.setClass(this.activeClassName, this.element);
		this._interactions.mutate(() => {
			const box = this._trigger.getBoundingClientRect();
			try {
				const [x, y, pos] = this._positionCalculator.calculate(
					box,
					this.element.getBoundingClientRect()
				);
				this.element.style.top = `${y - box.top}px`;
				this.element.style.left = `${x - box.left}px`;
				this._posClass = replacePrefix(
					DROP_POSITION + pos,
					this._prefix
				);
				this.toggleActions();
				this.classes.setClass(this._posClass, this.element);
				this.classes.setClass(this._bodyClass, document.body);
				AriaAttributes.setAria(this.element, "aria-expanded", "true");
			} catch (e) {
				this.log.exception(e);
			} finally {
				this.unlock();
				this._busFacade.emit(EVENTS.OPENED, {
					timestamp: Date.now(),
				});
				this.runAutoCloseTask();
			}
		});
	}

	/**
	 * Set of actions performed during drop close
	 */
	onClose() {
		this._interactions.mutate(() => {
			this.classes.removeClass(this.activeClassName, this.element);
			this.classes.removeClass(this._bodyClass, document.body);
			this.toggleActions();
			this.classes.removeClass(this._posClass, this.element);
			AriaAttributes.setAria(this.element, "aria-expanded", "false");
			this.unlock();
		});
	}

	private isAnyActive(): boolean {
		return this.classes.hasClass(this._bodyClass, document.body);
	}

	/**
	 * Finds and opens other active drop element
	 */
	async findAndCloseOpenedDrop(): Promise<boolean> {
		const opened = document.querySelector(
			`[${this.attribute}].${this.activeClassName}`
		);
		if (!is(opened)) {
			this.log.warning("Opened drop was not found");
			return false;
		}
		//@ts-ignore opened checked
		const handler = (<CuiElement>(opened as any)).$handlers[
			this.attribute
		] as any;
		if (!is(handler)) {
			this.log.warning("Drop handler was not found in the element");
			return false;
		}
		return handler.close();
	}

	/**
	 * Invoked when trigger button is clicked
	 * @param ev
	 */
	private onTriggerClick(ev: MouseEvent) {
		if (this.args.mode !== "click") {
			return;
		}
		if (this.isActive()) {
			this.close();
		} else {
			this.open();
		}
	}

	/**
	 * Invoked when trigger button is hovered on
	 * @param ev
	 */
	private onHoverEvent(ev: CuiHoverEvent) {
		if (this.args.mode !== "hover") {
			return;
		}
		if (ev.isHovering && !this.isActive()) {
			this.open();
		}
	}

	/**
	 * Method triggered when opened element is hovered on
	 * @param ev
	 */
	private onElementHover(ev: CuiHoverEvent) {
		if (ev.isHovering) {
			this._autoTask.stop();
		} else if (!ev.isHovering && this.args.autoClose) {
			this.runAutoCloseTask();
		}
	}

	/**
	 * Runs auto-close task on opened element
	 */
	private runAutoCloseTask() {
		if (!this.args.autoClose) {
			return;
		}
		this._autoTask.start();
	}

	private toggleActions() {
		this._actions.forEach((action) => {
			action.toggle(this.element);
		});
	}

	private acquireTrigger(): Element {
		let ret = null;
		if (!this.element.parentElement) {
			ret = document.querySelector(this.args.trigger);
		} else
			ret = this.element.parentElement.querySelector(this.args.trigger);
		return ret ?? this.element;
	}
}
