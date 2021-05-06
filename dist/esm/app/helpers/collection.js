var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CLASSES } from "../../core/utils/statics";
import { is } from "../../core/utils/functions";
import { CuiDevtoolFactory } from "../../core/development/factory";
export class CollectionManagerHelper {
    constructor(interactions) {
        this._interactions = interactions;
        this._log = CuiDevtoolFactory.get('CollectionManager');
        this._elements = [];
        this._isLocked = false;
        this._toggleClass = "";
    }
    setElements(elements) {
        this._elements = elements;
    }
    setToggle(className) {
        this._toggleClass = className;
    }
    addAnimationClass(currentElement, nextElement, animIn, animOut) {
        nextElement.classList.add(CLASSES.animProgress);
        currentElement.classList.add(animOut);
        nextElement.classList.add(animIn);
    }
    setFinalClasses(currentElement, nextElement, animIn, animOut) {
        nextElement.classList.remove(CLASSES.animProgress);
        currentElement.classList.remove(animOut);
        nextElement.classList.remove(animIn);
        currentElement.classList.remove(this._toggleClass);
        nextElement.classList.add(this._toggleClass);
    }
    verifyIndex(index, current, count) {
        return index >= 0 && index !== current && index < count;
    }
    setCurrent(newIndex, current) {
        return __awaiter(this, void 0, void 0, function* () {
            this.lock();
            this._log.debug(`Switching index from: ${current} to ${newIndex}`);
            if (current > -1)
                this._elements[current].classList.remove(this._toggleClass);
            this._elements[newIndex].classList.add(this._toggleClass);
            this.unlock();
            return true;
        });
    }
    setCurrentWithAnimation(newIndex, animClassIn, animClassOut, duration, current) {
        return __awaiter(this, void 0, void 0, function* () {
            this.lock();
            this._log.debug(`Switching index from: ${current} to ${newIndex}`);
            const currentElement = this._elements[current];
            const nextElement = this._elements[newIndex];
            this._interactions.mutate(this.addAnimationClass, this, currentElement, nextElement, animClassIn, animClassOut);
            setTimeout(() => {
                this._interactions.mutate(this.setFinalClasses, this, currentElement, nextElement, animClassIn, animClassOut);
                this.unlock();
            }, duration);
            return true;
        });
    }
    getCurrentIndex() {
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
    elements() {
        return this._elements;
    }
    check() {
        if (this._isLocked) {
            this._log.warning("Object locked. Operation in progress", "Check");
            return false;
        }
        else if (!is(this._toggleClass)) {
            this._log.warning("Toggle is not set. Call setToggleClass", "Check");
            return false;
        }
        else if (this.count() <= 0) {
            this._log.warning("Elements list is empty", "Check");
            return false;
        }
        return true;
    }
    count() {
        return this._elements ? this._elements.length : -1;
    }
    lock() {
        this._isLocked = true;
    }
    unlock() {
        this._isLocked = false;
    }
}
