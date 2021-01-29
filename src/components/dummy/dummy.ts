import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiComponentBase } from "../../core/handlers/base";

export class CuiDummyComponent implements ICuiComponent {
    attribute: string;
    constructor() {
        this.attribute = 'cui-dummy';
    }

    getStyle(): string | null {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiDummyHandler(element, utils, this.attribute);
    }
}

export class CuiDummyHandler extends CuiComponentBase implements ICuiComponentHandler {

    #attribute: string;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiDummyHandler", element, utils);

        this.#attribute = attribute
    }

    handle(args: any): void {

    }

    refresh(args: any): void {

    }

    destroy(): void {

    }
}