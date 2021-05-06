var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CuiDevtoolFactory } from "../../core/development/factory";
import { CollectionManagerHelper } from "../helpers/collection";
export class CollectionManager {
    constructor(elements, interactions) {
        this._log = CuiDevtoolFactory.get('CollectionManager');
        this._helper = new CollectionManagerHelper(interactions);
        this._helper.setElements(elements);
        this._cDt = Date.now();
    }
    setToggle(className) {
        this._helper.setToggle(className);
    }
    setElements(elements) {
        this._helper.setElements(elements);
    }
    click(callback) {
        this._helper.elements().forEach((element, index) => {
            element.addEventListener('click', () => {
                this.set(index).then(() => {
                    if (callback) {
                        callback(element, index);
                    }
                });
            });
        });
    }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._helper.check()) {
                return false;
            }
            let newIdx = this._helper.getCurrentIndex() + 1;
            return this.set(newIdx >= this.length() ? 0 : newIdx);
        });
    }
    previous() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._helper.check()) {
                return false;
            }
            let newIdx = this._helper.getCurrentIndex() - 1;
            return this.set(newIdx < 0 ? this.length() - 1 : newIdx);
        });
    }
    set(index) {
        return __awaiter(this, void 0, void 0, function* () {
            let current = this._helper.getCurrentIndex();
            if (!this._helper.check() || !this._helper.verifyIndex(index, current, this.length())) {
                return false;
            }
            return this._helper.setCurrent(index, current);
        });
    }
    setWithAnimation(index, animClassIn, animClassOut, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            let current = this._helper.getCurrentIndex();
            if (!this._helper.check() || !this._helper.verifyIndex(index, current, this.length())) {
                return false;
            }
            return this._helper.setCurrentWithAnimation(index, animClassIn, animClassOut, duration, current);
        });
    }
    getCurrentIndex() {
        return this._helper.getCurrentIndex();
    }
    length() {
        return this._helper.count();
    }
    refresh() {
        return this.length() > 0 && Date.now() - this._cDt > 360000;
    }
}
