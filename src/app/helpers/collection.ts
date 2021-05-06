import { CLASSES } from "../../core/utils/statics";
import { IUIInteractionProvider } from "../../core/models/interfaces";
import { is } from "../../core/utils/functions";
import { ICuiDevelopmentTool } from "../../core/development/interfaces";
import { CuiDevtoolFactory } from "../../core/development/factory";

export class CollectionManagerHelper {
    private _elements: Element[];
    private _log: ICuiDevelopmentTool;
    private _isLocked: boolean;
    private _toggleClass: string;
    private _interactions: IUIInteractionProvider;
    constructor(interactions: IUIInteractionProvider) {
        this._interactions = interactions;
        this._log = CuiDevtoolFactory.get('CollectionManager');
        this._elements = [];
        this._isLocked = false;
        this._toggleClass = "";
    }

    setElements(elements: Element[]) {
        this._elements = elements;
    }

    setToggle(className: string) {
        this._toggleClass = className;
    }

    addAnimationClass(currentElement: Element, nextElement: Element, animIn: string, animOut: string,): void {
        nextElement.classList.add(CLASSES.animProgress);
        currentElement.classList.add(animOut);
        nextElement.classList.add(animIn);
    }

    setFinalClasses(currentElement: Element, nextElement: Element, animIn: string, animOut: string): void {
        nextElement.classList.remove(CLASSES.animProgress);
        currentElement.classList.remove(animOut);
        nextElement.classList.remove(animIn);
        currentElement.classList.remove(this._toggleClass);
        nextElement.classList.add(this._toggleClass);
    }

    verifyIndex(index: number, current: number, count: number): boolean {
        return index >= 0 && index !== current && index < count
    }

    async setCurrent(newIndex: number, current: number): Promise<boolean> {
        this.lock();
        this._log.debug(`Switching index from: ${current} to ${newIndex}`)
        if (current > -1)
            this._elements[current].classList.remove(this._toggleClass);
        this._elements[newIndex].classList.add(this._toggleClass);
        this.unlock();
        return true;
    }

    async setCurrentWithAnimation(newIndex: number, animClassIn: string, animClassOut: string, duration: number, current: number): Promise<boolean> {
        this.lock()
        this._log.debug(`Switching index from: ${current} to ${newIndex}`)

        const currentElement = this._elements[current];
        const nextElement = this._elements[newIndex];
        this._interactions.mutate(this.addAnimationClass, this, currentElement, nextElement, animClassIn, animClassOut);
        setTimeout(() => {
            this._interactions.mutate(this.setFinalClasses, this, currentElement, nextElement, animClassIn, animClassOut)
            this.unlock();
        }, duration)
        return true;
    }

    getCurrentIndex(): number {
        if (!is(this._toggleClass)) {
            return -1;
        }
        let len = this.count();
        for (let i = 0; i < len; i++) {
            if (this._elements[i].classList.contains(this._toggleClass)) {
                return i;
            }
        }
        return -1;
    }

    elements(): Element[] {
        return this._elements;
    }

    check(): boolean {
        if (this._isLocked) {
            this._log.warning("Object locked. Operation in progress", "Check");
            return false;
        } else if (!is(this._toggleClass)) {
            this._log.warning("Toggle is not set. Call setToggleClass", "Check");
            return false;
        } else if (this.count() <= 0) {
            this._log.warning("Elements list is empty", "Check");
            return false;
        }
        return true;
    }

    count(): number {
        return this._elements ? this._elements.length : -1;
    }

    lock() {
        this._isLocked = true;
    }

    unlock() {
        this._isLocked = false
    }


}