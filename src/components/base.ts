import { ICuiComponent, ICuiComponentHandler } from "src/core/models/interfaces";
import { CuiCore } from "src/core/models/core";

export interface CuiComponentBaseHookSetup {
    name: string;
    create: (element: HTMLElement, utils: CuiCore, prefix: string, attribute: string) => ICuiComponentHandler,
    style?: () => string;
    prefix?: string;
}

export function CuiComponentBaseHook(setup: CuiComponentBaseHookSetup): ICuiComponent {
    const _prefix = setup.prefix ?? 'cui';
    const _attribute = _prefix + "-" + setup.name;
    return {
        attribute: _attribute,
        get: (element: HTMLElement, utils: CuiCore) => setup.create(element, utils, _prefix, _attribute),
        style: setup.style
    }
}