import { CuiScrollEvent, CuiScrollListener } from "../listeners/scroll";
import {
	CuiElementBoxFactory,
	CuiElementBoxType,
	ICuiElementBox,
} from "../models/elements";
import { ICuiEventListener } from "../models/interfaces";
import { are, getRangeValue } from "../utils/functions";
import {
	CuiIntersectionCallback,
	CuiIntersectionListenerOptions,
	CuiIntersectionResult,
} from "./interfaces";

const DEFAULT_OPTION_THRESHOLD: number = 0;

export class CuiIntersectionListener
	implements ICuiEventListener<CuiIntersectionResult>
{
	private _scrollListener: CuiScrollListener;
	private _callback: CuiIntersectionCallback | undefined;
	private _children: HTMLElement[];
	private _box: ICuiElementBox;
	constructor(
		element: CuiElementBoxType,
		options?: CuiIntersectionListenerOptions
	) {
		this._box = CuiElementBoxFactory.get(element);
		this._scrollListener = new CuiScrollListener(
			element as Element,
			options?.threshold ?? DEFAULT_OPTION_THRESHOLD
		);
		this._scrollListener.setCallback(this.onScroll.bind(this));
		this._children = [];
		this._callback = undefined;
	}

	/**
	 * Sets child elements - ratio is calcutalated based on them
	 * @param children
	 */
	setChildren(children: HTMLElement[]) {
		this._children = children;
	}

	setThreshold(threshold: number) {
		this._scrollListener.setThreshold(threshold);
	}

	setCallback(callback: (t: CuiIntersectionResult) => void): void {
		this._callback = callback;
	}

	setParent(target: CuiElementBoxType) {
		this._box = CuiElementBoxFactory.get(target);
		this._scrollListener.setTarget(target);
	}

	isInProgress(): boolean {
		return this._scrollListener.isInProgress();
	}

	attach(): void {
		if (this.isAttached()) {
			return;
		}
		this._scrollListener.attach();
	}

	detach(): void {
		if (!this.isAttached()) {
			return;
		}
		this._scrollListener.detach();
	}

	isAttached(): boolean {
		return this._scrollListener && this._scrollListener.isAttached();
	}

	private onScroll(ev: CuiScrollEvent): void {
		if (!are(this._children, this._callback)) {
			return;
		}
		if (this._callback) this._callback(this.prepareCallbackResult(ev));
	}

	private calcChildVerticalRatio(
		child: HTMLElement,
		currentTop: number,
		currentBottom: number
	): number {
		let childBottom = child.offsetTop + child.offsetHeight;
		// Simulated top if view top is outside of parent then takes parent top
		let symTop =
			currentTop > child.offsetTop ? currentTop : child.offsetTop;
		// Simulated bottom if view bottom is outside of parent then takes parent bottom
		let symBottom =
			currentBottom < childBottom ? currentBottom : childBottom;
		// Calculates amount of pixels that are in view
		let diff = symBottom - symTop;
		// Calculates ratio - how much of a child is in parent view
		let ratio = diff / child.offsetHeight;
		return getRangeValue(ratio, 0, 1);
	}

	private calcChildHorizontalRatio(
		child: HTMLElement,
		currentLeft: number,
		currentRight: number
	): number {
		let childRight = child.offsetLeft + child.offsetWidth;
		// Simulated top if view left is outside of parent then takes parent left
		let symLeft =
			currentLeft > child.offsetLeft ? currentLeft : child.offsetLeft;
		// Simulated bottom if view right is outside of parent then takes parent right
		let symRight = currentRight < childRight ? currentRight : childRight;
		// Calculates amount of pixels that are in view
		let diff = symRight - symLeft;
		// Calculates ratio - how much of a child is in parent view
		let ratio = diff / child.offsetWidth;
		return getRangeValue(ratio, 0, 1);
	}

	private prepareCallbackResult(ev: CuiScrollEvent): CuiIntersectionResult {
		let parentBottom = ev.top + this._box.getHeight();
		let parentRight = ev.left + this._box.getWidth();
		let result: CuiIntersectionResult = {
			ev: ev.base,
			top: ev.top,
			left: ev.left,
			scrolling: ev.scrolling ?? false,
			initial: ev.initial ?? false,
			source: ev.source,
			items: this._children.map((child: HTMLElement, index: number) => {
				let verticalRatio = this.calcChildVerticalRatio(
					child,
					ev.top,
					parentBottom
				);
				let horizontalRatio = this.calcChildHorizontalRatio(
					child,
					ev.left,
					parentRight
				);
				return {
					verticalRatio: verticalRatio,
					horizontalRatio: horizontalRatio,
					element: child,
				};
			}),
		};

		return result;
	}
}
