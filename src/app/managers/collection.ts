import { CuiDevtoolFactory } from "../../core/development/factory";
import { ICuiDevelopmentTool } from "../../core/development/interfaces";
import { IUIInteractionProvider, CuiCachable } from "../../core/models/interfaces";
import { CollectionManagerHelper } from "../helpers/collection";

export class CollectionManager implements CuiCachable {
    private _log: ICuiDevelopmentTool;
    private _cDt: number;
    private _helper: CollectionManagerHelper;

    constructor(elements: Element[], interactions: IUIInteractionProvider) {
        this._log = CuiDevtoolFactory.get('CollectionManager');
        this._helper = new CollectionManagerHelper(interactions);
        this._helper.setElements(elements);
        this._cDt = Date.now();
    }

    setToggle(className: string) {
        this._helper.setToggle(className)
    }

    setElements(elements: Element[]) {
        this._helper.setElements(elements);
    }

    click(callback: (element: Element, index: number) => void): void {
        this._helper.elements().forEach((element, index) => {
            element.addEventListener('click', () => {
                this.set(index).then(() => {
                    if (callback) {
                        callback(element, index)
                    }
                })
            })
        })
    }

    async next(): Promise<boolean> {
        if (!this._helper.check()) {
            return false;
        }
        let newIdx = this._helper.getCurrentIndex() + 1;
        return this.set(newIdx >= this.length() ? 0 : newIdx);
    }

    async previous(): Promise<boolean> {
        if (!this._helper.check()) {
            return false;
        }
        let newIdx = this._helper.getCurrentIndex() - 1;
        return this.set(newIdx < 0 ? this.length() - 1 : newIdx)
    }

    async set(index: number): Promise<boolean> {
        let current = this._helper.getCurrentIndex();
        if (!this._helper.check() || !this._helper.verifyIndex(index, current, this.length())) {
            return false;
        }
        return this._helper.setCurrent(index, current)
    }

    async setWithAnimation(index: number, animClassIn: string, animClassOut: string, duration: number): Promise<boolean> {
        let current = this._helper.getCurrentIndex();
        if (!this._helper.check() || !this._helper.verifyIndex(index, current, this.length())) {
            return false;
        }
        return this._helper.setCurrentWithAnimation(index, animClassIn, animClassOut, duration, current)
    }

    getCurrentIndex(): number {
        return this._helper.getCurrentIndex();
    }

    length() {
        return this._helper.count();
    }

    refresh(): boolean {
        return this.length() > 0 && Date.now() - this._cDt > 360000;
    }
}